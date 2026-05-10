export const profile = {
  name: "Riza Qin",
  role: "Software Developer | AI Engineer | Data Scientist",
  location: "Waterloo/Toronto, ON",
  status: "Seeking Fall 2026 Co-op Internships",
  email: "r32qin@uwaterloo.ca",
  github: "github.com/rqin0113",
  linkedin: "linkedin.com/in/riza-qin",
};

export type NavLink = { label: string; href: string; index: string };

export const navLinks: NavLink[] = [
  { label: "Index", href: "#hero", index: "00" },
  { label: "About", href: "#about", index: "01" },
  { label: "Experience", href: "#experience", index: "02" },
  { label: "Work", href: "#work", index: "03" },
  { label: "Stack", href: "#stack", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Waterloo Data Science Club",
    role: "Software Developer",
    period: "Apr 2026 — Present",
    location: "Waterloo, ON",
    summary:
      "Building scalable frontend features and dynamic UI components for one of the largest academic clubs on campus.",
    bullets: [
      "Develop and maintain web features supporting 300+ members and large-scale student events.",
      "Build interactive interfaces (event pages, registration flows) using React, TypeScript, and Next.js, with a focus on responsive design and state management.",
      "Contribute to the optimization of the annual CxC hackathon site — improving usability for 750+ applicants.",
    ],
    stack: ["React", "TypeScript", "Next.js", "HTML/CSS"],
  },
  {
    company: "University of Waterloo",
    role: "Mathematics Researcher",
    period: "Dec 2025 — Mar 2026",
    location: "Waterloo, ON",
    summary:
      "Researched Helly's Theorem under Dr. Mathieu Rundström — intersection properties in high-dimensional geometry with applications to optimization.",
    bullets: [
      "Studied intersection structure in high-dimensional convex sets, connecting classical results to modern optimization problems.",
      "Delivered a formal research presentation to faculty and graduate students in the Department of Combinatorics & Optimization, fielding technical questions on the proof.",
    ],
    stack: ["Combinatorics", "Convex Geometry", "Optimization"],
  },
  {
    company: "Waterloo Data Science Club",
    role: "Social Media Coordinator",
    period: "Dec 2025 — Apr 2026",
    location: "Waterloo, ON",
    summary:
      "Led marketing strategy for 10+ AI/ML events and the annual CxC hackathon — Canada's largest student-run AI hackathon.",
    bullets: [
      "Grew the community to 5,500+ followers, 300+ active members, and 750+ hackathon applications.",
      "Designed and shipped event campaigns end-to-end, from creative direction to scheduled rollout.",
    ],
    stack: ["Marketing", "Branding", "Community"],
  },
  {
    company: "Shad Canada",
    role: "Software Engineer",
    period: "July 2024",
    location: "Canada",
    summary:
      "Built a full-stack carbon footprint calculator with personalized green-energy recommendations.",
    bullets: [
      "Shipped an HTML/CSS frontend with a Python backend powered by decision-tree regression models to surface tailored sustainability suggestions.",
      "Awarded the Exceptional Demonstration Award (top team among 10+) for technical innovation.",
    ],
    stack: ["Python", "Scikit-learn", "HTML", "CSS"],
  },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  status: "shipped" | "research" | "in-progress";
  year: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  links?: { label: string; href: string }[];
  accent: "cyan" | "violet" | "lime" | "amber" | "rose";
};

export const projects: Project[] = [
  {
    id: "socialscript",
    index: "P-01",
    name: "SocialScript",
    status: "shipped",
    year: "2026",
    tagline: "LLM-powered conversational simulation for autistic youth.",
    problem:
      "Autistic youth often have few low-stakes spaces to rehearse the messy, unscripted social interactions of work and school. Static role-play scripts can't adapt — and a wrong response in real life is hard to take back.",
    approach:
      "Built a Gemini 2.5–driven dialogue engine that generates adaptive workplace scenarios, paired with a FastAPI orchestration layer that runs prompt-engineered agents and ElevenLabs TTS for voice. An AI feedback loop replays each interaction with structured behavioral notes; a journaling layer captures reflection signals that personalize the next scenario.",
    outcome:
      "Submitted to Hack The Globe with an end-to-end product: live conversational simulation, voice playback, structured feedback, and a sensory-aware UI tuned for low-anxiety learning.",
    metrics: [
      { label: "model", value: "Gemini 2.5" },
      { label: "voice", value: "ElevenLabs" },
      { label: "loop", value: "adaptive" },
    ],
    stack: ["React", "TypeScript", "FastAPI", "Gemini API", "ElevenLabs"],
    links: [
      { label: "GitHub", href: "https://github.com/ryanwng/Hack_The_Globe" },
    ],
    accent: "cyan",
  },
  {
    id: "curling",
    index: "P-02",
    name: "Curling Shot Advisor",
    status: "shipped",
    year: "2026",
    tagline: "AI decision support for real-time curling strategy.",
    problem:
      "Curling strategy is famously hard to teach — every shot depends on stone positions, score, end count, and opponent tendencies. Beginners want a coach in the moment; coaches want a tool that mirrors their reasoning, not a black box.",
    approach:
      "Built a two-layer engine combining rule-based strategy matching with heuristic decision logic to simulate expert shot selection. Stone layouts are captured on an HTML5 Canvas frontend and analyzed by a FastAPI service that runs spatial reasoning over the position graph in real time.",
    outcome:
      "Generates contextual shot recommendations from live game state — usable as a teaching aid or a sparring partner during practice.",
    metrics: [
      { label: "engine", value: "2-layer" },
      { label: "render", value: "Canvas" },
      { label: "service", value: "FastAPI" },
    ],
    stack: ["Python", "FastAPI", "JavaScript", "HTML5 Canvas"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rqin0113/Curling-Shot-Advisor",
      },
    ],
    accent: "violet",
  },
];

