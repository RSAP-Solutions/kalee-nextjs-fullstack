import type { NextApiRequest, NextApiResponse } from "next";
import { getProductRepository, getCategoryRepository } from "@/server/db/client";
import { getS3PublicUrl } from "@/server/services/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const repo = await getProductRepository();
      const products = await repo.find({
        relations: { category: true },
        order: { title: "ASC" },
      });

      res.status(200).json(
        products.map((product) => {
          const processedProduct = {
            id: product.id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            description: product.description,
            imageUrl: (() => {
              try {
                return product.imageUrl ? getS3PublicUrl(product.imageUrl) : null;
              } catch (error) {
                console.error('[products.api] Error processing imageUrl:', product.imageUrl, error);
                return product.imageUrl; // fallback to original URL
              }
            })(),
            imageUrls: (product.imageUrls ?? []).map(url => {
              try {
                return getS3PublicUrl(url);
              } catch (error) {
                console.error('[products.api] Error processing image URL:', url, error);
                return url; // fallback to original URL
              }
            }).filter((url): url is string => url !== null),
            inStock: product.inStock,
            category: product.category
              ? {
                  id: product.category.id,
                  name: product.category.name,
                  slug: product.category.slug,
                }
              : null,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          };
          
          // Log the first product to see what URLs are being generated
          if (products.indexOf(product) === 0) {
            console.log('[products.api] Sample product URLs:', {
              originalImageUrls: product.imageUrls,
              processedImageUrls: processedProduct.imageUrls,
              originalImageUrl: product.imageUrl,
              processedImageUrl: processedProduct.imageUrl,
            });
          }
          
          return processedProduct;
        })
      );
    } catch (error: unknown) {
      console.error("[products.get]", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      let userMessage = "Failed to load products";
      if (errorMessage.includes("Missing required database environment variables")) {
        userMessage = "Database configuration error. Please check your .env.local file.";
      } else if (errorMessage.includes("connection") || errorMessage.includes("connect")) {
        userMessage = "Cannot connect to database. Please ensure your database is running and connection settings are correct.";
      }
      res.status(500).json({ 
        error: userMessage,
        details: process.env.NODE_ENV !== "production" ? errorMessage : undefined
      });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const { title, slug, price, description, imageUrl, imageUrls, inStock = true, categoryId } = req.body ?? {};

      if (!title || !slug || typeof price !== "number" || !description) {
        res.status(400).json({ error: "title, slug, price, and description are required" });
        return;
      }

      // Validate imageUrls array (max 5 images)
      if (imageUrls && Array.isArray(imageUrls)) {
        if (imageUrls.length > 5) {
          res.status(400).json({ error: "Maximum 5 images allowed" });
          return;
        }
        if (!imageUrls.every(url => typeof url === "string")) {
          res.status(400).json({ error: "All image URLs must be strings" });
          return;
        }
      }

      const repo = await getProductRepository();
      const categoryRepo = await getCategoryRepository();

      const product = repo.create({
        title,
        slug,
        price,
        description,
        imageUrl,
        imageUrls: imageUrls || null,
        inStock,
      });

      if (categoryId) {
        const category = await categoryRepo.findOne({ where: { id: categoryId } });
        if (!category) {
          res.status(400).json({ error: "Invalid categoryId" });
          return;
        }
        product.category = category;
        product.categorySlug = category.slug;
      }

      const saved = await repo.save(product);
      res.status(201).json(saved);
    } catch (error: unknown) {
      console.error("[products.post]", error);
      const message = (error as { code?: string })?.code === "23505" ? "Product slug already exists" : "Failed to create product";
      res.status(500).json({ error: message });
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      const { id, title, slug, price, description, imageUrl, imageUrls, inStock, categoryId } = req.body ?? {};

      if (!id) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      // Validate imageUrls array (max 5 images)
      if (imageUrls && Array.isArray(imageUrls)) {
        if (imageUrls.length > 5) {
          res.status(400).json({ error: "Maximum 5 images allowed" });
          return;
        }
        if (!imageUrls.every(url => typeof url === "string")) {
          res.status(400).json({ error: "All image URLs must be strings" });
          return;
        }
      }

      const repo = await getProductRepository();
      const categoryRepo = await getCategoryRepository();

      const product = await repo.findOne({ where: { id }, relations: { category: true } });

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      if (title) product.title = title;
      if (slug) product.slug = slug;
      if (typeof price === "number") product.price = price;
      if (typeof inStock === "boolean") product.inStock = inStock;
      if (description !== undefined) product.description = description;
      if (imageUrl !== undefined) product.imageUrl = imageUrl;
      if (imageUrls !== undefined) product.imageUrls = imageUrls;

      if (categoryId !== undefined) {
        if (categoryId) {
          const category = await categoryRepo.findOne({ where: { id: categoryId } });
          if (!category) {
            res.status(400).json({ error: "Invalid categoryId" });
            return;
          }
          product.category = category;
          product.categorySlug = category.slug;
        } else {
          product.category = null;
          product.categorySlug = null;
        }
      }

      const saved = await repo.save(product);
      res.status(200).json(saved);
    } catch (error: unknown) {
      console.error("[products.put]", error);
      const message = (error as { code?: string })?.code === "23505" ? "Product slug already exists" : "Failed to update product";
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

      const repo = await getProductRepository();
      const product = await repo.findOne({ where: { id } });

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      await repo.remove(product);
      res.status(204).end();
    } catch (error) {
      console.error("[products.delete]", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end("Method Not Allowed");
}
