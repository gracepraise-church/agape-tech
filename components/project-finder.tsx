"use client";

import { ArrowRight, Check, Compass, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projectChallenges, projectOptions } from "@/content/site";

function suggestedApproach(project: string, challenge: string) {
  if (project === "AI application") {
    return ["AI quality & risk assessment", "Evaluation and guardrail strategy", "Focused proof of concept"];
  }
  if (project === "QA automation" || challenge.includes("quality")) {
    return ["Automation framework assessment", "Coverage and regression strategy", "CI/CD integration plan"];
  }
  if (project === "API testing") {
    return ["API contract and data-flow review", "Integration test strategy", "Reliability validation plan"];
  }
  if (project === "Performance") {
    return ["Performance baseline", "Load and bottleneck analysis", "Practical improvement roadmap"];
  }
  if (project === "Cloud / DevOps") {
    return ["Delivery workflow review", "Quality gates and observability", "Incremental modernization plan"];
  }
  return ["Focused discovery conversation", "Clear technical options", "A practical next-step roadmap"];
}

export function ProjectFinder() {
  const [project, setProject] = useState<(typeof projectOptions)[number] | null>(null);
  const [challenge, setChallenge] = useState<(typeof projectChallenges)[number] | null>(null);
  const recommendations = project ? suggestedApproach(project, challenge ?? "") : [];

  return (
    <section aria-labelledby="project-finder-title" className="project-finder-section">
      <div className="project-finder page-shell">
        <div className="finder-intro">
          <span className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            A GOOD PLACE TO BEGIN
          </span>
          <h2 id="project-finder-title">What are you trying to build?</h2>
          <p>
            A few quick choices can help make a first conversation more focused. No forms, no
            commitment — just a useful starting point.
          </p>
          <div className="finder-note">
            <Compass aria-hidden="true" size={17} strokeWidth={1.6} />
            <span>Start wherever you are. The direction can become clearer together.</span>
          </div>
        </div>

        <div className="finder-panel">
          <fieldset className="finder-fieldset">
            <legend>
              <span>01</span> What are you working on?
            </legend>
            <div className="finder-options">
              {projectOptions.map((option) => (
                <button
                  aria-pressed={project === option}
                  className={project === option ? "finder-option is-selected" : "finder-option"}
                  key={option}
                  onClick={() => setProject(option)}
                  type="button"
                >
                  {option}
                  {project === option && <Check aria-hidden="true" size={14} />}
                </button>
              ))}
            </div>
          </fieldset>

          {project && (
            <fieldset className="finder-fieldset finder-challenges">
              <legend>
                <span>02</span> What’s the main challenge?
              </legend>
              <div className="finder-options">
                {projectChallenges.map((option) => (
                  <button
                    aria-pressed={challenge === option}
                    className={challenge === option ? "finder-option is-selected" : "finder-option"}
                    key={option}
                    onClick={() => setChallenge(option)}
                    type="button"
                  >
                    {option}
                    {challenge === option && <Check aria-hidden="true" size={14} />}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {project && (
            <div aria-live="polite" className="finder-result">
              <div className="finder-result-heading">
                <span className="finder-result-icon">
                  <Sparkles aria-hidden="true" size={17} />
                </span>
                <div>
                  <span className="finder-result-label">A POSSIBLE STARTING POINT</span>
                  <h3>Suggested approach</h3>
                </div>
              </div>
              <ul>
                {recommendations.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link className="finder-cta" href="/contact/">
                Discuss this project <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
