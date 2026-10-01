import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { companyHistory } from "../content/business";
import { serviceLandings } from "../content/service-landings";
import { services } from "../content/site";
import { getSiteOrigin } from "../content/site-url";
import { contactServices, isContactService } from "../lib/contact/options";

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const publicRoutes = [
  "/",
  "/services/",
  "/services/website-development/",
  "/services/custom-software/",
  "/services/ai-quality-engineering/",
  "/services/qa-automation/",
  "/solutions/",
  "/work/",
  "/about/",
  "/contact/",
  "/privacy/",
] as const;

const expectedTitles = [
  "Custom Software, Websites & QA",
  "Custom Software & Quality Engineering Services",
  "Website Development Services",
  "Custom Business Software Development",
  "AI Quality Engineering Services",
  "QA Automation and Test Automation Services",
  "Technology Solutions for Real Business Problems",
  "Representative Software Engineering Experience",
  "About: Technology with Purpose",
  "Request a Custom Quote",
  "Privacy Policy",
] as const;

const landingPages = [
  "app/services/website-development/page.tsx",
  "app/services/custom-software/page.tsx",
  "app/services/ai-quality-engineering/page.tsx",
  "app/services/qa-automation/page.tsx",
] as const;

afterEach(() => vi.unstubAllEnvs());

describe("SEO metadata and public route contract", () => {
  it("keeps every public page on the shared metadata path with a unique descriptive title", () => {
    const pageSources = [
      "app/page.tsx",
      "app/services/page.tsx",
      ...landingPages,
      "app/solutions/page.tsx",
      "app/work/page.tsx",
      "app/about/page.tsx",
      "app/contact/page.tsx",
      "app/privacy/page.tsx",
    ].map(source);

    expect(new Set(expectedTitles).size).toBe(expectedTitles.length);
    for (const pageSource of pageSources) expect(pageSource).toContain("createPageMetadata");
    expect(source("content/metadata.ts")).toContain("alternates: { canonical: canonicalUrl }");
  });

  it("emits production-domain canonical sitemap entries for every public route", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://agapetech-llc.com");
    const sitemapSource = source("app/sitemap.ts");
    const origin = getSiteOrigin();

    expect(origin?.toString()).toBe("https://agapetech-llc.com/");
    for (const route of publicRoutes) {
      expect(sitemapSource).toContain(`"${route}"`);
      expect(new URL(route, origin).toString()).toBe(`https://agapetech-llc.com${route}`);
    }
  });

  it("keeps production pages indexable and the preview metadata branded", () => {
    const layoutSource = source("app/layout.tsx");
    const metadataSource = source("content/metadata.ts");

    expect(layoutSource).toContain('default: "Custom Software, Websites & QA | Agape Tech"');
    expect(layoutSource).toContain('type: "website"');
    expect(layoutSource).toContain("socialBrandImagePath");
    expect(metadataSource).toContain("openGraph:");
    expect(metadataSource).toContain("twitter:");
    expect(metadataSource).toContain("socialBrandImageAlt");
    expect(metadataSource).not.toContain("keywords:");
    for (const page of landingPages) expect(source(page)).not.toContain("noindex");
  });

  it("keeps the homepage Organization schema factual and tied to the production origin", () => {
    const homepageSource = source("app/page.tsx");

    expect(homepageSource).toContain('"@type": "Organization"');
    expect(homepageSource).toContain('"@type": "ImageObject"');
    expect(homepageSource).toContain("business.legalName");
    expect(homepageSource).toContain("business.companyHistory.establishedYear");
    expect(companyHistory.establishedYear).toBe(2014);
    expect(homepageSource).not.toContain("aggregateRating");
    expect(homepageSource).not.toContain("streetAddress");
  });

  it("gives each new landing page one PageHero H1 and substantive service content", () => {
    const landingSource = source("components/service-landing-page.tsx");

    expect(landingSource.match(/<PageHero\b/g)).toHaveLength(1);
    expect(landingSource).not.toMatch(/<h1\b/);
    expect(landingSource).toContain("propositionTitle");
    expect(landingSource).toContain("capabilities");
    expect(landingSource).toContain("useCases");
    expect(landingSource).toContain("process");
    for (const page of landingPages) {
      const pageSource = source(page);
      expect(pageSource).toContain("ServiceLandingPage");
      expect(pageSource).toContain("createPageMetadata");
    }
    expect(Object.values(serviceLandings)).toHaveLength(4);
    expect(Object.values(serviceLandings).every((service) => service.proposition.length >= 2)).toBe(true);
  });

  it("resolves service landing links and keeps quote preselection valid", () => {
    const routeSet = new Set(publicRoutes);

    for (const service of Object.values(serviceLandings)) {
      expect(routeSet.has(service.path as (typeof publicRoutes)[number])).toBe(true);
      expect(isContactService(service.contactService)).toBe(true);
      for (const related of service.related) {
        const path = related.href.split("?")[0];
        expect(routeSet.has(path as (typeof publicRoutes)[number])).toBe(true);
      }
    }

    for (const service of services.filter((item) => item.landingPath)) {
      expect(routeSet.has(service.landingPath as (typeof publicRoutes)[number])).toBe(true);
    }

    const quoteSource = source("components/quote-cta.tsx");
    const contactSource = source("components/contact-form.tsx");
    expect(quoteSource).toContain("encodeURIComponent(service)");
    expect(contactSource).toContain("new URLSearchParams(window.location.search).get(\"service\")");
    expect(contactSource).toContain("isContactService(requestedService)");
    expect(contactServices).toContain("Website Development");
    expect(contactServices).toContain("Custom Business Software");
    expect(contactServices).toContain("AI Quality Engineering");
    expect(contactServices).toContain("Test Automation");
  });
});
