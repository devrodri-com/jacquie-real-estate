"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type LetsGoMiamiGalleryImage = {
  src: string;
  alt: string;
};

export type LetsGoMiamiGalleryLabels = {
  viewAll: string;
  openImage: string;
  dialog: string;
  close: string;
  previous: string;
  next: string;
};

type LetsGoMiamiGalleryProps = {
  images: LetsGoMiamiGalleryImage[];
  labels: LetsGoMiamiGalleryLabels;
};

export default function LetsGoMiamiGallery({ images, labels }: LetsGoMiamiGalleryProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);

  const imageCount = images.length;
  const activeImage = images[activeIndex] ?? images[0];

  const openAt = useCallback((index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 0);
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

  const handlePointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null || pointerStartYRef.current === null) return;

    const deltaX = event.clientX - pointerStartXRef.current;
    const deltaY = event.clientY - pointerStartYRef.current;
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;

    if (deltaX < 0) {
      next();
    } else {
      previous();
    }
  }, [next, previous]);

  const handlePointerCancel = useCallback(() => {
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowLeft") {
        previous();
      }
      if (event.key === "ArrowRight") {
        next();
      }
      if (event.key === "Tab") {
        const focusableControls = imageCount > 1
          ? [closeButtonRef.current, previousButtonRef.current, nextButtonRef.current]
          : [closeButtonRef.current];
        const availableControls = focusableControls.filter((control): control is HTMLButtonElement => (
          control !== null && control.offsetParent !== null
        ));
        const firstControl = availableControls[0];
        const lastControl = availableControls[availableControls.length - 1];

        if (!firstControl || !lastControl) return;

        if (event.shiftKey && document.activeElement === firstControl) {
          event.preventDefault();
          lastControl.focus();
        } else if (!event.shiftKey && document.activeElement === lastControl) {
          event.preventDefault();
          firstControl.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, imageCount, next, open, previous]);

  if (imageCount === 0) return null;

  const mobileThumbnails = images.slice(1, 4);

  return (
    <>
      <div className="mt-7 sm:hidden">
        <button
          type="button"
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-surface ring-1 ring-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          onClick={(event) => openAt(0, event.currentTarget)}
          aria-label={`${labels.openImage} 1 / ${imageCount}: ${images[0].alt}`}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </button>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {mobileThumbnails.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="relative aspect-square overflow-hidden rounded-[10px] bg-surface ring-1 ring-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              onClick={(event) => openAt(index + 1, event.currentTarget)}
              aria-label={`${labels.openImage} ${index + 2} / ${imageCount}: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-primary/20 bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          onClick={(event) => openAt(0, event.currentTarget)}
        >
          <Images aria-hidden="true" className="h-4 w-4" />
          {labels.viewAll}
        </button>
      </div>

      <div className="mt-7 hidden gap-3 sm:grid sm:grid-cols-2 lg:auto-rows-[170px] lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={[
              "relative overflow-hidden rounded-[12px] bg-surface ring-1 ring-primary/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
              "[@media(hover:hover)]:hover:ring-primary/25",
              index === 0
                ? "aspect-[4/3] sm:col-span-2 lg:row-span-2 lg:aspect-auto"
                : index === 5
                  ? "aspect-[4/3] lg:col-span-2 lg:aspect-auto"
                  : "aspect-[4/3] lg:aspect-auto",
            ].join(" ")}
            onClick={(event) => openAt(index, event.currentTarget)}
            aria-label={`${labels.openImage} ${index + 1} / ${imageCount}: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                index === 0 || index === 5
                  ? "(min-width: 1024px) 520px, 100vw"
                  : "(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {open && activeImage ? (
        <div
          className="fixed inset-0 z-[120] flex min-h-dvh flex-col bg-black/90 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium tabular-nums text-white/90" aria-live="polite" aria-atomic="true">
              {activeIndex + 1} / {imageCount}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={close}
              aria-label={labels.close}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-6 sm:px-16 sm:pb-8 sm:pt-0">
            <div className="flex w-full -translate-y-12 flex-col items-center gap-4 sm:h-full sm:translate-y-0">
              <div
                className="relative aspect-[4/3] max-h-[76dvh] w-[92vw] max-w-5xl touch-pan-y select-none overflow-hidden rounded-[14px] bg-transparent shadow-2xl shadow-black/30 sm:h-full sm:w-full sm:aspect-auto sm:max-h-none"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />

                {imageCount > 1 ? (
                  <>
                    <button
                      ref={previousButtonRef}
                      type="button"
                      className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:inline-flex"
                      onClick={previous}
                      aria-label={labels.previous}
                    >
                      <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                    </button>
                    <button
                      ref={nextButtonRef}
                      type="button"
                      className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:inline-flex"
                      onClick={next}
                      aria-label={labels.next}
                    >
                      <ChevronRight aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </>
                ) : null}
              </div>

              {imageCount > 1 ? (
                <div className="flex items-center justify-center gap-1.5 sm:hidden" aria-hidden="true">
                  {images.map((image, index) => (
                    <span
                      key={image.src}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        index === activeIndex ? "w-4 bg-white/90" : "w-1.5 bg-white/35",
                      ].join(" ")}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
