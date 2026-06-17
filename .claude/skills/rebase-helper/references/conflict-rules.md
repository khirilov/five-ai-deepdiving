# Conflict Rules

Use these rules to classify a rebase stop before editing anything.

## 1. Superseded Commit

Signals:

- The replayed commit adds an initial or simplified implementation.
- Upstream now contains a richer version of the same feature.
- The branch-only files are unused, duplicated, or intentionally replaced.

Preferred action:

- Skip the commit if its intent is already preserved upstream.
- Re-check `git ls-files -u` after skipping because stale unmerged entries may remain.

## 2. Selective Keep-Upstream

Signals:

- A later commit tries to delete docs, wiring, or support files that upstream now actively uses.
- The branch change was reasonable when authored but is obsolete after upstream evolution.

Preferred action:

- Keep the current upstream version for those files.
- Continue the rebase and let Git determine whether the commit becomes empty or partially applies.

## 3. Derived Catalog or Generated File

Signals:

- The conflict is in i18n `.po` files, lockfiles, or other generated artifacts.
- The source files already express the intended final behavior.

Preferred action:

- Regenerate from source instead of hand-merging text.
- Stage the regenerated files to mark the conflict resolved.

## 4. Mechanical Union

Signals:

- Both sides add independent entries or non-overlapping logic.
- The intended final behavior is the union of both changes.

Preferred action:

- Build the minimal merged result.
- Preserve existing public APIs and repo conventions.

## 5. Ask the User

Ask instead of deciding alone when:

- Both sides changed product behavior in conflicting ways.
- Either choice would drop meaningful UX or business logic.
- The codebase evidence does not justify a purely mechanical resolution.

## Useful Inspection Commands

```bash
git status --short --branch
git rebase --show-current-patch
git ls-files -u
git show :2:path/to/file
git show :3:path/to/file
```

## Repo-Specific Note

If the repository uses i18n extraction (e.g. Lingui), prefer regeneration as the conflict resolution path for message catalogs when the source files already reflect the intended final state.
