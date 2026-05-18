import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Mail, Phone, Clock, CheckCircle2, HelpCircle, X } from "lucide-react";
import Footer from "@/components/Footer";
import { useI18n } from "@/contexts/I18nContext";
import HeaderControls from "@/components/HeaderControls";

const supportServices = [
  "Technical assistance",
  "Order and booking management help",
  "Invoice and quotation support",
  "Team and business setup guidance",
  "API and integration support (Professional & Enterprise)",
];

const SupportCard = ({
  icon,
  title,
  content,
  link,
  index,
  shouldReduceMotion,
}: {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
  link?: string;
  index: number;
  shouldReduceMotion: boolean;
}) => {
  const CardContent = (
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
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <div className="text-muted-foreground leading-relaxed">{content}</div>
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const Support = () => {
  const { language } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const copy =
    language === "hi"
      ? {
          title1: "हम यहां",
          title2: "मदद के लिए हैं!",
          subtitle:
            "अगर आपको कोई समस्या है, हमारी टीम आपकी सहायता के लिए उपलब्ध है।",
        }
      : language === "gu"
        ? {
            title1: "અમે અહીં",
            title2: "મદદ માટે છીએ!",
            subtitle: "જો તમને કોઈ સમસ્યા હોય, તો અમારી ટીમ મદદ માટે તૈયાર છે.",
          }
        : {
            title1: "We're here to",
            title2: "help!",
            subtitle:
              "If you're facing any issues or need assistance, our support team is available to guide you.",
          };

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
                <HelpCircle className="w-10 h-10 text-gold" />
              </div>
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {copy.title1}
              <span className="text-gradient-gold block">{copy.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
              {copy.subtitle}
            </p>
          </motion.div>

          {/* Support Services Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Support Services We Provide
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6">
                <ul className="space-y-4">
                  {supportServices.map((service, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.4,
                        delay: shouldReduceMotion ? 0 : index * 0.1,
                      }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-base">{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How to Reach Support Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              How to Reach Support
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <SupportCard
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                content={
                  <a
                    href="mailto:info.katmitra@gmail.com"
                    className="text-gold hover:underline font-medium"
                  >
                    info.katmitra@gmail.com
                  </a>
                }
                link="mailto:info.katmitra@gmail.com"
                index={0}
                shouldReduceMotion={shouldReduceMotion}
              />
              <SupportCard
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                content={
                  <a
                    href="tel:+91 9427077230"
                    className="text-gold hover:underline font-medium"
                  >
                    +91 9427077230
                  </a>
                }
                link="tel:+91 9427077230"
                index={1}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>
          </motion.div>

          {/* Working Hours Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Working Hours
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Monday to Saturday:
                      </span>{" "}
                      9:00 AM – 6:00 PM (IST)
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.4,
                      delay: 0.1,
                    }}
                    className="flex items-center gap-3"
                  >
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Sunday:
                      </span>{" "}
                      Closed
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Note Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gold/20 to-gold/10 rounded-2xl p-8 border border-gold/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/30 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    For faster resolution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Please include your registered email, phone number, and
                    issue details when contacting us.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Support;
