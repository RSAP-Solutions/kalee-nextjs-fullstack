import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { getSiteProfileRepository } from "@/server/db/client";
import {
  DEFAULT_SITE_PROFILE,
  getOrCreateSiteProfile,
  normalizeSiteProfile,
} from "@/server/services/siteProfile";

const sanitizeString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminApi(req, res);
  if (!session) {
    return;
  }

  if (req.method === "GET") {
    try {
      const profile = await getOrCreateSiteProfile();
      res.status(200).json(normalizeSiteProfile(profile));
    } catch (error) {
      console.error("[admin.profile][GET]", error);
      res.status(500).json({ error: "Failed to load profile" });
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      const { logoUrl, contactEmail, phone, addressLine1, addressLine2 } = req.body ?? {};
      const repo = await getSiteProfileRepository();
      const profile = await getOrCreateSiteProfile();

      const nextLogo = sanitizeString(logoUrl);
      profile.logoUrl = nextLogo.length > 0 ? nextLogo : DEFAULT_SITE_PROFILE.logoUrl;
      profile.contactEmail = sanitizeString(contactEmail) || DEFAULT_SITE_PROFILE.contactEmail;
      profile.phone = sanitizeString(phone) || DEFAULT_SITE_PROFILE.phone;
      profile.addressLine1 = sanitizeString(addressLine1) || DEFAULT_SITE_PROFILE.addressLine1;
      profile.addressLine2 = sanitizeString(addressLine2) || DEFAULT_SITE_PROFILE.addressLine2;

      const saved = await repo.save(profile);

      res.status(200).json(normalizeSiteProfile(saved));
    } catch (error) {
      console.error("[admin.profile][PUT]", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
    return;
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  res.status(405).json({ error: "Method Not Allowed" });
}
