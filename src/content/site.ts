// Single source of truth for every word on the site. Components render only from this file.
// Copy is final: change it here, verbatim, and only with the owner's approval (see AGENTS.md).

export interface LinkItem {
  label: string;
  href: string;
}

export interface NavItem extends LinkItem {
  external?: boolean;
}

export interface SiteMeta {
  url: string;
  name: string;
  title: string;
  description: string;
}

export interface Person {
  name: string;
  jobTitle: string;
  worksFor: string;
  alumniOf: string;
  url: string;
  sameAs: readonly string[];
}

export interface HeaderContent {
  wordmark: LinkItem;
  nav: readonly NavItem[];
}

export interface HeroContent {
  kicker: string;
  heading: string;
  status: string;
  location: string;
  links: readonly LinkItem[];
  headshotAlt: string;
}

export interface SectionMeta {
  id: string;
  label: string;
}

export interface ExperienceEntry {
  dates: string;
  role: string;
  org: string;
  team?: string;
  location?: string;
  context?: string;
  bullets: readonly string[];
  tags: readonly string[];
}

export interface EarlierEntry {
  dates: string;
  role: string;
  org: string;
  summary: string;
}

export interface ExperienceContent extends SectionMeta {
  entries: readonly ExperienceEntry[];
  earlier: {
    heading: string;
    entries: readonly EarlierEntry[];
  };
}

export type WorkBadge = "Built" | "Co-built";

export interface WorkItem {
  title: string;
  badge: WorkBadge;
  summary: string;
  highlights: readonly string[];
  tags: readonly string[];
}

export interface WorkContent extends SectionMeta {
  intro: string;
  items: readonly WorkItem[];
  more: LinkItem;
}

export interface SkillGroup {
  label: string;
  items: readonly string[];
}

export interface SkillsContent extends SectionMeta {
  groups: readonly SkillGroup[];
}

export interface AboutContent extends SectionMeta {
  paragraphs: readonly string[];
}

export interface School {
  name: string;
  degree: string;
  year: string;
  location: string;
}

export interface EducationContent extends SectionMeta {
  schools: readonly School[];
  honors: {
    label: string;
    items: readonly string[];
  };
}

export interface ContactContent extends SectionMeta {
  line: string;
  text: string;
  links: readonly LinkItem[];
  smallPrint: string;
  source: LinkItem;
  hint: string;
}

export interface NotFoundContent {
  heading: string;
  text: string;
  link: LinkItem;
}

export interface SparkContent {
  frames: readonly string[];
  labels: readonly string[];
  suffix: string;
}

export interface UiStrings {
  skipLink: string;
  newTab: string;
  externalArrow: string;
  internalArrow: string;
  separator: string;
  dash: string;
  emDash: string;
}

const urls = {
  site: "https://yiyang02.github.io",
  github: "https://github.com/YiYang02",
  linkedin: "https://www.linkedin.com/in/yiyang0/",
  resume: "/Yi_Yang_Resume.pdf",
  source: "https://github.com/YiYang02/yiyang02.github.io",
} as const;

const resumeLink: LinkItem = { label: "Résumé (PDF)", href: urls.resume };
const githubLink: LinkItem = { label: "GitHub", href: urls.github };
const linkedinLink: LinkItem = { label: "LinkedIn", href: urls.linkedin };

export const siteMeta: SiteMeta = {
  url: urls.site,
  name: "Yi Yang",
  title: "Yi Yang — Software Engineer",
  description:
    "Software engineer on Microsoft Teams core services (Kubernetes, .NET 10, release engineering). Founder of a stealth startup. Based in New York.",
};

export const person: Person = {
  name: "Yi Yang",
  jobTitle: "Software Engineer",
  worksFor: "Microsoft",
  alumniOf: "Bowdoin College",
  url: `${urls.site}/`,
  sameAs: [urls.github, urls.linkedin],
};

