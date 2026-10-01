// ---- identity ----

export const profile = {
  name: "Riza Qin",
  role: "Computer Science + Finance student",
  location: "Waterloo/Toronto, ON",
  status: "Software · machine learning · finance",
  email: "r32qin@uwaterloo.ca",
  github: "github.com/rqin0113",
  linkedin: "linkedin.com/in/riza-qin",
  tagline:
    "Computer Science + Finance student at the University of Waterloo, interested in software, machine learning, and finance.",
};

// ---- academics ----

export const education = {
  school: "University of Waterloo",
  degree: "Computer Science + Finance",
  period: "Sep 2025 — Apr 2030",
  gpa: "89.2%",
  coursework: [
    "Data Structures & Algorithms",
    "Introduction to Python (91%)",
    "Probability & Statistics",
  ],
};

// ---- work ----

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary?: string;
  bullets?: string[];
};

export const experience: Experience[] = [
  {
    company: "OpenText",
    role: "Software Test Engineer",
    period: "Sep 2026 — Present",
    location: "Waterloo, ON",
    bullets: [
      "Run workload-based performance tests for Content Server to identify bottlenecks.",
      "Validate decoupled frontend and backend components, and use SQL for test validation and performance analysis.",
    ],
  },
  {
    company: "Wat.AI",
    role: "ML / Software Engineer",
    period: "May 2026 — Present",
    bullets: [
      "Built Weatherloo to compare HRRR, ECMWF, and other forecasts with observations from Waterloo and Toronto Pearson Airport.",
      "Integrated CNN-LSTM and LSTM bias correction, and built a React interface for forecast accuracy and corrected temperature and wind predictions.",
    ],
  },
  {
    company: "Waterloo Data Science Club",
    role: "Software Developer",
    period: "Apr 2026 — Present",
    bullets: [
      "Build responsive React, TypeScript, and Next.js features—including event pages and registration—for a 300+ member club.",
      "Contribute to the CxC hackathon website, serving 750+ applicants.",
    ],
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

// ---- personal ----

export const now = [
  "working across software testing, development, and machine learning",
  "refining the Curling Shot Advisor",
  "building projects that connect software and real-world problems",
];

export const hobbies = [
  "🥌 curling: 3+ years, TDSSAA Regional Champion (x2), UW Curling Club exec + player. strategy-heavy sport that also inspired one of my projects",

  "🍜 food + city exploration: hunting hidden gems, trying new spots, and revisiting comfort places. current obsession: Ngogo (downtown Toronto)",

  "🧠 psychology: personality tests...guess my MBTI type 👀 (click to reveal)",

  "✈️ travel: 20+ cities across Asia, North America, and Europe. I like seeing how different places think and live",
];

export type Track = { title: string; artist: string; url: string };

export const music: Track[] = [
  {
    title: "nowhere, nobody",
    artist: "Ariana Grande",
    url: "https://open.spotify.com/search/nowhere%2C%20nobody%20Ariana%20Grande",
  },
  {
    title: "Drop Dead",
    artist: "Olivia Rodrigo",
    url: "https://open.spotify.com/track/6gkbtMtioHgtyGjrMel6ei",
  },
  {
    title: "Dream",
    artist: "LISA",
    url: "https://open.spotify.com/search/Dream%20LISA",
  },
];

export const quotes: { text: string; by?: string }[] = [
  { text: "for whatever we lose (like a you or a me) it's always ourselves we find in the sea", by: "E.E. Cummings" },
  { text: "a ship is safe in harbor, but that's not what ships are for", by: "John A. Shedd " },
  { text: "miles to go before I sleep 🌙", by: "Robert Frost" },
];
