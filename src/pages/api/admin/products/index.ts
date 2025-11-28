import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { getProductRepository } from "@/server/db/client";
import { getS3PublicUrl } from "@/server/services/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("[admin.products] Request method:", req.method);
    
    const session = requireAdminApi(req, res);
    if (!session) {
      console.log("[admin.products] Unauthorized - no session");
      return;
    }

    console.log("[admin.products] Authenticated, proceeding...");

    const repo = await getProductRepository();

    if (req.method === "GET") {
      console.log("[admin.products] GET request - fetching products");
      const items = await repo.find({
        relations: { category: true },
        order: { createdAt: "DESC" },
      });

      const response = items.map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            price: item.price,
            description: item.description,
            imageUrl: item.imageUrl ? getS3PublicUrl(item.imageUrl) : null,
            imageUrls: (item.imageUrls ?? []).map(url => {
              try {
                return getS3PublicUrl(url);
              } catch (error) {
                console.error('[admin.products] Error processing image URL:', url, error);
                return url; // fallback to original URL
              }
            }),
            inStock: item.inStock,
            category: item.category ? {
              id: item.category.id,
              name: item.category.name,
              slug: item.category.slug,
            } : null,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
          };
        } catch (error) {
          console.error('[admin.products] Error processing item:', item.id, error);
          throw error;
        }
      });

      return res.status(200).json(response);
    }

    if (req.method === "POST") {
      console.log("[admin.products] POST request received");
      const payload = req.body;
      console.log("[admin.products] Payload:", payload);

      // Validate required fields
      if (!payload.title?.trim() || !payload.slug?.trim() || !payload.description?.trim()) {
        console.log("[admin.products] Validation failed - missing required fields");
        return res.status(400).json({ error: "Title, slug, and description are required" });
      }

      if (!payload.price || parseFloat(payload.price) < 0) {
        console.log("[admin.products] Validation failed - invalid price");
        return res.status(400).json({ error: "Valid price is required" });
      }

      // Validate imageUrls array (max 5 images)
      if (payload.imageUrls && Array.isArray(payload.imageUrls)) {
        if (payload.imageUrls.length > 5) {
          console.log("[admin.products] Validation failed - too many images");
          return res.status(400).json({ error: "Maximum 5 images allowed" });
        }
        if (!payload.imageUrls.every((url: string) => typeof url === "string")) {
          console.log("[admin.products] Validation failed - invalid image URL format");
          return res.status(400).json({ error: "All image URLs must be strings" });
        }
      }

      console.log("[admin.products] Creating product...");
      const product = repo.create({
        title: payload.title.trim(),
        slug: payload.slug.trim(),
        price: parseFloat(payload.price),
        description: payload.description.trim(),
        imageUrl: payload.imageUrl?.trim() || null,
        imageUrls: payload.imageUrls && Array.isArray(payload.imageUrls) ? payload.imageUrls : null,
        inStock: payload.inStock !== false,
        category: payload.categoryId ? { id: payload.categoryId } : null,
      });

      console.log("[admin.products] Saving product...");
      const saved = await repo.save(product);
      console.log("[admin.products] Product saved successfully:", saved.id);

      const response = {
        id: saved.id,
        title: saved.title,
        slug: saved.slug,
        price: saved.price,
        description: saved.description,
        imageUrl: saved.imageUrl ? (() => {
          try {
            return getS3PublicUrl(saved.imageUrl);
          } catch (error) {
            console.error('[admin.products] Error processing imageUrl:', saved.imageUrl, error);
            return saved.imageUrl; // fallback to original URL
          }
        })() : null,
        imageUrls: (saved.imageUrls ?? []).map(url => {
          try {
            return getS3PublicUrl(url);
          } catch (error) {
            console.error('[admin.products] Error processing image URL:', url, error);
            return url; // fallback to original URL
          }
        }),
        inStock: saved.inStock,
        category: saved.category,
        createdAt: saved.createdAt.toISOString(),
        updatedAt: saved.updatedAt.toISOString(),
      };

      return res.status(200).json(response);
    }

    if (req.method === "PUT") {
      console.log("[admin.products] PUT request received");
      const { id, ...payload } = req.body;

      if (!id) {
        console.log("[admin.products] PUT failed - missing ID");
        return res.status(400).json({ error: "Product ID is required" });
      }

      const existing = await repo.findOne({ 
        where: { id },
        relations: { category: true }
      });
      
      if (!existing) {
        console.log("[admin.products] PUT failed - product not found");
        return res.status(404).json({ error: "Product not found" });
      }

      // Validate required fields
      if (!payload.title?.trim() || !payload.slug?.trim() || !payload.description?.trim()) {
        console.log("[admin.products] PUT validation failed - missing required fields");
        return res.status(400).json({ error: "Title, slug, and description are required" });
      }

      if (!payload.price || parseFloat(payload.price) < 0) {
        console.log("[admin.products] PUT validation failed - invalid price");
        return res.status(400).json({ error: "Valid price is required" });
      }

      let processedImageUrls: string[] | null = null;

      if (payload.imageUrls != null) {
        if (!Array.isArray(payload.imageUrls)) {
          console.log("[admin.products] PUT validation failed - imageUrls must be an array");
          return res.status(400).json({ error: "imageUrls must be an array" });
        }

        if (payload.imageUrls.length > 5) {
          console.log("[admin.products] PUT validation failed - too many images");
          return res.status(400).json({ error: "Maximum 5 images allowed" });
        }

        const invalid = payload.imageUrls.some((url: unknown) => typeof url !== "string" || url.trim().length === 0);
        if (invalid) {
          console.log("[admin.products] PUT validation failed - invalid image URL value");
          return res.status(400).json({ error: "All image URLs must be non-empty strings" });
        }

        processedImageUrls = payload.imageUrls.map((url: string) => url.trim());
      }

      console.log("[admin.products] Updating product...");
      repo.merge(existing, {
        title: payload.title.trim(),
        slug: payload.slug.trim(),
        price: parseFloat(payload.price),
        description: payload.description.trim(),
        imageUrl: payload.imageUrl?.trim() || null,
        imageUrls: processedImageUrls,
        inStock: payload.inStock !== false,
        category: payload.categoryId ? { id: payload.categoryId } : null,
      });

      const saved = await repo.save(existing);
      console.log("[admin.products] Product updated successfully:", saved.id);

      const response = {
        id: saved.id,
        title: saved.title,
        slug: saved.slug,
        price: saved.price,
        description: saved.description,
        imageUrl: saved.imageUrl ? (() => {
          try {
            return getS3PublicUrl(saved.imageUrl);
          } catch (error) {
            console.error('[admin.products] Error processing imageUrl:', saved.imageUrl, error);
            return saved.imageUrl; // fallback to original URL
          }
        })() : null,
        imageUrls: (saved.imageUrls ?? []).map(url => {
          try {
            return getS3PublicUrl(url);
          } catch (error) {
            console.error('[admin.products] Error processing image URL:', url, error);
            return url;
          }
        }),
        inStock: saved.inStock,
        category: saved.category,
        createdAt: saved.createdAt.toISOString(),
        updatedAt: saved.updatedAt.toISOString(),
      };

      return res.status(200).json(response);
    }

    if (req.method === "DELETE") {
      console.log("[admin.products] DELETE request received");
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        console.log("[admin.products] DELETE failed - invalid ID");
        return res.status(400).json({ error: "Valid ID is required" });
      }

      const existing = await repo.findOne({ where: { id } });
      if (!existing) {
        console.log("[admin.products] DELETE failed - product not found");
        return res.status(404).json({ error: "Product not found" });
      }

      console.log("[admin.products] Deleting product:", id);
      await repo.remove(existing);
      console.log("[admin.products] Product deleted successfully");

      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: unknown) {
    console.error("[admin.products] Error details:", error);
    if (error instanceof Error) {
      console.error("[admin.products] Error stack:", error.stack);
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
