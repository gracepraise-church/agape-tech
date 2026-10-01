import type { ContactService } from "@/lib/contact/options";

export type ServiceLanding = {
  id: string;
  path: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  propositionTitle: string;
  proposition: string[];
  capabilities: Array<{ title: string; description: string }>;
  useCases: string[];
  process: Array<{ number: string; title: string; description: string }>;
  contactService: ContactService;
  related: Array<{ label: string; href: string }>;
};

export const serviceLandings = {
  websiteDevelopment: {
    id: "website-development",
    path: "/services/website-development/",
    seoTitle: "Website Development Services",
    metaDescription:
      "Agape Tech builds accessible, responsive websites and web applications that give organizations a credible digital presence and room to grow.",
    eyebrow: "WEBSITE DEVELOPMENT / DIGITAL PRESENCE",
    title: "Professional websites built around your next step.",
    description:
      "Create a digital experience that represents your organization clearly, helps people take action, and gives your team a foundation it can keep improving.",
    propositionTitle: "A clearer digital presence, built to last.",
    proposition: [
      "A website should do more than look polished. It should make your organization easier to understand, easier to trust, and easier to engage with.",
      "Agape Tech combines thoughtful interface design, responsive implementation, accessible interactions, and quality-minded delivery so the result works for the people who depend on it.",
    ],
    capabilities: [
      {
        title: "Responsive front-end delivery",
        description: "Interfaces that stay clear and useful across phones, tablets, and larger screens.",
      },
      {
        title: "Content and system integration",
        description: "CMS, API, forms, and data connections shaped around how your organization works.",
      },
      {
        title: "Accessibility and SEO foundations",
        description: "Semantic structure, descriptive content, and technical foundations that help people and search engines navigate the site.",
      },
      {
        title: "Quality-minded launch",
        description: "Focused checks for important journeys, responsive behavior, performance, and maintainability before release.",
      },
    ],
    useCases: [
      "A new organization needs a credible public website",
      "An existing site needs a clearer structure or modern implementation",
      "A content-rich or public-service experience needs accessible interactions",
      "A focused web application or portal needs a dependable front end",
    ],
    process: [
      { number: "01", title: "Understand", description: "Clarify the audience, purpose, content, constraints, and actions the experience needs to support." },
      { number: "02", title: "Shape", description: "Turn the goals into a useful structure, visual direction, and implementation path." },
      { number: "03", title: "Build and validate", description: "Deliver the experience with responsive behavior, accessibility, and meaningful checks in view." },
      { number: "04", title: "Improve", description: "Leave a clear foundation for content updates, future integrations, and thoughtful iteration." },
    ],
    contactService: "Website Development",
    related: [
      { label: "Custom business software", href: "/services/custom-software/" },
      { label: "QA automation", href: "/services/qa-automation/" },
      { label: "AI quality engineering", href: "/services/ai-quality-engineering/" },
    ],
  },
  customSoftware: {
    id: "custom-software",
    path: "/services/custom-software/",
    seoTitle: "Custom Business Software Development",
    metaDescription:
      "Agape Tech develops practical custom business software for finance, HR, CRM, inventory, scheduling, reporting, and administrative workflows.",
    eyebrow: "CUSTOM SOFTWARE / TAILORED WORKFLOWS",
    title: "Custom business software for the work between the tools.",
    description:
      "Turn an important operational need into a practical system designed around your people, processes, data, and next stage of growth.",
    propositionTitle: "Software that fits the way your organization works.",
    proposition: [
      "When important work is spread across disconnected tools, the cost is often hidden in handoffs, duplicate entry, and decisions made without a clear view of the data.",
      "Agape Tech helps map the workflow, make the right boundaries visible, and build a maintainable application that supports the work without adding unnecessary complexity.",
    ],
    capabilities: [
      {
        title: "Workflow discovery",
        description: "Map the work people do today, the rules that matter, and the points where a better system could help.",
      },
      {
        title: "Role-based applications",
        description: "Design focused experiences for administrators, staff, members, customers, or other people in the workflow.",
      },
      {
        title: "Data and API integration",
        description: "Connect the systems and data sources the organization already relies on, with clear boundaries and validation.",
      },
      {
        title: "Incremental delivery",
        description: "Start with the highest-value path, prove the approach, and create room for the system to evolve responsibly.",
      },
    ],
    useCases: [
      "Accounting, invoicing, or financial administration workflows",
      "HR, membership, scheduling, or constituent management",
      "Inventory, reporting, dashboards, or operational coordination",
      "Administrative automation where off-the-shelf software does not fit",
    ],
    process: [
      { number: "01", title: "Map the work", description: "Understand the users, decisions, data, rules, and current tools before choosing a technical shape." },
      { number: "02", title: "Prioritize", description: "Choose a focused first release that reduces meaningful friction and gives the team useful evidence." },
      { number: "03", title: "Deliver", description: "Build the core workflow with maintainable interfaces, integrations, and quality checks." },
      { number: "04", title: "Extend", description: "Use what is learned in real use to guide reporting, automation, and the next useful capability." },
    ],
    contactService: "Custom Business Software",
    related: [
      { label: "Website development", href: "/services/website-development/" },
      { label: "QA automation", href: "/services/qa-automation/" },
      { label: "Technology consulting", href: "/services/" },
    ],
  },
  aiQualityEngineering: {
    id: "ai-quality-engineering",
    path: "/services/ai-quality-engineering/",
    seoTitle: "AI Quality Engineering Services",
    metaDescription:
      "Evaluate AI-enabled products with scenario-based testing, guardrails, and quality engineering that makes model behavior easier to understand.",
    eyebrow: "AI QUALITY ENGINEERING / INTELLIGENT SYSTEMS",
    title: "AI quality engineering for systems people can trust.",
    description:
      "Make AI-enabled experiences more understandable, testable, and useful before people rely on them in important workflows.",
    propositionTitle: "Quality questions for systems that do not behave like ordinary software.",
    proposition: [
      "AI features can be helpful, variable, and difficult to evaluate with a single happy-path check. Confidence comes from making expectations explicit and examining meaningful boundaries.",
      "Agape Tech helps teams design evaluation scenarios, explore failure modes, validate guardrails, and connect model behavior to the experience people are meant to have.",
    ],
    capabilities: [
      {
        title: "Scenario-based evaluation",
        description: "Turn intended behavior, edge cases, and risk questions into repeatable evaluation scenarios.",
      },
      {
        title: "Prompt and response testing",
        description: "Examine response quality, consistency, relevance, and failure behavior across representative inputs.",
      },
      {
        title: "Guardrail validation",
        description: "Check boundaries, refusal behavior, escalation paths, and the controls around model-assisted workflows.",
      },
      {
        title: "Workflow integration",
        description: "Evaluate the AI feature as part of the product, including human review, data flow, and user-facing states.",
      },
    ],
    useCases: [
      "A new assistant, copilot, or language-model feature",
      "Retrieval or agent workflows with important business context",
      "AI-generated content or decisions that need human review",
      "A model or prompt change that needs evidence before release",
    ],
    process: [
      { number: "01", title: "Define quality", description: "Clarify the intended user experience, acceptable variation, important risks, and human responsibilities." },
      { number: "02", title: "Design scenarios", description: "Build a focused set of normal, boundary, adversarial, and recovery cases around the real workflow." },
      { number: "03", title: "Evaluate", description: "Run the scenarios, inspect behavior, and make the evidence understandable to product and engineering teams." },
      { number: "04", title: "Operationalize", description: "Create repeatable checks and feedback that can evolve with the model, prompt, and product." },
    ],
    contactService: "AI Quality Engineering",
    related: [
      { label: "QA automation", href: "/services/qa-automation/" },
      { label: "Custom business software", href: "/services/custom-software/" },
      { label: "Website development", href: "/services/website-development/" },
    ],
  },
  qaAutomation: {
    id: "qa-automation",
    path: "/services/qa-automation/",
    seoTitle: "QA Automation and Test Automation Services",
    metaDescription:
      "Build maintainable QA automation for browser, mobile, API, and service workflows with coverage shaped around product risk and release confidence.",
    eyebrow: "QA AUTOMATION / SMARTER RELEASES",
    title: "QA automation that makes release confidence repeatable.",
    description:
      "Build useful automated coverage around the journeys, services, and risks that matter most as your product changes.",
    propositionTitle: "Automation should give the team better feedback—not a longer test list.",
    proposition: [
      "Automation earns its place when it helps a team see meaningful change sooner, diagnose problems more clearly, and release with a better understanding of risk.",
      "Agape Tech brings risk-led test design, maintainable framework architecture, and delivery feedback together across browser, mobile, API, and service workflows.",
    ],
    capabilities: [
      {
        title: "Framework architecture",
        description: "Create readable, diagnosable foundations that can grow with the product instead of becoming brittle infrastructure.",
      },
      {
        title: "Browser and mobile journeys",
        description: "Automate high-value user paths across responsive web and mobile experiences with meaningful coverage boundaries.",
      },
      {
        title: "API and integration checks",
        description: "Validate contracts, data, and service behavior where UI coverage alone cannot show the full risk.",
      },
      {
        title: "CI feedback and maintenance",
        description: "Connect checks to delivery workflows with diagnostics, test-data thinking, and a plan for keeping coverage useful.",
      },
    ],
    useCases: [
      "A web product needs dependable regression coverage",
      "An existing suite is slow, brittle, or difficult to diagnose",
      "API and integration changes need earlier feedback",
      "A mobile or connected workflow needs repeatable validation",
    ],
    process: [
      { number: "01", title: "Map risk", description: "Identify the journeys, contracts, and release questions where automated feedback can create the most value." },
      { number: "02", title: "Choose coverage", description: "Set clear boundaries for browser, mobile, API, exploratory, and other forms of validation." },
      { number: "03", title: "Build feedback", description: "Implement maintainable checks with useful diagnostics and the right place in the delivery path." },
      { number: "04", title: "Keep it useful", description: "Review signal, maintenance cost, and product change so the suite continues to earn its place." },
    ],
    contactService: "Test Automation",
    related: [
      { label: "AI quality engineering", href: "/services/ai-quality-engineering/" },
      { label: "Custom business software", href: "/services/custom-software/" },
      { label: "Website development", href: "/services/website-development/" },
    ],
  },
} satisfies Record<string, ServiceLanding>;

