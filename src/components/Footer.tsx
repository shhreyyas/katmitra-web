import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import chefMascot from "@/assets/chef-mascot.png";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "Terms & Conditions", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="relative bg-background pt-16 pb-8 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-4">
              <img
                src={chefMascot}
                alt="KATMITRA Chef Mascot"
                className="w-12 h-12 object-contain"
              />
              <span className="font-display text-2xl font-bold">
                <span className="text-primary">KAT</span>
                <span className="text-foreground">MITRA</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-sm mb-6">
              Streamline your catering business with our powerful, easy-to-use platform.
              Manage orders, schedules, clients, and more — all in one place.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>353, Maruti Plaza, Vijay Park Society,</p>
              <p>Krishnanagar, Ahmedabad, Gujarat 382345</p>
              <p className="text-primary">+91 93273 01738</p>
              <p>sales@myjucas.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2023 Jucas, All Rights Reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Designed By <span className="text-primary">QDev Technolab Private Limited</span>
            </p>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
    </footer>
  );
};

export default Footer;
