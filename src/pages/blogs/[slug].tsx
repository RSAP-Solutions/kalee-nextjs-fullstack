import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { NextPageWithMeta } from "@/pages/_app";
import { blogSlugs, findBlogPost, type BlogPost } from "@/data/blogs";

type BlogPageProps = {
  post: BlogPost;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: blogSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const post = findBlogPost(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      meta: {
        title: `${post.title} | Kealee Construction Blog`,
        description: post.description,
      },
    },
  };
};

const BlogArticlePage: NextPageWithMeta<BlogPageProps> = ({ post }) => (
  <div className="space-y-16 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 text-center lg:text-left">
        <Link href="/blog" className="text-sm font-semibold uppercase tracking-wide text-amber/80">
          ← Back to Blog
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wide text-white/80 lg:justify-start">
          <span className="rounded-full bg-amber/20 px-3 py-1 text-amber">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="max-w-3xl text-base text-white/85 lg:text-lg">
          {post.excerpt}
        </p>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {post.sections.map((section) => (
          <article
            key={section.heading}
            className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-card"
          >
            <h2 className="text-2xl font-semibold text-navy">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-slate-600">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="space-y-2 text-sm text-slate-600">
                {section.list.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-amber">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-tangerine via-amber to-tangerine px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to Talk About Your Project?
        </h2>
        <p className="max-w-3xl text-lg text-white/90">
          Share your renovation goals and receive a detailed estimate from the Kealee
          Construction team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary">
            Request a Quote
          </Link>
          <Link href="/code" className="btn-secondary border-white/40 text-white">
            Contact Kealee
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default BlogArticlePage;
