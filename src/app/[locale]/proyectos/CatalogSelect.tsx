"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

type CatalogSelectOption<T extends string> = {
  value: T;
  label: string;
};

type CatalogSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly CatalogSelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export function CatalogSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  className = "",
}: CatalogSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const labelId = useId();
  const listboxId = useId();
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const selectedLabel = options[selectedIndex]?.label ?? "";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const openFromTrigger = (index = selectedIndex) => {
    setOpen(true);
    requestAnimationFrame(() => optionRefs.current[index]?.focus());
  };

  const closeAndRestoreFocus = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const selectOption = (option: CatalogSelectOption<T>) => {
    onChange(option.value);
    closeAndRestoreFocus();
  };

  const onTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openFromTrigger(selectedIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openFromTrigger(selectedIndex);
    } else if (event.key === "Home") {
      event.preventDefault();
      openFromTrigger(0);
    } else if (event.key === "End") {
      event.preventDefault();
      openFromTrigger(options.length - 1);
    }
  };

  const onOptionKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
    option: CatalogSelectOption<T>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      optionRefs.current[(index + 1) % options.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      optionRefs.current[(index - 1 + options.length) % options.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      optionRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      optionRefs.current[options.length - 1]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestoreFocus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(option);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative min-w-0 ${className}`}>
      <span
        id={labelId}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/68"
      >
        {label}
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-labelledby={`${labelId} ${listboxId}-value`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => {
          if (open) setOpen(false);
          else openFromTrigger();
        }}
        onKeyDown={onTriggerKeyDown}
        className="flex min-h-11 w-full min-w-0 items-center justify-between gap-3 border-b border-primary/25 bg-transparent py-2 text-left text-[14px] font-medium leading-5 text-primary outline-none transition-colors hover:border-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span id={`${listboxId}-value`} className="min-w-0 break-words">
          {selectedLabel}
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ul
        id={listboxId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!open}
        className="absolute left-0 top-full z-40 mt-2 max-h-64 w-full min-w-[220px] overflow-y-auto border border-primary/15 bg-paper py-1 shadow-[0_18px_38px_rgba(43,37,48,0.14)]"
      >
        {options.map((option, index) => (
          <li key={option.value} role="none">
            <button
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              tabIndex={-1}
              onClick={() => selectOption(option)}
              onKeyDown={(event) => onOptionKeyDown(event, index, option)}
              className={`flex min-h-11 w-full items-center border-l-2 px-4 py-2 text-left text-sm leading-5 outline-none transition-colors focus-visible:bg-surface focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                option.value === value
                  ? "border-primary bg-surface font-semibold text-primary"
                  : "border-transparent text-foreground/82 hover:bg-surface"
              }`}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
