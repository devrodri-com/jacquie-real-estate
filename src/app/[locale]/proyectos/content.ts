export type ProjectsCatalogLocale = "es" | "en" | "fr";

export type RentalFilterValue =
  | "all"
  | "No restr."
  | "30 días"
  | "60 días"
  | "90 días"
  | "6 meses";

export type ProjectSortValue =
  | "alpha-asc"
  | "alpha-desc"
  | "price-asc"
  | "price-desc";

export type CatalogProjectItem = {
  id: string;
  name: string;
  city: string;
  delivery?: string;
  priceFromUsd?: number;
  rentalPolicy?: string;
  rentalCategory: Exclude<RentalFilterValue, "all"> | null;
  unitTypes: string[];
  image: string;
  slug: string;
};

type ProjectsCatalogCopy = {
  header: {
    eyebrow: string;
    title: string;
    intro: string;
    catalogLabel: (count: number) => string;
    scopeLabel: string;
    scopeValue: string;
    compareLabel: string;
    compareValue: string;
  };
  filters: {
    title: string;
    button: string;
    showAria: string;
    hideAria: string;
    searchLabel: string;
    searchPlaceholder: string;
    rentalLabel: string;
    rentalOptions: Record<RentalFilterValue, string>;
    minBudget: string;
    maxBudget: string;
    minPlaceholder: string;
    maxPlaceholder: string;
    priceHint: string;
    rangeError: string;
    sortLabel: string;
    sortOptions: Record<ProjectSortValue, string>;
    activeLabel: string;
    activeCount: (count: number) => string;
    removeFilterAria: (label: string) => string;
    reset: string;
  };
  results: {
    label: string;
    count: (count: number) => string;
    showing: (visible: number, total: number) => string;
    emptyTitle: string;
    emptyBody: string;
    showMore: string;
  };
  card: {
    from: string;
    inquire: string;
    rental: string;
    residenceTypes: string;
    viewProject: string;
  };
  close: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    whatsappMessage: string;
  };
};

export const PROJECTS_CATALOG_COPY: Record<
  ProjectsCatalogLocale,
  ProjectsCatalogCopy
