export type TextChunk = {
  text: string;
  strong?: boolean;
};

export type NavLink = {
  id: string;
  label: string;
};

export type SkillRow = {
  category: string;
  tags: string[];
  className: string;
};

export type ExperienceBullet = {
  chunks: TextChunk[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  badge?: string;
  badgeClass?: string;
  bullets: ExperienceBullet[];
};

export type ProjectItem = {
  icon: string;
  name: string;
  desc: string;
  win?: string;
  stack: string[];
  link?: string;
};

export type AchievementItem = {
  icon: string;
  title: string;
  sub: string;
  n: string;
};

export type ServiceItem = {
  n: string;
  title: string;
  desc: string;
};

export type HeroStat = {
  value: string;
  suffix: string;
  label: string;
};

export type ContactLink = {
  icon: string;
  label: string;
  sublabel: string;
  href: string;
  external?: boolean;
};

export const navLinks: NavLink[] = [
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const typedMessages = [
  "building scalable backends...",
  "shipping AI pipelines...",
  "indexing with Elasticsearch...",
  "automating workflows with agentic AI",
  "ready for your project.",
];

export const marqueeItems = [
  "Python",
  "FastAPI",
  "Elasticsearch",
  "React",
  "LangChain",
  "Redis Streams",
  "Temporal",
  "Playwright",
  "Docker",
  "MongoDB",
  "TypeScript",
  "Spring Boot",
  "Node.js",
  "RAG Pipelines",
  "Kubernetes",
  "GraphQL",
];

export const skillRows: SkillRow[] = [
  {
    category: "Languages",
    tags: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
    className: "skill-row-5",
  },
  {
    category: "Backend",
    tags: [
      "FastAPI",
      "Django-DRF",
      "Spring Boot",
      "Node.js",
      "Express",
      "WebSockets",
    ],
    className: "skill-row-6",
  },
  {
    category: "Frontend",
    tags: ["React", "Next.js", "Angular", "Tailwind CSS"],
    className: "skill-row-4",
  },
  {
    category: "AI / ML",
    tags: ["LangChain", "RAG", "Ollama", "OCR", "Tesseract"],
    className: "skill-row-5",
  },
  {
    category: "Databases",
    tags: ["MongoDB", "PostgreSQL", "MySQL", "Oracle SQL", "Redis"],
    className: "skill-row-5",
  },
  {
    category: "Infra",
    tags: [
      "Docker",
      "Kubernetes",
      "Elasticsearch",
      "Redis Streams",
      "Temporal",
    ],
    className: "skill-row-5",
  },
  {
    category: "Tools",
    tags: ["Git", "Playwright", "GraphQL", "Prisma", "Blockchain"],
    className: "skill-row-5",
  },
  {
    category: "CS Cores",
    tags: ["System Design", "DSA 800+", "OOPS", "DBMS", "Networking"],
    className: "skill-row-5",
  },
];

export const heroStats: HeroStat[] = [
  { value: "3", suffix: "+", label: "Industry internships" },
  { value: "5", suffix: "×", label: "Faster scraper onboarding" },
  { value: ">80", suffix: "%", label: "Manual effort cut at SLB" },
  { value: "800", suffix: "+", label: "DSA problems solved" },
];

export const services: ServiceItem[] = [
  {
    n: "01",
    title: "AI Agents & Automation",
    desc: "Custom AI agents that automate research, data processing, content workflows, and business operations. Built with modern LLMs, tool integrations, and scalable orchestration frameworks.",
  },
  {
    n: "02",
    title: "AI / RAG Systems",
    desc: "Production-ready Retrieval-Augmented Generation systems with semantic search, vector databases, document processing, OCR, and LLM integration for accurate knowledge retrieval.",
  },
  {
    n: "03",
    title: "Search Infrastructure",
    desc: "High-performance search solutions using Elasticsearch and vector search. Design, indexing, ranking, and optimization for documents, websites, and enterprise-scale datasets.",
  },
  {
    n: "04",
    title: "Distributed Systems & Backend Engineering",
    desc: "Scalable backend architectures, microservices, APIs, workflow orchestration, message queues, caching, and cloud-native systems built for reliability and performance.",
  },
  {
    n: "05",
    title: "Full-Stack Product Development",
    desc: "End-to-end web applications using React, Next.js, Node.js, Django, PostgreSQL, and MongoDB. From MVP development to production deployment with clean, maintainable code.",
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "SLB",
    period: "Aug 2025 – Present",
    badge: "Current",
    bullets: [
      {
        chunks: [
          { text: "Building Data Workspace Infrastructure", strong: true },
          {
            text: " to support scalable data workflows and reliable project collaboration.",
          },
        ],
      },
      {
        chunks: [
          { text: "Developing full-stack features", strong: true },
          {
            text: " across the frontend, backend, and data layers for SLB project teams.",
          },
        ],
      },
      {
        chunks: [
          { text: "Contributing to data workspace architecture", strong: true },
          {
            text: " with maintainable services, integrations, and user-focused tooling.",
          },
        ],
      },
      {
        chunks: [
          {
            text: "Collaborating across engineering and product teams",
            strong: true,
          },
          {
            text: " to deliver production-ready improvements to the platform.",
          },
        ],
      },
    ],
  },
  {
    role: "Software Engineer",
    company: "Recepto.ai",
    period: "2024 – Jul 2025",
    bullets: [
      {
        chunks: [
          { text: "Built a universal web scraper", strong: true },
          {
            text: " using Python, Playwright, FastAPI, and Redis Streams for reliable data collection and delivery.",
          },
        ],
      },
      {
        chunks: [
          { text: "Designed config-driven scraping workflows", strong: true },
          {
            text: " that reduced custom scraper development and accelerated onboarding for new sources.",
          },
        ],
      },
      {
        chunks: [
          { text: "Improved fault tolerance and operational reliability", strong: true },
          {
            text: " with rate-limit handling, retries, and scalable backend integrations.",
          },
        ],
      },
    ],
  },
  {
    role: "Software Engineer",
    company: "Schlumberger (SLB) Digital",
    period: "May – Jul 2025",
    badge: "PPO Received",
    badgeClass: "ppo",
    bullets: [
      {
        chunks: [
          { text: "Elasticsearch search layer", strong: true },
          {
            text: " across PDFs, HTML pages, and videos — reduced retrieval latency from ",
          },
          { text: "minutes to seconds", strong: true },
          { text: "." },
        ],
      },
      {
        chunks: [
          { text: "Full-stack content management", strong: true },
          {
            text: " (Angular + Spring Boot + Oracle SQL) reducing manual effort by ",
          },
          { text: ">80%", strong: true },
          { text: "." },
        ],
      },
      {
        chunks: [
          {
            text: "Pre-Placement Offer received based on performance — joining full-time.",
            strong: true,
          },
        ],
      },
    ],
  },
  {
    role: "Blockchain Developer",
    company: "Calimero Network",
    period: "Feb – Apr 2025",
    badge: "Contract",
    bullets: [
      {
        chunks: [
          {
            text: "Improved CLI usability for node and context management tooling.",
          },
        ],
      },
      {
        chunks: [
          { text: "Proposed and implemented", strong: true },
          {
            text: " macro-based transport abstraction to simplify multi-protocol blockchain transport declaration.",
          },
        ],
      },
    ],
  },
  {
    role: "Backend Developer",
    company: "Kinetic Codes",
    period: "Apr – May 2025",
    badge: "Contract",
    bullets: [
      {
        chunks: [
          { text: "Migrated REST APIs to", strong: true },
          {
            text: " WebSocket-based real-time communication in Node.js — eliminated polling, instant server-to-client push.",
          },
        ],
      },
    ],
  },
  {
    role: "Chief Maintainer",
    company: "IMG, IIT Roorkee",
    period: "Mar 2023 – Present",
    badge: "Leadership",
    bullets: [
      {
        chunks: [
          { text: "Leading Chakra CMS", strong: true },
          { text: " powering " },
          { text: "13,000+ web pages", strong: true },
          { text: " for IIT Roorkee on React + Django-DRF + MySQL." },
        ],
      },
      {
        chunks: [
          {
            text: "Implemented caching strategies, built reusable components, resolved critical production issues.",
          },
        ],
      },
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    icon: "🔍",
    name: "MedLens AI",
    desc: "Healthcare document QA system. Extracts insights from complex medical PDFs via OCR + semantic chunking + RAG. Custom LangChain pipeline with Ollama LLM for accurate multi-document answers.",
    win: "🏆 1st Runner-Up · HiLabs AI Quest 2025",
    stack: ["OCR", "LangChain", "RAG", "Ollama", "Tesseract", "Python"],
    link: "https://bit.ly/Medlens_AI",
  },
  {
    icon: "⚙️",
    name: "Universal Web Scraper",
    desc: "Config-driven scraping framework built at Recepto.ai. Zero custom-scraper code — any forum or listing site scraped from a JSON config. Rate-limit safe, fault-tolerant, Redis-backed delivery.",
    stack: ["Python", "Playwright", "FastAPI", "Redis Streams", "MongoDB"],
  },
  {
    icon: "🌐",
    name: "Chakra CMS",
    desc: "Large-scale content management system serving 13,000+ pages for IIT Roorkee. Built reusable component library, caching layer, resolved critical production incidents on distributed stack.",
    stack: ["React", "Django-DRF", "MySQL", "Python"],
    link: "https://bit.ly/Chakra",
  },
  {
    icon: "📊",
    name: "Smart Lab Report",
    desc: "Full-stack lab report analyzer with AI-driven health advice, interactive visualizations, and offline PDF access. Built and deployed solo end-to-end.",
    win: "🏆 1st Place · IMG IITR Hackathon 2024",
    stack: ["React", "Node.js", "Express", "MongoDB Atlas"],
    link: "https://bit.ly/Wellness-Analytics",
  },
];

export const achievements: AchievementItem[] = [
  { icon: "🎓", title: "IIT Roorkee", sub: "ECE · GPA 7.944 · 2026", n: "01" },
  {
    icon: "📈",
    title: "JEE Advanced AIR 4757",
    sub: "Top 3.2% of 150,000+",
    n: "02",
  },
  { icon: "🏅", title: "JEE Main 99.18%ile", sub: "Top 0.82% of 1M+", n: "03" },
  {
    icon: "🌍",
    title: "CF Global Rank 771",
    sub: "Round 1011 Div.2 · 25K+ contestants",
    n: "04",
  },
  {
    icon: "🥇",
    title: "Hackathon Winner",
    sub: "BREAK-A-SPHERE · IMG IIT Roorkee",
    n: "05",
  },
  {
    icon: "🥈",
    title: "1st Runner-Up",
    sub: "AI Quest · HiLabs 2025",
    n: "06",
  },
  {
    icon: "⚡",
    title: "CF Specialist 1544",
    sub: "Handle: pommpomms",
    n: "07",
  },
  {
    icon: "💻",
    title: "800+ Problems",
    sub: "LeetCode + InterviewBit",
    n: "08",
  },
];

export const contactLinks: ContactLink[] = [
  {
    icon: "✉",
    label: "goeldhruv9876@gmail.com",
    sublabel: "Email · fastest response",
    href: "mailto:goeldhruv9876@gmail.com",
  },
  {
    icon: "in",
    label: "linkedin.com/in/dhruv-goel-430384252",
    sublabel: "LinkedIn",
    href: "https://linkedin.com/in/dhruv-goel-430384252",
    external: true,
  },
  {
    icon: "⌥",
    label: "github.com/iamgoeldhruv",
    sublabel: "GitHub · see the code",
    href: "https://github.com/iamgoeldhruv",
    external: true,
  },
  {
    icon: "📞",
    label: "+91 63075 13024",
    sublabel: "WhatsApp / Call",
    href: "tel:+916307513024",
  },
];
