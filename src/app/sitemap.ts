import type { MetadataRoute } from "next";
import { ALL_PROJECTS } from "@/data/projects/index";
import { LISTINGS } from "@/data/listings";
import { localizedUrl, SITE_LOCALES, type SiteLocale } from "@/lib/seo";

function localizedEntries(path = ""): MetadataRoute.Sitemap {
  const languages = {
    es: localizedUrl("es", path),
    en: localizedUrl("en", path),
    "fr-CA": localizedUrl("fr", path),
    "x-default": localizedUrl("es", path),
  };

  return SITE_LOCALES.map((locale: SiteLocale) => ({
    url: localizedUrl(locale, path),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "proyectos",
    "listings",
    "financiacion",
    "lets-go-miami",
    "sobre-mi",
    "contacto",
  ];

  const projectEntries = ALL_PROJECTS.flatMap((project) =>
    localizedEntries(project.slug.replace(/^\//, ""))
  );
  const listingEntries = LISTINGS.flatMap((listing) =>
    localizedEntries(`listings/${listing.slug}`)
  );

  return [
    ...staticPaths.flatMap((path) => localizedEntries(path)),
    ...projectEntries,
    ...listingEntries,
  ];
}
