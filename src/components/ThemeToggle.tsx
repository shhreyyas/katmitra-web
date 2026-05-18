import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";
import { cn } from "@/lib/utils";

/**
 * When the switch is on, the site uses dark mode (default).
 */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      title={t("header.darkMode")}
    >
      <Sun
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isDark ? "text-muted-foreground" : "text-gold",
        )}
        aria-hidden
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label={t("header.darkMode")}
      />
      <Moon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isDark ? "text-gold" : "text-muted-foreground",
        )}
        aria-hidden
      />
    </div>
  );
};

export default ThemeToggle;