> = {
  es: {
    header: {
      eyebrow: "CATÁLOGO DE PROYECTOS",
      title: "Explora proyectos de preconstrucción",
      intro:
        "Compara proyectos en Miami, Orlando y otras zonas de Florida según ubicación, precio inicial, entrega, condiciones de renta y tipologías. Usa los filtros y abre cada proyecto para conocer sus detalles.",
      catalogLabel: (count) =>
        count === 1 ? "proyecto en el catálogo" : "proyectos en el catálogo",
      scopeLabel: "Zonas",
      scopeValue: "Miami · Orlando · otras zonas de Florida",
      compareLabel: "Comparar por",
      compareValue:
        "Ubicación · Precio inicial · Entrega · Renta · Tipologías",
    },
    filters: {
      title: "Filtrar proyectos",
      button: "Filtros",
      showAria: "Mostrar filtros",
      hideAria: "Ocultar filtros",
      searchLabel: "Proyecto o zona",
      searchPlaceholder: "Busca por nombre o zona",
      rentalLabel: "Condiciones de renta",
      rentalOptions: {
        all: "Todas las condiciones",
        "No restr.": "Sin restricciones",
        "30 días": "30 días",
        "60 días": "60 días",
        "90 días": "90 días",
        "6 meses": "6 meses",
      },
      minBudget: "Presupuesto mínimo",
      maxBudget: "Presupuesto máximo",
      minPlaceholder: "500",
      maxPlaceholder: "800",
      priceHint: "Montos en miles de USD (500 = USD 500.000).",
      rangeError: "El presupuesto mínimo no puede superar el máximo.",
      sortLabel: "Ordenar por",
      sortOptions: {
        "alpha-asc": "Nombre: A–Z",
        "alpha-desc": "Nombre: Z–A",
        "price-asc": "Menor precio",
        "price-desc": "Mayor precio",
      },
      activeLabel: "Filtros activos",
      activeCount: (count) =>
        count === 0
          ? "Sin filtros activos"
          : `${count} ${count === 1 ? "filtro activo" : "filtros activos"}`,
      removeFilterAria: (label) => `Eliminar filtro ${label}`,
      reset: "Limpiar filtros",
    },
    results: {
      label: "Resultados",
      count: (count) => `${count} ${count === 1 ? "proyecto" : "proyectos"}`,
      showing: (visible, total) =>
        `Mostrando ${visible} de ${total} ${total === 1 ? "proyecto" : "proyectos"}`,
      emptyTitle: "No encontramos proyectos con esos filtros.",
      emptyBody:
        "Cambia la búsqueda o limpia los filtros para volver a ver el catálogo.",
      showMore: "Ver más proyectos",
    },
    card: {
      from: "Desde",
      inquire: "Consultar",
      rental: "Renta",
      residenceTypes: "Tipologías",
      viewProject: "Ver proyecto",
    },
    close: {
      eyebrow: "AYUDA PARA COMPARAR",
      title: "¿No sabes qué proyectos comparar?",
      text:
        "Cuéntame qué estás buscando, tu presupuesto aproximado y las zonas que te interesan. Podemos ordenar la comparación y revisar qué información necesitas antes de avanzar.",
      cta: "Hablar con Jacquie",
      whatsappMessage:
        "Hola Jacquie, estoy comparando proyectos de preconstrucción y quiero contarte qué estoy buscando.",
    },
  },
  en: {
    header: {
      eyebrow: "PROJECT CATALOG",
      title: "Explore preconstruction projects",
      intro:
        "Compare projects in Miami, Orlando, and other areas of Florida by location, starting price, delivery, rental terms, and residence type. Use the filters, then open any project for details.",
      catalogLabel: (count) =>
        count === 1 ? "project in the catalog" : "projects in the catalog",
      scopeLabel: "Areas",
      scopeValue: "Miami · Orlando · other areas of Florida",
      compareLabel: "Compare by",
      compareValue:
        "Location · Starting price · Delivery · Rental · Residence type",
    },
    filters: {
      title: "Filter projects",
      button: "Filters",
      showAria: "Show filters",
      hideAria: "Hide filters",
      searchLabel: "Project or area",
      searchPlaceholder: "Search by name or area",
      rentalLabel: "Rental terms",
      rentalOptions: {
        all: "Any rental terms",
        "No restr.": "No restrictions",
        "30 días": "30 days",
        "60 días": "60 days",
        "90 días": "90 days",
        "6 meses": "6 months",
      },
      minBudget: "Minimum budget",
      maxBudget: "Maximum budget",
      minPlaceholder: "500",
      maxPlaceholder: "800",
      priceHint: "Amounts in thousands of USD (500 = USD 500,000).",
      rangeError: "The minimum budget cannot be higher than the maximum.",
      sortLabel: "Sort by",
      sortOptions: {
        "alpha-asc": "Name: A–Z",
        "alpha-desc": "Name: Z–A",
        "price-asc": "Lowest price",
        "price-desc": "Highest price",
      },
      activeLabel: "Active filters",
      activeCount: (count) =>
        count === 0
          ? "No active filters"
          : `${count} active ${count === 1 ? "filter" : "filters"}`,
      removeFilterAria: (label) => `Remove ${label} filter`,
      reset: "Clear filters",
    },
    results: {
      label: "Results",
      count: (count) => `${count} ${count === 1 ? "project" : "projects"}`,
      showing: (visible, total) =>
        `Showing ${visible} of ${total} ${total === 1 ? "project" : "projects"}`,
      emptyTitle: "No projects match those filters.",
      emptyBody:
        "Change your search or clear the filters to view the catalog again.",
      showMore: "View more projects",
    },
    card: {
      from: "From",
      inquire: "Inquire",
      rental: "Rental",
      residenceTypes: "Residence types",
      viewProject: "View project",
    },
    close: {
      eyebrow: "HELP WITH YOUR COMPARISON",
      title: "Not sure which projects to compare?",
      text:
        "Share what you’re looking for, your approximate budget, and the areas that interest you. We can organize the comparison and review what information you need before moving forward.",
      cta: "Talk with Jacquie",
      whatsappMessage:
        "Hi Jacquie, I’m comparing preconstruction projects and would like to tell you what I’m looking for.",
    },
  },
  fr: {
    header: {
      eyebrow: "CATALOGUE DE PROJETS",
      title: "Explorez les projets en préconstruction",
      intro:
        "Comparez les projets à Miami, à Orlando et ailleurs en Floride selon l’emplacement, le prix de départ, la livraison, les conditions de location et le type de résidence. Utilisez les filtres, puis consultez chaque projet pour en voir les détails.",
      catalogLabel: (count) =>
        count === 1 ? "projet au catalogue" : "projets au catalogue",
      scopeLabel: "Secteurs",
      scopeValue: "Miami · Orlando · autres secteurs de la Floride",
      compareLabel: "Comparer selon",
      compareValue:
        "Emplacement · Prix de départ · Livraison · Location · Type de résidence",
    },
    filters: {
      title: "Filtrer les projets",
      button: "Filtres",
      showAria: "Afficher les filtres",
      hideAria: "Masquer les filtres",
      searchLabel: "Projet ou secteur",
      searchPlaceholder: "Rechercher par nom ou secteur",
      rentalLabel: "Conditions de location",
      rentalOptions: {
        all: "Toutes les conditions",
        "No restr.": "Aucune restriction",
        "30 días": "30 jours",
        "60 días": "60 jours",
        "90 días": "90 jours",
        "6 meses": "6 mois",
      },
      minBudget: "Budget minimal",
      maxBudget: "Budget maximal",
      minPlaceholder: "500",
      maxPlaceholder: "800",
      priceHint: "Montants en milliers de dollars US (500 = 500 000 $ US).",
      rangeError: "Le budget minimal ne peut pas dépasser le budget maximal.",
      sortLabel: "Trier par",
      sortOptions: {
        "alpha-asc": "Nom : A–Z",
        "alpha-desc": "Nom : Z–A",
        "price-asc": "Prix le plus bas",
        "price-desc": "Prix le plus élevé",
      },
      activeLabel: "Filtres actifs",
      activeCount: (count) =>
        count === 0
          ? "Aucun filtre actif"
          : `${count} ${count === 1 ? "filtre actif" : "filtres actifs"}`,
      removeFilterAria: (label) => `Retirer le filtre ${label}`,
      reset: "Effacer les filtres",
    },
    results: {
      label: "Résultats",
      count: (count) => `${count} ${count === 1 ? "projet" : "projets"}`,
      showing: (visible, total) =>
        `Affichage de ${visible} ${visible === 1 ? "projet" : "projets"} sur ${total}`,
      emptyTitle: "Aucun projet ne correspond à ces filtres.",
      emptyBody:
        "Modifiez votre recherche ou effacez les filtres pour afficher de nouveau le catalogue.",
      showMore: "Voir plus de projets",
    },
    card: {
      from: "À partir de",
      inquire: "Nous consulter",
      rental: "Location",
      residenceTypes: "Types de résidences",
      viewProject: "Voir le projet",
    },
    close: {
      eyebrow: "AIDE À LA COMPARAISON",
      title: "Vous ne savez pas quels projets comparer?",
      text:
        "Parlez-moi de ce que vous recherchez, de votre budget approximatif et des secteurs qui vous intéressent. Nous pouvons organiser la comparaison et préciser les renseignements à examiner avant d’aller plus loin.",
      cta: "Parler avec Jacquie",
      whatsappMessage:
        "Bonjour Jacquie, je compare des projets en préconstruction et j’aimerais vous expliquer ce que je recherche.",
    },
  },
};
