import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";

export default function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 noise opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
            <p className="mt-3 max-w-xl text-white/80">{t("subtitle")}</p>
            <dl className="mt-8 grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">{t("emailLabel")}</dt>
                <dd className="mt-1 text-sm font-medium">hello@youpin.example</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">{t("phoneLabel")}</dt>
                <dd className="mt-1 text-sm font-medium">+86 551 0000 0000</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-white/60">{t("hqLabel")}</dt>
                <dd className="mt-1 text-sm font-medium">{t("hq")}</dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
