import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
// import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Features", href: "/features", icon: Sparkles },
  { label: "How It Works", href: "/how-it-works", icon: PlayCircle },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Contact", href: "/contact", icon: Mail },
];

const animeNavItems = navItems.map((item) => ({
  name: item.label,
  url: item.href,
  icon: item.icon,
}));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => setIsDesktop(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

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

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
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
              <span className="text-primary">KAT</span>
              <span className="text-foreground">MITRA</span>
            </span>
          </Link>

          {/* Desktop Navigation - Animated Navbar */}
          <div
            className="hidden lg:flex items-center relative z-10 gap-4"
            style={{ overflow: "visible" }}
          >
            <AnimeNavBar items={animeNavItems} defaultActive="Home" />
            {/* Theme toggle kept for future use
            <button onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            */}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95 border-b border-border/50 py-4 shadow-2xl backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium text-base"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </motion.header>
  );
};

export default Header;
