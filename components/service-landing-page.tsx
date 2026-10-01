import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { QuoteCta } from "@/components/quote-cta";
import type { ServiceLanding } from "@/content/service-landings";

type ServiceLandingPageProps = {
  service: ServiceLanding;
};

export function ServiceLandingPage({ service }: ServiceLandingPageProps) {
  const quoteHref = `/contact/?service=${encodeURIComponent(service.contactService)}#project-intake`;
  const sectionId = (name: string) => `${service.id}-${name}`;

  return (
    <main id="main-content">
      <PageHero
        ctaHref={quoteHref}
        ctaLabel="Request a custom quote"
        description={service.description}
        eyebrow={service.eyebrow}
        title={service.title}
        variant="technical"
      />

      <section aria-labelledby={sectionId("proposition-title")} className="service-landing-proposition section-space">
        <div className="page-shell service-landing-proposition-grid">
          <div>
            <span className="eyebrow">
              <span aria-hidden="true" className="eyebrow-mark" />
              WHY THIS WORK MATTERS
            </span>
            <h2 id={sectionId("proposition-title")}>{service.propositionTitle}</h2>
          </div>
          <div className="service-landing-proposition-copy">
            {service.proposition.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section aria-labelledby={sectionId("capabilities-title")} className="service-landing-capabilities section-space">
        <div className="page-shell">
          <div className="section-heading-row">
            <div className="section-heading">
              <span className="eyebrow">
                <span aria-hidden="true" className="eyebrow-mark" />
                WHAT WE CAN HELP WITH
              </span>
              <h2 id={sectionId("capabilities-title")}>Capabilities shaped around the real problem.</h2>
            </div>
            <p className="section-aside-note">Focused engineering, useful feedback, and a clear next step.</p>
          </div>
          <div className="service-landing-capability-grid">
            {service.capabilities.map((capability, index) => (
              <article className="service-landing-capability" key={capability.title}>
                <span className="service-landing-index">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby={sectionId("fit-title")} className="service-landing-fit section-space">
        <div className="page-shell service-landing-fit-grid">
          <div>
            <span className="eyebrow">
              <span aria-hidden="true" className="eyebrow-mark" />
              WHERE IT FITS
            </span>
            <h2 id={sectionId("fit-title")}>Useful in the places your team feels the friction.</h2>
            <ul className="service-landing-use-case-list">
              {service.useCases.map((useCase) => (
                <li key={useCase}>
                  <Check aria-hidden="true" size={15} />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">
              <span aria-hidden="true" className="eyebrow-mark" />
              HOW WE WORK
            </span>
            <div className="service-landing-process">
              {service.process.map((step) => (
                <div className="service-landing-process-step" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby={sectionId("related-title")} className="service-landing-related section-space">
        <div className="page-shell service-landing-related-inner">
          <div>
            <span className="eyebrow">
              <span aria-hidden="true" className="eyebrow-mark" />
              RELATED SERVICES
            </span>
            <h2 id={sectionId("related-title")}>Keep the next step connected.</h2>
          </div>
          <div className="service-landing-related-links">
            {service.related.map((related) => (
              <Link href={related.href} key={related.href}>
                {related.label}
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            ))}
            <Link href="/services/">
              See all services
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <QuoteCta compact service={service.contactService} />
    </main>
  );
}

