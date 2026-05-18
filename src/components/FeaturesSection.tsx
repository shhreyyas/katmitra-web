import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Wallet,
  MenuSquare,
  ShoppingCart,
  Package,
  Users,
  Calculator,
  FileText,
  ClipboardList,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tilt3D } from "@/components/motion/tilt-3d";
import {
  revealViewport,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion";
import { useI18n } from "@/contexts/I18nContext";

const featureKeys = [
  { id: "eventOrder", icon: Calendar },
  { id: "payment", icon: Wallet },
  { id: "menu", icon: MenuSquare },
  { id: "grocery", icon: ShoppingCart },
  { id: "utensil", icon: Package },
  { id: "staff", icon: Users },
  { id: "estimation", icon: Calculator },
  { id: "invoice", icon: FileText },
  { id: "calendar", icon: ClipboardList },
] as const;

const FeaturesSection = () => {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="relative py-28 sm:py-32 lg:py-40 bg-card/40 overflow-hidden border-y border-border/40"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            {t("features.heading")}
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            {t("features.subtitle")}
          </p>
        </ScrollReveal>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 [perspective:1100px]"
          variants={staggerContainerVariants(reduce, 0.1, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {featureKeys.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={staggerItemVariants(reduce, { y: 40 })}
                className="group relative [transform-style:preserve-3d]"
              >
                <Tilt3D className="h-full" maxTilt={8}>
                  <div className="rounded-2xl p-8 h-full border border-[#E5E7EB] dark:border-border bg-white dark:bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg relative overflow-hidden [transform-style:preserve-3d]">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 transition-all duration-300 [transform-style:preserve-3d]"
                      whileHover={
                        reduce
                          ? undefined
                          : {
                              rotateY: 12,
                              rotateX: -6,
                              scale: 1.06,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                              },
                            }
                      }
                    >
                      <Icon className="w-8 h-8 text-gold" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                      {t(`features.${feature.id}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`features.${feature.id}.description`)}
                    </p>

                    <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl border border-gold/30" />
                    </motion.div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
