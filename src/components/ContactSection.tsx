import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  User,
  Building,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/contexts/I18nContext";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    address: "",
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
          businessName: "कैटरिंग बिज़नेस का नाम",
          businessNamePlaceholder: "उदा. रॉयल कैटरर्स",
          emailOptional: "ईमेल (वैकल्पिक)",
          emailPlaceholder: "your@email.com",
          addressOptional: "बिज़नेस का पता (वैकल्पिक)",
          addressPlaceholder: "आपका बिज़नेस कहां स्थित है...",
          messageOptional: "संदेश (वैकल्पिक)",
          messagePlaceholder: "कोई अन्य जानकारी जो आप साझा करना चाहते हैं...",
          infoTitle: "डिजिटल कैटरिंग के साथ खुशियां पहुंचाएं।",
          infoDesc:
            "हम आपके कैटरिंग बिज़नेस को डिजिटल रूप से मजबूत बनाने में मदद करते हैं।",
          addressLabel: "पता",
          addressVal:
            "353, मारुति प्लाजा, विजय पार्क सोसाइटी, कृष्णनगर, अहमदाबाद, गुजरात 382345",
          viewOnMaps: "गूगल मैप्स पर देखें",
          whatsappTitle: "व्हाट्सएप सपोर्ट",
          whatsappDesc:
            "कोई त्वरित सवाल है? तुरंत सहायता के लिए व्हाट्सएप पर मैसेज करें।",
          chatOnWhatsapp: "व्हाट्सएप पर चैट करें",
          faqTitle: "त्वरित उत्तर चाहिए?",
          faqDesc:
            "कटमित्र के सेटअप और उपयोग के बारे में सामान्य प्रश्नों के उत्तर जानने के लिए हमारे FAQ पेज पर जाएं।",
          goToFaqs: "अक्सर पूछे जाने वाले प्रश्न देखें",
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
            businessName: "કેટરિંગ બિઝનેસનું નામ",
            businessNamePlaceholder: "દા.ત. રોયલ કેટરર્સ",
            emailOptional: "ઈમેલ (વૈકલ્પિક)",
            emailPlaceholder: "your@email.com",
            addressOptional: "બિઝનેસ સરનામું (વૈકલ્પિક)",
            addressPlaceholder: "તમારો બિઝનેસ ક્યાં આવેલો છે...",
            messageOptional: "સંદેશ (વૈકલ્પિક)",
            messagePlaceholder: "કોઈ અન્ય વિગતો જે તમે શેર કરવા માંગો છો...",
            infoTitle: "ડિજિટલ કેટરિંગ દ્વારા ખુશીઓ પહોંચાડીએ.",
            infoDesc:
              "અમે તમારા કેટરિંગ બિઝનેસને ડિજિટલ રીતે મજબૂત બનાવવા અહીં છીએ.",
            addressLabel: "સરનામું",
            addressVal:
              "353, મારુતિ પ્લાઝા, વિજય પાર્ક સોસાયટી, કૃષ્ણનગર, અમદાવાદ, ગુજરાતી 382345",
            viewOnMaps: "ગૂગલ મેપ્સ પર જુઓ",
            whatsappTitle: "વોટ્સએપ સપોર્ટ",
            whatsappDesc: "ઝડપી પ્રશ્ન છે? ત્વરિત મદદ માટે વોટ્સએપ પર મેસેજ કરો.",
            chatOnWhatsapp: "વોટ્સએપ પર ચેટ કરો",
            faqTitle: "ઝડપી જવાબો જોઈએ છે?",
            faqDesc:
              "કટમિત્રના સેટઅપ અને ઉપયોગ વિશેના સામાન્ય પ્રશ્નોના જવાબો માટે અમારું FAQ પેજ જુઓ.",
            goToFaqs: "અવારનવાર પૂછાતા પ્રશ્નો જુઓ",
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
            businessName: "Catering Business Name",
            businessNamePlaceholder: "e.g. Royal Caterers",
            emailOptional: "Email (optional)",
            emailPlaceholder: "your@email.com",
            addressOptional: "Business Address (optional)",
            addressPlaceholder: "Where is your business located...",
            messageOptional: "Message (optional)",
            messagePlaceholder: "Any other details you want to share...",
            infoTitle: "Delivers happiness through digital Catering.",
            infoDesc:
              "We're here to help you transform your catering business with powerful digital tools.",
            addressLabel: "Address",
            addressVal:
              "353, Maruti Plaza, Vijay Park Society, Krishnanagar, Ahmedabad, Gujarat 382345",
            viewOnMaps: "View on Google Maps",
            whatsappTitle: "WhatsApp Support",
            whatsappDesc:
              "Have a quick question? Message us on WhatsApp for instant assistance.",
            chatOnWhatsapp: "Chat on WhatsApp",
            faqTitle: "Looking for quick answers?",
            faqDesc:
              "Check out our FAQ page to find answers to common questions about setting up and using Katmitra.",
            goToFaqs: "Go to FAQs",
          };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`${apiBaseUrl}/v1/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          business_name: formData.businessName,
          address: formData.address || undefined,
          description: formData.message || undefined,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit inquiry");
      }

      toast.success(
        result?.message || "Thank you! Your inquiry has been submitted.",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        address: "",
        message: "",
      });
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

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

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

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card-gold rounded-2xl p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    {content.name} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={content.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary py-5 px-4 rounded-xl"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    {content.phone} <span className="text-destructive">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-border/50 bg-background/50 focus-within:border-primary overflow-hidden">
                    <span className="px-4 py-3 text-sm font-medium text-muted-foreground border-r border-border/50 bg-muted/20">
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
                      className="border-0 bg-transparent py-5 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                {/* Catering Business Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4 text-gold" />
                    {content.businessName}{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={content.businessNamePlaceholder}
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessName: e.target.value,
                      })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary py-5 px-4 rounded-xl"
                    required
                  />
                </div>

                {/* Email (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold" />
                    {content.emailOptional}
                  </label>
                  <Input
                    type="email"
                    placeholder={content.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary py-5 px-4 rounded-xl"
                  />
                </div>

                {/* Address (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    {content.addressOptional}
                  </label>
                  <Textarea
                    placeholder={content.addressPlaceholder}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary min-h-[90px] p-4 rounded-xl"
                  />
                </div>

                {/* Message (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gold" />
                    {content.messageOptional}
                  </label>
                  <Textarea
                    placeholder={content.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-primary min-h-[110px] p-4 rounded-xl"
                  />
                </div>
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

          {/* Contact Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {content.infoTitle}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {content.infoDesc}
              </p>
            </div>

            <div className="space-y-6">
              {/* Address card */}
              <div className="bg-card/40 border border-border/50 rounded-2xl p-5 hover:border-gold/30 transition-all duration-300 hover:shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {content.addressLabel}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {content.addressVal}
                  </p>
                  <a
                    href="https://maps.google.com/?q=353,+Maruti+Plaza,+Vijay+Park+Society,+Krishnanagar,+Ahmedabad,+Gujarat+382345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-gold hover:underline group/link"
                  >
                    {content.viewOnMaps}
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Phone & Email contacts */}
              <div className="bg-card/40 border border-border/50 rounded-2xl p-5 hover:border-gold/30 transition-all duration-300 hover:shadow-md space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground text-sm mb-0.5">
                      {content.phone}
                    </h5>
                    <a
                      href="tel:+919427077230"
                      className="text-muted-foreground text-sm hover:text-gold transition-colors"
                    >
                      +91 9427077230
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-2 border-t border-border/30">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground text-sm mb-0.5">
                      {content.email}
                    </h5>
                    <div className="flex flex-col text-sm">
                      <a
                        href="mailto:katmitra.official@gmail.com"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        katmitra.official@gmail.com
                      </a>
                      <a
                        href="mailto:info.katmitra@gmail.com"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        info.katmitra@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp instant support card */}
              <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-5 hover:border-[#25D366]/40 transition-all duration-300 hover:shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    {content.whatsappTitle}
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {content.whatsappDesc}
                  </p>
                  <a
                    href="https://wa.me/919427077230"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#25D366] text-white font-semibold text-xs py-2.5 px-4 rounded-xl hover:bg-[#20ba5a] transition-all shadow-sm gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {content.chatOnWhatsapp}
                  </a>
                </div>
              </div>

              {/* Quick FAQs redirect card */}
              <div className="bg-card/40 border border-border/50 rounded-2xl p-5 hover:border-gold/30 transition-all duration-300 hover:shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {content.faqTitle}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {content.faqDesc}
                  </p>
                  <Link
                    to="/faqs"
                    className="inline-flex items-center text-xs font-semibold text-gold hover:underline group/link"
                  >
                    {content.goToFaqs}
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
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
