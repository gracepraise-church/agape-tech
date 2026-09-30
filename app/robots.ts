import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/content/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteOrigin = getSiteOrigin();

  return {
    rules: {
      userAgent: "*",
      ...(siteOrigin ? { allow: "/" } : { disallow: "/" }),
    },
    ...(siteOrigin ? { sitemap: new URL("/sitemap.xml", siteOrigin).toString() } : {}),
  };
}
