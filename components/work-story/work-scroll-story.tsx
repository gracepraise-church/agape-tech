"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { workSlides } from "@/content/interactive";
import { pinnedProgress, stageIndexFromProgress } from "@/lib/interactive-motion";
import { subscribeMedia, useScrollFrame } from "@/lib/scroll-controller";

const enhancedQuery =
  "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";
const slideCount = workSlides.length;

export function WorkScrollStory() {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const distanceRef = useRef(0);
  const activeRef = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => subscribeMedia(enhancedQuery, setEnhanced), []);
  useEffect(() => subscribeMedia("(prefers-reduced-motion: reduce)", setReducedMotion), []);

  const update = useCallback(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    const rect = outer.getBoundingClientRect();
    const progress = pinnedProgress(rect.top, rect.height, window.innerHeight);
    track.style.transform = `translate3d(${(-progress * distanceRef.current).toFixed(1)}px, 0, 0)`;
    outer.style.setProperty("--work-progress", progress.toFixed(4));
    const index = stageIndexFromProgress(progress, slideCount);
    if (index !== activeRef.current) {
      activeRef.current = index;
      setActive(index);
    }
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!outer || !viewport || !track) return;

    if (!enhanced) {
      distanceRef.current = 0;
      outer.style.height = "";
      track.style.transform = "";
      return;
    }

    const measure = () => {
      distanceRef.current = Math.max(0, track.scrollWidth - viewport.clientWidth);
      outer.style.height = `${window.innerHeight + distanceRef.current}px`;
      update();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      outer.style.height = "";
      track.style.transform = "";
    };
  }, [enhanced, update]);

  useScrollFrame(outerRef, update, enhanced);

  // Keyboard focus on the final link jumps to the end of the pinned range instead of scrolling the clipped track.
  const onEndFocus = () => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    if (!enhanced || !outer || !viewport) return;
    viewport.scrollLeft = 0;
    const rect = outer.getBoundingClientRect();
    const endTop = window.scrollY + rect.top + distanceRef.current;
    if (Math.abs(window.scrollY - endTop) > 2) window.scrollTo({ top: endTop, behavior: "auto" });
  };

  const scrollable = !enhanced && !reducedMotion;
  const sectionClass = [
    "work-story-section",
    enhanced ? "is-enhanced" : "",
    reducedMotion ? "is-static" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-labelledby="work-story-title" className={sectionClass} data-section="work-story">
      <div className="work-story-outer" ref={outerRef}>
        <div className="work-story-sticky">
          <div className="page-shell work-story-head">
            <div>
              <span className="eyebrow">
                <span aria-hidden="true" className="eyebrow-mark" />
                REPRESENTATIVE ENGINEERING EXPERIENCE
              </span>
              <h2 id="work-story-title">Engineering work across complex environments.</h2>
              <p>
                Representative professional engineering experience, shared as examples of the
                problems Agape Tech can help solve. These are not client projects and include no
                confidential details or metrics.
              </p>
            </div>
            <div className="work-story-meta">
              {enhanced && (
                <span aria-hidden="true" className="work-story-count">
                  0{Math.min(active + 1, slideCount)} / 0{slideCount}
                  <span className="work-story-bar" />
                </span>
              )}
              <Link className="text-link" href="/work/">
                Explore work <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>

          <div
            aria-label={scrollable ? "Representative work examples. Scroll sideways for more." : undefined}
            className="work-story-viewport"
            ref={viewportRef}
            role={scrollable ? "region" : undefined}
            tabIndex={scrollable ? 0 : undefined}
          >
            <ol className="work-story-panels" ref={trackRef}>
              {workSlides.map((slide, index) => (
                <li className="work-panel" data-stage={slide.id} key={slide.id}>
                  <article aria-labelledby={`work-panel-${slide.id}`}>
                    <div className="work-panel-top">
                      <span className="work-panel-label">{slide.label}</span>
                      <span aria-hidden="true" className="work-panel-index">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 id={`work-panel-${slide.id}`}>{slide.title}</h3>
                    <dl>
                      <div>
                        <dt>Challenge</dt>
                        <dd>{slide.challenge}</dd>
                      </div>
                      <div>
                        <dt>Approach</dt>
                        <dd>{slide.approach}</dd>
                      </div>
                    </dl>
                    <div className="work-panel-tags">
                      <span className="work-panel-tags-label">Capabilities</span>
                      <ul>
                        {slide.capabilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="work-panel-tags is-technology">
                      <span className="work-panel-tags-label">Technology</span>
                      <ul>
                        {slide.technologies.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
              <li className="work-panel work-panel-end">
                <div>
                  <span className="work-panel-label">More representative work</span>
                  <p>Filter the full set of engineering examples by capability.</p>
                  <Link className="button button-primary" href="/work/" onFocus={onEndFocus}>
                    Explore work <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
