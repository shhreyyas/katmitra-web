import { Languages } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

/** The languages the app is offered in, each written in its own script. */
const APP_LANGUAGES = [
  { code: "gu", name: "ગુજરાતી" },
  { code: "hi", name: "हिन्दी" },
  { code: "en", name: "English" },
];

/** A band under the hero telling caterers the app works in their language. */
const LanguageStrip = () => {
  const { t } = useI18n();

  return (
    <section aria-label={t("languages.label")} className="border-y border-border/40 bg-card/40 py-8">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 lg:px-8">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          <Languages className="h-4 w-4" aria-hidden />
          {t("languages.label")}
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {APP_LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              lang={lang.code}
              className="rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-sm font-medium"
            >
              {lang.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LanguageStrip;
