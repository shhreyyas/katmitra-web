import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useI18n } from "@/contexts/I18nContext";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Compact row for desktop header; panel layout for mobile drawer */
  variant?: "compact" | "panel";
};

/**
 * Language dropdown + theme switch for the header (and standalone pages).
 */
const HeaderControls = ({ className, variant = "compact" }: Props) => {
  const { t } = useI18n();

  if (variant === "panel") {
    return (
      <div className={cn("pt-5", className)}>
        <div className="rounded-xl border border-border/60 bg-card/40 p-4 space-y-4 shadow-sm">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("header.selectLanguage")}
            </p>
            <LanguageSwitcher triggerClassName="h-10 w-full text-sm" />
          </div>
          <div className="h-px bg-border/50" role="separator" />
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">
              {t("header.darkMode")}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-3",
        className,
      )}
    >
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default HeaderControls;
