import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = ["", "services/", "solutions/", "work/", "about/", "contact/", "privacy/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];

  const origin = new URL(siteUrl);
  return routes.map((route) => ({
    url: new URL(route, origin).toString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
