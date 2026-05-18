import { useI18n, type Language } from "@/contexts/I18nContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages: Language[] = ["en", "hi", "gu"];

function labelForLang(lang: Language, t: (key: string) => string) {
  if (lang === "en") return t("lang.english");
  if (lang === "hi") return t("lang.hindi");
  return t("lang.gujarati");
}

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <Select
      value={language}
      onValueChange={(v) => setLanguage(v as Language)}
    >
      <SelectTrigger
        aria-label={t("header.selectLanguage")}
        className="h-9 w-[148px] border-border/60 bg-card/70 text-xs font-medium shadow-sm focus:ring-gold/40"
      >
        <SelectValue placeholder={t("header.selectLanguage")} />
      </SelectTrigger>
      <SelectContent align="end" className="z-[100]">
        {languages.map((lang) => (
          <SelectItem key={lang} value={lang} className="text-sm">
            {labelForLang(lang, t)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
