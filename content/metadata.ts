import type { Metadata } from "next";
import { getSiteOrigin } from "./site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export const socialBrandImagePath = "/assets/brand/agape-tech-logo-stacked-transparent.webp";
export const socialBrandImageAlt = "Agape Tech logo — Technology with Purpose";

const siteOrigin = getSiteOrigin();

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const canonicalUrl = siteOrigin ? new URL(path, siteOrigin).toString() : undefined;
  const socialBrandImage = siteOrigin
    ? new URL(socialBrandImagePath, siteOrigin).toString()
    : undefined;
  const fullTitle = title === "Agape Tech" ? title : `${title} | Agape Tech`;

  return {
    title: path === "/" ? fullTitle : title,
    description,
    ...(!siteOrigin ? { robots: { index: false, follow: false } } : {}),
    ...(canonicalUrl
      ? {
          alternates: { canonical: canonicalUrl },
        }
      : {}),
    openGraph: {
      type: "website",
      siteName: "Agape Tech",
      title: fullTitle,
      description,
      ...(canonicalUrl && socialBrandImage
        ? {
            url: canonicalUrl,
            images: [
              {
                url: socialBrandImage,
                width: 1254,
                height: 1254,
                alt: socialBrandImageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(socialBrandImage ? { images: [socialBrandImage] } : {}),
    },
  };
}
