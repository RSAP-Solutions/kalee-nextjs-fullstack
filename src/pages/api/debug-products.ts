import type { NextApiRequest, NextApiResponse } from "next";
import { getProductRepository } from "@/server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const repo = await getProductRepository();
    const products = await repo.find({
      relations: { category: true },
      order: { title: "ASC" },
    });

    const debugInfo = products.map((product) => ({
      title: product.title,
      imageUrl: product.imageUrl,
      imageUrls: product.imageUrls,
      hasImage: !!product.imageUrl,
      hasImageUrls: !!(product.imageUrls && product.imageUrls.length > 0),
      imageUrlsCount: product.imageUrls?.length || 0,
    }));

    res.status(200).json({
      totalProducts: products.length,
      products: debugInfo,
    });
  } catch (error) {
    console.error("[debug-products]", error);
    res.status(500).json({ error: "Failed to debug products" });
  }
}
