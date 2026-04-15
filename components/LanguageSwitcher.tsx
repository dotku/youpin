"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  routing,
  localeLabels,
  localeFlags,
  type Locale,
} from "@/i18n/routing";

export default function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "mobile" }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  function switchTo(next: Locale) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        className={
          variant === "header"
            ? "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90 backdrop-blur hover:bg-white/10"
            : "inline-flex w-full items-center justify-between gap-2 rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-sm text-ink-900"
        }
      >
        <span aria-hidden>{localeFlags[locale]}</span>
        <span>{localeLabels[locale]}</span>
        <svg
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-xl"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-900 hover:bg-brand-50 ${
                  l === locale ? "bg-brand-50/60 font-semibold" : ""
                }`}
              >
                <span aria-hidden>{localeFlags[l]}</span>
                <span>{localeLabels[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
