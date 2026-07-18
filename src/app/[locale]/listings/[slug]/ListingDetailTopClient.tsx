"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const GALLERY_HISTORY_KEY = "__jacquieListingGallery";
const SWIPE_THRESHOLD = 48;

export type ListingGalleryLabels = {
  dialog: string;
  viewAll: string;
  photo: string;
  openPhoto: string;
  of: string;
  close: string;
  previous: string;
  next: string;
};

type ListingGalleryProps = {
  images: string[];
  name: string;
  labels: ListingGalleryLabels;
};

function hasGalleryHistoryMarker(state: unknown): boolean {
  return (
    typeof state === "object" &&
    state !== null &&
    (state as Record<string, unknown>)[GALLERY_HISTORY_KEY] === true
  );
}

export function ListingGallery({ images, name, labels }: ListingGalleryProps) {
  const imageCount = images.length;
  const previewImages = images.slice(0, 5);
  const supportingImages = images.slice(1, 3);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const historyPushedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);

  const photoLabel = useCallback(
    (index: number) =>
      `${name} — ${labels.photo} ${index + 1} ${labels.of} ${imageCount}`,
    [imageCount, labels.of, labels.photo, name]
  );

  const openPhotoLabel = useCallback(
    (index: number) =>
      `${labels.openPhoto} ${index + 1} ${labels.of} ${imageCount}`,
    [imageCount, labels.of, labels.openPhoto]
  );

  const openLightbox = useCallback(
    (index: number, trigger: HTMLButtonElement) => {
      if (imageCount === 0) return;

      lastTriggerRef.current = trigger;
      setActiveIndex(Math.min(Math.max(index, 0), imageCount - 1));
      setIsLightboxOpen(true);
    },
    [imageCount]
  );

  const closeLightbox = useCallback(() => {
    if (hasGalleryHistoryMarker(window.history.state)) {
      window.history.back();
      return;
    }

    historyPushedRef.current = false;
    setIsLightboxOpen(false);
  }, []);

  const showPreviousPhoto = useCallback(() => {
    if (imageCount < 2) return;
    setActiveIndex((current) =>
      current === 0 ? imageCount - 1 : current - 1
    );
  }, [imageCount]);

  const showNextPhoto = useCallback(() => {
    if (imageCount < 2) return;
    setActiveIndex((current) =>
      current === imageCount - 1 ? 0 : current + 1
    );
  }, [imageCount]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const galleryStateIsActive = hasGalleryHistoryMarker(event.state);
      historyPushedRef.current = galleryStateIsActive;
      setIsLightboxOpen(galleryStateIsActive);
    };

    window.addEventListener("popstate", handlePopState);

    if (hasGalleryHistoryMarker(window.history.state)) {
      historyPushedRef.current = true;
      setIsLightboxOpen(true);
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen || historyPushedRef.current) return;

    const currentState = window.history.state;
    const nextState =
      typeof currentState === "object" && currentState !== null
        ? {
            ...(currentState as Record<string, unknown>),
            [GALLERY_HISTORY_KEY]: true,
          }
        : { [GALLERY_HISTORY_KEY]: true };

    window.history.pushState(nextState, "", window.location.href);
    historyPushedRef.current = true;
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (isLightboxOpen || !lastTriggerRef.current) return;

    const focusTimer = window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    activeThumbnailRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousPhoto();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextPhoto();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableControls = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.offsetParent !== null);
      const firstControl = focusableControls[0];
      const lastControl = focusableControls[focusableControls.length - 1];

      if (!firstControl || !lastControl) return;

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        firstControl.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    closeLightbox,
    isLightboxOpen,
    showNextPhoto,
    showPreviousPhoto,
  ]);

  useEffect(() => {
    if (activeIndex < imageCount) return;
    setActiveIndex(0);
  }, [activeIndex, imageCount]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button")
      ) {
        return;
      }

      pointerStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        pointerId: event.pointerId,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    []
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const start = pointerStartRef.current;
      pointerStartRef.current = null;

      if (!start || start.pointerId !== event.pointerId || imageCount < 2) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;
      const isHorizontalSwipe =
        Math.abs(deltaX) >= SWIPE_THRESHOLD &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

      if (!isHorizontalSwipe) return;

      if (deltaX < 0) {
        showNextPhoto();
      } else {
        showPreviousPhoto();
      }
    },
    [imageCount, showNextPhoto, showPreviousPhoto]
  );

  const handlePointerCancel = useCallback(() => {
    pointerStartRef.current = null;
  }, []);

  const mainImage = images[0];
  const activeImage = images[activeIndex] ?? mainImage;

  if (!mainImage || !activeImage) return null;

  return (
    <div
      role="group"
      aria-label={labels.dialog}
      className="border-y border-primary/12 py-5 sm:py-7"
    >
      <div
        className={[
          "grid gap-2 overflow-hidden rounded-[18px] bg-surface ring-1 ring-primary/12 sm:rounded-[22px] lg:gap-3",
          supportingImages.length > 0
            ? "sm:h-[clamp(440px,52vw,620px)] sm:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.75fr)] sm:grid-rows-2"
            : "",
        ].join(" ")}
      >
        <button
          type="button"
          className={[
            "group relative aspect-[4/3] min-h-11 overflow-hidden bg-surface focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
            supportingImages.length > 0
              ? "sm:row-span-2 sm:aspect-auto"
              : "",
          ].join(" ")}
          onClick={(event) => openLightbox(0, event.currentTarget)}
          aria-label={openPhotoLabel(0)}
          data-gallery-open="0"
        >
          <Image
            src={mainImage}
            alt={photoLabel(0)}
            fill
            sizes="(min-width: 1280px) 760px, (min-width: 640px) 66vw, calc(100vw - 2rem)"
            priority
            fetchPriority="high"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:[@media(hover:hover)]:group-hover:scale-[1.012] motion-reduce:transition-none"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/62 px-3 py-1.5 text-xs font-semibold tabular-nums text-white backdrop-blur-sm">
            1 {labels.of} {imageCount}
          </span>
        </button>

        {supportingImages.map((src, supportIndex) => {
          const imageIndex = supportIndex + 1;

          return (
            <button
              key={`${src}-${imageIndex}`}
              type="button"
              className={[
                "group relative hidden min-h-11 overflow-hidden bg-surface focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:block",
                supportingImages.length === 1 ? "sm:row-span-2" : "",
              ].join(" ")}
              onClick={(event) =>
                openLightbox(imageIndex, event.currentTarget)
              }
              aria-label={openPhotoLabel(imageIndex)}
              data-gallery-open={imageIndex}
            >
              <Image
                src={src}
                alt={photoLabel(imageIndex)}
                fill
                sizes="(min-width: 1280px) 340px, (min-width: 640px) 34vw, 1px"
                quality={75}
                loading="lazy"
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:[@media(hover:hover)]:group-hover:scale-[1.025] motion-reduce:transition-none"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-1 hidden overflow-x-auto px-1 pb-1 [scrollbar-width:thin] sm:block">
          <ul className="flex w-max list-none gap-2">
            {previewImages.map((src, index) => (
              <li key={`${src}-${index}`}>
                <button
                  type="button"
                  className="relative h-16 w-[86px] shrink-0 overflow-hidden rounded-[10px] bg-surface ring-1 ring-primary/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-[72px] sm:w-24 motion-safe:transition-[opacity,box-shadow] motion-safe:duration-200 motion-safe:[@media(hover:hover)]:hover:opacity-85 motion-reduce:transition-none"
                  onClick={(event) =>
                    openLightbox(index, event.currentTarget)
                  }
                  aria-label={openPhotoLabel(index)}
                  data-gallery-open={index}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    quality={65}
                    loading="lazy"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-full border border-primary/20 bg-paper px-5 text-sm font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-200 motion-safe:[@media(hover:hover)]:hover:bg-surface motion-reduce:transition-none"
          onClick={(event) => openLightbox(0, event.currentTarget)}
          aria-label={labels.viewAll}
          data-gallery-open="all"
        >
          <span>{labels.viewAll}</span>
        </button>
      </div>

      {isLightboxOpen ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[120] flex min-h-dvh flex-col bg-black/92 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
          onClick={closeLightbox}
        >
          <div
            className="flex h-16 shrink-0 items-center justify-between gap-4 px-[max(1rem,env(safe-area-inset-left,0px))] pt-[env(safe-area-inset-top,0px)] sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <span
              className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium tabular-nums text-white/92"
              aria-live="polite"
              aria-atomic="true"
              role="status"
              data-gallery-counter
            >
              {activeIndex + 1} {labels.of} {imageCount}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 motion-safe:transition-colors motion-safe:duration-200 motion-safe:[@media(hover:hover)]:hover:bg-white/20 motion-reduce:transition-none"
              onClick={closeLightbox}
              aria-label={labels.close}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 flex-col px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative min-h-0 flex-1 touch-pan-y select-none overflow-hidden rounded-[14px] bg-black sm:rounded-[18px]"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              data-gallery-image-index={activeIndex}
            >
              <Image
                key={`${activeIndex}-${activeImage}`}
                src={activeImage}
                alt={photoLabel(activeIndex)}
                fill
                sizes="100vw"
                quality={85}
                priority
                draggable={false}
                className="object-contain motion-reduce:transition-none"
              />

              {imageCount > 1 ? (
                <>
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-3xl leading-none text-white backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-4 motion-safe:transition-colors motion-safe:duration-200 motion-safe:[@media(hover:hover)]:hover:bg-black/65 motion-reduce:transition-none"
                    onClick={showPreviousPhoto}
                    aria-label={labels.previous}
                  >
                    <span aria-hidden="true">‹</span>
                  </button>

                  <button
                    type="button"
                    className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-3xl leading-none text-white backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-4 motion-safe:transition-colors motion-safe:duration-200 motion-safe:[@media(hover:hover)]:hover:bg-black/65 motion-reduce:transition-none"
                    onClick={showNextPhoto}
                    aria-label={labels.next}
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </>
              ) : null}
            </div>

            <div
              className="mt-3 overflow-x-auto overscroll-x-contain pb-1 scroll-smooth motion-reduce:scroll-auto [scrollbar-color:rgba(255,255,255,0.35)_transparent] [scrollbar-width:thin]"
            >
              <ul
                className="mx-auto flex w-max list-none gap-2 px-1"
                aria-label={labels.dialog}
              >
                {images.map((src, index) => (
                  <li key={`${src}-${index}`}>
                    <button
                      ref={
                        index === activeIndex ? activeThumbnailRef : undefined
                      }
                      type="button"
                      className={[
                        "relative h-14 w-[72px] shrink-0 overflow-hidden rounded-[8px] bg-white/5 ring-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white motion-safe:transition-[opacity,box-shadow] motion-safe:duration-200 motion-reduce:transition-none sm:h-16 sm:w-20",
                        index === activeIndex
                          ? "ring-white opacity-100"
                          : "ring-white/20 opacity-[0.68] motion-safe:[@media(hover:hover)]:hover:opacity-100",
                      ].join(" ")}
                      onClick={() => setActiveIndex(index)}
                      aria-label={openPhotoLabel(index)}
                      aria-current={
                        index === activeIndex ? "true" : undefined
                      }
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="80px"
                        quality={65}
                        loading="lazy"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
