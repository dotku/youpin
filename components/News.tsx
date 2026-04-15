import Image from "next/image";
import { useTranslations } from "next-intl";

const items = [
  { key: "n1", src: "/images/products/crystal-blue.png" },
  { key: "n2", src: "/images/products/crystal-yellow.png" },
  { key: "n3", src: "/images/products/crystal-pink-ring.png" },
] as const;

export default function News() {
  const t = useTranslations("news");
  return (
    <section id="news" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-ink-900/60">{t("subtitle")}</p>
          </div>
          <a href="#contact" className="text-sm font-semibold text-brand-700 hover:text-brand-600">
            {t("viewAll")} →
          </a>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map(({ key, src }) => (
            <article
              key={key}
              className="group overflow-hidden rounded-2xl border border-ink-900/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                <Image
                  src={src}
                  alt={t(`items.${key}.title`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="text-xs font-medium uppercase tracking-wide text-brand-700">
                  {t(`items.${key}.date`)}
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                  {t(`items.${key}.title`)}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
