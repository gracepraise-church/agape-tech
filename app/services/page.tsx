import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CapabilityIcon } from "@/components/capability-icon";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { PointerCard } from "@/components/pointer-card";
import { createPageMetadata } from "@/content/metadata";
import { detailedServices } from "@/content/phase-two";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore Agape Tech's AI, quality engineering, automation, API, performance, software development, cloud, and consulting services.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        accent="real business problems."
        description="From AI and quality engineering to software development and cloud delivery, choose a focused engagement or connect the full path from discovery to delivery."
        eyebrow="SERVICES / ENGINEERING CAPABILITIES"
        title="Technology expertise built around real business problems."
        variant="technical"
      >
        <Link className="button button-primary page-hero-primary" href="#service-offerings">
          Explore our services <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </PageHero>

      <section className="services-overview section-space" id="service-offerings">
        <div className="page-shell">
          <div className="section-heading-row">
            <SectionHeading
              description="Engagements can start with a focused question or span the full path from discovery to delivery."
              eyebrow="A CONNECTED PRACTICE"
              title="The right expertise for the work in front of you."
            />
            <p className="section-aside-note">Eight capabilities. One thoughtful engineering mindset.</p>
          </div>
          <div className="service-detail-list">
            {detailedServices.map((service) => (
              <PointerCard className="service-detail-card" key={service.id}>
                <div className="service-detail-main">
                  <div className="service-detail-heading">
                    <span className="service-detail-icon"><CapabilityIcon name={service.icon} size={21} /></span>
                    <span className="service-detail-number">{service.number} / {service.category}</span>
                  </div>
                  <h2>{service.title}</h2>
                  <p className="service-detail-intro">{service.introduction}</p>
                  <div className="service-detail-pair">
                    <div>
                      <h3>What it is</h3>
                      <p>{service.whatItIs}</p>
                    </div>
                    <div>
                      <h3>Problems it solves</h3>
                      <ul>
                        {service.problems.map((problem) => (
                          <li key={problem}><span aria-hidden="true" />{problem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="service-detail-side">
                  <div className="service-detail-side-block">
                    <h3>Typical engagements</h3>
                    <ul className="service-engagement-list">
                      {service.engagements.map((engagement) => (
                        <li key={engagement}><Check aria-hidden="true" size={14} />{engagement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-detail-side-block">
                    <h3>Capabilities</h3>
                    <div className="detail-pills">
                      {service.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
                    </div>
                  </div>
                  <div className="service-detail-side-block">
                    <h3>Selected technologies</h3>
                    <div className="detail-pills technology-pills">
                      {service.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                  </div>
                  <Link className="service-detail-cta" href="/contact/">
                    Discuss this capability <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                </div>
              </PointerCard>
            ))}
          </div>
        </div>
      </section>

      <section className="service-engagement-cta">
        <div className="page-shell service-engagement-cta-inner">
          <div>
            <span className="eyebrow"><span aria-hidden="true" className="eyebrow-mark" />A GOOD PLACE TO BEGIN</span>
            <h2>Not sure which capability fits? Start with the challenge.</h2>
          </div>
          <Link className="button button-primary" href="/contact/">
            Talk through the problem <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
