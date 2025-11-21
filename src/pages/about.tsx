import Link from "next/link";
import type { NextPageWithMeta } from "./_app";

const storyParagraphs = [
  "Welcome to Kealee Construction, where quality craftsmanship meets exceptional service. Since 2014, we&apos;ve transformed homes across Washington DC, Prince George County, Montgomery County, Southern Maryland, Northern Virginia, and Baltimore with construction and remodeling services that exceed expectations.",
  "Kealee Construction was founded on a simple principle: deliver superior construction services with honesty, integrity, and attention to detail. What started as a small, family-owned operation has grown into one of the region&apos;s most trusted general contractors, while staying true to our customer-first values.",
  "Every member of our team brings years of specialized experience to your project. From licensed contractors to seasoned craftsmen, we maintain the highest standards at every phase of construction. We understand the DMV market, code requirements, and what it takes to deliver projects that stand the test of time.",
  "Our comprehensive services include home additions, kitchen and bathroom renovations, ADA accessibility updates, energy-efficient upgrades, smart home integration, tiny home and ADU construction, and complete residential remodeling. We stay current with building science, permitting changes, and contemporary design to deliver projects that feel modern and personal.",
  "As a locally owned business, we take pride in supporting area suppliers, employing local craftspeople, and reinvesting in the communities we serve. Many of our projects come from referrals—a reflection of the trust we build and the results we deliver.",
  "Whether your home is bursting at the seams, you need an ADA upgrade, or you&apos;re planning a major renovation, Kealee Construction is here to help. We blend speed with precision, stick to budgets and timelines, and treat your home as if it were our own.",
  "Ready to begin? Call (443) 852-9890 or email contact@kealeeservices.com to schedule your consultation.",
];

const highlights = [
  {
    title: "Licensed & Insured",
    description:
      "Fully licensed, bonded, and insured to protect your property and investment.",
  },
  {
    title: "Experienced Team",
    description:
      "Average of 15+ years in residential construction across additions, renovations, and specialty projects.",
  },
  {
    title: "Quality Materials",
    description:
      "We partner with trusted suppliers to source durable materials that elevate your home.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Detailed estimates, clear scopes of work, and proactive communication throughout the build.",
  },
  {
    title: "On-Time Completion",
    description:
      "Efficient project management keeps construction on schedule without sacrificing precision.",
  },
  {
    title: "24/7 Emergency Support",
    description:
      "When urgent repair needs arise, our team is on call day or night.",
  },
];

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Emergency Response" },
];

const values = [
  {
    title: "🎯 Quality First",
    description:
      "Every project receives meticulous attention, premium materials, and expert craftsmanship.",
  },
  {
    title: "🤝 Integrity",
    description:
      "Transparency guides everything we do—from upfront estimates to clear communication.",
  },
  {
    title: "⏰ Reliability",
    description:
      "We show up, follow through, and deliver on time. Your schedule matters.",
  },
  {
    title: "💡 Innovation",
    description:
      "We apply modern building science, sustainable solutions, and design-forward thinking.",
  },
  {
    title: "👨‍👩‍👧‍👦 Family Values",
    description:
      "As a family-owned company, we respect your home as if it were our own.",
  },
  {
    title: "🌟 Excellence",
    description:
      "Good isn&apos;t enough. We pursue excellence in every detail, every day.",
  },
];

const AboutPage: NextPageWithMeta = () => (
  <div className="space-y-20 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 text-center lg:text-left">
        <span className="badge bg-white/10 text-sm font-semibold uppercase tracking-wide text-amber">
          About Kealee Construction
        </span>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Trusted General Contractors Serving DC, Maryland & Virginia
        </h1>
        <p className="text-lg text-white/85">
          Since 2014, we&apos;ve blended craftsmanship, innovation, and integrity to
          deliver additions, renovations, and specialty builds that feel right
          at home.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <Link href="/quote" className="btn-primary">
            Request a Consultation
          </Link>
          <Link href="/consultation-services" className="btn-secondary">
            Explore Consultation Tiers
          </Link>
        </div>
      </div>
    </section>

    <section className="space-y-12">
      <div className="space-y-6">
        <h2 className="section-title text-left">Building Dreams, One Project at a Time</h2>
        <div className="grid gap-8">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-6 rounded-3xl bg-slate-50 p-8 shadow-card md:grid-cols-2">
        {highlights.map((highlight) => (
          <div key={highlight.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-navy">{highlight.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="section-muted space-y-12 rounded-3xl p-10 sm:p-12">
      <div className="text-center">
        <h2 className="section-title">Kealee Construction by the Numbers</h2>
        <p className="section-subtitle mx-auto">
          A decade of proven results throughout Washington DC, Maryland, and Northern Virginia.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="text-3xl font-bold text-ocean">{stat.value}</div>
            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-10">
      <div className="text-center">
        <h2 className="section-title">Our Core Values</h2>
        <p className="section-subtitle mx-auto">
          These principles shape every interaction, project milestone, and finished space.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="card text-left">
            <h3 className="text-lg font-semibold text-navy">{value.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{value.description}</p>
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
          Join hundreds of satisfied homeowners who trusted Kealee Construction
          with their renovation and addition plans.
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

AboutPage.meta = {
  title:
    "About Kealee Construction | Licensed General Contractor in Washington DC, Maryland & Virginia",
  description:
    "Learn about Kealee Construction—family-owned, licensed general contractors delivering renovations, additions, and custom builds across the DMV since 2014.",
};

export default AboutPage;
