import type { NextApiRequest, NextApiResponse } from "next";
import { clearAuthCookie } from "@/server/auth/adminSession";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  clearAuthCookie(res);
  res.status(200).json({ success: true });
}
