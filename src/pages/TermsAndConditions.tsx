import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  CreditCard,
  Lock,
  Headphones,
  User,
  Server,
  Ban,
  RefreshCw
} from "lucide-react";
import Footer from "@/components/Footer";

const terms = [
  {
    number: 1,
    title: "Use of Platform",
    icon: <Shield className="w-6 h-6" />,
    content: [
      "The platform must be used only for legal catering business operations.",
      "Users must not misuse or attempt unauthorized access to KatMitra services.",
    ],
  },
  {
    number: 2,
    title: "Subscription & Payments",
    icon: <CreditCard className="w-6 h-6" />,
    content: [
      "Plans can be upgraded, downgraded, or canceled anytime.",
      "All payments are non-refundable unless stated under a special agreement (Enterprise SLA).",
      "There are no hidden charges.",
    ],
  },
  {
    number: 3,
    title: "Data Protection",
    icon: <Lock className="w-6 h-6" />,
    content: [
      "User data is securely stored and encrypted.",
      "KatMitra is not responsible for data loss caused by user negligence.",
    ],
  },
  {
    number: 4,
    title: "Support Services",
    icon: <Headphones className="w-6 h-6" />,
    content: [
      "Support is provided based on your active subscription plan.",
      "Enterprise users receive dedicated assistance and SLA-based support.",
    ],
  },
  {
    number: 5,
    title: "Account Responsibility",
    icon: <User className="w-6 h-6" />,
    content: [
      "You are responsible for keeping your login credentials confidential.",
      "Sharing accounts across unauthorized users may lead to termination.",
    ],
  },
  {
    number: 6,
    title: "Service Availability",
    icon: <Server className="w-6 h-6" />,
    content: [
      "KatMitra strives for 99.9% uptime but does not guarantee uninterrupted service in cases of maintenance, updates, or technical failures.",
    ],
  },
  {
    number: 7,
    title: "Termination of Service",
    icon: <Ban className="w-6 h-6" />,
    content: [
      "KatMitra reserves the right to suspend or terminate accounts if users violate the terms.",
    ],
  },
  {
    number: 8,
    title: "Updates to Terms",
    icon: <RefreshCw className="w-6 h-6" />,
    content: [
      "These terms may be updated periodically. Continued use means acceptance of revised terms.",
    ],
  },
];

const TermCard = ({
  term,
  index,
  shouldReduceMotion,
}: {
  term: typeof terms[0];
  index: number;
  shouldReduceMotion: boolean;
}) => {
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
      className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
          {term.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary/30 text-primary font-bold text-sm flex items-center justify-center">
              {term.number}
            </span>
            <h3 className="text-xl font-semibold text-foreground">{term.title}</h3>
          </div>
          <ul className="space-y-2 ml-11">
            {term.content.map((item, idx) => (
              <li key={idx} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
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
                <FileText className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-muted-foreground text-lg sm:text-xl mb-4">
                Welcome to KatMitra
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using KatMitra, you agree to comply with the following terms. Please read them carefully.
              </p>
            </motion.div>
          </motion.div>

          {/* Terms List */}
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            {terms.map((term, index) => (
              <TermCard
                key={index}
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
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Contact for Policy Queries
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.4 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:sales@myjucas.com"
                  className="text-primary hover:underline text-sm"
                >
                  sales@myjucas.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.5 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+919327301738"
                  className="text-primary hover:underline text-sm"
                >
                  +91 93273 01738
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.6 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Address</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  353, Maruti Plaza, Vijay Park Society, Krishnanagar, Ahmedabad, Gujarat 382345
                </p>
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

