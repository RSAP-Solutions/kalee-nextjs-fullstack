import { getSiteProfileRepository } from "@/server/db/client";
import type { SiteProfile } from "@/server/db/entities/SiteProfile";

export type SiteProfilePayload = {
  logoUrl: string | null;
  contactEmail: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
};

export const DEFAULT_SITE_PROFILE: SiteProfilePayload = {
  logoUrl: "/Kealee.png",
  contactEmail: "build@kealee.com",
  phone: "(443) 852-9890",
  addressLine1: "1220 19th St NW, Suite 200",
  addressLine2: "Washington, DC 20036",
};

const sanitizeString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export const normalizeSiteProfile = (profile: SiteProfile | null): SiteProfilePayload => {
  if (!profile) {
    return { ...DEFAULT_SITE_PROFILE };
  }

  return {
    logoUrl: profile.logoUrl && profile.logoUrl.length > 0 ? profile.logoUrl : DEFAULT_SITE_PROFILE.logoUrl,
    contactEmail: sanitizeString(profile.contactEmail) || DEFAULT_SITE_PROFILE.contactEmail,
    phone: sanitizeString(profile.phone) || DEFAULT_SITE_PROFILE.phone,
    addressLine1: sanitizeString(profile.addressLine1) || DEFAULT_SITE_PROFILE.addressLine1,
    addressLine2: sanitizeString(profile.addressLine2) || DEFAULT_SITE_PROFILE.addressLine2,
  };
};

export const getOrCreateSiteProfile = async (): Promise<SiteProfile> => {
  const repo = await getSiteProfileRepository();
  let profile = await repo.findOne({ where: {} });

  if (!profile) {
    profile = repo.create({
      logoUrl: DEFAULT_SITE_PROFILE.logoUrl,
      contactEmail: DEFAULT_SITE_PROFILE.contactEmail,
      phone: DEFAULT_SITE_PROFILE.phone,
      addressLine1: DEFAULT_SITE_PROFILE.addressLine1,
      addressLine2: DEFAULT_SITE_PROFILE.addressLine2,
    });
    profile = await repo.save(profile);
  }

  return profile;
};
