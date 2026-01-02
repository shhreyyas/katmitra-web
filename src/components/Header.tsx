import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Sparkles,
  PlayCircle,
  CreditCard,
  Users,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import mainLogo from "@/assets/main-logo.jpg";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { useTheme } from "@/contexts/ThemeContext";

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
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 transition-all duration-300"
      style={{ overflow: "visible", paddingTop: "1rem" }}
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
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`relative w-20 h-10 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group overflow-hidden ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500" 
                  : "bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400"
              }`}
              aria-label="Toggle theme"
            >
              {/* Animated background glow */}
              <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100" 
                  : "bg-gradient-to-r from-primary/30 to-primary/20 opacity-0 group-hover:opacity-100"
              }`} />
              
              {/* Toggle circle */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center shadow-xl ${
                  theme === "dark" ? "left-1 scale-100" : "left-11 scale-100"
                } group-active:scale-95`}
                style={{
                  boxShadow: theme === "dark" 
                    ? "0 4px 20px hsl(43, 96%, 56%, 0.4), 0 0 0 2px hsl(43, 96%, 56%, 0.1)" 
                    : "0 4px 20px hsl(180, 70%, 40%, 0.4), 0 0 0 2px hsl(180, 70%, 40%, 0.1)"
                }}
              >
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    theme === "dark" ? "rotate-0 scale-100" : "rotate-180 scale-100"
                  }`}
                >
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-primary-foreground transition-all duration-500 group-hover:scale-110" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary-foreground transition-all duration-500 group-hover:scale-110" />
                  )}
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                theme === "dark" 
                  ? "left-12 bg-primary/40 opacity-60" 
                  : "left-2 bg-primary/40 opacity-60"
              }`} />
              <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                theme === "dark" 
                  ? "left-2 bg-primary/40 opacity-60" 
                  : "left-12 bg-primary/40 opacity-60"
              }`} />
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Theme Toggle Button for Mobile */}
            <button
              onClick={toggleTheme}
              className={`relative w-20 h-10 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group overflow-hidden ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500" 
                  : "bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400"
              }`}
              aria-label="Toggle theme"
            >
              {/* Animated background glow */}
              <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100" 
                  : "bg-gradient-to-r from-primary/30 to-primary/20 opacity-0 group-hover:opacity-100"
              }`} />
              
              {/* Toggle circle */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center shadow-xl ${
                  theme === "dark" ? "left-1 scale-100" : "left-11 scale-100"
                } group-active:scale-95`}
                style={{
                  boxShadow: theme === "dark" 
                    ? "0 4px 20px hsl(43, 96%, 56%, 0.4), 0 0 0 2px hsl(43, 96%, 56%, 0.1)" 
                    : "0 4px 20px hsl(180, 70%, 40%, 0.4), 0 0 0 2px hsl(180, 70%, 40%, 0.1)"
                }}
              >
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    theme === "dark" ? "rotate-0 scale-100" : "rotate-180 scale-100"
                  }`}
                >
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-primary-foreground transition-all duration-500 group-hover:scale-110" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary-foreground transition-all duration-500 group-hover:scale-110" />
                  )}
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                theme === "dark" 
                  ? "left-12 bg-primary/40 opacity-60" 
                  : "left-2 bg-primary/40 opacity-60"
              }`} />
              <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                theme === "dark" 
                  ? "left-2 bg-primary/40 opacity-60" 
                  : "left-12 bg-primary/40 opacity-60"
              }`} />
            </button>
            
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
    </header>
  );
};

export default Header;
