"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { engineeringStages } from "@/content/interactive";
import { pinnedProgress, stageIndexFromProgress, stageScrollOffset } from "@/lib/interactive-motion";
import { subscribeMedia, useScrollFrame } from "@/lib/scroll-controller";
import { StageVisual } from "./stage-visual";

const enhancedQuery =
  "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";
const stageCount = engineeringStages.length;

export function EngineeringScrollStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => subscribeMedia(enhancedQuery, setEnhanced), []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const progress = pinnedProgress(rect.top, rect.height, window.innerHeight);
    track.style.setProperty("--story-progress", progress.toFixed(4));
    const index = stageIndexFromProgress(progress, stageCount);
    if (index !== activeRef.current) {
      activeRef.current = index;
      setActive(index);
    }
  }, []);

  useScrollFrame(trackRef, update, enhanced);

  const goToStage = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const distance = rect.height - window.innerHeight;
    window.scrollTo({
      top: window.scrollY + rect.top + stageScrollOffset(index, stageCount, distance),
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="engineering-story-title"
      className={`story-section${enhanced ? " is-enhanced" : ""}`}
      data-section="engineering-story"
    >
      <div className="page-shell story-intro">
        <span className="eyebrow">
          <span aria-hidden="true" className="eyebrow-mark" />
          ENGINEERING CONFIDENCE AT EVERY LAYER
        </span>
        <h2 id="engineering-story-title">Evidence at every layer of the system.</h2>
        <p>
          From the first prompt to the monitored release, each layer calls for its own kind of
          proof. Here are five places Agape Tech engineers quality in.
        </p>
        <a className="story-skip" href="#code-story">
          Skip the engineering story
        </a>
      </div>

      <div
        className="story-track"
        ref={trackRef}
        style={{ "--story-count": stageCount } as CSSProperties}
      >
        <div className="story-sticky">
          <div className="page-shell story-layout">
            <div className="story-narrative">
              {enhanced && (
                <ol aria-label="Engineering story stages" className="story-rail">
                  {engineeringStages.map((stage, index) => (
                    <li key={stage.id}>
                      <button
                        aria-current={index === active ? "step" : undefined}
                        className={index === active ? "story-rail-item is-active" : "story-rail-item"}
                        onClick={() => goToStage(index)}
                        type="button"
                      >
                        <span className="story-rail-number">{stage.number}</span>
                        {stage.label}
                      </button>
                    </li>
                  ))}
                </ol>
              )}

              <div className="story-stages">
                {engineeringStages.map((stage, index) => (
                  <article
                    aria-labelledby={`story-stage-${stage.id}`}
                    className={index === active ? "story-stage is-active" : "story-stage"}
                    data-stage={stage.id}
                    key={stage.id}
                  >
                    <div className="story-stage-copy">
                      <span className="story-stage-label">
                        <span>{stage.number}</span>
                        {stage.label}
                      </span>
                      <h3 id={`story-stage-${stage.id}`}>{stage.title}</h3>
                      <p>{stage.description}</p>
                      <ul aria-label={`${stage.label} capabilities`} className="story-capabilities">
                        {stage.capabilities.map((capability) => (
                          <li key={capability}>{capability}</li>
                        ))}
                      </ul>
                    </div>
                    <div aria-hidden="true" className="story-stage-visual">
                      <StageVisual active stage={stage} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div aria-hidden="true" className="story-panel">
              <div className="story-panel-meta">
                <span>
                  {engineeringStages[active]?.number} / 0{stageCount}
                </span>
                <span className="story-panel-bar" />
              </div>
              <div className="story-panel-stack">
                {engineeringStages.map((stage, index) => (
                  <StageVisual active={index === active} key={stage.id} stage={stage} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
