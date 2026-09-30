import { contactInquirySchema } from "./contact/schema";

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

const requiredFieldMessage = "Complete the required fields before submitting.";
const shortSummaryMessage = "Please provide a little more detail about your project.";

const requiredFields = [
  "name",
  "email",
  "organization",
  "service",
  "projectStage",
  "summary",
] as const;

function readFormValue(formData: FormData, field: string) {
  return String(formData.get(field) ?? "");
}

/**
 * Read the browser's submitted controls, rather than a separate React state
 * snapshot. This keeps browser autofill and restored form values in the
 * submission source of truth.
 */
export function readContactFormData(
  formData: FormData,
  turnstileToken = "",
): ContactInquiry {
  return {
    name: readFormValue(formData, "name").trim(),
    email: readFormValue(formData, "email").trim(),
    organization: readFormValue(formData, "organization").trim(),
    service: readFormValue(formData, "service").trim(),
    projectStage: readFormValue(formData, "projectStage").trim(),
    summary: readFormValue(formData, "summary").trim(),
    website: readFormValue(formData, "website"),
    ...(turnstileToken ? { turnstileToken } : {}),
  };
}

/**
 * Keep browser feedback useful without weakening the canonical server schema.
 * Empty required controls share the form-level message; non-empty invalid
 * values retain the schema's specific message.
 */
export function getContactFormValidationErrors(
  inquiry: ContactInquiry,
): ContactValidationErrors {
  const parsed = contactInquirySchema.safeParse(inquiry);
  if (parsed.success) return {};

  const fields: ContactValidationErrors = {};
  let hasMissingRequiredField = false;

  for (const issue of parsed.error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string") continue;

    const value = field in inquiry ? String(inquiry[field as keyof ContactInquiry] ?? "").trim() : "";
    if (requiredFields.includes(field as (typeof requiredFields)[number]) && !value) {
      hasMissingRequiredField = true;
      fields[field] = requiredFieldMessage;
      continue;
    }

    if (field === "summary" && value.length > 0 && value.length < 20) {
      fields.summary = shortSummaryMessage;
      continue;
    }

    fields[field] ??= issue.message;
  }

  if (hasMissingRequiredField) fields._form = requiredFieldMessage;
  return fields;
}

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
