export type AnalyticsConsent = "unknown" | "granted" | "denied";
export type AnalyticsLocale = "es" | "en" | "fr";
export type AnalyticsBrand = "jacquie" | "lets_go_miami";

export const CONSENT_STORAGE_KEY: string;
export const CONSENT_POLICY_DEFAULT_STATE: Readonly<Record<string, string>>;
export const CONSENT_DEFAULT: Readonly<Record<string, string>>;
export const CONSENT_GRANTED: Readonly<Record<string, string>>;

export function isValidMeasurementId(value: string | null | undefined): boolean;
export function parseStoredConsent(
  value: string | null,
): Exclude<AnalyticsConsent, "unknown"> | null;
export function isAnalyticsConsent(value: unknown): value is AnalyticsConsent;
export function setAnalyticsConsent(value: unknown): void;
export function getAnalyticsConsent(): AnalyticsConsent;
export function loadGoogleAnalytics(
  measurementId: string,
  runtime?: unknown,
): boolean;
export function getAnalyticsCookieNames(cookieHeader: string | null | undefined): string[];
export function revokeAnalytics(measurementId: string, runtime?: unknown): string[];
export function isWhatsAppUrl(href: string | null | undefined): boolean;
export function buildWhatsAppPayload(input: {
  locale: string;
  pagePath: string;
  placement: string;
  brand: string;
}): {
  locale: AnalyticsLocale;
  page_path: string;
  placement: string;
  brand: AnalyticsBrand;
};
export function trackWhatsAppClick(placement: string, runtime?: unknown): boolean;
export function resetAnalyticsLoaderForTests(): void;
