"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { caseStudies } from "@/content/phase-two";
import { PointerCard } from "@/components/pointer-card";

const filters = ["All", "AI", "Automation", "Quality", "API", "Performance", "Cloud", "Development"] as const;
type WorkFilter = (typeof filters)[number];

export function WorkGallery() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");
  const visibleStudies =
    activeFilter === "All" ? caseStudies : caseStudies.filter((study) => study.category === activeFilter);

  return (
    <>
      <div aria-label="Filter representative work" className="work-filters" role="group">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            className={activeFilter === filter ? "work-filter is-active" : "work-filter"}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="work-results-count">
        {visibleStudies.length} {visibleStudies.length === 1 ? "representative example" : "representative examples"}
        {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
      </p>
      <div className="case-study-grid">
        {visibleStudies.map((study, index) => (
          <PointerCard className="case-study-card" key={study.id}>
            <div className={`case-study-art case-study-art-${(index % 3) + 1}`} aria-hidden="true">
              <span className="case-study-art-code">FIELD NOTE / {study.id.slice(0, 2).toUpperCase()}</span>
              <span className="case-study-art-orb" />
              <span className="case-study-art-category">{study.category.toUpperCase()}</span>
            </div>
            <div className="case-study-content">
              <span className="case-study-category">{study.category} / REPRESENTATIVE EXPERIENCE</span>
              <h2>{study.title}</h2>
              <p className="case-study-summary">{study.summary}</p>
              <dl>
                <div>
                  <dt>Challenge</dt>
                  <dd>{study.challenge}</dd>
                </div>
                <div>
                  <dt>Engineering approach</dt>
                  <dd>{study.approach}</dd>
                </div>
                <div>
                  <dt>Outcome focus</dt>
                  <dd>{study.outcomeFocus}</dd>
                </div>
              </dl>
              <div className="case-study-detail-group">
                <span>CAPABILITIES</span>
                <ul>
                  {study.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </div>
              <div className="case-study-detail-group">
                <span>TECHNOLOGY</span>
                <ul>
                  {study.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
              <Link className="case-study-contact" href="/contact/">
                Discuss a similar challenge <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </PointerCard>
        ))}
      </div>
      <p className="work-page-disclaimer">
        These are representative engineering experience patterns, not attributed client case studies or claims of specific completed outcomes. No confidential employer or customer information is presented.
      </p>
    </>
  );
}
