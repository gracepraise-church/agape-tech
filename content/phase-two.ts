export const detailedServices = [
  {
    id: "ai-intelligent-systems",
    number: "01",
    title: "AI & Intelligent Systems",
    category: "INTELLIGENT SYSTEMS",
    introduction:
      "Turn promising AI ideas into useful, testable experiences that fit the way people actually work.",
    whatItIs:
      "Design and engineering for AI-powered applications, language-model workflows, and assisted decision-making.",
    problems: ["Unclear AI use cases", "Inconsistent model behavior", "Unmeasured quality or risk"],
    engagements: ["AI opportunity discovery", "LLM evaluation and guardrail planning", "Focused application proof of concept"],
    capabilities: ["AI experience design", "Evaluation strategy", "Prompt and response testing", "Workflow integration"],
    technologies: ["OpenAI", "AWS Bedrock", "LangChain", "LangGraph"],
    icon: "brain",
    landingPath: "/services/ai-quality-engineering/",
  },
  {
    id: "quality-engineering",
    number: "02",
    title: "Quality Engineering",
    category: "QUALITY ENGINEERING",
    introduction:
      "Make quality a shared engineering practice—not a final checkpoint before release.",
    whatItIs:
      "A risk-led approach to designing, validating, and improving quality across the product lifecycle.",
    problems: ["Unstable releases", "Late defect discovery", "Unclear quality ownership"],
    engagements: ["Quality strategy and assessment", "Risk-based test planning", "Release-readiness support"],
    capabilities: ["Quality models", "Test architecture", "Exploratory testing", "Release confidence"],
    technologies: ["TypeScript", "Playwright", "Selenium", "Katalon"],
    icon: "shield",
    landingPath: null,
  },
  {
    id: "test-automation",
    number: "03",
    title: "Test Automation",
    category: "SMARTER AUTOMATION",
    introduction:
      "Build automation that earns its place in the delivery process and remains useful as products evolve.",
    whatItIs:
      "Maintainable browser, mobile, and service test automation designed around meaningful product risk.",
    problems: ["Slow manual regression", "Brittle legacy suites", "Low-confidence automation"],
    engagements: ["Framework assessment", "Playwright proof of concept", "Regression and CI integration"],
    capabilities: ["Framework architecture", "Browser and mobile automation", "Test data strategy", "CI feedback"],
    technologies: ["Playwright", "TypeScript", "Selenium", "Java", "Appium", "Katalon"],
    icon: "workflow",
    landingPath: "/services/qa-automation/",
  },
  {
    id: "api-integration-testing",
    number: "04",
    title: "API & Integration Testing",
    category: "CONNECTED SYSTEMS",
    introduction:
      "See how systems behave together, from the shape of a contract to the quality of the data in motion.",
    whatItIs:
      "Validation of service contracts, integration flows, data exchanges, and important failure conditions.",
    problems: ["Inconsistent API behavior", "Integration regressions", "Unverified data flows"],
    engagements: ["API test strategy", "Contract and integration coverage", "Service-quality assessment"],
    capabilities: ["Contract validation", "Workflow coverage", "Negative-path testing", "Data reconciliation"],
    technologies: ["REST Assured", "Postman", "Playwright", "TypeScript"],
    icon: "network",
    landingPath: null,
  },
  {
    id: "performance-engineering",
    number: "05",
    title: "Performance Engineering",
    category: "PERFORMANCE & SCALE",
    introduction:
      "Understand how a digital experience responds under pressure before performance becomes a customer problem.",
    whatItIs:
      "Practical performance testing and analysis grounded in expected usage and measurable service behavior.",
    problems: ["Slow or variable response", "Capacity uncertainty", "Unclear performance bottlenecks"],
    engagements: ["Performance test planning", "Workload modeling", "Baseline and bottleneck investigation"],
    capabilities: ["Load and stress testing", "Performance baselines", "Scenario design", "Results interpretation"],
    technologies: ["k6", "JMeter", "Locust", "Gatling"],
    icon: "activity",
    landingPath: null,
  },
  {
    id: "web-application-development",
    number: "06",
    title: "Website & Web Application Development",
    category: "DIGITAL PRODUCTS",
    introduction:
      "Create a professional digital presence or a focused application shaped around your organization’s identity, users, and goals.",
    whatItIs:
      "Professional organization websites, responsive web applications, modernization, CMS integration, accessibility, technical SEO foundations, APIs, and ongoing improvements.",
    problems: ["A new organization needs a credible web presence", "An existing site needs modernization", "A workflow needs a better interface"],
    engagements: ["Website discovery and design direction", "Responsive website or web application delivery", "Accessibility and ongoing improvement plan"],
    capabilities: ["Responsive interfaces", "Application architecture", "CMS and API integration", "Accessible interactions", "Quality-minded delivery"],
    technologies: ["TypeScript", "React", "Next.js", "API integrations"],
    icon: "layers",
    landingPath: "/services/website-development/",
  },
  {
    id: "custom-business-software",
    number: "07",
    title: "Custom Business & Management Software",
    category: "TAILORED WORKFLOWS",
    introduction:
      "Turn an important operational need into a practical system designed around the way your organization works.",
    whatItIs:
      "Custom development capabilities for accounting and financial workflows, invoicing, HR, CRM, inventory, scheduling, membership, donations, dashboards, reporting, and administrative automation.",
    problems: ["Important work is spread across disconnected tools", "Manual administration is slowing the team down", "Off-the-shelf software does not fit the requirements"],
    engagements: ["Workflow discovery and requirements mapping", "Custom business application development", "Incremental automation and reporting improvements"],
    capabilities: ["Role-based workflows", "Data and API integration", "Dashboards and reporting", "Administrative automation", "Maintainable delivery"],
    technologies: ["Web applications", "APIs", "Databases", "Cloud platforms"],
    icon: "workflow",
    landingPath: "/services/custom-software/",
  },
  {
    id: "cloud-devops-quality",
    number: "08",
    title: "Cloud & DevOps Quality",
    category: "DELIVERY SYSTEMS",
    introduction:
      "Bring useful validation into the paths that build, integrate, and release your software.",
    whatItIs:
      "Quality practices and integration validation that complement cloud platforms and delivery pipelines.",
    problems: ["Gaps in CI/CD feedback", "Unclear integration risk", "Inconsistent delivery workflows"],
    engagements: ["Pipeline quality review", "Quality-gate design", "Cloud integration validation"],
    capabilities: ["CI test integration", "Environment strategy", "Pipeline feedback", "Release validation"],
    technologies: ["GitHub Actions", "Jenkins", "Docker", "AWS", "Azure"],
    icon: "cloud",
    landingPath: null,
  },
  {
    id: "technology-consulting",
    number: "09",
    title: "Technology Consulting",
    category: "CLEAR DIRECTION",
    introduction:
      "Get experienced, practical guidance when the challenge is clear but the next step is not.",
    whatItIs:
      "Focused technical discovery and engineering advice to help teams make informed decisions and move forward.",
    problems: ["Too many technical options", "Unclear delivery risks", "A team needs an independent perspective"],
    engagements: ["Technical discovery", "Architecture and quality reviews", "Roadmap and delivery planning"],
    capabilities: ["Problem framing", "Technical assessment", "Option analysis", "Collaborative planning"],
    technologies: ["Approach shaped to context", "Cloud platforms", "Modern web systems", "Quality tooling"],
    icon: "compass",
    landingPath: null,
  },
] as const;

