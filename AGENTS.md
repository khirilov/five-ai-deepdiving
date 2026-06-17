# Agent Instructions

> AI agent instructions for the **five-ai-deepdiving** repository.
> Read and follow these instructions for every task in this repository.

## 1. Repository Overview

This is a **presentation app + live demo repo** for the talk "Claude Code, deeper: skills,
subagents, hooks, tokens, MCP". The React app in `src/` renders the slide deck; the
`.claude/` folder contains the real skills, commands, subagents, and hooks the talk
demonstrates. Both are first-class code — the deck and the demo must stay in sync.

### Key Tech Stack

- **Runtime:** Node.js ≥ 20
- **Package manager:** pnpm 10
- **Framework:** React 19, Vite 6 — static SPA, no router (hash deep-links `#/N`), no server
- **Language:** TypeScript 5.8, strict mode
- **Syntax highlighting:** Prism (`prismjs`)
- **Styling:** one global `src/styles.css` with design tokens in `:root` — no CSS framework
- **Tests / linter:** not configured (keep it that way unless explicitly asked)

---

## 2. Setup & Common Commands

```bash
# Install dependencies
pnpm install

# Start the dev server (port 5173)
pnpm dev

# Type-check + production build
pnpm build

# Type-check only
pnpm typecheck
```

---

## 3. Architecture Rules

### 3.1 Slide Deck Structure

```text
src/
├── app.tsx                    # Deck shell: keyboard nav, hash routing, progress bar
├── types.ts                   # DeckSlide = { id, section, content }
├── styles.css                 # All styles; design tokens in :root
├── components/
│   ├── primitives.tsx         # SlideTitle, Bullets, Cols/Col, FieldTable, Flow,
│   │                          #   Note, Warn, Term, BigStatement
│   └── code-block.tsx         # Prism highlighting (yaml, json, bash, ts, tsx, markdown, text)
└── slides/
    ├── index.ts               # Deck order — every section registered here
    └── <section>.tsx          # intro, skills, agents, hooks, tokens, mcp, outro
```

**Rules:**

- Slides live in `src/slides/<section>.tsx` and are registered in `src/slides/index.ts`.
- Build slide content from `src/components/primitives.tsx`. Do NOT create one-off
  components for things primitives already cover; extend a primitive if genuinely needed.
- Deck logic (navigation, progress, hash sync) stays in `src/app.tsx` — never inside slides.
- Every slide satisfies the `DeckSlide` type: unique kebab-case `id`, `section` matching
  its neighbors in the same file.

### 3.2 `.claude/` Is Part of the Product

- Skills, commands, agents, and hooks in `.claude/` are demo material shown live during
  the talk. Treat edits there with the same care as `src/`.
- Code samples on slides quote real files from this repo. If you change a quoted file
  (e.g. a skill's frontmatter), update the corresponding slide so they don't drift.

---

## 4. Coding Conventions

### 4.1 File Naming

- **All files and directories:** `kebab-case` (e.g., `code-block.tsx`).
- **Component exports:** `PascalCase` (e.g., `export function CodeBlock`).
- **Hook exports:** `camelCase` starting with `use` (e.g., `export function useDeckNavigation`).
- **Function style:** Prefer `function` declarations for exported React components, hooks,
  and top-level utilities. Use arrow functions for local callbacks and short inline closures.
- **Do NOT** use `index.tsx` for component files. `index.ts` is allowed only as a barrel
  for slide registration (`src/slides/index.ts`).

### 4.2 Component File Structure

Follow this order within every React component file:

1. **Imports** (3rd party → internal)
2. **Types** (`type Props = { ... }`)
3. **Component** (`export function ComponentName(...)`)
4. **Hooks** (all `use...` calls at the top of the component body)
5. **Derived state** (avoid `useMemo` unless expensive)
6. **Event handlers**
7. **Effects** (`useEffect` — minimize; prefer derived state)
8. **Render** (`return (...)`)

### 4.3 Styling

- All styles live in `src/styles.css`, built on the design tokens in `:root`.
- Class names: `kebab-case`, following the existing naming (`.deck-footer`, `.code-block`).
- No inline styles except dynamic values (e.g. progress-bar width).
- No CSS frameworks, no CSS-in-JS.

### 4.4 TypeScript

- **Strict mode** is enabled. Never use `// @ts-ignore` or `// @ts-expect-error` without
  a comment explaining why.
- **No enums.** Use union types (`type Lang = 'yaml' | 'json'`) or `as const` objects.
- **No non-null assertions (`!`)** unless provably safe.
- Prefer **named exports** over default exports.

### 4.5 Slide Content

- Slide text is **English**; keep it concise and presentation-ready.
- One slide = one screen at 1080p — no scrolling walls of text. Split big tables across slides.
- Numbers and claims on slides must be sourced (research notes / official docs), not invented.

---

## 5. Code Quality Checks Before Submitting

Before considering any task complete, ensure:

1. **`pnpm typecheck`** passes with no errors (the project hook also runs it after edits).
2. **`pnpm build`** passes.
3. Changed slides render without overflow — verify in the browser when possible.
4. Slides quoting `.claude/` files still match those files.

---

## 6. Key Conventions Summary

- Named exports; `function` declarations for exported components/hooks.
- Custom hooks return an **object**, not an array.
- No unnecessary `useMemo` / `useEffect` — prefer derived state.
- JSDoc / comments only where logic is non-obvious.

---

## 7. What NOT to Do

- Do NOT add dependencies without explicit approval — the deck stays lightweight.
- Do NOT install a linter/formatter/test runner unless explicitly asked.
- Do NOT create one-off slide components when primitives cover the case.
- Do NOT use enums, default exports, or `index.tsx` component filenames.
- Do NOT let slide code samples drift from the real files they quote.
- Do NOT commit `.env` files or API keys.
