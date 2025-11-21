import Link from "next/link";
import type { NextPageWithMeta } from "./_app";

const services = [
  {
    title: "Custom Home Construction",
    description:
      "Build your dream home from the ground up with full-service support across design, permitting, and construction management.",
  },
  {
    title: "Whole House Renovation",
    description:
      "Transform your entire home with structural updates, modern finishes, and coordinated interior/exterior upgrades.",
  },
  {
    title: "Exterior Renovation & Outdoor Living",
    description:
      "Comprehensive exterior makeovers, roofing, siding, decks, and outdoor living spaces built for impact and durability.",
  },
  {
    title: "Home Additions & Expansions",
    description:
      "Second-story additions, conversions, and custom expansions that deliver seamless square footage and add long-term value.",
  },
  {
    title: "Kitchen Renovation",
    description:
      "Modern kitchen remodeling from concept to completion with space planning, cabinetry, surfaces, and appliance coordination.",
  },
  {
    title: "Bathroom Remodeling",
    description:
      "Spa-inspired bathroom renovations with waterproofing, premium fixtures, tile work, and aging-in-place upgrades.",
  },
  {
    title: "ADA Accessibility Renovations",
    description:
      "Universal design solutions that make homes safer and more accessible, including ramps, lifts, and compliant bathrooms.",
  },
  {
    title: "Tiny Homes & ADU Construction",
    description:
      "Accessory dwelling units, backyard studios, and alternative living spaces that maximize your property potential.",
  },
  {
    title: "Energy & Smart Home Upgrades",
    description:
      "High-efficiency windows, smart automation, LED lighting, and insulation upgrades that reduce operating costs.",
  },
];

const consultationTiers = [
  {
    tier: "1",
    name: "Quick Virtual Consult",
    price: "Free",
    highlighted: false,
    description:
      "Fast, automated prequalification to understand scope, timing, and budget. Ideal for exploring possibilities.",
    features: [
      "3-5 minute guided intake",
      "Project scope conversation",
      "Budget range outline",
      "Timeline expectations",
      "Personalized next-step plan",
    ],
  },
  {
    tier: "2",
    name: "Professional Site Visit & Estimate",
    price: "$199 - $299",
    highlighted: true,
    description:
      "Comprehensive on-site evaluation with detailed scope definition, pricing insights, and recommendations.",
    features: [
      "Licensed contractor walkthrough",
      "Measurements & site photography",
      "Detailed written estimate",
      "Material guidance",
      "Timeline & phasing roadmap",
    ],
    credit: "100% credit toward construction contract",
  },
  {
    tier: "3",
    name: "Design & Scope Concept Package",
    price: "$499 - $999",
    highlighted: false,
    description:
      "Collaborative design session with concepts, finishes, and phasing for homeowners seeking full clarity.",
    features: [
      "Concept sketches & layouts",
      "Interior & exterior mood boards",
      "Finish & fixture selections",
      "Permit & code review insights",
      "Detailed project roadmap",
    ],
  },
];

const differentiators = [
  {
    title: "Speed Meets Precision",
    description:
      "Streamlined processes and experienced crews keep your project on schedule without compromising quality.",
    icon: "⚡️",
  },
  {
    title: "Quality Craftsmanship",
    description:
      "Licensed, insured professionals delivering meticulous workmanship backed by industry-leading warranties.",
    icon: "🛠️",
  },
  {
    title: "Transparent Budgeting",
    description:
      "Detailed estimates, value engineering options, and financing guidance that keep investments on track.",
    icon: "💡",
  },
  {
    title: "Trusted Local Builder",
    description:
      "Serving Washington DC, Maryland, and Northern Virginia with deep knowledge of regional codes and permitting.",
    icon: "📍",
  },
];

