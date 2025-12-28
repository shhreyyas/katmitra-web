import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "What is KatMitra?",
    answer:
      "KatMitra is an all-in-one catering management platform that helps caterers manage orders, clients, menus, invoices, staff, and event schedules from one dashboard.",
  },
  {
    question: "Do I need a credit card for the free trial?",
    answer:
      "No, the 7-day free trial does not require any credit card. You get full access to all features during the trial period.",
  },
  {
    question: "Can I manage multiple events at the same time?",
    answer:
      "Yes, KatMitra allows you to handle unlimited orders and event bookings, making it easy to manage multiple events simultaneously.",
  },
  {
    question: "Can I add my team members to the platform?",
    answer:
      "Yes! The Professional and Enterprise plans support unlimited team members with collaboration features.",
  },
  {
    question: "Does KatMitra support multiple business locations?",
    answer:
      "Yes, the Professional plan includes multi-location support, and Enterprise plan offers custom integrations for large-scale operations.",
  },
  {
    question: "Can I create and customize my catering menu?",
    answer:
      "Absolutely! Our Menu Builder lets you create, edit, and customize menus with flexible pricing and client-based customization.",
  },
  {
    question: "How can I generate invoices and quotations?",
    answer:
      "You can generate professional invoices and proposals in seconds using the built-in Invoice & Quotation Generator.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "KatMitra supports multiple secure digital payment options depending on your subscription plan.",
  },
  {
    question: "Is my business data safe?",
    answer:
      "Yes, we use advanced security and encrypted data protection to keep your business and client information secure.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel anytime. There are no hidden charges or lock-in periods.",
  },
  {
    question: "What kind of support will I receive?",
    answer:
      "Free Plan: Email support\nProfessional: Priority email support\nEnterprise: 24/7 phone & chat + dedicated manager",
  },
  {
    question: "Does KatMitra offer training for new users?",
    answer:
      "Yes, the Enterprise plan includes custom onboarding, training, and dedicated support assistance.",
  },
];

const FAQItem = ({
  question,
  answer,
  index,
  shouldReduceMotion,
}: {
  question: string;
  answer: string;
  index: number;
  shouldReduceMotion: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      className="border border-primary/20 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-card/80 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground pr-4">
            {question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 pt-0">
          <div className="pl-14 text-muted-foreground leading-relaxed whitespace-pre-line">
            {answer}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQs = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative pt-20 pb-20 min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
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
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <HelpCircle className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked
              <span className="text-gradient-gold block">Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
              Find answers to common questions about KatMitra and how it can help streamline your catering business.
            </p>
          </motion.div>

          {/* FAQs List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-8 border border-primary/30">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Please contact our friendly team.
              </p>
              <motion.a
                href="/contact"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/30"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQs;

