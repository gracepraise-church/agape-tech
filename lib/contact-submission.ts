export type ContactInquiry = {
  name: string;
  email: string;
  organization: string;
  service: string;
  projectStage: string;
  summary: string;
  website: string;
  turnstileToken?: string;
};

export type ContactValidationErrors = Record<string, string>;

type ContactApiResult =
  | { status: "submitted" }
  | { status: "error"; code?: string; message?: string; fields?: ContactValidationErrors };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseContactApiResult(value: unknown): ContactApiResult | undefined {
  if (!isRecord(value)) return undefined;
  if (value.status === "submitted") return { status: "submitted" };
  if (value.status !== "error") return undefined;

  const fields = isRecord(value.fields)
    ? Object.fromEntries(
        Object.entries(value.fields).filter(
          (entry): entry is [string, string] => typeof entry[1] === "string",
        ),
      )
    : undefined;

  return {
    status: "error",
    ...(typeof value.code === "string" ? { code: value.code } : {}),
    ...(typeof value.message === "string" ? { message: value.message } : {}),
    ...(fields ? { fields } : {}),
  };
}

export class ContactRequestError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly fields?: ContactValidationErrors,
  ) {
    super(message);
    this.name = "ContactRequestError";
  }
}

export async function submitContactInquiry(
  inquiry: ContactInquiry,
): Promise<{ status: "submitted" }> {
  const response = await fetch("/.netlify/functions/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(inquiry),
  });

  let result: ContactApiResult;
  try {
    const payload: unknown = await response.json();
    const parsed = parseContactApiResult(payload);
    if (!parsed) throw new Error("Invalid contact response.");
    result = parsed;
  } catch {
    throw new ContactRequestError("server_error", "We couldn’t submit your inquiry right now. Please try again.");
  }

  if (!response.ok || result.status !== "submitted") {
    const code = result.status === "error" ? result.code ?? "server_error" : "server_error";
    const fields = result.status === "error" ? result.fields : undefined;
    const message =
      result.status === "error" && result.message
        ? result.message
        : "We couldn’t submit your inquiry right now. Please try again.";
    throw new ContactRequestError(code, message, fields);
  }

  return { status: "submitted" };
}
