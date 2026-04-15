import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { rtlLocales, type Locale } from "@/i18n/routing";
import "./globals.css";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