export const ui: UiStrings = {
  skipLink: "Skip to content",
  newTab: "(opens in a new tab)",
  externalArrow: "↗",
  internalArrow: "→",
  separator: "·",
  dash: "–",
  emDash: "—",
};

export const header: HeaderContent = {
  wordmark: { label: "Yi Yang", href: "#top" },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Résumé", href: urls.resume, external: true },
  ],
};

export const hero: HeroContent = {
  kicker: "Software Engineer · Microsoft Teams core services",
  heading: "I build reliable systems and the products on top of them.",
  status: "Open to new opportunities",
  location: "New York, NY",
  links: [resumeLink, githubLink, linkedinLink],
  headshotAlt: "Yi Yang",
};

export const experience: ExperienceContent = {
  id: "experience",
  label: "Experience",
  entries: [
    {
      dates: "2024 — Present",
      role: "Software Engineer",
      org: "Microsoft",
      team: "Teams core services",
      location: "New York, NY (Remote)",
      context:
        "Teams core services runs the API layer behind Microsoft Teams — hundreds of APIs that orchestrate dozens of backend systems — and a Tier-0 Azure platform that has hosted 36+ Teams services.",
      bullets: [
        "Led the final phase of the enterprise Teams API layer's move from Service Fabric to Kubernetes: cut over all US government-cloud and pre-production traffic in staged ramps, then deleted 13,000+ lines of dead deployment code.",
        "Led the API layer's .NET 8 to .NET 10 upgrade: runtime canaries on Windows x64, Linux x64, and Linux ARM64; dual-runtime CI test gates; and staged waves that now cover every public production region and the US government clouds.",
        "Replaced the platform's 39 classic release pipelines with 24 YAML pipelines generated from C#, then took ownership of the platform and retired infrastructure for 9+ services.",
        "Planned and rolled out a three-phase right-sizing of a hosted Teams service's VM scale sets after a CPU optimization, removing 6,888 cores at an ~80% peak-CPU target.",
        "Rotated 100+ auth certificates, moved the platform's certificates to a new Microsoft certificate authority in public and US government clouds, and rolled out CVE and FIPS security-baseline fixes to its VMs.",
        "Rolled out AI-assisted pull-request review to every author on the platform's repository, with custom rules for PowerShell compatibility and infrastructure teardown.",
      ],
      tags: ["C#", ".NET", "Kubernetes", "Azure Service Fabric", "Azure DevOps", "PowerShell", "Envoy", "Redis", "KQL"],
    },
    {
      dates: "2025 — Present",
      role: "Founder & Engineer",
      org: "Stealth Startup",
      bullets: [
        "Co-built a cross-platform Electron + React desktop app with encrypted settings, Electron safeStorage session persistence, auto-updates, and CI package checks across five OS/architecture targets.",
        "Co-built two Discord assistants in TypeScript and Python with shared PostgreSQL-feed support: support replies draw on a Notion knowledge base, and publishing drafts use strict JSON-schema output plus staff confirmation.",
        "Built a Node.js change-notification service with second-fetch confirmation, atomic state-file replacement, persisted pending alerts, and automated regression tests.",
        "Mapped the platform as a single C4 architecture model spanning 20 repositories, with a validation gate and architecture decision records.",
      ],
      tags: ["TypeScript", "Python", "Node.js", "React", "Next.js", "Electron", "PostgreSQL", "Docker"],
    },
    {
      dates: "May — Aug 2023",
      role: "SDE Intern",
      org: "Amazon Web Services",
      team: "EC2 Aardvark",
      location: "New York, NY",
      context:
        "Aardvark collects, batches, and aggregates 2+ PB of customer network-flow telemetry a day for VPC Flow Logs and AWS security teams.",
      bullets: [
        "Extended an end-to-end canary pipeline, spanning 10+ AWS services, that audits the generation of new telemetry parcel types every hour — helping keep millions of parcels a day healthy.",
        "Built on AWS Step Functions, Lambda, EC2, VPC, and S3, with infrastructure defined in the AWS CDK.",
      ],
      tags: ["Java", "Python", "TypeScript", "AWS CDK", "Step Functions", "Lambda"],
    },
    {
      dates: "Jun — Sep 2022",
      role: "SDE Intern",
      org: "Amazon Web Services",
      team: "EC2 Quartz",
      location: "Arlington, VA",
      context:
        "Quartz meters EC2 instances and Elastic IPs across AWS Regions and generates the records behind EC2 billing, held to 99.99% metering accuracy.",
      bullets: [
        "Reduced operational load by 7% for a core metering service that covers EC2 instances, Dedicated Hosts, and On-Demand Capacity Reservations in every Region.",
        "Contributed to accurate billing for millions of EC2 customers, with a projected $5M in savings.",
      ],
      tags: ["Java", "Ruby", "DynamoDB", "CloudFormation", "Google Guice"],
    },
  ],
  earlier: {
    heading: "Earlier",
    entries: [
      {
        dates: "2021 — 2024",
        role: "CS Teaching Assistant",
        org: "Bowdoin College",
        summary:
          "Taught data structures to 100+ students and CS topics to 50+ more through whiteboard sessions; labs reached 100% completion each semester.",
      },
      {
        dates: "2021",
        role: "Undergraduate ML Researcher",
        org: "University of North Texas",
        summary:
          "Built and tuned a contract-classification pipeline on the CUAD dataset (TF-IDF features; Naive Bayes, SVC, random forest, XGBoost).",
      },
      {
        dates: "2021 — 2022",
        role: "Web Director",
        org: "The Bowdoin Orient",
        summary:
          "Led the student newspaper's web team: weekly homepage updates, feature work, and code review (PHP, WordPress, MySQL).",
      },
    ],
  },
};

