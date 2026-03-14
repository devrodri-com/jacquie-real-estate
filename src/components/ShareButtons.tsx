// src/components/ShareButtons.tsx
"use client";

import * as React from "react";
import Image from "next/image";

type Props = {
  url: string; // absolute URL to share
  text?: string; // optional message/caption
  locale?: "es" | "en";
  label?: string; // override button label
  iconSrc?: string;
  className?: string;
  variant?: "light" | "dark"; // light = dark text, dark = white text (for dark hero)
  buttonClassName?: string;
  showSystemShare?: boolean;
};

export default function ShareButtons({
  url,
  text = "",
  locale = "es",
  label,
  iconSrc,
  className = "",
  variant = "light",
  buttonClassName,
  showSystemShare = true,
}: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const wa = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;

  const isDark = variant === "dark";
  const btn = isDark
    ? "h-10 items-center justify-center gap-2 rounded-md border border-white/40 px-4 text-sm font-medium text-white hover:bg-white/10 w-full sm:w-auto"
    : "h-10 items-center justify-center gap-2 rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB] w-full sm:w-auto";

  const title = locale === "en" ? "Share via WhatsApp" : "Compartir por WhatsApp";
  const btnText = label ?? (locale === "en" ? "Share via WhatsApp" : "Compartir por WhatsApp");

  const [canSystemShare, setCanSystemShare] = React.useState(false);
  React.useEffect(() => {
    if (typeof navigator !== "undefined" && (navigator as any).share) setCanSystemShare(true);
  }, []);

  // Desktop media query flag
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(min-width: 640px)");
      const apply = () => setIsDesktop(mq.matches);
      apply();
      mq.addEventListener?.("change", apply);
      return () => mq.removeEventListener?.("change", apply);
    }
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktop && typeof navigator !== "undefined" && (navigator as any).share) {
      e.preventDefault();
      (navigator as any).share({ title: text || document.title, url }).catch(() => {});
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label={title}>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className={`${btn} ${buttonClassName ?? ""} sm:inline-flex hidden`}
        onClick={onClick}
        style={{ display: isDesktop ? undefined : 'none' }}
      >
        {
          iconSrc ? (
            <Image src={iconSrc} alt="" width={16} height={16} className="h-4 w-4" />
          ) : (
            <WhatsAppIcon />
          )
        }
        <span className="leading-none">{btnText}</span>
      </a>
      <button
        type="button"
        onClick={() => (navigator as any).share?.({ title: text || document.title, url }).catch(() => {})}
        className={`inline-flex ${btn}`}
        aria-label={locale === "en" ? "Share" : "Compartir"}
        style={{ display: isDesktop ? (canSystemShare ? undefined : 'none') : undefined }}
      >
        <SystemShareIcon />
        <span className="leading-none">{locale === "en" ? "Share" : "Compartir"}</span>
      </button>
    </div>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {/* outer circle */}
      <circle cx="12" cy="12" r="9" />
      {/* simple handset */}
      <path d="M15.8 14.2l-2-1c-.3-.1-.6 0-.8.2l-.4.6c-1.1-.5-2-1.3-2.6-2.4-.3-.4-.5-.9-.7-1.3l.6-.4c.3-.2.3-.6.2-.8l-1-2c-.2-.4-.7-.5-1.1-.4l-1.3.3c-.4.1-.7.4-.7.8 0 1 .3 2 .8 3 1.7 3.1 4.3 4.5 6.7 5 .4.1.8 0 1-.3l.3-1.3c.1-.4-.1-.8-.4-1z" />
    </svg>
  );
}

function SystemShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 5v10" />
      <path d="M8 9l4-4 4 4" />
      <rect x="4" y="12" width="16" height="8" rx="2" />
    </svg>
  );
}