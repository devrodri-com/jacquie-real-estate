"use client";

import Image, { getImageProps } from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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

type NavigationDirection = -1 | 1;

type DisplayState = {
  index: number;
  outgoingIndex: number | null;
  transitionId: number;
};

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

type IdleDeadline = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type WindowWithIdleCallback = Window & {
  cancelIdleCallback?: (id: number) => void;
  requestIdleCallback?: (
    callback: (deadline: IdleDeadline) => void,
    options?: { timeout: number },
  ) => number;
};

const VISUAL_ORDER = [1, 5, 2, 3, 6] as const;
const LIGHTBOX_QUALITY = 75;
const LIGHTBOX_SIZES =
  "(min-width: 768px) and (min-resolution: 2.5dppx) 640px, (min-width: 1280px) 960px, (min-width: 768px) calc(100vw - 8rem), 90vw";
const LOADER_DELAY_MS = 180;
const CROSSFADE_MS = 140;

function wrapIndex(index: number, imageCount: number) {
  return (index + imageCount) % imageCount;
}

function getLightboxProps(image: LetsGoMiamiGalleryImage) {
  return getImageProps({
    src: image.src,
    alt: image.alt,
    fill: true,
    sizes: LIGHTBOX_SIZES,
    quality: LIGHTBOX_QUALITY,
  }).props;
}

function preloadWithoutBlocking(promise: Promise<void>) {
  void promise.catch(() => undefined);
}

