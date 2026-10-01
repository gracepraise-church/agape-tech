export const contactServices = [
  "Website Development",
  "Custom Web Application",
  "Custom Business Software",
  "Accounting & Management Software",
  "AI Quality Engineering",
  "Test Automation",
  "API & Integration",
  "Performance Engineering",
  "Cloud & Technology Consulting",
  "Other / Not Sure Yet",
] as const;

export type ContactService = (typeof contactServices)[number];

export function isContactService(value: string): value is ContactService {
  return (contactServices as readonly string[]).includes(value);
}

export const projectStages = [
  "Idea",
  "Planning",
  "Existing Product",
  "Modernization",
  "Production Issue",
] as const;
