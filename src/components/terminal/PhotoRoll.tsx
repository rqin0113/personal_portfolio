"use client";

import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  "/gallery/pic1.jpg",
  "/gallery/pic2.jpg",
  "/gallery/pic3.jpg",
];

export function PhotoRoll({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight")
        setIdx((i) => (i + 1) % PHOTOS.length);
      else if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const next = () => setIdx((i) => (i + 1) % PHOTOS.length);
  const prev = () => setIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) {
          if (dx < 0) next();
          else prev();
        }
        touchX.current = null;
      }}
      role="dialog"
      aria-modal="true"
      aria-label="photo viewer"
    >
      <div
        className="relative -rotate-1 bg-bone-50 p-3 pb-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS[idx]}
          alt={`photo ${idx + 1}`}
          className="block h-[60vh] max-h-[440px] w-auto max-w-[80vw] object-cover"
        />
        <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] italic tracking-wide text-stone-600">
          {String(idx + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
        </div>

        <button
          type="button"
          aria-label="close"
          onClick={onClose}
          className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink-100 text-sm text-bone-200 shadow ring-1 ring-white/10 hover:text-accent-cyan"
        >
          ×
        </button>
      </div>

      <button
        type="button"
        aria-label="previous photo"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-bone-200 hover:bg-white/5 hover:text-accent-cyan"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="next photo"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-bone-200 hover:bg-white/5 hover:text-accent-cyan"
      >
        ›
      </button>
    </div>
  );
}
