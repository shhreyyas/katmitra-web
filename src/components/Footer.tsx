import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Support", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={18} className="text-primary" />,
    text: "sales@myjucas.com",
    href: "mailto:sales@myjucas.com",
  },
  {
    icon: <Phone size={18} className="text-primary" />,
    text: "+91 93273 01738",
    href: "tel:+919327301738",
  },
  {
    icon: <MapPin size={18} className="text-primary" />,
    text: "353, Maruti Plaza, Vijay Park Society, Krishnanagar, Ahmedabad, Gujarat 382345",
  },
];

const socialLinks = [
  { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
  { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
  { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
  { icon: <Globe size={20} />, label: "Globe", href: "#" },
];

const Footer = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let animationFrameId: number;

    const checkOverlap = () => {
      if (!contentRef.current || !textRef.current) return;

      const contentRect = contentRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      // Check if text overlaps with content vertically
      const textCenterY = textRect.top + textRect.height / 2;
      const contentTop = contentRect.top;
      const contentBottom = contentRect.bottom;

      // Calculate how much the text center is within the content area
      let overlapPercentage = 0;
      if (textCenterY >= contentTop && textCenterY <= contentBottom) {
        // Text center is within content area
        const contentCenterY = contentTop + contentRect.height / 2;
        const distanceFromCenter = Math.abs(textCenterY - contentCenterY);
        const maxDistance = contentRect.height / 2;
        overlapPercentage = 1 - distanceFromCenter / maxDistance;
      } else if (textCenterY < contentTop) {
        // Text is above content - check proximity
        const distance = contentTop - textCenterY;
        const threshold = textRect.height * 0.5;
        if (distance < threshold) {
          overlapPercentage = 1 - distance / threshold;
        }
      } else {
        // Text is below content - check proximity
        const distance = textCenterY - contentBottom;
        const threshold = textRect.height * 0.5;
        if (distance < threshold) {
          overlapPercentage = 1 - distance / threshold;
        }
      }

      // Clamp overlap percentage
      overlapPercentage = Math.max(0, Math.min(1, overlapPercentage));

      // Scale and opacity based on overlap (more overlap = smaller scale)
      const newScale = Math.max(0.4, 1 - overlapPercentage * 0.6);
      const newOpacity = Math.max(0.4, 1 - overlapPercentage * 0.4);

      setScale(newScale);
      setOpacity(newOpacity);
    };

    const update = () => {
      checkOverlap();
      animationFrameId = requestAnimationFrame(update);
    };

    // Start animation loop
    update();

    // Also check on scroll and resize
    window.addEventListener("scroll", checkOverlap, { passive: true });
    window.addEventListener("resize", checkOverlap);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
    };
  }, []);

  return (
    <footer className="bg-background/10 relative h-fit rounded-3xl overflow-hidden m-8">
      <div ref={contentRef} className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-primary text-3xl font-extrabold">
                &hearts;
              </span>
              <span className="text-foreground text-3xl font-bold">
                KatMitra
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Streamline your catering business with our powerful, easy-to-use
              platform. Manage orders, schedules, clients, and more — all in one
              place.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-foreground text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-border/30 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-muted-foreground">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-primary transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} KatMitra. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect with animated scaling */}
      <motion.div
        ref={textRef}
        className="lg:flex hidden h-[30rem] -mt-52 -mb-36 absolute inset-0 pointer-events-none"
        animate={{
          scale,
          opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
      >
        <div className="w-full h-full">
          <TextHoverEffect text="KatMitra" className="z-50" />
        </div>
      </motion.div>

      <FooterBackgroundGradient />
    </footer>
  );
};

export default Footer;
