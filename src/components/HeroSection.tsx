import { motion } from "framer-motion";
import { Play, Calendar, Users, CheckSquare, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import katmitraLogo from "@/assets/katmitra-logo.png";

const FloatingCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className={`bg-card/80 backdrop-blur-xl border border-gold-500/30 rounded-2xl p-4 shadow-xl shadow-gold-500/10 ${className}`}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden bg-background">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/50" />
      
      {/* Gold glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px]" />
      
      {/* Decorative gold wave lines at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q360,120 720,60 T1440,60"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            className="opacity-40"
          />
          <path
            d="M0,80 Q360,20 720,80 T1440,80"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            className="opacity-30"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a520" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d4a520" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Small decorative particles */}
      <div className="absolute top-1/3 left-[10%] w-1 h-1 bg-gold-400 rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-[15%] w-2 h-2 bg-gold-500/50 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-2/3 right-[20%] w-1.5 h-1.5 bg-gold-400/60 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="w-full px-6 lg:px-12 xl:px-20 py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[80vh]">
          {/* Left Content - Logo and Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8"
          >
            {/* Large Chef Mascot Logo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <img
                src={katmitraLogo}
                alt="KATMITRA Chef"
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Text Content */}
            <div className="text-center lg:text-left max-w-xl">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
                <span className="text-foreground">All-in-One</span>
                <br />
                <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Catering</span>
                <br />
                <span className="text-foreground">Management</span>
                <br />
                <span className="text-foreground">Platform</span>
              </h1>

              <p className="text-muted-foreground text-base lg:text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                Streamline your catering business with our powerful, easy-to-use platform.
                Manage orders, schedules, clients, and more, all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-gold-500 text-background font-bold px-8 py-6 text-lg rounded-lg hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/30">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-gold-500/50 text-foreground hover:bg-gold-500/10 hover:border-gold-400 px-8 py-6 text-lg rounded-lg group bg-transparent"
                >
                  <Play className="mr-2 w-5 h-5 fill-gold-400 text-gold-400" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Floating App Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative h-[450px] sm:h-[500px] lg:h-[600px] w-full max-w-2xl hidden md:block"
          >
            {/* Glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-[80px]" />

            {/* Main Client Card */}
            <FloatingCard className="absolute top-0 left-0 w-52 lg:w-60" delay={0.4}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gold-500/20">
                <Users className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-foreground">Clients</span>
                <input className="ml-auto w-16 h-6 bg-muted/50 rounded text-xs px-2" placeholder="Search" />
              </div>
              <div className="space-y-2.5">
                {["Leela Sriram", "Ava Roots", "Anji Fonts"].map((name, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/30 flex items-center justify-center text-xs text-gold-400">
                        {name[0]}
                      </div>
                      <div>
                        <span className="text-sm text-foreground block">{name}</span>
                        <span className="text-[10px] text-muted-foreground">contact@email.com</span>
                      </div>
                    </div>
                    <CheckSquare className="w-4 h-4 text-gold-500" />
                  </motion.div>
                ))}
              </div>
            </FloatingCard>

            {/* Booking Details Card */}
            <FloatingCard className="absolute top-[35%] left-[20%] w-48 lg:w-56" delay={0.6}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gold-500/20">
                <ClipboardList className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-foreground text-sm">Booking Details</span>
              </div>
              <div className="space-y-2">
                {["Venue Confirm", "Fan Catering", "Booking Patient", "Leela Meetings", "Cooki Meatious"].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-gold-500/20 flex items-center justify-center">
                        <CheckSquare className="w-3 h-3 text-gold-400" />
                      </div>
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                    <CheckSquare className="w-3.5 h-3.5 text-gold-500" />
                  </motion.div>
                ))}
              </div>
            </FloatingCard>

            {/* Upcoming Events Card */}
            <FloatingCard className="absolute top-5 right-0 w-48 lg:w-56" delay={0.5}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gold-500/20">
                <Calendar className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-foreground text-sm">Upcoming Events</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-muted/30 rounded-lg border border-gold-500/10">
                  <div className="text-xs text-foreground font-medium">Cocktail FOGO</div>
                  <div className="text-[10px] text-muted-foreground">Party celebration</div>
                </div>
                <div className="h-12 bg-muted/20 rounded-lg border border-gold-500/5" />
              </div>
            </FloatingCard>

            {/* Calendar Card */}
            <FloatingCard className="absolute bottom-10 right-5 w-48 lg:w-56" delay={0.8}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gold-500/20">
                <Calendar className="w-5 h-5 text-gold-400" />
                <span className="font-semibold text-foreground text-sm">Calendar</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground mb-2">
                  <span className="text-foreground font-medium">Booking</span>
                  <span className="ml-2">Dec 2024</span>
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-[10px]">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <span key={i} className="text-center text-muted-foreground font-medium py-1">
                      {day}
                    </span>
                  ))}
                  {Array.from({ length: 21 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-center py-1 rounded ${
                        [5, 9, 12, 16].includes(i) 
                          ? "bg-gold-500 text-background font-bold" 
                          : "text-muted-foreground hover:bg-muted/30"
                      }`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </FloatingCard>

            {/* Small booking list items */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-32 right-[45%] text-[10px] bg-card/70 backdrop-blur-lg border border-gold-500/20 rounded-lg p-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-foreground">Last Clients</span>
                <span className="text-gold-400">→</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
