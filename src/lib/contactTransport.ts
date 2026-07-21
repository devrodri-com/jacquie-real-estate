import "server-only";

import { Resend } from "resend";
import {
  isSafeEmailAddress,
  type ActiveContactTransport,
  type ContactEmailMessage,
  type ContactTransportState,
} from "@/lib/contactRequest";

const DEFAULT_FROM_NAME = "Jacquie Zárate";
const MAX_RECIPIENTS = 10;

let resendClient: Resend | null = null;
let resendClientKey: string | null = null;

function readTrimmed(
  environment: NodeJS.ProcessEnv,
  key: string
): string {
  return environment[key]?.trim() ?? "";
}

function parseFromMailbox(rawValue: string): {
  email: string;
  embeddedName: string;
} | null {
  const mailboxMatch = rawValue.match(/^(.*?)\s*<([^<>]+)>$/);
  if (mailboxMatch) {
    const embeddedName = mailboxMatch[1].trim().replace(/^"|"$/g, "");
    const email = mailboxMatch[2].trim();
    if (!isSafeEmailAddress(email)) return null;
    return { email, embeddedName };
  }

  if (!isSafeEmailAddress(rawValue)) return null;
  return { email: rawValue, embeddedName: "" };
}

function isSafeDisplayName(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 100 &&
    !/[\r\n<>"\\]/.test(value)
  );
}

function formatFrom(name: string, email: string): string {
  return name + " <" + email + ">";
}

export function getContactTransportState(
  environment: NodeJS.ProcessEnv = process.env
): ContactTransportState {
  const apiKey = readTrimmed(environment, "RESEND_API_KEY");
  const configuredProvider = readTrimmed(
    environment,
    "CONTACT_PROVIDER"
  ).toLowerCase();
  const provider = configuredProvider || (apiKey ? "resend" : "");

  if (provider !== "resend" || !apiKey) return { configured: false };

  const fromMailbox = parseFromMailbox(
    readTrimmed(environment, "CONTACT_FROM_EMAIL")
  );
  if (!fromMailbox) return { configured: false };

  const requestedFromName =
    readTrimmed(environment, "CONTACT_FROM_NAME") ||
    fromMailbox.embeddedName ||
    DEFAULT_FROM_NAME;
  if (!isSafeDisplayName(requestedFromName)) return { configured: false };

  const rawRecipients =
    readTrimmed(environment, "CONTACT_TO") ||
    readTrimmed(environment, "LEADS_TO");
  const to = rawRecipients
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (
    to.length === 0 ||
    to.length > MAX_RECIPIENTS ||
    !to.every(isSafeEmailAddress)
  ) {
    return { configured: false };
  }

  return {
    configured: true,
    provider: "resend",
    apiKey,
    from: formatFrom(requestedFromName, fromMailbox.email),
    to,
  };
}

export function isContactTransportConfigured(): boolean {
  return getContactTransportState().configured;
}

function getResend(apiKey: string): Resend {
  if (!resendClient || resendClientKey !== apiKey) {
    resendClient = new Resend(apiKey);
    resendClientKey = apiKey;
  }

  return resendClient;
}

export async function sendContactMessage(
  transport: ActiveContactTransport,
  message: ContactEmailMessage
): Promise<{ ok: boolean }> {
  const { error } = await getResend(transport.apiKey).emails.send({
    from: transport.from,
    to: transport.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  return { ok: !error };
}
