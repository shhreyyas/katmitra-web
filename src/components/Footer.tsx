import { Mail, MessageCircle, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import mainLogo from "@/assets/main-logo.jpg";
import { useI18n } from "@/contexts/I18nContext";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-background text-foreground mt-16 border-t border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-14 lg:py-16">
        <div className="rounded-2xl border border-border bg-card px-6 py-6 sm:px-8 sm:py-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {t("footer.ctaTitle")}
            </h3>
            <p className="text-muted-foreground">
              {t("footer.ctaDesc")}
            </p>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-95 transition-all"
          >
            {t("footer.startFreeNow")}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={mainLogo} alt={t("footer.logoAlt")} className="w-11 h-11 object-contain" />
              <span className="font-display text-2xl font-bold text-foreground">Katmitra</span>
            </div>
            <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
              {t("footer.brandDescription")}
            </p>
            <p className="text-sm text-muted-foreground">{t("footer.builtForOwners")}</p>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">{t("footer.colProduct")}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-gold transition-colors">{t("header.features")}</Link></li>
              <li><Link to="/pricing" className="hover:text-gold transition-colors">{t("header.pricing")}</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gold transition-colors">{t("header.howItWorks")}</Link></li>
              <li><Link to="/faqs" className="hover:text-gold transition-colors">{t("footer.faq")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">{t("footer.colCompany")}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/home" className="hover:text-gold transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t("header.contact")}</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gold transition-colors">{t("footer.privacyPolicy")}</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-gold transition-colors">{t("footer.termsAndConditions")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">{t("footer.colSupport")}</h4>
            <ul className="space-y-2.5 text-sm mb-5 text-muted-foreground">
              <li><Link to="/support" className="hover:text-gold transition-colors">{t("footer.helpSupport")}</Link></li>
              <li>
                <a href="mailto:info.katmitra@gmail.com" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info.katmitra@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/919265758484"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.ariaWhatsApp")}
                className="hover:text-gold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/katmitra.official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.ariaInstagram")}
                className="hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" aria-label="YouTube" className="hover:text-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-gold transition-colors">
              {t("footer.termsShort")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
