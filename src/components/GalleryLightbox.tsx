// src/components/GalleryLightbox.tsx

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Img = { src: string; alt?: string };

type GalleryLocale = "en" | "es" | "fr";

function galleryA11y(locale: GalleryLocale) {
  if (locale === "en") {
    return {
      openThumb: (i: number, total: number) => `Open image ${i} of ${total}`,
      altFallback: (i: number) => `image ${i}`,
      dialog: (i: number, total: number) => `Image ${i} of ${total}`,
      prev: "Previous image",
      next: "Next image",
      close: "Close lightbox",
    };
  }
  if (locale === "fr") {
    return {
      openThumb: (i: number, total: number) => `Ouvrir l'image ${i} sur ${total}`,
      altFallback: (i: number) => `image ${i}`,
      dialog: (i: number, total: number) => `Image ${i} sur ${total}`,
      prev: "Image précédente",
      next: "Image suivante",
      close: "Fermer la visionneuse",
    };
  }
  return {
    openThumb: (i: number, total: number) => `Abrir imagen ${i} de ${total}`,
    altFallback: (i: number) => `imagen ${i}`,
    dialog: (i: number, total: number) => `Imagen ${i} de ${total}`,
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    close: "Cerrar galería",
  };
}

export default function GalleryLightbox({
  images,
  name,
  locale = "es",
}: {
  images: Img[];
  name: string;
  locale?: GalleryLocale;
}) {
  const L = galleryA11y(locale);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const openAt = useCallback((i: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setIdx(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  }, []);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch || images.length <= 1) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2;
    if (!isHorizontalSwipe) return;

    if (dx < 0) {
      next();
    } else {
      prev();
    }
  }, [images.length, next, prev]);

  // Close on ESC, navigate with arrows
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowLeft") return prev();
      if (e.key === "ArrowRight") return next();
      if (e.key !== "Tab") return;

      const controls = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.offsetParent !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
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
            onClick={(event) => openAt(i, event.currentTarget)}
            className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-primary-foreground/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 [@media(hover:hover)]:hover:ring-primary-foreground/30 transition"
            aria-label={L.openThumb(i + 1, displayImages.length)}
          >
            <Image
              src={g.src}
              alt={g.alt ?? `${name} — ${L.altFallback(i + 1)}`}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 320px, 50vw"
              quality={65}
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
                onClick={(event) => openAt(i, event.currentTarget)}
                className="relative h-48 w-[85vw] overflow-hidden rounded-xl ring-1 ring-primary-foreground/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label={L.openThumb(i + 1, displayImages.length)}
              >
                <Image
                  src={g.src}
                  alt={g.alt ?? `${name} — ${L.altFallback(i + 1)}`}
                  fill
                  sizes="85vw"
                  quality={65}
                  className="object-cover"
                  loading="lazy"
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
          ref={dialogRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80"
          aria-modal="true"
          role="dialog"
          aria-label={`${name}. ${L.dialog(idx + 1, images.length)}`}
          onClick={close}
        >
          <div
            className="relative flex max-h-[90%] max-w-[90%] flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative inline-block max-h-[90vh] max-w-[92vw] touch-pan-y select-none sm:max-h-[86vh] sm:max-w-[calc(100vw-10rem)]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={images[idx].src}
                alt={images[idx].alt ?? `${name} — ${L.altFallback(idx + 1)}`}
                width={1600}
                height={1000}
                sizes="92vw"
                quality={85}
                className="h-auto w-auto max-h-[90vh] max-w-[92vw] rounded-lg object-contain sm:max-h-[86vh] sm:max-w-[calc(100vw-10rem)]"
                draggable={false}
                fetchPriority="high"
              />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label={L.close}
              >
                ✕
              </button>

              {/* Desktop controls stay outside the image but close to its visual frame. */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-2xl leading-none text-primary-foreground shadow-lg backdrop-blur-sm hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:-left-14 sm:flex lg:-left-16"
                    aria-label={L.prev}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-2xl leading-none text-primary-foreground shadow-lg backdrop-blur-sm hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:-right-14 sm:flex lg:-right-16"
                    aria-label={L.next}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Indicator */}
          <div
            className="pb-4 pt-2"
            onClick={(e) => e.stopPropagation()}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="rounded-full bg-primary/85 px-3 py-1 text-sm text-primary-foreground">
              {idx + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
