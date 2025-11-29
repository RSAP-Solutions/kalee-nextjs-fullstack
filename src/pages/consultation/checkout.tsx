import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPageWithMeta } from "../_app";
import { consultationTiers, getConsultationTier } from "@/data/consultations";
import { useNotifications } from "@/providers/NotificationProvider";

const ConsultationCheckoutPage: NextPageWithMeta = () => {
  const router = useRouter();
  const { notify } = useNotifications();
  const tierId = typeof router.query.tier === "string" ? router.query.tier : undefined;

  const tier = useMemo(() => (tierId ? getConsultationTier(tierId) : undefined), [tierId]);

  const [origin, setOrigin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (tier && (!tier.amountCents || tier.amountCents <= 0)) {
      void router.replace(tier.hrefOverride ?? "/quote");
    }
  }, [router, tier]);

  const handleCheckout = async () => {
    if (!tier || !tier.amountCents || tier.amountCents <= 0) return;
    if (!origin) {
      notify({ intent: "error", title: "Still loading", message: "Please wait a moment and try again." });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const successUrl = `${origin}/consultation/success?tier=${tier.id}`;
      const cancelUrl = `${origin}/consultation/cancel?tier=${tier.id}`;
      const response = await fetch("/api/consultations/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id, successUrl, cancelUrl }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Checkout failed (${response.status})`);
      }

      const data = (await response.json()) as { url: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Missing redirect URL from Stripe session.");
      }
    } catch (err: unknown) {
      console.error("[consultation.checkout]", err);
      const message = err instanceof Error ? err.message : "Unable to start checkout.";
      setError(message);
      notify({ title: "Checkout failed", message, intent: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const PaidTierList = () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <h3 className="text-base font-semibold text-navy">Available Paid Consultations</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {consultationTiers
          .filter((t) => t.amountCents && t.amountCents > 0)
          .map((t) => (
            <li key={t.id}>
              <Link href={`/consultation/checkout?tier=${t.id}`} className="text-ocean hover:text-ocean/80">
                {t.name} — {t.priceLabel}
              </Link>
            </li>
          ))}
      </ul>
      <p className="mt-4 text-xs text-slate-500">
        Looking for a complimentary discovery call? Start with the {" "}
        <Link href={consultationTiers[0]?.hrefOverride ?? "/quote"} className="font-semibold text-ocean">
          Quick Virtual Consult
        </Link>
        .
      </p>
    </div>
  );

  if (!tierId) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto w-full max-w-content px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-semibold text-navy">Select a consultation tier</h1>
            <p className="mt-2 text-sm text-slate-600">
              Choose the paid consultation you&apos;d like to reserve.
            </p>
            <div className="mt-6">
              <PaidTierList />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tier) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto w-full max-w-content px-4">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-card">
            <h1 className="text-2xl font-semibold text-red-600">Consultation not found</h1>
            <p className="mt-2 text-sm text-red-600">
              The consultation tier you selected is unavailable. Please choose another option below.
            </p>
            <div className="mt-6">
              <PaidTierList />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tier.amountCents || tier.amountCents <= 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto grid w-full max-w-content gap-8 px-4 lg:grid-cols-[1fr,0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber">Consultation Checkout</span>
            <h1 className="mt-4 text-3xl font-bold text-navy">Reserve {tier.name}</h1>
            <p className="mt-3 text-sm text-slate-600">
              Secure your consultation by completing the Stripe checkout below. You can apply the full fee toward your construction contract within 6 months of the visit.
            </p>
            {tier.credit ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {tier.credit}
              </div>
            ) : null}
            <div className="mt-6 grid gap-3 text-sm text-slate-600">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-navy">What happens next?</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <span className="font-semibold text-navy">1.</span> Complete the secure Stripe payment for {tier.priceLabel}.
              </li>
              <li>
                <span className="font-semibold text-navy">2.</span> Receive an email confirmation with scheduling instructions.
              </li>
              <li>
                <span className="font-semibold text-navy">3.</span> Meet with our team to review scope, budget, and next steps.
              </li>
            </ol>
            <p className="mt-4 text-xs text-slate-500">
              Need help before paying? Call <a href="tel:4438529890" className="font-semibold text-ocean">(443) 852-9890</a> or {" "}
              <Link href="/contact" className="font-semibold text-ocean">
                send us a message
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Summary</p>
                <h2 className="mt-2 text-2xl font-semibold text-navy">{tier.name}</h2>
              </div>
              <p className="text-2xl font-bold text-tangerine">{tier.priceLabel}</p>
            </div>
            <p className="mt-4 text-sm text-slate-600">Includes all features listed plus concierge scheduling support.</p>

            {error ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            ) : null}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-ocean px-5 py-3 text-sm font-semibold text-white transition hover:bg-ocean/90 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? "Redirecting to Stripe…" : "Secure Checkout"}
            </button>

            <p className="mt-4 text-xs text-slate-500">
              Payments are securely processed by Stripe. We do not store your credit card details.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h3 className="text-base font-semibold text-navy">Looking for other options?</h3>
            <PaidTierList />
          </div>
        </div>
      </div>
    </div>
  );
};

ConsultationCheckoutPage.meta = {
  title: "Consultation Checkout | Kealee Construction",
  description: "Reserve a paid consultation and kick off your construction project with Kealee Construction.",
};

export default ConsultationCheckoutPage;
