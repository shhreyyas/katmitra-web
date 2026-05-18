import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Lock, Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import HeaderControls from "@/components/HeaderControls";
import { useI18n } from "@/contexts/I18nContext";

const PRIVACY_SECTION_IDS = [
  "collect",
  "use",
  "permissions",
  "storage",
  "sharing",
  "retention",
  "choices",
  "updates",
] as const;

const PrivacyPolicy = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, tList } = useI18n();

  useEffect(() => {
    const base = t("privacy.pageTitle");
    document.title = `${base} · Katmitra`;
  }, [t]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <section className="relative min-h-screen pb-24 pt-20">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="mb-6 flex justify-center">
            <HeaderControls />
          </div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              ease: "easeOut",
            }}
            className="mb-14 text-center sm:mb-16"
          >
            <div className="mb-7 inline-flex items-center justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gold ring-[10px] ring-gold/15 ring-offset-2 ring-offset-background sm:h-[4.75rem] sm:w-[4.75rem]"
                aria-hidden
              >
                <Lock
                  className="h-8 w-8 text-accent-foreground sm:h-9 sm:w-9"
                  strokeWidth={2.25}
                />
              </div>
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              {t("privacy.pageTitle")}
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("privacy.intro")}
            </p>
            <p className="mt-5 text-sm text-muted-foreground sm:text-[0.9375rem]">
              {t("privacy.effectiveDate")}
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
            {PRIVACY_SECTION_IDS.map((id, index) => {
              const items = tList(`privacy.${id}.items`);
              return (
                <motion.article
                  key={id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.04,
                  }}
                  className="rounded-[15px] border border-gold/25 bg-card px-6 py-7 shadow-sm backdrop-blur-sm transition-colors dark:border-gold/20 dark:shadow-none sm:p-8"
                >
                  <h2 className="mb-4 text-left font-display text-xl font-bold text-foreground sm:text-[1.35rem]">
                    {t(`privacy.${id}.title`)}
                  </h2>
                  <ul className="space-y-3 text-left">
                    {items.map((item, itemIndex) => (
                      <li
                        key={`${id}-${itemIndex}`}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base"
                      >
                        <span
                          className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
            className="mx-auto mt-16 max-w-3xl sm:mt-20"
          >
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
              {t("common.contactUs")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[15px] border border-gold/25 bg-card px-6 py-7 text-center shadow-sm backdrop-blur-sm transition-colors hover:border-gold/40 dark:border-gold/20">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{t("terms.emailLabel")}</h3>
                <a
                  href="mailto:info.katmitra@gmail.com"
                  className="text-sm text-gold hover:underline"
                >
                  info.katmitra@gmail.com
                </a>
              </div>

              <div className="rounded-[15px] border border-gold/25 bg-card px-6 py-7 text-center shadow-sm backdrop-blur-sm transition-colors hover:border-gold/40 dark:border-gold/20">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{t("terms.phoneLabel")}</h3>
                <a href="tel:+919427077230" className="text-sm text-gold hover:underline">
                  +91 9427077230
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
