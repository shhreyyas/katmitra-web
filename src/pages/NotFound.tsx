import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import HeaderControls from "@/components/HeaderControls";

const NotFound = () => {
  const { t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <HeaderControls />
        </div>
        <h1 className="mb-4 font-display text-6xl font-bold text-gradient-gold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">{t("notfound.title")}</p>
        <Button asChild className="bg-gradient-gold text-accent-foreground font-semibold glow-gold-sm">
          <a href="/">
            <Home className="mr-2 w-4 h-4" />
            {t("notfound.action")}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
