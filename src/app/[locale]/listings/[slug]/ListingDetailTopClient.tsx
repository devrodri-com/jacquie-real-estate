"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ListingDetailTopItem = {
  images: string[];
  title: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  size: number;
  type: string;
  mls: string;
};

export function ListingDetailTopClient({
  addressDisplay,
  listingDisplayTitle,
  city,
  item,
  locale,
  isEN,
  isFR,
}: {
  addressDisplay: string;
  listingDisplayTitle: string;
  city: string;
  item: ListingDetailTopItem;
  locale: string;
  isEN: boolean;
  isFR: boolean;
}) {
  const mainImage = item.images[0];
  const [activeImage, setActiveImage] = useState(mainImage);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxHistoryPushedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const galleryA11y = isEN
    ? {
        dialog: `Photo gallery for ${listingDisplayTitle}`,
        openImage: (index: number, total: number) => `Open image ${index} of ${total}`,
        imageAlt: (index: number, total: number) => `${listingDisplayTitle}, image ${index} of ${total}`,
        remaining: (count: number) => `Open ${count} more photos`,
        close: "Close gallery",
        previous: "Previous image",
        next: "Next image",
      }
    : isFR
      ? {
          dialog: `Galerie de photos de ${listingDisplayTitle}`,
          openImage: (index: number, total: number) => `Ouvrir l’image ${index} sur ${total}`,
          imageAlt: (index: number, total: number) => `${listingDisplayTitle}, image ${index} sur ${total}`,
          remaining: (count: number) => `Ouvrir ${count} photos supplémentaires`,
          close: "Fermer la galerie",
          previous: "Image précédente",
          next: "Image suivante",
        }
      : {
          dialog: `Galería de fotos de ${listingDisplayTitle}`,
          openImage: (index: number, total: number) => `Abrir imagen ${index} de ${total}`,
          imageAlt: (index: number, total: number) => `${listingDisplayTitle}, imagen ${index} de ${total}`,
          remaining: (count: number) => `Abrir ${count} fotos adicionales`,
          close: "Cerrar galería",
          previous: "Imagen anterior",
          next: "Imagen siguiente",
        };

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    if (item.images.length === 0) return;
    const i = Math.min(Math.max(0, index), item.images.length - 1);
    lastTriggerRef.current = trigger;
    setLightboxIndex(i);
    setActiveImage(item.images[i]);
    setIsLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    if (typeof window !== "undefined" && (window.history.state as { lightbox?: boolean } | null)?.lightbox) {
      window.history.back();
    } else {
      setIsLightboxOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) {
      lightboxHistoryPushedRef.current = false;
      return;
    }
    if (lightboxHistoryPushedRef.current) return;
    window.history.pushState({ lightbox: true }, "");
    lightboxHistoryPushedRef.current = true;
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onPopState = () => {
      setIsLightboxOpen(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (isLightboxOpen || !lastTriggerRef.current) return;
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  }, [isLightboxOpen]);

  const showPrevImage = useCallback(() => {
    setLightboxIndex((current) => {
      const len = item.images.length;
      if (len < 1) return 0;
      return current === 0 ? len - 1 : current - 1;
    });
  }, [item.images]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((current) => {
      const len = item.images.length;
      if (len < 1) return 0;
      return current === len - 1 ? 0 : current + 1;
    });
  }, [item.images]);

  useEffect(() => {
    if (!isLightboxOpen || item.images.length === 0) return;
    const url = item.images[lightboxIndex];
    if (url !== undefined) setActiveImage(url);
  }, [isLightboxOpen, lightboxIndex, item.images]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevImage();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextImage();
        return;
      }
      if (e.key === "Tab") {
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
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen, closeLightbox, showPrevImage, showNextImage]);

  return (
    <>
      {/* Compact header */}
      <section className="mb-3">
        <h1 className="font-display text-[36px] font-medium leading-[1.02] tracking-normal text-primary sm:text-[48px]">
          {listingDisplayTitle}
        </h1>
        <p className="mt-2 text-[15px] text-foreground/70">{addressDisplay}</p>
        <p className="mt-1 text-[15px] text-foreground/70">{city}</p>

        <p className="mt-1 text-xl font-medium text-primary">
          ${item.price.toLocaleString("en-US")}
        </p>

        <p className="mt-1 text-[14px] text-foreground/70">
          {item.beds} {isEN ? "beds" : isFR ? "chambres" : "hab"} ·{" "}
          {item.baths} {isEN ? "baths" : isFR ? "salles de bain" : "baños"} ·{" "}
          {isEN
            ? `${item.size.toLocaleString("en-US")} sq ft`
            : isFR
              ? `${item.size.toLocaleString("fr-CA")} pi²`
              : `Superficie ${item.size.toLocaleString("en-US")} ft²`} · {item.type}
        </p>

        <p className="mt-1 text-[13px] text-foreground/70">
          MLS {item.mls}
        </p>
      </section>

      {/* Main: gallery + sticky card */}
      <section className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {item.images.length > 0 && (
            <>
              <button
                type="button"
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] ring-1 ring-black/10 mb-3 cursor-pointer"
                onClick={(event) =>
                  openLightbox(item.images.findIndex((img) => img === activeImage), event.currentTarget)
                }
                aria-label={galleryA11y.openImage(item.images.findIndex((img) => img === activeImage) + 1, item.images.length)}
              >
                <Image
                  src={activeImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 640px, calc(100vw - 2rem)"
                  priority
                  fetchPriority="high"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                />
                <div className="absolute bottom-3 right-3 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
                  {item.images.findIndex((img) => img === activeImage) + 1} / {item.images.length}
                </div>
              </button>

              <div className="flex flex-wrap gap-2">
                {item.images.slice(0, 5).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(event) => {
                      setActiveImage(src);
                      openLightbox(item.images.findIndex((img) => img === src), event.currentTarget);
                    }}
                    aria-label={galleryA11y.openImage(i + 1, item.images.length)}
                    aria-pressed={activeImage === src}
                    className={`relative h-20 w-28 overflow-hidden rounded-md ring-1 p-0 border-0 bg-transparent cursor-pointer transition focus-visible:ring-2 focus-visible:ring-accent ${
                      activeImage === src
                        ? "ring-primary"
                        : "ring-black/10 hover:ring-primary/50"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="112px"
                      quality={65}
                      loading="lazy"
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  </button>
                ))}

                {item.images.length > 5 && (
                  <button
                    type="button"
                    onClick={(event) => openLightbox(5, event.currentTarget)}
                    aria-label={galleryA11y.remaining(item.images.length - 5)}
                    className="relative h-20 w-28 overflow-hidden rounded-md ring-1 ring-primary/20 bg-primary/[0.06] flex items-center justify-center text-sm font-semibold text-primary hover:bg-primary/[0.12] transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="relative z-10">
                      +{item.images.length - 5} {isEN ? "photos" : isFR ? "photos" : "fotos"}
                    </span>

                    <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit rounded-[10px] bg-surface p-6 ring-1 ring-primary/10 shadow-[0_10px_30px_rgba(59,39,74,0.06)] sm:p-7">
          <p className="text-[12px] uppercase tracking-wide text-primary/70">
            {isEN ? "Selected property" : isFR ? "Propriété sélectionnée" : "Propiedad seleccionada"}
          </p>

          <p className="mt-1 text-xl font-semibold text-primary">
            ${item.price.toLocaleString("en-US")}
          </p>

          <p className="mt-1 text-[14px] text-foreground/65">
            {item.city}
          </p>

          <p className="mt-2 text-[14px] text-foreground/70">
            {isEN
              ? "We review numbers, building conditions, and next steps together before moving forward."
              : isFR
                ? "Nous révisons ensemble les chiffres, l’immeuble, les conditions et les prochaines étapes avant d’avancer."
                : "Revisamos juntos números, edificio, condiciones y próximos pasos antes de avanzar."}
          </p>

          <p className="mt-2 text-[14px] text-foreground/70">
            {item.beds} · {item.baths} ·{" "}
            {isEN
              ? `${item.size.toLocaleString("en-US")} sq ft`
              : isFR
                ? `${item.size.toLocaleString("fr-CA")} pi²`
                : `Superficie ${item.size.toLocaleString("en-US")} ft²`}
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <a
              href={`https://wa.me/17864072591?text=${encodeURIComponent(
                isEN
                  ? `Hi Jacquie, I'm interested in ${item.title}.`
                  : isFR
                    ? `Bonjour Jacquie, je suis intéressé par ${item.title}.`
                    : `Hola Jacquie, me interesa ${item.title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              WhatsApp
            </a>

            <Link
              href={`/${locale}/contacto`}
              className="inline-flex h-10 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary"
            >
              {isEN ? "Contact" : isFR ? "Contact" : "Contactar"}
            </Link>
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] bg-black/88 backdrop-blur-sm overflow-y-auto"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={galleryA11y.dialog}
        >
          <div className="min-h-full flex items-start justify-center p-4 sm:p-6">
            <div
              className="relative w-full max-w-6xl pt-20 sm:pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="fixed right-[max(1rem,env(safe-area-inset-right,0px))] top-[max(1rem,env(safe-area-inset-top,0px))] z-[110] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/70 sm:absolute sm:right-0 sm:top-0 sm:z-10 sm:bg-white/10 sm:hover:bg-white/20"
                aria-label={galleryA11y.close}
              >
                ✕
              </button>

              <div className="relative overflow-hidden rounded-[16px] bg-black">
                <Image
                  src={item.images[lightboxIndex]}
                  alt={galleryA11y.imageAlt(lightboxIndex + 1, item.images.length)}
                  width={1600}
                  height={1000}
                  sizes="92vw"
                  quality={85}
                  fetchPriority="high"
                  className="max-h-[58vh] sm:max-h-[78vh] w-full object-contain"
                />

                <div className="absolute bottom-4 right-4 rounded-md bg-black/60 px-3 py-1 text-sm font-medium text-white" aria-live="polite" aria-atomic="true">
                  {lightboxIndex + 1} / {item.images.length}
                </div>

                <button
                  type="button"
                  onClick={showPrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65"
                  aria-label={galleryA11y.previous}
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65"
                  aria-label={galleryA11y.next}
                >
                  ›
                </button>
              </div>

              <div className="mt-4 flex flex-nowrap gap-2 justify-start overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
                {item.images.map((src, index) => (
                  <button
                    key={`${index}-${src}`}
                    type="button"
                    onClick={() => {
                      setLightboxIndex(index);
                      setActiveImage(src);
                    }}
                    aria-label={galleryA11y.openImage(index + 1, item.images.length)}
                    aria-current={index === lightboxIndex ? "true" : undefined}
                    className={`relative shrink-0 h-16 w-20 overflow-hidden rounded-md ring-1 transition focus-visible:ring-2 focus-visible:ring-white ${
                      index === lightboxIndex
                        ? "ring-white"
                        : "ring-white/20 hover:ring-white/50"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      quality={65}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
