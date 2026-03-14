// src/i18n/config.ts
export const locales = ["es","en"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "es";

export type Messages = Record<string, unknown>;

export async function getDictionary(locale: Locale): Promise<Messages> {
  const dict = (await import(`./dictionaries/${locale}.json`)).default;
  return dict as Messages;
}