import { caseStudies } from "./phase-two";
import { industries } from "./site";

export type StageTone = "amber" | "orange" | "slate" | "warm" | "network";

export type EngineeringStage = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  capabilities: readonly string[];
  flow: readonly string[];
  outcome: string;
  tone: StageTone;
};

export const engineeringStages: readonly EngineeringStage[] = [
  {
    id: "ai-quality",
    number: "01",
    label: "AI Quality Engineering",
    title: "Evaluate intelligence before people rely on it.",
    description:
      "Scenario-based evaluation and guardrail checks make AI behavior easier to examine before a response reaches a user.",
    capabilities: ["LLM evaluation", "Guardrail validation", "Grounding checks", "Risk-based scenarios"],
    flow: ["User prompt", "Model or agent", "Evaluation", "Guardrail check", "Grounding check"],
    outcome: "Trusted response",
    tone: "amber",
  },
  {
    id: "test-automation",
    number: "02",
    label: "Test Automation",
    title: "Let every change prove itself.",
    description:
      "Maintainable automation runs the journeys that matter on each change, so regressions surface in the pipeline instead of in production.",
    capabilities: ["Playwright", "Regression strategy", "CI/CD integration", "Framework design"],
    flow: ["Commit", "Build", "UI tests", "API tests", "Regression suite"],
    outcome: "Release candidate",
    tone: "orange",
  },
  {
    id: "api-quality",
    number: "03",
    label: "API & Integration Quality",
    title: "Validate the contracts systems depend on.",
    description:
      "Contract, business-rule, and data checks follow a request across connected services, including the boundary and failure cases.",
    capabilities: ["Contract validation", "Data validation", "Integration testing", "Postman / REST Assured"],
    flow: ["Request", "Authentication", "Contract validation", "Business rules", "Data validation"],
    outcome: "Verified response",
    tone: "slate",
  },
  {
    id: "performance",
    number: "04",
    label: "Performance Engineering",
    title: "Measure behavior under realistic load.",
    description:
      "Meaningful workloads and explicit thresholds turn performance from a guess into evidence the team can act on.",
    capabilities: ["Workload modeling", "k6 / JMeter", "Threshold design", "Results analysis"],
    flow: ["Virtual users", "Service", "Latency", "Throughput", "Threshold check"],
    outcome: "Release decision",
    tone: "warm",
  },
  {
    id: "cloud-delivery",
    number: "05",
    label: "Cloud & Delivery Confidence",
    title: "Carry quality all the way to production.",
    description:
      "Quality gates, container workflows, and monitoring connect delivery pipelines to what happens after release.",
    capabilities: ["GitHub Actions", "Docker", "AWS / Azure", "Quality gates"],
    flow: ["Developer", "Git", "Continuous integration", "Automated quality", "Deployment"],
    outcome: "Monitored release",
    tone: "network",
  },
] as const;

export type TerminalLine = {
  text: string;
  kind: "command" | "info" | "pass" | "summary" | "gate";
};

export type CodeDemo = {
  id: string;
  label: string;
  fileName: string;
  gateStep: QualityGateStep;
  code: readonly string[];
  /** Index (exclusive) of the last line in each progressive reveal block. */
  blocks: readonly number[];
  highlightLines: readonly number[];
  terminal: readonly TerminalLine[];
};

export const qualityGateSteps = ["Code", "Automation", "API", "AI evaluation", "Performance"] as const;
export type QualityGateStep = (typeof qualityGateSteps)[number];

