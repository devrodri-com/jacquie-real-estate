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
  const delivery = project.delivery || copy.deliveryFallback;
  const rental = project.rentalPolicy || copy.rentalFallback;

  return (
    <article className="h-full min-w-0 overflow-hidden rounded-[12px] border border-primary/18 bg-paper shadow-[0_10px_28px_rgba(59,39,74,0.045)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-px hover:border-primary/32 hover:shadow-[0_14px_32px_rgba(59,39,74,0.07)] focus-within:border-primary/35 motion-reduce:transform-none">
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
          <header className="min-w-0" data-project-identity>
            <p
              data-project-location
              title={project.city}
              className="line-clamp-2 min-w-0 break-words text-[12px] font-semibold uppercase leading-4 tracking-[0.12em] text-primary/72 md:min-h-8"
            >
              {project.city}
            </p>
            <h3
              data-project-title
              title={project.name}
              className="mt-2 line-clamp-2 min-w-0 break-words font-display text-[27px] font-medium leading-[1.04] text-primary sm:text-[29px] md:min-h-[2.08em]"
            >
              {project.name}
            </h3>
          </header>

          <div className="mt-4 min-w-0" data-project-commercial>
            <p
              data-project-price
              className="min-h-6 text-[17px] font-semibold leading-6 text-primary"
            >
              {price ? `${copy.from} ${price}` : copy.inquire}
            </p>

            <dl
              data-project-metadata
              className="mt-4 grid grid-cols-2 items-start border-t border-primary/10 pt-3 text-[14px]"
            >
              <div className="min-w-0 pr-3 sm:pr-4">
                <dt className="text-[10px] font-semibold uppercase leading-4 tracking-[0.13em] text-primary/72">
                  {copy.delivery}
                </dt>
                <dd
                  title={delivery}
                  className="mt-1.5 line-clamp-2 min-h-10 min-w-0 break-words leading-5 text-foreground/78"
                >
                  {delivery}
                </dd>
              </div>
              <div className="min-w-0 border-l border-primary/10 pl-3 sm:pl-4">
                <dt className="text-[10px] font-semibold uppercase leading-4 tracking-[0.13em] text-primary/72">
                  {copy.rental}
                </dt>
                <dd
                  title={rental}
                  className="mt-1.5 line-clamp-2 min-h-10 min-w-0 break-words leading-5 text-foreground/78"
                >
                  {rental}
                </dd>
              </div>
            </dl>
          </div>

          <footer
            data-project-cta
            className="mt-auto flex min-h-11 w-full items-end justify-between gap-3 border-t border-primary/10 pt-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary"
          >
            <span className="underline decoration-primary/25 underline-offset-4 transition-colors group-hover:decoration-primary">
              {copy.viewProject}
            </span>
            <span aria-hidden="true" className="text-base leading-none">
              →
            </span>
          </footer>
        </div>
      </Link>
    </article>
  );
}
