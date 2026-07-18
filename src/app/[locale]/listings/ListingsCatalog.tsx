import type { SiteLocale } from "@/lib/whatsapp";
import {
  ListingCatalogCard,
  type ListingCatalogItem,
} from "./ListingCatalogCard";
import { ListingsPersonalizedSearch } from "./ListingsPersonalizedSearch";
import type { ListingsCopy } from "./content";

type ListingsCatalogProps = {
  items: readonly ListingCatalogItem[];
  locale: SiteLocale;
  copy: ListingsCopy;
};

export function ListingsCatalog({ items, locale, copy }: ListingsCatalogProps) {
  const listingCount = items.length;
  const hasListings = listingCount > 0;
  const singleListing = listingCount === 1;

  return (
    <div className="-mb-8 sm:-mb-6">
      <header className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-primary/10 bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-8 size-72 rounded-full border border-accent/15 sm:-right-10 sm:size-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-12 top-32 size-32 rounded-full bg-accent/[0.07] blur-2xl sm:right-32"
        />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-end lg:gap-16 lg:py-24">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.21em] text-primary/75">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 max-w-[16ch] text-balance font-display text-[46px] font-medium leading-[0.96] tracking-[-0.025em] text-primary sm:text-[60px] lg:text-[72px]">
              {copy.title}
            </h1>
          </div>

          <div className="min-w-0 border-l border-accent/45 pl-5 sm:pl-6">
            <p className="max-w-[58ch] text-[16px] leading-7 text-foreground/82">
              {copy.intro}
            </p>
            <p className="mt-5 max-w-[58ch] text-[13px] leading-6 text-primary/70">
              {copy.availabilityNote}
            </p>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="published-listings-title"
        className="mt-14 sm:mt-18 lg:mt-20"
      >
        <div className="flex flex-col gap-4 border-b border-primary/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="published-listings-title"
            className="font-display text-[36px] font-medium leading-none tracking-[-0.02em] text-primary sm:text-[44px]"
          >
            {copy.inventoryTitle}
          </h2>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary/70">
            {copy.inventoryCount(listingCount)}
          </p>
        </div>

        {hasListings ? (
          <div
            className={`mt-7 grid gap-6 sm:mt-8 lg:gap-7 ${
              singleListing ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {items.map((item, index) => (
              <ListingCatalogCard
                key={item.id}
                item={item}
                locale={locale}
                copy={copy.card}
                priority={index === 0}
                layout={singleListing ? "single" : "grid"}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-7 border-b border-primary/15 py-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:py-11">
            <div className="min-w-0">
              <h3 className="max-w-[28ch] font-display text-[29px] font-medium leading-[1.08] text-primary sm:text-[34px]">
                {copy.emptyTitle}
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-7 text-foreground/78">
                {copy.emptyBody}
              </p>
            </div>
            <a
              href="#personalized-search"
              className="inline-flex min-h-11 items-center justify-between gap-4 border-b border-primary/30 py-2 text-[14px] font-semibold text-primary no-underline hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {copy.emptyLink}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}
      </section>

      <ListingsPersonalizedSearch locale={locale} copy={copy.search} />
    </div>
  );
}
