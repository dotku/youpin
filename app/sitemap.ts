import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.map((locale) => {
    const url = `${SITE_URL}/${locale}`;
    const languages: Record<string, string> = { "x-default": `${SITE_URL}/en` };
    for (const l of routing.locales) languages[l] = `${SITE_URL}/${l}`;

    return {
      url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 1.0 : 0.9,
      alternates: { languages },
    };
  });
}
