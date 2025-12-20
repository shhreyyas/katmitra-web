import { motion } from "framer-motion";
import { Clock, FileText, Smile, Settings } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Saves Time & Cost",
    description: "Automate repetitive tasks and reduce operational overhead significantly.",
  },
  {
    icon: Settings,
    title: "Easy Order Management",
    description: "Handle multiple orders seamlessly with our intuitive dashboard.",
  },
  {
    icon: FileText,
    title: "Professional Invoicing",
    description: "Generate beautiful invoices and quotations in seconds.",
  },
  {
    icon: Smile,
    title: "Better Customer Experience",
    description: "Delight your clients with smooth communication and delivery.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient-gold">KatMitra</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run a successful catering business, all in one platform.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card-gold rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/60 hover:glow-gold-sm">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
