import "server-only";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

const STATUS_FROM_STRIPE_SUBSCRIPTION: Record<
  Stripe.Subscription.Status,
  "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE"
> = {
  active: "ACTIVE",
  trialing: "TRIALING",
  past_due: "PAST_DUE",
  canceled: "CANCELED",
  incomplete: "INCOMPLETE",
  incomplete_expired: "CANCELED",
  unpaid: "PAST_DUE",
  paused: "CANCELED",
};

export async function upsertClientFromStripeCustomerId(
  customerId: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
): Promise<string | null> {
  if (!customerId) return null;

  const id = typeof customerId === "string" ? customerId : customerId.id;

  const existing = await prisma.client.findUnique({
    where: { stripeCustomerId: id },
  });
  if (existing) return existing.id;

  let customer: Stripe.Customer | Stripe.DeletedCustomer;
  if (typeof customerId === "string") {
    customer = await getStripe().customers.retrieve(id);
  } else {
    customer = customerId;
  }

  if (customer.deleted) return null;

  const email = customer.email?.toLowerCase() ?? null;
  if (email) {
    const byEmail = await prisma.client.findFirst({ where: { email } });
    if (byEmail) {
      await prisma.client.update({
        where: { id: byEmail.id },
        data: { stripeCustomerId: id },
      });
      return byEmail.id;
    }
  }

  const created = await prisma.client.create({
    data: {
      name: customer.name || customer.email || "Cliente Stripe",
      email,
      stripeCustomerId: id,
    },
  });
  return created.id;
}

export async function upsertPaymentFromPaymentIntent(
  pi: Stripe.PaymentIntent
) {
  const clientId = await upsertClientFromStripeCustomerId(pi.customer);

  const statusMap: Record<string, "PENDING" | "PAID" | "FAILED" | "REFUNDED"> =
    {
      succeeded: "PAID",
      processing: "PENDING",
      requires_payment_method: "FAILED",
      requires_action: "PENDING",
      requires_confirmation: "PENDING",
      requires_capture: "PENDING",
      canceled: "FAILED",
    };
  const status = statusMap[pi.status] ?? "PENDING";
  // Fecha real del cobro en Stripe, no la hora de procesamiento local:
  // las métricas mensuales filtran por paidAt y una resincronización no
  // debe reatribuir pagos históricos al mes actual.
  const paidAt = status === "PAID" ? new Date(pi.created * 1000) : null;

  await prisma.payment.upsert({
    where: { stripePaymentIntentId: pi.id },
    create: {
      stripePaymentIntentId: pi.id,
      amountCents: pi.amount,
      currency: pi.currency,
      status,
      description: pi.description ?? undefined,
      clientId,
      paidAt,
    },
    update: {
      amountCents: pi.amount,
      currency: pi.currency,
      status,
      clientId,
      paidAt: paidAt ?? undefined,
    },
  });
}

export async function upsertSubscriptionFromStripeSubscription(
  sub: Stripe.Subscription
) {
  const clientId = await upsertClientFromStripeCustomerId(sub.customer);
  const item = sub.items.data[0];
  const price = item?.price;
  // Importe total de la suscripción: todos los items × cantidad (Stripe
  // exige que compartan intervalo, así que la suma es homogénea).
  const amountCents = sub.items.data.reduce(
    (sum, it) => sum + (it.price?.unit_amount ?? 0) * (it.quantity ?? 1),
    0
  );
  const planName = price?.nickname ?? undefined;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      stripeSubscriptionId: sub.id,
      status: STATUS_FROM_STRIPE_SUBSCRIPTION[sub.status] ?? "INCOMPLETE",
      planName,
      amountCents,
      currency: price?.currency ?? "eur",
      interval: price?.recurring?.interval ?? "month",
      currentPeriodEnd: item?.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      clientId,
    },
    update: {
      status: STATUS_FROM_STRIPE_SUBSCRIPTION[sub.status] ?? "INCOMPLETE",
      planName,
      amountCents,
      currency: price?.currency ?? "eur",
      interval: price?.recurring?.interval ?? "month",
      currentPeriodEnd: item?.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      clientId,
    },
  });
}

export async function upsertInvoiceFromStripeInvoice(inv: Stripe.Invoice) {
  const clientId = await upsertClientFromStripeCustomerId(inv.customer);

  // status_transitions.paid_at es el momento real del pago según Stripe.
  const paidAt = inv.status_transitions?.paid_at
    ? new Date(inv.status_transitions.paid_at * 1000)
    : inv.status === "paid"
      ? new Date(inv.created * 1000)
      : null;

  await prisma.invoice.upsert({
    where: { stripeInvoiceId: inv.id! },
    create: {
      stripeInvoiceId: inv.id!,
      amountDueCents: inv.amount_due,
      amountPaidCents: inv.amount_paid,
      currency: inv.currency,
      status: inv.status ?? "draft",
      hostedInvoiceUrl: inv.hosted_invoice_url ?? undefined,
      pdfUrl: inv.invoice_pdf ?? undefined,
      dueDate: inv.due_date ? new Date(inv.due_date * 1000) : null,
      paidAt,
      clientId,
    },
    update: {
      amountDueCents: inv.amount_due,
      amountPaidCents: inv.amount_paid,
      status: inv.status ?? "draft",
      hostedInvoiceUrl: inv.hosted_invoice_url ?? undefined,
      pdfUrl: inv.invoice_pdf ?? undefined,
      paidAt: paidAt ?? undefined,
      clientId,
    },
  });
}
