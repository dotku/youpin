import { useTranslations } from "next-intl";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-3 max-w-sm text-sm text-ink-900/60">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">{t("footer.company")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-900/60">
            <li><a href="#about" className="hover:text-brand-700">{t("nav.about")}</a></li>
            <li><a href="#products" className="hover:text-brand-700">{t("nav.products")}</a></li>
            <li><a href="#solutions" className="hover:text-brand-700">{t("nav.solutions")}</a></li>
            <li><a href="#contact" className="hover:text-brand-700">{t("nav.contact")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">{t("footer.legal")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-900/60">
            <li><a href="#" className="hover:text-brand-700">{t("footer.privacy")}</a></li>
            <li><a href="#" className="hover:text-brand-700">{t("footer.terms")}</a></li>
            <li><a href="#" className="hover:text-brand-700">{t("footer.cookies")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-900/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink-900/50 sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} UPIN. {t("footer.rights")}</span>
          <span>Made with ❤︎ for global builders.</span>
        </div>
      </div>
    </footer>
  );
}
