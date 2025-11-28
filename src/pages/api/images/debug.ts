import type { NextApiRequest, NextApiResponse } from "next";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/server/services/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    console.log('[images.debug] Listing bucket contents...');
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET!,
      MaxKeys: 50,
    });
    
    const listResponse = await s3Client.send(listCommand);
    const objects = listResponse.Contents?.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified
    })) || [];
    
    console.log('[images.debug] Objects in bucket:', objects);
    console.log('[images.debug] Total objects found:', objects.length);

    res.status(200).json({
      bucket: process.env.AWS_S3_BUCKET,
      totalObjects: objects.length,
      objects: objects
    });
  } catch (error) {
    console.error('[images.debug] Error:', error);
    res.status(500).json({ 
      error: "Failed to list bucket contents", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
}
