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
} from "lucide-react";
import mainLogo from "@/assets/main-logo.jpg";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

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
            className="hidden lg:flex items-center relative z-10"
            style={{ overflow: "visible" }}
          >
            <AnimeNavBar items={animeNavItems} defaultActive="Home" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-background/50 via-background/40 to-background/50 border-b border-border/50 py-4 shadow-2xl"
            style={{ 
              backdropFilter: 'blur(60px) saturate(200%)',
              WebkitBackdropFilter: 'blur(60px) saturate(200%)',
              backgroundColor: 'rgba(20, 10, 6, 0.6)'
            }}
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
