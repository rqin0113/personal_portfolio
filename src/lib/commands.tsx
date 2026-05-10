"use client";

import { ReactNode } from "react";
import {
  profile,
  experience,
  projects,
  skills,
  education,
  now as nowItems,
  hobbies,
  values,
  human,
  aboutDeep,
  type Project,
} from "./data";
import {
  Out,
  Para,
  Section,
  Field,
  Bullet,
  Echo,
  Err,
  Ok,
} from "@/components/terminal/Block";

// ---- types ----

export type CommandResult =
  | { kind: "node"; node: ReactNode }
  | { kind: "clear" }
  | { kind: "open"; url: string; node?: ReactNode };

export type Ctx = {
  run: (input: string) => void;
};

export type CommandGroup = "core" | "about" | "work" | "personal" | "fun" | "system";

export type Command = {
  name: string;
  aliases?: string[];
  hint: string;
  group: CommandGroup;
  hidden?: boolean;
  run: (args: string[], ctx: Ctx) => CommandResult;
};

// ---- helpers ----

const ext = (u: string) =>
  u.startsWith("http") ? u : `https://${u.replace(/^\/+/, "")}`;

const node = (n: ReactNode): CommandResult => ({ kind: "node", node: n });

function CmdLink({
  cmd,
  ctx,
  children,
}: {
  cmd: string;
  ctx: Ctx;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => ctx.run(cmd)}
      className="text-accent-cyan underline-offset-2 hover:underline"
    >
      {children ?? cmd}
    </button>
  );
}

// ---- output components (shell-style) ----

