"use client";

import { useVideoPlayer } from "./VideoPlayerProvider";

export default function VideoModal({ label }: { label: string }) {
  const { open } = useVideoPlayer();

  return (
    <button
      type="button"
      onClick={() => open(undefined, "/images/hero/hero-wafer.jpg")}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-ink-900">
        <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5 rtl:-scale-x-100" aria-hidden>
          <path d="M3 1.5v9l8-4.5-8-4.5z" />
        </svg>
      </span>
      {label}
    </button>
  );
}
