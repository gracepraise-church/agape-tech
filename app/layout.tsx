import type { Metadata, Viewport } from "next";
import { ScrollRevealObserver } from "@/components/scroll-reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { socialBrandImageAlt, socialBrandImagePath } from "@/content/metadata";
import { getSiteOrigin } from "@/content/site-url";
import "./globals.css";
import "./interactive.css";

const description =
  "Agape Tech helps organizations build, automate, validate, and scale digital solutions through professional websites, custom business software, AI quality engineering, and technology consulting.";
const siteOrigin = getSiteOrigin();
const socialBrandImage = siteOrigin
  ? new URL(socialBrandImagePath, siteOrigin).toString()
  : undefined;

export const metadata: Metadata = {
  ...(siteOrigin
    ? {
        metadataBase: siteOrigin,
        alternates: { canonical: siteOrigin.toString() },
      }
    : {}),
  title: {
    default: "Custom Software, Websites & QA | Agape Tech",
    template: "%s | Agape Tech",
  },
  description,
  ...(!siteOrigin ? { robots: { index: false, follow: false } } : {}),
  applicationName: "Agape Tech",
  openGraph: {
    type: "website",
    siteName: "Agape Tech",
    title: "Custom Software, Websites & QA | Agape Tech",
    description,
    ...(siteOrigin && socialBrandImage
      ? {
          url: siteOrigin.toString(),
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

// The `js` class is part of the server-rendered document so React hydrates the
// exact same <html> element that the browser receives. When scripting is
// disabled, this noscript stylesheet restores the normal flow layout instead
// of reserving space for the client-side pinned stories.
const noScriptStoryStyles = `
@media (min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference) {
  .js .story-section {
    padding-bottom: clamp(64px, 8vw, 110px);
  }

  .js .story-section .story-track {
    height: auto;
    margin-top: clamp(38px, 5vw, 64px);
  }

  .js .work-story-section {
    padding-block: clamp(88px, 10vw, 142px);
  }

  .js .work-story-outer {
    height: auto;
  }
}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="js" lang="en">
      <head>
        <noscript>
          <style>{noScriptStoryStyles}</style>
        </noscript>
      </head>
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