export const solutionIndustries = [
  {
    id: "media-entertainment",
    number: "01",
    title: "Media & Entertainment",
    theme: "CONTENT, METADATA & DIGITAL EXPERIENCES",
    challenge:
      "Content-rich platforms depend on dependable metadata, connected services, and consistent digital journeys.",
    approach:
      "Map the experience and information flow, identify quality risks, and validate the systems that connect discovery to delivery.",
    capabilities: ["Metadata quality", "API validation", "Web and mobile quality", "Workflow automation"],
    example:
      "A representative metadata-quality assessment spanning data rules, service contracts, and user-facing discovery.",
    icon: "clapperboard",
  },
  {
    id: "healthcare-public-sector",
    number: "02",
    title: "Healthcare & Public Sector",
    theme: "SERVICES PEOPLE RELY ON",
    challenge:
      "Complex services and data flows can make it difficult to maintain clear, consistent digital experiences.",
    approach:
      "Focus on the paths people use, the integrations behind them, and the validation needed to spot change-related risk.",
    capabilities: ["API and integration quality", "Data validation", "Accessibility-minded testing", "Regression strategy"],
    example:
      "A representative service-integration validation plan for important user journeys and their dependent APIs.",
    icon: "heart-pulse",
  },
  {
    id: "automotive-mobility",
    number: "03",
    title: "Automotive & Mobility",
    theme: "CONNECTED, MOVING EXPERIENCES",
    challenge:
      "Mobile, vehicle, and connected-service experiences must work together across changing conditions.",
    approach:
      "Identify critical journeys, explore device and service boundaries, and make validation repeatable as systems evolve.",
    capabilities: ["Mobile automation", "API integration", "Device coverage", "Performance validation"],
    example:
      "A representative mobile-automation strategy for connected experiences, device coverage, and service dependencies.",
    icon: "car-front",
  },
  {
    id: "real-estate-fintech",
    number: "04",
    title: "Real Estate & Financial Technology",
    theme: "INFORMATION INTO DECISIONS",
    challenge:
      "Information-heavy workflows require dependable data, understandable experiences, and confidence in key transactions.",
    approach:
      "Trace critical data and transaction paths, then design validation for the rules and integrations that support them.",
    capabilities: ["Workflow quality", "API testing", "Data reconciliation", "Performance engineering"],
    example:
      "A representative workflow-validation engagement covering business rules, data movement, and user-facing states.",
    icon: "landmark",
  },
  {
    id: "small-business-nonprofit",
    number: "05",
    title: "Small Business & Nonprofit",
    theme: "PRACTICAL TECHNOLOGY, REAL PURPOSE",
    challenge:
      "Small teams often need to make meaningful progress without adding unnecessary complexity or overhead.",
    approach:
      "Start with the most important need, choose a proportionate solution, and leave the team with a clear path to maintain it.",
    capabilities: ["Product discovery", "Workflow automation", "Web applications", "Practical quality planning"],
    example:
      "A focused discovery and prototype engagement for a team improving an internal workflow or public-facing service.",
    icon: "sprout",
  },
] as const;

