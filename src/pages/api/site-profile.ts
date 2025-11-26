import type { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateSiteProfile, normalizeSiteProfile } from "@/server/services/siteProfile";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const profile = await getOrCreateSiteProfile();
    res.status(200).json(normalizeSiteProfile(profile));
  } catch (error) {
    console.error("[site-profile][GET]", error);
    res.status(500).json({ error: "Failed to load site profile" });
  }
}
