import type { ContactEnvironment, ContactInquiry, ContactEmailProvider } from "./types";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function buildInquiryContent(inquiry: ContactInquiry, submittedAt: string) {
  const fields = [
    ["Name", inquiry.name],
    ["Business email", inquiry.email],
    ["Company / organization", inquiry.organization],
    ["Service needed", inquiry.service],
    ["Project stage", inquiry.projectStage],
    ["Project summary", inquiry.summary],
    ["Submitted at (UTC)", submittedAt],
  ] as const;

  const text = fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  const html = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:10px 14px 10px 0;color:#64748b;font-weight:600">${escapeHtml(label)}</th><td style="padding:10px 0;color:#0f172a;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return {
    text,
    html: `<div style="font-family:Arial,sans-serif;color:#0f172a"><h1 style="font-size:20px">New Agape Tech project inquiry</h1><table style="border-collapse:collapse">${html}</table></div>`,
  };
}

export class ContactDeliveryError extends Error {
  constructor(readonly providerCode?: string) {
    super("Contact email delivery failed.");
    this.name = "ContactDeliveryError";
  }
}

export function createResendEmailProvider(
  environment: ContactEnvironment,
): ContactEmailProvider | undefined {
  const apiKey = environment.RESEND_API_KEY?.trim();
  const from = environment.CONTACT_FROM_EMAIL?.trim();
  const to = environment.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !from || !to) return undefined;

  return new ResendContactEmailProvider(apiKey, from, to, environment.CONTACT_REPLY_TO_EMAIL?.trim());
}

class ResendContactEmailProvider implements ContactEmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly to: string,
    private readonly acknowledgementReplyTo?: string,
  ) {}

  async sendInquiry(inquiry: ContactInquiry, submittedAt: string) {
    const { Resend } = await import("resend");
    const resend = new Resend(this.apiKey);
    const content = buildInquiryContent(inquiry, submittedAt);
    const { error } = await resend.emails.send({
      from: this.from,
      to: this.to,
      replyTo: inquiry.email,
      subject: `New Agape Tech Project Inquiry — ${inquiry.service}`,
      ...content,
    });

    if (error) throw new ContactDeliveryError(error.name);
  }

  async sendAcknowledgement(inquiry: ContactInquiry) {
    const { Resend } = await import("resend");
    const resend = new Resend(this.apiKey);
    const escapedName = escapeHtml(inquiry.name);
    const { error } = await resend.emails.send({
      from: this.from,
      to: inquiry.email,
      ...(this.acknowledgementReplyTo ? { replyTo: this.acknowledgementReplyTo } : {}),
      subject: "We received your Agape Tech inquiry",
      text: [
        `Hello ${inquiry.name},`,
        "",
        "Thank you for contacting Agape Tech. Your project inquiry has been received.",
        "We will review the information and respond through the contact information you provided.",
        "",
        "Technology with Purpose.",
      ].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;color:#0f172a"><p>Hello ${escapedName},</p><p>Thank you for contacting Agape Tech. Your project inquiry has been received.</p><p>We will review the information and respond through the contact information you provided.</p><p>Technology with Purpose.</p></div>`,
    });

    if (error) throw new ContactDeliveryError(error.name);
  }
}
