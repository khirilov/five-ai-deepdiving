---
name: github-pr-summary
description: "Generate a GitHub pull request summary from the current branch diff. Use when writing or updating a PR description, summarizing implemented changes or preparing reviewer notes for this repository."
argument-hint: "[optional target branch or commit range]"
---

# GitHub PR Summary

Use this skill to produce a concise PR description grounded in the actual branch delta, not memory or the current editor tab.

Reference the output template in [assets/github-pr-template.md](./assets/github-pr-template.md).

## When to Use

- The user wants a pull request summary for GitHub.
- The user wants text for the PR description based on branch changes.
- The user wants a reusable summary of what changed, how it was tested, and what a reviewer should know.

## Procedure

1. Determine the comparison base.
   Prefer an explicit user-provided target branch or commit range.
   Otherwise, compare `HEAD` against the merge-base with `origin/main`.

2. Collect branch evidence before writing.
   Inspect the current branch name, recent commits, diff stat, and changed file list.
   If the branch is broad, sample representative diffs from the main functional areas so the summary reflects behavior, not just filenames.
   Treat committed branch changes as the primary source of truth. Only include uncommitted work if the user explicitly asks for that.

3. Group the changes by reviewer-relevant outcomes.
   Prefer user-facing behavior, architecture changes, and important tooling changes.
   Do not turn the summary into a changelog or file inventory.
   Mention generated files only when they matter to review scope.

4. Write the `Summary` section.
   Keep it to 1-2 sentences.
   State what changed and why it matters.
   Use concrete product or engineering language, not vague phrasing.

5. Skip the `Testing` section, this should be done by the user.

6. Write `Notes for reviewer` only when useful.
   Include breaking changes, unrelated failing tests, generated artifacts, follow-up work, or other details that affect review.
   If there is nothing meaningful to add, omit the section content or keep it minimal.

7. Validate the output against this quality bar.
   The text is grounded in git evidence.
   The summary is concise and readable in a PR description.
   The result follows the requested schema exactly.

## Decision Points

- If the branch contains unrelated commits merged from `main`, focus on the branch-owned commits and current net diff.
- If the diff is mostly tooling or generated output, summarize the underlying reason for regeneration instead of listing generated files.
- If the branch only contains a narrow UI tweak, keep the summary narrow and avoid inflating scope.

## Output Rules

- Prefer plain Markdown.
- Match the section headings and checkbox structure requested by the user.
- Keep the tone factual and reviewer-oriented.
- Do not invent manual verification, deployment notes, or follow-up work.
- Wrap the output in a code block (raw ```markdown) so that it can be easily copied into the PR description.

## Example Prompts

- Create the GitHub PR summary for this branch.
- Summarize this branch for the PR description against `origin/main`.
- Write a PR description using the repo template and include honest testing notes.
- Generate the PR body, then open a draft PR with it via the github MCP (or `gh pr create --draft`).
