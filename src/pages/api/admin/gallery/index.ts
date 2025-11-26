import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { getGalleryItemRepository } from "@/server/db/client";
import { GalleryItemStatus } from "@/server/db/entities/GalleryItem";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminApi(req, res);
  if (!session) return;

  const repo = await getGalleryItemRepository();

  if (req.method === "GET") {
    try {
      const items = await repo.find({ order: { createdAt: "DESC" } });
      res.status(200).json(
        items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          location: item.location ?? null,
          coverImage: item.coverImage ?? null,
          imageUrls: item.imageUrls ?? [],
          tags: item.tags ?? [],
          status: item.status,
          publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
        })),
      );
    } catch (error) {
      console.error("[admin.gallery.get]", error);
      res.status(500).json({ error: "Failed to load gallery" });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const { title, description, location, coverImage, imageUrls, tags, status, publishedAt } = req.body ?? {};

      if (!title || !description || !coverImage) {
        res.status(400).json({ error: "title, description and coverImage are required" });
        return;
      }

      const item = repo.create({
        title: String(title).trim(),
        description: String(description).trim(),
        location: location ? String(location).trim() : null,
        coverImage: String(coverImage).trim(),
        imageUrls: Array.isArray(imageUrls) ? imageUrls.map((url) => String(url)) : [],
        tags: Array.isArray(tags) ? tags.map((tag) => String(tag)) : [],
        status: status === GalleryItemStatus.PUBLISHED ? GalleryItemStatus.PUBLISHED : GalleryItemStatus.DRAFT,
        publishedAt: status === GalleryItemStatus.PUBLISHED && publishedAt ? new Date(publishedAt) : null,
      });

      const saved = await repo.save(item);
      res.status(201).json({
        id: saved.id,
        title: saved.title,
        description: saved.description,
        location: saved.location ?? null,
        coverImage: saved.coverImage ?? null,
        imageUrls: saved.imageUrls ?? [],
        tags: saved.tags ?? [],
        status: saved.status,
        publishedAt: saved.publishedAt ? saved.publishedAt.toISOString() : null,
        createdAt: saved.createdAt.toISOString(),
        updatedAt: saved.updatedAt.toISOString(),
      });
    } catch (error) {
      console.error("[admin.gallery.post]", error);
      res.status(500).json({ error: "Failed to create gallery item" });
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      const { id, title, description, location, coverImage, imageUrls, tags, status, publishedAt } = req.body ?? {};

      if (!id) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      const item = await repo.findOne({ where: { id: String(id) } });
      if (!item) {
        res.status(404).json({ error: "Gallery item not found" });
        return;
      }

      if (title) item.title = String(title).trim();
      if (description) item.description = String(description).trim();
      item.location = location ? String(location).trim() : null;
      if (coverImage) item.coverImage = String(coverImage).trim();
      item.imageUrls = Array.isArray(imageUrls) ? imageUrls.map((url) => String(url)) : [];
      item.tags = Array.isArray(tags) ? tags.map((tag) => String(tag)) : [];
      item.status = status === GalleryItemStatus.PUBLISHED ? GalleryItemStatus.PUBLISHED : GalleryItemStatus.DRAFT;
      item.publishedAt =
        item.status === GalleryItemStatus.PUBLISHED && publishedAt ? new Date(publishedAt) : null;

      const saved = await repo.save(item);

      res.status(200).json({
        id: saved.id,
        title: saved.title,
        description: saved.description,
        location: saved.location ?? null,
        coverImage: saved.coverImage ?? null,
        imageUrls: saved.imageUrls ?? [],
        tags: saved.tags ?? [],
        status: saved.status,
        publishedAt: saved.publishedAt ? saved.publishedAt.toISOString() : null,
        createdAt: saved.createdAt.toISOString(),
        updatedAt: saved.updatedAt.toISOString(),
      });
    } catch (error) {
      console.error("[admin.gallery.put]", error);
      res.status(500).json({ error: "Failed to update gallery item" });
    }
    return;
  }

  if (req.method === "DELETE") {
    try {
      const id = (req.query.id ?? "") as string;
      if (!id) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      const item = await repo.findOne({ where: { id } });
      if (!item) {
        res.status(404).json({ error: "Gallery item not found" });
        return;
      }

      await repo.remove(item);
      res.status(204).end();
    } catch (error) {
      console.error("[admin.gallery.delete]", error);
      res.status(500).json({ error: "Failed to delete gallery item" });
    }
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).json({ error: "Method Not Allowed" });
}
