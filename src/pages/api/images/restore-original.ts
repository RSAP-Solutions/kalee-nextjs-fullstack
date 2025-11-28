import type { NextApiRequest, NextApiResponse } from "next";
import { getDataSource } from "@/server/db/client";
import { Product } from "@/server/db/entities/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    console.log('[images.restore] Starting restore process...');
    
    // Test database connection first
    console.log('[images.restore] Connecting to database...');
    const dataSource = await getDataSource();
    const productRepository = dataSource.getRepository(Product);
    console.log('[images.restore] Database connected successfully');
    
    // Restore original image URLs for products that had them before
    const originalImageMap: Record<string, string> = {
      "Green Home Combo": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpg",
      "Eco Efficiency Supreme": "https://images.pexels.com/photos/2089874/pexels-photo-2089874.jpg", 
      "HVAC Complete System": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpg",
      "Smart Plumbing Upgrade": "https://images.pexels.com/photos/1108571/pexels-photo-1108571.jpg",
      "Interior Paint & Drywall": "https://images.pexels.com/photos/276624/pexels-photo-276624.jpg",
      "Exterior Renovation Suite": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpg",
      "Smart Home Technology": "https://images.pexels.com/photos/719969/pexels-photo-719969.jpg",
      "Accessibility Essentials": "https://images.pexels.com/photos/840996/pexels-photo-840996.jpg",
      "Energy Starter Pack": "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpg",
      "Custom Carpentry Package": "https://images.pexels.com/photos/157924/pexels-photo-157924.jpg"
    };
    
    console.log('[images.restore] Fetching all products...');
    // Get all products
    const allProducts = await productRepository.find();
    console.log('[images.restore] Found', allProducts.length, 'products');
    
    let updatedCount = 0;
    
    // Update products with their original images
    for (const product of allProducts) {
      try {
        console.log('[images.restore] Processing product:', product.title);
        const originalImage = originalImageMap[product.title as keyof typeof originalImageMap];
        if (originalImage) {
          console.log('[images.restore] Restoring image for:', product.title, '->', originalImage);
          await productRepository.update(product.id, { imageUrl: originalImage });
          updatedCount++;
        } else {
          console.log('[images.restore] No original image found for:', product.title, '- keeping current image');
        }
      } catch (updateError) {
        console.error('[images.restore] Failed to update product:', product.title, updateError);
      }
    }
    
    console.log('[images.restore] Updated', updatedCount, 'products with original images');

    // Get updated products to show results
    const products = await productRepository.find();
    
    console.log('[images.restore] Restore process completed successfully');
    res.status(200).json({
      message: "Original product images restored successfully",
      updatedCount: updatedCount,
      totalProducts: products.length,
      updatedProducts: products.map(p => ({
        id: p.id,
        title: p.title,
        imageUrl: p.imageUrl
      }))
    });
  } catch (error) {
    console.error('[images.restore] Error:', error);
    console.error('[images.restore] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      error: "Failed to restore original images", 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
