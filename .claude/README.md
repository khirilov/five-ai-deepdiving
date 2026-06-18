# Claude Code setup — talk demo repository

This repository is the live demo for the "Claude Code, deeper" talk. Everything the
slides (the React app in `src/`) talk about is actually configured here and shown live.

## What lives where

| Asset | Location | Demonstrates |
| --- | --- | --- |
| Skills | `.claude/skills/<name>/SKILL.md` | Progressive disclosure, frontmatter, supporting files |
| Slash commands | `.claude/commands/<name>.md` | Same skill format; interactive orchestrators |
| Subagents | `.claude/agents/<name>.md` | Own context, restricted tools, cheaper models |
| Project hooks | `.claude/settings.json` + `.claude/hooks/` | Guarantees: typecheck after edits, git-push block, sound on Stop |
| Hook inside a skill | `.claude/skills/tdd/SKILL.md` (frontmatter) | A hook active only while the skill runs |
| Project memory | `CLAUDE.md` (root) | Auto-loaded every session; imports `AGENTS.md` via `@AGENTS.md` |

## Key demos

- **`/feature-forge <feature>`** — orchestrates DISCOVER → DESIGN → REVIEW → BUILD →
  FINALIZE, invoking the `grill-me`, `design-an-interface`, and `tdd` skills. The DESIGN
  phase spawns parallel `design-explorer` subagents. **`/feature-forge-solo <feature>`**
  is the separate no-subagents variant — the comparison shown in the talk. Both are
  manual-only (`disable-model-invocation: true`): you type them with the feature
  description as the argument; they never self-trigger.
- **`/mr-reviewer`** — collects ALL current changes itself (staged + unstaged + untracked,
  or a branch range from the argument) and reviews them against repo conventions →
  findings by severity → verdict.
- **`/browser-reviewer`** — QA in a live browser via Chrome DevTools MCP
  (requires the server: `claude mcp add --transport stdio chrome-devtools -- npx chrome-devtools-mcp@latest`).
- **`/deck-review`** — the fan-out pattern live in THIS repo: one `slide-reviewer`
  subagent (on haiku) per slide section, in parallel → merged report. Run with `--solo`
  for the same review inline and compare `/context` — the fast version of the
  feature-forge comparison.
- **`/deck-stats`** — a skill with `context: fork`: the analysis runs in a forked
  subagent context and only a small stats table returns. Show `/context` before/after.
- **`/learn-with-me <topic>`** — a learning-coach skill: grills you on what to learn,
  writes an ordered plan to `docs/learning-plans/<topic>-plan.md`, then coaches one item at
  a time (Learning-mode `TODO(human)` → you write it → `grill-me` quiz). Manual-only
  (`disable-model-invocation: true`). Pairs with the Learning output style (bonus slide).
- **`/mantine-css-auditor`** — the same fan-out pattern from a real work project:
  orchestrator → N read-only workers → reconciler (workers are `mantine-css-audit-worker`
  subagents; no Mantine here, so this one is talk-through, not live).
- **`/frontmatter-showcase [area]`** — the "all knobs in one file" reference: a real
  read-only repo-hygiene report whose frontmatter exercises every field the slides list —
  `paths`, `allowed-tools`, `disallowed-tools`, `model: haiku`, `effort: low`, a
  skill-scoped `hooks` block, `arguments`/`argument-hint`, `disable-model-invocation`,
  `user-invocable`. Open it on stage and point at each field. Example hooks for
  `test`/`lint`/`typecheck` (not active here — no test runner by design) live in
  `.claude/hooks-examples.jsonc`.

## Why some things are commands and others are subagents

- **Subagents** run autonomously in an isolated context and **cannot talk to the user
  mid-run** — they take a prompt and return one report.
- **Commands/skills** run in the main conversation, so they **can** interview the user
  (grill-me style) and spawn subagents.

That's why `mr-reviewer`, `browser-reviewer`, `feature-forge`/`feature-forge-solo`, and
`deck-review` are commands/skills in the main conversation (interactive orchestrators),
while `design-explorer`, `slide-reviewer`, `mantine-css-audit-worker`, and
`mantine-css-audit-reconciler` are subagents (autonomous, read-only).

## MCP

The repo ships a project-scoped `.mcp.json` at the root with the demo set:
`chrome-devtools` (debugging/QA, required by `/browser-reviewer`), `playwright`
(driving user flows), and `context7` (fresh library docs). On first run Claude Code
asks you to approve these servers — that prompt itself is demo material (project scope,
shared via git). Servers that need API keys (Perplexity) stay in local scope, never in
`.mcp.json`. The full step-by-step setup guide is in `docs/setup-guide.md`.

## Quick test

- `/help` → the commands are listed; `/deck-stats` → stats table, main context stays clean.
- "use TDD to build X" → the `tdd` skill triggers; its hook shows in the status bar.
- `/hooks` → the three project hooks from `.claude/settings.json`.
- `/feature-forge-solo demo` vs `/feature-forge demo` → compare `/context` after DESIGN.
