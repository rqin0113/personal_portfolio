"use client";

import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { findCommand, suggestionsFor } from "@/lib/commands";
import { PhotoRoll } from "./PhotoRoll";

type Entry = {
  id: number;
  command: string;
  output: ReactNode;
};

let entryId = 0;

export function Shell() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [bufferedInput, setBufferedInput] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const [photoOpen, setPhotoOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const scrollToPrompt = useCallback(() => {
    requestAnimationFrame(() => {
      const el = viewportRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();

      setHistory((h) =>
        trimmed && (h.length === 0 || h[h.length - 1] !== trimmed)
          ? [...h, trimmed]
          : h
      );
      setHistIdx(null);
      setBufferedInput("");

      if (!trimmed) {
        setEntries((e) => [
          ...e,
          { id: ++entryId, command: "", output: null },
        ]);
        scrollToPrompt();
        return;
      }

      const found = findCommand(trimmed);

      if (!found) {
        const node = (
          <div className="text-bone-400">
            command not found:{" "}
            <span className="text-bone-200">{trimmed.split(/\s+/)[0]}</span>
          </div>
        );
        setEntries((e) => [
          ...e,
          { id: ++entryId, command: trimmed, output: node },
        ]);
        scrollToPrompt();
        return;
      }

      const result = found.cmd.run(found.args, { run: runCommand });

      if (result.kind === "clear") {
        setEntries([]);
        return;
      }

      if (result.kind === "open") {
        if (typeof window !== "undefined") {
          window.open(result.url, "_blank", "noopener,noreferrer");
        }
        if (result.node) {
          setEntries((e) => [
            ...e,
            { id: ++entryId, command: trimmed, output: result.node! },
          ]);
        }
        scrollToPrompt();
        return;
      }

      setEntries((e) => [
        ...e,
        { id: ++entryId, command: trimmed, output: result.node },
      ]);
      scrollToPrompt();
    },
    [scrollToPrompt]
  );

  // global click in viewport focuses input
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea")) return;
      if (window.getSelection()?.toString()) return;
      focusInput();
    };
    document.addEventListener("mouseup", onClick);
    return () => document.removeEventListener("mouseup", onClick);
  }, [focusInput]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  // quiet hint: only show real completions, never errors
  useEffect(() => {
    const v = input.trim();
    if (!v) {
      setHint(null);
      return;
    }
    const s = suggestionsFor(v);
    if (s.length === 1 && s[0] !== v) {
      setHint(`tab → ${s[0]}`);
    } else if (s.length > 1 && s.length <= 6) {
      setHint(s.join("  "));
    } else {
      setHint(null);
    }
  }, [input]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next =
        histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      if (histIdx === null) setBufferedInput(input);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(null);
        setInput(bufferedInput);
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = input.trim();
      const s = suggestionsFor(v);
      if (s.length === 1) {
        setInput(s[0]);
      } else if (s.length > 1) {
        const common = longestCommonPrefix(s);
        if (common.length > v.length) setInput(common);
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setEntries([]);
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setEntries((es) => [
        ...es,
        { id: ++entryId, command: input + "^C", output: null },
      ]);
      setInput("");
      setHistIdx(null);
      scrollToPrompt();
    }
  };

  return (
    <div className="window-shadow relative mx-auto flex h-[780px] max-w-[900px] flex-col overflow-hidden bg-ink-100 font-mono text-bone-200 sm:h-[calc(100svh-2.5rem)] sm:rounded-xl lg:h-[calc(100svh-3.5rem)]">
      <TitleBar />
      <TabBar />
      <PhotoRoll open={photoOpen} onClose={() => setPhotoOpen(false)} />

      <div
        ref={viewportRef}
        className="relative flex-1 overflow-y-auto overscroll-contain bg-ink-100 px-5 py-6 text-[13.5px] leading-[1.6] sm:px-10 sm:py-8"
        onClick={focusInput}
      >
        <div className="relative z-10 mx-auto max-w-[80ch]">
          <Banner
            runCommand={runCommand}
            onOpenPhotos={() => setPhotoOpen(true)}
          />

          {entries.map((e) => (
            <div key={e.id} className="mt-3">
              <PromptLine command={e.command} />
              {e.output && <div className="mt-1">{e.output}</div>}
            </div>
          ))}

          {/* live prompt */}
          <div className="mt-3 flex flex-col">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <PromptHead />
              <input
                ref={inputRef}
                value={input}
                onChange={(ev) => setInput(ev.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="terminal input"
                className="min-w-[1ch] flex-1 bg-transparent text-bone-50 caret-accent-cyan outline-none"
              />
            </div>
            {hint && (
              <div className="mt-1 truncate pl-[20ch] text-[12px] text-bone-500">
                {hint}
              </div>
            )}
          </div>

          <div className="h-12" />
        </div>
      </div>
    </div>
  );
}

// ---- chrome ----

function TitleBar() {
  return (
    <div className="titlebar-bg relative flex h-9 items-center px-3">
      <div className="flex items-center gap-2">
        <button
          aria-label="close"
          className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/20 transition-transform hover:scale-105"
        />
        <button
          aria-label="minimize"
          className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/20 transition-transform hover:scale-105"
        />
        <button
          aria-label="maximize"
          className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/20 transition-transform hover:scale-105"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[11.5px] text-bone-400">portfolio</span>
      </div>

      <div className="ml-auto h-3 w-12" />
    </div>
  );
}

function TabBar() {
  return (
    <div className="flex items-end gap-px border-b border-white/[0.05] bg-[#0c0e15] px-3 pt-1.5">
      <Tab>portfolio</Tab>
    </div>
  );
}

function Tab({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center gap-2 rounded-t-md bg-ink-100 px-3 py-1.5 text-[12px] text-bone-200">
      <span className="h-1.5 w-1.5 rounded-full bg-bone-400/60" />
      <span className="font-mono">{children}</span>
    </div>
  );
}

function Banner({
  runCommand,
  onOpenPhotos,
}: {
  runCommand: (cmd: string) => void;
  onOpenPhotos: () => void;
}) {
  return (
    <div className="space-y-3 pb-3">
      <p className="text-bone-100">Hey! I'm Riza 😊 </p>
      <p className="max-w-[78ch] text-bone-300">
        2A Honours Mathematics student @ University of Waterloo interested in full-stack development, applied AI engineering, and data science 👩🏻‍💻
      </p>
      <p className="text-bone-300">I enjoy building things that bridge my interests with real-world problems - from AI-powered backend systems to interactive user experiences. Always learning, experimenting, and open to meaningful conversations 💬 </p>
      <p className="text-bone-300">Welcome to my terminal-inspired portfolio - a small space to explore what I've been building, thinking about, and enjoying lately :) </p>
      <p className="text-bone-400">
        <button
          onClick={onOpenPhotos}
          className="text-accent-amber underline underline-offset-2 hover:text-accent-lime"
        >
          📷 view photo roll →
        </button>
      </p>
      <p className="text-bone-400">
        For a list of available commands, type{" "}
        <button
          onClick={() => runCommand("help")}
          className="text-bone-100 underline-offset-2 hover:underline"
        >
          help
        </button>
        .
      </p>
    </div>
  );
}

function PromptHead() {
  return (
    <span className="select-none whitespace-pre">
      <span className="text-bone-300">rizaqin@portfolio</span>
      <span className="text-bone-500">:</span>
      <span className="text-bone-300">~</span>
      <span className="text-bone-100">$ </span>
    </span>
  );
}

function PromptLine({ command }: { command: string }) {
  return (
    <div className="select-text">
      <PromptHead />
      <span className="text-bone-100">{command}</span>
    </div>
  );
}

function longestCommonPrefix(arr: string[]): string {
  if (arr.length === 0) return "";
  let p = arr[0];
  for (let i = 1; i < arr.length; i++) {
    while (arr[i].toLowerCase().indexOf(p.toLowerCase()) !== 0) {
      p = p.slice(0, -1);
      if (!p) return "";
    }
  }
  return p;
}
