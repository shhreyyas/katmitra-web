import { QRCodeSVG } from "qrcode.react";
import { useI18n } from "@/contexts/I18nContext";
import { downloadPageUrl, useAppLinks } from "@/lib/appLinks";
import StoreBadges from "@/components/StoreBadges";

/** "Get the app": store badges plus a QR code that sends each phone to its own store. */
const DownloadSection = () => {
  const { t } = useI18n();
  const { links } = useAppLinks();

  return (
    <section
      id="download"
      className="relative py-20 lg:py-28 bg-card/40 overflow-hidden border-y border-border/40"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{t("download.heading")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{t("download.subtitle")}</p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-10 rounded-3xl border border-gold/25 bg-background/60 p-8 shadow-sm sm:p-10 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t("download.storesLabel")}
            </p>
            <StoreBadges links={links} className="mt-5 justify-center md:justify-start" />
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3">
            {/* White plate regardless of theme: scanners need dark modules on a light background. */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <QRCodeSVG
                value={downloadPageUrl()}
                size={168}
                level="M"
                bgColor="#ffffff"
                fgColor="#111111"
                title={t("download.scan")}
              />
            </div>
            <p className="max-w-[200px] text-center text-sm text-muted-foreground">
              {t("download.scan")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
