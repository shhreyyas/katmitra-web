import { motion, useReducedMotion } from "framer-motion";
import { FileLock, Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Account and profile data such as your name, email address, phone number, password, and business details when you sign up or update your profile in the mobile app.",
      "Operational data such as bookings, quotations, menu items, customer details, and support requests that you create while using Katmitra.",
      "Contact form data from the website, including your name, email, phone number, and message.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To create and manage your account, authenticate users, and provide core catering management features.",
      "To respond to support requests, improve service quality, and maintain platform security.",
    ],
  },
  {
    title: "3. Device Permissions and Notifications (Mobile App)",
    content: [
      "The mobile app may request access to notifications, camera, photo library, and related device capabilities to support app features such as alerts and image uploads.",
      "If notifications are enabled, device/app notification tokens may be used to deliver service messages.",
    ],
  },
  {
    title: "4. Storage and Security",
    content: [
      "We use industry-standard safeguards to protect data in transit and at rest. No method of transmission or storage is completely risk-free.",
      "Some app preferences and session-related data are stored locally on your device to keep you signed in and preserve your experience.",
    ],
  },
  {
    title: "5. Data Sharing",
    content: [
      "We do not sell your personal information.",
      "We may share data with service providers and infrastructure partners only as needed to operate Katmitra, or when required by law.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain data for as long as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements.",
      "Retention periods may vary based on the type of information and legal requirements.",
    ],
  },
  {
    title: "7. Your Choices",
    content: [
      "You can update account and business information from within the app where available.",
      "You may contact us to request account-related help, including privacy questions.",
    ],
  },
  {
    title: "8. Updates to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date.",
    ],
  },
];

const PrivacyPolicy = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative pt-20 pb-20 min-h-screen">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <FileLock className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              This Privacy Policy explains how Katmitra collects, uses, and protects information
              when you use our website and mobile application.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Effective date: 23 April 2026</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-5">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.04,
                }}
                className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.content.map((item) => (
                    <li key={item} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="max-w-3xl mx-auto mt-14"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a href="mailto:info.katmitra@gmail.com" className="text-primary hover:underline text-sm">
                  info.katmitra@gmail.com
                </a>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                <a href="tel:+919265758484" className="text-primary hover:underline text-sm">
                  +91 9265758484
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