const specializationCategories = [
  {
    title: "Renovation & Remodeling",
    keywords: [
      "Whole-House Renovation",
      "Interior Remodeling",
      "Custom Cabinetry & Millwork",
      "Open-Concept Conversions",
      "Basement Finishing",
    ],
  },
  {
    title: "Structural & Additions",
    keywords: [
      "Second-Story Additions",
      "In-Law Suites",
      "Garage Conversions",
      "Sunrooms & Four-Season Rooms",
      "Structural Repairs & Framing",
    ],
  },
  {
    title: "Energy & Smart Home",
    keywords: [
      "Smart Home Integration",
      "Solar-Ready Upgrades",
      "High-Efficiency Windows",
      "LED Lighting Plans",
      "Insulation & Envelope Upgrades",
    ],
  },
  {
    title: "Alternative Living Spaces",
    keywords: [
      "Accessory Dwelling Units (ADU)",
      "Tiny Home Construction",
      "Backyard Studios",
      "Guest House Builds",
      "Adaptive Reuse Spaces",
    ],
  },
];

const serviceOptions = [
  "Custom Home Construction",
  "Whole House Renovation",
  "Exterior Renovation",
  "Home Addition",
  "Kitchen Renovation",
  "Bathroom Remodeling",
  "ADA Accessibility Updates",
  "Tiny Home / ADU Construction",
  "Energy & Smart Home Upgrades",
  "Emergency Construction Repair",
  "Other / Multiple Services",
];

const locationOptions = [
  "Washington DC",
  "Prince George County, MD",
  "Montgomery County, MD",
  "Southern Maryland",
  "Northern Virginia",
  "Baltimore, MD",
];

const budgetOptions = [
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "Over $100,000",
  "Not Sure Yet",
];

const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";

