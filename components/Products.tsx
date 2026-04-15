"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ImageGallery from "./ImageGallery";
import type { LightboxImage } from "./Lightbox";

const items = ["substrate", "heatsink", "optics", "crystal"] as const;

const media: Record<(typeof items)[number], { src: string; bg: string }> = {
  substrate: { src: "/images/products/substrate-seeds.jpg", bg: "bg-slate-100" },
  heatsink: { src: "/images/products/heatsink.png", bg: "bg-neutral-200" },
  optics: { src: "/images/products/optics-window.png", bg: "bg-slate-200" },
  crystal: { src: "/images/products/crystal-white.png", bg: "bg-ink-950" },
};

export default function Products() {
  const t = useTranslations("products");

  const images: LightboxImage[] = items.map((key) => ({
    src: media[key].src,
    alt: t(`items.${key}.title`),
    caption: t(`items.${key}.title`),
  }));

  return (
    <section id="products" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-xl text-ink-900/60">{t("subtitle")}</p>
          </div>
          <a
            href="#contact"
            className="text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            {t("viewAll")} →
          </a>
        </div>

        <ImageGallery images={images}>
          {(open) => (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((key, i) => (
                <article
                  key={key}
                  className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => open(i)}
                    aria-label={`Zoom ${t(`items.${key}.title`)}`}
                    className={`relative block aspect-[4/3] w-full overflow-hidden ${media[key].bg}`}
                  >
                    <Image
                      src={media[key].src}
                      alt={t(`items.${key}.title`)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span
                      className="pointer-events-none absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-900 opacity-0 shadow transition group-hover:opacity-100"
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="6" />
                        <path d="M20 20l-4-4M11 8v6M8 11h6" />
                      </svg>
                    </span>
                  </button>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-ink-900">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-sm text-ink-900/60">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </ImageGallery>
      </div>
    </section>
  );
}
