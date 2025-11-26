import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogItemRepository } from "@/server/db/client";
import { BlogItemStatus } from "@/server/db/entities/BlogItem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const repo = await getBlogItemRepository();

    const items = await repo.find({
      where: { status: BlogItemStatus.PUBLISHED },
      order: { publishedAt: "DESC" },
    });

    const response = items.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt ?? null,
      coverImage: item.coverImage ?? null,
      author: item.author ?? null,
      status: item.status,
      tags: item.tags ?? [],
      publishedAt: item.publishedAt?.toISOString() ?? null,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("[blog.get]", error);
    res.status(500).json({ error: "Failed to load blog posts" });
  }
}