export const work: WorkContent = {
  id: "work",
  label: "Selected work",
  intro:
    "Private codebases from my startup, described by their engineering. I'm happy to walk through any of them.",
  items: [
    {
      title: "Cross-platform desktop app",
      badge: "Co-built",
      summary: "An Electron + React app for operational recordkeeping on Windows, macOS, and Linux.",
      highlights: [
        "Encrypted settings and Electron safeStorage session persistence",
        "Auto-updates from GitHub Releases",
        "CI package checks across five OS/architecture targets",
      ],
      tags: ["Electron", "React", "TypeScript", "SQLite", "Vite"],
    },
    {
      title: "Discord assistants",
      badge: "Co-built",
      summary:
        "A support assistant and a publishing assistant, in TypeScript and Python, with shared PostgreSQL-feed support.",
      highlights: [
        "Support replies draw on a configured Notion knowledge base",
        "Publishing drafts use strict JSON-schema LLM output and staff confirmation",
        "Revision checks reject stale feed updates",
      ],
      tags: ["TypeScript", "Python", "PostgreSQL", "OpenRouter", "Notion API", "Docker"],
    },
    {
      title: "Change-notification service",
      badge: "Built",
      summary: "A service that confirms each candidate change with a second fetch before sending a notification.",
      highlights: [
        "Second-fetch confirmation before any alert",
        "Atomic state-file replacement and persisted pending alerts",
        "Pluggable integrations and automated regression tests",
      ],
      tags: ["Node.js", "Railway"],
    },
    {
      title: "Architecture atlas",
      badge: "Built",
      summary:
        "One C4 model of a 20-repository platform, with generated views instead of hand-drawn diagrams.",
      highlights: [
        "LikeC4 model rendered to diagrams and Mermaid exports",
        "A validation gate and architecture decision records",
        "A read-only inventory check across local clones and worktrees",
      ],
      tags: ["LikeC4", "C4 model", "Node.js"],
    },
  ],
  more: { label: "More on GitHub", href: urls.github },
};

