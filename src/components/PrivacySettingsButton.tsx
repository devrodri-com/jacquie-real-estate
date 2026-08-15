"use client";

import { useAnalyticsConsent } from "@/components/AnalyticsConsentProvider";
import type { SiteLocale } from "@/lib/whatsapp";

const LABELS: Record<SiteLocale, string> = {
  es: "Configuración de privacidad",
  en: "Privacy settings",
  fr: "Paramètres de confidentialité",
};

export default function PrivacySettingsButton({
  locale,
  className = "",
}: {
  locale: SiteLocale;
  className?: string;
}) {
  const { enabled, openSettings } = useAnalyticsConsent();
  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={openSettings}
      className={`inline-flex min-h-11 items-center text-left underline decoration-current/35 underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none ${className}`}
    >
      {LABELS[locale]}
    </button>
  );
}
