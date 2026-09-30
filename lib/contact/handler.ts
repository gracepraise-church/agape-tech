import { randomUUID } from "node:crypto";
import { z } from "zod";
import { contactInquirySchema } from "./schema";
import { createResendEmailProvider } from "./email-provider";
import type {
  ContactEmailProvider,
  ContactEnvironment,
  ContactFunctionRequest,
  ContactFunctionResponse,
} from "./types";

const maxRequestBytes = 12 * 1024;

type ContactHandlerDependencies = {
  environment?: ContactEnvironment;
  emailProvider?: ContactEmailProvider;
  verifyTurnstile?: (token: string, secret: string, remoteIp?: string) => Promise<boolean>;
  now?: () => Date;
  logError?: (details: Record<string, string | undefined>) => void;
};

type ContactApiResponse = {
  status: "submitted" | "error";
  code?: string;
  message?: string;
  fields?: Record<string, string>;
};

function response(statusCode: number, payload: ContactApiResponse): ContactFunctionResponse {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
    body: JSON.stringify(payload),
  };
}

function getHeader(headers: ContactFunctionRequest["headers"], name: string) {
  const target = name.toLowerCase();
  const key = Object.keys(headers).find((headerName) => headerName.toLowerCase() === target);
  return key ? headers[key]?.trim() : undefined;
}

function getRequestBody(request: ContactFunctionRequest) {
  if (request.body === null) return Buffer.alloc(0);

  return request.isBase64Encoded
    ? Buffer.from(request.body, "base64")
    : Buffer.from(request.body, "utf8");
}

function getValidationFields(error: z.ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = typeof issue.path[0] === "string" ? issue.path[0] : "_form";
    fields[field] ??= issue.message;
  }
  return fields;
}

function readEnvironment(environment?: ContactEnvironment): ContactEnvironment {
  const source = environment ?? process.env;
  return {
    RESEND_API_KEY: source.RESEND_API_KEY,
    CONTACT_TO_EMAIL: source.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: source.CONTACT_FROM_EMAIL,
    CONTACT_REPLY_TO_EMAIL: source.CONTACT_REPLY_TO_EMAIL,
    CONTACT_SEND_ACKNOWLEDGEMENT: source.CONTACT_SEND_ACKNOWLEDGEMENT,
    TURNSTILE_SECRET_KEY: source.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: source.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  };
}

function getEmailConfigurationIssue(environment: ContactEnvironment) {
  if (!environment.RESEND_API_KEY?.trim()) return "missing_resend_api_key";
  if (!z.email().safeParse(environment.CONTACT_TO_EMAIL?.trim()).success) {
    return "invalid_contact_to_email";
  }
  if (!z.email().safeParse(environment.CONTACT_FROM_EMAIL?.trim()).success) {
    return "invalid_contact_from_email";
  }
  if (
    environment.CONTACT_REPLY_TO_EMAIL?.trim() &&
    !z.email().safeParse(environment.CONTACT_REPLY_TO_EMAIL.trim()).success
  ) {
    return "invalid_contact_reply_to_email";
  }
  return undefined;
}

async function verifyTurnstileToken(
  token: string,
  secret: string,
  remoteIp?: string,
) {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!result.ok) return false;
    const payload: unknown = await result.json();
    return (
      typeof payload === "object" &&
      payload !== null &&
      "success" in payload &&
      payload.success === true
    );
  } catch {
    return false;
  }
}

function isSameOrigin(headers: ContactFunctionRequest["headers"]) {
  const origin = getHeader(headers, "origin");
  if (!origin) return true;

  const requestHost =
    getHeader(headers, "x-forwarded-host")?.split(",")[0]?.trim() ??
    getHeader(headers, "host");
  if (!requestHost) return false;

  try {
    const originUrl = new URL(origin);
    const forwardedProto = getHeader(headers, "x-forwarded-proto")?.split(",")[0]?.trim();

    if (forwardedProto) {
      const requestUrl = new URL(`${forwardedProto}://${requestHost}`);
      return originUrl.origin === requestUrl.origin;
    }

    return originUrl.host.toLowerCase() === requestHost.toLowerCase();
  } catch {
    return false;
  }
}

