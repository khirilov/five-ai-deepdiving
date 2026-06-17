---
name: focused-refactor
description: "Execute a scoped refactor end-to-end with validation. Use when: refactoring a specific piece of code, extracting a component or hook, inlining abstractions, replacing a pattern, moving code between features, renaming across files, simplifying logic, or mentions 'focused refactor'."
argument-hint: "Describe the refactor (e.g. 'extract user menu into its own feature', 'replace useState with URL search params in sidebar')"
---

# Focused Refactor

Execute a single, scoped refactoring from analysis through validation — no planning documents, no issues, just working code.

## Philosophy

Follow Martin Fowler's discipline: **each step must leave the codebase in a working state.** Never combine a behavior change with a structural change. If tests break, the step was too big — split it.

## Procedure

### 1. Scope Lock

Before touching any code:

- [ ] Confirm with the user: **what** is being refactored and **why**
- [ ] Identify the boundary — which files/modules are in scope
- [ ] Identify what is explicitly **out of scope** (resist scope creep)
- [ ] State the expected end state in one sentence

If the user's description is vague, ask exactly one round of targeted questions. Do not proceed until scope is clear.

### 1b. Safety Net

Stash current work before making any changes:

```bash
git stash push -m "pre-refactor: <short description of the refactor>"
```

This gives a clean rollback point if the refactor goes sideways.

### 2. Explore

Read the code that will change. Understand:

- [ ] Current structure (files, exports, dependencies)
- [ ] Who consumes the code being refactored (imports, call sites)
- [ ] Existing test coverage (unit, component, stories)
- [ ] Any generated files nearby that must not be touched (`*.gen.ts`, `routeTree.gen.ts`)

Use code search (Grep/Glob) to trace usage. Do not guess — verify.

### 3. Plan the Steps

Break the refactor into the **smallest safe steps**. Each step must:

- Be independently committable
- Leave typecheck and tests green
- Change structure OR behavior, never both at once

Present the step list to the user and **wait for explicit approval** before executing. Typical step patterns:

| Refactor Type | Step Pattern |
|---|---|
| Extract component/hook | 1. Create new file with copied code → 2. Update original to import new unit → 3. Remove dead code |
| Move between features | 1. Copy to target → 2. Update imports at all call sites → 3. Delete from source |
| Replace pattern | 1. Introduce new pattern alongside old → 2. Migrate call sites one by one → 3. Remove old pattern |
| Inline/simplify | 1. Inline at call sites → 2. Remove the abstraction → 3. Clean up unused imports |
| Rename | 1. Rename export → 2. Update all import sites → 3. Rename file if needed |

### 4. Execute

For **each step**:

1. Make the change
2. Run validation (see below)
3. Confirm green before moving to the next step

If a step causes failures, **fix or revert that step** before proceeding. Do not accumulate broken state.

### 5. Validate

**After every step**, run structural checks:

```bash
pnpm typecheck          # Must pass
```

**After the final step**, also run tests for affected code if the project has them.

If a Storybook story exists for the refactored component, note it to the user for manual verification.

### 6. Wrap Up

- [ ] Confirm all validations pass
- [ ] Summarize what changed (files modified/created/deleted)
- [ ] Flag any follow-up work discovered but left out of scope

## Ground Rules

- **No feature additions.** A refactor changes structure, not behavior.
- **No speculative cleanup.** Only touch code within the agreed scope.
- **Respect generated files.** Never edit `*.gen.ts` or `routeTree.gen.ts`.
- **Respect conventions.** Follow `AGENTS.md` for file naming, component structure, and code organization.
- **Small steps over big bangs.** If unsure whether a step is safe, split it further.
