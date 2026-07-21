import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_BODY_MAX_BYTES,
  createContactRequestHandler,
  createInMemoryContactRateLimiter,
  type ActiveContactTransport,
  type ContactEmailMessage,
  type ContactTransportState,
} from "../src/lib/contactRequest";

const ACTIVE_TRANSPORT: ActiveContactTransport = {
  configured: true,
  provider: "resend",
  apiKey: "test-key-never-sent",
  from: "Jacquie Zárate <leads@example.test>",
  to: ["jacqueline@miamiliferealty.com"],
};

const VALID_PAYLOAD = {
  nombre: "Ana Pérez",
  email: "ana@example.com",
  telefonoE164: "+13055550123",
  country: "US",
  mensaje: "Quiero evaluar una inversión inmobiliaria en Miami.",
  company: "",
  locale: "es",
  sourcePath: "/es/contacto",
  utm_source: "campaign",
};

function makeRequest(
  payload: unknown = VALID_PAYLOAD,
  headers: Record<string, string> = {}
): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.10",
      ...headers,
    },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

function makeHandler({
  transport = ACTIVE_TRANSPORT,
  send,
  maxRequests = 20,
}: {
  transport?: ContactTransportState;
  send?: (
    activeTransport: ActiveContactTransport,
    message: ContactEmailMessage
  ) => Promise<{ ok: boolean }>;
  maxRequests?: number;
} = {}) {
  return createContactRequestHandler({
    getTransportState: () => transport,
    sendMessage: send ?? (async () => ({ ok: true })),
    rateLimiter: createInMemoryContactRateLimiter({ maxRequests }),
    now: () => new Date("2026-07-21T16:00:00.000Z"),
  });
}

async function readJson(response: Response) {
  return JSON.parse(await response.text()) as Record<string, unknown>;
}

test("returns sent only after the injected transport confirms delivery", async () => {
  const captured: {
    message?: ContactEmailMessage;
    transport?: ActiveContactTransport;
  } = {};
  const handler = makeHandler({
    send: async (transport, message) => {
      captured.transport = transport;
      captured.message = message;
      return { ok: true };
    },
  });

  const response = await handler(makeRequest());
  const body = await readJson(response);

  assert.equal(response.status, 200);
  assert.deepEqual(body, { ok: true, status: "sent" });
  assert.equal(captured.transport?.from, ACTIVE_TRANSPORT.from);
  assert.equal(
    captured.transport?.to[0],
    "jacqueline@miamiliferealty.com"
  );
  assert.equal(captured.message?.replyTo, "ana@example.com");
  assert.match(captured.message?.text ?? "", /2026-07-21T16:00:00.000Z/);
});

test("returns an honest unavailable state without calling send", async () => {
  let sendCalls = 0;
  const handler = makeHandler({
    transport: { configured: false },
    send: async () => {
      sendCalls += 1;
      return { ok: true };
    },
  });

  const response = await handler(makeRequest());
  assert.equal(response.status, 503);
  assert.deepEqual(await readJson(response), {
    ok: false,
    error: "email_not_configured",
  });
  assert.equal(sendCalls, 0);
});

test("rejects non-JSON requests before parsing or sending", async () => {
  const handler = makeHandler();
  const response = await handler(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(VALID_PAYLOAD),
    })
  );

  assert.equal(response.status, 415);
  assert.equal((await readJson(response)).error, "validation_error");
});

test("rejects bodies larger than the request limit", async () => {
  const handler = makeHandler();
  const oversized = JSON.stringify({
    ...VALID_PAYLOAD,
    mensaje: "x".repeat(CONTACT_BODY_MAX_BYTES),
  });
  const response = await handler(makeRequest(oversized));

  assert.equal(response.status, 413);
  assert.equal((await readJson(response)).error, "payload_too_large");
});

test("validates email header injection, phone, source path, and UTM lengths", async () => {
  const handler = makeHandler();
  const response = await handler(
    makeRequest({
      ...VALID_PAYLOAD,
      email: "ana@example.com\r\nBcc: attacker@example.com",
      telefonoE164: "1234",
      sourcePath: "/es/gracias",
      utm_source: "x".repeat(121),
    })
  );
  const body = await readJson(response);

  assert.equal(response.status, 400);
  assert.equal(body.error, "validation_error");
  assert.deepEqual(body.fields, [
    "email",
    "sourcePath",
    "telefonoE164",
    "utm_source",
  ]);
});

test("rejects control characters and unsafe email local parts", async () => {
  const unsafeEmails = [
    "ana\u0000@example.com",
    "ana,test@example.com",
    '"ana"@example.com',
    ".ana@example.com",
    "ana..test@example.com",
  ];

  for (const email of unsafeEmails) {
    const handler = makeHandler();
    const response = await handler(
      makeRequest({ ...VALID_PAYLOAD, email })
    );

    assert.equal(response.status, 400);
    assert.deepEqual(await readJson(response), {
      ok: false,
      error: "validation_error",
      fields: ["email"],
    });
  }
});

test("silently drops the honeypot without a visible sent status", async () => {
  let sendCalls = 0;
  const handler = makeHandler({
    send: async () => {
      sendCalls += 1;
      return { ok: true };
    },
  });
  const response = await handler(
    makeRequest({ ...VALID_PAYLOAD, company: "bot-filled" })
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await readJson(response), { ok: true });
  assert.equal(sendCalls, 0);
});

test("escapes user HTML while preserving a text-only version", async () => {
  const captured: { message?: ContactEmailMessage } = {};
  const handler = makeHandler({
    send: async (_transport, message) => {
      captured.message = message;
      return { ok: true };
    },
  });
  const response = await handler(
    makeRequest({
      ...VALID_PAYLOAD,
      nombre: "Ana <Admin>",
      mensaje: "<script>alert('x')</script>\nProyecto específico",
    })
  );

  assert.equal(response.status, 200);
  assert.doesNotMatch(captured.message?.html ?? "", /<script>/);
  assert.match(captured.message?.html ?? "", /&lt;script&gt;/);
  assert.match(captured.message?.text ?? "", /<script>/);
});

test("maps transport failures to a stable generic error", async () => {
  const handler = makeHandler({
    send: async () => {
      throw new Error("provider details must stay private");
    },
  });
  const response = await handler(makeRequest());
  const rawBody = await response.text();

  assert.equal(response.status, 502);
  assert.deepEqual(JSON.parse(rawBody), {
    ok: false,
    error: "send_failed",
  });
  assert.doesNotMatch(rawBody, /provider details/i);
});

test("rate limits repeated requests with Retry-After", async () => {
  const handler = makeHandler({ maxRequests: 1 });
  const first = await handler(makeRequest());
  const second = await handler(makeRequest());

  assert.equal(first.status, 200);
  assert.equal(second.status, 429);
  assert.equal(second.headers.get("retry-after"), "600");
  assert.equal((await readJson(second)).error, "rate_limited");
});
