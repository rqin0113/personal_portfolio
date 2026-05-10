# Portfolio

Dark, cinematic portfolio for a CS + AI student. Next.js · TypeScript · Tailwind · Framer Motion.

## Run

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Editing your content

All copy lives in [src/lib/data.ts](src/lib/data.ts):

- `profile` — name, role, contact, status
- `experience` — work timeline
- `projects` — case studies (problem · approach · outcome · metrics · stack)
- `skills` — grouped tech with levels
- `terminalLines` — the hero terminal script
- `graphNodes` / `graphEdges` — hero node graph topology

## Structure

```
src/
  app/
    layout.tsx        # root shell — fonts, cursor, nav, cmd-k
    page.tsx          # composes the sections
    globals.css       # tokens, utilities, scanlines, mask helpers
    icon.svg
  components/
    Hero.tsx          # headline + node graph + terminal + stats
    About.tsx
    Experience.tsx
    Projects.tsx      # interactive case-study panel
    Skills.tsx
    Contact.tsx
    Navigation.tsx
    CommandPalette.tsx
    Cursor.tsx        # custom reticle cursor
    NodeGraph.tsx     # animated SVG graph
    Terminal.tsx      # typed-out shell session
    AnimatedGrid.tsx
    ScrollProgress.tsx
    SectionHeader.tsx
  lib/
    data.ts
    utils.ts
```

## Interactions

- `⌘K` / `Ctrl+K` — command palette (jump anywhere, copy email, open links)
- Custom cursor with target reticle and contextual labels (desktop only)
- Scroll progress bar at the top edge
- Section-based active nav
- Reduced-motion aware

## Design notes

- Type system: Inter (sans) · Space Grotesk (display) · JetBrains Mono (mono)
- Palette: `ink` (near-black) · `bone` (off-white) · five accents (cyan/violet/lime/amber/rose)
- Subtle CRT scanlines and noise overlay; never overpowering
- Every section has a stable `index` (00, 01, …) and a kicker for that lab/terminal feel