export const codeDemos: readonly CodeDemo[] = [
  {
    id: "ui-automation",
    label: "UI automation",
    fileName: "checkout.spec.ts",
    gateStep: "Automation",
    code: [
      'import { test, expect } from "@playwright/test";',
      "",
      'test("keeps the order summary", async ({ page }) => {',
      '  await page.goto("/checkout");',
      '  await page.getByLabel("Email").fill("qa@example.com");',
      '  await page.getByRole("button", { name: "Continue" }).click();',
      "",
      '  await expect(page.getByText("Order summary")).toBeVisible();',
      "});",
    ],
    blocks: [2, 4, 7, 9],
    highlightLines: [7],
    terminal: [
      { text: "$ npx playwright test", kind: "command" },
      { text: "Running 3 tests", kind: "info" },
      { text: "✓ keeps the order summary", kind: "pass" },
      { text: "✓ validates required fields", kind: "pass" },
      { text: "✓ restores a saved cart", kind: "pass" },
      { text: "3 passed", kind: "summary" },
      { text: "QUALITY GATE: PASS", kind: "gate" },
    ],
  },
  {
    id: "api-validation",
    label: "API validation",
    fileName: "resource.api.spec.ts",
    gateStep: "API",
    code: [
      'test("creates a resource", async ({ request }) => {',
      '  const response = await request.post("/api/resource", {',
      "    data: payload,",
      "  });",
      "",
      "  expect(response.status()).toBe(201);",
      "",
      "  const body = await response.json();",
      "  expect(body.id).toBeDefined();",
      "});",
    ],
    blocks: [4, 6, 9, 10],
    highlightLines: [5, 8],
    terminal: [
      { text: "$ npm test", kind: "command" },
      { text: "Running API validation…", kind: "info" },
      { text: "✓ Authentication", kind: "pass" },
      { text: "✓ Contract validation", kind: "pass" },
      { text: "✓ Required fields", kind: "pass" },
      { text: "✓ Response schema", kind: "pass" },
      { text: "4 passed", kind: "summary" },
      { text: "QUALITY GATE: PASS", kind: "gate" },
    ],
  },
  {
    id: "ai-evaluation",
    label: "AI evaluation",
    fileName: "assistant.eval.ts",
    gateStep: "AI evaluation",
    code: [
      "// evaluateResponse is an illustrative project helper",
      "const evaluation = await evaluateResponse({",
      "  response,",
      '  criteria: ["grounded", "safe", "relevant", "complete"],',
      "});",
      "",
      "expect(evaluation.passed).toBe(true);",
      "expect(evaluation.hallucinationRisk).toBeLessThan(0.2);",
    ],
    blocks: [1, 5, 7, 8],
    highlightLines: [6, 7],
    terminal: [
      { text: "$ npm run eval", kind: "command" },
      { text: "Evaluating 4 criteria…", kind: "info" },
      { text: "✓ grounded", kind: "pass" },
      { text: "✓ safe", kind: "pass" },
      { text: "✓ relevant", kind: "pass" },
      { text: "✓ complete", kind: "pass" },
      { text: "QUALITY GATE: PASS", kind: "gate" },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    fileName: "load-test.js",
    gateStep: "Performance",
    code: [
      'import http from "k6/http";',
      'import { check } from "k6";',
      "",
      "export const options = {",
      "  thresholds: {",
      '    http_req_duration: ["p(95)<500"],',
      "  },",
      "};",
      "",
      "export default function () {",
      "  const res = http.get(`${BASE_URL}/health`);",
      '  check(res, { "status is 200": (r) => r.status === 200 });',
      "}",
    ],
    blocks: [3, 8, 11, 13],
    highlightLines: [5],
    terminal: [
      { text: "$ k6 run load-test.js", kind: "command" },
      { text: "Applying thresholds…", kind: "info" },
      { text: "✓ status is 200", kind: "pass" },
      { text: "✓ http_req_duration p(95)<500", kind: "pass" },
      { text: "thresholds met", kind: "summary" },
      { text: "QUALITY GATE: PASS", kind: "gate" },
    ],
  },
] as const;

const workSlideSources = [
  { id: "ai-ml-quality-engineering", label: "AI Quality" },
  { id: "healthcare-api-automation", label: "API & Data Validation" },
  { id: "enterprise-media-metadata", label: "Media & Entertainment" },
  { id: "performance-engineering", label: "Performance Engineering" },
  { id: "playwright-framework-architecture", label: "Automation Modernization" },
] as const;

export type WorkSlide = {
  id: string;
  label: string;
  title: string;
  challenge: string;
  approach: string;
  capabilities: readonly string[];
  technologies: readonly string[];
};

export const workSlides: readonly WorkSlide[] = workSlideSources.map(({ id, label }) => {
  const study = caseStudies.find((item) => item.id === id);
  if (!study) throw new Error(`Unknown case study for work slide: ${id}`);
  return {
    id,
    label,
    title: study.title,
    challenge: study.challenge,
    approach: study.approach,
    capabilities: study.capabilities,
    technologies: study.technologies,
  };
});

export type ExperienceOrganization = {
  name: string;
  relationship: "employment" | "contract-environment" | "professional-experience";
  /** Only owner-verified names are published. Never present these as Agape Tech clients. */
  verified: boolean;
  /** "upcoming" roles stay unpublished until the owner's work there has actually started. */
  status: "started" | "upcoming";
};

// Owner-approved professional employment/contract environments — not Agape Tech clients or customers.
export const experienceOrganizations: readonly ExperienceOrganization[] = [
  { name: "California Department of Health Care Services (DHCS)", relationship: "professional-experience", verified: true, status: "started" },
  { name: "Canoo", relationship: "professional-experience", verified: true, status: "started" },
  { name: "CoStar Group", relationship: "professional-experience", verified: true, status: "started" },
  { name: "Deloitte", relationship: "professional-experience", verified: true, status: "started" },
  { name: "Fox Corporation", relationship: "professional-experience", verified: true, status: "started" },
  { name: "Insight Global", relationship: "professional-experience", verified: true, status: "started" },
  { name: "Pediatrix Medical Group", relationship: "employment", verified: true, status: "upcoming" },
  { name: "Sallie Mae", relationship: "professional-experience", verified: true, status: "started" },
  { name: "Ten-X / Xome", relationship: "professional-experience", verified: true, status: "started" },
  { name: "UnitedHealth Group", relationship: "professional-experience", verified: true, status: "started" },
];

export function publishedExperienceItems(
  organizations: readonly ExperienceOrganization[] = experienceOrganizations,
): string[] {
  const published = organizations
    .filter((organization) => organization.verified && organization.status === "started")
    .map((organization) => organization.name)
    .sort((a, b) => a.localeCompare(b, "en"));
  return published.length > 0 ? published : industries.map((industry) => industry.title);
}

export type BrandWordmark = {
  name: string;
  mark: string;
  logoAsset?: string;
  logoSurface?: "light";
};

const experienceWordmarkByName: Record<string, string> = {
  "California Department of Health Care Services (DHCS)": "DHCS",
  Canoo: "CANOO",
  "CoStar Group": "COSTAR",
  Deloitte: "DELOITTE",
  "Fox Corporation": "FOX",
  "Insight Global": "IG",
  "Sallie Mae": "SM",
  "Ten-X / Xome": "TEN-X",
  "UnitedHealth Group": "UHG",
};

const experienceLogoAssetByName: Record<string, string> = {
  "California Department of Health Care Services (DHCS)": "/assets/brand/marquee/dhcs.png",
  Canoo: "/assets/brand/marquee/canoo.svg",
  "CoStar Group": "/assets/brand/marquee/costar.svg",
  Deloitte: "/assets/brand/marquee/deloitte.svg",
  "Fox Corporation": "/assets/brand/marquee/fox.svg",
  "Sallie Mae": "/assets/brand/marquee/sallie-mae.svg",
  "UnitedHealth Group": "/assets/brand/marquee/unitedhealth.svg",
};

const experienceLogoSurfaceByName: Record<string, "light"> = {
  "California Department of Health Care Services (DHCS)": "light",
  Canoo: "light",
  "CoStar Group": "light",
  Deloitte: "light",
  "Fox Corporation": "light",
  "UnitedHealth Group": "light",
};

export function publishedExperienceWordmarks(
  organizations: readonly ExperienceOrganization[] = experienceOrganizations,
): BrandWordmark[] {
  return publishedExperienceItems(organizations).map((name) => ({
    name,
    mark: experienceWordmarkByName[name] ?? name.slice(0, 3).toUpperCase(),
    ...(experienceLogoAssetByName[name]
      ? {
          logoAsset: experienceLogoAssetByName[name],
          ...(experienceLogoSurfaceByName[name]
            ? { logoSurface: experienceLogoSurfaceByName[name] }
            : {}),
        }
      : {}),
  }));
}

export const technologyMarquee = [
  "Playwright",
  "Selenium",
  "Cypress",
  "Appium",
  "Katalon Studio",
  "Postman",
  "REST Assured",
  "TestRail",
  "JUnit",
  "TypeScript",
  "Java",
  "Python",
  "Kafka",
  "k6",
  "JMeter",
  "AWS",
  "Microsoft Azure",
  "Docker",
  "GitHub",
  "Jenkins",
  "MySQL",
  "MongoDB",
  "Grafana",
  "OpenAI",
] as const;

const technologyMarkByName: Record<string, string> = {
  Playwright: "PW",
  Selenium: "SE",
  Cypress: "CY",
  Appium: "AP",
  "Katalon Studio": "KT",
  Postman: "PM",
  "REST Assured": "RA",
  TestRail: "TR",
  JUnit: "JU",
  TypeScript: "TS",
  Java: "JAVA",
  Python: "PY",
  Kafka: "KF",
  k6: "K6",
  JMeter: "JM",
  AWS: "AWS",
  "Microsoft Azure": "AZ",
  Docker: "DK",
  GitHub: "GH",
  Jenkins: "JK",
  MySQL: "SQL",
  MongoDB: "MG",
  Grafana: "GR",
  OpenAI: "AI",
};

const technologyLogoAssetByName: Record<string, string> = {
  Selenium: "/assets/brand/marquee/selenium.svg",
  Cypress: "/assets/brand/marquee/cypress.svg",
  Appium: "/assets/brand/marquee/appium.svg",
  Postman: "/assets/brand/marquee/postman.svg",
  TestRail: "/assets/brand/marquee/testrail.svg",
  JUnit: "/assets/brand/marquee/junit5.svg",
  TypeScript: "/assets/brand/marquee/typescript.svg",
  Python: "/assets/brand/marquee/python.svg",
  Kafka: "/assets/brand/marquee/apachekafka.svg",
  k6: "/assets/brand/marquee/k6.svg",
  JMeter: "/assets/brand/marquee/apachejmeter.svg",
  Docker: "/assets/brand/marquee/docker.svg",
  GitHub: "/assets/brand/marquee/github.svg",
  Jenkins: "/assets/brand/marquee/jenkins.svg",
  MySQL: "/assets/brand/marquee/mysql.svg",
  MongoDB: "/assets/brand/marquee/mongodb.svg",
  Grafana: "/assets/brand/marquee/grafana.svg",
};

export const technologyWordmarks: readonly BrandWordmark[] = technologyMarquee.map((name) => ({
  name,
  mark: technologyMarkByName[name] ?? name.slice(0, 3).toUpperCase(),
  ...(technologyLogoAssetByName[name] ? { logoAsset: technologyLogoAssetByName[name] } : {}),
}));

export const signalSteps = ["Build", "Test", "Validate", "Ship"] as const;
