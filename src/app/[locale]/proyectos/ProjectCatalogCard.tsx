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
  const displayedUnitTypes = project.unitTypes.slice(0, 3);
  const remainingUnitTypes = Math.max(
    0,
    project.unitTypes.length - displayedUnitTypes.length
  );

  return (
    <article className="h-full min-w-0">
      <Link
        href={`/${locale}${project.slug}`}
        prefetch={false}
        data-project-link
        className="group flex h-full min-w-0 flex-col text-foreground no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[4px] bg-surface">
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

        <div className="flex flex-1 flex-col border-b border-primary/18 pb-5 pt-5">
          <p className="min-w-0 break-words text-[12px] font-semibold uppercase tracking-[0.12em] text-primary/72">
            {project.city}
          </p>
          <h2 className="mt-2 min-w-0 break-words font-display text-[27px] font-medium leading-[1.04] text-primary sm:text-[29px]">
            {project.name}
          </h2>

          <p className="mt-4 text-[17px] font-semibold leading-6 text-primary">
            {price ? `${copy.from} ${price}` : copy.inquire}
          </p>

          <dl className="mt-5 space-y-4 border-y border-primary/10 py-4 text-[14px] leading-[1.55]">
            {project.delivery ? (
              <div className="grid min-w-0 grid-cols-[112px_minmax(0,1fr)] gap-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-primary/72">
                  {copy.delivery}
                </dt>
                <dd className="min-w-0 break-words text-foreground/78">
                  {project.delivery}
                </dd>
              </div>
            ) : null}
            {project.rentalPolicy ? (
              <div className="grid min-w-0 grid-cols-[112px_minmax(0,1fr)] gap-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-primary/72">
                  {copy.rental}
                </dt>
                <dd className="min-w-0 break-words text-foreground/78">
                  {project.rentalPolicy}
                </dd>
              </div>
            ) : null}
            {displayedUnitTypes.length > 0 ? (
              <div className="grid min-w-0 grid-cols-[112px_minmax(0,1fr)] gap-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-primary/72">
                  {copy.configurations}
                </dt>
                <dd className="min-w-0 break-words text-foreground/78">
                  {displayedUnitTypes.join(" · ")}
                  {remainingUnitTypes > 0
                    ? ` · ${copy.moreConfigurations(remainingUnitTypes)}`
                    : ""}
                </dd>
              </div>
            ) : null}
          </dl>

          <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary underline decoration-primary/25 underline-offset-4 transition-colors group-hover:decoration-primary">
            {copy.viewProject}
            <span aria-hidden="true" className="text-base leading-none">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
