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

  const { fileName, contentType } = req.body ?? {};

  if (!fileName || typeof fileName !== "string" || !contentType || typeof contentType !== "string") {
    res.status(400).json({ error: "fileName and contentType are required" });
    return;
  }

  try {
    const safeName = fileName.replace(/[^a-zA-Z0-9_.-]/g, "-");
    const key = `gallery/${Date.now()}-${safeName}`;

    const result = await createPresignedPutUrl({
      key,
      contentType,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("[admin.s3.presign]", error);
    res.status(500).json({ error: "Failed to create upload URL" });
  }
}
