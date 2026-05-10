import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          0: "#000000",
          50: "#05060a",
          100: "#0a0c12",
          200: "#0f1218",
          300: "#161922",
          400: "#1c2030",
          500: "#262a3a",
          600: "#3a3f55",
        },
        bone: {
          50: "#f5f6f8",
          100: "#e6e8ee",
          200: "#c8ccd6",
          300: "#9aa0b0",
          400: "#6c7385",
        },
        accent: {
          cyan: "#5eead4",
          violet: "#a78bfa",
          lime: "#bef264",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      animation: {
        "grid-pan": "grid-pan 40s linear infinite",
        "scan-line": "scan-line 8s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        flicker: "flicker 4s steps(5, end) infinite",
        "spin-slow": "spin 40s linear infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        blink: "blink 1.1s steps(2, start) infinite",
      },
      keyframes: {
        "grid-pan": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-40px,-40px,0)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
          "60%": { opacity: "1" },
          "70%": { opacity: "0.96" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(94,234,212,0.08), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
