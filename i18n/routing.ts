import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "ru", "fr", "es", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ru: "Русский",
  fr: "Français",
  es: "Español",
  ar: "العربية",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  zh: "🇨🇳",
  ru: "🇷🇺",
  fr: "🇫🇷",
  es: "🇪🇸",
  ar: "🇸🇦",
};

export const rtlLocales: Locale[] = ["ar"];
