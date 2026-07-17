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
    availabilityLabel: string;
    availabilityValue: string;
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
    title: string;
    summary: (total: number, visible: number) => string;
    showing: (visible: number, total: number) => string;
    emptyTitle: string;
    emptyBody: string;
    showMore: string;
  };
  card: {
    from: string;
    inquire: string;
    delivery: string;
    deliveryFallback: string;
    rental: string;
    rentalFallback: string;
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
        "Explora y compara proyectos de preconstrucción disponibles actualmente en Miami, Orlando y otras zonas de Florida según ubicación, precio inicial, entrega, condiciones de renta y tipologías.",
      availabilityLabel: "Disponibilidad",
      availabilityValue:
        "El catálogo se actualiza a medida que cambian las opciones disponibles.",
      scopeLabel: "Zonas",
      scopeValue: "Miami · Orlando · otras zonas de Florida",
      compareLabel: "Comparar por",
      compareValue:
        "Ubicación · Precio inicial · Entrega · Renta · Tipologías",
    },
    filters: {
      title: "Buscar y filtrar proyectos",
      button: "Filtrar proyectos",
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
      title: "Proyectos disponibles",
      summary: (total, visible) =>
        `${total} ${total === 1 ? "resultado" : "resultados"} · Mostrando ${visible}`,
      showing: (visible, total) =>
        `Mostrando ${visible} de ${total} ${total === 1 ? "proyecto" : "proyectos"}`,
      emptyTitle: "No encontramos proyectos con esos filtros.",
      emptyBody:
        "Cambia la búsqueda o limpia los filtros para volver a ver el catálogo.",
      showMore: "Ver más proyectos",
    },
    card: {
      from: "Desde",
      inquire: "Precio a consultar",
      delivery: "Entrega",
      deliveryFallback: "A consultar",
      rental: "Renta",
      rentalFallback: "Consultar condiciones",
      viewProject: "Ver proyecto",
    },
    close: {
      eyebrow: "AYUDA PARA COMPARAR",
      title: "¿No sabes qué proyectos comparar?",
      text:
        "Cuéntame tu objetivo, tu presupuesto aproximado y las zonas que te interesan. Podemos ordenar la comparación y revisar qué información necesitas antes de avanzar.",
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
        "Explore and compare currently available preconstruction projects in Miami, Orlando, and other areas of Florida by location, starting price, delivery, rental terms, and residence types.",
      availabilityLabel: "Availability",
      availabilityValue:
        "The catalog is updated as available options change.",
      scopeLabel: "Areas",
      scopeValue: "Miami · Orlando · other areas of Florida",
      compareLabel: "Compare by",
      compareValue:
        "Location · Starting price · Delivery · Rental · Residence type",
    },
    filters: {
      title: "Search and filter projects",
      button: "Filter projects",
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
      title: "Available projects",
      summary: (total, visible) =>
        `${total} ${total === 1 ? "result" : "results"} · Showing ${visible}`,
      showing: (visible, total) =>
        `Showing ${visible} of ${total} ${total === 1 ? "project" : "projects"}`,
      emptyTitle: "No projects match those filters.",
      emptyBody:
        "Change your search or clear the filters to view the catalog again.",
      showMore: "View more projects",
    },
    card: {
      from: "From",
      inquire: "Price upon request",
      delivery: "Delivery",
      deliveryFallback: "To be confirmed",
      rental: "Rental",
      rentalFallback: "Ask about rental terms",
      viewProject: "View project",
    },
    close: {
      eyebrow: "HELP WITH YOUR COMPARISON",
      title: "Not sure which projects to compare?",
      text:
        "Share your goal, approximate budget, and the areas that interest you. We can organize the comparison and review what information you need before moving forward.",
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
        "Explorez et comparez les projets de préconstruction actuellement disponibles à Miami, à Orlando et ailleurs en Floride selon l’emplacement, le prix de départ, la date de livraison, les conditions de location et les types de résidences.",
      availabilityLabel: "Disponibilité",
      availabilityValue:
        "Le catalogue est mis à jour au fil de l’évolution des options offertes.",
      scopeLabel: "Secteurs",
      scopeValue: "Miami · Orlando · autres secteurs de la Floride",
      compareLabel: "Comparer selon",
      compareValue:
        "Emplacement · Prix de départ · Livraison · Location · Type de résidence",
    },
    filters: {
      title: "Rechercher et filtrer les projets",
      button: "Filtrer les projets",
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
      title: "Projets disponibles",
      summary: (total, visible) =>
        `${total} ${total === 1 ? "résultat" : "résultats"} · ${visible} ${visible === 1 ? "affiché" : "affichés"}`,
      showing: (visible, total) =>
        `Affichage de ${visible} ${visible === 1 ? "projet" : "projets"} sur ${total}`,
      emptyTitle: "Aucun projet ne correspond à ces filtres.",
      emptyBody:
        "Modifiez votre recherche ou effacez les filtres pour afficher de nouveau le catalogue.",
      showMore: "Voir plus de projets",
    },
    card: {
      from: "À partir de",
      inquire: "Prix sur demande",
      delivery: "Livraison",
      deliveryFallback: "À confirmer",
      rental: "Location",
      rentalFallback: "Conditions sur demande",
      viewProject: "Voir le projet",
    },
    close: {
      eyebrow: "AIDE À LA COMPARAISON",
      title: "Vous ne savez pas quels projets comparer?",
      text:
        "Parlez-moi de votre objectif, de votre budget approximatif et des secteurs qui vous intéressent. Nous pouvons organiser la comparaison et préciser les renseignements à examiner avant d’aller plus loin.",
      cta: "Parler avec Jacquie",
      whatsappMessage:
        "Bonjour Jacquie, je compare des projets en préconstruction et j’aimerais vous expliquer ce que je recherche.",
    },
  },
};
