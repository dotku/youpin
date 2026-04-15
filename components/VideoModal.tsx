"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoModal({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) videoRef.current?.pause();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-ink-900">
          <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5 rtl:-scale-x-100" aria-hidden>
            <path d="M3 1.5v9l8-4.5-8-4.5z" />
          </svg>
        </span>
        {label}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute end-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <video
              ref={videoRef}
              src="/videos/promo.mp4"
              poster="/images/hero/hero-wafer.jpg"
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}
