import ContactPageClient from "./ContactPageClient";
import { isContactTransportConfigured } from "@/lib/contactTransport";
import { normalizeSiteLocale } from "@/lib/whatsapp";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeSiteLocale(rawLocale);

  return (
    <ContactPageClient
      locale={locale}
      transportConfigured={isContactTransportConfigured()}
    />
  );
}
