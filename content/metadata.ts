import type { Metadata } from "next";
import { getSiteOrigin } from "./site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

const siteOrigin = getSiteOrigin();

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const canonicalUrl = siteOrigin ? new URL(path, siteOrigin).toString() : undefined;
  const socialBrandImage = siteOrigin
    ? new URL("/assets/brand/agape-tech-icon-512.png", siteOrigin).toString()
    : undefined;
  const fullTitle = title === "Agape Tech" ? title : `${title} | Agape Tech`;

  return {
    title,
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
                width: 512,
                height: 512,
                alt: "Agape Tech brand icon",
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
