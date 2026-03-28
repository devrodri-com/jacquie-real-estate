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
    <section id={id} className={"mt-10 rounded-[10px] bg-primary p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-primary-foreground/10 text-primary-foreground relative overflow-hidden " + className}>
      <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      {title ? (
        <HeadingTag className="mb-2.5 flex items-center gap-2 text-[16px] sm:text-[17px] font-semibold tracking-tight text-primary-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
            className="group rounded-md border border-primary-foreground/10 bg-transparent p-3 text-primary-foreground hover:border-accent/40 transition"
          >
            <summary className="cursor-pointer list-none text-[14px] font-medium text-primary-foreground/95 flex items-center justify-between gap-2">
              {it.q}
              <svg className="h-3 w-3 text-primary-foreground/80 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="mt-2 text-[14px] leading-[22px] text-primary-foreground/85">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}