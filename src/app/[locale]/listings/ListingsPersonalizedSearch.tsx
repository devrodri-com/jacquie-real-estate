import Link from "next/link";
import {
  buildJacquieWhatsAppHref,
  type SiteLocale,
} from "@/lib/whatsapp";
import type { ListingsCopy } from "./content";

type ListingsPersonalizedSearchProps = {
  locale: SiteLocale;
  copy: ListingsCopy["search"];
};

export function ListingsPersonalizedSearch({
  locale,
  copy,
}: ListingsPersonalizedSearchProps) {
  const whatsAppHref = buildJacquieWhatsAppHref(locale, copy.whatsAppMessage);

  return (
    <section
      id="personalized-search"
      aria-labelledby="personalized-search-title"
      className="relative left-1/2 mt-16 w-screen -translate-x-1/2 border-y border-primary/10 bg-paper sm:mt-20 lg:mt-24"
    >
      <div className="relative mx-auto grid max-w-6xl gap-10 overflow-hidden px-4 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 lg:py-20">
        <div className="relative min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/75">
            {copy.eyebrow}
          </p>
          <h2
            id="personalized-search-title"
            className="mt-3 max-w-[18ch] font-display text-[38px] font-medium leading-[1.03] tracking-[-0.02em] text-primary sm:text-[48px]"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-7 text-foreground/80">
            {copy.body}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[4px] bg-primary px-5 py-3 text-center text-[14px] font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
            >
              {copy.primaryCta}
            </a>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[4px] border border-primary/25 px-5 py-3 text-center text-[14px] font-semibold text-primary no-underline transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 lg:border-l lg:border-primary/12 lg:pl-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary/70">
            {copy.criteriaLabel}
          </p>
          <ul className="mt-4 border-t border-primary/15">
            {copy.criteria.map((criterion, index) => (
              <li
                key={criterion}
                className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 border-b border-primary/10 py-3.5 text-[15px] text-primary"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[17px] text-primary/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
