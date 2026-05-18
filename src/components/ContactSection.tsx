import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/contexts/I18nContext";

const ContactSection = () => {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const content =
    language === "hi"
      ? {
          title: "संपर्क में रहें",
          subtitle:
            "कोई सवाल है? हमें संदेश भेजें, हमें आपकी मदद करके खुशी होगी।",
          name: "नाम",
          email: "ईमेल",
          phone: "फ़ोन",
          message: "संदेश",
          send: "संदेश भेजें",
          sending: "भेजा जा रहा है...",
          namePlaceholder: "आपका नाम",
          messagePlaceholder: "अपने कैटरिंग बिज़नेस के बारे में बताएं...",
          infoTitle: "डिजिटल कैटरिंग के साथ खुशियां पहुंचाएं।",
          infoDesc:
            "हम आपके कैटरिंग बिज़नेस को डिजिटल रूप से मजबूत बनाने में मदद करते हैं।",
        }
      : language === "gu"
        ? {
            title: "સંપર્કમાં રહો",
            subtitle: "પ્રશ્ન છે? અમને મેસેજ કરો, અમે જરૂર મદદ કરીશું.",
            name: "નામ",
            email: "ઈમેલ",
            phone: "ફોન",
            message: "સંદેશ",
            send: "સંદેશ મોકલો",
            sending: "મોકલાઈ રહ્યું છે...",
            namePlaceholder: "તમારું નામ",
            messagePlaceholder: "તમારા કેટરિંગ બિઝનેસ વિશે જણાવો...",
            infoTitle: "ડિજિટલ કેટરિંગ દ્વારા ખુશીઓ પહોંચાડીએ.",
            infoDesc:
              "અમે તમારા કેટરિંગ બિઝનેસને ડિજિટલ રીતે મજબૂત બનાવવા અહીં છીએ.",
          }
        : {
            title: "Get in Touch",
            subtitle:
              "Have questions? We'd love to hear from you. Send us a message.",
            name: "Name",
            email: "Email",
            phone: "Phone",
            message: "Message",
            send: "Send Message",
            sending: "Sending...",
            namePlaceholder: "Your name",
            messagePlaceholder: "Tell us about your catering business...",
            infoTitle: "Delivers happiness through digital Catering.",
            infoDesc:
              "We're here to help you transform your catering business with powerful digital tools.",
          };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`${apiBaseUrl}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          customer_name: formData.name,
          phone: formData.phone,
          description: formData.message,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit inquiry");
      }

      toast.success(
        result?.message || "Thank you! Your inquiry has been submitted.",
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit inquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-card/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {content.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card-gold rounded-2xl p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {content.name}
                  </label>
                  <Input
                    type="text"
                    placeholder={content.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {content.email}
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {content.phone}
                </label>
                <div className="flex items-center rounded-md border border-border/50 bg-background/50 focus-within:border-primary">
                  <span className="px-3 text-sm text-muted-foreground border-r border-border/50">
                    +91
                  </span>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {content.message}
                </label>
                <Textarea
                  placeholder={content.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-background/50 border-border/50 focus:border-primary min-h-[120px]"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-gold text-accent-foreground font-semibold py-6 text-lg rounded-xl hover:opacity-90 transition-all duration-300 glow-gold-sm group"
              >
                {isSubmitting ? content.sending : content.send}
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {content.infoTitle}
                </h3>
                <p className="text-muted-foreground">{content.infoDesc}</p>
              </div>

              <div className="space-y-6">
                {/* <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground text-sm">
                        353, Maruti Plaza, Vijay Park Society,<br />
                        Krishnanagar, Ahmedabad, Gujarat 382345
                      </p>
                    </div>
                  </div> */}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {content.phone}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      +91 9427077230
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {content.email}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      katmitra.official@gmail.com
                      <br />
                      info.katmitra@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
