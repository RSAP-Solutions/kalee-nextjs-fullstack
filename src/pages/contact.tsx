import Link from "next/link";
import type { NextPageWithMeta } from "./_app";

const contactCards = [
  {
    icon: "📞",
    title: "Call Us",
    description: ["Speak with our team"],
    linkLabel: "(443) 852-9890",
    href: "tel:4438529890",
  },
  {
    icon: "✉️",
    title: "Email Us",
    description: ["Send us a message"],
    linkLabel: "contact@kealeeservices.com",
    href: "mailto:contact@kealeeservices.com",
  },
  {
    icon: "📍",
    title: "Visit Us",
    description: ["6710 Oxon Hill Rd", "Oxon Hill, MD 20745"],
  },
  {
    icon: "⏰",
    title: "Business Hours",
    description: ["Monday - Friday", "9:00 AM - 4:00 PM"],
    highlight: "24/7 Emergency Service",
  },
];

const serviceOptions = [
  "Home Addition / Expansion",
  "Kitchen Renovation",
  "Bathroom Remodeling",
  "ADA Accessibility Updates",
  "Tiny Home / ADU Construction",
  "Energy & Smart Home Upgrades",
  "Complete Home Remodel",
  "Emergency Construction Repair",
  "Other / Multiple Services",
];

const projectLocations = [
  "Washington DC",
  "Prince George County, MD",
  "Montgomery County, MD",
  "Southern Maryland",
  "Northern Virginia",
  "Baltimore, MD",
];

const contactPreferences = ["Phone Call", "Email", "Text Message", "Any Method"];

const businessHours = [
  { day: "Monday", time: "9:00 AM - 4:00 PM" },
  { day: "Tuesday", time: "9:00 AM - 4:00 PM" },
  { day: "Wednesday", time: "9:00 AM - 4:00 PM" },
  { day: "Thursday", time: "9:00 AM - 4:00 PM" },
  { day: "Friday", time: "9:00 AM - 4:00 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];

const serviceAreas = [
  "📍 Washington DC",
  "📍 Prince George County, MD",
  "📍 Montgomery County, MD",
  "📍 Southern Maryland",
  "📍 Northern Virginia",
  "📍 Baltimore, MD",
];

const ContactPage: NextPageWithMeta = () => (
  <div className="space-y-16 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Contact Kealee Construction
        </h1>
        <p className="max-w-2xl text-lg text-white/85">
          Get your free estimate today — serving Washington DC, Maryland, and Virginia.
        </p>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-content gap-6 md:grid-cols-2 xl:grid-cols-4">
        {contactCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border-t-4 border-ocean bg-slate-50 p-8 text-center shadow-card transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="text-4xl text-tangerine">{card.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-navy">{card.title}</h3>
            {card.description?.map((line) => (
              <p key={line} className="text-sm text-slate-600">
                {line}
              </p>
            ))}
            {card.href ? (
              <a
                href={card.href}
                className="mt-3 inline-flex items-center justify-center text-base font-semibold text-ocean"
              >
                {card.linkLabel}
              </a>
            ) : null}
            {card.highlight ? (
              <p className="mt-3 text-sm font-semibold text-tangerine">{card.highlight}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <div className="text-center">
          <h2 className="section-title text-left sm:text-center">
            Request Your Free Quote
          </h2>
          <p className="section-subtitle">
            Fill out the form below and we’ll get back to you within 24 hours.
          </p>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-6 rounded-3xl bg-white p-8 shadow-card"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-navy">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="John Smith"
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-navy">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(443) 555-1234"
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-navy">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-semibold text-navy">
                Property Address *
              </label>
              <input
                id="address"
                name="address"
                required
                placeholder="Street, City, State ZIP"
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-semibold text-navy">
                Service Needed *
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="">Select a Service...</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-semibold text-navy">
                Project Location *
              </label>
              <select
                id="location"
                name="location"
                required
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="">Select Location...</option>
                {projectLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-semibold text-navy">
                Project Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="">When do you want to start?</option>
                <option value="ASAP">As Soon As Possible</option>
                <option value="1-3 months">Within 1-3 Months</option>
                <option value="3-6 months">Within 3-6 Months</option>
                <option value="6+ months">6+ Months / Planning Phase</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
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
                <option value="">Select Budget Range...</option>
                <option value="Under $10,000">Under $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="Over $100,000">Over $100,000</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-navy">
              Project Details *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Please describe your project, including any specific requirements, size, materials, or questions you have..."
              className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-preference"
              className="text-sm font-semibold text-navy"
            >
              Preferred Contact Method
            </label>
            <select
              id="contact-preference"
              name="contact-preference"
              className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
            >
              {contactPreferences.map((preference) => (
                <option key={preference} value={preference}>
                  {preference}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="_subject" value="New Quote Request from Kealee Website" />
          <input type="hidden" name="_next" value="https://www.kealeeservices.com/thank-you.html" />
          <input type="hidden" name="_template" value="table" />

          <button type="submit" className="btn-primary w-full justify-center">
            Submit Quote Request
          </button>

          <p className="text-center text-sm text-slate-600">
            * Required fields | We&apos;ll respond within 24 hours.
            <br />
            Or call us directly:{" "}
            <a href="tel:4438529890" className="font-semibold text-ocean">
              (443) 852-9890
            </a>
          </p>
        </form>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content space-y-6">
        <h2 className="section-title text-left sm:text-center">Find Us</h2>
        <p className="text-center text-sm text-slate-600">
          6710 Oxon Hill Rd, Oxon Hill, MD 20745
        </p>
        <div className="overflow-hidden rounded-3xl shadow-card">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.7434!2d-76.9894!3d38.7926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ3JzMzLjQiTiA3NsKwNTknMjEuOCJX!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kealee Construction Location"
          />
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-8 rounded-3xl bg-white p-8 shadow-card">
        <h2 className="section-title text-left sm:text-center">Business Hours</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {businessHours.map((row) => (
            <div
              key={row.day}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 md:pb-0"
            >
              <span className="text-sm font-semibold text-navy">{row.day}</span>
              <span className="text-sm text-slate-600">{row.time}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-tangerine to-amber px-6 py-5 text-center text-white shadow-inner">
          <h3 className="text-lg font-semibold">🚨 24-Hour Emergency Service Available</h3>
          <p className="mt-2 text-sm text-white/90">
            For urgent construction emergencies, call us anytime at{" "}
            <a href="tel:4438529890" className="font-semibold text-white underline decoration-white/40">
              (443) 852-9890
            </a>
            .
          </p>
        </div>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content space-y-8">
        <h2 className="section-title text-left sm:text-center">Areas We Serve</h2>
        <p className="text-center text-sm text-slate-600">
          Proudly serving homeowners throughout the DMV area.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceAreas.map((area) => (
            <div
              key={area}
              className="rounded-2xl border-l-4 border-ocean bg-slate-50 p-5 text-center shadow-sm"
            >
              <h3 className="text-sm font-semibold text-navy">{area}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Let’s Talk About Your Project
        </h2>
        <p className="text-lg text-white/80">
          Call or message us to schedule your consultation and receive a detailed estimate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary">
            Request Free Estimate
          </Link>
          <a href="tel:4438529890" className="btn-secondary border-white/40 text-white">
            Call (443) 852-9890
          </a>
        </div>
      </div>
    </section>
  </div>
);

ContactPage.meta = {
  title: "Contact Kealee Construction | Free Quote | (443) 852-9890",
  description:
    "Contact Kealee Construction for free estimates on home renovations, additions, and remodeling projects across Washington DC, Maryland, and Virginia.",
};

export default ContactPage;
