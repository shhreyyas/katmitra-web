import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const clientLogos = [
  "Royal Caterers",
  "Spice Junction",
  "Grand Events",
  "Feast Masters",
  "Golden Leaf",
  "Elite Catering",
];

const ClientsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="clients" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient-gold">Catering Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join hundreds of catering businesses already growing with KatMitra.
          </p>
        </motion.div>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-6 sm:gap-8 w-max">
            {[...clientLogos, ...clientLogos].map((name, index) => (
              <motion.div
                key={`${name}-${index}`}
                className={`flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 rounded-xl min-w-[180px] sm:min-w-[200px] group transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-card/60 backdrop-blur-sm border border-border/30 hover:border-primary/50 hover:bg-card/80"
                    : "bg-card border border-border/40 hover:border-primary/60 hover:shadow-lg"
                }`}
              >
                <span className={`group-hover:text-primary transition-colors font-semibold text-base sm:text-lg ${
                  theme === "dark" ? "text-foreground" : "text-foreground"
                }`}>
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
