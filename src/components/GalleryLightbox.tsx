// src/components/GalleryLightbox.tsx

"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Img = { src: string; alt?: string };

export default function GalleryLightbox({ images, name }: { images: Img[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = useCallback((i: number) => {
    setIdx(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  // Close on ESC, navigate with arrows
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowLeft") return prev();
      if (e.key === "ArrowRight") return next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const displayImages = images.slice(0, 12);

  return (
    <>
      {/* Desktop/tablet: grid */}
      <div className="mt-3 hidden sm:grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {displayImages.map((g, i) => (
          <button
            key={`${g.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 [@media(hover:hover)]:hover:ring-white/30 transition"
            aria-label={`Open image ${i + 1} of ${displayImages.length}`}
          >
            <Image
              src={g.src}
              alt={g.alt ?? `${name} image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 320px, 50vw"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {/* Mobile: horizontal carousel */}
      <div className="sm:hidden mt-3 -mx-4 px-4 overflow-x-auto">
        <ul className="flex gap-3 snap-x snap-mandatory" role="list">
          {displayImages.map((g, i) => (
            <li key={`mimg-${g.src}-${i}`} className="snap-start shrink-0 first:pl-0 last:pr-0">
              <button
                type="button"
                onClick={() => openAt(i)}
                className="relative h-48 w-[85vw] overflow-hidden rounded-xl ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                aria-label={`Open image ${i + 1} of ${displayImages.length}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt ?? `${name} image ${i + 1}`}
                  fill
                  sizes="85vw"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80"
          aria-modal
          role="dialog"
          aria-label={`Image ${idx + 1} of ${images.length}`}
          onClick={close}
        >
          <div
            className="relative flex max-h-[90%] max-w-[90%] flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative inline-block max-h-[90vh] max-w-[90vw]">
              <Image
                src={images[idx].src}
                alt={images[idx].alt ?? `${name} image ${idx + 1}`}
                width={1600}
                height={1000}
                className="h-auto w-auto max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                priority
              />

              {/* Controls */}
              {images.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="h-9 w-9 rounded-md bg-[#0A2540]/85 text-white hover:bg-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="h-9 w-9 rounded-md bg-[#0A2540]/85 text-white hover:bg-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-[#0A2540]/90 text-white hover:bg-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Indicator */}
          <div
            className="pb-4 pt-2"
            onClick={(e) => e.stopPropagation()}
            aria-hidden
          >
            <span className="rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {idx + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}