function Help({ ctx }: { ctx: Ctx }) {
  const groups: { key: CommandGroup; label: string }[] = [
    { key: "core", label: "core" },
    { key: "about", label: "about" },
    { key: "work", label: "work" },
    { key: "personal", label: "personal" },
    { key: "system", label: "system" },
  ];

  const sections = groups
    .map((g) => ({
      ...g,
      items: registry.filter((c) => c.group === g.key && !c.hidden),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <Out>
      {sections.map((g) => (
        <div key={g.key} className="mt-3 first:mt-0">
          <div className="text-bone-400">{g.label}:</div>
          {g.items.map((c) => (
            <div key={c.name} className="whitespace-pre">
              {"  "}
              <button
                onClick={() => ctx.run(c.name)}
                className="text-bone-200 hover:text-accent-cyan"
              >
                {c.name}
              </button>
            </div>
          ))}
        </div>
      ))}
      <div className="mt-3">
        <div className="text-bone-400">shortcuts:</div>
        <div className="whitespace-pre text-bone-300">{"  tab autocomplete"}</div>
        <div className="whitespace-pre text-bone-300">{"  ↑ / ↓ history"}</div>
        <div className="whitespace-pre text-bone-300">{"  ctrl+l clear"}</div>
        <div className="whitespace-pre text-bone-300">{"  ctrl+c cancel"}</div>
      </div>
      <div className="mt-3 text-bone-400">type a command to begin</div>
      <div className="text-bone-400">some commands are hidden</div>
    </Out>
  );
}

function Whoami() {
  return (
    <Out>
      <div className="text-bone-100">
        {profile.name.toLowerCase().replace(/\s+/g, "_")}
      </div>
      <Echo>
        {profile.role.toLowerCase()} · {profile.location.toLowerCase()}
      </Echo>
    </Out>
  );
}

function About({ ctx }: { ctx: Ctx }) {
  return (
    <Out>
      <Para>{profile.longBio}</Para>
      <Para className="text-bone-400">{profile.tagline}</Para>
      <div className="pt-1 text-bone-400">
        related: <CmdLink cmd="experience" ctx={ctx} /> ·{" "}
        <CmdLink cmd="projects" ctx={ctx} /> ·{" "}
        <CmdLink cmd="skills" ctx={ctx} /> ·{" "}
        <CmdLink cmd="contact" ctx={ctx} />
      </div>
    </Out>
  );
}

function Education() {
  return (
    <Out>
      <Field k="school" v={education.school} />
      <Field k="degree" v={education.degree} />
      <Field k="period" v={education.period} />
      <Field k="gpa" v={education.gpa} />
      <Field k="coursework" v={education.coursework.join(", ")} />
    </Out>
  );
}

function Experience() {
  return (
    <Out className="space-y-4">
      {experience.map((e, i) => (
        <div key={i}>
          <div className="whitespace-pre">
            <span className="text-bone-100">{e.role}</span>
            <span className="text-bone-500"> @ </span>
            <span className="text-bone-200">{e.company}</span>
          </div>
          <Echo>
            {e.period} · {e.location}
          </Echo>
          <div className="mt-1 space-y-0.5">
            {e.bullets.map((b, j) => (
              <Bullet key={j}>{b}</Bullet>
            ))}
          </div>
          <Echo>stack: {e.stack.join(", ")}</Echo>
        </div>
      ))}
    </Out>
  );
}

function statusColor(s: Project["status"]) {
  return s === "shipped"
    ? "text-accent-lime"
    : s === "in-progress"
    ? "text-accent-cyan"
    : "text-accent-amber";
}

function ProjectsList({ ctx }: { ctx: Ctx }) {
  return (
    <Out>
      <Echo>indexed: {projects.length} projects</Echo>
      <div className="space-y-2 pt-1">
        {projects.map((p) => (
          <div key={p.id}>
            <div className="whitespace-pre">
              <span className="text-bone-400">{p.index} </span>
              <button
                onClick={() => ctx.run(`projects ${p.id}`)}
                className="text-bone-50 hover:text-accent-cyan"
              >
                {p.name}
              </button>
              {"  "}
              <span className={statusColor(p.status)}>{p.status}</span>
              {"  "}
              <span className="text-bone-500">{p.year}</span>
            </div>
            <div className="pl-7 text-bone-300">{p.tagline}</div>
            <div className="pl-7 text-bone-500">stack: {p.stack.join(", ")}</div>
          </div>
        ))}
      </div>
      <Echo>
        run <span className="text-bone-200">projects &lt;id&gt;</span> for the
        case study.
      </Echo>
    </Out>
  );
}

function ProjectDetail({ p, ctx }: { p: Project; ctx: Ctx }) {
  return (
    <Out className="space-y-3">
      <div>
        <Field k="project" v={p.name} />
        <Field k="index" v={p.index} />
        <Field
          k="status"
          v={<span className={statusColor(p.status)}>{p.status}</span>}
        />
        <Field k="year" v={p.year} />
        <Field k="stack" v={p.stack.join(", ")} />
      </div>

      <div>
        <Section label="problem" />
        <Para>{p.problem}</Para>
      </div>
      <div>
        <Section label="approach" />
        <Para>{p.approach}</Para>
      </div>
      <div>
        <Section label="outcome" />
        <Para>{p.outcome}</Para>
      </div>

      <div>
        <Section label="metrics" />
        {p.metrics.map((m) => (
          <Field key={m.label} k={m.label} v={m.value} />
        ))}
      </div>

      {p.links && p.links.length > 0 && (
        <div>
          <Section label="links" />
          {p.links.map((l) => (
            <Field
              key={l.label}
              k={l.label.toLowerCase()}
              v={
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cyan underline-offset-2 hover:underline"
                >
                  {l.href}
                </a>
              }
            />
          ))}
        </div>
      )}

      <Echo>
        ← <CmdLink cmd="projects" ctx={ctx}>back to list</CmdLink>
      </Echo>
    </Out>
  );
}

function Skills() {
  return (
    <Out className="space-y-3">
      {skills.map((g) => (
        <div key={g.group}>
          <div className="text-bone-400">{g.group.toLowerCase()}</div>
          <Para className="pl-4">
            {g.items.map((s) => s.name).join(", ")}
          </Para>
        </div>
      ))}
    </Out>
  );
}

function Contact() {
  return (
    <Out>
      <Field
        k="email"
        v={
          <a
            href={`mailto:${profile.email}`}
            className="text-bone-100 hover:text-accent-cyan"
          >
            {profile.email}
          </a>
        }
      />
      <Field
        k="github"
        v={
          <a
            href={ext(profile.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-100 hover:text-accent-cyan"
          >
            {profile.github}
          </a>
        }
      />
      <Field
        k="linkedin"
        v={
          <a
            href={ext(profile.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-100 hover:text-accent-cyan"
          >
            {profile.linkedin}
          </a>
        }
      />
    </Out>
  );
}

function Now() {
  return (
    <Out>
      <Echo>currently</Echo>
      {nowItems.map((n, i) => (
        <Bullet key={i}>{n}</Bullet>
      ))}
    </Out>
  );
}

function Hobbies() {
  return (
    <Out>
      {hobbies.map((h, i) => (
        <Bullet key={i}>{h}</Bullet>
      ))}
    </Out>
  );
}

function Values() {
  return (
    <Out>
      {values.map((v) => (
        <div key={v.k} className="max-w-[78ch]">
          <span className="text-bone-100">{v.k}.</span>{" "}
          <span className="text-bone-300">{v.v}</span>
        </div>
      ))}
    </Out>
  );
}

function Human() {
  return (
    <Out>
      {human.map((h, i) => (
        <Para key={i}>{h}</Para>
      ))}
    </Out>
  );
}

function Life({ ctx }: { ctx: Ctx }) {
  return (
    <Out>
      <Para>{profile.longBio}</Para>
      <Para className="text-bone-300">
        Curious by default. Math major. I keep ending up at the seam between a
        model and a UI — that&apos;s the thing I want to spend the next few
        years getting really good at.
      </Para>
      <Echo>
        related: <CmdLink cmd="hobbies" ctx={ctx} /> ·{" "}
        <CmdLink cmd="now" ctx={ctx} /> · <CmdLink cmd="values" ctx={ctx} />
      </Echo>
    </Out>
  );
}

function AboutDeep() {
  return (
    <Out>
      <Para>{aboutDeep}</Para>
    </Out>
  );
}

// ---- easter eggs ----

function HireMe() {
  return (
    <Out>
      <div className="text-bone-300">
        [sudo] password for guest:{" "}
        <span className="tracking-widest text-bone-500">••••••••</span>
      </div>
      <Ok>✓ permission granted.</Ok>
      <Echo>establishing secure channel…</Echo>
      <Ok>✓ channel open.</Ok>
      <div className="pt-2">
        <Field k="status" v="seeking fall 2026 co-op" />
        <Field k="type" v="SWE / AI / data" />
        <Field k="start" v="sep 2026" />
        <Field k="prefer" v="toronto · remote · hybrid" />
        <Field
          k="primary"
          v={
            <a
              href={`mailto:${profile.email}?subject=co-op%20opportunity`}
              className="text-bone-100 hover:text-accent-cyan"
            >
              {profile.email}
            </a>
          }
        />
      </div>
    </Out>
  );
}

function SystemStatus() {
  const rows = [
    ["001", "running", "fall 2026 co-op search", "87%"],
    ["002", "running", "socialscript prototype", "64%"],
    ["003", "running", "curling shot advisor", "42%"],
    ["004", "idle   ", "weekend recharge", "9%"],
    ["005", "blocked", "co-op decisions inbound", "0%"],
  ];
  return (
    <Out>
      <div className="whitespace-pre text-bone-400">
        {"  PID  STATE     FOCUS                                CPU"}
      </div>
      {rows.map(([pid, state, focus, cpu]) => (
        <div key={pid} className="whitespace-pre">
          {"  "}
          <span className="text-bone-300">{pid}</span>
          {"  "}
          <span
            className={
              state.trim() === "running"
                ? "text-accent-lime"
                : state.trim() === "blocked"
                ? "text-accent-rose"
                : "text-bone-400"
            }
          >
            {state}
          </span>
          {"  "}
          <span className="text-bone-100">{focus.padEnd(36, " ")}</span>
          <span className="text-bone-300">{cpu}</span>
        </div>
      ))}
      <div className="pt-2">
        <Field k="uptime" v="online · healthy" />
        <Field k="load avg" v="0.81, 0.74, 0.69" />
        <Field
          k="build"
          v={`riza-os ${new Date().getFullYear()}.${new Date().getMonth() + 1}`}
        />
      </div>
    </Out>
  );
}

function NeuralNetwork() {
  return (
    <Out>
      <pre className="leading-tight text-bone-200">
{`     ●─────●         ●
      ╲   ╱ ╲       ╱
       ╲ ╱   ╲     ╱
        ●─────●───●
       ╱ ╲   ╱     ╲
      ╱   ╲ ╱       ╲
     ●─────●         ●

   in           hidden          out`}
      </pre>
      <Echo>no weights. just vibes.</Echo>
    </Out>
  );
}

function Coffee() {
  return (
    <Out>
      <pre className="leading-tight text-bone-200">
{`      (  (
       )  )
   ___________
  |           |
  |   v60     |
  |___________|`}
      </pre>
      <div className="pt-2">
        <Field k="recipe" v="18g in / 280g out · medium grind" />
        <Field k="bloom" v="30s with 50g" />
        <Field k="pour" v="to 1:30, slow circles" />
        <Field k="finish" v="2:30 total · ~92°C" />
      </div>
    </Out>
  );
}

// ---- registry ----

const baseCommands: Command[] = [
  {
    name: "help",
    aliases: ["?", "ls"],
    hint: "list commands",
    group: "core",
    run: (_a, ctx) => node(<Help ctx={ctx} />),
  },
  {
    name: "clear",
    aliases: ["cls"],
    hint: "clear the screen",
    group: "core",
    run: () => ({ kind: "clear" }),
  },
  {
    name: "whoami",
    hint: "identity, briefly",
    group: "about",
    run: () => node(<Whoami />),
  },
  {
    name: "about",
    hint: "long-form bio",
    group: "about",
    run: (_a, ctx) => node(<About ctx={ctx} />),
  },
  {
    name: "education",
    aliases: ["edu", "school"],
    hint: "uwaterloo · b.math",
    group: "about",
    run: () => node(<Education />),
  },
  {
    name: "experience",
    aliases: ["exp"],
    hint: "roles & timeline",
    group: "work",
    run: () => node(<Experience />),
  },
  {
    name: "projects",
    aliases: ["work"],
    hint: "case studies — try `projects <id>`",
    group: "work",
    run: (args, ctx) => {
      const id = args[0]?.toLowerCase();
      if (id) {
        const p = projects.find(
          (x) =>
            x.id === id ||
            x.name.toLowerCase() === id ||
            x.index.toLowerCase() === id
        );
        if (p) return node(<ProjectDetail p={p} ctx={ctx} />);
        return node(
          <Err>
            no project matches{" "}
            <span className="text-bone-100">{id}</span>. try{" "}
            <CmdLink cmd="projects" ctx={ctx} />.
          </Err>
        );
      }
      return node(<ProjectsList ctx={ctx} />);
    },
  },
  {
    name: "skills",
    aliases: ["stack"],
    hint: "languages, frameworks, ai/ml",
    group: "work",
    run: () => node(<Skills />),
  },
  {
    name: "contact",
    aliases: ["email"],
    hint: "open channels",
    group: "work",
    run: () => node(<Contact />),
  },
  {
    name: "github",
    hint: "open github",
    group: "system",
    run: () => ({
      kind: "open",
      url: ext(profile.github),
      node: (
        <Out>
          <Echo>→ {profile.github}</Echo>
        </Out>
      ),
    }),
  },
  {
    name: "linkedin",
    hint: "open linkedin",
    group: "system",
    run: () => ({
      kind: "open",
      url: ext(profile.linkedin),
      node: (
        <Out>
          <Echo>→ {profile.linkedin}</Echo>
        </Out>
      ),
    }),
  },

  // human layer

  /*
  {
    name: "now",
    hint: "what i'm doing right now",
    group: "human",
    run: () => node(<Now />),
  },
  {
    name: "hobbies",
    hint: "off-keyboard interests",
    group: "human",
    run: () => node(<Hobbies />),
  },
  {
    name: "values",
    aliases: ["principles"],
    hint: "operating principles",
    group: "human",
    run: () => node(<Values />),
  },
  {
    name: "human",
    hint: "the non-engineer view",
    group: "human",
    run: () => node(<Human />),
  },
  {
    name: "life",
    hint: "longer narrative",
    group: "human",
    run: (_a, ctx) => node(<Life ctx={ctx} />),
  },
  */

  // hidden
  {
    name: "sudo hire-me",
    aliases: ["hire-me", "sudo"],
    hint: "elevated channel",
    group: "fun",
    hidden: true,
    run: () => node(<HireMe />),
  },
  {
    name: "system-status",
    aliases: ["status"],
    hint: "internal metrics",
    group: "fun",
    hidden: true,
    run: () => node(<SystemStatus />),
  },
  {
    name: "neural-network",
    aliases: ["nn"],
    hint: "small network art",
    group: "fun",
    hidden: true,
    run: () => node(<NeuralNetwork />),
  },
  {
    name: "coffee",
    hint: "v60 recipe",
    group: "fun",
    hidden: true,
    run: () => node(<Coffee />),
  },
  {
    name: "about:deep",
    aliases: ["about-deep"],
    hint: "longer reflection",
    group: "fun",
    hidden: true,
    run: () => node(<AboutDeep />),
  },
];

export const registry: Command[] = baseCommands;

export const allNames: string[] = registry
  .flatMap((c) => [c.name, ...(c.aliases ?? [])])
  .filter((v, i, a) => a.indexOf(v) === i);

export function findCommand(input: string): { cmd: Command; args: string[] } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Try multi-word match first (e.g. "sudo hire-me")
  for (const c of registry) {
    const candidates = [c.name, ...(c.aliases ?? [])];
    for (const cand of candidates) {
      if (
        trimmed === cand ||
        trimmed.toLowerCase().startsWith(cand.toLowerCase() + " ")
      ) {
        const args = trimmed.slice(cand.length).trim();
        return {
          cmd: c,
          args: args ? args.split(/\s+/) : [],
        };
      }
    }
  }
  return null;
}

export function suggestionsFor(prefix: string): string[] {
  const p = prefix.trim().toLowerCase();
  if (!p) return [];
  return allNames.filter((n) => n.toLowerCase().startsWith(p)).sort();
}
