import { CodeBlock } from "../components/code-block";
import {
  BigStatement,
  Bullets,
  Col,
  Cols,
  FieldTable,
  Note,
  SlideTitle,
  Term,
} from "../components/primitives";
import type { DeckSlide } from "../types";

export const hooksSlides: DeckSlide[] = [
  {
    id: "hooks-what",
    section: "Hooks",
    content: (
      <>
        <BigStatement sub="A hook is deterministic code that runs on a Claude Code lifecycle event.">
          A prompt is a <em>request</em>.<br />
          A hook is a <em>guarantee</em>.
        </BigStatement>
        <Bullets
          items={[
            <>
              "Run the tests after changes" in CLAUDE.md — Claude <strong>might</strong> forget.
            </>,
            <>
              A <Term>PostToolUse</Term> hook on <Term>Edit|Write</Term> — the tests run{" "}
              <strong>every time</strong>. It's not the model deciding — it's code.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "hooks-events",
    section: "Hooks",
    content: (
      <>
        <SlideTitle kicker="hooks">The key events</SlideTitle>
        <FieldTable
          headers={["Event", "When it fires"]}
          rows={[
            { field: "SessionStart", meaning: "Session starts/resumes — inject context (git status)" },
            { field: "UserPromptSubmit", meaning: "You sent a prompt, Claude hasn't seen it yet — can append or block" },
            { field: "PreToolUse", meaning: "Before a tool call — CAN BLOCK (deny/ask/allow)" },
            { field: "PostToolUse", meaning: "After a successful call — lint after Edit, typecheck after Write" },
            { field: "PermissionRequest", meaning: "A permission dialog appeared — can auto-decide" },
            { field: "Stop", meaning: "Claude finished responding — notification, final check" },
            { field: "SubagentStart / SubagentStop", meaning: "Subagent lifecycle" },
            { field: "PreCompact / PostCompact", meaning: "Around context compaction" },
            { field: "SessionEnd", meaning: "Session ends — cleanup" },
          ]}
        />
        <Note>
          There are 30+ events — also <Term>FileChanged</Term>, <Term>Notification</Term>,{" "}
          <Term>TaskCompleted</Term>... To inspect what's configured: the <Term>/hooks</Term>{" "}
          command.
        </Note>
      </>
    ),
  },
  {
    id: "hooks-config",
    section: "Hooks",
    content: (
      <>
        <SlideTitle kicker="hooks">Configuration: settings.json</SlideTitle>
        <CodeBlock
          lang="json"
          title=".claude/settings.json — typecheck after every code edit"
          code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm --silent typecheck",
            "async": true,
            "statusMessage": "typecheck..."
          }
        ]
      }
    ]
  }
}`}
        />
        <Bullets
          items={[
            <>
              <Term>matcher</Term> — tool name: <Term>Bash</Term>, <Term>Edit|Write</Term>, regex{" "}
              <Term>mcp__.*</Term>.
            </>,
            <>
              Exit code <Term>0</Term> = OK; <Term>2</Term> = block, stderr goes back to Claude
              as feedback — it will go fix the problem.
            </>,
            <>
              Hook types: <Term>command</Term>, <Term>prompt</Term> (ask the model yes/no),{" "}
              <Term>agent</Term>, <Term>http</Term>, <Term>mcp_tool</Term>.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "hooks-this-repo",
    section: "Hooks",
    content: (
      <>
        <SlideTitle kicker="live demo">This repository's hooks</SlideTitle>
        <FieldTable
          headers={["Hook", "What it does"]}
          rows={[
            {
              field: "PostToolUse · Edit|Write",
              meaning: "Runs typecheck asynchronously after every edit — a broken type shows up immediately.",
            },
            {
              field: "PreToolUse · Bash(git push*)",
              meaning: "deny: pushing is manual. Claude physically can't push, whatever it decides.",
            },
            {
              field: "Stop",
              meaning: "A sound signal — you hear when a long task finishes (coffee-proof).",
            },
          ]}
        />
        <Note>
          They live in <Term>.claude/settings.json</Term> — committed to git, so{" "}
          <strong>the whole team gets identical behavior</strong>. Let's inspect via{" "}
          <Term>/hooks</Term>.
        </Note>
      </>
    ),
  },
  {
    id: "hooks-scoped",
    section: "Hooks",
    content: (
      <>
        <SlideTitle kicker="hooks">
          Hooks in skills and agents — active <em>only while they run</em>
        </SlideTitle>
        <Cols>
          <Col title="The tdd skill with a guarantee">
            <CodeBlock
              lang="yaml"
              code={`---
name: tdd
description: Test-driven development with
  red-green-refactor loop...
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "pnpm --silent typecheck"
---`}
            />
          </Col>
          <Col title="What this buys you">
            <Bullets
              items={[
                <>
                  While a TDD session runs — every edit is checked. The skill ends — the hook is
                  gone.
                </>,
                <>Global hooks = project rules. Skill hooks = process rules.</>,
                <>
                  Comparison: feature-forge <strong>without a hook</strong> — "check types in
                  FINALIZE" is an instruction in text, can be forgotten.{" "}
                  <strong>With a hook</strong> — the phase won't pass with a red typecheck.
                </>,
              ]}
            />
          </Col>
        </Cols>
      </>
    ),
  },
];
