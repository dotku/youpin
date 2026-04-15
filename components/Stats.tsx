import { useTranslations } from "next-intl";

const stats = [
  { key: "clients", value: "3,000+" },
  { key: "countries", value: "60+" },
  { key: "patents", value: "30+" },
  { key: "years", value: "15+" },
] as const;

export default function Stats() {
  const t = useTranslations("stats");
  return (
    <section className="border-y border-ink-900/5 bg-gradient-to-b from-white to-brand-50/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.key} className="text-center sm:text-start">
            <div className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-ink-900/60">{t(s.key)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