export const caseStudies = [
  {
    id: "ai-ml-quality-engineering",
    category: "AI",
    title: "Quality engineering for AI-enabled experiences",
    summary:
      "A representative approach to evaluating the behavior, reliability, and user experience of AI-assisted features.",
    challenge: "AI outputs can vary, while teams need a clearer way to understand quality expectations and risk.",
    approach: "Define evaluation scenarios, examine edge cases, and align safeguards with the intended user experience.",
    capabilities: ["LLM evaluation", "Risk-based test design", "Guardrail validation"],
    technologies: ["OpenAI", "AWS Bedrock", "TypeScript"],
    outcomeFocus: "A repeatable evaluation approach and a more explicit view of product-quality questions.",
  },
  {
    id: "enterprise-media-metadata",
    category: "Quality",
    title: "Metadata quality across media experiences",
    summary:
      "Representative engineering experience supporting quality practices for metadata-rich digital platforms.",
    challenge: "Inconsistent or incomplete metadata can affect discovery, integrations, and downstream experiences.",
    approach: "Trace key information paths and define validation for business rules, interfaces, and data quality.",
    capabilities: ["Metadata validation", "Integration testing", "Quality strategy"],
    technologies: ["REST APIs", "SQL", "Automation"],
    outcomeFocus: "Clearer validation coverage for important metadata rules and connected workflows.",
  },
  {
    id: "healthcare-api-automation",
    category: "API",
    title: "API automation for connected services",
    summary:
      "A representative case-study direction for validating APIs and data exchanges in service environments.",
    challenge: "Changes across connected services can create hard-to-see risks in data and user journeys.",
    approach: "Prioritize critical contracts and workflows, then validate normal, boundary, and failure behavior.",
    capabilities: ["API testing", "Data validation", "Integration strategy"],
    technologies: ["Postman", "REST Assured", "TypeScript"],
    outcomeFocus: "A focused API validation plan that makes important integration risks easier to examine.",
  },
  {
    id: "automotive-mobile-automation",
    category: "Automation",
    title: "Mobile automation for connected journeys",
    summary:
      "Representative mobile quality engineering across device, application, and service interactions.",
    challenge: "Device and service combinations make it difficult to keep important mobile journeys predictable.",
    approach: "Select high-value journeys, map their dependencies, and build repeatable coverage around those paths.",
    capabilities: ["Mobile testing", "Automation strategy", "Service validation"],
    technologies: ["Appium", "Java", "REST APIs"],
    outcomeFocus: "More structured coverage for priority mobile flows and the services they depend on.",
  },
  {
    id: "performance-engineering",
    category: "Performance",
    title: "Performance engineering for real usage",
    summary:
      "A representative performance-testing approach grounded in meaningful workloads and service expectations.",
    challenge: "Teams need to understand response and capacity behavior before demand or change exposes bottlenecks.",
    approach: "Model relevant traffic, establish an observable baseline, and investigate high-impact behavior.",
    capabilities: ["Workload design", "Load testing", "Results interpretation"],
    technologies: ["k6", "JMeter", "Gatling"],
    outcomeFocus: "A useful performance baseline and clearer evidence for prioritizing further investigation.",
  },
  {
    id: "cloud-integration-validation",
    category: "Cloud",
    title: "Validation across cloud integrations",
    summary:
      "A representative approach to checking connected cloud services and quality within delivery workflows.",
    challenge: "Distributed integrations and changing environments can obscure where delivery risks originate.",
    approach: "Map service boundaries, select meaningful checks, and surface feedback at useful points in delivery.",
    capabilities: ["Cloud integration testing", "CI/CD quality", "Environment strategy"],
    technologies: ["AWS", "Azure", "Docker", "GitHub Actions"],
    outcomeFocus: "A clearer validation strategy for connected services and the delivery path around them.",
  },
  {
    id: "llm-guardrail-testing",
    category: "AI",
    title: "Evaluation and guardrails for language models",
    summary:
      "A representative framework for testing expected behavior, boundary cases, and model-assisted workflows.",
    challenge: "A single successful example does not reveal how an AI feature responds across varied inputs.",
    approach: "Build scenario-based evaluation, examine edge behavior, and document where human review is appropriate.",
    capabilities: ["Scenario design", "LLM evaluation", "Quality guardrails"],
    technologies: ["OpenAI", "LangChain", "LangGraph"],
    outcomeFocus: "More explicit quality criteria and repeatable checks for selected AI workflows.",
  },
  {
    id: "playwright-framework-architecture",
    category: "Automation",
    title: "A maintainable Playwright framework",
    summary:
      "A representative framework architecture for readable tests, useful feedback, and sustainable change.",
    challenge: "Growing end-to-end suites can become slow to diagnose, difficult to extend, or costly to maintain.",
    approach: "Shape conventions around product risks, test boundaries, diagnostics, and delivery feedback.",
    capabilities: ["Framework design", "Browser automation", "CI integration"],
    technologies: ["Playwright", "TypeScript", "GitHub Actions"],
    outcomeFocus: "A clearer foundation for extending automated coverage without treating test count as the goal.",
  },
  {
    id: "ai-video-workflow",
    category: "Development",
    title: "Quality practices for an AI video workflow",
    summary:
      "A representative product direction combining intelligent media workflows with a quality-minded experience.",
    challenge: "Multi-step creative workflows can make usability, generated output, and service reliability intersect.",
    approach: "Map the user journey and system boundaries, then validate each stage with clear expectations.",
    capabilities: ["Product discovery", "AI workflow validation", "Web application quality"],
    technologies: ["OpenAI", "TypeScript", "React"],
    outcomeFocus: "A structured view of workflow states, quality risks, and experience-validation needs.",
  },
  {
    id: "ai-test-case-generation",
    category: "AI",
    title: "AI-assisted test design",
    summary:
      "A representative exploration of using AI to support, not replace, thoughtful test analysis.",
    challenge: "Teams want to explore AI support for test design while preserving review, traceability, and judgment.",
    approach: "Define constrained inputs and review points, then evaluate usefulness against human-authored scenarios.",
    capabilities: ["AI evaluation", "Test design", "Human review workflows"],
    technologies: ["OpenAI", "LangChain", "TypeScript"],
    outcomeFocus: "A grounded assessment of where AI assistance is useful and where human judgment remains essential.",
  },
  {
    id: "business-workflow-applications",
    category: "Development",
    title: "Applications for business workflows",
    summary:
      "A representative product-development approach for reducing friction in internal or customer-facing processes.",
    challenge: "Manual handoffs and fragmented tools can make important work harder to complete and understand.",
    approach: "Learn the real workflow, prototype the critical path, and validate the solution with its users.",
    capabilities: ["Workflow discovery", "Application development", "Quality engineering"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    outcomeFocus: "A clearer, validated product direction aligned with the people who will use it.",
  },
] as const;

export const operatingPrinciples = [
  {
    number: "01",
    title: "Quality",
    description:
      "Build confidence through thoughtful decisions, clear expectations, and validation that matters.",
    code: "TRUST",
    icon: "badge-check",
  },
  {
    number: "02",
    title: "Intelligence",
    description:
      "Apply technical insight with discernment—choosing tools and approaches for a reason.",
    code: "CLARITY",
    icon: "lightbulb",
  },
  {
    number: "03",
    title: "Integrity",
    description:
      "Be honest about what is known, what is uncertain, and what a solution can responsibly promise.",
    code: "HONESTY",
    icon: "scale",
  },
  {
    number: "04",
    title: "Service",
    description:
      "Put people and the purpose of the work ahead of clever technology for its own sake.",
    code: "CARE",
    icon: "hand-heart",
  },
  {
    number: "05",
    title: "Partnership",
    description:
      "Work alongside teams with open communication, shared understanding, and respect for their context.",
    code: "TOGETHER",
    icon: "handshake",
  },
] as const;

export const privacySections = [
  {
    title: "What this website does",
    paragraphs: [
      "This website provides information about Agape Tech and its services. The current application does not include analytics, advertising trackers, or account sign-up.",
      "The project finder runs in your browser. Its selections are not sent to Agape Tech or saved by this application.",
    ],
  },
  {
    title: "Contact form status",
    paragraphs: [
      "The contact form asks for your name, email address, organization, service, project stage, and project summary. Submitting sends these details to a Netlify Function; when email delivery is configured, the function sends them to the configured business inbox using Resend. Your email address is used as the reply-to address, not as the sender. An optional acknowledgement email is disabled by default.",
      "If delivery is not configured or sending fails, the page reports that the inquiry was not accepted and keeps your entries in the browser form. The application does not write submissions to its own database. Netlify and Resend may process inquiry content and technical request information to provide their services; their own handling and retention practices apply. No specific retention period has been supplied.",
      "When enabled, Cloudflare Turnstile verifies a challenge token before delivery. The token and request information required for verification are sent to Cloudflare. Do not submit sensitive personal, financial, health, or confidential information through this initial inquiry form.",
    ],
  },
  {
    title: "Technical hosting information",
    paragraphs: [
      "Netlify may process technical request information and function diagnostics as part of hosting the site and delivering contact requests. Function diagnostics are limited to a request identifier and non-personal failure details; inquiry contents and secrets are not written to application logs. The hosting provider may have separate platform logs. The specific information and retention depend on provider practices and configuration.",
    ],
  },
  {
    title: "Updates and questions",
    paragraphs: [
      "This page describes the intended application behavior and is not a substitute for reviewing the deployed hosting, Resend, and optional Turnstile configuration or for legal advice. It should be updated if those providers, settings, or data practices change.",
    ],
  },
] as const;
