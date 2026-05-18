import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Package,
  Wallet,
  FileText,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { revealViewport, staggerContainerVariants } from "@/lib/motion";
import { useI18n } from "@/contexts/I18nContext";

const stepConfig = [
  { id: "createEvent", icon: Calendar, step: "01" },
  { id: "selectMenu", icon: UtensilsCrossed, step: "02" },
  { id: "groceryList", icon: ShoppingCart, step: "03" },
  {
    id: "assignStaff",
    icon: Users,
    step: "04",
    secondaryIcon: Package,
  },
  { id: "trackPayments", icon: Wallet, step: "05" },
  { id: "generateInvoice", icon: FileText, step: "06" },
] as const;

const HowItWorksSection = () => {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  const shadowColor =
    theme === "dark"
      ? "hsl(43, 96%, 56%, 0.12)"
      : "hsl(180, 70%, 40%, 0.12)";

  return (
    <section
      id="how-it-works"
      className="relative py-28 sm:py-32 lg:py-40 bg-muted/25 overflow-hidden border-y border-border/25"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="max-w-3xl mb-14 lg:mb-24">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            {t("howItWorks.eyebrow")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.08] text-foreground">
            {t("howItWorks.heading")}
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl leading-relaxed">
            {t("howItWorks.subtitle")}
          </p>
        </ScrollReveal>

        <motion.div
          className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={staggerContainerVariants(reduce, 0.1, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <div className="hidden lg:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-gold/20 via-gold/50 to-gold/20" />
          {stepConfig.map((step, index) => {
            const Icon = step.icon;
            const SecondaryIcon =
              "secondaryIcon" in step ? step.secondaryIcon : undefined;
            return (
              <motion.div
                key={step.step}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 26 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" },
                  },
                }}
                className="group relative"
              >
                <Tilt3D className="h-full" maxTilt={8}>
                  <article
                    className="rounded-2xl border border-gold/20 bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl p-8 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/45 [transform-style:preserve-3d]"
                    style={{
                      boxShadow: `0 12px 40px rgba(0,0,0,${theme === "dark" ? "0.24" : "0.08"}), 0 0 44px ${shadowColor}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-4xl font-bold text-gold/30 leading-none">
                        {step.step}
                      </span>
                      <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center gap-1.5">
                        <Icon className="w-6 h-6 text-gold" />
                        {SecondaryIcon ? (
                          <SecondaryIcon className="w-5 h-5 text-gold/90" />
                        ) : null}
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {t(`howItWorks.${step.id}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`howItWorks.${step.id}.description`)}
                    </p>
                    {index < stepConfig.length - 1 ? (
                      <div className="lg:hidden mt-6 h-8 flex items-center justify-center">
                        <div className="w-0.5 h-full bg-gold/35 rounded-full" />
                      </div>
                    ) : null}
                  </article>
                </Tilt3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
