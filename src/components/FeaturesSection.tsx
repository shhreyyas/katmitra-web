import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Wallet,
  MenuSquare,
  ShoppingCart,
  Package,
  Users,
  Calculator,
  FileText,
  ClipboardList,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Tilt3D } from "@/components/motion/tilt-3d";
import {
  revealViewport,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion";

const features = [
  {
    icon: Calendar,
    title: "Event & Order Management",
    description:
      "Create and manage all your catering events with date, time, and location. Track past and upcoming bookings easily.",
  },
  {
    icon: Wallet,
    title: "Smart Payment Tracking",
    description:
      "Track partial payments effortlessly. Record every payment entry and always know how much is pending.",
  },
  {
    icon: MenuSquare,
    title: "Menu Management",
    description:
      "Create and manage your catering menus. Show menu options to customers with full item details.",
  },
  {
    icon: ShoppingCart,
    title: "Auto Grocery List",
    description:
      "Automatically generate shopping lists based on selected menu items. Never miss any ingredient.",
  },
  {
    icon: Package,
    title: "Utensil (Vasan) Management",
    description:
      "Track utensils used in each event. Know what is available, in use, or damaged.",
  },
  {
    icon: Users,
    title: "Staff Management",
    description:
      "Assign staff to events and manage your workforce efficiently across multiple functions.",
  },
  {
    icon: Calculator,
    title: "Instant Estimation",
    description:
      "Generate quick cost estimates based on menu selection. Help customers decide faster.",
  },
  {
    icon: FileText,
    title: "Invoice Generation",
    description:
      "Generate professional invoices automatically after completing events.",
  },
  {
    icon: ClipboardList,
    title: "Calendar Overview",
    description:
      "Get a complete view of all your events in one calendar. Never miss a booking.",
  },
];

const FeaturesSection = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="relative py-28 sm:py-32 lg:py-40 bg-card/40 overflow-hidden border-y border-border/40"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Everything You Need to Run Your Catering Business
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            From order booking to final invoice — manage every part of your catering operations in one place.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 [perspective:1100px]"
          variants={staggerContainerVariants(reduce, 0.1, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItemVariants(reduce, { y: 40 })}
              className="group relative [transform-style:preserve-3d]"
            >
              <Tilt3D className="h-full" maxTilt={8}>
              <div className="rounded-2xl p-8 h-full border border-[#E5E7EB] dark:border-border bg-white dark:bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg relative overflow-hidden [transform-style:preserve-3d]">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 [transform-style:preserve-3d]"
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          rotateY: 12,
                          rotateX: -6,
                          scale: 1.06,
                          transition: { type: "spring", stiffness: 300, damping: 18 },
                        }
                  }
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-primary/30" />
                </div>
              </div>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
