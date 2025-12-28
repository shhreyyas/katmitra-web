"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({
  items,
  className,
  defaultActive = "Home",
}: NavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultActive);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active tab based on route
  useEffect(() => {
    const path = location.pathname;
    const currentItem = items.find(item => {
      if (path === "/" || path === "/home") {
        return item.name === "Home";
      }
      return item.url === path;
    });
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location, items]);

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => {
        const sectionId = item.url.replace("/", "") || "home";
        const element = document.getElementById(sectionId);
        return { name: item.name, element, url: item.url };
      });

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element as HTMLElement;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveTab(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setActiveTab(item.name);
    navigate(item.url);
  };

  if (!mounted) return null;

  return (
    <div
      className={cn("flex justify-center relative", className)}
      style={{ overflow: "visible" }}
    >
      <motion.div
        className="flex items-center gap-3 bg-background/50 border border-primary/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative"
        style={{ overflow: "visible" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          const isHovered = hoveredTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={(e) => handleClick(e, item)}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-foreground"
              )}
              style={{ overflow: "visible", position: "relative" }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                  <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                  <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                  <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />

                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 shine-animation" />
                </motion.div>
              )}

              <motion.span
                className="hidden md:inline relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.span>
              <motion.span
                className="md:hidden relative z-10"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} strokeWidth={2.5} />
              </motion.span>

              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  />
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
