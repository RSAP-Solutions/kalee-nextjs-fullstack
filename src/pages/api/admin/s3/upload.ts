import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { uploadToS3 } from "@/server/services/s3";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle multipart/form-data
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminApi(req, res);
  if (!session) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    const key = fields.key?.[0] as string;
    const contentType = fields.contentType?.[0] as string;

    if (!file || !key || !contentType) {
      res.status(400).json({ error: "file, key, and contentType are required" });
      return;
    }

    console.log('[admin.s3.upload] Uploading file:', file.originalFilename, 'to key:', key);

    // Read file buffer
    const fs = await import('fs');
    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(file.filepath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    // Upload to S3
    const publicUrl = await uploadToS3({
      key,
      buffer: fileBuffer,
      contentType,
    });

    console.log('[admin.s3.upload] Successfully uploaded to:', publicUrl);

    // Return proxy URL instead of direct S3 URL
    const proxyUrl = `/api/images/${key}`;

    res.status(200).json({ 
      publicUrl: proxyUrl,
      key,
    });
  } catch (error) {
    console.error("[admin.s3.upload]", error);
    res.status(500).json({ error: "Failed to upload file to S3" });
  }
}
