"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image, { getImageProps } from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { ProjectGalleryLabels } from "./content";

export type ProjectGalleryImage = Readonly<{
  src: string;
  alt?: string;
}>;

type ProjectGalleryProps = Readonly<{
  projectName: string;
  cover: ProjectGalleryImage;
  images: readonly ProjectGalleryImage[];
  labels: ProjectGalleryLabels;
}>;

type TemplateValues = Record<string, string | number>;

const SWIPE_THRESHOLD = 48;
const optimizedImageCache = new Map<string, Promise<void>>();

function fillTemplate(template: string, values: TemplateValues): string {
  return Object.entries(values).reduce(
    (result, [key, value]) =>
      result.replaceAll(`{${key}}`, String(value)),
    template
  );
}

function getOptimizedImageProps(src: string) {
  return getImageProps({
    src,
    alt: "",
    width: 1800,
    height: 1200,
    quality: 85,
    sizes: "100vw",
  }).props;
}

function preloadOptimizedImage(src: string): Promise<void> {
  const optimized = getOptimizedImageProps(src);
  const cacheKey = String(optimized.src);
  const cached = optimizedImageCache.get(cacheKey);
  if (cached) return cached;

  const request = new Promise<void>((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    if (optimized.srcSet) image.srcset = optimized.srcSet;
    if (optimized.sizes) image.sizes = optimized.sizes;
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Unable to load ${src}`));
    image.src = String(optimized.src);
  }).catch((error: unknown) => {
    optimizedImageCache.delete(cacheKey);
    throw error;
  });

  optimizedImageCache.set(cacheKey, request);
  return request;
}

function previewSpan(index: number, count: number): string {
  if (count <= 1) return "sm:col-span-2 lg:col-span-12";
  if (count === 2) {
    return index === 0
      ? "sm:col-span-1 lg:col-span-7"
      : "sm:col-span-1 lg:col-span-5";
  }
  if (count === 3) {
    return index === 0
      ? "sm:col-span-2 lg:col-span-6"
      : "sm:col-span-1 lg:col-span-3";
  }

  return index === 0
    ? "sm:col-span-1 lg:col-span-5"
    : index === 1
      ? "sm:col-span-1 lg:col-span-3"
      : "sm:col-span-1 lg:col-span-2";
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className="h-5 w-5"
    >
      {direction === "left" ? (
        <path d="m14.5 5-7 7 7 7" />
      ) : (
        <path d="m9.5 5 7 7-7 7" />
      )}
    </svg>
  );
}

export default function ProjectGallery({
  projectName,
  cover,
  images,
  labels,
}: ProjectGalleryProps) {
  const allImages = useMemo(() => [cover, ...images], [cover, images]);
  const previewImages = images.slice(0, 4);
  const imageCount = allImages.length;
  const [isOpen, setIsOpen] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const requestIdRef = useRef(0);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);

  const imageAlt = useCallback(
    (index: number) =>
      allImages[index]?.alt ??
      fillTemplate(labels.imageAlt, {
        name: projectName,
        current: index + 1,
        total: imageCount,
      }),
    [allImages, imageCount, labels.imageAlt, projectName]
  );

  const openImageLabel = useCallback(
    (index: number) =>
      fillTemplate(labels.openImage, {
        current: index + 1,
        total: imageCount,
      }),
    [imageCount, labels.openImage]
  );

  const openAt = useCallback(
    (index: number, trigger: HTMLButtonElement) => {
      requestIdRef.current += 1;
      lastTriggerRef.current = trigger;
      setDisplayedIndex(index);
      setPendingIndex(null);
      setLoadError(false);
      setShowLoading(true);
      setIsOpen(true);
    },
    []
  );

  const requestIndex = useCallback(
    (index: number) => {
      if (index === displayedIndex && pendingIndex === null) return;

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setPendingIndex(index);
      setLoadError(false);

      preloadOptimizedImage(allImages[index].src)
        .then(() => {
          if (requestIdRef.current !== requestId) return;
          setDisplayedIndex(index);
          setPendingIndex(null);
          setShowLoading(false);
        })
        .catch(() => {
          if (requestIdRef.current !== requestId) return;
          setPendingIndex(null);
          setShowLoading(false);
          setLoadError(true);
        });
    },
    [allImages, displayedIndex, pendingIndex]
  );

  const showPrevious = useCallback(() => {
    if (imageCount < 2) return;
    const current = pendingIndex ?? displayedIndex;
    requestIndex(current === 0 ? imageCount - 1 : current - 1);
  }, [displayedIndex, imageCount, pendingIndex, requestIndex]);

  const showNext = useCallback(() => {
    if (imageCount < 2) return;
    const current = pendingIndex ?? displayedIndex;
    requestIndex(current === imageCount - 1 ? 0 : current + 1);
  }, [displayedIndex, imageCount, pendingIndex, requestIndex]);

  useEffect(() => {
    if (!isOpen || imageCount < 2) return;
    const previousIndex =
      displayedIndex === 0 ? imageCount - 1 : displayedIndex - 1;
    const nextIndex =
      displayedIndex === imageCount - 1 ? 0 : displayedIndex + 1;

    void preloadOptimizedImage(allImages[previousIndex].src).catch(() => {});
    void preloadOptimizedImage(allImages[nextIndex].src).catch(() => {});
  }, [allImages, displayedIndex, imageCount, isOpen]);

  useEffect(() => {
    if (pendingIndex === null) {
      setShowLoading(false);
      return;
    }

    const timer = window.setTimeout(() => setShowLoading(true), 180);
    return () => window.clearTimeout(timer);
  }, [pendingIndex]);

  useEffect(() => {
    if (!isOpen || !activeThumbnailRef.current) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    activeThumbnailRef.current.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [displayedIndex, isOpen]);

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

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (
        Math.abs(dx) < SWIPE_THRESHOLD ||
        Math.abs(dx) <= Math.abs(dy) * 1.2
      ) {
        return;
      }

      if (dx < 0) showNext();
      else showPrevious();
    },
    [imageCount, showNext, showPrevious]
  );

  const handlePointerCancel = useCallback(() => {
    pointerStartRef.current = null;
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      requestIdRef.current += 1;
      setPendingIndex(null);
      setShowLoading(false);
      setLoadError(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <div className="relative overflow-hidden bg-surface">
        <button
          type="button"
          onClick={(event) => openAt(0, event.currentTarget)}
          className="group relative block aspect-[4/3] w-full overflow-hidden sm:aspect-video lg:aspect-[2/1]"
        >
          <Image
            src={cover.src}
            alt=""
            fill
            quality={75}
            sizes="(min-width: 1280px) 1240px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.01] motion-reduce:transition-none"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-4 pb-4 pt-16 text-left text-white sm:px-6 sm:pb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              {labels.viewImage}
            </span>
            <span className="text-xs tabular-nums text-white/85">
              01 / {String(imageCount).padStart(2, "0")}
            </span>
          </span>
        </button>
      </div>

      {images.length > 0 ? (
        <>
          <ul
            className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:hidden"
            role="list"
          >
            {images.map((image, index) => {
              const allImagesIndex = index + 1;
              return (
                <li
                  key={`${image.src}-${index}`}
                  className="w-[78vw] max-w-[340px] shrink-0 snap-start"
                >
                  <button
                    type="button"
                    onClick={(event) =>
                      openAt(allImagesIndex, event.currentTarget)
                    }
                    aria-label={openImageLabel(allImagesIndex)}
                    className="relative block aspect-[4/3] w-full overflow-hidden bg-surface"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      quality={65}
                      loading="lazy"
                      sizes="78vw"
                      className="object-cover"
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 hidden grid-cols-2 gap-3 sm:grid lg:grid-cols-12">
            {previewImages.map((image, index) => {
              const allImagesIndex = index + 1;
              return (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={(event) =>
                    openAt(allImagesIndex, event.currentTarget)
                  }
                  aria-label={openImageLabel(allImagesIndex)}
                  className={`group relative aspect-[4/3] overflow-hidden bg-surface lg:h-[260px] lg:aspect-auto ${previewSpan(
                    index,
                    previewImages.length
                  )}`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    quality={65}
                    loading="lazy"
                    sizes="(min-width: 1024px) 320px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-primary/15 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/70">
          {fillTemplate(labels.imageCount, { total: imageCount })}
        </p>
        <button
          type="button"
          onClick={(event) => openAt(0, event.currentTarget)}
          className="inline-flex min-h-11 items-center justify-center border-b border-primary pb-1 text-sm font-semibold text-primary"
        >
          {fillTemplate(labels.viewAll, { total: imageCount })}
        </button>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[119] bg-[#120f16]/95 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in motion-reduce:animate-none" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastTriggerRef.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              showPrevious();
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              showNext();
            }
          }}
          className="fixed inset-0 z-[120] grid h-[100dvh] w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden text-white focus:outline-none"
        >
          <Dialog.Title className="sr-only">
            {fillTemplate(labels.dialogTitle, { name: projectName })}
          </Dialog.Title>

          <div className="flex min-h-16 w-full min-w-0 max-w-full items-center justify-between gap-4 border-b border-white/15 px-4 py-2 sm:px-6">
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-xs font-semibold tabular-nums tracking-[0.14em] text-white/78"
            >
              {fillTemplate(labels.counter, {
                current: displayedIndex + 1,
                total: imageCount,
              })}
            </p>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={labels.close}
                className="relative h-12 w-12 shrink-0 rounded-full border border-white/25"
              >
                <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </button>
            </Dialog.Close>
          </div>

          <div
            className="relative min-h-0 w-full min-w-0 max-w-full touch-pan-y select-none overflow-hidden px-2 py-3 sm:px-16 sm:py-5"
            style={{ touchAction: "pan-y pinch-zoom" }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className="relative h-full w-full">
              <Image
                key={allImages[displayedIndex].src}
                src={allImages[displayedIndex].src}
                alt={imageAlt(displayedIndex)}
                fill
                quality={85}
                sizes="100vw"
                fetchPriority="high"
                draggable={false}
                onLoad={() => setShowLoading(false)}
                onError={() => {
                  setShowLoading(false);
                  setLoadError(true);
                }}
                className="object-contain"
              />
            </div>

            {imageCount > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label={labels.previous}
                  className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm sm:left-5"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label={labels.next}
                  className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm sm:right-5"
                >
                  <ArrowIcon direction="right" />
                </button>
              </>
            ) : null}

            {showLoading ? (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-xs text-white/85">
                {labels.loading}
              </p>
            ) : null}
            {loadError ? (
              <p
                role="alert"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/75 px-4 py-2 text-center text-xs text-white"
              >
                {labels.loadError}
              </p>
            ) : null}
          </div>

          <div className="w-full min-w-0 max-w-full overflow-hidden border-t border-white/15 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
            <div className="mx-auto flex w-full min-w-0 max-w-[920px] gap-2 overflow-x-auto">
              {allImages.map((image, index) => (
                <button
                  key={`${image.src}-lightbox-${index}`}
                  ref={index === displayedIndex ? activeThumbnailRef : undefined}
                  type="button"
                  onClick={() => requestIndex(index)}
                  aria-label={openImageLabel(index)}
                  aria-current={index === displayedIndex ? "true" : undefined}
                  className="relative h-14 w-20 shrink-0 overflow-hidden bg-white/10 opacity-55 ring-1 ring-white/20 transition-opacity aria-[current=true]:opacity-100 aria-[current=true]:ring-white motion-reduce:transition-none sm:h-16 sm:w-24"
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    quality={65}
                    sizes="96px"
                    loading="lazy"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
