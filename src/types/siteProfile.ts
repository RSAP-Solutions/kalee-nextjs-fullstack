export type SiteProfileData = {
  logoUrl: string | null;
  contactEmail: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
};

export const DEFAULT_SITE_PROFILE: SiteProfileData = {
  logoUrl: "/Kealee.png",
  contactEmail: "build@kealee.com",
  phone: "(443) 852-9890",
  addressLine1: "1220 19th St NW, Suite 200",
  addressLine2: "Washington, DC 20036",
};

export const formatPhoneHref = (input: string) => {
  const digits = input.replace(/[^0-9+]/g, "");
  return digits.length > 0 ? `tel:${digits}` : undefined;
};
