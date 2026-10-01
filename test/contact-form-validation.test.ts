import { describe, expect, it } from "vitest";
import {
  getContactFormValidationErrors,
  readContactFormData,
  type ContactInquiry,
} from "../lib/contact-submission";

const validValues = {
  name: "Taylor Example",
  email: "taylor@example.com",
  organization: "Example Studio",
  service: "Custom Web Application",
  projectStage: "Planning",
  summary: "We need help planning a thoughtful software product.",
  website: "",
};

function formData(overrides: Partial<typeof validValues> = {}) {
  const values = { ...validValues, ...overrides };
  const data = new FormData();
  for (const [field, value] of Object.entries(values)) data.set(field, value);
  return data;
}

describe("contact form DOM submission contract", () => {
  it("accepts a manually completed valid form", () => {
    const inquiry = readContactFormData(formData());

    expect(inquiry).toEqual(validValues);
    expect(getContactFormValidationErrors(inquiry)).toEqual({});
  });

  it("accepts values present in FormData even without React state", () => {
    const autofilledForm = formData({
      name: "Autofilled Name",
      email: "autofilled@example.com",
      organization: "Autofilled Organization",
    });

    const inquiry = readContactFormData(autofilledForm);

    expect(inquiry.name).toBe("Autofilled Name");
    expect(inquiry.email).toBe("autofilled@example.com");
    expect(inquiry.organization).toBe("Autofilled Organization");
    expect(getContactFormValidationErrors(inquiry)).toEqual({});
  });

  it("rejects one actually empty required field with the form-level message", () => {
    const errors = getContactFormValidationErrors(
      readContactFormData(formData({ organization: "" })),
    );

    expect(errors).toMatchObject({
      organization: "Complete the required fields before submitting.",
      _form: "Complete the required fields before submitting.",
    });
  });

  it("treats whitespace-only required values as empty", () => {
    const errors = getContactFormValidationErrors(
      readContactFormData(formData({ name: "   " })),
    );

    expect(errors._form).toBe("Complete the required fields before submitting.");
    expect(errors.name).toBe("Complete the required fields before submitting.");
  });

  it("accepts supported service and project-stage select values", () => {
    const inquiry = readContactFormData(
      formData({ service: "AI Quality Engineering", projectStage: "Production Issue" }),
    );

    expect(inquiry.service).toBe("AI Quality Engineering");
    expect(inquiry.projectStage).toBe("Production Issue");
    expect(getContactFormValidationErrors(inquiry)).toEqual({});
  });

  it("gives a specific message when the summary is too short", () => {
    const errors = getContactFormValidationErrors(
      readContactFormData(formData({ summary: "Too brief" })),
    );

    expect(errors).toEqual({
      summary: "Please provide a little more detail about your project.",
    });
  });

  it("does not add or require a Turnstile token when the widget is not configured", () => {
    const inquiry = readContactFormData(formData());

    expect(inquiry.turnstileToken).toBeUndefined();
    expect(getContactFormValidationErrors(inquiry)).toEqual({});
  });

  it("retains the specific email validation message for non-empty invalid email", () => {
    const inquiry = readContactFormData(formData({ email: "not-an-email" }));

    expect(getContactFormValidationErrors(inquiry)).toEqual({
      email: "Enter a valid email address.",
    });
  });

  it("keeps the canonical payload fields separate from the honeypot", () => {
    const inquiry = readContactFormData(formData({ website: "" }), "");
    const payloadKeys = Object.keys(inquiry) as Array<keyof ContactInquiry>;

    expect(payloadKeys).toEqual([
      "name",
      "email",
      "organization",
      "service",
      "projectStage",
      "summary",
      "website",
    ]);
  });
});
