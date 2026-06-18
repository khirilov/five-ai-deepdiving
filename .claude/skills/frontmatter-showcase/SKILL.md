---
name: frontmatter-showcase
description: "Read-only repo-hygiene report (TODO/FIXME count, biggest source files,
  stale TODOs). Use when: asked for a repo health check or hygiene report."
when_to_use: >
  When the user says "repo hygiene", "health check", "any TODOs left",
  "what are the biggest files", or runs /frontmatter-showcase directly.
# --- arguments: positional, usable as $area in the body ---
argument-hint: "[area]"
arguments: [area]
# --- who can invoke: this one is a safe read-only report, so we let Claude
#     trigger it AND keep it in the / menu. (Flip these for consequential skills.)
disable-model-invocation: false
user-invocable: true
# --- auto-activation scope: only consider this skill when the touched files
#     are sources. A doc-only change won't pull this description into the listing.
paths:
  - "src/**/*.{ts,tsx}"
  - ".claude/**/*.md"
# --- tools: allow exactly the read-only set without permission prompts, and
#     explicitly REMOVE anything that writes or interrupts. This is the safety
#     boundary: even if the body asked to edit, the tool isn't available.
allowed-tools: Read, Glob, Grep, Bash(git log:*), Bash(git status:*)
disallowed-tools: Edit, Write, AskUserQuestion
# --- cost knobs: a hygiene scan is routine, so run it cheap and terse.
model: haiku
effort: low
# --- a hook scoped to THIS skill only: announce start, gone when the skill ends.
hooks:
  PreToolUse:
    - matcher: "Grep"
      hooks:
        - type: command
          command: "echo 'hygiene scan…' 1>&2"
---

# Repo-hygiene report

A deliberately small, **read-only** skill whose real job is to be the one file you
open on stage to point at every frontmatter knob the slide listed. It still does
something useful so it isn't a fake: a quick hygiene scan of the repo.

`$area` (optional) narrows the scan to a subtree, e.g. `/frontmatter-showcase src/slides`.
If empty, scan the whole repo.

## Steps

1. **TODO/FIXME tally.** `Grep` for `TODO|FIXME|HACK|XXX` across `$area` (or the repo).
   Report the count and the top 5 file:line hits.
2. **Biggest source files.** `Glob` `src/**/*.{ts,tsx}`, read line counts, list the 5
   largest. Flag any over 400 lines as split candidates.
3. **Stale markers.** From `git log`, note any TODO whose surrounding file hasn't been
   touched in the last 20 commits — likely forgotten.

## Output — return ONLY this

```
Hygiene · <area or "whole repo">
  TODO/FIXME: <n>   (top: <file:line>, …)
  Largest:    <file> (<n> lines), …
  Stale:      <file:line> — untouched in last 20 commits
```

No prose, no suggestions to fix — this is a report, not a refactor. With `effort: low`
and `model: haiku` it stays fast and cheap; that's the point of those two fields.
