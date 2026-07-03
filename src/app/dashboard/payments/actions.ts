"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import {
  upsertPaymentFromPaymentIntent,
  upsertSubscriptionFromStripeSubscription,
  upsertInvoiceFromStripeInvoice,
} from "@/lib/stripe-sync";

export async function createPaymentLinkAction(formData: FormData) {
  await requireUser();

  if (!isStripeConfigured()) {
    redirect(
      "/dashboard/payments/new-link?error=Configura STRIPE_SECRET_KEY en .env primero (ver Ajustes)"
    );
  }

  const description = String(formData.get("description") ?? "").trim();
  const amountEuros = Number(formData.get("amount"));
  const clientId = String(formData.get("clientId") ?? "") || undefined;

  if (!description || !amountEuros || amountEuros <= 0) {
    redirect(
      "/dashboard/payments/new-link?error=Indica una descripción y un importe válido"
    );
  }

  const amountCents = Math.round(amountEuros * 100);
  const stripe = getStripe();

  const price = await stripe.prices.create({
    currency: "eur",
    unit_amount: amountCents,
    product_data: { name: description },
  });

  const link = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: clientId ? { clientId } : undefined,
  });

  await prisma.paymentLink.create({
    data: {
      stripePaymentLinkId: link.id,
      url: link.url,
      description,
      amountCents,
      currency: "eur",
      clientId,
    },
  });

  revalidatePath("/dashboard/payments");
  if (clientId) revalidatePath(`/dashboard/clients/${clientId}`);
  redirect("/dashboard/payments");
}

export async function syncStripeAction() {
  await requireUser();

  if (!isStripeConfigured()) {
    redirect("/dashboard/payments?error=Configura STRIPE_SECRET_KEY en .env primero");
  }

  const stripe = getStripe();

  const [paymentIntents, subscriptions, invoices] = await Promise.all([
    stripe.paymentIntents.list({ limit: 50 }),
    stripe.subscriptions.list({ limit: 50, status: "all" }),
    stripe.invoices.list({ limit: 50 }),
  ]);

  for (const pi of paymentIntents.data) {
    await upsertPaymentFromPaymentIntent(pi);
  }
  for (const sub of subscriptions.data) {
    await upsertSubscriptionFromStripeSubscription(sub);
  }
  for (const inv of invoices.data) {
    await upsertInvoiceFromStripeInvoice(inv);
  }

  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
  redirect(
    `/dashboard/payments?synced=${paymentIntents.data.length + subscriptions.data.length + invoices.data.length}`
  );
}
