import { z } from "zod";
import { contactServices, projectStages } from "./options";

export { contactServices, projectStages };

export const contactInquirySchema = z
  .object({
    name: z.string().trim().min(2, "Enter at least 2 characters.").max(120, "Name is too long."),
    email: z.email("Enter a valid email address.").max(254, "Email address is too long."),
    organization: z
      .string()
      .trim()
      .min(1, "Enter your company or organization.")
      .max(160, "Organization name is too long."),
    service: z.enum(contactServices, { error: "Choose a supported service." }),
    projectStage: z.enum(projectStages, { error: "Choose a supported project stage." }),
    summary: z
      .string()
      .trim()
      .min(20, "Add at least 20 characters so we can understand the inquiry.")
      .max(4000, "Project summary must be 4,000 characters or fewer."),
    website: z.string().max(500).optional(),
    turnstileToken: z.string().max(2048).optional(),
  })
  .strict();

export type ContactInquiryInput = z.input<typeof contactInquirySchema>;
