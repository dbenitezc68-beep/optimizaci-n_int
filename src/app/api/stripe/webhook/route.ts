import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import {
  upsertInvoiceFromStripeInvoice,
  upsertPaymentFromPaymentIntent,
  upsertSubscriptionFromStripeSubscription,
} from "@/lib/stripe-sync";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || secret.includes("replace_me")) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return new Response(`Webhook signature verification failed: ${message}`, {
      status: 400,
    });
  }

  const already = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
  });
  if (already) {
    return Response.json({ received: true, duplicate: true });
  }

  // Procesar ANTES de registrar el evento: si algo falla respondemos 500 sin
  // dejar rastro y el reintento de Stripe vuelve a procesarlo (los upserts son
  // idempotentes). Registrar primero descartaría los reintentos como duplicados.
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
      case "payment_intent.payment_failed":
      case "payment_intent.canceled": {
        await upsertPaymentFromPaymentIntent(
          event.data.object as Stripe.PaymentIntent
        );
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await upsertSubscriptionFromStripeSubscription(
          event.data.object as Stripe.Subscription
        );
        break;
      }
      case "invoice.paid":
      case "invoice.payment_failed":
      case "invoice.finalized": {
        await upsertInvoiceFromStripeInvoice(event.data.object as Stripe.Invoice);
        break;
      }
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_intent && typeof session.payment_intent === "string") {
          const pi = await getStripe().paymentIntents.retrieve(
            session.payment_intent
          );
          await upsertPaymentFromPaymentIntent(pi);
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(`Stripe webhook ${event.type} (${event.id}) falló:`, err);
    return new Response("Webhook processing failed", { status: 500 });
  }

  try {
    await prisma.webhookEvent.create({
      data: {
        stripeEventId: event.id,
        type: event.type,
        payload: JSON.stringify(event.data.object),
      },
    });
  } catch {
    // Entrega concurrente del mismo evento: otro worker ya lo registró.
    // Ambos procesamientos son idempotentes, así que responder 200 es correcto.
  }

  return Response.json({ received: true });
}
