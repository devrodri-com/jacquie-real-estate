import Image from "next/image";
import Link from "next/link";
import {
  PROJECTS_CATALOG_COPY,
  type CatalogProjectItem,
  type ProjectsCatalogLocale,
} from "./content";

type ProjectCatalogCardProps = {
  project: CatalogProjectItem;
  locale: ProjectsCatalogLocale;
  visible: boolean;
  priority: boolean;
};

export function ProjectCatalogCard({
  project,
  locale,
  visible,
  priority,
}: ProjectCatalogCardProps) {
  const copy = PROJECTS_CATALOG_COPY[locale].card;
  const numberLocale = locale === "en" ? "en-US" : locale === "fr" ? "fr-CA" : "es-ES";
  const price =
    typeof project.priceFromUsd === "number"
      ? new Intl.NumberFormat(numberLocale, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(project.priceFromUsd)
      : undefined;

  return (
    <article className="h-full min-w-0 overflow-hidden rounded-[12px] border border-primary/12 bg-paper transition-colors duration-300 hover:border-primary/30 focus-within:border-primary/35">
      <Link
        href={`/${locale}${project.slug}`}
        prefetch={false}
        data-project-link
        className="group flex h-full min-w-0 flex-col rounded-[11px] text-foreground no-underline outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface">
          {visible ? (
            <Image
              src={project.image}
              alt=""
              fill
              data-project-image
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none"
              sizes="(min-width: 1280px) 356px, (min-width: 1180px) 546px, (min-width: 768px) calc(50vw - 44px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              quality={priority ? 75 : 65}
              priority={priority}
              decoding="async"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <p className="min-w-0 break-words text-[12px] font-semibold uppercase tracking-[0.12em] text-primary/72">
            {project.city}
          </p>
          <h3 className="mt-2 min-w-0 break-words font-display text-[27px] font-medium leading-[1.04] text-primary sm:text-[29px]">
            {project.name}
          </h3>

          <p className="mt-4 text-[17px] font-semibold leading-6 text-primary">
            {price ? `${copy.from} ${price}` : copy.inquire}
          </p>

          <dl className="mt-5 grid gap-4 border-t border-primary/10 pt-4 text-[14px] leading-[1.55]">
            <div className="grid min-w-0 grid-cols-[84px_minmax(0,1fr)] gap-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-primary/72">
                {copy.delivery}
              </dt>
              <dd className="min-w-0 break-words text-foreground/78">
                {project.delivery || copy.deliveryFallback}
              </dd>
            </div>
            <div className="grid min-w-0 grid-cols-[84px_minmax(0,1fr)] gap-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-primary/72">
                {copy.rental}
              </dt>
              <dd className="min-w-0 break-words text-foreground/78">
                {project.rentalPolicy || copy.rentalFallback}
              </dd>
            </div>
          </dl>

          <span
            data-project-cta
            className="mt-auto inline-flex min-h-11 w-full items-end justify-between gap-3 border-t border-primary/10 pt-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary"
          >
            <span className="underline decoration-primary/25 underline-offset-4 transition-colors group-hover:decoration-primary">
              {copy.viewProject}
            </span>
            <span aria-hidden="true" className="text-base leading-none">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
