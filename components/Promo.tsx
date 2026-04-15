"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function Promo() {
  const t = useTranslations("promo");
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => setPlaying(false));
    else videoRef.current?.pause();
  }, [playing]);

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 noise opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/70">{t("subtitle")}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src="/videos/promo.mp4"
              poster="/images/hero/hero-wafer.jpg"
              preload="none"
              controls={playing}
              playsInline
              onEnded={() => setPlaying(false)}
              className="absolute inset-0 h-full w-full bg-black object-cover"
            />
            {!playing && (
              <>
                <Image
                  src="/images/hero/hero-wafer.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1152px"
                  className="pointer-events-none object-cover opacity-90"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={t("watch")}
                  className="group absolute inset-0 grid place-items-center focus:outline-none"
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-ink-900 shadow-2xl transition group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 translate-x-0.5 rtl:-scale-x-100" aria-hidden>
                      <path d="M6 4v16l14-8z" />
                    </svg>
                  </span>
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                    {t("watch")}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
