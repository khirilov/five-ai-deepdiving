---
name: deck-stats
description: "Compute quick stats for this slide deck: slides per section, total count,
  biggest slides, code-block usage. Use when: asking how many slides there are, deck
  statistics, or mentions 'deck stats'."
allowed-tools: Read, Glob, Grep
context: fork
agent: Explore
---

Compute statistics for the slide deck and return ONLY the compact summary below.

This skill runs with `context: fork` — the whole analysis (reading every slides file)
happens in a forked subagent context, and only the small stats table returns to the main
conversation. Live demo: run `/context` before and after to show that the deck files
never landed in the main window.

## Steps

1. Read `src/slides/index.ts` to get the section order.
2. For each `src/slides/<section>.tsx`: count the slide objects (`id:` occurrences),
   note the slide with the most content lines, and count `CodeBlock` usages.
3. Compute totals across the deck.

## Output (your only output — keep it under 20 lines)

```markdown
## Deck stats
| Section | Slides | CodeBlocks |
| --- | --- | --- |
| intro | N | N |
| ...   |   |   |

Total: N slides · N code blocks
Biggest slide: <id> (~N lines of content) — check it for overflow.
```
