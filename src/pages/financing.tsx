import Link from "next/link";
import type { NextPageWithMeta } from "./_app";

const financingOptions = [
  {
    icon: "🏦",
    title: "Home Improvement Loans",
    description:
      "Secure financing specifically designed for renovation and construction projects.",
    points: [
      "Competitive interest rates",
      "Flexible loan terms (5-20 years)",
      "Borrow up to $100,000+",
      "Quick approval process",
      "No prepayment penalties",
    ],
  },
  {
    icon: "💳",
    title: "Credit Card Payments",
    description:
      "Use your existing credit cards for smaller projects or deposits.",
    points: [
      "All major cards accepted",
      "Earn rewards on your project",
      "Convenient and fast",
      "Suitable for projects under $25,000",
      "0% APR options available",
    ],
  },
  {
    icon: "📋",
    title: "In-House Payment Plans",
    description:
      "Flexible payment schedules tailored to your project timeline.",
    points: [
      "Customized payment schedules",
      "Progress-based payments",
      "Initial deposit required",
      "No third-party involvement",
      "Direct communication with us",
    ],
  },
  {
    icon: "🏠",
    title: "Home Equity Options",
    description:
      "Leverage your home’s equity for larger renovation projects.",
    points: [
      "Home Equity Lines of Credit (HELOC)",
      "Home Equity Loans",
      "Cash-out refinancing options",
      "Lower interest rates",
      "Tax advantages may apply",
    ],
  },
  {
    icon: "⚡",
    title: "Special Programs",
    description: "Access special financing for specific project types.",
    points: [
      "Energy efficiency upgrade financing",
      "ADA accessibility grants",
      "Senior citizen discounts",
      "Military veteran programs",
      "First-time homeowner incentives",
    ],
  },
  {
    icon: "💰",
    title: "Traditional Payment",
    description: "Standard payment methods for maximum flexibility.",
    points: [
      "Cash payments",
      "Personal checks",
      "Cashier’s checks",
      "Bank transfers (ACH)",
      "Wire transfers",
    ],
  },
];

const paymentMethods = [
  { title: "💳 Credit Cards", description: "Visa, Mastercard, American Express, Discover" },
  { title: "🏦 Bank Transfers", description: "ACH transfers, wire transfers" },
  { title: "✅ Checks", description: "Personal checks, cashier’s checks" },
  { title: "💵 Cash", description: "Direct cash payments accepted" },
  { title: "📱 Digital Payments", description: "Zelle, PayPal (for deposits)" },
  { title: "🏠 Financing", description: "Through approved lenders" },
];

const averageCosts = [
  {
    label: "Kitchen Renovation",
    price: "$12,000 - $35,000+",
    description: "Includes cabinets, countertops, appliances, flooring, and labor",
  },
  {
    label: "Bathroom Remodel",
    price: "$8,000 - $25,000+",
    description: "Complete bath with fixtures, tile, vanity, and installation",
  },
  {
    label: "Room Addition",
    price: "$80 - $200/sq ft",
    description: "New living space with foundation, framing, and finishing",
  },
  {
    label: "Second Story Addition",
    price: "$100 - $300/sq ft",
    description: "Complete second level with structural support",
  },
  {
    label: "ADA Accessibility Updates",
    price: "$5,000 - $20,000+",
    description: "Ramps, widened doors, accessible bathrooms",
  },
  {
    label: "Tiny Home / ADU",
    price: "$50,000 - $150,000+",
    description: "Complete construction with utilities and finishing",
  },
];

const budgetTips = [
  {
    title: "📊 Set Realistic Expectations",
    items: [
      "Research average costs for your project type",
      "Account for 10-15% contingency buffer",
      "Consider long-term value vs. immediate cost",
      "Prioritize must-haves over nice-to-haves",
    ],
  },
  {
    title: "💬 Communicate with Your Contractor",
    items: [
      "Discuss budget openly from the start",
      "Ask about cost-saving alternatives",
      "Review material upgrades vs. standard options",
      "Request itemized estimates",
    ],
  },
  {
    title: "💡 Optimize Your Financing Strategy",
    items: [
      "Compare rates from multiple lenders",
      "Consider combining financing methods",
      "Check for promotional 0% APR offers",
      "Understand repayment terms clearly",
    ],
  },
  {
    title: "📝 Understand Your Contract",
    items: [
      "Review payment schedule carefully",
      "Clarify what’s included vs. extra costs",
      "Confirm warranty and guarantee terms",
      "Document all changes in writing",
    ],
  },
];

