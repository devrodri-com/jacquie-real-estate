import type { ContactLocale, ContactUtmKey } from "@/lib/contactRequest";

export const CONTACT_SUCCESS_STORAGE_KEY = "contact_submission_success_v1";
export const CONTACT_THANK_YOU_TRACKED_KEY = "contact_thank_you_tracked_v1";
export const CONTACT_SUCCESS_MAX_AGE_MS = 30 * 60 * 1000;
const CONTACT_SESSION_UTM_KEYS: ContactUtmKey[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

export type ContactSuccessRecord = {
  submittedAt: number;
  locale: ContactLocale;
  utms: Partial<Record<ContactUtmKey, string>>;
};

export function parseContactSuccessRecord(
  rawValue: string | null,
  currentLocale: ContactLocale,
  now = Date.now()
): ContactSuccessRecord | null {
  if (!rawValue) return null;

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (!parsed || typeof parsed !== "object") return null;

    const record = parsed as Record<string, unknown>;
    if (
      typeof record.submittedAt !== "number" ||
      record.locale !== currentLocale ||
      !record.utms ||
      typeof record.utms !== "object"
    ) {
      return null;
    }

    const age = now - record.submittedAt;
    if (age < 0 || age > CONTACT_SUCCESS_MAX_AGE_MS) return null;

    const rawUtms = record.utms as Record<string, unknown>;
    const utms: ContactSuccessRecord["utms"] = {};

    for (const key of CONTACT_SESSION_UTM_KEYS) {
      const value = rawUtms[key];
      if (
        typeof value === "string" &&
        value.length <= 120 &&
        !/[\r\n]/.test(value)
      ) {
        utms[key] = value;
      }
    }

    return {
      submittedAt: record.submittedAt,
      locale: currentLocale,
      utms,
    };
  } catch {
    return null;
  }
}
