import { motion } from "framer-motion";
import { Play, ArrowRight, Calendar, Users, CheckSquare, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import chefMascot from "@/assets/chef-mascot.png";

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
    className={`glass-card-gold rounded-2xl p-4 ${className}`}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      {/* Decorative particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 particle" style={{ animationDelay: "0s" }} />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 particle" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 particle" style={{ animationDelay: "4s" }} />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 particle" style={{ animationDelay: "6s" }} />

      {/* Gold lines decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Chef Mascot for mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <img
                src={chefMascot}
                alt="KATMITRA Chef"
                className="w-40 h-40 object-contain floating"
              />
            </div>

            {/* Desktop mascot alongside text */}
            <div className="flex items-start gap-6">
              <motion.img
                src={chefMascot}
                alt="KATMITRA Chef"
                className="hidden lg:block w-48 h-48 object-contain flex-shrink-0"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                <span className="text-foreground">All-in-One</span>
                <br />
                <span className="text-gradient-gold">Catering</span>
                <br />
                <span className="text-foreground">Management</span>
                <br />
                <span className="text-foreground">Platform</span>
              </h1>

              <p className="text-muted-foreground text-lg lg:text-xl mb-8 max-w-xl leading-relaxed">
                Streamline your catering business with our powerful, easy-to-use platform.
                Manage orders, schedules, clients, and more — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-gold text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg hover:opacity-90 transition-all duration-300 glow-gold group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-lg rounded-lg group"
                >
                  <Play className="mr-2 w-5 h-5 fill-current" />
                  Watch Demo
                </Button>
              </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px] hidden lg:block"
          >
            {/* Main Client Card */}
            <FloatingCard className="absolute top-0 left-0 w-64 floating" delay={0.4}>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Clients</span>
              </div>
              <div className="space-y-3">
                {["Leela Sriram", "Ava Roots", "Anji Fonts"].map((name, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20" />
                      <span className="text-sm text-muted-foreground">{name}</span>
                    </div>
                    <CheckSquare className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
            </FloatingCard>

            {/* Booking Details Card */}
            <FloatingCard className="absolute top-1/3 left-1/4 w-60 floating-delayed" delay={0.6}>
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Booking Details</span>
              </div>
              <div className="space-y-2">
                {["Event Confirm", "Fan Catering", "Booking Patient", "Guest Meetings"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item}</span>
                    <CheckSquare className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
            </FloatingCard>

            {/* Calendar Card */}
            <FloatingCard className="absolute bottom-10 right-0 w-56 floating-slow" delay={0.8}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Calendar</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <span key={i} className="text-center text-muted-foreground">
                    {day}
                  </span>
                ))}
                {Array.from({ length: 14 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-center p-1 rounded ${
                      [3, 7, 10].includes(i) ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </FloatingCard>

            {/* Events Card */}
            <FloatingCard className="absolute top-10 right-10 w-52 floating" delay={0.5}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground text-sm">Upcoming Events</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Cocktail FOGO</div>
                <div className="h-16 bg-muted/30 rounded-lg" />
              </div>
            </FloatingCard>

            {/* Decorative glow */}
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
