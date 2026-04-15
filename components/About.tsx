"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ImageGallery from "./ImageGallery";
import type { LightboxImage } from "./Lightbox";

const highlights = ["rd", "quality", "scale"] as const;

const gallery: LightboxImage[] = [
  { src: "/images/facility/cleanroom.jpg", alt: "Cleanroom", caption: "Cleanroom — CVD reactors" },
  { src: "/images/facility/workshop.jpg", alt: "Workshop", caption: "Workshop floor" },
  { src: "/images/facility/entrance.png", alt: "Entrance", caption: "Company entrance" },
  { src: "/images/facility/conference-large.png", alt: "Conference room", caption: "Conference room" },
];

export default function About() {
  const t = useTranslations("about");
  return (
    <section id="about" className="bg-gradient-to-b from-brand-50/40 to-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-900/70">
              {t("body")}
            </p>
            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-brand-100 text-brand-700">
                    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-ink-900/80">{t(`highlights.${h}`)}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-1 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
            >
              {t("learnMore")} →
            </a>
          </div>

          <ImageGallery images={gallery}>
            {(open) => (
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-200 to-brand-50 blur-xl" aria-hidden />
                <button
                  type="button"
                  onClick={() => open(0)}
                  className="group relative block w-full overflow-hidden rounded-3xl border border-ink-900/10 bg-white p-2 shadow-xl"
                  aria-label="View cleanroom"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={gallery[0].src}
                      alt={gallery[0].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </button>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {gallery.slice(1).map((g, idx) => (
                    <button
                      key={g.src}
                      type="button"
                      onClick={() => open(idx + 1)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-ink-900/10"
                      aria-label={`View ${g.alt}`}
                    >
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(max-width: 1024px) 30vw, 15vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ImageGallery>
        </div>
      </div>
    </section>
  );
}
