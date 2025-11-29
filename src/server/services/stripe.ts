import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

const STRIPE_PLACEHOLDER_PREFIX = "sk_test_placeholder";

const getSecretKey = () => process.env.STRIPE_SECRET_KEY;

export const isStripeConfigured = (): boolean => {
  const key = getSecretKey();
  return Boolean(key && !key.startsWith(STRIPE_PLACEHOLDER_PREFIX));
};

export const getStripeClient = (): Stripe | null => {
  if (!isStripeConfigured()) {
    return null;
  }

  if (stripeInstance) {
    return stripeInstance;
  }

  const secretKey = getSecretKey();
  if (!secretKey) {
    return null;
  }

  const apiVersion: Stripe.LatestApiVersion = "2024-06-20";

  stripeInstance = new Stripe(secretKey, {
    apiVersion,
    typescript: true,
  });

  return stripeInstance;
};
