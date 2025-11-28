import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { createPresignedPutUrl } from "@/server/services/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminApi(req, res);
  if (!session) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { key, contentType, fileName } = req.body ?? {};

  // Accept either a custom key or generate one from fileName
  let s3Key: string;
  if (key && typeof key === "string") {
    s3Key = key;
  } else if (fileName && typeof fileName === "string") {
    const safeName = fileName.replace(/[^a-zA-Z0-9_.-]/g, "-");
    s3Key = `gallery/${Date.now()}-${safeName}`;
  } else {
    res.status(400).json({ error: "key or fileName is required" });
    return;
  }

  if (!contentType || typeof contentType !== "string") {
    res.status(400).json({ error: "contentType is required" });
    return;
  }

  try {
    const result = await createPresignedPutUrl({
      key: s3Key,
      contentType,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("[admin.s3.presign]", error);
    res.status(500).json({ error: "Failed to create upload URL" });
  }
}
