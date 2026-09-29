import type { z } from "zod";
import { contactInquirySchema } from "./schema";

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export type ContactEnvironment = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_REPLY_TO_EMAIL?: string;
  CONTACT_SEND_ACKNOWLEDGEMENT?: string;
  TURNSTILE_SECRET_KEY?: string;
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
};

export interface ContactEmailProvider {
  sendInquiry(inquiry: ContactInquiry, submittedAt: string): Promise<void>;
  sendAcknowledgement?(inquiry: ContactInquiry): Promise<void>;
}

export type ContactFunctionRequest = {
  method: string;
  headers: Record<string, string | undefined>;
  body: string | null;
  isBase64Encoded?: boolean;
};

export type ContactFunctionResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};
