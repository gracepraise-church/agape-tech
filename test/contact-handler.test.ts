import { beforeEach, describe, expect, it, vi } from "vitest";

const googleSheetsMocks = vi.hoisted(() => ({
  addRow: vi.fn(),
  GoogleSpreadsheet: vi.fn(),
  JWT: vi.fn(),
  loadInfo: vi.fn(),
}));

vi.mock("google-auth-library", () => ({ JWT: googleSheetsMocks.JWT }));
vi.mock("google-spreadsheet", () => ({ GoogleSpreadsheet: googleSheetsMocks.GoogleSpreadsheet }));

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
    googleSheetsMocks.addRow.mockReset().mockResolvedValue(undefined);
    googleSheetsMocks.loadInfo.mockReset().mockResolvedValue(undefined);
    googleSheetsMocks.JWT.mockReset().mockImplementation(function () {
      return {};
    });
    googleSheetsMocks.GoogleSpreadsheet.mockReset().mockImplementation(function () {
      return {
        loadInfo: googleSheetsMocks.loadInfo,
        sheetsByTitle: {
          Leads: { addRow: googleSheetsMocks.addRow },
          Sheet1: { addRow: googleSheetsMocks.addRow },
        },
      };
    });
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

  it("blocks same-host requests when the scheme differs from the forwarded origin", async () => {
    const result = await handleContactRequest(
      request(validInquiry, {
        headers: {
          "content-type": "application/json",
          origin: "http://agape.example",
          host: "agape.example",
          "x-forwarded-proto": "https",
        },
      }),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(403);
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
  });

  it("accepts forwarded same-origin requests when the proxy passes through the correct scheme", async () => {
    const result = await handleContactRequest(
      request(validInquiry, {
        headers: {
          "content-type": "application/json",
          origin: "https://agape.example",
          host: "agape.example",
          "x-forwarded-proto": "https",
        },
      }),
      { environment, emailProvider },
    );

    expect(result.statusCode).toBe(200);
    expect(emailProvider.sendInquiry).toHaveBeenCalledOnce();
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

  it("verifies Turnstile before sending the inquiry", async () => {
    const verifyTurnstile = vi.fn().mockResolvedValue(true);
    const result = await handleContactRequest(
      request({ ...validInquiry, turnstileToken: "challenge-token" }, {
        headers: {
          "content-type": "application/json",
          "x-nf-client-connection-ip": "192.0.2.10",
        },
      }),
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

    expect(result.statusCode).toBe(200);
    expect(verifyTurnstile).toHaveBeenCalledWith("challenge-token", "test-secret", "192.0.2.10");
    expect(emailProvider.sendInquiry).toHaveBeenCalledOnce();
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
    expect(emailProvider.sendAcknowledgement).not.toHaveBeenCalled();
  });

  it("appends a valid inquiry to the configured Google Sheet", async () => {
    const result = await handleContactRequest(request(), {
      environment: {
        GOOGLE_CLIENT_EMAIL: "contact-form@example-project.iam.gserviceaccount.com",
        GOOGLE_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\\nprivate-key\\n-----END PRIVATE KEY-----\\n",
        GOOGLE_SHEET_ID: "spreadsheet-id",
        GOOGLE_SHEET_TAB: "Leads",
      },
    });

    expect(result.statusCode).toBe(200);
    expect(googleSheetsMocks.JWT).toHaveBeenCalledWith({
      email: "contact-form@example-project.iam.gserviceaccount.com",
      key: "-----BEGIN PRIVATE KEY-----\nprivate-key\n-----END PRIVATE KEY-----\n",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    expect(googleSheetsMocks.GoogleSpreadsheet).toHaveBeenCalledWith(
      "spreadsheet-id",
      expect.anything(),
    );
    expect(googleSheetsMocks.addRow).toHaveBeenCalledWith(
      {
        name: validInquiry.name,
        email: validInquiry.email,
        organization: validInquiry.organization,
        service: validInquiry.service,
        projectStage: validInquiry.projectStage,
        summary: validInquiry.summary,
      },
      { insert: true },
    );
    expect(Object.keys(googleSheetsMocks.addRow.mock.calls[0][0])).toEqual([
      "name",
      "email",
      "organization",
      "service",
      "projectStage",
      "summary",
    ]);
  });

  it("rejects incomplete Google Sheets configuration without calling a provider", async () => {
    const result = await handleContactRequest(request(), {
      environment: { GOOGLE_CLIENT_EMAIL: "contact-form@example-project.iam.gserviceaccount.com" },
      emailProvider,
    });

    expect(result.statusCode).toBe(503);
    expect(payload(result).code).toBe("delivery_not_configured");
    expect(emailProvider.sendInquiry).not.toHaveBeenCalled();
    expect(googleSheetsMocks.GoogleSpreadsheet).not.toHaveBeenCalled();
  });

  it("returns a generic delivery error when Google authentication fails", async () => {
    googleSheetsMocks.JWT.mockReset().mockImplementation(function () {
      throw new Error("private auth details");
    });
    const logError = vi.fn();

    const result = await handleContactRequest(request(), {
      environment: {
        GOOGLE_CLIENT_EMAIL: "contact-form@example-project.iam.gserviceaccount.com",
        GOOGLE_PRIVATE_KEY: "private-key",
        GOOGLE_SHEET_ID: "spreadsheet-id",
      },
      logError,
    });

    expect(result.statusCode).toBe(502);
    expect(payload(result).code).toBe("delivery_failed");
    expect(result.body).not.toContain("private auth details");
    expect(logError).toHaveBeenCalledWith({
      requestId: expect.any(String),
      category: "internal_google_sheets_delivery_failed",
    });
  });

  it("uses the legacy webhook only when direct Google Sheets is not configured", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 204 }));

    try {
      const result = await handleContactRequest(request(), {
        environment: { GOOGLE_SHEETS_WEBHOOK_URL: "https://example.test/contact-hook" },
      });

      expect(result.statusCode).toBe(200);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://example.test/contact-hook",
        expect.objectContaining({ method: "POST" }),
      );
      expect(googleSheetsMocks.GoogleSpreadsheet).not.toHaveBeenCalled();
    } finally {
      fetchMock.mockRestore();
    }
  });

  it("does not claim success when email succeeds but configured Sheets persistence fails", async () => {
    googleSheetsMocks.loadInfo.mockRejectedValueOnce(new Error("private Sheets details"));
    const logError = vi.fn();

    const result = await handleContactRequest(request(), {
      environment: {
        ...environment,
        GOOGLE_CLIENT_EMAIL: "contact-form@example-project.iam.gserviceaccount.com",
        GOOGLE_PRIVATE_KEY: "private-key",
        GOOGLE_SHEET_ID: "spreadsheet-id",
      },
      emailProvider,
      logError,
    });

    expect(result.statusCode).toBe(502);
    expect(emailProvider.sendInquiry).toHaveBeenCalledOnce();
    expect(payload(result).code).toBe("delivery_failed");
    expect(result.body).not.toContain("private Sheets details");
  });

  it("returns a generic delivery error when Google Sheets fails", async () => {
    googleSheetsMocks.loadInfo.mockRejectedValueOnce(new Error("private provider details"));
    const logError = vi.fn();

    const result = await handleContactRequest(request(), {
      environment: {
        GOOGLE_CLIENT_EMAIL: "contact-form@example-project.iam.gserviceaccount.com",
        GOOGLE_PRIVATE_KEY: "private-key",
        GOOGLE_SHEET_ID: "spreadsheet-id",
      },
      logError,
    });

    expect(result.statusCode).toBe(502);
    expect(payload(result).code).toBe("delivery_failed");
    expect(result.body).not.toContain("private provider details");
    expect(logError).toHaveBeenCalledWith({
      requestId: expect.any(String),
      category: "internal_google_sheets_delivery_failed",
    });
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

  it("does not turn a delivered inquiry into a failure when acknowledgement fails", async () => {
    emailProvider.sendAcknowledgement.mockRejectedValue(new Error("private provider response"));
    const logError = vi.fn();
    const result = await handleContactRequest(request(), {
      environment: { ...environment, CONTACT_SEND_ACKNOWLEDGEMENT: "true" },
      emailProvider,
      logError,
    });

    expect(result.statusCode).toBe(200);
    expect(payload(result)).toEqual({ status: "submitted" });
    expect(logError).toHaveBeenCalledWith(
      expect.objectContaining({ category: "visitor_acknowledgement_failed" }),
    );
  });
});