export default function LetsGoMiamiGallery({ images, labels }: LetsGoMiamiGalleryProps) {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState<DisplayState>({
    index: 0,
    outgoingIndex: null,
    transitionId: 0,
  });
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [openingPreviewSrc, setOpeningPreviewSrc] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const viewAllButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);
  const displayedIndexRef = useRef(0);
  const desiredIndexRef = useRef(0);
  const requestIdRef = useRef(0);
  const isOpenRef = useRef(false);
  const loaderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crossfadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preloadCacheRef = useRef(new Map<string, Promise<void>>());

  const imageCount = images.length;
  const activeImage = images[display.index] ?? images[0];
  const outgoingImage =
    display.outgoingIndex === null ? null : (images[display.outgoingIndex] ?? null);
  const visibleImages = VISUAL_ORDER.flatMap((originalIndex) => {
    const image = images[originalIndex];
    return image ? [{ image, originalIndex }] : [];
  });

  const clearLoaderTimer = useCallback(() => {
    if (loaderTimerRef.current !== null) {
      clearTimeout(loaderTimerRef.current);
      loaderTimerRef.current = null;
    }
    setShowLoader(false);
  }, []);

  const clearCrossfadeTimer = useCallback(() => {
    if (crossfadeTimerRef.current !== null) {
      clearTimeout(crossfadeTimerRef.current);
      crossfadeTimerRef.current = null;
    }
  }, []);

  const preloadLightboxImage = useCallback(
    (index: number, fetchPriority: "high" | "low" = "low") => {
      const image = images[index];
      if (!image || typeof window === "undefined") return Promise.resolve();

      const props = getLightboxProps(image);
      const cacheKey = `${props.srcSet ?? ""}|${props.sizes ?? ""}|${props.src}`;
      const cached = preloadCacheRef.current.get(cacheKey);
      if (cached) return cached;

      const promise = new Promise<void>((resolve, reject) => {
        const candidate = new window.Image();
        candidate.alt = "";
        candidate.decoding = "async";
        candidate.fetchPriority = fetchPriority;
        candidate.sizes = props.sizes ?? LIGHTBOX_SIZES;
        if (props.srcSet) candidate.srcset = props.srcSet;

        const decode = async () => {
          try {
            await candidate.decode();
          } catch {
            if (!candidate.complete || candidate.naturalWidth === 0) {
              reject(new Error(`Unable to decode lightbox image ${index + 1}`));
              return;
            }
          }
          resolve();
        };

        candidate.onload = () => {
          void decode();
        };
        candidate.onerror = () => {
          reject(new Error(`Unable to load lightbox image ${index + 1}`));
        };
        candidate.src = props.src;

        if (candidate.complete && candidate.naturalWidth > 0) {
          void decode();
        }
      }).catch((error: unknown) => {
        preloadCacheRef.current.delete(cacheKey);
        throw error;
      });

      preloadCacheRef.current.set(cacheKey, promise);
      return promise;
    },
    [images],
  );

  const prefetchAdjacent = useCallback(
    (index: number, direction?: NavigationDirection) => {
      if (imageCount <= 1) return;

      const leadingIndex = wrapIndex(index + (direction ?? 1), imageCount);
      const trailingIndex = wrapIndex(index - (direction ?? 1), imageCount);
      preloadWithoutBlocking(preloadLightboxImage(leadingIndex));
      preloadWithoutBlocking(preloadLightboxImage(trailingIndex));
    },
    [imageCount, preloadLightboxImage],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      isOpenRef.current = nextOpen;
      setOpen(nextOpen);
      if (!nextOpen) {
        requestIdRef.current += 1;
        desiredIndexRef.current = displayedIndexRef.current;
        setPendingIndex(null);
        setOpeningPreviewSrc(null);
        clearLoaderTimer();
        clearCrossfadeTimer();
        setDisplay((current) => ({ ...current, outgoingIndex: null }));
      }
    },
    [clearCrossfadeTimer, clearLoaderTimer],
  );

  const openAt = useCallback(
    (index: number, trigger: HTMLButtonElement) => {
      const triggerImage = trigger.querySelector<HTMLImageElement>("img");
      const heroImage = document.querySelector<HTMLImageElement>('[data-section="hero"] img');
      setOpeningPreviewSrc(triggerImage?.currentSrc || heroImage?.currentSrc || null);
      lastTriggerRef.current = trigger;
      displayedIndexRef.current = index;
      desiredIndexRef.current = index;
      requestIdRef.current += 1;
      setDisplay({ index, outgoingIndex: null, transitionId: requestIdRef.current });
      setPendingIndex(null);
      clearLoaderTimer();
      clearCrossfadeTimer();
      isOpenRef.current = true;
      setOpen(true);
      preloadWithoutBlocking(preloadLightboxImage(index, "high"));
      prefetchAdjacent(index);
    },
    [clearCrossfadeTimer, clearLoaderTimer, prefetchAdjacent, preloadLightboxImage],
  );

  const navigateTo = useCallback(
    (targetIndex: number, direction: NavigationDirection) => {
      if (imageCount <= 1) return;

      const normalizedIndex = wrapIndex(targetIndex, imageCount);
      desiredIndexRef.current = normalizedIndex;
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setPendingIndex(normalizedIndex);
      clearLoaderTimer();
      loaderTimerRef.current = setTimeout(() => {
        if (
          requestIdRef.current === requestId &&
          desiredIndexRef.current === normalizedIndex &&
          isOpenRef.current
        ) {
          setShowLoader(true);
        }
      }, LOADER_DELAY_MS);

      void preloadLightboxImage(normalizedIndex, "high")
        .then(() => {
          if (
            requestIdRef.current !== requestId ||
            desiredIndexRef.current !== normalizedIndex ||
            !isOpenRef.current
          ) {
            return;
          }

          const previousIndex = displayedIndexRef.current;
          displayedIndexRef.current = normalizedIndex;
          clearLoaderTimer();
          clearCrossfadeTimer();
          setPendingIndex(null);
          setOpeningPreviewSrc(null);
          setDisplay({
            index: normalizedIndex,
            outgoingIndex: previousIndex === normalizedIndex ? null : previousIndex,
            transitionId: requestId,
          });

          if (previousIndex !== normalizedIndex) {
            crossfadeTimerRef.current = setTimeout(() => {
              setDisplay((current) =>
                current.transitionId === requestId
                  ? { ...current, outgoingIndex: null }
                  : current,
              );
              crossfadeTimerRef.current = null;
            }, CROSSFADE_MS);
          }

          prefetchAdjacent(normalizedIndex, direction);
        })
        .catch(() => {
          if (requestIdRef.current !== requestId) return;
          desiredIndexRef.current = displayedIndexRef.current;
          setPendingIndex(null);
          clearLoaderTimer();
        });
    },
    [
      clearCrossfadeTimer,
      clearLoaderTimer,
      imageCount,
      prefetchAdjacent,
      preloadLightboxImage,
    ],
  );

  const previous = useCallback(() => {
    navigateTo(desiredIndexRef.current - 1, -1);
  }, [navigateTo]);

  const next = useCallback(() => {
    navigateTo(desiredIndexRef.current + 1, 1);
  }, [navigateTo]);

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

  useEffect(() => {
    if (!open || imageCount <= 3 || typeof window === "undefined") return;

    const connection = (navigator as NavigatorWithConnection).connection;
    if (connection?.saveData || connection?.effectiveType?.includes("2g")) return;

    const idleWindow = window as WindowWithIdleCallback;
    if (!idleWindow.requestIdleCallback || !idleWindow.cancelIdleCallback) return;

    const excluded = new Set([
      display.index,
      wrapIndex(display.index - 1, imageCount),
      wrapIndex(display.index + 1, imageCount),
    ]);
    const queue = images.map((_, index) => index).filter((index) => !excluded.has(index));
    let cancelled = false;
    let idleId: number | null = null;

    const schedule = () => {
      idleId = idleWindow.requestIdleCallback?.(
        (deadline) => {
          if (cancelled || document.visibilityState !== "visible") return;
          const index = queue.shift();
          if (index === undefined) return;
          if (deadline.timeRemaining() > 4 || deadline.didTimeout) {
            void preloadLightboxImage(index)
              .catch(() => undefined)
              .finally(() => {
                if (!cancelled && queue.length > 0) schedule();
              });
          } else {
            queue.unshift(index);
            schedule();
          }
        },
        { timeout: 3000 },
      ) ?? null;
    };

    schedule();
    return () => {
      cancelled = true;
      if (idleId !== null) idleWindow.cancelIdleCallback?.(idleId);
    };
  }, [display.index, imageCount, images, open, preloadLightboxImage]);

  useEffect(
    () => () => {
      if (loaderTimerRef.current !== null) clearTimeout(loaderTimerRef.current);
      if (crossfadeTimerRef.current !== null) clearTimeout(crossfadeTimerRef.current);
    },
    [],
  );

  if (imageCount === 0) return null;

  return (
    <>
      <ul
        data-gallery-rail
        className={`${styles.galleryRail} mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-12 md:grid-rows-[300px_180px] md:gap-3 md:overflow-visible md:pb-0 xl:grid-rows-[360px_216px]`}
      >
        {visibleImages.map(({ image, originalIndex }, position) => (
          <li
            key={image.src}
            className={[
              "aspect-[4/3] shrink-0 snap-center md:aspect-auto md:h-full md:w-auto md:max-w-none",
              position === 0
                ? "w-[82vw] max-w-[360px] md:col-span-7"
                : position === 1
                  ? "w-[64vw] max-w-[280px] md:col-span-5"
                  : "w-[64vw] max-w-[280px] md:col-span-4",
              position >= 3 ? "hidden md:block" : "block",
            ].join(" ")}
          >
            <button
              type="button"
              className="group relative block h-full w-full overflow-hidden bg-[var(--lgm-sea-glass)] text-left"
              onClick={(event) => openAt(originalIndex, event.currentTarget)}
              onFocus={() => {
                preloadWithoutBlocking(preloadLightboxImage(originalIndex));
              }}
              onPointerEnter={() => {
                preloadWithoutBlocking(preloadLightboxImage(originalIndex));
              }}
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
                    ? "(min-width: 768px) and (min-resolution: 2.5dppx) 640px, (min-width: 1240px) 700px, (min-width: 768px) 58vw, 82vw"
                    : position === 1
                      ? "(min-width: 768px) and (min-resolution: 2.5dppx) 400px, (min-width: 1240px) 500px, (min-width: 768px) 42vw, 64vw"
                      : "(min-width: 768px) and (min-resolution: 2.5dppx) 400px, (min-width: 1240px) 400px, (min-width: 768px) 33vw, 64vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
      </ul>

      <button
        ref={viewAllButtonRef}
        type="button"
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 border-b border-[var(--lgm-ink)] px-0.5 py-2 text-sm font-semibold text-[var(--lgm-ink)]"
        onClick={(event) => openAt(0, event.currentTarget)}
        onFocus={() => {
          preloadWithoutBlocking(preloadLightboxImage(0));
        }}
        onPointerEnter={() => {
          preloadWithoutBlocking(preloadLightboxImage(0));
        }}
        data-gallery-view-all
      >
        <Images aria-hidden className="h-4 w-4" />
        {labels.viewAll} ({imageCount})
      </button>

      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
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
              const trigger = lastTriggerRef.current;
              if (trigger?.isConnected && trigger.getClientRects().length > 0) trigger.focus();
              else viewAllButtonRef.current?.focus();
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
                  .replace("{current}", String(display.index + 1))
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
                {openingPreviewSrc ? (
                  <Image
                    src={openingPreviewSrc}
                    alt=""
                    aria-hidden="true"
                    fill
                    unoptimized
                    sizes={LIGHTBOX_SIZES}
                    draggable={false}
                    className="pointer-events-none object-contain"
                  />
                ) : null}

                {outgoingImage ? (
                  <Image
                    key={`outgoing-${display.outgoingIndex}`}
                    src={outgoingImage.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes={LIGHTBOX_SIZES}
                    quality={LIGHTBOX_QUALITY}
                    draggable={false}
                    className="pointer-events-none object-contain"
                  />
                ) : null}

                {activeImage ? (
                  <Image
                    key={`active-${display.index}-${display.transitionId}`}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes={LIGHTBOX_SIZES}
                    quality={LIGHTBOX_QUALITY}
                    fetchPriority="high"
                    draggable={false}
                    data-lightbox-active
                    data-lightbox-index={display.index}
                    onLoad={() => setOpeningPreviewSrc(null)}
                    className={`pointer-events-none object-contain ${outgoingImage ? styles.lightboxIncoming : ""}`}
                  />
                ) : null}

                {showLoader && pendingIndex !== null ? (
                  <div
                    className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex h-9 w-9 -translate-x-1/2 items-center justify-center bg-black/58"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="h-4 w-4 animate-spin border-2 border-white/35 border-t-white motion-reduce:animate-none" />
                    <span className="sr-only">{labels.loading}</span>
                  </div>
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
