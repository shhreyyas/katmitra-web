import { motion, useReducedMotion } from "framer-motion";
import { Clock, FileText, Smile, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tilt3D } from "@/components/motion/tilt-3d";
import {
  revealViewport,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion";

const benefits = [
  {
    icon: Clock,
    title: "Saves Time & Cost",
    description: "Automate repetitive tasks and reduce operational overhead significantly.",
  },
  {
    icon: Settings,
    title: "Easy Order Management",
    description: "Handle multiple orders seamlessly with our intuitive dashboard.",
  },
  {
    icon: FileText,
    title: "Professional Invoicing",
    description: "Generate beautiful invoices and quotations in seconds.",
  },
  {
    icon: Smile,
    title: "Better Customer Experience",
    description: "Delight your clients with smooth communication and delivery.",
  },
];

const BenefitsSection = () => {
  const { theme } = useTheme();
  const reduce = useReducedMotion();

  return (
    <section
      id="benefits"
      className="relative py-28 sm:py-32 lg:py-40 bg-background overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,720px)] h-[min(100vw,720px)] max-h-[900px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Why choose <span className="text-gradient-gold">KatMitra</span>?
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            Everything you need to run a successful catering business, all in one platform.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 [perspective:1100px]"
          variants={staggerContainerVariants(reduce, 0.12, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={staggerItemVariants(reduce, { y: 36 })}
              className="group [transform-style:preserve-3d]"
            >
              <Tilt3D className="h-full" maxTilt={9}>
              <div
                className={`glass-card-gold rounded-2xl p-6 lg:p-7 h-full transition-all duration-300 hover:border-primary/60 hover:glow-gold-sm ${
                  theme === "light" ? "bg-card/80" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
