import Image from "next/image";
import { useTranslations } from "next-intl";
import VideoModal from "./VideoModal";

const tiles = [
  { src: "/images/products/substrate-seeds.jpg", alt: "Diamond substrate" },
  { src: "/images/products/heatsink.png", alt: "Heat spreader" },
  { src: "/images/products/optics-window.png", alt: "Optical window" },
  { src: "/images/products/crystal-white.png", alt: "Lab-grown diamond" },
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-hero-grid pt-28 pb-24 text-white sm:pt-32 sm:pb-32">
      <div className="absolute inset-0 noise opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              {t("eyebrow")}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-lg shadow-brand-900/20 hover:bg-brand-50"
              >
                {t("ctaPrimary")}
                <svg viewBox="0 0 20 20" className="h-4 w-4 rtl:rotate-180" fill="currentColor" aria-hidden>
                  <path d="M7.05 4.55a.75.75 0 011.06 0l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 11-1.06-1.06L10.23 10 7.05 6.82a.75.75 0 010-1.06z" />
                </svg>
              </a>
              <VideoModal label={t("ctaSecondary")} />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-500/30 via-transparent to-brand-900/40 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border border-white/15 bg-white/5 p-3 backdrop-blur sm:p-6">
              <div className="relative mb-3 overflow-hidden rounded-2xl sm:mb-4">
                <Image
                  src="/images/hero/hero-wafer.jpg"
                  alt="Polycrystalline diamond wafer"
                  width={1280}
                  height={720}
                  priority
                  className="h-48 w-full object-cover sm:h-64"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {tiles.map((tile) => (
                  <div
                    key={tile.src}
                    className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-ink-900"
                  >
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      sizes="(max-width: 640px) 20vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                <span>ISO 9001 · RoHS · REACH</span>
                <span>2026 · Global Supply</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