export const skills: SkillsContent = {
  id: "skills",
  label: "Skills",
  groups: [
    { label: "Languages", items: ["TypeScript", "C#", "Python", "JavaScript", "Java", "SQL", "PowerShell"] },
    {
      label: "Backend & data",
      items: [".NET (ASP.NET Core)", "Node.js", "PostgreSQL", "Redis", "SQLite", "Supabase", "DynamoDB"],
    },
    {
      label: "Cloud & infra",
      items: [
        "Kubernetes",
        "Azure (Service Fabric, Traffic Manager, Key Vault, VM Scale Sets)",
        "AWS (EC2, Lambda, Step Functions, S3, CDK, CloudFormation)",
        "Docker",
        "Envoy",
      ],
    },
    {
      label: "Delivery & ops",
      items: [
        "Azure DevOps YAML pipelines",
        "GitHub Actions",
        "infrastructure as code",
        "staged rollouts and canaries",
        "KQL",
        "OpenTelemetry",
      ],
    },
    { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Electron", "Vite"] },
    {
      label: "AI & quality",
      items: [
        "Claude Code",
        "GitHub Copilot CLI",
        "AI pull-request review",
        "LLM APIs (Anthropic, OpenRouter)",
        "structured outputs",
        "Playwright",
        "Vitest",
      ],
    },
  ],
};

export const about: AboutContent = {
  id: "about",
  label: "About",
  paragraphs: [
    "I'm a software engineer on Microsoft Teams core services, which runs the API layer behind Teams. Most of my work moves critical infrastructure forward in small, reversible steps — Service Fabric to Kubernetes, .NET 8 to .NET 10, classic release pipelines to generated ones. I'm drawn to systems where correctness is the product: pipelines that can't silently drop data, billing records that have to be right, and services that keep working when a dependency doesn't.",
    "Outside of work, I'm building a stealth startup from the ground up — product, architecture, and operations — including a cross-platform desktop app, two LLM-assisted Discord assistants, notification services, and the web platform that ties them together.",
    "I got my start in large-scale systems at Amazon Web Services, interning twice on EC2. On Aardvark, I extended an hourly canary pipeline for a system that aggregates 2+ PB of network-flow telemetry a day. On Quartz, I worked on the metering behind EC2 billing and reduced operational load by 7% for one core metering service.",
    "Before that, I studied Computer Science and Mathematics at Bowdoin College, where I was a CS teaching assistant, led the student newspaper's web team, and spent a summer doing machine-learning research at the University of North Texas.",
  ],
};

export const education: EducationContent = {
  id: "education",
  label: "Education",
  schools: [
    {
      name: "Bowdoin College",
      degree: "B.A., Computer Science and Mathematics",
      year: "2024",
      location: "Brunswick, ME",
    },
  ],
  honors: {
    label: "Honors",
    items: ["QuestBridge Scholar", "Tapia Scholar", "Lime Connect Fellow (2022)", "CodePath", "America on Tech"],
  },
};

export const contact: ContactContent = {
  id: "contact",
  label: "Contact",
  line: "Open to new opportunities.",
  text: "The fastest way to reach me is LinkedIn.",
  links: [linkedinLink, resumeLink, githubLink],
  smallPrint: "© 2026 Yi Yang · Built with Next.js, TypeScript, and Tailwind CSS · ",
  source: { label: "Source", href: urls.source },
  hint: "psst — click anywhere ✻",
};

export const notFound: NotFoundContent = {
  heading: "Page not found.",
  text: "That link may be outdated.",
  link: { label: "Go to the homepage", href: "/" },
};

export const spark: SparkContent = {
  frames: ["·", "✢", "✳", "✶", "✻", "✽"],
  labels: [
    "Compiling",
    "Refactoring",
    "Shipping",
    "Pondering",
    "Reticulating",
    "Deploying",
    "Linting",
    "Caching",
    "Hydrating",
    "Bikeshedding",
    "Rubber-ducking",
    "Grokking",
    "Memoizing",
    "Yak-shaving",
  ],
  suffix: "…",
};
