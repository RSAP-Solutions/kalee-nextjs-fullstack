import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { getBlogItemRepository } from "@/server/db/client";
import { BlogItemStatus } from "@/server/db/entities/BlogItem";
import { getS3PublicUrl } from "@/server/services/s3";
import type { BlogItemResponse, BlogItemPayload } from "@/types/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("[admin.blog] Request method:", req.method);
    
    const session = requireAdminApi(req, res);
    if (!session) {
      console.log("[admin.blog] Unauthorized - no session");
      return;
    }

    console.log("[admin.blog] Authenticated, proceeding...");

    const repo = await getBlogItemRepository();

    if (req.method === "GET") {
      const items = await repo.find({
        order: { createdAt: "DESC" },
      });

      const response: BlogItemResponse[] = items.map((item) => {
        const coverKey = item.coverImage?.trim() || null;
        let coverImagePreview: string | null = null;

        if (coverKey) {
          try {
            coverImagePreview = getS3PublicUrl(coverKey);
          } catch (error) {
            console.error("[admin.blog] Error processing cover image", coverKey, error);
            coverImagePreview = coverKey;
          }
        }

        return {
          id: item.id,
          title: item.title,
          content: item.content,
          excerpt: item.excerpt ?? null,
          coverImage: coverKey,
          coverImagePreview,
          author: item.author ?? null,
          status: item.status,
          tags: item.tags ?? [],
          publishedAt: item.publishedAt?.toISOString() ?? null,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
        };
      });

      return res.status(200).json(response);
    }

    if (req.method === "POST") {
      console.log("[admin.blog] POST request received");
      const payload = req.body as BlogItemPayload;
      console.log("[admin.blog] Payload:", payload);

      // Validate required fields
      if (!payload.title?.trim() || !payload.content?.trim()) {
        console.log("[admin.blog] Validation failed - missing title or content");
        return res.status(400).json({ error: "Title and content are required" });
      }

      console.log("[admin.blog] Creating blog item...");
      const coverKey = payload.coverImage === null ? null : payload.coverImage?.trim() || null;

      const blogItem = repo.create({
        title: payload.title.trim(),
        content: payload.content.trim(),
        excerpt: payload.excerpt?.trim() || null,
        coverImage: coverKey,
        author: payload.author?.trim() || null,
        status: payload.status,
        tags: payload.tags || [],
        publishedAt:
          payload.status === BlogItemStatus.PUBLISHED
            ? new Date()
            : payload.publishedAt
            ? new Date(payload.publishedAt)
            : null,
      });

      console.log("[admin.blog] Saving blog item...");
      const saved = await repo.save(blogItem);
      console.log("[admin.blog] Blog item saved successfully:", saved.id);

      let coverImagePreview: string | null = null;
      if (saved.coverImage) {
        try {
          coverImagePreview = getS3PublicUrl(saved.coverImage);
        } catch (error) {
          console.error("[admin.blog] Error processing created cover image", saved.coverImage, error);
          coverImagePreview = saved.coverImage;
        }
      }

      const response: BlogItemResponse = {
        id: saved.id,
        title: saved.title,
        content: saved.content,
        excerpt: saved.excerpt,
        coverImage: saved.coverImage,
        coverImagePreview,
        author: saved.author,
        status: saved.status,
        tags: saved.tags,
        publishedAt: saved.publishedAt?.toISOString() ?? null,
        createdAt: saved.createdAt.toISOString(),
        updatedAt: saved.updatedAt.toISOString(),
      };

      return res.status(201).json(response);
    }

    if (req.method === "PUT") {
      const { id, ...payload } = req.body as BlogItemPayload & { id: string };

      if (!id) {
        return res.status(400).json({ error: "ID is required for updates" });
      }

      if (!payload.title?.trim() || !payload.content?.trim()) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const existing = await repo.findOne({ where: { id } });
      if (!existing) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      const coverKey = payload.coverImage === null ? null : payload.coverImage?.trim() || existing.coverImage || null;

      repo.merge(existing, {
        title: payload.title.trim(),
        content: payload.content.trim(),
        excerpt: payload.excerpt?.trim() || null,
        coverImage: coverKey,
        author: payload.author?.trim() || null,
        status: payload.status,
        tags: payload.tags || [],
        publishedAt:
          payload.status === BlogItemStatus.PUBLISHED && !existing.publishedAt
            ? new Date()
            : payload.publishedAt
            ? new Date(payload.publishedAt)
            : existing.publishedAt,
      });

      const saved = await repo.save(existing);

      let coverImagePreview: string | null = null;
      if (saved.coverImage) {
        try {
          coverImagePreview = getS3PublicUrl(saved.coverImage);
        } catch (error) {
          console.error("[admin.blog] Error processing updated cover image", saved.coverImage, error);
          coverImagePreview = saved.coverImage;
        }
      }

      const response: BlogItemResponse = {
        id: saved.id,
        title: saved.title,
        content: saved.content,
        excerpt: saved.excerpt,
        coverImage: saved.coverImage,
        coverImagePreview,
        author: saved.author,
        status: saved.status,
        tags: saved.tags,
        publishedAt: saved.publishedAt?.toISOString() ?? null,
        createdAt: saved.createdAt.toISOString(),
        updatedAt: saved.updatedAt.toISOString(),
      };

      return res.status(200).json(response);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Valid ID is required" });
      }

      const existing = await repo.findOne({ where: { id } });
      if (!existing) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      await repo.remove(existing);

      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: unknown) {
    console.error("[admin.blog] Error details:", error);
    if (error instanceof Error) {
      console.error("[admin.blog] Error stack:", error.stack);
    }
    
    // Send detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : 'Unknown error')
      : 'Internal server error';
      
    return res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    });
  }
}
