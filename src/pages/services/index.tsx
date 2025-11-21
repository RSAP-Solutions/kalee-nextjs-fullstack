import Link from "next/link";
import type { NextPageWithMeta } from "../_app";

const serviceCards = [
  {
    icon: "🏠",
    title: "Home Additions & Expansions",
    description:
      "Seamless additions that extend your living space while matching the character of your home.",
    pricing: "Starting at $80-200 per sq ft",
    features: [
      "Room Additions",
      "Second Story Additions",
      "Garage Conversions",
      "Sunroom & Patio Enclosures",
      "In-Law Suites",
    ],
    href: "/services/home-additions",
  },
  {
    icon: "🍳",
    title: "Kitchen & Bathroom Renovation",
    description:
      "Transform essential spaces with modern design, premium finishes, and thoughtful layouts.",
    pricing: "Kitchen: $12k-$35k+ | Bath: $8k-$25k+",
    features: [
      "Custom Cabinetry & Countertops",
      "Tile & Flooring Installation",
      "Plumbing & Electrical Updates",
      "Modern Fixtures & Appliances",
      "Full-Service Design Support",
    ],
    href: "/services/kitchen-bathroom-renovation",
  },
  {
    icon: "♿",
    title: "ADA Accessibility Renovations",
    description:
      "Inclusive upgrades that make daily living safer and easier for every member of your household.",
    pricing: "Custom pricing – Free consultation",
    features: [
      "Accessible Bathrooms",
      "Ramp Installations",
      "Doorway Widening",
      "Grab Bar Integration",
      "Universal Design Solutions",
    ],
    href: "/services/ada-accessibility",
  },
  {
    icon: "🏡",
    title: "Tiny Homes & ADU Construction",
    description:
      "Accessory dwelling units and compact homes ideal for multi-generational living or rental income.",
    pricing: "$50,000-$150,000+",
    features: [
      "Tiny Home Design & Build",
      "Accessory Dwelling Units (ADU)",
      "Backyard Office / Studio",
      "Guest House Construction",
      "Permit & Zoning Assistance",
    ],
    href: "/services/tiny-homes-adu",
  },
  {
    icon: "⚡",
    title: "Energy & Smart Home Upgrades",
    description:
      "Lower utility costs and modernize your home with integrated smart technology and efficient systems.",
    pricing: "$5,000-$30,000+",
    features: [
      "High-Efficiency Windows & Doors",
      "Smart Home Automation",
      "Solar Panel Planning Support",
      "LED Lighting Systems",
      "Insulation Upgrades",
    ],
    href: "/services/energy-smart-home",
  },
  {
    icon: "🚨",
    title: "Emergency Construction Repair",
    description:
      "24/7 emergency response for storm damage, leaks, and structural issues requiring immediate attention.",
    pricing: "Immediate response – contact for dispatch",
    features: [
      "Storm Damage Repair",
      "Water Intrusion Mitigation",
      "Structural Stabilization",
      "Roof Leak Repairs",
      "Same-Day Service Available",
    ],
    href: "/services/emergency-repair",
  },
];

const trustHighlights = [
  {
    icon: "✅",
    title: "Licensed & Insured",
    description: "Fully licensed, bonded, and insured for your protection.",
  },
  {
    icon: "⏰",
    title: "On-Time Completion",
    description: "Focused project management keeps your schedule on track.",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    description: "Detailed estimates and proactive scope management.",
  },
  {
    icon: "⭐",
    title: "Quality Craftsmanship",
    description: "Seasoned craftsmen with 15+ years of experience.",
  },
];

const ServicesOverview: NextPageWithMeta = () => (
  <div className="space-y-20 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 text-center lg:text-left">
        <span className="badge bg-white/10 text-sm font-semibold uppercase tracking-wide text-amber">
          Construction Services
        </span>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Full-Service Residential Construction & Remodeling
        </h1>
        <p className="text-lg text-white/80">
          From single-room renovations to multi-story additions, Kealee
          Construction delivers quality craftsmanship across Washington DC,
          Maryland, and Northern Virginia.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <Link href="/consultation-services" className="btn-primary">
            Book a Consultation
          </Link>
          <Link href="/quote" className="btn-secondary border-white/40">
            Request Detailed Estimate
          </Link>
        </div>
      </div>
    </section>

    <section className="space-y-12">
      <div className="text-center">
        <h2 className="section-title">Complete Construction Solutions</h2>
        <p className="section-subtitle mx-auto">
          Every service is delivered with licensed expertise, transparent
          communication, and precise project management.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {serviceCards.map((service) => (
          <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-amber">
                  {service.pricing}
                </p>
              </div>
            </div>
            <p className="mt-4 text-slate-600">{service.description}</p>
            <ul className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={service.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:text-amber"
            >
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </section>

    <section className="section-muted space-y-10 rounded-3xl p-10 sm:p-12">
      <div className="text-center">
        <h2 className="section-title">Why Choose Kealee Construction?</h2>
        <p className="section-subtitle mx-auto">
          Experience, accountability, and trusted relationships set our team
          apart.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustHighlights.map((item) => (
          <div key={item.title} className="card text-center">
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-navy">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="relative -mx-4 rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg text-white/80">
          Get a free estimate and consultation. Serving Washington DC, Prince
          George County, Montgomery County, Southern Maryland, Northern
          Virginia, and Baltimore.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary bg-amber text-navy hover:bg-amber/90">
            Get Free Estimate
          </Link>
          <a href="tel:4438529890" className="btn-secondary border-white/40">
            Call (443) 852-9890
          </a>
        </div>
      </div>
    </section>
  </div>
);

ServicesOverview.meta = {
  title:
    "Construction Services | Kealee Construction | Renovations, Additions, ADU & More",
  description:
    "Explore Kealee Construction&apos;s full suite of residential services including home additions, kitchen and bathroom renovations, ADA upgrades, ADUs, and emergency repairs.",
};

export default ServicesOverview;
