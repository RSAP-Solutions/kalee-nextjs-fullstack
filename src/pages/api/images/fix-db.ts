import type { NextApiRequest, NextApiResponse } from "next";
import { getDataSource } from "@/server/db/client";
import { Product } from "@/server/db/entities/Product";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/server/services/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    console.log('[images.fix-db] Starting database fix...');
    
    // Get all S3 objects
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET!,
      MaxKeys: 50,
    });
    
    const listResponse = await s3Client.send(listCommand);
    const s3Objects = listResponse.Contents?.map(obj => obj.Key) || [];
    
    console.log('[images.fix-db] S3 objects found:', s3Objects);

    // Update database to use actual S3 keys
    console.log('[images.fix-db] Connecting to database...');
    const dataSource = await getDataSource();
    const productRepository = dataSource.getRepository(Product);
    
    // Get all products first
    console.log('[images.fix-db] Fetching products from database...');
    const allProducts = await productRepository.find();
    console.log('[images.fix-db] Found products:', allProducts.map(p => ({ id: p.id, title: p.title, imageUrl: p.imageUrl })));
    
    // Update products to use the first available S3 image
    if (s3Objects.length > 0 && allProducts.length > 0) {
      const firstImage = s3Objects[0];
      console.log('[images.fix-db] Updating products to use:', firstImage);
      
      // Update first half of products with first image
      const firstHalf = allProducts.slice(0, Math.ceil(allProducts.length / 2));
      console.log('[images.fix-db] Updating first half of products:', firstHalf.length);
      
      for (const product of firstHalf) {
        try {
          console.log('[images.fix-db] Updating product:', product.id, 'to use:', firstImage);
          await productRepository.update(product.id, { imageUrl: firstImage });
        } catch (updateError) {
          console.error('[images.fix-db] Failed to update product:', product.id, updateError);
        }
      }
      
      // Update second half with second image if available
      if (s3Objects.length > 1) {
        const secondImage = s3Objects[1];
        const secondHalf = allProducts.slice(Math.ceil(allProducts.length / 2));
        console.log('[images.fix-db] Updating second half of products:', secondHalf.length);
        
        for (const product of secondHalf) {
          try {
            console.log('[images.fix-db] Updating product:', product.id, 'to use:', secondImage);
            await productRepository.update(product.id, { imageUrl: secondImage });
          } catch (updateError) {
            console.error('[images.fix-db] Failed to update product:', product.id, updateError);
          }
        }
      }
    }

    // Get updated products
    console.log('[images.fix-db] Fetching updated products...');
    const products = await productRepository.find();
    
    console.log('[images.fix-db] Database fix completed successfully');
    res.status(200).json({
      message: "Database updated successfully",
      s3Objects: s3Objects,
      updatedProducts: products.map(p => ({
        id: p.id,
        title: p.title,
        imageUrl: p.imageUrl
      }))
    });
  } catch (error) {
    console.error('[images.fix-db] Error:', error);
    console.error('[images.fix-db] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      error: "Failed to fix database", 
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
