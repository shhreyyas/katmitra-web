import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Lock,
  Headphones,
  User,
  Server,
  Ban,
  RefreshCw,
  Link2,
  Copyright,
  UserRound,
  Scale,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useI18n } from "@/contexts/I18nContext";
import HeaderControls from "@/components/HeaderControls";

const termDefinitions: { number: number; id: string; icon: LucideIcon }[] = [
  { number: 1, id: "usePlatform", icon: Shield },
  { number: 2, id: "subscription", icon: CreditCard },
  { number: 3, id: "dataProtection", icon: Lock },
  { number: 4, id: "support", icon: Headphones },
  { number: 5, id: "account", icon: User },
  { number: 6, id: "availability", icon: Server },
  { number: 7, id: "termination", icon: Ban },
  { number: 8, id: "updates", icon: RefreshCw },
  { number: 9, id: "privacyLink", icon: Link2 },
  { number: 10, id: "intellectualProperty", icon: Copyright },
  { number: 11, id: "userContent", icon: UserRound },
  { number: 12, id: "governingLaw", icon: Scale },
];

const TermCard = ({
  term,
  index,
  shouldReduceMotion,
}: {
  term: (typeof termDefinitions)[number];
  index: number;
  shouldReduceMotion: boolean;
}) => {
  const { t, tList } = useI18n();
  const Icon = term.icon;
  const bullets = tList(`terms.${term.id}.items`);
  const title = t(`terms.${term.id}.title`);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-gold/30 text-gold font-bold text-sm flex items-center justify-center">
              {term.number}
            </span>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
          <ul className="space-y-2 ml-11">
            {bullets.map((item, idx) => (
              <li
                key={idx}
                className="text-muted-foreground leading-relaxed flex items-start gap-2"
              >
                <span className="text-gold mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const TermsAndConditions = () => {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative pt-20 pb-20 min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mb-6 flex justify-center">
            <HeaderControls />
          </div>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              ease: "easeOut",
            }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: shouldReduceMotion ? 0 : 0.2,
              }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
                <FileText className="w-10 h-10 text-gold" />
              </div>
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("terms.pageTitle")}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: 0.3,
              }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-muted-foreground text-lg sm:text-xl mb-4">
                {t("terms.welcome")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.intro")}
              </p>
            </motion.div>
          </motion.div>

          {/* Terms List */}
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            {termDefinitions.map((term, index) => (
              <TermCard
                key={term.id}
                term={term}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="flex flex-col items-center text-center mb-10 px-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight max-w-3xl">
                {t("terms.contactHeading")}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: 0.4,
                }}
                className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 text-center hover:border-gold/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mx-auto mb-4 text-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t("terms.emailLabel")}
                </h3>
                <a
                  href="mailto:info.katmitra@gmail.com"
                  className="text-gold hover:underline text-sm"
                >
                  info.katmitra@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: 0.5,
                }}
                className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 text-center hover:border-gold/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mx-auto mb-4 text-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t("terms.phoneLabel")}
                </h3>
                <a
                  href="tel:+919427077230"
                  className="text-gold hover:underline text-sm"
                >
                  +91 9427077230
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsAndConditions;
