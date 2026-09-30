import { describe, expect, it } from "vitest";
import { caseStudies } from "../content/phase-two";
import { industries } from "../content/site";
import {
  codeDemos,
  engineeringStages,
  experienceOrganizations,
  publishedExperienceItems,
  qualityGateSteps,
  signalSteps,
  technologyMarquee,
  workSlides,
} from "../content/interactive";
import { tokenizeCodeLine } from "../lib/code-tokens";
import {
  clamp01,
  nextTabIndex,
  pinnedProgress,
  stageIndexFromProgress,
  stageScrollOffset,
} from "../lib/interactive-motion";

const sentenceCount = (text: string) => text.split(/[.!?](?:\s|$)/).filter((part) => part.trim()).length;

describe("engineering story data", () => {
  it("has five uniquely identified, concise stages", () => {
    expect(engineeringStages).toHaveLength(5);
    expect(new Set(engineeringStages.map((stage) => stage.id)).size).toBe(5);
    for (const stage of engineeringStages) {
      expect(sentenceCount(stage.description)).toBeLessThanOrEqual(2);
      expect(stage.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(stage.capabilities.length).toBeLessThanOrEqual(5);
      expect(stage.flow.length).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("code demos", () => {
  it("reveal every line in ordered blocks and highlight real lines", () => {
    expect(codeDemos.map((demo) => demo.id)).toEqual([
      "ui-automation",
      "api-validation",
      "ai-evaluation",
      "performance",
    ]);
    for (const demo of codeDemos) {
      expect(demo.blocks.at(-1)).toBe(demo.code.length);
      expect([...demo.blocks]).toEqual([...demo.blocks].sort((a, b) => a - b));
      for (const line of demo.highlightLines) expect(line).toBeLessThan(demo.code.length);
      expect(qualityGateSteps).toContain(demo.gateStep);
      expect(demo.terminal.at(-1)?.kind).toBe("gate");
    }
  });

  it("keep illustrative lines short enough to avoid wide mobile scrolling", () => {
    for (const demo of codeDemos) {
      for (const line of demo.code) expect(line.length).toBeLessThanOrEqual(64);
    }
  });
});

describe("work slides", () => {
  it("reuse existing representative case studies", () => {
    expect(workSlides).toHaveLength(5);
    for (const slide of workSlides) {
      expect(caseStudies.some((study) => study.id === slide.id)).toBe(true);
      expect(slide.capabilities.length).toBeGreaterThan(0);
    }
  });
});

describe("marquee data safety", () => {
  it("publishes the owner-approved organizations alphabetically, holding back upcoming roles", () => {
    expect(publishedExperienceItems()).toEqual([
      "California Department of Health Care Services (DHCS)",
      "Canoo",
      "CoStar Group",
      "Deloitte",
      "Fox Corporation",
      "Insight Global",
      "Sallie Mae",
      "Ten-X / Xome",
      "UnitedHealth Group",
    ]);
  });

  it("keeps Pediatrix Medical Group in the data but unpublished until the role starts", () => {
    const pediatrix = experienceOrganizations.find((organization) => organization.name === "Pediatrix Medical Group");
    expect(pediatrix).toMatchObject({ verified: true, status: "upcoming" });
    expect(publishedExperienceItems()).not.toContain("Pediatrix Medical Group");
  });

  it("publishes only verified, started organizations and falls back to sectors otherwise", () => {
    const items = publishedExperienceItems([
      { name: "Zeta Example", relationship: "professional-experience", verified: true, status: "started" },
      { name: "Alpha Example", relationship: "employment", verified: true, status: "started" },
      { name: "Upcoming Example", relationship: "employment", verified: true, status: "upcoming" },
      { name: "Unverified Example", relationship: "professional-experience", verified: false, status: "started" },
    ]);
    expect(items).toEqual(["Alpha Example", "Zeta Example"]);
    expect(
      publishedExperienceItems([
        { name: "Unverified Example", relationship: "professional-experience", verified: false, status: "started" },
      ]),
    ).toEqual(industries.map((industry) => industry.title));
  });

  it("uses unique, curated technology names", () => {
    expect(new Set(technologyMarquee).size).toBe(technologyMarquee.length);
    expect(technologyMarquee.length).toBeLessThanOrEqual(24);
  });

  it("never frames interactive content or organizations as client work", () => {
    const text = JSON.stringify({
      engineeringStages,
      codeDemos,
      workSlides,
      signalSteps,
      technologyMarquee,
      experienceOrganizations,
    });
    expect(text).not.toMatch(/\b(our clients|clients|customers|trusted by|companies we serve)\b/i);
  });
});

describe("scroll and tab helpers", () => {
  it("maps pinned scroll position to clamped progress and stages", () => {
    expect(clamp01(Number.NaN)).toBe(0);
    expect(pinnedProgress(100, 3000, 1000)).toBe(0);
    expect(pinnedProgress(-1000, 3000, 1000)).toBe(0.5);
    expect(pinnedProgress(-5000, 3000, 1000)).toBe(1);
    expect(stageIndexFromProgress(0, 5)).toBe(0);
    expect(stageIndexFromProgress(0.39, 5)).toBe(1);
    expect(stageIndexFromProgress(1, 5)).toBe(4);
    expect(stageScrollOffset(0, 5, 1000)).toBe(100);
    expect(stageScrollOffset(4, 5, 1000)).toBe(900);
  });

  it("supports arrow, Home, and End keys for tabs", () => {
    expect(nextTabIndex("ArrowRight", 3, 4)).toBe(0);
    expect(nextTabIndex("ArrowLeft", 0, 4)).toBe(3);
    expect(nextTabIndex("Home", 2, 4)).toBe(0);
    expect(nextTabIndex("End", 0, 4)).toBe(3);
    expect(nextTabIndex("Enter", 1, 4)).toBeNull();
  });

  it("tokenizes code without changing its text", () => {
    for (const demo of codeDemos) {
      for (const line of demo.code) {
        expect(tokenizeCodeLine(line).map((token) => token.text).join("")).toBe(line);
      }
    }
    const tokens = tokenizeCodeLine('await page.goto("/checkout"); // note');
    expect(tokens.find((token) => token.kind === "keyword")?.text).toBe("await");
    expect(tokens.find((token) => token.kind === "string")?.text).toBe('"/checkout"');
    expect(tokens.find((token) => token.kind === "function")?.text).toBe("goto");
    expect(tokens.at(-1)).toEqual({ kind: "comment", text: "// note" });
  });
});
