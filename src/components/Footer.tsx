import { Mail, MessageCircle, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import mainLogo from "@/assets/main-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground mt-16 border-t border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-14 lg:py-16">
        <div className="rounded-2xl border border-border bg-card px-6 py-6 sm:px-8 sm:py-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              Start Managing Your Catering Business Today
            </h3>
            <p className="text-muted-foreground">
              Simple, powerful, and built for catering owners.
            </p>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-95 transition-all"
          >
            Start Free Now
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={mainLogo} alt="KATMITRA" className="w-11 h-11 object-contain" />
              <span className="font-display text-2xl font-bold text-foreground">Katmitra</span>
            </div>
            <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
              Catering management software to manage orders, events,
              payments, staff, and operations.
            </p>
            <p className="text-sm text-muted-foreground">Built for catering business owners</p>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/faqs" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/home" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm mb-5 text-muted-foreground">
              <li><Link to="/support" className="hover:text-primary transition-colors">Help / Support</Link></li>
              <li>
                <a href="mailto:info.katmitra@gmail.com" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info.katmitra@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/919265758484"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/katmitra.official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© 2026 Katmitra. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
