import type { NextApiRequest, NextApiResponse } from "next";
import { getConsultationTier } from "@/data/consultations";
import { getStripeClient, isStripeConfigured } from "@/server/services/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tierId, successUrl, cancelUrl } = req.body as {
    tierId?: string;
    successUrl?: string;
    cancelUrl?: string;
  };

  if (!tierId || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: "tierId, successUrl, and cancelUrl are required" });
  }

  const tier = getConsultationTier(tierId);
  if (!tier || !tier.amountCents || tier.amountCents <= 0) {
    return res.status(400).json({ error: "Invalid consultation tier" });
  }

  if (!isStripeConfigured()) {
    return res.status(503).json({
      error: "Stripe is not configured. Add STRIPE_SECRET_KEY in your environment to enable checkout.",
    });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return res.status(500).json({ error: "Unable to initialize Stripe client" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: tier.amountCents,
            product_data: {
              name: tier.name,
              description: tier.description,
            },
          },
        },
      ],
      metadata: {
        consultation_tier: tier.id,
        consultation_price_label: tier.priceLabel,
      },
    });

    if (!session.url) {
      return res.status(500).json({ error: "Stripe did not return a checkout URL" });
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("[consultations.checkout]", error);
    const message = error instanceof Error ? error.message : "Failed to create Stripe checkout session";
    return res.status(500).json({ error: message });
  }
}
