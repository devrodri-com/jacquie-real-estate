// src/app/[locale]/sobre-mi/page.tsx
import Image from "next/image";
import Link from "next/link";

export default async function SobreMi({
  params,
}: {
  params: { locale: "es" | "en" | "fr" };
}) {
  const locale = params?.locale || "es";
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
      ? "J'accompagne les acheteurs, investisseurs et propriétaires avec une approche proche, claire et personnalisée à chaque étape du processus."
      : "Acompaño a compradores, inversores y propietarios con una mirada cercana, clara y personalizada en cada etapa del proceso.";
  const p1 = isEN
    ? "I'm originally from Argentina, I speak Spanish and English, and I know Miami, Sunny Isles, and different areas of South Florida closely. I work with people who want to invest, buy, or manage a property with someone who is truly present and involved from beginning to end."
    : isFR
      ? "Je suis originaire d'Argentine, je parle espagnol et anglais, et je connais bien Miami, Sunny Isles et différentes zones du sud de la Floride. Je travaille avec des personnes qui souhaitent investir, acheter ou gérer un bien avec quelqu'un de réellement présent et impliqué du début à la fin."
      : "Soy argentina, hablo español e inglés, y conozco de cerca Miami, Sunny Isles y distintas zonas del sur de Florida. Trabajo con personas que quieren invertir, comprar o gestionar una propiedad con alguien que realmente esté presente y acompañe el proceso de principio a fin.";
  const p2 = isEN
    ? "What sets me apart is personalized attention, real follow-through, and trust. Whether it's evaluating an opportunity, buying a property, or supporting its short-term rental management, my goal is to give you clarity, sound judgment, and a carefully guided experience in every decision."
    : isFR
      ? "Ce qui me distingue, c'est l'attention personnalisée, le vrai suivi et la confiance. Que ce soit pour évaluer une opportunité, acheter un bien ou accompagner sa gestion en location courte durée, mon objectif est de vous offrir clarté, discernement et une expérience soignée à chaque décision."
      : "Mi diferencial está en el trato personalizado, el seguimiento real y la confianza. Ya sea para evaluar una oportunidad, comprar una propiedad o acompañar su gestión en renta corta, mi objetivo es darte claridad, criterio y una experiencia cuidada en cada decisión.";
  const blocks = isEN
    ? [
        {
          title: "Hands-on guidance",
          description:
            "I don't work from an impersonal approach. I stay involved so you have follow-through, sound judgment, and clarity at every step.",
        },
        {
          title: "Local expertise with an international perspective",
          description:
            "I know the Miami market well, and I also understand the questions that often come up when someone is buying or investing from abroad.",
        },
        {
          title: "Confidence to make better decisions",
          description:
            "My goal is for every real estate decision to be made with support, good information, and a carefully guided experience from start to finish.",
        },
      ]
    : isFR
      ? [
          {
            title: "Un accompagnement réel",
            description:
              "Je ne travaille pas avec une logique impersonnelle. Je m'implique dans chaque processus pour vous apporter suivi, discernement et clarté à chaque étape.",
          },
          {
            title: "Une expertise locale avec une perspective internationale",
            description:
              "Je connais bien le marché de Miami et je comprends aussi les questions que se posent souvent ceux qui achètent ou investissent depuis l'étranger.",
          },
          {
            title: "La confiance pour mieux décider",
            description:
              "Mon objectif est que chaque décision immobilière soit prise avec soutien, bonne information et une expérience soignée du début à la fin.",
          },
        ]
      : [
          {
            title: "Acompañamiento real",
            description:
              "No trabajo desde una lógica impersonal. Me involucro en cada proceso para que tengas seguimiento, criterio y claridad en cada paso.",
          },
          {
            title: "Experiencia local con mirada internacional",
            description:
              "Conozco el mercado de Miami y también las dudas que suelen tener quienes invierten o compran desde afuera.",
          },
          {
            title: "Confianza para decidir mejor",
            description:
              "Busco que cada decisión inmobiliaria se tome con respaldo, buena información y una experiencia cuidada de inicio a fin.",
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
      <section aria-labelledby="sobre-mi-title" className="text-center max-w-[60ch] mx-auto">
        <h1 id="sobre-mi-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h1>
        <p className="mt-3 text-[15px] leading-[1.7] text-foreground/90">
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
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
        {blocks.map((b) => (
          <div
            key={b.title}
            className="rounded-[16px] ring-1 ring-primary-foreground/10 bg-primary p-5 text-primary-foreground shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="text-sm font-semibold text-primary-foreground">
              {b.title}
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {b.description}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[12px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground text-center max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
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
