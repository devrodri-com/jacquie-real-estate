"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";
import enLabels from "react-phone-number-input/locale/en.json";
import esLabels from "react-phone-number-input/locale/es.json";
import frLabels from "react-phone-number-input/locale/fr.json";
import "react-phone-number-input/style.css";
import CountrySelect from "./CountrySelect";
import styles from "./ContactoPhone.module.css";
import type {
  ContactLocale,
  ContactUtmKey,
} from "@/lib/contactRequest";
import {
  CONTACT_SUCCESS_STORAGE_KEY,
  type ContactSuccessRecord,
} from "@/lib/contactSession";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONTACT_EMAIL = "jacqueline@miamiliferealty.com";
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const PHONE_MAX_LENGTH = 32;
const MESSAGE_MAX_LENGTH = 4000;
const UTM_MAX_LENGTH = 120;
const PHONE_COUNTRIES: Country[] = [
  "US",
  "CA",
  "ES",
  "MX",
  "AR",
  "CO",
  "CL",
  "PE",
  "VE",
  "EC",
  "DO",
  "GT",
  "HN",
  "NI",
  "CR",
  "PA",
  "CU",
  "PR",
  "BO",
  "PY",
  "UY",
  "BR",
];
const UTM_KEYS: ContactUtmKey[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

type ContactFormProps = {
  locale: ContactLocale;
  transportConfigured: boolean;
  whatsappHref: string;
};

type FormValues = {
  nombre: string;
  email: string;
  mensaje: string;
  telefonoE164: string;
  country: Country | "INTL" | "";
};

type FieldName = "nombre" | "email" | "telefonoE164" | "mensaje";
type FieldErrors = Partial<Record<FieldName, string>>;

type ContactApiResponse = {
  ok?: boolean;
  status?: string;
  error?: string;
  fields?: string[];
};

const EMPTY_FORM: FormValues = {
  nombre: "",
  email: "",
  mensaje: "",
  telefonoE164: "",
  country: "",
};

function parseApiResponse(rawValue: string): ContactApiResponse {
  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (!parsed || typeof parsed !== "object") return {};

    const record = parsed as Record<string, unknown>;
    return {
      ok: typeof record.ok === "boolean" ? record.ok : undefined,
      status: typeof record.status === "string" ? record.status : undefined,
      error: typeof record.error === "string" ? record.error : undefined,
      fields: Array.isArray(record.fields)
        ? record.fields.filter(
            (field): field is string => typeof field === "string"
          )
        : undefined,
    };
  } catch {
    return {};
  }
}

function isValidEmail(value: string): boolean {
  if (
    value.length === 0 ||
    value.length > EMAIL_MAX_LENGTH ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return false;
  }

  const separatorIndex = value.lastIndexOf("@");
  if (separatorIndex <= 0 || separatorIndex !== value.indexOf("@")) {
    return false;
  }

  const localPart = value.slice(0, separatorIndex);
  const domainLabels = value.slice(separatorIndex + 1).split(".");

  return (
    localPart.length <= 64 &&
    !localPart.startsWith(".") &&
    !localPart.endsWith(".") &&
    !localPart.includes("..") &&
    /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart) &&
    domainLabels.length >= 2 &&
    domainLabels.every((label) =>
      /^[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i.test(label)
    )
  );
}

export default function ContactForm({
  locale,
  transportConfigured,
  whatsappHref,
}: ContactFormProps) {
  const t = useTranslations("contact");

  if (!transportConfigured) {
    return (
      <div
        className="mt-6 border-l-2 border-accent/60 pl-4 sm:pl-5"
        role="status"
      >
        <h3 className="text-base font-semibold text-primary">
          {t("unavailableTitle")}
        </h3>
        <p className="mt-2 max-w-[58ch] text-sm leading-6 text-foreground/72">
          {t("unavailableBody")}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/55 bg-white px-4 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            {t("unavailableWhatsapp")}
          </a>
          <a
            href={"mailto:" + CONTACT_EMAIL}
            className="inline-flex min-h-11 items-center justify-center px-1 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:justify-start"
          >
            {t("unavailableEmail")}
          </a>
        </div>
      </div>
    );
  }

  return <ConfiguredContactForm locale={locale} />;
}

