import type { NextApiRequest, NextApiResponse } from "next";
import {
  generateAdminToken,
  setAuthCookie,
  validateAdminCredentials,
} from "@/server/auth/adminSession";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const { username, password } = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string") {
      res.status(400).json({ error: "username and password are required" });
      return;
    }

    if (!validateAdminCredentials(username, password)) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const token = generateAdminToken(username);
    setAuthCookie(res, token);
    res.status(200).json({ username });
  } catch (error) {
    console.error("[admin.login]", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
