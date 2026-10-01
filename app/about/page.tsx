import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CapabilityIcon } from "@/components/capability-icon";
import { EstablishedBadge } from "@/components/established-badge";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/content/metadata";
import { operatingPrinciples } from "@/content/phase-two";

export const metadata = createPageMetadata({
  title: "About: Technology with Purpose",
  description:
    "Learn how Agape Tech brings software engineering, quality, and technology consulting together with purpose. Established 2014.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        description="A technology company shaped by the belief that engineering should be useful, trustworthy, and grounded in care for the people it serves."
        eyebrow="ABOUT / TECHNOLOGY WITH PURPOSE"
        title="Technology with Purpose. Engineering with Excellence."
        variant="purpose"
      />

      <section className="about-story-section section-space">
        <div className="page-shell about-story-layout">
          <div className="about-story-lead">
            <span className="eyebrow"><span aria-hidden="true" className="eyebrow-mark" />OUR POINT OF VIEW</span>
            <h2>Technology is a means. The good it enables is the point.</h2>
          </div>
          <div className="about-story-copy">
            <p>
              Agape Tech brings software engineering, quality, and technology consulting together
              around a simple idea: good work should make a meaningful difference for the people
              who depend on it.
            </p>
            <p>
              That starts with listening carefully, being candid about trade-offs, and choosing
              approaches that fit the need—not the other way around. Excellence is found in both
              the result and the care taken to reach it.
            </p>
            <Link className="text-link" href="/services/">
              See how we put this into practice <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="history-title" className="about-history-section section-space">
        <div className="page-shell about-history-panel">
          <EstablishedBadge />
          <div className="about-history-copy">
            <span className="eyebrow">
              <span aria-hidden="true" className="eyebrow-mark" />
              A FOUNDATION THAT ENDURES
            </span>
            <h2 id="history-title">More than a decade of engineering with purpose.</h2>
            <p>
              Agape Tech has been serving since 2014, bringing together quality engineering,
              automation, software development, cloud, and technology consulting. Today, that
              foundation extends into AI quality engineering, intelligent systems validation, and
              modern digital delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="principles-section section-space">
        <div className="page-shell">
          <SectionHeading
            description="Five commitments shape how we make decisions, work with teams, and build technology."
            eyebrow="OPERATING PRINCIPLES"
            title="The values behind the engineering."
          />
          <div className="principles-grid">
            {operatingPrinciples.map((principle) => (
              <article className="principle-card" key={principle.number}>
                <div className="principle-card-top">
                  <span className="principle-icon"><CapabilityIcon name={principle.icon} size={20} /></span>
                  <span className="principle-number">{principle.number}</span>
                </div>
                <span className="principle-code">{principle.code} / PRINCIPLE</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-approach-section section-space">
        <div className="page-shell about-approach-layout">
          <div>
            <SectionHeading
              description="Purpose is not a tagline at the end of a project. It belongs in the choices made along the way."
              eyebrow="THE WAY WE WORK"
              title="Bring light to the complicated parts."
            />
          </div>
          <div className="about-approach-points">
            {[
              ["Listen before prescribing", "Understand the people, constraints, and purpose behind the request."],
              ["Make the reasoning visible", "Explain options and trade-offs so decisions are shared, not hidden."],
              ["Leave things stronger", "Favor clear systems and transferable knowledge over unnecessary dependence."],
            ].map(([title, description], index) => (
              <div className="about-approach-point" key={title}>
                <span className="about-approach-number">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <Check aria-hidden="true" size={15} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="leadership-title" className="leadership-section section-space">
        <div className="page-shell">
          <div className="section-heading-row">
            <SectionHeading
              description="A personal introduction belongs here. We’ll share it when the details are ready to tell accurately."
              eyebrow="LEADERSHIP"
              title="A human partner behind the work."
            />
          </div>
          <article className="leadership-card">
            <div className="leadership-photo-placeholder" aria-hidden="true">
              <Image
                alt=""
                height={1254}
                src="/assets/brand/agape-tech-logo-icon-transparent.webp"
                width={1254}
                sizes="(max-width: 620px) 76px, 104px"
              />
              <span>LEADERSHIP PROFILE</span>
            </div>
            <div className="leadership-copy">
              <span className="leadership-label">FOUNDER / LEADERSHIP</span>
              <h2 id="leadership-title">Leadership profile coming soon.</h2>
              <p>
                A thoughtful introduction to Agape Tech leadership will be added when the
                biographical details, portrait, and professional links are confirmed.
              </p>
              <span className="leadership-prepared"><Check aria-hidden="true" size={14} />Profile space prepared for verified details</span>
            </div>
            <span className="leadership-index" aria-hidden="true">AT / PEOPLE</span>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <div className="page-shell about-cta-inner">
          <div className="about-cta-mark">
            <Image alt="" aria-hidden="true" height={1254} src="/assets/brand/agape-tech-logo-icon-transparent.webp" width={1254} sizes="60px" />
          </div>
          <div>
            <span className="eyebrow"><span aria-hidden="true" className="eyebrow-mark" />PURPOSE IN PRACTICE</span>
            <h2>Let’s build something that serves a real need.</h2>
          </div>
          <Link className="button button-primary" href="/contact/">
            Start a conversation <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