export type Skill = {
  group: string;
  items: { name: string; level: number; note?: string }[];
};

export const skills: Skill[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", level: 0.95 },
      { name: "Java", level: 0.8 },
      { name: "JavaScript / TypeScript", level: 0.9 },
      { name: "C / C++", level: 0.7 },
      { name: "HTML", level: 0.95 },
      { name: "CSS", level: 0.9 },
      { name: "JSON", level: 0.95 },
      { name: "SQL", level: 0.75 },
      { name: "R", level: 0.6 },
      { name: "Racket", level: 0.55 },
    ],
  },
  {
    group: "Frameworks & Tools",
    items: [
      { name: "React", level: 0.9 },
      { name: "Next.js", level: 0.85 },
      { name: "FastAPI", level: 0.9 },
      { name: "REST APIs", level: 0.85 },
      { name: "Node.js", level: 0.7 },
      { name: "Flask", level: 0.7 },
      { name: "Git", level: 0.9 },
      { name: "GitHub", level: 0.9 },
      { name: "Linux", level: 0.75 },
      { name: "Jupyter", level: 0.85 },
      { name: "VS Code", level: 0.95 },
    ],
  },
  {
    group: "AI / GenAI & ML",
    items: [
      { name: "LLM APIs", level: 0.9 },
      { name: "Prompt engineering", level: 0.9 },
      { name: "Scikit-learn", level: 0.85 },
      { name: "TensorFlow", level: 0.7 },
      { name: "PyTorch", level: 0.75 },
      { name: "Pandas", level: 0.9 },
      { name: "NumPy", level: 0.9 },
      { name: "Matplotlib", level: 0.8 },
    ],
  },
];

export const terminalLines: { user?: string; system?: string }[] = [
  { user: "whoami" },
  { system: "riza qin · b.math @ uw · builder" },
  { user: "cat ./about.md | head -1" },
  { system: "full-stack · applied AI · data — shipping real things" },
  { user: "uptime" },
  { system: "online · seeking fall 2026 co-op" },
];

// Node graph topology — used in hero
export const graphNodes: { id: string; label: string; x: number; y: number; tone: "cyan" | "violet" | "lime" | "amber" | "rose" | "bone" }[] = [
  { id: "core", label: "you", x: 50, y: 50, tone: "cyan" },
  { id: "ai", label: "AI", x: 18, y: 22, tone: "violet" },
  { id: "fs", label: "fullstack", x: 84, y: 26, tone: "cyan" },
  { id: "rt", label: "realtime", x: 88, y: 70, tone: "lime" },
  { id: "data", label: "data", x: 14, y: 74, tone: "amber" },
  { id: "math", label: "math", x: 50, y: 8, tone: "rose" },
  { id: "ux", label: "ux", x: 50, y: 92, tone: "bone" },
];

export const graphEdges: [string, string][] = [
  ["core", "ai"],
  ["core", "fs"],
  ["core", "rt"],
  ["core", "data"],
  ["core", "math"],
  ["core", "ux"],
  ["ai", "math"],
  ["fs", "rt"],
  ["data", "ux"],
  ["ai", "data"],
];

export const stats = [
  { label: "GPA", value: "89.2%" },
  { label: "Python coursework", value: "91%" },
  { label: "community reached", value: "5.5k+" },
  { label: "CxC applicants", value: "750+" },
];

// ---- personality layer ----

export const education = {
  school: "University of Waterloo",
  degree: "Bachelor of Mathematics",
  period: "Sep 2025 — Apr 2030",
  gpa: "89.2%",
  coursework: [
    "Data Structures & Algorithms",
    "Introduction to Python (91%)",
    "Probability & Statistics",
  ],
};

export const now = [
  "shipping SocialScript at Hack The Globe",
  "refining the Curling Shot Advisor",
  "reading about Helly's Theorem and high-dimensional intersections",
  "applying for fall 2026 SWE / AI co-ops",
];

export const hobbies = [
  "curling — strategy more than sweeping",
  "long walks with a notebook",
  "specialty coffee · v60 + medium grind",
  "reading: math papers, design essays, sci-fi",
  "tinkering with side projects on weekends",
];

export const values = [
  { k: "ship", v: "A real artifact in users' hands beats a polished plan." },
  { k: "read the source", v: "Implementation teaches the failure modes faster than docs." },
  { k: "latency is a feature", v: "The interface is the product; everything else is plumbing." },
  { k: "clarity > cleverness", v: "If a teammate can't read it tomorrow, it's not done." },
];

export const human = [
  "math student who codes more than the average math student.",
  "happiest at the seam between a model and a UI.",
  "learns by building things end-to-end and breaking them on purpose.",
  "type to talk → 'contact'. say hi.",
];

export const aboutDeep =
  "I grew up curious about systems — how cities route water, how a curling stone rotates, how a model decides what to say next. Math at Waterloo gave me a vocabulary for some of that; building things online gave me a place to keep asking. I'm most interested in the engineering work that sits one layer beneath a model — orchestration, evaluation, the data plumbing that makes the magic reproducible. I want to spend the next few years working with people who care about getting that layer right.";

export const easterCommands = [
  "sudo hire-me",
  "system-status",
  "neural-network",
  "coffee",
  "about:deep",
];
