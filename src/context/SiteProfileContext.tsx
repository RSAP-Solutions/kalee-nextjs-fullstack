import { createContext, useContext } from "react";
import type { SiteProfileData } from "@/types/siteProfile";
import { DEFAULT_SITE_PROFILE } from "@/types/siteProfile";

export type SiteProfileContextValue = SiteProfileData & {
  isLoading: boolean;
  refresh: () => void;
};

const defaultValue: SiteProfileContextValue = {
  ...DEFAULT_SITE_PROFILE,
  isLoading: true,
  refresh: () => undefined,
};

export const SiteProfileContext = createContext<SiteProfileContextValue>(defaultValue);

export const useSiteProfile = (): SiteProfileContextValue => {
  return useContext(SiteProfileContext);
};
