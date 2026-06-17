# five-ai-deepdiving

A React app with the slide deck for the talk "Claude Code, deeper: skills, subagents,
hooks, tokens, MCP". This repository is both the presentation and the live demo:
everything the slides talk about (skills, agents, hooks) is actually configured in
`.claude/` and shown live during the talk.

## Rules & Conventions

The full repository rules (stack, deck architecture, code and slide conventions,
quality checklist) live in AGENTS.md, imported here in full:

@AGENTS.md

## Quick Notes

- `pnpm dev` → http://localhost:5173 · `pnpm build` · `pnpm typecheck`
- Typecheck runs automatically after code edits — a hook in `.claude/settings.json`.
- For an overview of the demo assets and showcase scenarios, see `.claude/README.md`.
- The step-by-step setup guide for MCP servers and plugins lives in `docs/setup-guide.md`.
- The speaker's handbook (theory, demo script, FAQ) lives in `docs/talk-handbook.md`.
