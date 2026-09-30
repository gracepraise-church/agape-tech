export type LeadershipProfile = {
  name: string | null;
  title: string | null;
  photo: string | null;
  summary: string | null;
  linkedin: string | null;
  areasOfExpertise: string[];
};

export const companyHistory = {
  establishedYear: 2014,
  establishedLabel: "Established 2014",
  yearsValue: "12+",
  yearsLabel: "12+ Years",
  sinceLabel: "Since 2014",
} as const;

export const business = {
  brandName: "Agape Tech",
  legalName: "Agape Tech LLC",
  tagline: "Technology with Purpose.",
  companyHistory,
  publicEmail: null as string | null,
  phone: null as string | null,
  linkedin: null as string | null,
  location: null as string | null,
  founder: {
    name: null,
    title: null,
    photo: null,
    summary: null,
    linkedin: null,
    areasOfExpertise: [],
  } satisfies LeadershipProfile,
} as const;
