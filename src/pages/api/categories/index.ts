import type { NextApiRequest, NextApiResponse } from "next";
import { getCategoryRepository } from "@/server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add top-level error handler
  try {
    if (req.method === "GET") {
      try {
        const repo = await getCategoryRepository();
      
      // Try to load with relations, but handle errors gracefully
      let categories;
      try {
        categories = await repo.find({
          relations: { products: true },
          order: { name: "ASC" },
        });
      } catch (relationError) {
        // If relations fail, try without relations
        console.warn("[categories.get] Relations failed, loading without relations:", relationError);
        categories = await repo.find({
          order: { name: "ASC" },
        });
      }

      res.status(200).json(
        categories.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          productCount: (category as { products?: unknown[] }).products?.length ?? 0,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        }))
      );
    } catch (error: unknown) {
      console.error("[categories.get] Full error:", error);
      if (error instanceof Error) {
        console.error("[categories.get] Error stack:", error.stack);
      }
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorCode = (error as { code?: string })?.code;
      
      // Provide user-friendly error messages
      let userMessage = "Failed to load categories";
      if (errorMessage.includes("Missing required database environment variables")) {
        userMessage = "Database configuration error. Please check your .env.local file and restart the server.";
      } else if (errorMessage.includes("connection") || errorMessage.includes("connect") || errorCode === "ECONNREFUSED" || errorCode === "ENOTFOUND") {
        userMessage = "Cannot connect to database. Please ensure your database is running and connection settings are correct.";
      }
      
      res.status(500).json({ 
        error: userMessage,
        details: process.env.NODE_ENV !== "production" ? `${errorMessage}${errorCode ? ` (code: ${errorCode})` : ""}` : undefined
      });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const { name, slug, description } = req.body ?? {};

      if (!name || !slug) {
        res.status(400).json({ error: "name and slug are required" });
        return;
      }

      // Validate slug format
      if (slug.length > 120) {
        res.status(400).json({ error: "Slug must be 120 characters or less" });
        return;
      }

      if (name.length > 120) {
        res.status(400).json({ error: "Name must be 120 characters or less" });
        return;
      }

      const repo = await getCategoryRepository();
      const category = repo.create({ 
        name: name.trim(), 
        slug: slug.trim(), 
        description: description?.trim() || null 
      });
      const saved = await repo.save(category);

      res.status(201).json({
        id: saved.id,
        name: saved.name,
        slug: saved.slug,
        description: saved.description,
        createdAt: saved.createdAt,
        updatedAt: saved.updatedAt,
      });
    } catch (error: unknown) {
      console.error("[categories.post]", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isDuplicate = (error as { code?: string })?.code === "23505";
      const message = isDuplicate ? "Category slug already exists" : "Failed to create category";
      res.status(500).json({ 
        error: message,
        details: process.env.NODE_ENV !== "production" ? errorMessage : undefined
      });
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      const { id, name, slug, description } = req.body ?? {};

      if (!id) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      const repo = await getCategoryRepository();
      const category = await repo.findOne({ where: { id } });

      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }

      if (name) category.name = name;
      if (slug) category.slug = slug;
      category.description = description ?? category.description ?? null;

      const saved = await repo.save(category);
      res.status(200).json(saved);
    } catch (error: unknown) {
      console.error("[categories.put]", error);
      const message = (error as { code?: string })?.code === "23505" ? "Category slug already exists" : "Failed to update category";
      res.status(500).json({ error: message });
    }
    return;
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        res.status(400).json({ error: "id query parameter is required" });
        return;
      }

      const repo = await getCategoryRepository();
      const category = await repo.findOne({ where: { id } });

      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }

      await repo.remove(category);
      res.status(204).end();
    } catch (error) {
      console.error("[categories.delete]", error);
      res.status(500).json({ error: "Failed to delete category" });
    }
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end("Method Not Allowed");
  } catch (topLevelError: unknown) {
    // Catch any unhandled errors
    console.error("[categories] Top-level error:", topLevelError);
    if (topLevelError instanceof Error) {
      console.error("[categories] Error stack:", topLevelError.stack);
    }
    const errorMessage = topLevelError instanceof Error ? topLevelError.message : String(topLevelError);
    res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV !== "production" ? errorMessage : undefined
    });
  }
}
