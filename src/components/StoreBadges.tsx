import { Apple } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import type { AppLinks } from "@/lib/appLinks";
import { cn } from "@/lib/utils";

const badgeClass =
  "inline-flex h-14 min-w-[180px] items-center gap-3 rounded-xl border border-border bg-foreground px-4 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
    <path fill="currentColor" d="M4.6 2.3a1 1 0 0 0-.6.9v17.6a1 1 0 0 0 .6.9l9.6-9.7L4.6 2.3Z" opacity=".75" />
    <path fill="currentColor" d="m17.4 8.8-2.9-1.7-8.3-4.7 9.1 9.1 2.1-2.7Zm-2.1 3.7-9.1 9.1 8.3-4.7 2.9-1.7-2.1-2.7Z" opacity=".9" />
    <path fill="currentColor" d="m20.3 10.5-2.9-1.7-2.3 3.2 2.3 3.2 2.9-1.7c1-.6 1-2.4 0-3Z" />
  </svg>
);

/** "Get it on Google Play" / "Download on the App Store" buttons for the links that exist. */
const StoreBadges = ({ links, className }: { links: AppLinks; className?: string }) => {
  const { t } = useI18n();

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.androidUrl ? (
        <a href={links.androidUrl} target="_blank" rel="noopener noreferrer" className={badgeClass}>
          <PlayIcon />
          <span className="text-left leading-tight">
            <span className="block text-[11px] opacity-80">{t("download.getItOn")}</span>
            <span className="block text-lg font-semibold">Google Play</span>
          </span>
        </a>
      ) : null}
      {links.iosUrl ? (
        <a href={links.iosUrl} target="_blank" rel="noopener noreferrer" className={badgeClass}>
          <Apple className="h-7 w-7 shrink-0" aria-hidden />
          <span className="text-left leading-tight">
            <span className="block text-[11px] opacity-80">{t("download.downloadOn")}</span>
            <span className="block text-lg font-semibold">App Store</span>
          </span>
        </a>
      ) : (
        <span
          className={cn(badgeClass, "cursor-default border-dashed bg-transparent text-muted-foreground hover:opacity-100")}
        >
          <Apple className="h-7 w-7 shrink-0" aria-hidden />
          <span className="text-left leading-tight">
            <span className="block text-[11px]">App Store</span>
            <span className="block text-base font-semibold">{t("download.iosSoon")}</span>
          </span>
        </span>
      )}
    </div>
  );
};

export default StoreBadges;
