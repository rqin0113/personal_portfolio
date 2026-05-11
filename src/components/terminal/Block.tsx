"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Primitives for rendering command output as shell-style stdout.
 * Everything is monospace, plain text, no card chrome.
 */

export function Out({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[78ch] space-y-1 leading-relaxed", className)}>
      {children}
    </div>
  );
}

export function Para({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-[78ch] whitespace-pre-wrap text-bone-200",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Section({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("pt-2 text-bone-400", className)}>
      {label}
    </div>
  );
}

/**
 * Rendered as `  key  ·············  value` shell-style.
 * Width controls the label column.
 */
export function Field({
  k,
  v,
  w = 14,
  vClass = "text-bone-100",
  kClass = "text-bone-400",
}: {
  k: string;
  v: ReactNode;
  w?: number;
  vClass?: string;
  kClass?: string;
}) {
  return (
    <div className="whitespace-pre">
      {"  "}
      <span className={kClass}>{k.padEnd(w, " ")}</span>
      <span className={vClass}>{v}</span>
    </div>
  );
}

export function Bullet({
  children,
  marker = "·",
  onClick,
  className,
}: {
  children: ReactNode;
  marker?: string;
  onClick?: () => void;
  className?: string;
}) {
  const interactive = !!onClick;
  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        "flex max-w-[78ch] gap-2 text-bone-200",
        className
      )}
    >
      <span className="select-none text-bone-500">{marker}</span>
      <span className="whitespace-pre-wrap">{children}</span>
    </div>
  );
}

export function Echo({ children }: { children: ReactNode }) {
  return <div className="text-bone-400">{children}</div>;
}

export function Err({ children }: { children: ReactNode }) {
  return <div className="text-accent-rose">{children}</div>;
}

export function Ok({ children }: { children: ReactNode }) {
  return <div className="text-accent-lime">{children}</div>;
}
