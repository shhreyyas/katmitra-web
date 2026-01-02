import { Button } from "@/components/ui/button";
import { Check, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

function CreativePricing({
  tag = "Simple Pricing",
  title = "Choose Your Plan",
  description = "Start free and scale as you grow",
  tiers,
}: {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
}) {
  const { theme } = useTheme();
  
  // Theme-aware shadow colors
  const shadowColorLight = theme === "dark" 
    ? "hsl(43, 96%, 56%, 0.5)" // Gold for dark mode
    : "hsl(180, 70%, 40%, 0.5)"; // Teal/cyan for light mode
  const shadowColorMedium = theme === "dark" 
    ? "hsl(43, 96%, 56%, 0.3)" // Gold for dark mode
    : "hsl(180, 70%, 40%, 0.3)"; // Teal/cyan for light mode
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center space-y-6 mb-16">
        <div className="font-display text-lg text-primary rotate-[-1deg]">
          {tag}
        </div>
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground rotate-[-1deg]">
            {title}
            <div className="absolute -right-12 top-0 text-primary rotate-12">
              ✨
            </div>
            <div className="absolute -left-8 bottom-0 text-primary -rotate-12">
              ⭐️
            </div>
          </h2>
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-primary/20 
            rotate-[-1deg] rounded-full blur-sm"
          />
        </div>
        <p className="font-display text-xl text-muted-foreground rotate-[-1deg]">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "relative group",
              "transition-all duration-300",
              index === 0 && "rotate-[-1deg]",
              index === 1 && "rotate-[1deg]",
              index === 2 && "rotate-[-2deg]"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 bg-card",
                "border-2 border-primary/50",
                "rounded-lg shadow-[4px_4px_0px_0px] shadow-primary/30",
                "transition-all duration-300",
                "group-hover:shadow-[8px_8px_0px_0px] group-hover:shadow-primary/50",
                "group-hover:translate-x-[-4px]",
                "group-hover:translate-y-[-4px]",
                tier.popular && "border-primary shadow-primary/40"
              )}
            />

            <div className="relative p-6">
              {tier.popular && (
                <div
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground 
                  font-display px-3 py-1 rounded-full rotate-12 text-sm border-2 border-primary-foreground/20"
                  style={{
                    boxShadow: `0 0 20px ${shadowColorLight}`,
                  }}
                >
                  Popular!
                </div>
              )}

              <div className="mb-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full mb-4",
                    "flex items-center justify-center",
                    "border-2 border-primary/50",
                    "bg-primary/10",
                    "text-primary"
                  )}
                  style={{
                    boxShadow: `0 0 15px ${shadowColorMedium}`,
                  }}
                >
                  {tier.icon}
                </div>
                <h3 className="font-display text-2xl text-foreground font-bold">
                  {tier.name}
                </h3>
                <p className="font-display text-muted-foreground text-sm mt-1">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 font-display">
                <span className="text-4xl font-bold text-foreground">
                  {tier.price === 0 ? (
                    <>
                      <span className="text-primary">Free</span>
                    </>
                  ) : (
                    <>₹{tier.price}</>
                  )}
                </span>
                {tier.price === 0 ? (
                  <span className="text-muted-foreground block text-sm mt-1">
                    for 7 days
                  </span>
                ) : (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-primary/50 
                      bg-primary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-display text-sm text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* <Button
                className={cn(
                  "w-full h-12 font-display text-base relative",
                  "border-2 border-primary/50",
                  "transition-all duration-300",
                  "shadow-[4px_4px_0px_0px] shadow-primary/30",
                  "hover:shadow-[6px_6px_0px_0px] hover:shadow-primary/50",
                  "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                  tier.popular
                    ? [
                        "bg-primary text-primary-foreground",
                        "hover:bg-primary/90",
                        "border-primary",
                        "shadow-primary/40",
                        "hover:shadow-primary/60",
                      ]
                    : [
                        "bg-card text-foreground",
                        "hover:bg-card/80",
                        "hover:border-primary/70",
                      ]
                )}
                style={
                  tier.popular
                    ? {
                        boxShadow:
                          "4px 4px 0px 0px hsl(43, 96%, 56%, 0.4), 0 0 20px hsl(43, 96%, 56%, 0.3)",
                      }
                    : undefined
                }
              >
                {tier.price === 0 ? "Start Free Trial" : "Get Started"}
              </Button> */}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 text-4xl rotate-12 text-primary/10">
          ✎
        </div>
        <div className="absolute bottom-40 right-20 text-4xl -rotate-12 text-primary/10">
          ✏️
        </div>
      </div>
    </div>
  );
}

export { CreativePricing, type PricingTier };
