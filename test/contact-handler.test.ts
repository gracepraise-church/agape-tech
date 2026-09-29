import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleContactRequest } from "../lib/contact/handler";
import type { ContactEmailProvider, ContactEnvironment, ContactFunctionRequest } from "../lib/contact/types";

const environment: ContactEnvironment = {
  RESEND_API_KEY: "test-key",
  CONTACT_TO_EMAIL: "inquiries@example.com",
  CONTACT_FROM_EMAIL: "website@example.com",
};

const validInquiry = {
  name: "Taylor Example",
  email: "taylor@example.com",
  organization: "Example Studio",
  service: "Software Development",
  projectStage: "Planning",
  summary: "We need help planning a thoughtful software product.",
  website: "",
};

function request(
  body: unknown = validInquiry,
  overrides: Partial<ContactFunctionRequest> = {},
): ContactFunctionRequest {
  return {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    ...overrides,
  };
}

function provider(): ContactEmailProvider & {
  sendInquiry: ReturnType<typeof vi.fn>;
  sendAcknowledgement: ReturnType<typeof vi.fn>;
} {
  return {
    sendInquiry: vi.fn().mockResolvedValue(undefined),
    sendAcknowledgement: vi.fn().mockResolvedValue(undefined),
  };
}

function payload(response: Awaited<ReturnType<typeof handleContactRequest>>) {
  return JSON.parse(response.body) as Record<string, unknown>;
}

describe("handleContactRequest", () => {
  let emailProvider: ReturnType<typeof provider>;

  beforeEach(() => {
    emailProvider = provider();
  });

  it("rejects non-POST requests", async () => {
    const result = await handleContactRequest(request(undefined, { method: "GET" }), {
      environment,
      emailProvider,
    });

    expect(result.statusCode).toBe(405);
    expect(result.headers.allow).toBe("POST");
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("requires JSON content", async () => {
    const result = await handleContactRequest(
      request(undefined, { headers: { "content-type": "text/plain" } }),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(415);
  });

  it("rejects requests larger than the configured bound", async () => {
    const result = await handleContactRequest(
      request("x".repeat(12 * 1024 + 1)),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(413);
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const result = await handleContactRequest(request(undefined, { body: "{" }), {
      environment,
      emailProvider,
    });

    expect(result.statusCode).toBe(400);
    expect(payload(result).code).toBe("invalid_json");
  });

  it("returns field errors for unsupported service and invalid input", async () => {
    const result = await handleContactRequest(
      request({ ...validInquiry, service: "Something unexpected", email: "not-an-email" }),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(400);
    expect(payload(result).code).toBe("validation_error");
    expect(payload(result).fields).toMatchObject({
      email: expect.any(String),
      service: expect.any(String),
    });
  });

  it("accepts honeypot submissions without sending email", async () => {
    const result = await handleContactRequest(
      request({ ...validInquiry, website: "automated bot" }),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(200);
    expect(payload(result)).toEqual({ status: "submitted" });
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("reports missing delivery configuration without accepting the inquiry", async () => {
    const result = await handleContactRequest(request(), {
      environment: {},
      emailProvider,
    });

    expect(result.statusCode).toBe(503);
    expect(payload(result).code).toBe("delivery_not_configured");
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("blocks requests with a mismatched origin", async () => {
    const result = await handleContactRequest(
      request(validInquiry, {
        headers: {
          "content-type": "application/json",
          origin: "https://attacker.example",
          host: "agape.example",
        },
      }),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(403);
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("fails closed when Turnstile verification is not successful", async () => {
    const verifyTurnstile = vi.fn().mockResolvedValue(false);
    const result = await handleContactRequest(
      request({ ...validInquiry, turnstileToken: "challenge-token" }),
      {
        environment: {
          ...environment,
          TURNSTILE_SECRET_KEY: "test-secret",
          NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-site-key",
        },
        emailProvider,
        verifyTurnstile,
      },
    );

    expect(result.statusCode).toBe(403);
    expect(verifyTurnstile).toHaveBeenCalledWith("challenge-token", "test-secret", undefined);
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("requires a Turnstile token when verification is enabled", async () => {
    const result = await handleContactRequest(request(), {
      environment: {
        ...environment,
        TURNSTILE_SECRET_KEY: "test-secret",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-site-key",
      },
      emailProvider,
    });

    expect(result.statusCode).toBe(400);
    expect(payload(result).code).toBe("security_check_required");
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("sends a valid inquiry and only then returns submitted", async () => {
    const now = new Date("2025-01-02T03:04:05.000Z");
    const result = await handleContactRequest(request(), {
      environment,
      emailProvider,
      now: () => now,
    });

    expect(result.statusCode).toBe(200);
    expect(payload(result)).toEqual({ status: "submitted" });
    expect(emailProvider.sendInquiry).toHaveBeenCalledWith(
      {
        name: validInquiry.name,
        email: validInquiry.email,
        organization: validInquiry.organization,
        service: validInquiry.service,
        projectStage: validInquiry.projectStage,
        summary: validInquiry.summary,
      },
      now.toISOString(),
    );
  });

  it("does not claim success after provider failure", async () => {
    emailProvider.sendInquiry.mockRejectedValue(new Error("provider details are private"));
    const logError = vi.fn();
    const result = await handleContactRequest(request(), {
      environment,
      emailProvider,
      logError,
    });

    expect(result.statusCode).toBe(502);
    expect(payload(result).code).toBe("delivery_failed");
    expect(result.body).not.toContain("provider details");
    expect(logError).toHaveBeenCalledWith(
      expect.objectContaining({ category: "internal_email_delivery_failed" }),
    );
  });

  it("sends an acknowledgement only when explicitly enabled", async () => {
    const result = await handleContactRequest(request(), {
      environment: { ...environment, CONTACT_SEND_ACKNOWLEDGEMENT: "true" },
      emailProvider,
    });

    expect(result.statusCode).toBe(200);
    expect(emailProvider.sendAcknowledgement).toHaveBeenCalledOnce();
  });
});
