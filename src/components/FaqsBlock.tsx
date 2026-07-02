// src/components/FaqsBlock.tsx
import React from "react";
import type { JSX as JSXNS } from "react";

export type FaqItem = {
  q: string;
  a: React.ReactNode;
  /** Open this item by default */
  defaultOpen?: boolean;
  /** Optional anchor id for direct links */
  id?: string;
};

export default function FaqsBlock({
  id,
  title,
  items,
  headingLevel = "h2",
  className = "",
}: {
  id?: string;
  title?: string;
  items: FaqItem[];
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
}) {
  const HeadingTag = headingLevel as keyof JSXNS.IntrinsicElements;
  return (
    <section id={id} className={"mt-10 rounded-[10px] bg-surface p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-primary/10 text-foreground relative overflow-hidden " + className}>
      <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
      {title ? (
        <HeadingTag className="mb-2.5 flex items-center gap-2 font-display text-[16px] font-medium leading-[1.08] tracking-normal text-primary sm:text-[17px]">
          <svg className="h-4 w-4 shrink-0 -translate-y-[2px] text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v.01M12 8v5" />
          </svg>
          {title}
        </HeadingTag>
      ) : null}

      <div className="mt-3 space-y-2.5">
        {items.map((it, idx) => (
          <details
            key={it.id ?? idx}
            id={it.id}
            open={it.defaultOpen}
            className="group rounded-md border border-primary/10 bg-white/70 p-3 text-foreground transition hover:border-accent/50"
          >
            <summary className="cursor-pointer list-none text-[14px] font-medium text-primary flex items-center justify-between gap-2">
              {it.q}
              <svg className="h-3 w-3 text-primary/70 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="mt-2 text-[14px] leading-[22px] text-foreground/75">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
