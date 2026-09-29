import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Cloud,
  Compass,
  Database,
  Layers3,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { ProjectFinder } from "@/components/project-finder";
import { SectionHeading } from "@/components/section-heading";
import {
  capabilities,
  experienceOrganizations,
  featuredWork,
  industries,
  processStages,
  services,
  technologyGroups,
} from "@/content/site";

const iconByName: Record<string, LucideIcon> = {
  activity: Activity,
  brain: BrainCircuit,
  cloud: Cloud,
  compass: Compass,
  database: Database,
  layers: Layers3,
  scan: ScanLine,
  shield: ShieldCheck,
  sparkles: Sparkles,
  workflow: Workflow,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agape Tech",
  legalName: "Agape Tech LLC",
  slogan: "Technology with Purpose",
  ...(siteUrl ? { url: siteUrl } : {}),
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
            <div className="hero-capabilities" aria-label="Core capabilities">
              <span>AI engineering</span>
              <span>Quality engineering</span>
              <span>Automation</span>
              <span>Digital solutions</span>
            </div>
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
              src="/assets/brand/agape-tech-logo-stacked-transparent.png"
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
        <a className="hero-scroll" href="#experience">
          <span>Scroll to explore</span>
          <ArrowDown aria-hidden="true" size={15} />
        </a>
        <div aria-hidden="true" className="hero-bottom-line" />
      </section>

      <section aria-labelledby="experience-title" className="experience-section" id="experience">
        <div className="experience-top page-shell">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              EXPERIENCE ACROSS COMPLEX INDUSTRIES
            </span>
            <h2 id="experience-title">A broader perspective, brought to your work.</h2>
          </div>
          <p>
            Professional experience brought into Agape Tech spans enterprise media, healthcare,
            public sector, automotive, financial technology, and digital platforms.
          </p>
        </div>
        <div className="experience-marquee" aria-label="Organizations represented in professional experience">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div aria-hidden={copy === 1} className="marquee-group" key={copy}>
                {experienceOrganizations.map((organization, index) => (
                  <span className="experience-name" key={`${copy}-${organization}`}>
                    {organization}
                    <span aria-hidden="true" className="experience-separator">
                      {index % 2 === 0 ? "✳" : "·"}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="experience-disclaimer page-shell">
          These names describe professional experience — not a claim that each organization is an
          Agape Tech client.
        </p>
      </section>

      <section aria-labelledby="capabilities-title" className="capabilities-section section-space">
        <div className="page-shell">
          <SectionHeading
            description="A connected set of capabilities for the moments when your next step needs both imagination and rigor."
            eyebrow="WHAT WE BRING"
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

      <section aria-labelledby="services-title" className="services-section section-space" id="services">
        <div className="page-shell">
          <div className="section-heading-row">
            <SectionHeading
              description="The right support for a specific need — or a partner to connect the bigger picture."
              eyebrow="CAPABILITIES, APPLIED"
              title="What we do."
            />
            <Link className="text-link section-aside-link" href="/services/">
              Explore all services <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = iconByName[service.icon];
              return (
                <Link className="service-card" href="/services/" key={service.title}>
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

      <section aria-labelledby="process-title" className="process-section section-space">
        <div className="page-shell">
          <div className="process-intro">
            <SectionHeading
              description="A calm, collaborative process that makes complex work easier to see, shape, and ship."
              eyebrow="HOW WE WORK"
              title="Clarity at every stage."
            />
            <p className="process-side-note">
              <span className="process-side-mark" aria-hidden="true" />
              No mystery handoffs. No technology for technology’s sake. Just intentional progress,
              together.
            </p>
          </div>
          <ol className="process-list">
            {processStages.map((stage) => (
              <li className="process-step" key={stage.number}>
                <span className="process-number">{stage.number}</span>
                <div className="process-step-copy">
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
                <span className="process-step-mark" aria-hidden="true">
                  <Check size={16} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="solutions-title" className="solutions-section section-space">
        <div className="page-shell">
          <div className="section-heading-row">
            <SectionHeading
              description="Different industries, shared human needs: trustworthy systems, less friction, and room to grow."
              eyebrow="SOLUTIONS THAT FIT"
              title="Built around your world."
            />
            <Link className="text-link section-aside-link" href="/solutions/">
              Explore solutions <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="industry-grid">
            {industries.map((industry) => (
              <Link className="industry-card" href="/solutions/" key={industry.number}>
                <span className="industry-number">{industry.number}</span>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
                <ArrowUpRight aria-hidden="true" className="industry-arrow" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title" className="work-section section-space">
        <div className="page-shell">
          <div className="section-heading-row">
            <SectionHeading
              description="Representative case-study directions, shaped by professional experience. Shared here as examples of the problems we can help solve."
              eyebrow="SELECTED WORK"
              title="Thoughtful work. Practical impact."
            />
            <Link className="text-link section-aside-link" href="/work/">
              See the work <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="work-grid">
            {featuredWork.map((item, index) => (
              <article className={`work-card work-card-${index + 1}`} key={item.title}>
                <div className="work-art" aria-hidden="true">
                  <div className="work-art-lines" />
                  <div className="work-art-orb" />
                  <span className="work-art-code">CASE / 0{index + 1}</span>
                  <span className="work-art-caption">
                    {index === 0 ? "INTELLIGENCE" : index === 1 ? "AUTOMATION" : "VALIDATION"}
                  </span>
                </div>
                <div className="work-card-content">
                  <span className="card-eyebrow">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="work-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="work-disclaimer">
            Illustrative engagement categories only. No metrics, client relationships, or confidential work are implied.
          </p>
        </div>
      </section>

      <section aria-labelledby="technology-title" className="technology-section section-space">
        <div className="page-shell technology-layout">
          <div className="technology-intro">
            <SectionHeading
              description="Tools are most powerful when they fit the problem. We work across a considered ecosystem — without chasing the noise."
              eyebrow="THE TOOLKIT"
              title="Technology, in its right place."
            />
            <span className="technology-footnote">A sample of tools and platforms we work with.</span>
          </div>
          <div className="technology-groups">
            {technologyGroups.map((group) => {
              const Icon = iconByName[group.icon];
              return (
                <div className="technology-group" key={group.title}>
                  <div className="technology-group-heading">
                    <span className="technology-icon">
                      <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="technology-tags">
                    {group.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectFinder />

      <section aria-labelledby="purpose-title" className="purpose-section">
        <div className="purpose-light" aria-hidden="true" />
        <div className="page-shell purpose-content">
          <div className="purpose-symbol">
            <Image
              alt=""
              aria-hidden="true"
              height={1254}
              src="/assets/brand/agape-tech-logo-icon-transparent.png"
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
