import Link from "next/link";
import type { NextPageWithMeta } from "@/pages/_app";
import { consultationTiers } from "@/data/consultations";

const processSteps = [
  {
    title: "Reserve & Intake",
    description: "Pick the consultation tier that fits your needs and share project basics in a quick form.",
  },
  {
    title: "Discovery Session",
    description: "Meet virtually or on-site to discuss goals, logistics, and success criteria for your project.",
  },
  {
    title: "Actionable Plan",
    description: "Receive deliverables, pricing guidance, and a step-by-step roadmap tailored to your property.",
  },
  {
    title: "Apply Credit",
    description: "Move forward with Kealee Construction and apply your consultation investment toward the build.",
  },
];

const faqs = [
  {
    question: "How soon can I book a consultation?",
    answer:
      "Virtual consultations are typically available within 1 business day. Site visits and design packages are scheduled within 3-7 business days, depending on crew availability.",
  },
  {
    question: "Is the consultation fee really credited back?",
    answer:
      "Yes. If you move forward with Kealee Construction within 6 months, the full consultation fee is credited toward your construction contract.",
  },
  {
    question: "What should I prepare before we meet?",
    answer:
      "Bring any inspiration photos, existing plans, or measurements you already have. We’ll guide you through the rest during intake so nothing is missed.",
  },
  {
    question: "Can I upgrade after booking tier 1?",
    answer:
      "Absolutely. If you start with the Quick Virtual Consult and decide you need on-site support, we’ll apply your insights toward the higher-tier visit.",
  },
];

const ConsultationServicesPage: NextPageWithMeta = () => {
  return (
    <div className="space-y-20 py-12 sm:py-16">
      <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-900 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Start with the Right Consultation
            </span>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Consultation Services</h1>
            <p className="max-w-3xl text-lg text-white/85">
              Choose the discovery experience that matches your project stage. Every paid consultation is credited toward your build when you partner with Kealee Construction.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "100%", caption: "Consultation Credit" },
              { label: "3 tiers", caption: "Pick Your Path" },
              { label: "DMV", caption: "Local Licensed Contractor" },
              { label: "24/7", caption: "Emergency Support" },
            ].map((item) => (
              <div key={item.caption} className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left shadow-2xl">
                <p className="text-2xl font-bold text-amber">{item.label}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/70">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8" id="tiers">
        <div className="mx-auto w-full max-w-content space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">Choose Your Consultation Tier</h2>
            <p className="mt-3 text-sm text-slate-600">
              From a quick virtual intake to full design collaboration, we have a path that matches your project readiness.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {consultationTiers.map((tier) => {
              const isPaid = typeof tier.amountCents === "number" && tier.amountCents > 0;
              const href = tier.hrefOverride ?? (isPaid ? `/consultation/checkout?tier=${tier.id}` : "/quote");

              return (
                <article
                  key={tier.id}
                  className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-card transition-transform duration-200 hover:-translate-y-1 ${
                    tier.badge === "Most Popular" ? "border-2 border-amber ring-2 ring-amber/20" : "border border-slate-100"
                  }`}
                >
                  {tier.badge ? (
                    <span
                      className={`absolute -top-4 right-6 inline-flex w-fit rounded-full px-4 py-1 text-xs font-semibold uppercase ${
                        tier.badge === "Most Popular" ? "bg-amber text-navy" : "bg-white text-ocean shadow-card"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  ) : null}
                  <div className="text-4xl font-bold text-ocean">{tier.tier}</div>
                  <h3 className="mt-4 text-2xl font-semibold text-navy">{tier.name}</h3>
                  <p className={`mt-2 text-xl font-bold ${tier.priceLabel.toLowerCase().includes("free") ? "text-emerald-500" : "text-tangerine"}`}>
                    {tier.priceLabel}
                  </p>
                  <p className="mt-4 text-sm text-slate-600">{tier.description}</p>
                  {tier.credit ? (
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                      {tier.credit}
                    </div>
                  ) : null}
                  <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-slate-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 text-emerald-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      tier.badge === "Most Popular" ? "bg-amber text-navy hover:bg-amber/90" : "bg-ocean text-white hover:bg-ocean/90"
                    }`}
                  >
                    Reserve This Consultation
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-content space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">What to Expect</h2>
            <p className="mt-3 text-sm text-slate-600">Transparent, guided steps from your first conversation to a build-ready plan.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean/10 text-lg font-semibold text-ocean">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-content gap-12 lg:grid-cols-[1fr,1.1fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">Need help choosing a tier?</h2>
            <p className="text-sm text-slate-600">
              Our team can guide you toward the right consultation based on project size, permitting requirements, and decision timeline. All consultations include transparent pricing, professional recommendations, and concierge communication.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber">Prefer to speak now?</p>
              <p className="mt-2 text-lg font-semibold text-navy">Call (443) 852-9890 for immediate assistance.</p>
              <p className="mt-2 text-sm text-slate-600">Our consultation specialists are available Monday through Friday, 9am-4pm, with 24/7 emergency support.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="tel:4438529890" className="btn-primary">
                  Call the Team
                </a>
                <Link href="/contact" className="btn-secondary">
                  Message Us
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
              <h3 className="text-xl font-semibold text-navy">Frequently Asked Questions</h3>
              <div className="mt-6 space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question} className="space-y-2">
                    <p className="text-sm font-semibold text-navy">{faq.question}</p>
                    <p className="text-sm text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-r from-tangerine to-amber px-6 py-8 text-white shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Ready to begin?</p>
              <h3 className="mt-2 text-2xl font-semibold">Lock in Your Consultation Today</h3>
              <p className="mt-3 text-sm text-white/80">
                Submit your request and we&apos;ll confirm timing, share onboarding materials, and outline next steps within one business day.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/quote" className="btn-primary bg-white text-navy hover:bg-white/90">
                  Request Quote & Consultation
                </Link>
                <Link href="#tiers" className="btn-secondary border-white/50 text-white">
                  Compare Tiers Again
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ConsultationServicesPage.meta = {
  title: "Consultation Services | Kealee Construction",
  description:
    "Explore Kealee Construction consultation tiers—from quick virtual discovery to full design packages. Reserve your preferred consultation and apply the fee toward your build.",
};

export default ConsultationServicesPage;
