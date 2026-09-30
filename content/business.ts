export type LeadershipProfile = {
  name: string | null;
  title: string | null;
  photo: string | null;
  summary: string | null;
  linkedin: string | null;
  areasOfExpertise: string[];
};

export const business = {
  brandName: "Agape Tech",
  legalName: "Agape Tech LLC",
  tagline: "Technology with Purpose.",
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
