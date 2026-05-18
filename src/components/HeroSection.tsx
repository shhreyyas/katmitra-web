import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Calendar, Users, CheckSquare, ClipboardList } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "@/contexts/ThemeContext";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { useI18n } from "@/contexts/I18nContext";

const DeviceCard = ({
  children,
  className,
  delay = 0,
  title,
  icon: Icon,
  theme = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  title?: string;
  icon?: React.ElementType;
  theme?: "light" | "dark";
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const shadowColor =
    theme === "dark"
      ? "hsl(43, 96%, 56%, 0.22)"
      : "hsl(43, 96%, 56%, 0.14)";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.02, transition: { type: "spring", stiffness: 420, damping: 22 } }
      }
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.5, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut"
      }}
      className={`bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl rounded-2xl border border-gold/30 p-5 shadow-2xl hover:border-gold/45 transition-colors duration-200 [transform-style:preserve-3d] ${className}`}
      style={{
        boxShadow: `0 8px 32px rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"}), 0 0 40px ${shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        willChange: "transform, opacity",
      }}
    >
    {title && (
      <div className="mb-4 pb-3 border-b border-gold/20 flex items-center gap-2">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-gold" />
          </div>
        )}
        <span className="text-sm font-bold text-gold uppercase tracking-wider">
          {title}
        </span>
      </div>
    )}
    {children}
  </motion.div>
  );
};

const CalendarCard = ({
  shouldReduceMotion,
  theme,
}: {
  shouldReduceMotion: boolean;
  theme: "light" | "dark";
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const totalDays = 28;
  const animationDuration = shouldReduceMotion ? 0 : 0.015 * totalDays + 0.1;

  useEffect(() => {
    if (!shouldReduceMotion) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, (animationDuration + 0.2) * 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(true);
    }
  }, [shouldReduceMotion, animationDuration]);

  return (
    <Tilt3D className="absolute bottom-0 right-0 sm:right-8 w-64 sm:w-64 md:w-72 lg:w-80 floating-slow z-[8]" maxTilt={11}>
    <DeviceCard
      title="Calendar"
      icon={Calendar}
      theme={theme}
      className="relative w-full z-[8]"
      delay={shouldReduceMotion ? 0 : 0.6}
    >
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-xs mb-2 sm:mb-3 px-0.5 sm:px-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <span
            key={i}
            className="text-center text-muted-foreground font-bold py-1 text-[10px] sm:text-xs"
          >
            {day}
          </span>
        ))}
      </div>
      <motion.div 
        className="grid grid-cols-7 gap-1 sm:gap-1.5 text-xs px-0.5 sm:px-1"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.01,
              delayChildren: shouldReduceMotion ? 0 : 0.05,
            },
          },
        }}
      >
        {Array.from({ length: 28 }, (_, i) => {
          const day = i + 1;
          const isHighlighted = [7, 10, 19, 23].includes(day);
          const isToday = day === 15;
          return (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    duration: 0.12,
                    ease: "easeOut"
                  }
                },
              }}
              className={`text-center p-1 sm:p-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs min-w-[24px] sm:min-w-[28px] flex items-center justify-center ${
                isToday
                  ? "bg-gold/30 text-gold font-bold border-2 border-gold/55 shadow-sm"
                  : isHighlighted
                    ? "bg-gradient-to-br from-gold/50 to-gold/25 text-accent-foreground font-bold shadow-sm sm:shadow-md"
                  : "text-muted-foreground"
              }`}
              style={{ 
                willChange: animationComplete ? "auto" : (shouldReduceMotion ? "auto" : "transform, opacity")
              }}
            >
              {day <= 28 ? day : ""}
            </motion.span>
          );
        })}
      </motion.div>
      <div className="mt-4 pt-3 border-t border-gold/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-foreground font-bold">
              Upcoming
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Dec 15 - Wedding
            </div>
          </div>
          <motion.div 
            className="w-2 h-2 rounded-full bg-gold"
            animate={shouldReduceMotion ? {} : { 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </div>
      </div>
    </DeviceCard>
    </Tilt3D>
  );
};

// Card stack animation configuration
const CARD_STACK_CONFIG = {
  activeDuration: 3000, // 3 seconds per card
  cardOrder: ['clients', 'events', 'booking', 'calendar'] as const,
  animationDuration: 0.6, // seconds for transition
};

const HeroSection = () => {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [enableHeavyEffects, setEnableHeavyEffects] = useState(false);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 72],
  );
  const parallaxOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0.92, shouldReduceMotion ? 1 : 0.65],
  );
  
  const sparkleColor =
    theme === "dark"
      ? "hsl(43, 96%, 56%)"
      : "hsl(43, 90%, 44%)";
  
  // Auto-loop through cards
  useEffect(() => {
    if (shouldReduceMotion || !enableHeavyEffects) return;
    
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % CARD_STACK_CONFIG.cardOrder.length);
    }, CARD_STACK_CONFIG.activeDuration);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion, enableHeavyEffects]);

  // Delay expensive visual effects to improve initial load responsiveness
  useEffect(() => {
    if (shouldReduceMotion) return;

    const win = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const enable = () => setEnableHeavyEffects(true);

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(enable, { timeout: 1200 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(enable, 600);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);
  
  // Get animation props for each card
  const getCardAnimationProps = (index: number) => {
    const isActive = activeCardIndex === index;
    const distanceFromActive = Math.abs(index - activeCardIndex);
    const isBehind = index < activeCardIndex;
    
    // Calculate z-index: active card is highest, others stack behind
    const zIndex = isActive 
      ? 50 
      : 40 - (distanceFromActive * 2);
    
    // Scale: active card is slightly larger
    const scale = isActive ? 1.05 : 1 - (distanceFromActive * 0.03);
    
    // Opacity: cards behind are slightly more transparent
    const opacity = isActive ? 1 : 1 - (distanceFromActive * 0.15);
    
    // Y offset: cards behind shift down slightly
    const yOffset = isBehind ? distanceFromActive * 8 : 0;
    
    // Shadow: active card has stronger shadow
    const shadowIntensity = isActive ? 0.4 : 0.2 - (distanceFromActive * 0.05);
    
    const shadowColor =
      theme === "dark" ? "rgba(251, 189, 35" : "rgba(251, 189, 35";
    
    return {
      zIndex,
      scale,
      opacity: Math.max(0.7, opacity),
      y: yOffset,
      shadowIntensity: Math.max(0.1, shadowIntensity),
      shadowColor,
    };
  };
  
  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div
        className={`absolute inset-0 bg-gradient-radial ${
          theme === "dark"
            ? "from-gold/12 via-transparent to-transparent"
            : "from-gold/18 via-gold/5 to-transparent"
        }`}
      />

      {/* Sparkles + radial drift subtly with scroll */}
      {enableHeavyEffects ? (
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{ zIndex: 1, y: parallaxY, opacity: parallaxOpacity }}
        >
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={theme === "dark" ? 0.4 : 0.6}
            maxSize={theme === "dark" ? 1.2 : 1.5}
            particleDensity={shouldReduceMotion ? 20 : (theme === "dark" ? 36 : 48)}
            className="w-full h-full"
            particleColor={sparkleColor}
            speed={shouldReduceMotion ? 0.4 : 1.1}
          />
        </motion.div>
      ) : null}

      {/* <Floating3DShapes theme={theme} /> */}

      {/* Decorative particles */}
      <div
        className="absolute top-1/4 left-1/4 w-2 h-2 particle"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-3 h-3 particle"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-2 h-2 particle"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-2 h-2 particle"
        style={{ animationDelay: "6s" }}
      />

      {/* Primary color lines decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: shouldReduceMotion ? 0 : 0.6,
              ease: "easeOut"
            }}
            className="relative z-10"
          >
            <div className="flex flex-col items-center text-center gap-8 lg:gap-10 lg:items-start lg:text-left">
              {/* Large Logo with Glow */}
              {/* <div className="w-full flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 -m-12 lg:-m-16 rounded-full bg-primary/30 blur-3xl animate-pulse" />
                  <motion.img
                    src={mainLogo}
                    alt="KATMITRA"
                    className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain"
                    loading="eager"
                    animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ 
                      willChange: "transform",
                      imageRendering: "auto" as const
                    }}
                  />
                </div>
              </div> */}

              {/* Hero copy */}
              <div className="flex-1 max-w-3xl [perspective:900px]">
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.08,
                    duration: shouldReduceMotion ? 0 : 0.45,
                    ease: "easeOut",
                  }}
                  className="inline-flex w-fit rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-xs sm:text-sm font-semibold text-gold mb-5"
                >
                  {t("hero.badge")}
                </motion.p>
                <motion.h1
                  className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.16] pb-1 mb-6 text-foreground"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: shouldReduceMotion ? 0 : 0.055,
                        delayChildren: shouldReduceMotion ? 0 : 0.12,
                      },
                    },
                  }}
                >
                  <span className="block overflow-visible">
                    {t("hero.titleTop").split(" ").map((word) => (
                      <motion.span
                        key={word}
                        className="inline-block mr-[0.28em] last:mr-0 origin-bottom"
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 36,
                            rotateX: shouldReduceMotion ? 0 : 52,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: shouldReduceMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 220,
                                  damping: 20,
                                  mass: 0.5,
                                },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                  <span className="block mt-2 sm:mt-3 overflow-visible">
                    {t("hero.titleBottom").split(" ").map((word) => (
                      <motion.span
                        key={word}
                        className={`inline-block mr-[0.28em] last:mr-0 origin-bottom text-gradient-gold`}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 28,
                            rotateX: shouldReduceMotion ? 0 : 45,
                            scale: shouldReduceMotion ? 1 : 0.92,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            scale: 1,
                            transition: shouldReduceMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 18,
                                  mass: 0.55,
                                },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.55,
                    duration: shouldReduceMotion ? 0 : 0.65,
                    ease: "easeOut",
                  }}
                  className="text-muted-foreground text-base sm:text-lg lg:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  {t("hero.description")}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.65,
                    duration: shouldReduceMotion ? 0 : 0.4,
                    ease: "easeOut",
                  }}
                  className="flex flex-col sm:flex-row gap-3 mb-5"
                >
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm sm:text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
                  >
                    {t("common.startFreeTrial")}
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl border border-gold/40 bg-card/60 px-6 py-3 text-sm sm:text-base font-semibold text-foreground hover:bg-card/80 transition-all"
                  >
                    {t("common.bookDemo")}
                  </a>
                </motion.div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("common.noCard")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: shouldReduceMotion ? 0 : 0.6, 
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: "easeOut"
            }}
            className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-visible [perspective:1400px]"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Clients Screen - Top Left (Tablet) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                scale: getCardAnimationProps(0).scale,
                opacity: getCardAnimationProps(0).opacity,
                y: getCardAnimationProps(0).y,
              }}
              transition={{ duration: CARD_STACK_CONFIG.animationDuration }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: getCardAnimationProps(0).zIndex,
                filter: `drop-shadow(0 ${getCardAnimationProps(0).shadowIntensity * 20}px ${getCardAnimationProps(0).shadowIntensity * 30}px ${getCardAnimationProps(0).shadowColor}, ${getCardAnimationProps(0).shadowIntensity}))`,
              }}
            >
              <Tilt3D className="w-64 sm:w-72 md:w-80 lg:w-96" maxTilt={10}>
              <DeviceCard
                title="Clients"
                icon={Users}
                className="w-full"
                delay={shouldReduceMotion ? 0 : 0.3}
                theme={theme}
              >
              <div className="space-y-3">
                {[
                  { name: "Coere Strie", status: "Active", avatar: "CS" },
                  { name: "Asa Rocks", status: "Active", avatar: "AR" },
                  { name: "Aan Romts", status: "Pending", avatar: "AR" },
                ].map((client, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-card/60 to-card/40 border border-gold/10 hover:border-gold/30 hover:from-card/80 hover:to-card/60 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-gold font-bold text-sm shadow-lg">
                        {client.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-foreground font-semibold block truncate">
                          {client.name}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            client.status === "Active" ? "bg-green-500" : "bg-gold"
                          }`}></span>
                          {client.status}
                        </span>
                      </div>
                    </div>
                    <CheckSquare className="w-5 h-5 text-gold flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
                <button className="w-full mt-5 px-4 py-2.5 bg-gradient-to-r from-gold/30 to-gold/20 text-gold rounded-xl text-sm font-semibold hover:from-gold/40 hover:to-gold/30 transition-all duration-200 border border-gold/30 shadow-lg hover:shadow-xl">
                  View All Clients
                </button>
              </div>
              </DeviceCard>
              </Tilt3D>
            </motion.div>

            {/* Order Management Screen - Top Right (Tablet) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                scale: getCardAnimationProps(1).scale,
                opacity: getCardAnimationProps(1).opacity,
                y: getCardAnimationProps(1).y,
              }}
              transition={{ duration: CARD_STACK_CONFIG.animationDuration }}
              style={{
                position: 'absolute',
                top: '2rem',
                right: 0,
                zIndex: getCardAnimationProps(1).zIndex,
                filter: `drop-shadow(0 ${getCardAnimationProps(1).shadowIntensity * 20}px ${getCardAnimationProps(1).shadowIntensity * 30}px ${getCardAnimationProps(1).shadowColor}, ${getCardAnimationProps(1).shadowIntensity}))`,
              }}
            >
              <Tilt3D className="w-60 sm:w-64 md:w-72 lg:w-80" maxTilt={10}>
              <DeviceCard
                title="Order Management"
                icon={ClipboardList}
                className="w-full"
                delay={shouldReduceMotion ? 0 : 0.4}
                theme={theme}
              >
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl border border-gold/20">
                  <div className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">
                    Priority Order
                  </div>
                  <div className="text-base text-foreground font-bold flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-gold" />
                    O-218 / 450 Guests
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: "Wedding Reception", time: "Menu Locked", type: "primary" },
                    { name: "Corporate Lunch", time: "Awaiting Approval", type: "secondary" },
                  ].map((event, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-colors duration-150 ${
                        event.type === "primary"
                          ? "bg-gradient-to-r from-gold/20 to-gold/10 border-gold/30"
                          : "bg-card/50 border-gold/10 hover:border-gold/20"
                      }`}
                    >
                      <div className="text-sm text-foreground font-semibold">
                        {event.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </DeviceCard>
              </Tilt3D>
            </motion.div>

            {/* Payment Tracking Screen - Bottom Left (Tablet) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                scale: getCardAnimationProps(2).scale,
                opacity: getCardAnimationProps(2).opacity,
                y: getCardAnimationProps(2).y,
              }}
              transition={{ duration: CARD_STACK_CONFIG.animationDuration }}
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '1rem',
                zIndex: getCardAnimationProps(2).zIndex,
                filter: `drop-shadow(0 ${getCardAnimationProps(2).shadowIntensity * 20}px ${getCardAnimationProps(2).shadowIntensity * 30}px ${getCardAnimationProps(2).shadowColor}, ${getCardAnimationProps(2).shadowIntensity}))`,
              }}
            >
              <Tilt3D className="w-64 sm:w-72 md:w-80 lg:w-96" maxTilt={10}>
              <DeviceCard
                title="Payment Tracking"
                icon={CheckSquare}
                className="w-full"
                delay={shouldReduceMotion ? 0 : 0.5}
                theme={theme}
              >
              <div className="space-y-2.5">
                {[
                  { label: "Advance Received", status: "paid", icon: "INR" },
                  { label: "Vendor Settlement", status: "pending", icon: "INR" },
                  { label: "Final Invoice", status: "paid", icon: "INR" },
                  { label: "Balance Due", status: "pending", icon: "INR" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-card/60 to-card/40 border border-gold/10 hover:border-gold/30 hover:from-card/80 hover:to-card/60 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        item.status === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : theme === "dark"
                            ? "bg-gold/20 text-gold"
                            : "bg-gold/15 text-gold"
                      }`}>
                        {item.icon}
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {item.label}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      item.status === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : theme === "dark"
                          ? "bg-gold/20 text-gold"
                          : "bg-gold/15 text-gold"
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
              </DeviceCard>
              </Tilt3D>
            </motion.div>

            {/* Calendar Screen - Bottom Right (Small Tablet/Phone) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                scale: getCardAnimationProps(3).scale,
                opacity: getCardAnimationProps(3).opacity,
                y: getCardAnimationProps(3).y,
              }}
              transition={{ duration: CARD_STACK_CONFIG.animationDuration }}
              style={{
                position: 'absolute',
                bottom: 0,
                right: '2rem',
                zIndex: getCardAnimationProps(3).zIndex,
                filter: `drop-shadow(0 ${getCardAnimationProps(3).shadowIntensity * 20}px ${getCardAnimationProps(3).shadowIntensity * 30}px ${getCardAnimationProps(3).shadowColor}, ${getCardAnimationProps(3).shadowIntensity}))`,
              }}
            >
              <CalendarCard shouldReduceMotion={shouldReduceMotion} theme={theme} />
            </motion.div>

            {/* Decorative glow behind devices */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-gold/12 dark:bg-gold/10" />
          </motion.div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-20 fill-card/50">
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
