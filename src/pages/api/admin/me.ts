import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionFromRequest } from "@/server/auth/adminSession";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSessionFromRequest(req);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.status(200).json(session);
}
