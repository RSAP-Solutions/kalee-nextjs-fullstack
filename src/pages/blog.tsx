import Link from "next/link";
import type { NextPageWithMeta } from "./_app";
import { blogPosts } from "@/data/blogs";

const hero = {
  title: "Construction & Renovation Insights",
  subtitle:
    "Expert tips, guides, and trends from Maryland's trusted construction professionals.",
};

const categories = [
  { name: "Home Additions", count: 5 },
  { name: "Cost Guides", count: 8 },
  { name: "How-To Guides", count: 12 },
  { name: "Design Trends", count: 6 },
  { name: "Energy Efficiency", count: 7 },
  { name: "ADA Compliance", count: 4 },
];

const BlogPage: NextPageWithMeta = () => (
  <div className="space-y-16 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          {hero.title}
        </h1>
        <p className="max-w-2xl text-lg text-white/85">{hero.subtitle}</p>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content space-y-10">
        <div className="text-center">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">
            Stay informed with expert advice on construction, renovation, and home improvement.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-ocean to-slate-800 text-4xl text-white">
                {post.icon}
              </div>
              <div className="flex flex-1 flex-col space-y-4 px-6 py-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span className="rounded-full bg-amber/20 px-3 py-1 text-amber">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-navy">{post.title}</h3>
                <p className="flex-1 text-sm text-slate-600">{post.excerpt}</p>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-sm font-semibold text-ocean transition-colors hover:text-amber"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content space-y-8">
        <h2 className="section-title text-center">
          Browse by Category
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              className="rounded-2xl border-2 border-slate-200 bg-white px-6 py-5 text-center transition hover:border-ocean hover:bg-gradient-to-r hover:from-ocean hover:to-slate-800 hover:text-white"
            >
              <h3 className="text-base font-semibold">{category.name}</h3>
              <p className="text-xs text-slate-500 hover:text-white/80">
                {category.count} Articles
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-tangerine via-amber to-tangerine px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg text-white/90">
          Get expert advice and a free consultation from Maryland&apos;s trusted construction professionals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary">
            Get Free Quote
          </Link>
          <Link href="/code" className="btn-secondary border-white/40 text-white">
            Contact Kealee
          </Link>
        </div>
      </div>
    </section>
  </div>
);

BlogPage.meta = {
  title: "Construction & Renovation Blog | Kealee Construction",
  description:
    "Expert construction and renovation advice from Kealee Construction. Explore guides on home additions, renovation costs, ADA compliance, energy efficiency, and more.",
};

export default BlogPage;
