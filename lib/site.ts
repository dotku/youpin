export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "UPIN";

export const PROMO_VIDEO_URL =
  process.env.NEXT_PUBLIC_PROMO_VIDEO_URL ?? "/videos/promo.mp4";

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  zh: "zh_CN",
  ru: "ru_RU",
  fr: "fr_FR",
  es: "es_ES",
  ar: "ar_SA",
};
