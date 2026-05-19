import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Sparkles,
  PlayCircle,
  CreditCard,
  Users,
  Mail,
} from "lucide-react";
// import { Sun, Moon } from "lucide-react";
import mainLogo from "@/assets/main-logo.jpg";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import HeaderControls from "@/components/HeaderControls";
import { SparklesCore } from "@/components/ui/sparkles";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const MOBILE_MENU_TOP = "5.5rem";

const Header = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (desktop) setIsMobileMenuOpen(false);
    };
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 48);
      if (y < 64) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(y < lastScrollY.current);
      }
      lastScrollY.current = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideHeaderBar =
    isDesktop && headerVisible === false && !isMobileMenuOpen;
  const navItems = [
    { label: t("header.home"), href: "/home", icon: Home },
    { label: t("header.features"), href: "/features", icon: Sparkles },
    { label: t("header.howItWorks"), href: "/how-it-works", icon: PlayCircle },
    { label: t("header.pricing"), href: "/pricing", icon: CreditCard },
    // { label: t("header.clients"), href: "/clients", icon: Users },
    { label: t("header.contact"), href: "/contact", icon: Mail },
  ];
  const animeNavItems = navItems.map((item) => ({
    name: item.label,
    url: item.href,
    icon: item.icon,
  }));

  const sparkleColor =
    theme === "dark" ? "hsl(43, 96%, 56%)" : "hsl(43, 90%, 44%)";

  const mobileMenu =
    isMobileMenuOpen &&
    typeof document !== "undefined" &&
    createPortal(
      <motion.div
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 overflow-y-auto"
        style={{ top: MOBILE_MENU_TOP }}
        role="dialog"
        aria-modal="true"
        aria-label={t("header.home")}
      >
        <div className="absolute inset-0 bg-gradient-dark" />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-radial",
            theme === "dark"
              ? "from-gold/12 via-transparent to-transparent"
              : "from-gold/18 via-gold/5 to-transparent",
          )}
        />
        {!shouldReduceMotion ? (
          <div className="absolute inset-0 pointer-events-none">
            <SparklesCore
              id="mobile-menu-sparkles"
              background="transparent"
              minSize={theme === "dark" ? 0.4 : 0.6}
              maxSize={theme === "dark" ? 1.2 : 1.5}
              particleDensity={theme === "dark" ? 28 : 36}
              className="h-full w-full"
              particleColor={sparkleColor}
              speed={0.9}
            />
          </div>
        ) : null}
        <nav className="relative z-10 flex flex-col gap-1 px-4 py-5 container mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-foreground hover:bg-card/50 hover:text-gold transition-colors font-medium text-base active:bg-card/70"
              >
                <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                {item.label}
              </Link>
            );
          })}
          <HeaderControls variant="panel" className="mt-3 border-t border-border/50" />
        </nav>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent pointer-events-none" />
      </motion.div>,
      document.body,
    );

  return (
    <>
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        isMobileMenuOpen && !isDesktop
          ? "bg-gradient-dark border-border/50 shadow-sm"
          : isScrolled
          ? "bg-background/95 backdrop-blur-xl border-border/55 shadow-sm"
          : "bg-background/80 backdrop-blur-md border-border/40"
      }`}
      style={{ overflow: "visible", paddingTop: "1rem" }}
      initial={false}
      animate={{ y: hideHeaderBar ? -120 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="container mx-auto px-4 lg:px-8"
        style={{ overflow: "visible" }}
      >
        <div
          className="flex items-center justify-between h-20 relative"
          style={{ overflow: "visible" }}
        >
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <img
              src={mainLogo}
              alt="KATMITRA"
              className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
            />
            <span className="font-display text-2xl font-bold">
              <span className="text-gold">KAT</span>
              <span className="text-foreground">MITRA</span>
            </span>
          </Link>

          {/* Desktop Navigation - Animated Navbar */}
          <div
            className="hidden lg:flex items-center relative z-10 gap-4"
            style={{ overflow: "visible" }}
          >
            <AnimeNavBar items={animeNavItems} defaultActive={t("header.home")} />
            <HeaderControls />
            {/* Theme toggle kept for future use
            <button onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            */}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {/* Mobile theme toggle kept for future use
            <button onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </motion.header>
    {mobileMenu}
    </>
  );
};

export default Header;
