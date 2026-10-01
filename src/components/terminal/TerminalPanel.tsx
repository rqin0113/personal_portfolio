"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { music } from "@/lib/data";

type QuestionId = "cfm" | "free-time" | "music";
type Entry = {
  question: string;
  answer: ReactNode;
};

const questions: { id: QuestionId; label: string; aliases: string[] }[] = [
  {
    id: "cfm",
    label: "Why CFM?",
    aliases: [
      "why cfm",
      "why did you choose cfm",
      "why did u choose cfm",
      "why finance",
      "why cs and finance",
      "why cs + finance",
    ],
  },
  {
    id: "free-time",
    label: "What do you do for fun?",
    aliases: [
      "what do you do for fun",
      "what do you do in your free time",
      "what do u do in ur free time",
      "free time",
      "hobbies",
    ],
  },
  {
    id: "music",
    label: "What are your favourite songs?",
    aliases: [
      "what are your favourite songs",
      "what are your favorite songs",
      "favourite songs",
      "favorite songs",
      "fav songs",
      "music",
    ],
  },
];

function answerFor(id: QuestionId): ReactNode {
  if (id === "cfm") {
    return (
      <p className="terminal-answer">
        I started in Math, but I&apos;ve always been drawn to computer science
        and curious about the finance industry. CFM brings those interests
        together: I want to use code to solve real problems in finance. I&apos;m
        especially interested in fintech, quantitative finance, and AI.
      </p>
    );
  }

  if (id === "free-time") {
    return (
      <div className="terminal-answer">
        <ul>
          <li>
            Curling!! I started in Grade 11, and during the season I&apos;m at
            Granite Club every Sunday evening.
            <a
              className="curling-photo-link"
              href="/curling.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              My curling team ↗
            </a>
          </li>
          <li>Finding good food and exploring new cities.</li>
          <li>Travelling and going to concerts.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="terminal-answer">
      <p>A few songs I&apos;ve had on repeat lately:</p>
      <ul className="terminal-song-list">
        {music.map((track) => (
          <li key={track.title}>
            <a href={track.url} target="_blank" rel="noopener noreferrer">
              {track.title} <span>— {track.artist} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TerminalPanel() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");

  function ask(raw: string) {
    const question = raw.trim().replace(/[?!.,]+$/, "");
    if (!question) return;

    const normalized = question.toLowerCase().replace(/\s+/g, " ");
    const match = questions.find(
      (item) =>
        normalized === item.id ||
        item.aliases.some((alias) => normalized.includes(alias)),
    );

    if (!match) {
      setEntries((current) => [
        ...current,
        {
          question,
          answer: (
            <p className="terminal-answer">
              I don&apos;t have an answer for that one yet. Try one of the questions above.
            </p>
          ),
        },
      ]);
      return;
    }

    setEntries((current) => [
      ...current,
      { question, answer: answerFor(match.id) },
    ]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
    setInput("");
  }

  return (
    <details className="terminal-panel">
      <summary>
        <span className="terminal-prompt-mark">&gt;_</span>
        <span>A few things beyond the résumé</span>
        <span className="terminal-summary-hint">Ask me something</span>
      </summary>
      <div className="terminal-window">
        <div className="terminal-topline">
          <span><i /> <i /> <i /></span>
          <span>riza@portfolio · q&amp;a</span>
          <span className="terminal-version">interactive</span>
        </div>
        <div className="terminal-content" aria-live="polite">
          <p className="terminal-welcome">
            Type a question or pick one to start:
          </p>
          <div className="terminal-question-list">
            {questions.map((question) => (
              <button
                type="button"
                key={question.id}
                onClick={() => ask(question.label)}
              >
                {question.label}
              </button>
            ))}
          </div>
          {entries.map((entry, index) => (
            <div className="terminal-entry" key={`${entry.question}-${index}`}>
              <p><span>you</span> &gt; {entry.question}</p>
              <div className="terminal-response">
                <span className="terminal-response-label">riza</span>
                {entry.answer}
              </div>
            </div>
          ))}
          <form className="terminal-form" onSubmit={handleSubmit}>
            <label htmlFor="terminal-question"><span>you</span> &gt;</label>
            <input
              id="terminal-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label="Ask Riza a question"
              placeholder="ask me something..."
            />
          </form>
        </div>
      </div>
    </details>
  );
}
