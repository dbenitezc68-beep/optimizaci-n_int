import "server-only";
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (stripeClient) return stripeClient;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("replace_me")) {
    throw new Error(
      "STRIPE_SECRET_KEY no está configurada. Añádela en .env (ver Ajustes)."
    );
  }

  stripeClient = new Stripe(key);
  return stripeClient;
}

export function isStripeConfigured() {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key) && !key!.includes("replace_me");
}

export function isWebhookConfigured() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  return Boolean(secret) && !secret!.includes("replace_me");
}