const financingFaqs = [
  {
    question: "Do I need good credit to get financing?",
    answer:
      "While good credit helps secure better rates, we work with multiple lenders who offer options for various credit profiles. Contact us to discuss your specific situation and we’ll help you find the best financing solution.",
  },
  {
    question: "What's the typical down payment requirement?",
    answer:
      "Down payment requirements vary by project size and payment method. Typically, we require 10-25% upfront, with the remainder paid in progress-based installments. We can customize payment schedules to fit your needs.",
  },
  {
    question: "How long does financing approval take?",
    answer:
      "Approval times vary by lender, but most decisions are made within 24-48 hours for pre-qualified applicants. Some programs offer same-day approval. We can help expedite the process.",
  },
  {
    question: "Can I finance materials and labor separately?",
    answer:
      "Yes, we offer flexible arrangements. Some clients prefer to purchase materials separately while financing labor costs, or vice versa. We’ll work with whatever arrangement fits your budget.",
  },
  {
    question: "Are there any special programs for seniors or veterans?",
    answer:
      "Yes! We offer discounts for senior citizens and veterans. Additionally, there are government programs and grants available for accessibility modifications and energy-efficient upgrades. We can help you identify and apply for these programs.",
  },
  {
    question: "What if I need to adjust my budget mid-project?",
    answer:
      "We understand that circumstances change. If adjustments are needed, we’ll work with you to modify the scope, timeline, or payment schedule. Our goal is to complete your project while respecting your financial constraints.",
  },
  {
    question: "Do you offer discounts for paying in full upfront?",
    answer:
      "Yes, we offer a modest discount for projects paid in full before work begins. Contact us to discuss current promotional offers and early payment discounts.",
  },
];

const FinancingPage: NextPageWithMeta = () => (
  <div className="space-y-16 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Financing & Budget Planning
        </h1>
        <p className="max-w-2xl text-lg text-white/85">
          Flexible payment options to make your dream project affordable.
        </p>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-base text-slate-600">
            At Kealee Construction, we believe financial concerns shouldn’t keep
            you from creating the home of your dreams. We offer flexible financing
            and transparent pricing to help you plan your renovation or construction
            with confidence.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-tangerine to-amber px-6 py-8 text-white shadow-card sm:px-10">
          <h3 className="text-2xl font-semibold">No Project Too Small or Too Large</h3>
          <p className="mt-3 text-base text-white/90">
            From minor repairs to major additions, we work within your budget to
            deliver quality craftsmanship at fair prices. Get your free consultation
            today and discover how affordable your dream project can be.
          </p>
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content space-y-12">
        <div className="text-center">
          <h2 className="section-title">Financing Options Available</h2>
          <p className="section-subtitle">
            We’ve partnered with leading financial institutions to offer you convenient
            financing solutions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {financingOptions.map((option) => (
            <div
              key={option.title}
              className="flex h-full flex-col rounded-2xl border-t-4 border-ocean bg-white p-8 shadow-card transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="text-4xl text-center">{option.icon}</div>
              <h3 className="mt-5 text-xl font-semibold text-navy text-center">
                {option.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 text-center">
                {option.description}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                {option.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 text-ocean">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content space-y-10">
        <div className="text-center">
          <h2 className="section-title">Accepted Payment Methods</h2>
          <p className="section-subtitle">
            We accept all major payment forms for your convenience.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paymentMethods.map((method) => (
            <div
              key={method.title}
              className="rounded-2xl border-l-4 border-tangerine bg-slate-50 p-6 text-center shadow-sm"
            >
              <h4 className="text-lg font-semibold text-navy">{method.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content space-y-12">
        <div className="text-center">
          <h2 className="section-title">Budget Planning & Cost Estimates</h2>
          <p className="section-subtitle">
            Understanding typical project costs helps you plan better.
          </p>
        </div>
        <div className="space-y-8">
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h3 className="text-center text-xl font-semibold text-navy">
              Average Project Costs
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {averageCosts.map((cost) => (
                <div
                  key={cost.label}
                  className="rounded-2xl border-l-4 border-ocean bg-slate-50 p-6"
                >
                  <h4 className="text-lg font-semibold text-navy">{cost.label}</h4>
                  <p className="mt-2 text-xl font-bold text-tangerine">{cost.price}</p>
                  <p className="mt-2 text-sm text-slate-600">{cost.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-tangerine to-amber px-6 py-8 text-white shadow-card sm:px-10">
            <h3 className="text-2xl font-semibold">🎯 Get Your Personalized Estimate</h3>
            <p className="mt-3 text-base text-white/90">
              Every project is unique. Contact us for a detailed, itemized quote based
              on your specific needs, materials, and timeline. Our estimates include
              labor, materials, permits, and all associated costs with no hidden fees.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content space-y-10">
        <h2 className="section-title">Budget Planning Tips</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {budgetTips.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border-l-4 border-amber bg-slate-50 p-8 shadow-card"
            >
              <h3 className="text-lg font-semibold text-navy">{tip.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {tip.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-ocean">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content space-y-8">
        <h2 className="section-title">Financing FAQs</h2>
        <div className="space-y-4">
          {financingFaqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border-l-4 border-ocean bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-navy">{faq.question}</h3>
              <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to Discuss Your Project Budget?
        </h2>
        <p className="text-lg text-white/80">
          Get a free, detailed estimate with financing options tailored to your needs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary">
            Request Free Estimate
          </Link>
          <a href="tel:4438529890" className="btn-secondary border-white/40 text-white">
            Call (443) 852-9890
          </a>
        </div>
        <p className="text-sm text-white/75">
          Serving Washington DC, Prince George County, Montgomery County, Southern
          Maryland, Northern Virginia & Baltimore
        </p>
      </div>
    </section>
  </div>
);

FinancingPage.meta = {
  title: "Financing & Budget Options | Kealee Construction",
  description:
    "Flexible financing options, payment plans, and budget planning tools for your renovation or construction project with Kealee Construction.",
};

export default FinancingPage;
