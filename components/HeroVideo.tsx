"use client";

import Image from "next/image";
import { useVideoPlayer } from "./VideoPlayerProvider";

export default function HeroVideo({ alt }: { alt: string }) {
  const { open } = useVideoPlayer();

  return (
    <button
      type="button"
      onClick={() => open(undefined, "/images/hero/hero-wafer.jpg")}
      aria-label="Play video"
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/20 ring-offset-2 ring-offset-transparent shadow-2xl shadow-black/40"
    >
      <Image
        src="/images/hero/hero-wafer.jpg"
        alt={alt}
        width={1920}
        height={1080}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center bg-linear-to-t from-black/40 via-black/10 to-transparent transition-colors group-hover:from-black/60">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 shadow-2xl backdrop-blur transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-9 w-9 text-ink-900 rtl:-scale-x-100 sm:h-11 sm:w-11"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