const Home: NextPageWithMeta = () => {
  return (
    <div className="space-y-24 py-12 sm:py-16">
      <section className="relative -mx-4 -mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10">
          <div className="space-y-6 text-center lg:text-left">
            <span className="badge bg-white/10 text-sm font-semibold uppercase tracking-wide text-amber">
              Licensed General Contractor • DMV Region
            </span>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              Professional Construction Services & Home Renovations
            </h1>
            <p className="text-xl font-semibold text-amber">
              Speed Meets Precision
            </p>
            <p className="mx-auto max-w-3xl text-lg text-white/85 lg:mx-0">
              Kealee Construction delivers quality additions, renovations, and
              custom builds across Washington DC, Prince George County,
              Montgomery County, Southern Maryland, Northern Virginia, and
              Baltimore. 24/7 emergency response backed by licensed experts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link href="/consultation-services" className="btn-primary">
                Book Consultation
              </Link>
              <a href="tel:4438529890" className="btn-secondary border-white/40">
                Call (443) 852-9890
              </a>
            </div>
          </div>
          <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: "10+ Years",
                label: "Regional Experience",
              },
              {
                value: "24/7",
                label: "Emergency Service",
              },
              {
                value: "100%",
                label: "Consultation Credit",
              },
              {
                value: "Licensed & Insured",
                label: "Peace of Mind",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur"
              >
                <p className="text-2xl font-bold text-amber">{stat.value}</p>
                <p className="mt-2 text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="space-y-12">
        <div className="text-center">
          <h2 className="section-title">
            Expert Construction & Remodeling Services
          </h2>
          <p className="section-subtitle mx-auto">
            Full-service residential construction tailored to Washington DC,
            Maryland, and Virginia homeowners. Explore the solutions that fit
            your project goals.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="card border-t-4 border-ocean">
              <h3 className="text-xl font-semibold text-tangerine">
                {service.title}
              </h3>
              <p className="mt-4 text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="section-muted space-y-12 rounded-3xl p-10 sm:p-12">
        <div className="text-center">
          <h2 className="section-title">Choose Your Consultation Package</h2>
          <p className="section-subtitle mx-auto">
            Every paid consultation is credited in full toward your construction
            contract. Select the path that fits your planning needs.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {consultationTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-card transition-transform duration-200 hover:-translate-y-1 ${tier.highlighted ? "border-t-8 border-amber ring-2 ring-amber/30" : "border-t-8 border-ocean/70"}`}
            >
              {tier.highlighted && (
                <span className="absolute -top-4 right-6 rounded-full bg-amber px-4 py-1 text-xs font-semibold uppercase text-navy">
                  Most Popular
                </span>
              )}
              <div className="text-5xl font-bold text-ocean">{tier.tier}</div>
              <h3 className="mt-4 text-2xl font-semibold text-navy">
                {tier.name}
              </h3>
              <p
                className={`mt-2 text-xl font-bold ${tier.price.toLowerCase().includes("free") ? "text-emerald-500" : "text-tangerine"}`}
              >
                {tier.price}
              </p>
              <p className="mt-4 text-slate-600">{tier.description}</p>
              {tier.credit && (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {tier.credit}
                </div>
              )}
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 text-emerald-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/consultation-services"
                className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${tier.highlighted ? "bg-amber text-navy hover:bg-amber/90" : "bg-tangerine text-white hover:bg-amber"}`}
              >
                Reserve This Consultation
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-12">
        <div className="text-center">
          <h2 className="section-title">Why Homeowners Choose Kealee</h2>
          <p className="section-subtitle mx-auto">
            Local expertise, proven systems, and a dedication to craftsmanship
            make every project a confident investment.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div key={item.title} className="card text-center">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section-muted space-y-12 rounded-3xl p-10 sm:p-12">
        <div className="text-center">
          <h2 className="section-title">Specialized Construction Expertise</h2>
          <p className="section-subtitle mx-auto">
            From ground-up new builds to adaptive reuse, our teams deliver
            comprehensive solutions for every style of renovation.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {specializationCategories.map((category) => (
            <div key={category.title} className="rounded-2xl bg-white p-8 shadow-card">
              <h3 className="text-xl font-semibold text-navy">
                {category.title}
              </h3>
              <div className="mt-4 grid gap-3">
                {category.keywords.map((keyword) => (
                  <div
                    key={keyword}
                    className="rounded-lg border-l-4 border-tangerine bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-transform hover:translate-x-1"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative -mx-4 rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div className="mx-auto flex w-full max-w-content flex-col gap-12">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Ready to Start Your Renovation?
            </h2>
            <p className="text-lg text-white/80">
              Request a consultation and receive a tailored project roadmap.
              Serving Washington DC, Maryland, and Northern Virginia with rapid
              response and transparent estimates.
            </p>
          </div>
          <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
            <form
              action={formspreeEndpoint}
              method="POST"
              className="grid gap-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-navy"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-navy"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-navy"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="consultation"
                    className="text-sm font-semibold text-navy"
                  >
                    Consultation Tier *
                  </label>
                  <select
                    id="consultation"
                    name="consultation"
                    required
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">Select Consultation Package...</option>
                    {consultationTiers.map((tier) => (
                      <option
                        key={tier.name}
                        value={`${tier.name} (${tier.price})`}
                      >
                        {tier.name} ({tier.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="service"
                    className="text-sm font-semibold text-navy"
                  >
                    Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">Select a Service...</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="location"
                    className="text-sm font-semibold text-navy"
                  >
                    Project Location *
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">Select Location...</option>
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="budget"
                    className="text-sm font-semibold text-navy"
                  >
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">Select Budget Range...</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-navy"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your construction or renovation project..."
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </div>
              </div>

              <input
                type="hidden"
                name="_subject"
                value="New Quote Request from Kealee Website"
              />
              <input
                type="hidden"
                name="_next"
                value="https://www.kealeeservices.com/thank-you.html"
              />

              <button type="submit" className="btn-primary justify-center">
                Book Consultation – Get Started Today
              </button>

              <p className="text-center text-sm font-medium text-navy">
                Or call us directly:{" "}
                <a
                  href="tel:4438529890"
                  className="font-semibold text-tangerine"
                >
                  (443) 852-9890
                </a>{" "}
                · Email:{" "}
                <a
                  href="mailto:contact@kealeeservices.com"
                  className="font-semibold text-tangerine"
                >
                  contact@kealeeservices.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

Home.meta = {
  title:
    "Kealee Construction | Professional Home Renovation & Licensed General Contractor",
  description:
    "Licensed general contractor providing custom home construction, additions, renovations, and emergency repair in Washington DC, Maryland, and Northern Virginia.",
};

export default Home;
