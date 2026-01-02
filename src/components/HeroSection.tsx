import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Users, CheckSquare, ClipboardList } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import hdLogo from "@/assets/HD-logo.png";
import mainLogo from "@/assets/main-logo.jpg";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "@/contexts/ThemeContext";

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
  
  // Theme-aware shadow color
  const shadowColor = theme === "dark" 
    ? "hsl(43, 96%, 56%, 0.2)" // Gold for dark mode
    : "hsl(180, 70%, 40%, 0.2)"; // Teal/cyan for light mode
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.5, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut"
      }}
      className={`bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl rounded-2xl border border-primary/30 p-5 shadow-2xl hover:border-primary/50 transition-all duration-200 ${className}`}
      style={{
        boxShadow: `0 8px 32px rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"}), 0 0 40px ${shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        willChange: "transform, opacity",
      }}
    >
    {title && (
      <div className="mb-4 pb-3 border-b border-primary/20 flex items-center gap-2">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
        <span className="text-sm font-bold text-primary uppercase tracking-wider">
          {title}
        </span>
      </div>
    )}
    {children}
  </motion.div>
  );
};

const CalendarCard = ({ shouldReduceMotion }: { shouldReduceMotion: boolean }) => {
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
    <DeviceCard
      title="Calendar"
      icon={Calendar}
      className="absolute bottom-0 right-0 sm:right-8 w-64 sm:w-64 md:w-72 lg:w-80 floating-slow z-[8]"
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
                  ? "bg-primary/40 text-primary font-bold border-2 border-primary/70 shadow-sm"
                  : isHighlighted
                  ? "bg-gradient-to-br from-primary/50 to-primary/30 text-primary-foreground font-bold shadow-sm sm:shadow-md"
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
      <div className="mt-4 pt-3 border-t border-primary/20">
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
            className="w-2 h-2 rounded-full bg-primary"
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
  );
};

// Card stack animation configuration
const CARD_STACK_CONFIG = {
  activeDuration: 3000, // 3 seconds per card
  cardOrder: ['clients', 'events', 'booking', 'calendar'] as const,
  animationDuration: 0.6, // seconds for transition
};

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { theme } = useTheme();
  
  // Theme-aware sparkle color - darker and more saturated for light mode visibility
  const sparkleColor = theme === "dark" 
    ? "hsl(43, 96%, 56%)" // Gold for dark mode
    : "hsl(180, 70%, 35%)"; // Darker teal/cyan for light mode visibility
  
  // Auto-loop through cards
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % CARD_STACK_CONFIG.cardOrder.length);
    }, CARD_STACK_CONFIG.activeDuration);
    
    return () => clearInterval(interval);
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
    
    // Theme-aware shadow color (RGB values)
    const shadowColor = theme === "dark" 
      ? "rgba(251, 191, 36" // Gold RGB (hsl(43, 96%, 56%))
      : "rgba(59, 180, 184"; // Teal/cyan RGB (hsl(180, 70%, 40%))
    
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
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className={`absolute inset-0 bg-gradient-radial ${
        theme === "dark" 
          ? "from-primary/10 via-transparent to-transparent" 
          : "from-primary/25 via-primary/10 to-transparent"
      }`} />

      {/* Sparkles Particles Background */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={theme === "dark" ? 0.4 : 0.6}
          maxSize={theme === "dark" ? 1.2 : 1.5}
          particleDensity={shouldReduceMotion ? 30 : (theme === "dark" ? 60 : 80)}
          className="w-full h-full"
          particleColor={sparkleColor}
          speed={shouldReduceMotion ? 0.5 : 1.5}
        />
      </div>

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
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
        theme === "dark" ? "via-primary/30" : "via-primary/50"
      } to-transparent`} />
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
        theme === "dark" ? "via-primary/30" : "via-primary/50"
      } to-transparent`} />

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
            <div className="flex flex-col items-center text-center gap-8 lg:gap-10">
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

              {/* Text Content - Below Logo */}
              <div className="flex-1 max-w-4xl">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground block">All-in-One</span>
                  <span className="text-foreground block">Catering</span>
                  <span className="text-foreground block">Management</span>
                  <span className="text-foreground block">Platform</span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  Streamline your catering business with our powerful,
                  easy-to-use platform. Manage orders, schedules, clients, and
                  more, all in one place.
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
            className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-visible"
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
              <DeviceCard
                title="Clients"
                icon={Users}
                className="w-64 sm:w-72 md:w-80 lg:w-96"
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
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-card/60 to-card/40 border border-primary/10 hover:border-primary/30 hover:from-card/80 hover:to-card/60 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-sm shadow-lg">
                        {client.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-foreground font-semibold block truncate">
                          {client.name}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            client.status === "Active" 
                              ? "bg-green-500" 
                              : theme === "dark" 
                                ? "bg-primary" 
                                : "bg-accent"
                          }`}></span>
                          {client.status}
                        </span>
                      </div>
                    </div>
                    <CheckSquare className="w-5 h-5 text-primary flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
                <button className="w-full mt-5 px-4 py-2.5 bg-gradient-to-r from-primary/30 to-primary/20 text-primary rounded-xl text-sm font-semibold hover:from-primary/40 hover:to-primary/30 transition-all duration-200 border border-primary/30 shadow-lg hover:shadow-xl">
                  View All Clients
                </button>
              </div>
              </DeviceCard>
            </motion.div>

            {/* Upcoming Events Screen - Top Right (Tablet) */}
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
              <DeviceCard
                title="Upcoming Events"
                icon={Calendar}
                className="w-60 sm:w-64 md:w-72 lg:w-80"
                delay={shouldReduceMotion ? 0 : 0.4}
                theme={theme}
              >
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20">
                  <div className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">
                    Next Event
                  </div>
                  <div className="text-base text-foreground font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Dec 15, 2024
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: "Wedding Reception", time: "6:00 PM", type: "primary" },
                    { name: "Corporate Lunch", time: "12:00 PM", type: "secondary" },
                  ].map((event, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-colors duration-150 ${
                        event.type === "primary"
                          ? "bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30"
                          : "bg-card/50 border-primary/10 hover:border-primary/20"
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
            </motion.div>

            {/* Booking Details Screen - Bottom Left (Tablet) */}
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
              <DeviceCard
                title="Booking Details"
                icon={ClipboardList}
                className="w-64 sm:w-72 md:w-80 lg:w-96"
                delay={shouldReduceMotion ? 0 : 0.5}
                theme={theme}
              >
              <div className="space-y-2.5">
                {[
                  { label: "Food Catering", status: "confirmed", icon: "✓" },
                  { label: "Booking Management", status: "pending", icon: "⏱" },
                  { label: "Cook Hiring", status: "confirmed", icon: "✓" },
                  { label: "Event Monitoring", status: "confirmed", icon: "✓" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-card/60 to-card/40 border border-primary/10 hover:border-primary/30 hover:from-card/80 hover:to-card/60 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        item.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : theme === "dark"
                            ? "bg-primary/20 text-primary"
                            : "bg-accent/20 text-accent"
                      }`}>
                        {item.icon}
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {item.label}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      item.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : theme === "dark"
                          ? "bg-primary/20 text-primary"
                          : "bg-accent/20 text-accent"
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
              </DeviceCard>
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
              <CalendarCard shouldReduceMotion={shouldReduceMotion} />
            </motion.div>

            {/* Decorative glow behind devices */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
              theme === "dark" ? "bg-primary/10" : "bg-primary/20"
            }`} />
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
