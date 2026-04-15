"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const sections = ["home", "products", "solutions", "news", "about", "contact"] as const;

const sectionAnchors: Record<(typeof sections)[number], string> = {
  home: "#top",
  products: "#products",
  solutions: "#solutions",
  news: "#news",
  about: "#about",
  contact: "#contact",
};

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? "bg-ink-950/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo variant="dark" />

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 backdrop-blur md:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={sectionAnchors[s]}
              className="rounded-full px-3 py-1.5 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {t(s)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink-900 shadow hover:bg-brand-50"
          >
            {t("getInTouch")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white md:hidden"
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur md:hidden">
          <div className="space-y-1 px-4 py-3">
            {sections.map((s) => (
              <a
                key={s}
                href={sectionAnchors[s]}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10"
              >
                {t(s)}
              </a>
            ))}
            <div className="pt-2">
              <LanguageSwitcher variant="mobile" />
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-brand-500 px-3 py-2 text-center font-semibold text-white"
            >
              {t("getInTouch")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
