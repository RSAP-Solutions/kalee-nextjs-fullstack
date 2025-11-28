import type { NextApiRequest, NextApiResponse } from "next";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/server/services/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const path = req.query.path as string[];
    if (!path || path.length === 0) {
      res.status(400).json({ error: "Image path is required" });
      return;
    }

    const s3Key = path.join('/');
    console.log('[images.proxy] Serving image:', s3Key);

    // First, let's list what's actually in the bucket - do this for every request to debug
    try {
      console.log('[images.proxy] Listing bucket contents...');
      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.AWS_S3_BUCKET!,
        MaxKeys: 50,
      });
      
      const listResponse = await s3Client.send(listCommand);
      console.log('[images.proxy] Objects in bucket:', listResponse.Contents?.map(obj => obj.Key));
      console.log('[images.proxy] Total objects found:', listResponse.Contents?.length || 0);
    } catch (listError) {
      console.error('[images.proxy] Failed to list objects:', listError);
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: s3Key,
    });

    console.log('[images.proxy] Fetching from bucket:', process.env.AWS_S3_BUCKET, 'key:', s3Key);

    const response = await s3Client.send(command);
    
    console.log('[images.proxy] Got response from S3:', response.ContentType);
    
    // Set proper headers
    const contentType = response.ContentType || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Stream the image
    if (response.Body) {
      const chunks: Uint8Array[] = [];
      const bodyStream = response.Body as AsyncIterable<Uint8Array>;
      for await (const chunk of bodyStream) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      res.send(buffer);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error('[images.proxy] Error:', error);
    res.status(404).json({ error: "Image not found", details: error instanceof Error ? error.message : String(error) });
  }
}
