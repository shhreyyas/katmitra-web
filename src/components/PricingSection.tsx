import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { revealViewport } from "@/lib/motion";
import { useI18n } from "@/contexts/I18nContext";

const PricingSection = () => {
  const { t, tList } = useI18n();
  const reduce = useReducedMotion();
  const planFeatures = tList("pricing.planFeatures");

  return (
    <section
      id="pricing"
      className="relative py-28 sm:py-32 lg:py-40 bg-background overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            {t("pricing.heading")}
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.08 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-6">
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
              {t("pricing.earlyAccessBadge")}
            </span>
          </div>

          <article className="relative rounded-3xl border border-gold/30 bg-card p-8 sm:p-10 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {t("pricing.earlyAccessPill")}
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-3">
              {t("pricing.starterPlan")}
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t("pricing.free")}
            </h3>
            <p className="text-sm text-gold font-medium mb-3">
              {t("pricing.availableEarlyAccess")}
            </p>
            <p className="text-muted-foreground mb-8">
              {t("pricing.planDescription")}
            </p>

            <ul className="space-y-3 mb-8 text-left">
              {planFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex w-full justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-95 transition-all"
            >
              {t("footer.startFreeNow")}
            </a>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {t("common.noCard")}
            </p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {t("pricing.specialPricingNote")}
            </p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {t("pricing.paidPlansNote")}
            </p>
          </article>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
