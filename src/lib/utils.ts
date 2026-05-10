import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const accentMap: Record<string, { text: string; ring: string; glow: string; bg: string }> = {
  cyan: {
    text: "text-accent-cyan",
    ring: "ring-accent-cyan/40",
    glow: "shadow-[0_0_30px_-6px_rgba(94,234,212,0.55)]",
    bg: "bg-accent-cyan/10",
  },
  violet: {
    text: "text-accent-violet",
    ring: "ring-accent-violet/40",
    glow: "shadow-[0_0_30px_-6px_rgba(167,139,250,0.55)]",
    bg: "bg-accent-violet/10",
  },
  lime: {
    text: "text-accent-lime",
    ring: "ring-accent-lime/40",
    glow: "shadow-[0_0_30px_-6px_rgba(190,242,100,0.55)]",
    bg: "bg-accent-lime/10",
  },
  amber: {
    text: "text-accent-amber",
    ring: "ring-accent-amber/40",
    glow: "shadow-[0_0_30px_-6px_rgba(251,191,36,0.55)]",
    bg: "bg-accent-amber/10",
  },
  rose: {
    text: "text-accent-rose",
    ring: "ring-accent-rose/40",
    glow: "shadow-[0_0_30px_-6px_rgba(251,113,133,0.55)]",
    bg: "bg-accent-rose/10",
  },
  bone: {
    text: "text-bone-100",
    ring: "ring-white/20",
    glow: "shadow-[0_0_30px_-6px_rgba(255,255,255,0.35)]",
    bg: "bg-white/5",
  },
};

export function fmtTime(d = new Date()) {
  return d.toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
