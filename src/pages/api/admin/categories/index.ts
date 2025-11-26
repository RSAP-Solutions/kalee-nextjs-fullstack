import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { getCategoryRepository, getProductRepository } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("[admin.categories] Request method:", req.method);
    
    const session = requireAdminApi(req, res);
    if (!session) {
      console.log("[admin.categories] Unauthorized - no session");
      return;
    }

    console.log("[admin.categories] Authenticated, proceeding...");

    const repo = await getCategoryRepository();
    const productRepo = await getProductRepository();

    if (req.method === "GET") {
      console.log("[admin.categories] GET request - fetching categories");
      const categories = await repo.find({
        order: { name: "ASC" },
      });

      // Get product count for each category
      const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
          const productCount = await productRepo.count({
            where: { category: { id: category.id } },
          });
          return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description ?? null,
            productCount,
          };
        })
      );

      return res.status(200).json(categoriesWithCount);
    }

    if (req.method === "POST") {
      console.log("[admin.categories] POST request received");
      const payload = req.body;
      console.log("[admin.categories] Payload:", payload);

      // Validate required fields
      if (!payload.name?.trim() || !payload.slug?.trim()) {
        console.log("[admin.categories] Validation failed - missing name or slug");
        return res.status(400).json({ error: "Name and slug are required" });
      }

      console.log("[admin.categories] Creating category...");
      const category = repo.create({
        name: payload.name.trim(),
        slug: payload.slug.trim(),
        description: payload.description?.trim() || null,
      });

      console.log("[admin.categories] Saving category...");
      const saved = await repo.save(category);
      console.log("[admin.categories] Category saved successfully:", saved.id);

      const response = {
        id: saved.id,
        name: saved.name,
        slug: saved.slug,
        description: saved.description,
        productCount: 0,
      };

      return res.status(200).json(response);
    }

    if (req.method === "PUT") {
      console.log("[admin.categories] PUT request received");
      const { id, ...payload } = req.body;

      if (!id) {
        console.log("[admin.categories] PUT failed - missing ID");
        return res.status(400).json({ error: "Category ID is required" });
      }

      const existing = await repo.findOne({ where: { id } });
      
      if (!existing) {
        console.log("[admin.categories] PUT failed - category not found");
        return res.status(404).json({ error: "Category not found" });
      }

      // Validate required fields
      if (!payload.name?.trim() || !payload.slug?.trim()) {
        console.log("[admin.categories] PUT validation failed - missing name or slug");
        return res.status(400).json({ error: "Name and slug are required" });
      }

      console.log("[admin.categories] Updating category...");
      repo.merge(existing, {
        name: payload.name.trim(),
        slug: payload.slug.trim(),
        description: payload.description?.trim() || null,
      });

      const saved = await repo.save(existing);
      console.log("[admin.categories] Category updated successfully:", saved.id);

      // Get updated product count
      const productCount = await productRepo.count({
        where: { category: { id: saved.id } },
      });

      const response = {
        id: saved.id,
        name: saved.name,
        slug: saved.slug,
        description: saved.description,
        productCount,
      };

      return res.status(200).json(response);
    }

    if (req.method === "DELETE") {
      console.log("[admin.categories] DELETE request received");
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        console.log("[admin.categories] DELETE failed - invalid ID");
        return res.status(400).json({ error: "Valid ID is required" });
      }

      const existing = await repo.findOne({ where: { id } });
      if (!existing) {
        console.log("[admin.categories] DELETE failed - category not found");
        return res.status(404).json({ error: "Category not found" });
      }

      console.log("[admin.categories] Deleting category:", id);
      await repo.remove(existing);
      console.log("[admin.categories] Category deleted successfully");

      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: unknown) {
    console.error("[admin.categories] Error details:", error);
    if (error instanceof Error) {
      console.error("[admin.categories] Error stack:", error.stack);
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