function ConfiguredContactForm({ locale }: { locale: ContactLocale }) {
  const t = useTranslations("contact");
  const router = useRouter();
  const noticeRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<
    Country | undefined
  >(undefined);
  const [companyHoneypot, setCompanyHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [deliveryNotice, setDeliveryNotice] = useState<string | null>(null);
  const [noticeVersion, setNoticeVersion] = useState(0);
  const [sending, setSending] = useState(false);
  const [utms, setUtms] = useState<
    Partial<Record<ContactUtmKey, string>>
  >({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nextUtms: Partial<Record<ContactUtmKey, string>> = {};

    for (const key of UTM_KEYS) {
      const value = searchParams.get(key)?.trim();
      if (
        value &&
        value.length <= UTM_MAX_LENGTH &&
        !/[\r\n]/.test(value)
      ) {
        nextUtms[key] = value;
      }
    }

    setUtms(nextUtms);
  }, []);

  const displayedNotice = deliveryNotice ?? notice;

  useEffect(() => {
    if (displayedNotice) noticeRef.current?.focus();
  }, [displayedNotice, noticeVersion]);

  const showNotice = (message: string) => {
    setDeliveryNotice(null);
    setNotice(message);
    setNoticeVersion((current) => current + 1);
  };

  const showDeliveryNotice = (message: string) => {
    setNotice(null);
    setDeliveryNotice(message);
    setNoticeVersion((current) => current + 1);
  };

  const clearFieldError = (field: FieldName) => {
    setNotice(null);
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = event.target.name as "nombre" | "email" | "mensaje";
    setForm((current) => ({ ...current, [field]: event.target.value }));
    clearFieldError(field);
  };

  const handlePhoneChange = (value: string | undefined) => {
    const nextValue = value ?? "";
    setPhoneInputValue(nextValue);
    clearFieldError("telefonoE164");

    if (!nextValue) {
      setForm((current) => ({
        ...current,
        telefonoE164: "",
        country: selectedCountry ?? "",
      }));
      return;
    }

    try {
      const parsedPhone = parsePhoneNumber(nextValue);
      if (parsedPhone && isValidPhoneNumber(nextValue)) {
        setForm((current) => ({
          ...current,
          telefonoE164: parsedPhone.format("E.164"),
          country: parsedPhone.country ?? "INTL",
        }));
        return;
      }
    } catch {
      // The localized field error is shown after enough input or on submit.
    }

    setForm((current) => ({
      ...current,
      telefonoE164: "",
      country: selectedCountry ?? "",
    }));

    if (nextValue.length > 3) {
      setFieldErrors((current) => ({
        ...current,
        telefonoE164: t("phoneInvalid"),
      }));
    }
  };

  const handleCountryChange = (country: Country | undefined) => {
    setSelectedCountry(country);
    setPhoneInputValue("");
    setForm((current) => ({
      ...current,
      telefonoE164: "",
      country: country ?? "",
    }));
    clearFieldError("telefonoE164");
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    const normalizedName = form.nombre.trim();
    const normalizedEmail = form.email.trim();
    const normalizedMessage = form.mensaje.trim();

    if (
      normalizedName.length < 2 ||
      normalizedName.length > NAME_MAX_LENGTH ||
      /[\r\n]/.test(normalizedName)
    ) {
      errors.nombre = t("nameInvalid");
    }

    if (!isValidEmail(normalizedEmail)) {
      errors.email = t("emailInvalid");
    }

    if (
      !form.telefonoE164 ||
      form.telefonoE164.length > PHONE_MAX_LENGTH ||
      !isValidPhoneNumber(form.telefonoE164)
    ) {
      errors.telefonoE164 = t("phoneInvalid");
    }

    if (
      normalizedMessage.length < 10 ||
      normalizedMessage.length > MESSAGE_MAX_LENGTH
    ) {
      errors.mensaje = t("messageInvalid");
    }

    return errors;
  };

  const mapServerFields = (fields: string[] | undefined): FieldErrors => {
    if (!fields) return {};

    const errors: FieldErrors = {};
    if (fields.includes("nombre")) errors.nombre = t("nameInvalid");
    if (fields.includes("email")) errors.email = t("emailInvalid");
    if (fields.includes("telefonoE164")) {
      errors.telefonoE164 = t("phoneInvalid");
    }
    if (fields.includes("mensaje")) errors.mensaje = t("messageInvalid");
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setDeliveryNotice(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      showNotice(t("validationError"));
      return;
    }

    setSending(true);
    setNotice(null);
    let deliveryConfirmed = false;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          mensaje: form.mensaje.trim(),
          telefonoE164: form.telefonoE164,
          country: form.country,
          company: companyHoneypot,
          locale,
          sourcePath: "/" + locale + "/contacto",
          ...utms,
        }),
      });

      const data = parseApiResponse(await response.text());

      if (response.status === 429 || data.error === "rate_limited") {
        showNotice(t("rateLimitError"));
        return;
      }

      if (data.error === "validation_error") {
        setFieldErrors(mapServerFields(data.fields));
        showNotice(t("validationError"));
        return;
      }

      if (data.error === "email_not_configured") {
        showNotice(t("notConfiguredError"));
        return;
      }

      if (
        !response.ok ||
        data.ok !== true ||
        data.status !== "sent"
      ) {
        showNotice(
          data.error === "send_failed"
            ? t("sendError")
            : t("unexpectedError")
        );
        return;
      }

      deliveryConfirmed = true;
      const successRecord: ContactSuccessRecord = {
        submittedAt: Date.now(),
        locale,
        utms,
      };

      let confirmationStored = false;
      try {
        sessionStorage.setItem(
          CONTACT_SUCCESS_STORAGE_KEY,
          JSON.stringify(successRecord)
        );
        confirmationStored = true;
      } catch {
        // Keep the confirmed result inline when storage cannot hand it off.
      }

      setForm(EMPTY_FORM);
      setPhoneInputValue("");
      setSelectedCountry(undefined);
      setCompanyHoneypot("");
      setFieldErrors({});

      try {
        window.gtag?.("event", "generate_lead", {
          event_category: "form",
          event_label:
            locale === "es"
              ? "contacto"
              : locale === "fr"
                ? "contact_fr"
                : "contact",
          locale,
          has_phone: "true",
          phone_country: form.country || "INTL",
          ...(utms.utm_source && { utm_source: utms.utm_source }),
          ...(utms.utm_medium && { utm_medium: utms.utm_medium }),
          ...(utms.utm_campaign && {
            utm_campaign: utms.utm_campaign,
          }),
        });
      } catch {
        // Analytics must never turn a delivered lead into a visible failure.
      }

      if (confirmationStored) {
        try {
          router.push("/" + locale + "/gracias");
        } catch {
          setSending(false);
          showDeliveryNotice(t("successWithoutRedirect"));
        }
      } else {
        setSending(false);
        showDeliveryNotice(t("successWithoutRedirect"));
      }
    } catch {
      showNotice(t("unexpectedError"));
    } finally {
      if (!deliveryConfirmed) setSending(false);
    }
  };

  return (
    <form
      className="mt-6"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
    >
      <p className="text-xs font-medium text-foreground/72">
        {t("requiredNote")}
      </p>

      <span className="sr-only" role="status" aria-live="polite">
        {sending ? t("sending") : ""}
      </span>

      {displayedNotice ? (
        <div
          ref={noticeRef}
          tabIndex={-1}
          role={deliveryNotice ? "status" : "alert"}
          aria-live={deliveryNotice ? "polite" : "assertive"}
          className="mt-4 rounded-lg border border-primary/15 bg-white px-4 py-3 text-sm leading-6 text-primary focus:outline-none"
        >
          {displayedNotice}
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-sm font-semibold text-primary"
          >
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            name="nombre"
            type="text"
            autoComplete="name"
            value={form.nombre}
            onChange={handleTextChange}
            maxLength={NAME_MAX_LENGTH}
            required
            disabled={sending}
            aria-invalid={Boolean(fieldErrors.nombre)}
            aria-describedby={
              fieldErrors.nombre ? "contact-name-error" : undefined
            }
            className="mt-2 h-12 w-full rounded-lg border border-primary/55 bg-white px-3.5 text-base text-foreground outline-none transition-colors placeholder:text-foreground/68 focus:border-primary focus:ring-2 focus:ring-primary/65 disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
            placeholder={t("namePlaceholder")}
          />
          {fieldErrors.nombre ? (
            <p
              id="contact-name-error"
              className="mt-1.5 text-sm text-red-700"
            >
              {fieldErrors.nombre}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="text-sm font-semibold text-primary"
          >
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={handleTextChange}
            maxLength={EMAIL_MAX_LENGTH}
            required
            disabled={sending}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
            className="mt-2 h-12 w-full rounded-lg border border-primary/55 bg-white px-3.5 text-base text-foreground outline-none transition-colors placeholder:text-foreground/68 focus:border-primary focus:ring-2 focus:ring-primary/65 disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
            placeholder={t("emailPlaceholder")}
          />
          {fieldErrors.email ? (
            <p
              id="contact-email-error"
              className="mt-1.5 text-sm text-red-700"
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <label
            htmlFor="contact-phone"
            className="text-sm font-semibold text-primary"
          >
            {t("phoneLabel")}
          </label>
          <span
            id="contact-phone-hint"
            className="text-xs text-foreground/72"
          >
            {t("phoneHint")}
          </span>
        </div>
        <div className={styles.phoneWrapper + " mt-2 min-w-0"}>
          <PhoneInput
            id="contact-phone"
            international
            defaultCountry={selectedCountry}
            country={selectedCountry}
            countryCallingCodeEditable
            countries={PHONE_COUNTRIES}
            labels={
              locale === "en"
                ? enLabels
                : locale === "fr"
                  ? frLabels
                  : esLabels
            }
            countrySelectComponent={(props) => (
              <CountrySelect
                {...props}
                labels={
                  locale === "en"
                    ? enLabels
                    : locale === "fr"
                      ? frLabels
                      : esLabels
                }
                isEN={locale === "en"}
                isFR={locale === "fr"}
              />
            )}
            value={phoneInputValue}
            onChange={handlePhoneChange}
            onCountryChange={handleCountryChange}
            maxLength={PHONE_MAX_LENGTH}
            required
            disabled={sending}
            aria-invalid={Boolean(fieldErrors.telefonoE164)}
            aria-describedby={
              fieldErrors.telefonoE164
                ? "contact-phone-hint contact-phone-error"
                : "contact-phone-hint"
            }
            placeholder={t("phonePlaceholder")}
          />
        </div>
        {fieldErrors.telefonoE164 ? (
          <p
            id="contact-phone-error"
            className="mt-1.5 text-sm text-red-700"
          >
            {fieldErrors.telefonoE164}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-primary"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="mensaje"
          value={form.mensaje}
          onChange={handleTextChange}
          maxLength={MESSAGE_MAX_LENGTH}
          required
          disabled={sending}
          aria-invalid={Boolean(fieldErrors.mensaje)}
          aria-describedby={
            fieldErrors.mensaje ? "contact-message-error" : undefined
          }
          className="mt-2 min-h-36 w-full resize-y rounded-lg border border-primary/55 bg-white p-3.5 text-base leading-6 text-foreground outline-none transition-colors placeholder:text-foreground/68 focus:border-primary focus:ring-2 focus:ring-primary/65 disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
          placeholder={t("messagePlaceholder")}
        />
        {fieldErrors.mensaje ? (
          <p
            id="contact-message-error"
            className="mt-1.5 text-sm text-red-700"
          >
            {fieldErrors.mensaje}
          </p>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyHoneypot}
          onChange={(event) => setCompanyHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-primary/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[58ch] text-xs leading-5 text-foreground/72">
          {t("privacy")}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
        >
          {sending ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
