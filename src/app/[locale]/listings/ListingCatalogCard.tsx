import Image from "next/image";
import Link from "next/link";
import type { SiteLocale } from "@/lib/whatsapp";
import type { ListingsCopy } from "./content";

export type ListingCatalogItem = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly city: string;
  readonly price: number;
  readonly beds: number;
  readonly baths: number;
  readonly size: number;
  readonly mls: string;
  readonly images: readonly string[];
};

type ListingCatalogCardProps = {
  item: ListingCatalogItem;
  locale: SiteLocale;
  copy: ListingsCopy["card"];
  priority?: boolean;
  layout?: "grid" | "single";
};

function quantityLabel(
  value: number,
  labels: [singular: string, plural: string]
) {
  return `${value} ${value === 1 ? labels[0] : labels[1]}`;
}

export function ListingCatalogCard({
  item,
  locale,
  copy,
  priority = false,
  layout = "grid",
}: ListingCatalogCardProps) {
  const isSingle = layout === "single";
  const detailHref = `/${locale}/listings/${item.slug}`;

  return (
    <article className={isSingle ? "max-w-[860px]" : "h-full min-w-0"}>
      <Link
        href={detailHref}
        aria-label={copy.ariaLabel(item.title)}
        className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-[6px] border border-primary/15 bg-paper text-foreground no-underline transition-colors duration-300 hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
          isSingle
            ? "lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]"
            : ""
        }`}
      >
        <div
          className={`relative min-w-0 overflow-hidden bg-placeholder ${
            isSingle ? "aspect-[16/10] lg:aspect-auto lg:min-h-[360px]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={item.images[0]}
            alt={`${item.title}, ${item.city}`}
            fill
            sizes={
              isSingle
                ? "(min-width: 1024px) 540px, calc(100vw - 32px)"
                : "(min-width: 1152px) 548px, (min-width: 1024px) calc((100vw - 56px) / 2), calc(100vw - 32px)"
            }
            quality={priority ? 75 : 65}
            priority={priority}
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.018] motion-safe:group-focus-visible:scale-[1.018]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/15 to-transparent"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
            {item.city}
          </p>
          <h3
            className={`mt-2 break-words font-display text-[27px] font-medium leading-[1.08] tracking-[-0.01em] text-primary sm:text-[30px] ${
              isSingle ? "" : "lg:min-h-[3.25rem]"
            }`}
          >
            {item.title}
          </h3>

          <p className="mt-4 text-[21px] font-semibold tracking-[-0.02em] text-primary sm:text-[22px]">
            ${item.price.toLocaleString("en-US")}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-y border-primary/10 py-3 text-[13px] leading-5 text-primary/75 sm:text-[14px]">
            <li>{quantityLabel(item.beds, copy.bedroom)}</li>
            <li aria-hidden="true">·</li>
            <li>{quantityLabel(item.baths, copy.bathroom)}</li>
            <li aria-hidden="true">·</li>
            <li>
              {item.size.toLocaleString("en-US")} {copy.area}
            </li>
          </ul>

          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-primary/70">
            {copy.mls} {item.mls}
          </p>

          <span className="mt-auto flex min-h-11 items-end justify-between gap-4 pt-7 text-[14px] font-semibold text-primary">
            <span className="border-b border-primary/35 pb-0.5 transition-colors group-hover:border-primary">
              {copy.cta}
            </span>
            <span aria-hidden="true" className="pb-0.5 text-lg leading-none">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
