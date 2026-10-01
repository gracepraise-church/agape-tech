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
    title: "Website & Web Application Development",
    category: "DIGITAL EXPERIENCES",
    description:
      "Professional websites and web applications designed around your organization’s identity, operational needs, and long-term goals.",
    icon: "layers",
    tags: ["Responsive websites", "Accessibility", "API integration"],
    contactService: "Website Development",
    landingPath: "/services/website-development/",
  },
  {
    title: "Custom Business & Management Software",
    category: "TAILORED WORKFLOWS",
    description:
      "Purpose-built systems for finance, people, customers, inventory, scheduling, reporting, and the work between them.",
    icon: "workflow",
    tags: ["Dashboards", "Workflow automation", "Custom requirements"],
    contactService: "Custom Business Software",
    landingPath: "/services/custom-software/",
  },
  {
    title: "AI Quality Engineering",
    category: "INTELLIGENT SYSTEMS",
    description:
      "Evaluate AI-enabled experiences with practical scenarios, guardrails, and quality signals before people rely on them.",
    icon: "brain",
    tags: ["LLM evaluation", "Guardrails", "Risk scenarios"],
    contactService: "AI Quality Engineering",
    landingPath: "/services/ai-quality-engineering/",
  },
  {
    title: "Test Automation",
    category: "SMARTER AUTOMATION",
    description:
      "Create maintainable automation aligned with the way your product changes, from browser journeys to CI feedback.",
    icon: "workflow",
    tags: ["Playwright", "Regression", "CI/CD"],
    contactService: "Test Automation",
    landingPath: "/services/qa-automation/",
  },
  {
    title: "API & Integration Testing",
    category: "CONNECTED SYSTEMS",
    description:
      "Validate the contracts, business rules, data exchanges, and failure paths that connected systems depend on.",
    icon: "scan",
    tags: ["API contracts", "Data validation", "Integration flows"],
    contactService: "API & Integration",
    landingPath: null,
  },
  {
    title: "Performance Engineering",
    category: "PERFORMANCE & SCALE",
    description:
      "Use realistic workloads and measurable thresholds to understand how digital experiences behave under pressure.",
    icon: "shield",
    tags: ["k6", "Load testing", "Results analysis"],
    contactService: "Performance Engineering",
    landingPath: null,
  },
  {
    title: "Cloud & Digital Solutions",
    category: "DELIVERY SYSTEMS",
    description:
      "Connect cloud platforms, delivery workflows, integration quality, and monitoring around the needs of your team.",
    icon: "sparkles",
    tags: ["AWS / Azure", "CI/CD", "Observability"],
    contactService: "Cloud & Technology Consulting",
    landingPath: null,
  },
  {
    title: "Technology Consulting",
    category: "CLEAR DIRECTION",
    description:
      "Get practical engineering guidance to turn a complex technical challenge into a clear next step.",
    icon: "compass",
    tags: ["Technical discovery", "Architecture", "Delivery"],
    contactService: "Cloud & Technology Consulting",
    landingPath: null,
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
