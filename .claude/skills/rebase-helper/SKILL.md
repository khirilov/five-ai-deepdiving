---
name: rebase-helper
description: "Rebase a branch onto an updated base and resolve common conflicts safely. Use when: rebasing main into a branch, replaying commits onto origin/main, resolving rebase conflicts, deciding whether to continue, skip, or abort, regenerating derived files during a rebase, or making a rebase reproducible."
argument-hint: "[optional base branch, e.g. origin/main]"
---

# Reproducible Rebase

Use this skill to execute a branch rebase as a repeatable workflow instead of ad hoc git surgery.

This skill is for cases where the agent should inspect the rebase state, classify conflicts, resolve the mechanical ones safely, and stop only when a semantic product decision is required.

## When to Use

- The user wants to rebase their branch onto `main` or another updated base branch.
- The rebase has already started and is stopped on conflicts.
- The branch contains UI, i18n, generated, or documentation changes that may have drifted from `main`.
- The user wants the process turned into a reproducible, explicit workflow.

## Outcome

Produce one of these outcomes:

1. Rebase completed cleanly with conflicts resolved and validated.
2. Rebase completed by skipping commits that were clearly superseded upstream.
3. Rebase intentionally paused because a semantic choice requires user input.
4. Rebase aborted only if the user explicitly asks for that.

## Procedure

### 1. Establish the Rebase State

Collect evidence before making decisions:

- Check the current branch and whether a rebase is active.
- Inspect `git status --short --branch`.
- If a rebase is active, inspect the replayed patch with `git rebase --show-current-patch`.
- List unmerged index entries with `git ls-files -u`.
- If useful, inspect the remaining rebase todo.

Do not guess which side is upstream and which side is the replayed commit. Verify with stage inspection (`git show :2:path` and `git show :3:path`).

### 2. Classify Each Stop

Put the conflict into one of these buckets:

- **Superseded commit**: the replayed commit introduces an older or simpler implementation and `main` already contains a newer, richer version.
- **Mechanical merge**: both sides should survive and can be combined without changing intended behavior.
- **Generated or derived artifact**: the file should be regenerated from source rather than hand-merged.
- **Ambiguous semantic conflict**: both sides change behavior in incompatible ways and the correct result is not mechanically inferable.

Use the detailed rules in [references/conflict-rules.md](./references/conflict-rules.md).

### 3. Resolve Safely

#### A. Superseded Commit

If the entire replayed commit is clearly obsolete because upstream already replaced it with a newer implementation:

- Prefer skipping the commit.
- Before skipping, verify that any branch-only additions are either unused, duplicated elsewhere, or intentionally obsolete.
- After skipping, re-check the index because stale unmerged entries may remain and still need explicit resolution.

#### B. Mechanical Merge

If both sides contribute real value:

- Keep the smallest merged result that preserves current intended behavior.
- Prefer the upstream structure when it is more complete and layer the branch-specific additions onto it.
- Stage only after inspecting the merged result conceptually, not by filename alone.

#### C. Generated or Derived Files

If the conflict is in artifacts like message catalogs, generated code, or other outputs:

- Resolve from the source of truth.
- Regenerate the file if the repository has a supported command.
- Stage the regenerated result and continue.

#### D. Ambiguous Semantic Conflict

Stop and ask the user when:

- Both sides represent valid but different product behavior.
- Choosing one side would silently drop meaningful branch intent.
- There is not enough code or usage evidence to justify `ours`, `theirs`, or `skip`.

### 4. Continue the Rebase

After each resolution:

- Stage only the files you resolved.
- Run `git rebase --continue`.
- If the next stop surfaces another commit, repeat the classification process.

Do not batch multiple uncertain decisions into one blind continue.

### 5. Validate the Result

When the rebase completes:

- Confirm the working tree is clean with `git status --short --branch`.
- Run the narrowest relevant validation for the affected package or feature.
- Prefer typecheck first, then tests or regeneration checks as appropriate.
- Mention unrelated pre-existing diagnostics separately instead of treating them as rebase failures.

### 6. Report the Decisions

Summarize:

- Which commits were merged normally.
- Which commits were skipped and why.
- Which files were regenerated.
- What validation ran.
- Any residual risks or follow-up actions, such as `git push --force-with-lease`.

## Guardrails

- Never use destructive commands like `git reset --hard` or `git checkout --` on unrelated user work.
- Never assume `:2` always means upstream semantics without verifying the current rebase state.
- Never hand-edit generated SDK files or other generated sources when regeneration exists.
- Prefer preserving upstream when the branch commit is clearly an earlier revision of the same feature.
- Ask the user instead of guessing when the conflict is product-semantic rather than structural.

## Repository Notes

For this repository:

- Follow `AGENTS.md` and repo instructions before resolving frontend, CSS, or generated-file conflicts.
- Treat i18n catalogs (e.g. Lingui) as derived artifacts when extraction can regenerate them.
- Keep generated API SDK files untouched unless regeneration is the established workflow.
- Avoid reverting unrelated work in a dirty tree.

## Example Prompts

- Rebase this branch onto `origin/main` and resolve the conflicts.
- Main moved ahead. Replay this branch on top and decide which commits should be skipped.
- I am stopped in a rebase conflict. Determine the safest resolution automatically.
- Make this rebase reproducible and explain which conflicts are mechanical versus semantic.
