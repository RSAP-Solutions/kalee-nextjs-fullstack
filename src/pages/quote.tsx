import { useState, useCallback, useMemo } from "react";
import { useNotifications } from "@/providers/NotificationProvider";
import type { NextPageWithMeta } from "./_app";
import type { QuoteRequestPayload } from "@/types/quote";

const benefitList = [
  "100% Free Consultation – No hidden fees or obligations",
  "Transparent Pricing – Detailed, itemized estimates",
  "Licensed & Insured – Fully bonded and certified",
  "Expert Team – Years of experience in all project types",
  "Quality Materials – We use only premium products",
  "On-Time Completion – We respect your schedule",
  "Permit Handling – We manage all paperwork",
  "Warranty Included – Peace of mind guarantee",
];

const projectTypeOptions = [
  "Home Addition / Expansion",
  "Kitchen Renovation",
  "Bathroom Remodel",
  "Whole Home Renovation",
  "Basement Finishing",
  "ADA Accessibility Upgrade",
  "Exterior Renovation",
  "Tiny Home / ADU Construction",
  "Energy Efficiency Upgrades",
  "Smart Home Integration",
  "Emergency Repair",
  "General Renovation",
  "Other (Please Specify)",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1-2 months",
  "Within 3-6 months",
  "More than 6 months",
  "Flexible / Just exploring",
];

const budgetOptions = [
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $200,000",
  "$200,000+",
  "Not sure yet",
];

const referralOptions = [
  "Google Search",
  "Social Media",
  "Friend or Family Referral",
  "Previous Customer",
  "Saw Your Work",
  "Online Advertisement",
  "Other",
];

const processSteps = [
  {
    title: "Submit Request",
    description:
      "Fill out our simple quote form with your project details and preferences.",
  },
  {
    title: "Free Consultation",
    description:
      "We schedule a convenient visit to discuss your vision and gather specifics.",
  },
  {
    title: "Detailed Estimate",
    description:
      "Receive a comprehensive, itemized quote with timeline and material specifications.",
  },
  {
    title: "Start Building",
    description:
      "Once approved, we handle permits, scheduling, and deliver quality craftsmanship.",
  },
];

const QuotePage: NextPageWithMeta = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<FileList | null>(null);
  const { notify } = useNotifications();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const photos = formData
      .getAll("photos")
      .filter((file): file is File => file instanceof File)
      .filter((file) => file.name && file.size > 0)
      .map((file) => ({ name: file.name, size: file.size, type: file.type }));

    const payload: QuoteRequestPayload = {
      source: "quote_form",
      firstName: (formData.get("firstName") as string | null)?.trim() || null,
      lastName: (formData.get("lastName") as string | null)?.trim() || null,
      email: (formData.get("email") as string | null)?.trim() || null,
      phone: (formData.get("phone") as string | null)?.trim() || null,
      addressLine: (formData.get("address") as string | null)?.trim() || null,
      city: (formData.get("city") as string | null)?.trim() || null,
      projectType: (formData.get("projectType") as string | null)?.trim() || null,
      service: (formData.get("projectType") as string | null)?.trim() || null,
      timeline: (formData.get("timeline") as string | null)?.trim() || null,
      budget: (formData.get("budget") as string | null)?.trim() || null,
      referral: (formData.get("referral") as string | null)?.trim() || null,
      details: (formData.get("details") as string | null)?.trim() || null,
      meta: photos.length > 0 ? { attachments: photos } : null,
    };

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Submission failed (${response.status})`);
      }

      setSuccessMessage("Thank you! Your quote request has been received. We'll contact you within 24 hours.");
      notify({
        title: "Quote request sent",
        message: "Our team will reach out within 24 hours.",
        intent: "success",
      });
      form.reset();
      setSelectedPhotos(null);
    } catch (error) {
      console.error("[quote.form.submit]", error);
      const message = error instanceof Error ? error.message : "We couldn't send your request. Please try again.";
      setErrorMessage(message);
      notify({
        title: "Submission failed",
        message,
        intent: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="space-y-16 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-tangerine via-amber to-tangerine px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Request Your Free Quote
        </h1>
        <p className="max-w-2xl text-lg text-white/90">
          No obligation. No pressure. Just honest, transparent pricing for your
          construction project anywhere in the DMV region.
        </p>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content">
        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-navy">
              Why Choose Kealee Construction?
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              {benefitList.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span className="mt-1 text-amber">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-gradient-to-r from-ocean to-slate-800 px-6 py-6 text-white shadow-inner">
              <h3 className="text-lg font-semibold">Prefer to Talk?</h3>
              <p className="mt-2 text-sm text-white/90">
                Call us now for immediate assistance:
              </p>
              <a
                href="tel:4438529890"
                className="mt-4 inline-flex items-center justify-center text-base font-semibold text-amber underline decoration-amber/40 underline-offset-4 transition hover:decoration-amber"
              >
                (443) 852-9890
              </a>
              <p className="mt-4 text-xs text-white/75">
                Monday-Friday: 9AM-4PM • 24/7 Emergency Service Available
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-navy">
              Request Your Free Quote
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber">
              Get a detailed estimate within 24-48 hours
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-navy">
                    First Name <span className="text-amber">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-navy">
                    Last Name <span className="text-amber">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-navy">
                    Email Address <span className="text-amber">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-navy">
                    Phone Number <span className="text-amber">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-semibold text-navy">
                  Project Address <span className="text-amber">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-semibold text-navy">
                  City / Region <span className="text-amber">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-semibold text-navy">
                  Project Type <span className="text-amber">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                >
                  <option value="">Select Project Type</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="timeline" className="text-sm font-semibold text-navy">
                    Desired Timeline <span className="text-amber">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">When do you want to start?</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-semibold text-navy">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">Select Budget Range (Optional)</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="text-sm font-semibold text-navy">
                  Project Details <span className="text-amber">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  required
                  placeholder="Please describe your project in detail. Include dimensions, specific requirements, materials preferences, and any other relevant information..."
                  className="min-h-[140px] w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="photos" className="text-sm font-semibold text-navy">
                  Upload Photos (Optional)
                </label>
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="w-full rounded-lg border-2 border-dashed border-slate-200 px-4 py-3 text-sm text-slate-600 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                />
                <p className="text-xs text-slate-500">
                  You can upload multiple photos of your project site (JPG, PNG, or PDF).
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="referral" className="text-sm font-semibold text-navy">
                  How did you hear about us?
                </label>
                <select
                  id="referral"
                  name="referral"
                  className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                >
                  <option value="">Select One (Optional)</option>
                  {referralOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              <button type="submit" className="btn-primary w-full justify-center" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Get My Free Quote"}
              </button>

              <div className="rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-slate-700">
                <strong className="text-navy">What happens next?</strong>
                <br />
                We&apos;ll review your request and contact you within 24-48 hours to schedule a free on-site consultation. During the consultation, we&apos;ll discuss your vision, take measurements, answer questions, and provide a detailed estimate.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content space-y-10">
        <h2 className="section-title text-center">
          Our Simple 4-Step Process
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ocean text-lg font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Let&apos;s Build Something Exceptional
        </h2>
        <p className="text-lg text-white/80">
          Share your project details today and receive a detailed, no-pressure
          quote from the Kealee Construction team.
        </p>
      </div>
    </section>
  </div>
  );
};

QuotePage.meta = {
  title: "Free Quote & Consultation | Kealee Construction | Maryland",
  description:
    "Request a free construction quote from Kealee Construction. Detailed estimates for additions, renovations, ADA modifications, and more across DC, Maryland, and Virginia.",
};

export default QuotePage;
