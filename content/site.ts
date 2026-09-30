export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const capabilities = [
  {
    number: "01",
    eyebrow: "AI ENGINEER",
    title: "Make intelligence useful.",
    description:
      "Move beyond experiments with thoughtful AI experiences, evaluation, and guardrails built around real work.",
    icon: "sparkles",
  },
  {
    number: "02",
    eyebrow: "AUTOMATE",
    title: "Give good work room.",
    description:
      "Replace repetitive effort with reliable automation that fits your people, platforms, and pace.",
    icon: "workflow",
  },
  {
    number: "03",
    eyebrow: "VALIDATE",
    title: "Know before you ship.",
    description:
      "Find risk earlier with quality engineering that makes releases clearer, calmer, and more dependable.",
    icon: "scan",
  },
  {
    number: "04",
    eyebrow: "BUILD",
    title: "Turn ideas into systems.",
    description:
      "Design and deliver digital products with the architecture and craft to keep moving forward.",
    icon: "layers",
  },
] as const;

export const services = [
  {
    title: "AI & Intelligent Systems",
    category: "INTELLIGENT SYSTEMS",
    description:
      "Bring AI into the flow of work with useful applications, evaluations, and thoughtful safeguards.",
    icon: "brain",
    tags: ["AI applications", "LLM evaluation", "Workflow agents"],
  },
  {
    title: "Quality Engineering",
    category: "QUALITY ENGINEERING",
    description:
      "Make quality a confident, measurable part of how your team designs, builds, and releases.",
    icon: "shield",
    tags: ["Quality strategy", "Test architecture", "Release confidence"],
  },
  {
    title: "Test Automation",
    category: "SMARTER AUTOMATION",
    description:
      "Create automation that is maintainable, meaningful, and aligned with the way your product changes.",
    icon: "workflow",
    tags: ["Playwright", "Regression", "CI/CD"],
  },
  {
    title: "Technology Consulting",
    category: "CLEAR DIRECTION",
    description:
      "Get practical engineering guidance to turn a complex technical challenge into a clear next step.",
    icon: "compass",
    tags: ["Technical discovery", "Architecture", "Delivery"],
  },
] as const;

export const processStages = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the people, goals, constraints, and real problem before choosing a solution.",
  },
  {
    number: "02",
    title: "Design",
    description: "Shape an approach that balances experience, quality, technical fit, and room to grow.",
  },
  {
    number: "03",
    title: "Engineer",
    description: "Build with care, keeping the work visible and decisions grounded in your context.",
  },
  {
    number: "04",
    title: "Validate",
    description: "Test the experience and the edges, so risks surface before they become surprises.",
  },
  {
    number: "05",
    title: "Deliver",
    description: "Ship thoughtfully, share what was learned, and leave your team ready for what is next.",
  },
] as const;

export const industries = [
  {
    number: "01",
    title: "Media & Entertainment",
    description: "Support content-rich experiences, metadata quality, and dependable digital platforms.",
  },
  {
    number: "02",
    title: "Healthcare & Public Sector",
    description: "Improve confidence in the services and data people rely on every day.",
  },
  {
    number: "03",
    title: "Automotive & Mobility",
    description: "Validate connected experiences, mobile journeys, and fast-moving product ecosystems.",
  },
  {
    number: "04",
    title: "Real Estate & Financial Technology",
    description: "Build dependable workflows where complex information meets important decisions.",
  },
  {
    number: "05",
    title: "Small Business & Nonprofit",
    description: "Make thoughtful technology accessible to teams working with limited time and resources.",
  },
] as const;

export const featuredWork = [
  {
    category: "AI / ML QUALITY ENGINEERING",
    title: "Making AI experiences more dependable.",
    description:
      "A representative engagement shape for evaluating AI behavior, quality risks, and the experience around intelligent features.",
    tags: ["AI evaluation", "Quality strategy", "Guardrails"],
  },
  {
    category: "ENTERPRISE AUTOMATION ARCHITECTURE",
    title: "A clearer path to confident releases.",
    description:
      "An example of how a maintainable automation approach can connect meaningful coverage with everyday delivery.",
    tags: ["Test architecture", "Playwright", "CI/CD"],
  },
  {
    category: "HEALTHCARE API & DATA VALIDATION",
    title: "Bringing clarity to connected systems.",
    description:
      "A representative case-study direction for validating APIs and data flows across complex service environments.",
    tags: ["API testing", "Data quality", "Integration"],
  },
] as const;

export const technologyGroups = [
  {
    title: "AI & Intelligent Systems",
    technologies: ["OpenAI", "LangChain", "LangGraph", "AWS Bedrock"],
    icon: "brain",
  },
  {
    title: "Quality Engineering",
    technologies: ["Playwright", "TypeScript", "Selenium", "Appium"],
    icon: "scan",
  },
  {
    title: "Performance",
    technologies: ["k6", "JMeter", "Locust", "Load strategy"],
    icon: "activity",
  },
  {
    title: "Cloud & DevOps",
    technologies: ["AWS", "Azure", "Docker", "GitHub Actions"],
    icon: "cloud",
  },
  {
    title: "Data & Integration",
    technologies: ["REST APIs", "PostgreSQL", "SQL Server", "Snowflake"],
    icon: "database",
  },
] as const;

export const projectOptions = [
  "AI application",
  "Business application",
  "Website",
  "QA automation",
  "API testing",
  "Performance",
  "Cloud / DevOps",
  "Something else",
] as const;

export const projectChallenges = [
  "I have an idea and need a plan",
  "I need to improve quality or reliability",
  "Too much work is still manual",
  "I need help choosing the right approach",
] as const;
