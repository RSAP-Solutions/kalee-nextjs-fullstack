import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SiteProfileContext } from "@/context/SiteProfileContext";
import { DEFAULT_SITE_PROFILE, type SiteProfileData } from "@/types/siteProfile";

async function fetchSiteProfile(): Promise<SiteProfileData> {
  const response = await fetch("/api/site-profile", { credentials: "include" });
  if (!response.ok) {
    throw new Error("Failed to load site profile");
  }
  return (await response.json()) as SiteProfileData;
}

export function SiteProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<SiteProfileData>(DEFAULT_SITE_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchSiteProfile();
      setProfile(data);
    } catch (error) {
      console.error("[SiteProfileProvider] load failed", error);
      setProfile(DEFAULT_SITE_PROFILE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const value = useMemo(
    () => ({
      ...profile,
      isLoading,
      refresh: () => {
        void loadProfile();
      },
    }),
    [profile, isLoading, loadProfile],
  );

  return <SiteProfileContext.Provider value={value}>{children}</SiteProfileContext.Provider>;
}
