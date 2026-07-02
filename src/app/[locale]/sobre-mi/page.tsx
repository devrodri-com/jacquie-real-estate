// src/app/[locale]/sobre-mi/page.tsx
import Image from "next/image";
import Link from "next/link";

export default async function SobreMi({
  params,
}: {
  params: Promise<{ locale: "es" | "en" | "fr" }>;
}) {
  const { locale = "es" } = await params;
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN
    ? "Your trusted contact in Miami"
    : isFR
      ? "Votre personne de confiance à Miami"
      : "Tu persona de confianza en Miami";
  const subtitle = isEN
    ? "I support buyers, investors, and property owners with a close, clear, and personalized approach at every stage of the process."
    : isFR
      ? "J’accompagne les acheteurs, investisseurs et propriétaires avec une approche proche, claire et personnalisée à chaque étape du processus."
      : "Acompaño a compradores, inversores y propietarios con una mirada cercana, clara y personalizada en cada etapa del proceso.";
  const p1 = isEN
    ? "I'm Jacquie Zárate, a realtor in Miami. I was born in Buenos Aires, Argentina, and I work with people who want to buy, invest, or manage a property in Miami with someone who can guide the process from start to finish."
    : isFR
      ? "Je suis Jacquie Zárate, realtor à Miami. Je suis née à Buenos Aires, en Argentine, et je travaille avec des personnes qui souhaitent acheter, investir ou gérer une propriété à Miami avec quelqu’un qui peut les accompagner du début à la fin."
      : "Soy Jacquie Zárate, realtor en Miami. Nací en Buenos Aires, Argentina, y trabajo con personas que buscan comprar, invertir o gestionar una propiedad en Miami con alguien que pueda acompañar el proceso de principio a fin.";
  const p2 = isEN
    ? "I bring more than 15 years of Finance experience working with S&P 500 companies. That background helps me look at each opportunity not only through the property itself, but also through the numbers, structure, and investment objective."
    : isFR
      ? "Je compte plus de 15 ans d’expérience en finances au sein d’entreprises du S&P 500. Cette expérience me permet d’évaluer chaque occasion non seulement à partir de la propriété, mais aussi des chiffres, de la structure et de l’objectif d’investissement."
      : "Cuento con más de 15 años de experiencia en Finanzas trabajando en empresas S&P 500. Esa formación me permite mirar cada oportunidad no solo desde la propiedad, sino también desde los números, la estructura y el objetivo de inversión.";
  const p3 = isEN
    ? "Since 2023, I have worked in Miami in Real Estate and Property Management, supporting buyers, investors, and property owners who want a clear, personalized, and well-managed experience."
    : isFR
      ? "Depuis 2023, je travaille à Miami dans l’immobilier et la gestion immobilière, auprès d’acheteurs, d’investisseurs et de propriétaires qui recherchent une expérience claire, personnalisée et bien gérée."
      : "Desde 2023 trabajo en Miami en el área de Real Estate y Property Management, acompañando a compradores, inversores y propietarios que buscan una experiencia clara, personalizada y bien gestionada.";
  const blocks = isEN
    ? [
        {
          title: "More than 15 years in Finance",
          description:
            "Experience with S&P 500 companies, focused on analysis, processes, and decision-making.",
        },
        {
          title: "Realtor in Miami",
          description:
            "I support purchases, investments, and real estate opportunities in Miami and South Florida.",
        },
        {
          title: "Management and real follow-through",
          description:
            "I work closely with buyers, investors, and property owners so every stage feels clear and organized.",
        },
      ]
    : isFR
      ? [
          {
            title: "Plus de 15 ans en finances",
            description:
              "Expérience au sein d’entreprises du S&P 500, avec un focus sur l’analyse, les processus et la prise de décision.",
          },
          {
            title: "Realtor à Miami",
            description:
              "J’accompagne les achats, les investissements et les occasions immobilières à Miami et dans le sud de la Floride.",
          },
          {
            title: "Gestion et suivi réel",
            description:
              "Je travaille de près avec les acheteurs, investisseurs et propriétaires pour que chaque étape soit claire et structurée.",
          },
        ]
      : [
          {
            title: "Más de 15 años en Finanzas",
            description:
              "Experiencia en empresas S&P 500, con foco en análisis, procesos y toma de decisiones.",
          },
          {
            title: "Realtor en Miami",
            description:
              "Acompaño compras, inversiones y oportunidades inmobiliarias en Miami y South Florida.",
          },
          {
            title: "Gestión y seguimiento real",
            description:
              "Trabajo de cerca con compradores, inversores y propietarios para que cada etapa sea clara y ordenada.",
          },
        ];
  const ctaTitle = isEN
    ? "If you want to move forward with clarity in Miami, reach out."
    : isFR
      ? "Si vous souhaitez avancer avec clarté à Miami, écrivez-moi."
      : "Si querés avanzar con claridad en Miami, escribime.";
  const ctaContact = isEN ? "Get in touch" : isFR ? "Écrivez-moi" : "Escribime";
  const ctaWhatsApp = isEN ? "Talk on WhatsApp" : isFR ? "Parler sur WhatsApp" : "Hablar por WhatsApp";

  const waMsg = isEN
    ? "Hi Jacquie, I'd like to talk with you about an opportunity in Miami."
    : isFR
      ? "Bonjour Jacquie, j'aimerais vous parler d'une opportunité à Miami."
      : "Hola Jacquie, quiero hablar con vos sobre una oportunidad en Miami.";
  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 space-y-12">
      <section aria-labelledby="sobre-mi-title" className="mx-auto max-w-[60ch] text-center lg:max-w-[1000px]">
        <h1 id="sobre-mi-title" className="font-display text-4xl font-medium leading-[1.05] tracking-normal text-primary sm:text-5xl lg:whitespace-nowrap">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[60ch] text-[15px] leading-[1.7] text-foreground/90">
          {subtitle}
        </p>
      </section>

      <section className="grid gap-8 sm:grid-cols-[200px,1fr] max-w-4xl mx-auto">
        <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-xl ring-1 ring-primary/10">
          <Image src="/images/jacquie-zarate.jpg" alt="Jacquie Zarate Realtor" fill sizes="200px" className="object-cover" />
        </div>
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-foreground/90">
            {p1}
          </p>
          <p className="text-[15px] leading-[1.7] text-foreground/90">
            {p2}
          </p>
          <p className="text-[15px] leading-[1.7] text-foreground/90">
            {p3}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
        {blocks.map((b) => (
          <div
            key={b.title}
            className="rounded-[16px] ring-1 ring-primary-foreground/10 bg-primary p-5 text-primary-foreground shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="font-display text-[21px] font-medium leading-[1.08] tracking-normal text-primary-foreground">
              {b.title}
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {b.description}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[12px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground text-center max-w-2xl mx-auto">
        <h2 className="font-display text-2xl font-medium leading-[1.08] tracking-normal sm:text-3xl">
          {ctaTitle}
        </h2>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/10 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {ctaContact}
          </Link>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/25 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {ctaWhatsApp}
          </a>
        </div>
      </section>
    </div>
  );
}
