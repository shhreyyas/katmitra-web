import { useQuery } from "@tanstack/react-query";

export type AppLinks = { androidUrl: string | null; iosUrl: string | null };

/**
 * Used until the backend answers, and if it can't be reached, so the Android
 * badge never ends up dead. Admin → Settings is the source of truth.
 */
const FALLBACK_LINKS: AppLinks = {
  androidUrl: "https://play.google.com/store/apps/details?id=com.katmitra",
  iosUrl: null,
};

const apiBase = () => (import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api") as string;

async function fetchAppLinks(): Promise<AppLinks> {
  const res = await fetch(`${apiBase()}/v1/app-links`);
  const json = await res.json();
  if (!res.ok || !json?.success) throw new Error("App links unavailable");
  const { android_url, ios_url } = json.data ?? {};
  // Nothing configured yet → keep the fallback rather than showing an empty section.
  if (!android_url && !ios_url) return FALLBACK_LINKS;
  return { androidUrl: android_url ?? null, iosUrl: ios_url ?? null };
}

/** Store links for the marketing site. Always returns usable links; `isFetched` says whether the backend has answered. */
export function useAppLinks() {
  const query = useQuery({
    queryKey: ["public", "app-links"],
    queryFn: fetchAppLinks,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { links: query.data ?? FALLBACK_LINKS, isFetched: query.isFetched };
}

export type MobilePlatform = "android" | "ios" | "other";

/** Which store a visitor's device belongs to, from its user agent. */
export function detectMobilePlatform(userAgent = navigator.userAgent): MobilePlatform {
  if (/android/i.test(userAgent)) return "android";
  // iPadOS reports itself as a Mac, but only touch devices have multiple touch points.
  const iPadOs = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(userAgent) || iPadOs) return "ios";
  return "other";
}

/** The address the QR code points at: this site's /download page, which sends each phone to its own store. */
export function downloadPageUrl(): string {
  const site = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "");
  return `${site || window.location.origin}/download`;
}
