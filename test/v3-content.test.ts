import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { companyHistory } from "../content/business";
import {
  experienceOrganizations,
  publishedExperienceItems,
  publishedExperienceWordmarks,
  technologyMarquee,
  technologyWordmarks,
} from "../content/interactive";
import { detailedServices } from "../content/phase-two";
import { services } from "../content/site";
import { contactServices, isContactService } from "../lib/contact/options";

const homepageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const headerSource = readFileSync(new URL("../components/site-header.tsx", import.meta.url), "utf8");
const marqueeSource = readFileSync(new URL("../components/brand-marquee.tsx", import.meta.url), "utf8");
const quoteSource = readFileSync(new URL("../components/quote-cta.tsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

describe("Agape Tech V3 content contract", () => {
  it("renders the anniversary badge once inside the homepage hero", () => {
    expect(homepageSource.match(/<EstablishedBadge variant="hero" \/>/g)).toHaveLength(1);
    expect(homepageSource).not.toContain("12+ Years of Engineering Confidence.");
    expect(homepageSource).toContain("hero-credibility");
    expect(homepageSource).not.toContain("credibility-section");
  });

  it("keeps the established date accessible and outside the source artwork", () => {
    expect(headerSource).toContain("ESTABLISHED 2014");
    expect(headerSource).toContain("EST. 2014");
    expect(companyHistory.establishedYear).toBe(2014);
  });

  it("uses one canonical request-a-quote service inventory", () => {
    expect(contactServices).toEqual([
      "Website Development",
      "Custom Web Application",
      "Custom Business Software",
      "Accounting & Management Software",
      "AI Quality Engineering",
      "Test Automation",
      "API & Integration",
      "Performance Engineering",
      "Cloud & Technology Consulting",
      "Other / Not Sure Yet",
    ]);
    expect(isContactService("Website Development")).toBe(true);
    expect(isContactService("Not a supported service")).toBe(false);
    expect(quoteSource).toContain("/contact/?service=Other%20%2F%20Not%20Sure%20Yet#project-intake");
  });

  it("publishes the expanded business-service inventory without implying a packaged SaaS product", () => {
    expect(services.map((service) => service.title)).toEqual([
      "Website & Web Application Development",
      "Custom Business & Management Software",
      "AI Quality Engineering",
      "Test Automation",
      "API & Integration Testing",
      "Performance Engineering",
      "Cloud & Digital Solutions",
      "Technology Consulting",
    ]);
    expect(detailedServices.some((service) => service.id === "custom-business-software")).toBe(true);
    expect(JSON.stringify(detailedServices)).not.toMatch(/packaged SaaS|commercial accounting platform/i);
  });

  it("keeps the approved experience inventory and excludes upcoming roles", () => {
    expect(publishedExperienceItems()).toEqual([
      "California Department of Health Care Services (DHCS)",
      "Canoo",
      "CoStar Group",
      "Deloitte",
      "Fox Corporation",
      "Insight Global",
      "Sallie Mae",
      "Ten-X / Xome",
      "UnitedHealth Group",
    ]);
    expect(publishedExperienceWordmarks().map((item) => item.name)).toEqual(publishedExperienceItems());
    expect(publishedExperienceWordmarks().filter((item) => item.logoAsset).map((item) => item.name)).toEqual([
      "California Department of Health Care Services (DHCS)",
      "Canoo",
      "CoStar Group",
      "Deloitte",
      "Fox Corporation",
      "Sallie Mae",
      "UnitedHealth Group",
    ]);
    expect(publishedExperienceWordmarks().filter((item) => !item.logoAsset).map((item) => item.name)).toEqual([
      "Insight Global",
      "Ten-X / Xome",
    ]);
    expect(experienceOrganizations.find((item) => item.name === "Pediatrix Medical Group")?.status).toBe("upcoming");
    expect(publishedExperienceWordmarks().some((item) => item.name.includes("Pediatrix"))).toBe(false);
  });

  it("publishes the curated technology inventory with accessible fallbacks", () => {
    expect(technologyMarquee).toHaveLength(24);
    expect(new Set(technologyMarquee).size).toBe(technologyMarquee.length);
    expect(technologyWordmarks).toHaveLength(technologyMarquee.length);
    expect(technologyWordmarks.every((item) => item.name && item.mark)).toBe(true);
    expect(technologyWordmarks.filter((item) => item.logoAsset)).toHaveLength(17);
    expect(technologyWordmarks.filter((item) => !item.logoAsset).map((item) => item.name)).toEqual([
      "Playwright",
      "Katalon Studio",
      "REST Assured",
      "Java",
      "AWS",
      "Microsoft Azure",
      "OpenAI",
    ]);
    expect(
      [...technologyWordmarks, ...publishedExperienceWordmarks()]
        .filter((item) => item.logoAsset)
        .every((item) => existsSync(new URL(`../public${item.logoAsset}`, import.meta.url))),
    ).toBe(true);
    expect(marqueeSource).toContain('aria-hidden="true"');
    expect(marqueeSource).toContain('alt={`${item.name} logo`}');
    expect(marqueeSource).toContain("!isProfessionalExperience");
    expect(marqueeSource).toContain('tabIndex={0}');
    expect(marqueeSource).toContain("PROFESSIONAL EXPERIENCE ACROSS");
    expect(marqueeSource).toContain("TECHNOLOGIES & PLATFORMS");
  });

  it("keeps both marquee motion and reduced-motion behavior in the stylesheet", () => {
    expect(stylesSource).toContain("brand-marquee-scroll");
    expect(stylesSource).toContain(".brand-marquee:hover .brand-track");
    expect(stylesSource).toContain(".brand-marquee:focus-within .brand-track");
    expect(stylesSource).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesSource).toContain(".brand-track {");
  });
});
