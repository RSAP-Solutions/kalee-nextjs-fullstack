import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import type { NextPageWithMeta } from "@/pages/_app";
import type { BlogItemResponse } from "@/types/blog";

const BlogPostPage: NextPageWithMeta = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogItemResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchPost = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to load blog posts");
        const posts = await response.json();
        const foundPost = posts.find((p: BlogItemResponse) => p.id === id);
        
        if (!foundPost) {
          setError("Blog post not found");
        } else {
          setPost(foundPost);
        }
      } catch (err) {
        console.error("[blog.post.fetch]", err);
        setError("Failed to load blog post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading blog post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-navy mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-6">{error || "This blog post doesn&apos;t exist."}</p>
          <Link href="/blog-listing" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog-listing" className="text-ocean hover:text-ocean/80 text-sm font-medium">
            ← Back to Blog
          </Link>
        </div>

        <header className="mb-12">
          <div className="mb-8">
            {post.coverImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 896px, 100vw"
                  unoptimized
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              {post.author && <span>By {post.author}</span>}
              <span>•</span>
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
            </div>

            <h1 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-slate-600">{post.excerpt}</p>
            )}

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ocean"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
            {post.content}
          </div>
        </div>

        <footer className="mt-16 border-t border-slate-200 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-navy mb-4">
              Ready to start your own project?
            </h3>
            <p className="text-slate-600 mb-6">
              Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/quote" className="btn-primary">
                Get Free Estimate
              </Link>
              <a href="tel:4438529890" className="btn-secondary">
                Call (443) 852-9890
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

BlogPostPage.meta = {
  title: "Blog Post | Kealee Construction",
  description: "Read our latest insights about home renovation and construction.",
};

export default BlogPostPage;
