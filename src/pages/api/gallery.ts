import type { NextApiRequest, NextApiResponse } from "next";
import { getGalleryItemRepository } from "@/server/db/client";
import { GalleryItemStatus } from "@/server/db/entities/GalleryItem";
import { getS3PublicUrl } from "@/server/services/s3";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const repo = await getGalleryItemRepository();

  try {
    const items = await repo.find({
      where: { status: GalleryItemStatus.PUBLISHED },
      order: { createdAt: "DESC" },
    });

    res.status(200).json(
      items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        location: item.location ?? null,
        coverImage: item.coverImage ? getS3PublicUrl(item.coverImage) : null,
        imageUrls: (item.imageUrls ?? []).map(url => getS3PublicUrl(url)),
        tags: item.tags ?? [],
      })),
    );
  } catch (error) {
    console.error("[gallery.get]", error);
    res.status(500).json({ error: "Failed to load gallery" });
  }
}
