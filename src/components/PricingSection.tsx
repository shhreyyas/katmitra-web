import { motion } from "framer-motion";
import { Check, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Full feature access",
  "Unlimited orders",
  "Invoice generation",
  "Client management",
  "Menu builder",
  "Delivery tracking",
  "24/7 support",
  "No credit card required",
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
            Simple & <span className="text-gradient-gold">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl" />

            <div className="relative glass-card-gold rounded-3xl p-8 lg:p-10 border-2 border-primary/50 animate-pulse-glow">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Most Popular
              </div>

              <div className="text-center mb-8 pt-4">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Starter Plan
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="font-display text-5xl font-bold text-gradient-gold">₹0</span>
                  <span className="text-muted-foreground">for first 7 days</span>
                </div>
                <p className="text-primary font-medium">Free Trial</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold py-6 text-lg rounded-xl hover:opacity-90 transition-all duration-300 glow-gold">
                Start Free Trial
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Cancel anytime • No hidden charges</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
