import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Compass,
  Layers3,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { BrandMarquee } from "@/components/brand-marquee";
import { CodeStory } from "@/components/code-story/code-story";
import { EstablishedBadge } from "@/components/established-badge";
import { ProjectFinder } from "@/components/project-finder";
import { QuoteCta } from "@/components/quote-cta";
import { EngineeringScrollStory } from "@/components/scroll-story/engineering-scroll-story";
import { SectionHeading } from "@/components/section-heading";
import { WorkScrollStory } from "@/components/work-story/work-scroll-story";
import { business } from "@/content/business";
import { signalSteps } from "@/content/interactive";
import { createPageMetadata } from "@/content/metadata";
import { capabilities, services } from "@/content/site";
import { getSiteOrigin } from "@/content/site-url";

const iconByName: Record<string, LucideIcon> = {
  brain: BrainCircuit,
  compass: Compass,
  layers: Layers3,
  scan: ScanLine,
  shield: ShieldCheck,
  sparkles: Sparkles,
  workflow: Workflow,
};

const siteOrigin = getSiteOrigin();
const homepageDescription =
  "Agape Tech builds professional websites, custom business software, and quality engineering systems that help organizations move forward with confidence.";

export const metadata = createPageMetadata({
  title: "Custom Software, Websites & QA",
  description: homepageDescription,
  path: "/",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  ...(siteOrigin ? { "@id": new URL("/#organization", siteOrigin).toString() } : {}),
  name: business.brandName,
  legalName: business.legalName,
  slogan: business.tagline,
  description: homepageDescription,
  foundingDate: String(business.companyHistory.establishedYear),
  ...(siteOrigin ? {
    url: siteOrigin.toString(),
    logo: {
      "@type": "ImageObject",
      url: new URL("/assets/brand/agape-tech-logo-stacked-transparent.webp", siteOrigin).toString(),
      width: 1254,
      height: 1254,
    },
  } : {}),
  ...(business.linkedin ? { sameAs: [business.linkedin] } : {}),
};

export default function HomePage() {
  return (
    <main id="main-content">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              INDEPENDENT TECHNOLOGY ENGINEERING
            </span>
            <h1>
              Engineering confidence into every <span>digital experience.</span>
            </h1>
            <p className="hero-description">
              Agape Tech helps organizations build, automate, validate, and scale digital solutions
              through AI, quality engineering, software development, and modern technology
              consulting.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contact/">
                Start a project <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
              <Link className="button button-quiet" href="#services">
                Explore services <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <p className="hero-tagline">Build smarter. Test deeper. Ship with confidence.</p>
            <div className="hero-credibility">
              <EstablishedBadge variant="hero" />
            </div>
            <ol aria-label="Engineering signal path" className="hero-signal">
              {signalSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="hero-art" aria-label="Agape Tech brand">
            <div className="hero-art-orbit hero-art-orbit-one" aria-hidden="true" />
            <div className="hero-art-orbit hero-art-orbit-two" aria-hidden="true" />
            <div className="hero-art-corner hero-art-corner-top" aria-hidden="true">
              <span>ENGINEERED WITH INTENTION</span>
              <span>01 / 05</span>
            </div>
            <Image
              alt="Agape Tech logo: Technology with Purpose"
              className="hero-logo"
              height={1254}
              priority
              src="/assets/brand/agape-tech-logo-stacked-transparent.webp"
              width={1254}
              sizes="(max-width: 800px) 260px, (max-width: 1200px) 340px, 410px"
            />
            <div className="hero-art-corner hero-art-corner-bottom" aria-hidden="true">
              <span>AGAPE TECH</span>
              <span>LIGHT / PURPOSE / SERVICE</span>
            </div>
            <span className="hero-art-index" aria-hidden="true">
              AT—001
            </span>
          </div>
        </div>
        <a className="hero-scroll" href="#services">
          <span>Scroll to explore</span>
          <ArrowDown aria-hidden="true" size={15} />
        </a>
        <div aria-hidden="true" className="hero-bottom-line" />
      </section>

      <section aria-labelledby="services-title" className="services-section section-space" id="services">
        <div className="page-shell">
          <div className="section-heading-row">
            <SectionHeading
              description="From professional organization websites to tailored management systems and engineering confidence, the right support starts with the work in front of you."
              eyebrow="WHAT WE BUILD"
              id="services-title"
              title="Professional technology, shaped around your goals."
            />
            <Link className="text-link section-aside-link" href="/services/">
              Explore all services <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = iconByName[service.icon];
              return (
                <Link
                  className="service-card"
                  href={
                    service.landingPath ??
                    `/contact/?service=${encodeURIComponent(service.contactService)}#project-intake`
                  }
                  key={service.title}
                >
                  <div className="service-card-top">
                    <span className="service-icon">
                      <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
                    </span>
                    <span className="service-number">0{index + 1}</span>
                  </div>
                  <span className="card-eyebrow">{service.category}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="service-arrow" aria-hidden="true">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <EngineeringScrollStory />

      <CodeStory />

      <BrandMarquee />

      <section aria-labelledby="capabilities-title" className="capabilities-section section-space">
        <div className="page-shell">
          <SectionHeading
            description="A connected set of capabilities for the moments when your next step needs both imagination and rigor."
            eyebrow="CAPABILITIES, APPLIED"
            id="capabilities-title"
            title="Good technology moves people forward."
          />
          <div className="capability-grid">
            {capabilities.map((capability) => {
              const Icon = iconByName[capability.icon];
              return (
                <article className="capability-card" key={capability.number}>
                  <div className="card-topline">
                    <span className="card-index">{capability.number}</span>
                    <span className="capability-icon">
                      <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
                    </span>
                  </div>
                  <span className="card-eyebrow">{capability.eyebrow}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <span aria-hidden="true" className="card-underline" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <WorkScrollStory />

      <ProjectFinder />

      <QuoteCta />

      <section aria-labelledby="purpose-title" className="purpose-section">
        <div className="purpose-light" aria-hidden="true" />
        <div className="page-shell purpose-content">
          <div className="purpose-symbol">
            <Image
              alt=""
              aria-hidden="true"
              height={1254}
              src="/assets/brand/agape-tech-logo-icon-transparent.webp"
              width={1254}
              sizes="(max-width: 600px) 72px, 96px"
            />
          </div>
          <span className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            TECHNOLOGY WITH PURPOSE
          </span>
          <h2 id="purpose-title">
            Better technology begins with <span>what matters.</span>
          </h2>
          <p>
            We believe excellent engineering is more than what a system can do. It is the care,
            clarity, and integrity we bring to the people who depend on it.
          </p>
          <div className="purpose-codes" aria-label="Principles: light, service, wisdom, hope">
            <span>LGT-514 <i>LIGHT</i></span>
            <span>SRV-134 <i>SERVICE</i></span>
            <span>WIS-315 <i>WISDOM</i></span>
            <span>HOP-828 <i>HOPE</i></span>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="final-cta-glow" aria-hidden="true" />
        <div className="page-shell final-cta-content">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2>Have an idea? Let’s engineer it.</h2>
            <p>Bring the question, the ambition, or the knot you’re trying to untangle.</p>
          </div>
          <Link className="button button-primary final-cta-button" href="/contact/">
            Start a conversation <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