export async function handleContactRequest(
  request: ContactFunctionRequest,
  dependencies: ContactHandlerDependencies = {},
): Promise<ContactFunctionResponse> {
  if (request.method.toUpperCase() !== "POST") {
    const methodResponse = response(405, {
      status: "error",
      code: "method_not_allowed",
      message: "Use POST to submit an inquiry.",
    });
    methodResponse.headers.allow = "POST";
    return methodResponse;
  }

  if (!isSameOrigin(request.headers)) {
    return response(403, { status: "error", code: "invalid_origin", message: "This request could not be accepted." });
  }

  const contentType = getHeader(request.headers, "content-type")?.split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    return response(415, { status: "error", code: "unsupported_media_type", message: "Submit the inquiry as JSON." });
  }

  const announcedLength = getHeader(request.headers, "content-length");
  if (announcedLength && (!/^\d+$/.test(announcedLength) || Number(announcedLength) > maxRequestBytes)) {
    return response(413, { status: "error", code: "request_too_large", message: "The inquiry is too large to submit." });
  }

  let body: Buffer;
  try {
    body = getRequestBody(request);
  } catch {
    return response(400, { status: "error", code: "invalid_request", message: "The inquiry could not be read." });
  }
  if (body.byteLength > maxRequestBytes) {
    return response(413, { status: "error", code: "request_too_large", message: "The inquiry is too large to submit." });
  }

  let rawInput: unknown;
  try {
    rawInput = JSON.parse(body.toString("utf8"));
  } catch {
    return response(400, { status: "error", code: "invalid_json", message: "Enter a valid inquiry and try again." });
  }

  if (
    typeof rawInput === "object" &&
    rawInput !== null &&
    "website" in rawInput &&
    typeof rawInput.website === "string" &&
    rawInput.website.trim().length > 0
  ) {
    return response(200, { status: "submitted" });
  }

  const parsed = contactInquirySchema.safeParse(rawInput);
  if (!parsed.success) {
    return response(400, {
      status: "error",
      code: "validation_error",
      message: "Check the highlighted fields and try again.",
      fields: getValidationFields(parsed.error),
    });
  }

  const environment = readEnvironment(dependencies.environment);
  const configurationIssue = getEmailConfigurationIssue(environment);
  if (configurationIssue) {
    return response(503, {
      status: "error",
      code: "delivery_not_configured",
      message: "Contact delivery is not configured in this environment.",
    });
  }

  const turnstileSecret = environment.TURNSTILE_SECRET_KEY?.trim();
  const turnstileSiteKey = environment.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (Boolean(turnstileSecret) !== Boolean(turnstileSiteKey)) {
    return response(503, {
      status: "error",
      code: "security_check_not_configured",
      message: "Contact delivery is not configured in this environment.",
    });
  }

  if (turnstileSecret && turnstileSiteKey) {
    const token = parsed.data.turnstileToken?.trim();
    if (!token) {
      return response(400, {
        status: "error",
        code: "security_check_required",
        message: "Complete the security check and try again.",
        fields: { turnstileToken: "Complete the security check before submitting." },
      });
    }

    const remoteIp =
      getHeader(request.headers, "x-nf-client-connection-ip") ??
      getHeader(request.headers, "x-forwarded-for")?.split(",")[0]?.trim();
    const verify = dependencies.verifyTurnstile ?? verifyTurnstileToken;
    const verified = await verify(token, turnstileSecret, remoteIp);
    if (!verified) {
      return response(403, {
        status: "error",
        code: "security_check_failed",
        message: "The security check could not be verified. Please try again.",
        fields: { turnstileToken: "The security check expired or could not be verified. Try again." },
      });
    }
  }

  const emailProvider =
    dependencies.emailProvider ?? createResendEmailProvider(environment);
  if (!emailProvider) {
    return response(503, {
      status: "error",
      code: "delivery_not_configured",
      message: "Contact delivery is not configured in this environment.",
    });
  }

  const requestId = randomUUID();
  const inquiry = {
    name: parsed.data.name,
    email: parsed.data.email,
    organization: parsed.data.organization,
    service: parsed.data.service,
    projectStage: parsed.data.projectStage,
    summary: parsed.data.summary,
  };
  const submittedAt = (dependencies.now ?? (() => new Date()))().toISOString();

  try {
    await emailProvider.sendInquiry(inquiry, submittedAt);
  } catch {
    (dependencies.logError ?? ((details) => console.error("Contact function delivery failed.", details)))({
      requestId,
      category: "internal_email_delivery_failed",
    });
    return response(502, {
      status: "error",
      code: "delivery_failed",
      message: "We couldn’t submit your inquiry right now. Please try again.",
    });
  }

  if (
    environment.CONTACT_SEND_ACKNOWLEDGEMENT?.trim().toLowerCase() === "true" &&
    emailProvider.sendAcknowledgement
  ) {
    try {
      await emailProvider.sendAcknowledgement(inquiry);
    } catch {
      (dependencies.logError ?? ((details) => console.error("Contact function acknowledgement failed.", details)))({
        requestId,
        category: "visitor_acknowledgement_failed",
      });
    }
  }

  return response(200, { status: "submitted" });
}
