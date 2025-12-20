import { motion } from "framer-motion";
import {
  CalendarCheck,
  UtensilsCrossed,
  Users,
  CreditCard,
  Truck,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Order & Event Management",
    description: "Track all your catering orders and events with an intuitive calendar view.",
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Builder & Price Control",
    description: "Create and manage menus with flexible pricing and customization options.",
  },
  {
    icon: Users,
    title: "CRM for Client Management",
    description: "Keep track of all your clients, their preferences, and order history.",
  },
  {
    icon: CreditCard,
    title: "Payment & Invoice System",
    description: "Generate invoices and accept payments seamlessly with multiple options.",
  },
  {
    icon: Truck,
    title: "Delivery & Logistics Planning",
    description: "Plan and optimize delivery routes for efficient service.",
  },
  {
    icon: FileText,
    title: "Quotation & Proposal Generator",
    description: "Create professional quotations and proposals in minutes.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 bg-card/30 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Powerful Features <span className="text-gradient-gold">Built for Caterers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage your catering business efficiently and professionally.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 h-full border border-border/30 transition-all duration-500 hover:border-primary/50 hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-primary/30 glow-gold-sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
