// src/app/[locale]/property-management/page.tsx
import SectionPropertyManagementHome from "@/components/SectionPropertyManagementHome";
import SectionPropertyManagementIncluded from "../../../components/SectionPropertyManagementIncluded";
import SectionPropertyManagementTrust from "../../../components/SectionPropertyManagementTrust";

type Locale = "es" | "en" | "fr";

export default function PropertyManagementPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : params.locale === "fr" ? "fr" : "es";
  const isEN = locale === "en";
  const isFR = locale === "fr";

  return (
    <main className="space-y-16 pt-24 pb-16">
      <div className="bg-surface">
        <SectionPropertyManagementHome locale={locale} />
      </div>

      <SectionPropertyManagementIncluded locale={locale} />

      <div className="bg-surface">
        <SectionPropertyManagementTrust locale={locale} />
      </div>

      <section className="max-w-[1100px] mx-auto px-4">
        <div className="rounded-[12px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground text-center">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {isEN
              ? "If you want to delegate the management of your property in Miami, write to me and we can review it together."
              : isFR
                ? "Si vous souhaitez déléguer la gestion de votre propriété à Miami, écrivez-moi et nous l'analyserons ensemble."
                : "Si querés delegar la gestión de tu propiedad en Miami, escribime y lo vemos juntos."}
          </h2>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`/${locale}/contacto`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/10 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {isEN ? "Go to contact" : isFR ? "Aller à la page contact" : "Ir a contacto"}
            </a>
            <a
              href="https://wa.me/17864072591"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/25 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {isEN ? "Talk on WhatsApp" : isFR ? "Parler sur WhatsApp" : "Hablar por WhatsApp"}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

