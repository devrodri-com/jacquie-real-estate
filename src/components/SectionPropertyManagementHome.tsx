// src/components/SectionPropertyManagementHome.tsx
import Link from "next/link";

type Props = { locale: "es" | "en" | "fr" };

export default function SectionPropertyManagementHome({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN
    ? "I take care of your Miami property so it performs well without the day-to-day hassle."
    : isFR
      ? "Je m’occupe de votre propriété à Miami pour qu’elle soit rentable, sans gestion compliquée au quotidien."
      : "Me encargo de tu propiedad en Miami para que rente bien y sin complicaciones.";

  const intro = isEN
    ? "If you own a property in Miami and want to make it work through short-term rentals, I handle the day-to-day management so you don’t have to deal with every detail. My goal is to keep your property well cared for, well managed, and performing at its best — even if you’re not here."
    : isFR
      ? "Si vous avez une propriété à Miami et souhaitez la rentabiliser avec de la location courte durée, je m’occupe de la gestion quotidienne pour que vous n’ayez pas à gérer chaque détail. Mon objectif est que votre bien soit bien entretenu, bien géré et qu’il offre le meilleur rendement possible, même à distance."
      : "Si tenés una propiedad en Miami y querés ponerla a trabajar con renta corta, me encargo de la gestión diaria para que no tengas que ocuparte de cada detalle. Mi objetivo es que tu propiedad esté bien cuidada, bien gestionada y generando el mejor retorno posible, incluso si vos no estás acá.";

  const whatsappMessage = isEN
    ? "Hi Jacquie, I’d like to ask you about managing a property in Miami."
    : isFR
      ? "Bonjour Jacquie, j’aimerais vous parler d’une opportunité à Miami."
      : "Hola Jacquie, quiero consultarte por la gestión de una propiedad en Miami.";

  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(whatsappMessage)}`;

  const cards = [
    {
      title: isEN
        ? "End-to-end short-term rental management"
        : isFR
          ? "Gestion complète de la location courte durée"
          : "Gestión integral de la renta corta",
      text: isEN
        ? "I handle the full short-term rental process, from listing on platforms like Airbnb to coordinating each reservation, so your property runs smoothly and profitably."
        : isFR
          ? "Je prends en charge tout le processus de location courte durée, de la mise en ligne sur des plateformes comme Airbnb à la coordination de chaque réservation, pour que votre bien fonctionne de manière fluide et rentable."
          : "Me encargo de todo el proceso, desde la publicación en plataformas como Airbnb hasta la coordinación de cada reserva, para que tu propiedad funcione de forma ordenada y rentable.",
    },
    {
      title: isEN
        ? "Guests selected with care"
        : isFR
          ? "Invités sélectionnés avec soin"
          : "Huéspedes seleccionados con criterio",
      text: isEN
        ? "I work with a client network and carefully screen each guest to protect your property, reduce risk, and maintain a strong experience with every stay."
        : isFR
          ? "Je travaille avec un réseau de clients et je sélectionne chaque invité avec soin afin de protéger votre bien, réduire les risques et garantir une bonne expérience à chaque séjour."
          : "Trabajo con una red de clientes y selecciono cuidadosamente a cada huésped para cuidar tu propiedad, reducir riesgos y mantener una buena experiencia en cada estadía.",
    },
    {
      title: isEN
        ? "Personalized attention throughout each stay"
        : isFR
          ? "Attention personnalisée à chaque séjour"
          : "Atención personalizada durante cada estadía",
      text: isEN
        ? "I stay involved with direct guest support and ongoing follow-up so everything runs well and your property remains in good hands."
        : isFR
          ? "Je reste présente avec un accompagnement direct et un suivi constant pour que tout se passe bien et que votre propriété soit entre de bonnes mains."
          : "Estoy presente para acompañar a cada huésped con atención directa y seguimiento constante, para que todo funcione bien y tu propiedad esté en buenas manos.",
    },
    {
      title: isEN
        ? "Care and maintenance with oversight"
        : isFR
          ? "Entretien et suivi de la propriété"
          : "Cuidado y mantenimiento con seguimiento",
      text: isEN
        ? "I coordinate any necessary maintenance with your approval and keep an eye on the overall condition of the property so it stays in excellent shape."
        : isFR
          ? "Je coordonne l’entretien nécessaire avec votre accord et je supervise l’état général du bien pour qu’il reste en excellent état."
          : "Coordino el mantenimiento necesario con tu aprobación y superviso el estado general de la propiedad para que se mantenga en excelentes condiciones.",
    },
  ];

  return (
    <section aria-labelledby="property-management-home-title" className="max-w-[1100px] mx-auto px-4">
      <h2 id="property-management-home-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
        {title}
      </h2>
      <p className="mt-2 max-w-[108ch] text-[15px] leading-[1.7] text-foreground/85 whitespace-pre-line">
        {intro}
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[12px] ring-1 ring-primary-foreground/10 bg-primary p-6 text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="text-[17px] font-semibold tracking-tight text-primary-foreground">
              {card.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.5] text-primary-foreground/80">
              {card.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "Talk on WhatsApp" : isFR ? "Parler sur WhatsApp" : "Hablar por WhatsApp"}
        </a>
        <Link
          href={`/${locale}/property-management`}
          className="inline-flex h-10 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "Explore the service" : isFR ? "Découvrir le service" : "Conocer el servicio"}
        </Link>
      </div>
      <p className="mx-auto mt-14 max-w-[36ch] text-center text-[20px] leading-[1.35] sm:text-[22px] font-semibold tracking-tight text-primary">
        {isEN
          ? "I’m your trusted contact in Miami."
          : isFR
            ? "Je suis votre personne de confiance à Miami."
            : "Soy tu persona de confianza en Miami."}
      </p>
    </section>
  );
}
