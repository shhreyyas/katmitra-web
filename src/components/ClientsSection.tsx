import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { revealViewport } from "@/lib/motion";
import { useI18n } from "@/contexts/I18nContext";

const testimonials = [
  {
    name: "Ramesh Patel",
    text: "Earlier I was managing everything in Excel. Now with Katmitra, all my events, payments, and staff are in one place.",
  },
  {
    name: "Amit Sharma",
    text: "Tracking partial payments was always confusing. Now I can easily manage every payment entry.",
  },
  {
    name: "Jignesh Bhai",
    text: "The auto grocery list feature saves me so much time. I don’t miss anything now.",
  },
];

const ClientsSection = () => {
  const { t, tList } = useI18n();
  const reduce = useReducedMotion();
  const trustPoints = tList("clients.trustPoints");

  return (
    <section
      id="clients"
      className="relative py-20 sm:py-28 lg:py-36 bg-card/25 overflow-hidden border-y border-border/30"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            {t("clients.heading")}
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            {t("clients.subtitle")}
          </p>
        </ScrollReveal>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: reduce ? 0 : 0.55 }}
        >
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-gold/15 text-gold flex items-center justify-center font-semibold mb-4">
                {item.name.slice(0, 1)}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                "{item.text}"
              </p>
              <p className="text-foreground font-semibold">{item.name}</p>
            </article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.08 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {trustPoints.map((point) => (
            <span
              key={point}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
            >
              {point}
            </span>
          ))}
          <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
            {t("clients.eventsBadge")}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
