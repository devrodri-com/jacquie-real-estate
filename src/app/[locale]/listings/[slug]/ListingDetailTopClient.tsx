"use client";

import Link from "next/link";
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
  city,
  item,
  locale,
  isEN,
  isFR,
}: {
  addressDisplay: string;
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

  const openLightbox = (index: number) => {
    if (item.images.length === 0) return;
    const i = Math.min(Math.max(0, index), item.images.length - 1);
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
    return () => {
      document.body.style.overflow = prev;
    };
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
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen, closeLightbox, showPrevImage, showNextImage]);

  return (
    <>
      {/* Compact header */}
      <section className="mb-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {addressDisplay}
        </h1>
        <p className="mt-1 text-[15px] text-foreground/70">{city}</p>

        <p className="mt-1 text-xl font-medium text-primary">
          ${item.price.toLocaleString("en-US")}
        </p>

        <p className="mt-1 text-[14px] text-foreground/70">
          {item.beds} {isEN ? "beds" : isFR ? "chambres" : "hab"} ·{" "}
          {item.baths} {isEN ? "baths" : isFR ? "salles de bain" : "baños"} ·{" "}
          {item.size.toLocaleString("en-US")} sqft · {item.type}
        </p>

        <p className="mt-1 text-[13px] text-foreground/60">
          MLS {item.mls}
        </p>
      </section>

      {/* Main: gallery + sticky card */}
      <section className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {item.images.length > 0 && (
            <>
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] ring-1 ring-black/10 mb-3 cursor-pointer"
                onClick={() =>
                  openLightbox(item.images.findIndex((img) => img === activeImage))
                }
              >
                <img
                  src={activeImage}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                />
                <div className="absolute bottom-3 right-3 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
                  {item.images.findIndex((img) => img === activeImage) + 1} / {item.images.length}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.images.slice(0, 5).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveImage(src);
                      openLightbox(item.images.findIndex((img) => img === src));
                    }}
                    className={`h-20 w-28 overflow-hidden rounded-md ring-1 p-0 border-0 bg-transparent cursor-pointer transition ${
                      activeImage === src
                        ? "ring-primary"
                        : "ring-black/10 hover:ring-primary/50"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover pointer-events-none" />
                  </button>
                ))}

                {item.images.length > 5 && (
                  <button
                    type="button"
                    onClick={() => openLightbox(5)}
                    className="relative h-20 w-28 overflow-hidden rounded-md ring-1 ring-primary/20 bg-primary/[0.06] flex items-center justify-center text-sm font-semibold text-primary hover:bg-primary/[0.12] transition-colors"
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

        <div className="lg:sticky lg:top-24 h-fit rounded-[12px] ring-1 ring-black/10 bg-white p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <p className="text-[12px] uppercase tracking-wide text-primary/70">
            {isEN ? "Active listing" : isFR ? "Annonce active" : "Propiedad activa"}
          </p>

          <p className="mt-1 text-xl font-semibold text-primary">
            ${item.price.toLocaleString("en-US")}
          </p>

          <p className="mt-1 text-[14px] text-foreground/65">
            {item.city}
          </p>

          <p className="mt-2 text-[14px] text-foreground/70">
            {isEN
              ? "I can help you evaluate this property and answer your questions."
              : isFR
                ? "Je peux vous aider à évaluer ce bien et répondre à vos questions."
                : "Te acompaño a evaluar esta propiedad y resolver tus dudas."}
          </p>

          <p className="mt-2 text-[14px] text-foreground/70">
            {item.beds} · {item.baths} · {item.size.toLocaleString("en-US")} sqft
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
          className="fixed inset-0 z-[100] bg-black/88 backdrop-blur-sm overflow-y-auto"
          onClick={closeLightbox}
        >
          <div className="min-h-full flex items-start justify-center p-4 sm:p-6">
            <div
              className="relative w-full max-w-6xl pt-20 sm:pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="fixed right-[max(1rem,env(safe-area-inset-right,0px))] top-[max(1rem,env(safe-area-inset-top,0px))] z-[110] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/70 sm:absolute sm:right-0 sm:top-0 sm:z-10 sm:bg-white/10 sm:hover:bg-white/20"
                aria-label={isEN ? "Close gallery" : isFR ? "Fermer la galerie" : "Cerrar galería"}
              >
                ✕
              </button>

              <div className="relative overflow-hidden rounded-[16px] bg-black">
                <img
                  src={item.images[lightboxIndex]}
                  alt=""
                  className="max-h-[58vh] sm:max-h-[78vh] w-full object-contain"
                />

                <div className="absolute bottom-4 right-4 rounded-md bg-black/60 px-3 py-1 text-sm font-medium text-white">
                  {lightboxIndex + 1} / {item.images.length}
                </div>

                <button
                  type="button"
                  onClick={showPrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65"
                  aria-label={isEN ? "Previous image" : isFR ? "Image précédente" : "Imagen anterior"}
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65"
                  aria-label={isEN ? "Next image" : isFR ? "Image suivante" : "Imagen siguiente"}
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
                    className={`shrink-0 h-16 w-20 overflow-hidden rounded-md ring-1 transition ${
                      index === lightboxIndex
                        ? "ring-white"
                        : "ring-white/20 hover:ring-white/50"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
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
