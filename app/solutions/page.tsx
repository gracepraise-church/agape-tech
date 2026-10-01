import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CapabilityIcon } from "@/components/capability-icon";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/content/metadata";
import { solutionIndustries } from "@/content/phase-two";

const businessProblems = [
  "Manual regression bottlenecks",
  "Unstable software releases",
  "Automation modernization",
  "API quality",
  "AI reliability and LLM evaluation",
  "Performance bottlenecks",
  "CI/CD quality gaps",
  "Legacy test frameworks",
  "Mobile quality",
  "Internal workflow inefficiency",
  "New digital product development",
] as const;

export const metadata = createPageMetadata({
  title: "Technology Solutions for Real Business Problems",
  description:
    "Find practical technology and quality engineering approaches for media, healthcare, public service, mobility, finance, and nonprofit challenges.",
  path: "/solutions/",
});

export default function SolutionsPage() {
  return (
    <main id="main-content">
      <PageHero
        asideDescription="The same engineering discipline can look different across industries. The work starts with your context."
        asideTitle="Different worlds. Human needs."
        description="Business challenges rarely arrive as neat technology categories. We begin with the work people need to do, then shape a fitting technical path."
        eyebrow="SOLUTIONS / INDUSTRIES & CHALLENGES"
        title="Start with the challenge. Find a way forward."
        variant="editorial"
      />

      <section className="solutions-problems-section section-space">
        <div className="page-shell solutions-problems-layout">
          <div className="solutions-problems-intro">
            <SectionHeading
              description="A few common places where focused engineering can make the next step clearer."
              eyebrow="PROBLEMS WORTH SOLVING"
              title="Make the hard parts easier to see."
            />
          </div>
          <div className="problem-chip-grid">
            {businessProblems.map((problem, index) => (
              <div className="problem-chip" key={problem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {problem}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-industries-section section-space">
        <div className="page-shell">
          <SectionHeading
            description="Industry context matters. These examples describe relevant problem spaces, not a list of Agape Tech client relationships."
            eyebrow="INDUSTRIES & APPROACHES"
            title="Technology that fits your world."
          />
          <div className="solution-detail-grid">
            {solutionIndustries.map((industry) => (
              <article className="solution-detail-card" key={industry.id}>
                <div className="solution-card-top">
                  <span className="solution-card-icon"><CapabilityIcon name={industry.icon} size={19} /></span>
                  <span>{industry.number} / 05</span>
                </div>
                <span className="solution-card-theme">{industry.theme}</span>
                <h2>{industry.title}</h2>
                <div className="solution-copy-block">
                  <h3>Challenge</h3>
                  <p>{industry.challenge}</p>
                </div>
                <div className="solution-copy-block">
                  <h3>How Agape Tech helps</h3>
                  <p>{industry.approach}</p>
                </div>
                <div className="solution-copy-block">
                  <h3>Relevant capabilities</h3>
                  <ul className="solution-capability-list">
                    {industry.capabilities.map((capability) => (
                      <li key={capability}><Check aria-hidden="true" size={13} />{capability}</li>
                    ))}
                  </ul>
                </div>
                <div className="solution-example">
                  <span>EXAMPLE ENGAGEMENT</span>
                  <p>{industry.example}</p>
                </div>
                <Link className="solution-card-link" href="/contact/">
                  Talk through this challenge <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-cta">
        <div className="page-shell solutions-cta-inner">
          <div>
            <span className="eyebrow"><span aria-hidden="true" className="eyebrow-mark" />YOUR CONTEXT COMES FIRST</span>
            <h2>Let’s get specific about what you need.</h2>
          </div>
          <Link className="button button-primary" href="/contact/">
            Start a conversation <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
