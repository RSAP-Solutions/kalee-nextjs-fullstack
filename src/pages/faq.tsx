import { useMemo, useState } from "react";
import Link from "next/link";
import type { NextPageWithMeta } from "./_app";
import { faqCategories } from "@/data/faq";

const faqLinks = faqCategories.map(({ id, title }) => ({
  id,
  label: title.replace(/^[^A-Za-z0-9]+/, ""),
}));

const FAQPage: NextPageWithMeta = () => {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!query.trim()) {
      return faqCategories;
    }
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);

    return faqCategories
      .map((category) => {
        const entries = category.entries.filter((entry) => {
          const haystack = `${entry.question}`
            .toLowerCase()
            .concat(
              " ",
              typeof entry.answer === "string" ? entry.answer : "",
            );
          return keywords.every((word) => haystack.includes(word));
        });
        if (!entries.length) {
          return null;
        }
        return { ...category, entries };
      })
      .filter((category): category is (typeof faqCategories)[number] => !!category);
  }, [query]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl text-lg text-white/85">
            Find comprehensive answers about consultations, pricing, timelines,
            materials, and more.
          </p>
          <div className="relative w-full max-w-xl">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for answers..."
              className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/70 shadow-lg shadow-black/10 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 lg:-mx-8">
        <div className="mx-auto flex w-full max-w-content flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-600">
          {faqLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full border border-slate-200 px-4 py-2 transition-colors duration-150 hover:border-ocean hover:text-ocean"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-content gap-12">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-card"
            >
              <h2 className="text-2xl font-semibold text-navy">
                {category.title}
              </h2>
              <div className="mt-8 space-y-8">
                {category.entries.map((entry) => (
                  <div
                    key={entry.question}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6"
                  >
                    <h3 className="flex items-start gap-2 text-lg font-semibold text-navy">
                      <span className="text-tangerine">Q:</span>
                      <span>{entry.question}</span>
                    </h3>
                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      {entry.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!filteredCategories.length ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-card">
              <h3 className="text-xl font-semibold text-navy">
                No results found
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Try adjusting your search terms or{" "}
                <Link href="/consultation-services" className="text-ocean underline">
                  book a consultation
                </Link>{" "}
                to get personalized answers.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Still Have Questions?
          </h2>
          <p className="text-lg text-white/80">
            Book a consultation to get personalized answers about your project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation-services" className="btn-primary">
              View Consultation Options
            </Link>
            <Link href="/contact" className="btn-secondary border-white/40 text-white">
              Contact Us
            </Link>
            <a href="tel:4438529890" className="btn-secondary border-white/40 text-white">
              Call (443) 852-9890
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

FAQPage.meta = {
  title: "Frequently Asked Questions | Kealee Construction",
  description:
    "Browse 60+ answers about consultations, pricing, timelines, financing, and living through construction with Kealee Construction.",
};

export default FAQPage;
