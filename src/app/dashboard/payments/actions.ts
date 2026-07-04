"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import {
  optionalDate,
  optionalText,
  parseForm,
  redirectWithError,
  requiredEurosToCents,
  requiredText,
  tryMutation,
} from "@/lib/forms";
import {
  upsertInvoiceFromStripeInvoice,
  upsertPaymentFromPaymentIntent,
  upsertSubscriptionFromStripeSubscription,
} from "@/lib/stripe-sync";

const paymentLinkSchema = z.object({
  description: requiredText("Indica una descripción"),
  amount: requiredEurosToCents("Indica un importe válido mayor que 0"),
  clientId: optionalText,
});

export async function createPaymentLinkAction(formData: FormData) {
  await requireUser();

  if (!isStripeConfigured()) {
    redirectWithError(
      "/dashboard/payments/new-link",
      "Configura STRIPE_SECRET_KEY en .env primero (ver Ajustes)"
    );
  }

  const parsed = parseForm(paymentLinkSchema, formData);
  if (!parsed.ok) {
    redirectWithError("/dashboard/payments/new-link", parsed.error);
  }
  const { description, amount: amountCents, clientId } = parsed.data;

  await tryMutation(
    async () => {
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
    },
    "/dashboard/payments/new-link",
    "No se pudo crear el link de pago. Revisa la conexión con Stripe."
  );

  revalidatePath("/dashboard/payments");
  if (clientId) revalidatePath(`/dashboard/clients/${clientId}`);
  redirect("/dashboard/payments");
}

const manualPaymentSchema = z.object({
  description: requiredText("Indica una descripción"),
  amount: requiredEurosToCents("Indica un importe válido mayor que 0"),
  clientId: optionalText,
  status: z.enum(["PAID", "PENDING"]).optional().default("PAID").catch("PAID"),
  paidAt: optionalDate,
});

export async function createManualPaymentAction(formData: FormData) {
  await requireUser();

  const parsed = parseForm(manualPaymentSchema, formData);
  if (!parsed.ok) {
    redirectWithError("/dashboard/payments/new-manual", parsed.error);
  }
  const { description, amount, clientId, status, paidAt } = parsed.data;

  await tryMutation(
    () =>
      prisma.payment.create({
        data: {
          description,
          amountCents: amount,
          currency: "eur",
          status,
          clientId,
          // paidAt alimenta las métricas de ingresos: fecha real del cobro.
          paidAt: status === "PAID" ? (paidAt ?? new Date()) : null,
        },
      }),
    "/dashboard/payments/new-manual",
    "No se pudo registrar el pago. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
  if (clientId) revalidatePath(`/dashboard/clients/${clientId}`);
  redirect("/dashboard/payments");
}

export async function markManualPaymentPaidAction(formData: FormData) {
  await requireUser();
  const paymentId = String(formData.get("paymentId") ?? "");
  if (!paymentId) return;

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  // Solo pagos manuales pendientes: los de Stripe los actualiza Stripe.
  if (
    !payment ||
    payment.status !== "PENDING" ||
    payment.stripePaymentIntentId ||
    payment.stripeChargeId
  ) {
    return;
  }

  await tryMutation(
    () =>
      prisma.payment.update({
        where: { id: paymentId },
        data: { status: "PAID", paidAt: new Date() },
      }),
    "/dashboard/payments",
    "No se pudo marcar el pago como cobrado."
  );

  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
  if (payment.clientId) revalidatePath(`/dashboard/clients/${payment.clientId}`);
}

export async function deleteManualPaymentAction(formData: FormData) {
  await requireUser();
  const paymentId = String(formData.get("paymentId") ?? "");
  if (!paymentId) return;

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return;
  // Los pagos sincronizados de Stripe nunca se borran desde aquí: Stripe es
  // su fuente de verdad y reaparecerían en la siguiente sincronización.
  if (payment.stripePaymentIntentId || payment.stripeChargeId) {
    redirectWithError(
      "/dashboard/payments",
      "Los pagos de Stripe no se pueden eliminar manualmente"
    );
  }

  await tryMutation(
    () => prisma.payment.delete({ where: { id: paymentId } }),
    "/dashboard/payments",
    "No se pudo eliminar el pago."
  );

  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
  if (payment.clientId) revalidatePath(`/dashboard/clients/${payment.clientId}`);
}

export async function syncStripeAction() {
  await requireUser();

  if (!isStripeConfigured()) {
    redirectWithError(
      "/dashboard/payments",
      "Configura STRIPE_SECRET_KEY en .env primero"
    );
  }

  const total = await tryMutation(
    async () => {
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

      return (
        paymentIntents.data.length +
        subscriptions.data.length +
        invoices.data.length
      );
    },
    "/dashboard/payments",
    "La sincronización con Stripe falló. Revisa la clave y vuelve a intentarlo."
  );

  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
  redirect(`/dashboard/payments?synced=${total}`);
}
