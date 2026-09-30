import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/content/site-url";

export const dynamic = "force-static";

const routes = ["/", "/services/", "/solutions/", "/work/", "/about/", "/contact/", "/privacy/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];

  return routes.map((route) => ({
    url: new URL(route, origin).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
