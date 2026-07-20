"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useRef, useState } from "react";
import type { LetsGoMiamiGalleryLabels } from "@/lib/letsGoMiami";
import styles from "@/components/LetsGoMiami.module.css";

export type LetsGoMiamiGalleryImage = {
  src: string;
  alt: string;
};

type LetsGoMiamiGalleryProps = {
  images: LetsGoMiamiGalleryImage[];
  labels: LetsGoMiamiGalleryLabels;
};

const VISUAL_ORDER = [1, 4, 5, 2, 3, 6, 7] as const;

export default function LetsGoMiamiGallery({ images, labels }: LetsGoMiamiGalleryProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);

  const imageCount = images.length;
  const activeImage = images[activeIndex] ?? images[0];
  const visibleImages = VISUAL_ORDER.flatMap((originalIndex) => {
    const image = images[originalIndex];
    return image ? [{ image, originalIndex }] : [];
  });

  const openAt = useCallback((index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const previous = useCallback(() => {
    setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % imageCount);
  }, [imageCount]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button")) return;

    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (pointerStartXRef.current === null || pointerStartYRef.current === null) return;

      const deltaX = event.clientX - pointerStartXRef.current;
      const deltaY = event.clientY - pointerStartYRef.current;
      pointerStartXRef.current = null;
      pointerStartYRef.current = null;

      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;

      if (deltaX < 0) next();
      else previous();
    },
    [next, previous],
  );

  const handlePointerCancel = useCallback(() => {
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
  }, []);

  if (imageCount === 0) return null;

  return (
    <>
      <ul
        data-gallery-rail
        className={`${styles.galleryRail} mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-12 md:gap-3 md:overflow-visible md:pb-0`}
      >
        {visibleImages.map(({ image, originalIndex }, position) => (
          <li
            key={image.src}
            className={[
              "aspect-[4/3] w-[82vw] max-w-[360px] shrink-0 snap-center md:w-auto md:max-w-none",
              position === 0
                ? "md:col-span-8 md:row-span-2"
                : position === 1 || position === 2
                  ? "md:col-span-4"
                  : "md:col-span-3",
            ].join(" ")}
          >
            <button
              type="button"
              className="group relative block h-full w-full overflow-hidden bg-[var(--lgm-sea-glass)] text-left"
              onClick={(event) => openAt(originalIndex, event.currentTarget)}
              aria-label={`${labels.openImage} ${originalIndex + 1} / ${imageCount}: ${image.alt}`}
              data-gallery-trigger
              data-gallery-index={originalIndex}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  position === 0
                    ? "(min-width: 1240px) 800px, (min-width: 768px) 66vw, 82vw"
                    : position === 1 || position === 2
                      ? "(min-width: 1240px) 400px, (min-width: 768px) 33vw, 82vw"
                      : "(min-width: 1240px) 300px, (min-width: 768px) 25vw, 82vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/32 to-transparent opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none" />
              <span className="pointer-events-none absolute bottom-3 left-3 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none">
                {String(originalIndex + 1).padStart(2, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 border-b border-[var(--lgm-ink)] px-0.5 py-2 text-sm font-semibold text-[var(--lgm-ink)]"
        onClick={(event) => openAt(0, event.currentTarget)}
        data-gallery-view-all
      >
        <Images aria-hidden className="h-4 w-4" />
        {labels.viewAll} ({imageCount})
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[119] bg-[#0a1014]" />
          <Dialog.Content
            className={`${styles.theme} fixed inset-0 z-[120] flex min-h-dvh flex-col text-white focus:outline-none`}
            aria-label={labels.dialog}
            aria-modal="true"
            aria-describedby={undefined}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              closeButtonRef.current?.focus();
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              lastTriggerRef.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                previous();
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                next();
              }
            }}
          >
            <Dialog.Title className="sr-only">{labels.dialog}</Dialog.Title>
            <div className="flex min-h-16 shrink-0 items-center justify-between px-4 sm:px-6">
              <span
                className="text-sm font-medium tabular-nums text-white/88"
                aria-live="polite"
                aria-atomic="true"
              >
                {labels.counter
                  .replace("{current}", String(activeIndex + 1))
                  .replace("{total}", String(imageCount))}
              </span>
              <Dialog.Close asChild>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center bg-white/12 text-white transition-colors hover:bg-white/20 motion-reduce:transition-none"
                  aria-label={labels.close}
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-5 sm:px-16 sm:pb-8">
              <div
                className="relative flex h-full max-h-[calc(100dvh-7rem)] w-full max-w-6xl touch-pan-y select-none items-center justify-center"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                data-lightbox-swipe-zone
              >
                {activeImage ? (
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="(min-width: 1280px) 1152px, 100vw"
                    quality={85}
                    draggable={false}
                    className="pointer-events-none object-contain"
                  />
                ) : null}

                {imageCount > 1 ? (
                  <>
                    <button
                      type="button"
                      className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/48 text-white backdrop-blur-sm transition-colors hover:bg-black/68 motion-reduce:transition-none sm:left-4 sm:h-12 sm:w-12"
                      onClick={previous}
                      aria-label={labels.previous}
                    >
                      <ChevronLeft aria-hidden className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/48 text-white backdrop-blur-sm transition-colors hover:bg-black/68 motion-reduce:transition-none sm:right-4 sm:h-12 sm:w-12"
                      onClick={next}
                      aria-label={labels.next}
                    >
                      <ChevronRight aria-hidden className="h-6 w-6" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
