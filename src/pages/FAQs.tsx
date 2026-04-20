import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "Is Katmitra only for catering owners?",
    answer:
      "Yes, Katmitra is specially designed for catering business owners to manage orders, events, staff, and operations.",
  },
  {
    question: "Do I need technical knowledge to use this app?",
    answer:
      "No, Katmitra is built to be simple and easy to use. Anyone can start managing their catering business within minutes.",
  },
  {
    question: "How does payment tracking work?",
    answer:
      "You can manually record every payment entry. Even partial payments like INR 200, INR 500 can be tracked with date and details.",
  },
  {
    question: "Is online payment required?",
    answer:
      "No, all payments are handled offline between you and your customer. Katmitra helps you track and manage them.",
  },
  {
    question: "Can I generate invoices?",
    answer:
      "Yes, you can generate professional invoices based on selected menu and completed events.",
  },
  {
    question: "How does the grocery list feature work?",
    answer:
      "Based on the selected menu, Katmitra automatically generates a complete shopping list for your event.",
  },
  {
    question: "Is the app free to use?",
    answer:
      "Yes, currently Katmitra is completely free to use until 2027.",
  },
  {
    question: "Will my data be safe?",
    answer:
      "Yes, your data is securely stored and accessible only to you.",
  },
  {
    question: "Can I manage multiple events at once?",
    answer:
      "Yes, you can manage multiple past and upcoming events using the calendar view.",
  },
  {
    question: "Do I need a laptop or can I use mobile?",
    answer:
      "You can use Katmitra on your mobile device (Android & iOS) to manage your business anytime, anywhere.",
  },
];

const FAQItem = ({
  question,
  answer,
  index,
  shouldReduceMotion,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  index: number;
  shouldReduceMotion: boolean;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
              Everything you need to know before getting started.
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
                defaultOpen={index === 0}
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

