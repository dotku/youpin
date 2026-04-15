import { useTranslations } from "next-intl";

const items = ["semi", "aero", "medical", "luxury"] as const;

const icons: Record<(typeof items)[number], string> = {
  semi: "M4 7h16M4 12h16M4 17h16",
  aero: "M2 12l20-8-8 20-2-9-10-3z",
  medical: "M12 5v14M5 12h14",
  luxury: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z",
};

export default function Solutions() {
  const t = useTranslations("solutions");
  return (
    <section id="solutions" className="bg-ink-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <p className="mt-2 text-white/60">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((key) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-brand-400/50 hover:bg-white/10"
            >
              <div className="absolute -end-8 -top-8 h-28 w-28 rounded-full bg-brand-500/20 blur-2xl transition group-hover:bg-brand-400/30" aria-hidden />
              <div className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                    <path d={icons[key]} />
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-semibold">{t(`items.${key}.title`)}</h3>
                <p className="mt-1.5 text-sm text-white/60">{t(`items.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
