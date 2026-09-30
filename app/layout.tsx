import type { Metadata, Viewport } from "next";
import { ScrollRevealObserver } from "@/components/scroll-reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteOrigin } from "@/content/site-url";
import "./globals.css";

const description =
  "Agape Tech helps organizations build, automate, validate, and scale digital solutions through AI, quality engineering, software development, and technology consulting.";
const siteOrigin = getSiteOrigin();
const socialBrandImage = siteOrigin
  ? new URL("/assets/brand/agape-tech-icon-512.png", siteOrigin).toString()
  : undefined;

export const metadata: Metadata = {
  ...(siteOrigin
    ? {
        metadataBase: siteOrigin,
        alternates: { canonical: "/" },
      }
    : {}),
  title: {
    default: "Agape Tech | Technology with Purpose",
    template: "%s | Agape Tech",
  },
  description,
  ...(!siteOrigin ? { robots: { index: false, follow: false } } : {}),
  applicationName: "Agape Tech",
  keywords: [
    "technology consulting",
    "quality engineering",
    "AI engineering",
    "test automation",
    "software development",
  ],
  openGraph: {
    type: "website",
    siteName: "Agape Tech",
    title: "Agape Tech | Technology with Purpose",
    description,
    ...(siteOrigin && socialBrandImage
      ? {
          url: siteOrigin.toString(),
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
    title: "Agape Tech | Technology with Purpose",
    description,
    ...(socialBrandImage ? { images: [socialBrandImage] } : {}),
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/assets/brand/agape-tech-icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/brand/agape-tech-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/brand/agape-tech-icon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/assets/brand/agape-tech-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/brand/agape-tech-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/assets/brand/agape-tech-icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#07111F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <ScrollRevealObserver />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
