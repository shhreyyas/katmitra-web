import { motion } from "framer-motion";
import { Shield, Sparkles, Star, Zap } from "lucide-react";
import {
  CreativePricing,
  type PricingTier,
} from "@/components/ui/creative-pricing";

const pricingTiers: PricingTier[] = [
  {
    name: "Free Trial",
    icon: <Zap className="w-6 h-6" />,
    price: 0,
    description: "Perfect for trying out KatMitra",
    color: "primary",
    features: [
      "Full feature access for 7 days",
      "Unlimited orders & bookings",
      "Client management system",
      "Menu builder & customization",
      "Invoice generation",
      "Basic analytics dashboard",
      "Email support",
      "No credit card required",
    ],
  },
  {
    name: "Professional",
    icon: <Star className="w-6 h-6" />,
    price: 2999,
    description: "For growing catering businesses",
    color: "primary",
    features: [
      "Everything in Free Trial",
      "Unlimited team members",
      "Advanced analytics & reports",
      "Multi-location support",
      "Custom branding & themes",
      "Priority email support",
      "API access",
      "Advanced inventory management",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: <Sparkles className="w-6 h-6" />,
    price: 7999,
    description: "For large-scale operations",
    color: "primary",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "White-label solution",
      "Advanced security features",
      "24/7 phone & chat support",
      "Custom training & onboarding",
      "SLA guarantee",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 bg-card/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple &{" "}
            <span className="text-gradient-gold">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, no
            surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CreativePricing
            tag="Simple Pricing"
            title="Choose Your Plan"
            description="Start free and scale as you grow"
            tiers={pricingTiers}
          />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-12 text-muted-foreground text-sm"
        >
          <Shield className="w-4 h-4 text-primary" />
          <span>Cancel anytime • No hidden charges • Secure payment</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
