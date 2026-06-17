---
description: "Review the whole slide deck against repo conventions by fanning out one
  slide-reviewer subagent per section. Use when: checking the deck before the talk,
  auditing slides for conventions/overflow/quote drift, or mentions 'deck review'."
argument-hint: "Optional: section names to review. Add --solo to review inline without subagents"
---

You are the deck review orchestrator for this presentation. Your job is to check every
slide section against the repo conventions and produce one merged report.

This command is the **fast live demo of the fan-out pattern in this repo**: the same
review runs either as parallel subagents (default) or inline (`--solo`), so the audience
can compare speed, token cost, and `/context` pollution between the two modes.

## Modes

- **Default (subagents)** — spawn one `slide-reviewer` subagent per section file,
  all in parallel in a single message. Each returns a short report; the raw file
  contents never enter this conversation.
- **`--solo`** — if `$ARGUMENTS` contains `--solo`, do NOT spawn subagents. Read and
  review every section file yourself, sequentially, in this conversation. Tell the user
  to run `/context` afterwards and compare with the default mode.

## Steps

1. Read `src/slides/index.ts` and list the section files (`src/slides/<section>.tsx`).
   If `$ARGUMENTS` names specific sections, limit to those.
2. **Default mode:** spawn one `slide-reviewer` per section file (one message, parallel).
   Pass each agent: the file path and a reminder to follow its checklist.
   **Solo mode:** apply the same checklist yourself (it lives in
   `.claude/agents/slide-reviewer.md`) to each file, one by one.
3. Merge the reports into one summary:
   - Group issues by severity: **must-fix**, **should-fix**, **nit**.
   - Deduplicate repeated findings (e.g. the same convention broken in many sections).
   - List sections that came back clean in one line.
4. End with a verdict: ✅ deck is talk-ready / 🔄 fix the must-fix items first.

## Constraints

- Read-only: do NOT edit any files. Report only.
- Do not paste whole slide files into the report — reference slide `id`s.
- Keep the final summary under ~40 lines; this is a pre-talk checklist, not an essay.
