"use client";

import { useId, useState, type SyntheticEvent } from "react";

type ProjectFaqItem = Readonly<{
  q: string;
  a: string;
}>;

type ProjectFaqLabels = Readonly<{
  open: string;
  close: string;
}>;

function ProjectFaqRow({
  item,
  index,
  labels,
}: {
  item: ProjectFaqItem;
  index: number;
  labels: ProjectFaqLabels;
}) {
  const reactId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `${reactId}-answer`;

  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(event.currentTarget.open);
  };

  return (
    <details
      onToggle={handleToggle}
      className="group border-t border-primary/15 first:border-t-0"
    >
      <summary
        aria-controls={answerId}
        aria-expanded={isOpen}
        aria-label={`${String(index + 1).padStart(2, "0")} ${item.q} — ${
          isOpen ? labels.close : labels.open
        }`}
        className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-[15px] font-semibold leading-6 text-primary marker:content-none sm:text-[16px] [&::-webkit-details-marker]:hidden"
      >
        <span className="flex min-w-0 items-baseline gap-4">
          <span
            aria-hidden
            className="hidden w-6 shrink-0 text-[10px] font-semibold tabular-nums tracking-[0.14em] text-primary/70 sm:inline"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item.q}</span>
        </span>
        <span
          aria-hidden
          className="relative h-8 w-8 shrink-0 rounded-full border border-primary/20 transition-colors group-open:bg-primary group-open:text-primary-foreground motion-reduce:transition-none"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0 motion-reduce:transition-none" />
        </span>
      </summary>
      <div
        id={answerId}
        className="pb-4 pr-2 text-[14px] leading-[1.7] text-foreground/76 sm:ml-10 sm:max-w-[72ch] sm:pb-5 sm:pr-14 sm:text-[15px]"
      >
        <p>{item.a}</p>
      </div>
    </details>
  );
}

export default function ProjectFaq({
  items,
  labels,
}: {
  items: readonly ProjectFaqItem[];
  labels: ProjectFaqLabels;
}) {
  return (
    <div className="border-b border-primary/15">
      {items.map((item, index) => (
        <ProjectFaqRow
          key={`${index}-${item.q}`}
          item={item}
          index={index}
          labels={labels}
        />
      ))}
    </div>
  );
}
