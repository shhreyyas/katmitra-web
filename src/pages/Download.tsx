import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import mainLogo from "@/assets/main-logo.jpg";
import { useI18n } from "@/contexts/I18nContext";
import { detectMobilePlatform, useAppLinks } from "@/lib/appLinks";
import StoreBadges from "@/components/StoreBadges";

/**
 * Where the QR code lands. An Android phone goes straight to Google Play and an
 * iPhone to the App Store; anything else (or a platform with no link yet) sees
 * the badges and picks.
 */
const Download = () => {
  const { t } = useI18n();
  const { links, isFetched } = useAppLinks();
  const [platform] = useState(detectMobilePlatform);

  const target =
    platform === "android" ? links.androidUrl : platform === "ios" ? links.iosUrl : null;

  useEffect(() => {
    // Wait for the saved links so a phone isn't sent to a stale fallback.
    if (isFetched && target) window.location.replace(target);
  }, [isFetched, target]);

  const redirecting = platform !== "other" && (!isFetched || Boolean(target));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6 text-center text-foreground">
      <img src={mainLogo} alt="" className="h-20 w-20 rounded-2xl object-contain" />
      <h1 className="font-display text-3xl font-bold">
        <span className="text-gold">KAT</span>MITRA
      </h1>

      {redirecting ? (
        <p className="flex items-center gap-2 text-muted-foreground" role="status">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {t("download.redirecting")}
        </p>
      ) : (
        <>
          <p className="max-w-md text-muted-foreground">
            {platform === "ios" && !links.iosUrl ? t("download.iosNotYet") : t("download.subtitle")}
          </p>
          <StoreBadges links={links} className="justify-center" />
        </>
      )}

      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {t("notfound.action")}
      </Link>
    </main>
  );
};

export default Download;
