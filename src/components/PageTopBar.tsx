import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import mainLogo from "@/assets/main-logo.jpg";
import HeaderControls from "@/components/HeaderControls";
import { useI18n } from "@/contexts/I18nContext";

/**
 * Top row for standalone pages (FAQs, Support, legal) that don't render the full site header:
 * a way back to the landing page plus the language / theme controls.
 */
const PageTopBar = () => {
  const { t } = useI18n();

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <Link
        to="/"
        aria-label={t("notfound.action")}
        className="group inline-flex items-center gap-2 rounded-lg py-1 pr-2 text-foreground hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-gold" aria-hidden />
        <img src={mainLogo} alt="" className="h-9 w-9 object-contain" />
        <span className="font-display text-xl font-bold">
          <span className="text-gold">KAT</span>MITRA
        </span>
      </Link>
      <HeaderControls />
    </div>
  );
};

export default PageTopBar;
