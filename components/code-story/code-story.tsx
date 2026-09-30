"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { codeDemos, qualityGateSteps } from "@/content/interactive";
import { tokenizeCodeLine } from "@/lib/code-tokens";
import { nextTabIndex } from "@/lib/interactive-motion";

const FINAL_STEP = Number.POSITIVE_INFINITY;
const gateLength = qualityGateSteps.length + 1;

function stepDelay(step: number, blockCount: number, terminalCount: number) {
  if (step < blockCount) return 420;
  if (step < blockCount + terminalCount) return 250;
  return 170;
}

export function CodeStory() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(FINAL_STEP);
  const [playing, setPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const demo = codeDemos[activeIndex];
  const blockCount = demo.blocks.length;
  const terminalCount = demo.terminal.length;
  const totalSteps = blockCount + terminalCount + gateLength;

  const blocksShown = Math.min(step, blockCount);
  const linesShown = blocksShown === 0 ? 0 : demo.blocks[blocksShown - 1];
  const currentBlockStart = blocksShown <= 1 ? 0 : demo.blocks[blocksShown - 2];
  const codeComplete = blocksShown >= blockCount;
  const terminalShown = Math.min(Math.max(step - blockCount, 0), terminalCount);
  const gateShown = Math.min(Math.max(step - blockCount - terminalCount, 0), gateLength);
  const complete = step >= totalSteps;

  useEffect(() => {
    const element = consoleRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reduce;
    if (reduce || !element || !("IntersectionObserver" in window)) return;

    // Server-rendered markup shows the finished demo; hide it until it can play on entry.
    setStep(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (step >= totalSteps) {
      setPlaying(false);
      setAnnouncement(`${demo.label} demo complete. All checks passed.`);
      return;
    }
    const timer = window.setTimeout(
      () => setStep((current) => current + 1),
      stepDelay(step, blockCount, terminalCount),
    );
    return () => window.clearTimeout(timer);
  }, [playing, step, totalSteps, blockCount, terminalCount, demo.label]);

  const play = () => {
    setAnnouncement("");
    if (reducedMotionRef.current) {
      setStep(FINAL_STEP);
      setPlaying(false);
      return;
    }
    setStep(0);
    setPlaying(true);
  };

  const selectTab = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    play();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = nextTabIndex(event.key, index, codeDemos.length);
    if (next === null) return;
    event.preventDefault();
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      aria-labelledby="code-story-title"
      className="code-story-section section-space"
      data-section="code-story"
      id="code-story"
    >
      <div className="page-shell">
        <div className="code-story-intro">
          <span className="eyebrow">
            <span aria-hidden="true" className="eyebrow-mark" />
            AUTOMATION THAT PROVES THE RELEASE
          </span>
          <h2 id="code-story-title">Quality, built into the code.</h2>
          <p>
            Quality expectations become executable checks: UI journeys, API contracts, AI
            evaluation, and performance thresholds that decide whether a release is ready.
          </p>
        </div>

        <div aria-label="Illustrative engineering demos" className="code-tabs" role="tablist">
          {codeDemos.map((item, index) => (
            <button
              aria-controls="code-story-panel"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "code-tab is-active" : "code-tab"}
              data-demo={item.id}
              id={`code-tab-${item.id}`}
              key={item.id}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={index === activeIndex ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`code-tab-${demo.id}`}
          className={`code-console${complete ? " is-complete" : ""}`}
          data-demo={demo.id}
          id="code-story-panel"
          ref={consoleRef}
          role="tabpanel"
        >
          <figure className="code-editor">
            <figcaption className="code-editor-bar">
              <span className="code-editor-file">{demo.fileName}</span>
              <span className="code-editor-tag">agape / console</span>
            </figcaption>
            <pre className="code-editor-body" tabIndex={0}>
              <code>
                {demo.code.map((line, index) => {
                  const visible = index < linesShown;
                  const current = !codeComplete && visible && index >= currentBlockStart;
                  const asserted = codeComplete && terminalShown > 0 && demo.highlightLines.includes(index);
                  const className = [
                    "code-line",
                    visible ? "is-visible" : "",
                    current ? "is-current" : "",
                    asserted ? "is-asserted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <span className={className} key={`${demo.id}-${index}`}>
                      <span aria-hidden="true" className="code-line-number">
                        {index + 1}
                      </span>
                      <span className="code-line-text">
                        {tokenizeCodeLine(line).map((token, tokenIndex) => (
                          <span className={`tok-${token.kind}`} key={tokenIndex}>
                            {token.text}
                          </span>
                        ))}
                        {"\n"}
                      </span>
                    </span>
                  );
                })}
              </code>
            </pre>
          </figure>

          <div className="code-side">
            <div className="code-terminal">
              <div className="code-terminal-bar">
                <span>Terminal</span>
                <span className="code-terminal-state">
                  {complete ? "Passed" : terminalShown > 0 ? "Running" : "Waiting"}
                </span>
              </div>
              <ol className="code-terminal-lines">
                {demo.terminal.map((line, index) => (
                  <li
                    className={`is-${line.kind}${index < terminalShown ? " is-visible" : ""}`}
                    key={`${demo.id}-${line.text}`}
                  >
                    {line.text}
                  </li>
                ))}
              </ol>
            </div>

            <div className="quality-gate">
              <span className="quality-gate-label">Quality gate</span>
              <ol>
                {qualityGateSteps.map((gateStep, index) => (
                  <li
                    className={[
                      index < gateShown ? "is-pass" : "",
                      gateStep === demo.gateStep ? "is-focus" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={gateStep}
                  >
                    <span aria-hidden="true" className="quality-gate-node" />
                    {gateStep}
                  </li>
                ))}
              </ol>
              <span className={gateShown >= gateLength ? "quality-gate-ready is-visible" : "quality-gate-ready"}>
                Ready to ship
              </span>
            </div>
          </div>
        </div>

        <div className="code-story-footer">
          <p>Illustrative examples and demo output only. These are not production results.</p>
          <button className="code-replay" onClick={play} type="button">
            <RotateCcw aria-hidden="true" size={15} />
            Replay demo
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </section>
  );
}
