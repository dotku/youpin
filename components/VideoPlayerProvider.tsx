"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PROMO_VIDEO_URL } from "@/lib/site";

type VideoPlayerContextValue = {
  open: (src?: string, poster?: string) => void;
};

const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

export function useVideoPlayer() {
  const ctx = useContext(VideoPlayerContext);
  if (!ctx) throw new Error("useVideoPlayer must be used within VideoPlayerProvider");
  return ctx;
}

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ src: string; poster?: string } | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = useCallback((src?: string, poster?: string) => {
    setState({ src: src ?? PROMO_VIDEO_URL, poster });
  }, []);

  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, close]);

  return (
    <VideoPlayerContext.Provider value={{ open }}>
      {children}
      {state && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur sm:p-8"
          onClick={close}
        >
          <div
            className="relative w-full max-w-[min(90vw,1280px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute inset-e-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <video
              ref={videoRef}
              src={state.src}
              poster={state.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full rounded-2xl bg-black shadow-2xl"
            />
          </div>
        </div>
      )}
    </VideoPlayerContext.Provider>
  );
}
