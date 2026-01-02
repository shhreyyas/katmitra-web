import { motion, useReducedMotion } from "framer-motion";
import { UserPlus, Settings, Banknote, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description: "Sign up and set up your catering business in minutes. Get instant access to all features.",
    features: ["Quick Setup", "Free Trial", "No Credit Card"],
  },
  {
    icon: Settings,
    step: "02",
    title: "Manage Orders & Events",
    description: "Handle bookings, menus, staff, and schedules effortlessly from one dashboard.",
    features: ["Order Management", "Calendar Sync", "Team Collaboration"],
  },
  {
    icon: Banknote,
    step: "03",
    title: "Deliver & Get Paid",
    description: "Serve clients smoothly and receive payments securely through integrated systems.",
    features: ["Secure Payments", "Invoice Generation", "Analytics Dashboard"],
  },
];

const HowItWorksSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  
  // Theme-aware shadow color
  const shadowColor = theme === "dark" 
    ? "hsl(43, 96%, 56%, 0.1)" // Gold for dark mode
    : "hsl(180, 70%, 40%, 0.1)"; // Teal/cyan for light mode

  return (
    <section id="how-it-works" className="relative py-20 sm:py-24 lg:py-32 bg-background overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-sm font-semibold text-primary mb-4 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20"
          >
            Simple Process
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Get started in three simple steps and transform your catering business with our powerful platform.
          </p>
        </motion.div>

        <div className="relative">
          {/* Enhanced Connecting line with arrow - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary origin-left"
              style={{ transformOrigin: "left" }}
            />
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.3 + i * 0.15, type: "spring", stiffness: 200 }}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${33.33 * i}%` }}
              >
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg" />
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: shouldReduceMotion ? 0 : 0.6, 
                  delay: shouldReduceMotion ? 0 : index * 0.15,
                  ease: "easeOut"
                }}
                className="relative group"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 text-center relative z-10 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[400px] md:min-h-[420px] lg:min-h-[450px] w-full flex flex-col"
                  style={{
                    boxShadow: `0 8px 32px rgba(0, 0, 0, ${theme === "dark" ? "0.2" : "0.1"}), 0 0 40px ${shadowColor}`,
                  }}
                >
                  {/* Step number badge */}
                  <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 pointer-events-none">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        delay: shouldReduceMotion ? 0 : index * 0.15 + 0.2
                      }}
                      className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-sm px-4 md:px-5 py-2 rounded-full shadow-lg border-2 border-background whitespace-nowrap pointer-events-auto"
                    >
                      Step {step.step}
                    </motion.div>
                  </div>

                  {/* Icon circle with enhanced design */}
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6 mt-4 md:mt-6 border-2 border-primary/40 shadow-lg relative overflow-hidden group/icon flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    <step.icon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary relative z-10" />
                    <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 md:space-y-2.5 mt-auto">
                    {step.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: shouldReduceMotion ? 0 : index * 0.15 + 0.4 + i * 0.1 
                        }}
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/30"
          >
            Get Started Now
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default HowItWorksSection;
