import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NextPageWithMeta } from "./_app";
import type { BlogItemResponse } from "@/types/blog";

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI1MCcgZmlsbD0nI0VCREVGNycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI1MCcgcng9JzE2Jy8+PHRleHQgeD0nMjAwJyB5PScxMjUnIGZvbnQtc2l6ZT0nNDAnIGZpbGw9JyM4MDg4OTAnIHRleHQtYW5jaG9yPSdtaWRkbGUnPkJsb2c8L3RleHQ+PC9zdmc+";

type BlogCardProps = {
  post: BlogItemResponse;
};

const BlogCard = ({ post }: BlogCardProps) => (
  <article className="break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
    <Link href={`/blog/${post.id}`}>
      <div className="block cursor-pointer">
        <div className="relative h-48 w-full bg-slate-100">
          <Image
            src={post.coverImage ?? placeholderImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, 100vw"
            unoptimized
          />
        </div>
        <div className="space-y-3 px-6 py-5">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            {post.author && <span>By {post.author}</span>}
            <span>•</span>
            <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
          </div>
          <h3 className="text-lg font-semibold text-navy line-clamp-2">{post.title}</h3>
          {post.excerpt && (
            <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
          )}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ocean"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-slate-500">+{post.tags.length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  </article>
);

const BlogListingPage: NextPageWithMeta = () => {
  const [posts, setPosts] = useState<BlogItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to load blog posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("[blog.fetch]", err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchPosts();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => tags.add(t));
      }
    });
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedTag !== "All") {
      filtered = filtered.filter((post) =>
        Array.isArray(post.tags) && post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.excerpt?.toLowerCase().includes(term) ||
          post.author?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [posts, selectedTag, searchTerm]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Blog
          </h1>
          <p className="max-w-2xl text-lg text-white/85">
            Tips, insights, and stories about home renovation, design, and construction
            from our team at Kealee Construction.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedTag("All")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  selectedTag === "All"
                    ? "border-amber bg-amber/10 text-navy"
                    : "border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                    selectedTag === tag
                      ? "border-amber bg-amber/10 text-navy"
                      : "border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
            />
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {isLoading ? (
              <p className="col-span-full text-center text-slate-600">Loading blog posts...</p>
            ) : filteredPosts.length === 0 ? (
              <p className="col-span-full text-center text-slate-600">
                {searchTerm || selectedTag !== "All" ? "No posts found matching your criteria." : "No blog posts yet."}
              </p>
            ) : (
              filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/80">
            Let&apos;s create something amazing together. We handle everything from design
            to final walkthrough.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/quote" className="btn-primary">
              Get Free Estimate
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

BlogListingPage.meta = {
  title: "Blog | Kealee Construction",
  description: "Tips, insights, and stories about home renovation and construction.",
};

export default BlogListingPage;
