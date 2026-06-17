// PreToolUse hook: blocks git push from Claude — pushing is manual only.
// Talk demo: a hook is a guarantee, not a request. Whatever the model "decides",
// this code always runs and returns deny.
//
// Input: JSON on stdin ({ tool_input: { command: "..." }, ... })
// Output: permissionDecision JSON (exit 0), or nothing — then the normal permission flow applies.

let raw = "";
for await (const chunk of process.stdin) {
  raw += chunk;
}

let command = "";
try {
  command = JSON.parse(raw)?.tool_input?.command ?? "";
} catch {
  process.exit(0); // could not parse — stay out of the way
}

if (/\bgit\s+push\b/.test(command)) {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason:
          "git push blocked by hook: in this repo we push manually only.",
      },
    }),
  );
}

process.exit(0);
