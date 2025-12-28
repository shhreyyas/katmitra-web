import { motion } from "framer-motion";
import { Calendar, Users, CheckSquare, ClipboardList } from "lucide-react";
import hdLogo from "@/assets/HD-logo.png";
import { SparklesCore } from "@/components/ui/sparkles";

const DeviceCard = ({
  children,
  className,
  delay = 0,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  title?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    className={`bg-card/90 backdrop-blur-xl rounded-xl border border-primary/40 p-4 shadow-2xl ${className}`}
    style={{
      boxShadow:
        "0 0 30px hsl(43, 96%, 56%, 0.3), 0 0 60px hsl(43, 96%, 56%, 0.15), inset 0 0 20px hsl(43, 96%, 56%, 0.1)",
    }}
  >
    {title && (
      <div className="mb-3 pb-2 border-b border-primary/20">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          {title}
        </span>
      </div>
    )}
    {children}
  </motion.div>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

      {/* Sparkles Particles Background */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="hsl(43, 96%, 56%)"
          speed={2}
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

      {/* Gold lines decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              {/* Large Logo with Glow - Mobile */}
              <div className="w-full lg:w-auto flex flex-col items-center lg:items-start">
                <div className="relative">
                  {/* Yellow circular glow */}
                  <div className="absolute inset-0 -m-8 lg:-m-12 rounded-full bg-primary/30 blur-3xl animate-pulse" />
                  <motion.img
                    src={hdLogo}
                    alt="KATMITRA"
                    className="relative w-52 h-52 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                {/* KATMITRA text below logo */}
                {/* <div className="mt-4 lg:mt-6 px-4 py-2 bg-primary rounded-lg">
                  <span className="font-display text-xl lg:text-2xl font-bold text-primary-foreground">
                    KATMITRA
                  </span>
                </div> */}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground block">All-in-One</span>
                  <span className="text-foreground block">Catering</span>
                  <span className="text-foreground block">Management</span>
                  <span className="text-foreground block">Platform</span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg lg:text-xl mb-8 max-w-xl leading-relaxed">
                  Streamline your catering business with our powerful,
                  easy-to-use platform. Manage orders, schedules, clients, and
                  more, all in one place.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] sm:h-[600px] lg:h-[700px]"
          >
            {/* Clients Screen - Top Left (Tablet) */}
            <DeviceCard
              title="Clients"
              className="absolute top-0 left-0 w-56 sm:w-64 md:w-72 lg:w-80 floating"
              delay={0.4}
            >
              <div className="space-y-3">
                {["Coere Strie", "Asa Rocks", "Aan Romts"].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-card/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm text-foreground font-medium block">
                          {name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Client
                        </span>
                      </div>
                    </div>
                    <CheckSquare className="w-4 h-4 text-primary flex-shrink-0" />
                  </div>
                ))}
                <button className="w-full mt-4 px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
                  Share
                </button>
              </div>
            </DeviceCard>

            {/* Upcoming Events Screen - Top Right (Tablet) */}
            <DeviceCard
              title="Uxumping Events"
              className="absolute top-8 right-0 sm:right-4 w-52 sm:w-60 md:w-64 lg:w-72 floating-delayed"
              delay={0.5}
            >
              <div className="space-y-3">
                <div className="p-3 bg-card/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">
                    Event Date
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    Select Date
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-primary/10 rounded text-xs text-foreground">
                    Event 1
                  </div>
                  <div className="p-2 bg-card/50 rounded text-xs text-foreground">
                    Event 2
                  </div>
                </div>
              </div>
            </DeviceCard>

            {/* Main Checklist Screen - Center (Phone) */}
            <DeviceCard
              title="Coocit. Goco"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 lg:w-72 floating-slow z-10"
              delay={0.6}
            >
              <div className="space-y-3">
                {["Task Item 1", "Task Item 2", "Task Item 3"].map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-primary/20 border border-primary/40"
                    >
                      <span className="text-sm text-foreground font-medium">
                        {item}
                      </span>
                      <CheckSquare className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                  )
                )}
              </div>
            </DeviceCard>

            {/* Booking Details Screen - Bottom Left (Tablet) */}
            <DeviceCard
              title="Booking Details"
              className="absolute bottom-8 left-4 sm:left-8 w-56 sm:w-64 md:w-72 lg:w-80 floating"
              delay={0.7}
            >
              <div className="space-y-2">
                {[
                  "For Castions",
                  "Booking Getiont",
                  "Coock Hortizης",
                  "Coonit Mornticos",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-card/50"
                  >
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {item}
                    </span>
                    <CheckSquare className="w-4 h-4 text-primary flex-shrink-0" />
                  </div>
                ))}
              </div>
            </DeviceCard>

            {/* Calendar Screen - Bottom Right (Small Tablet/Phone) */}
            <DeviceCard
              title="Calendar"
              className="absolute bottom-0 right-0 sm:right-8 w-48 sm:w-56 md:w-60 lg:w-64 floating-slow"
              delay={0.8}
            >
              <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <span
                    key={i}
                    className="text-center text-muted-foreground font-medium"
                  >
                    {day}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1;
                  const isHighlighted = [7, 10, 19, 23].includes(day);
                  return (
                    <span
                      key={i}
                      className={`text-center p-1 rounded ${
                        isHighlighted
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day <= 28 ? day : ""}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3 pt-2 border-t border-primary/20">
                <div className="text-xs text-foreground font-medium">
                  Howling
                </div>
                <div className="text-xs text-muted-foreground">Booking</div>
              </div>
            </DeviceCard>

            {/* Decorative glow behind devices */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
