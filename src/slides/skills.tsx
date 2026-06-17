import { CodeBlock } from "../components/code-block";
import {
  Bullets,
  Col,
  Cols,
  FieldTable,
  Flow,
  Note,
  SlideTitle,
  Term,
  Warn,
} from "../components/primitives";
import type { DeckSlide } from "../types";

export const skillsSlides: DeckSlide[] = [
  {
    id: "skills-what",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="skills">
          A skill is an instruction loaded <em>on demand</em>
        </SlideTitle>
        <Bullets
          items={[
            <>
              The signal it's time to write a skill: <strong>you're pasting the same
              instruction into chat for the third time</strong>, or a chunk of CLAUDE.md has
              grown from a "fact" into a "procedure".
            </>,
            <>
              <strong>Progressive disclosure:</strong> only the <Term>description</Term> (~100
              tokens) sits in context permanently. Claude reads the full skill body only when
              the skill activates.
            </>,
            <>
              CLAUDE.md is loaded <em>always and in full</em> — a skill is nearly free until you
              need it.
            </>,
            <>
              Slash commands are now <strong>merged with skills</strong>:{" "}
              <Term>.claude/commands/deploy.md</Term> and <Term>.claude/skills/deploy/SKILL.md</Term>{" "}
              both create <Term>/deploy</Term> and work the same way.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "skills-anatomy",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="skills">Anatomy: a folder + SKILL.md</SlideTitle>
        <Cols>
          <Col title="Structure">
            <CodeBlock
              lang="text"
              code={`.claude/skills/
├── grill-me/
│   └── SKILL.md
├── tdd/
│   ├── SKILL.md          ← the main file
│   ├── tests.md          ← reference docs, read
│   ├── mocking.md        ← on demand
│   └── refactoring.md
└── rebase-helper/
    ├── SKILL.md
    └── references/
        └── conflict-rules.md`}
            />
          </Col>
          <Col title="A minimal skill — our grill-me">
            <CodeBlock
              lang="markdown"
              title=".claude/skills/grill-me/SKILL.md"
              code={`---
name: grill-me
description: Interview the user relentlessly
  about a plan until reaching shared
  understanding. Use when user wants to
  stress-test a plan or mentions "grill me".
---

Interview me relentlessly about every aspect
of this plan... For each question, provide
your recommended answer.`}
            />
          </Col>
        </Cols>
        <Note>
          Supporting files next to SKILL.md are progressive disclosure too: Claude reads them
          only when it reaches the relevant step.
        </Note>
      </>
    ),
  },
  {
    id: "skills-trigger",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="skills">
          Who triggers a skill? You — or <em>Claude itself</em>
        </SlideTitle>
        <Bullets
          items={[
            <>
              <strong>You:</strong> explicitly, via <Term>/grill-me</Term>, <Term>/feature-forge</Term>...
            </>,
            <>
              <strong>Claude:</strong> decides on its own based on the <Term>description</Term>{" "}
              field — which makes it the most important field of a skill.
            </>,
          ]}
        />
        <CodeBlock
          lang="yaml"
          title="Write the description 'pushy' — with triggers (our deck-review)"
          code={`description: "Review the whole slide deck against repo conventions
  by fanning out one slide-reviewer subagent per section. Use when:
  checking the deck before the talk, auditing slides for
  conventions/overflow/quote drift, or mentions 'deck review'."`}
        />
        <Note>
          The formula: <strong>what it does + "Use when: ..." with concrete triggers</strong>.
          Claude tends to under-use skills rather than overuse them — the description has to
          "sell" the skill.
        </Note>
      </>
    ),
  },
  {
    id: "skills-frontmatter-1",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="frontmatter · 1/3">Identity and arguments</SlideTitle>
        <FieldTable
          headers={["Field", "What for"]}
          rows={[
            {
              field: "name",
              meaning: "Name in the skill listing. Defaults to the folder name.",
            },
            {
              field: "description",
              meaning:
                "What it does and when to apply it. This is how Claude decides whether to activate the skill itself.",
            },
            {
              field: "when_to_use",
              meaning:
                "Extra triggers (phrases, example requests). Appended to description; together capped at 1,536 chars in the listing.",
            },
            {
              field: "argument-hint",
              meaning: "Autocomplete hint: /feature-forge [feature name]",
            },
            {
              field: "arguments",
              meaning: "Named positional arguments for $name substitutions in the skill body.",
            },
          ]}
        />
        <CodeBlock
          lang="yaml"
          code={`argument-hint: "[issue] [branch]"
arguments: [issue, branch]   # now $issue and $branch work in the body`}
        />
      </>
    ),
  },
  {
    id: "skills-frontmatter-2",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="frontmatter · 2/3">Controlling who can invoke</SlideTitle>
        <FieldTable
          headers={["Field", "What for"]}
          rows={[
            {
              field: "disable-model-invocation: true",
              meaning:
                "Claude can NOT trigger it itself — only you via /name. For consequential actions: deploys, releases, migrations.",
            },
            {
              field: "user-invocable: false",
              meaning:
                "Hidden from the / menu. For background knowledge: 'how our legacy billing works' is knowledge, not an action.",
            },
          ]}
        />
        <Cols>
          <Col title="Deploy — manual only">
            <CodeBlock
              lang="yaml"
              code={`---
name: release
description: Release to production
disable-model-invocation: true
---`}
            />
          </Col>
          <Col title="Knowledge — for Claude only">
            <CodeBlock
              lang="yaml"
              code={`---
name: legacy-billing-context
description: How our billing works...
user-invocable: false
---`}
            />
          </Col>
        </Cols>
        <Warn>
          Don't want Claude deciding "tests are green — let's deploy"? This field exists exactly
          for that.
        </Warn>
      </>
    ),
  },
  {
    id: "skills-frontmatter-3",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="frontmatter · 3/3">Tools, model, context</SlideTitle>
        <FieldTable
          headers={["Field", "What for"]}
          rows={[
            {
              field: "allowed-tools",
              meaning: "Tools allowed without permission prompts while the skill is active: Read, Bash(git *)...",
            },
            {
              field: "disallowed-tools",
              meaning: "Tools REMOVED while the skill is active (e.g. AskUserQuestion for background loops).",
            },
            {
              field: "model / effort",
              meaning: "Switch model or effort level for the skill's duration: haiku for routine, max for audits.",
            },
            {
              field: "context: fork  +  agent",
              meaning: "Run the skill in a forked subagent context — without polluting the main conversation.",
            },
            {
              field: "paths",
              meaning: "Globs: the skill auto-activates only for matching files — \"src/**/*.tsx\".",
            },
            {
              field: "hooks",
              meaning: "Hooks that apply only while the skill is active (hooks are coming up).",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "skills-substitutions",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="skills">Substitutions: a skill becomes a template</SlideTitle>
        <FieldTable
          headers={["Placeholder", "What gets substituted"]}
          rows={[
            { field: "$ARGUMENTS", meaning: "Everything you typed after /name" },
            { field: "$0, $1 ...", meaning: "A single argument by position" },
            { field: "$issue", meaning: "Named argument from arguments: [issue, ...]" },
            { field: "${CLAUDE_SKILL_DIR}", meaning: "The skill's folder — for paths to bundled scripts" },
            { field: "!`git status`", meaning: "Dynamic context: the command runs, its output is inlined into the skill body" },
          ]}
        />
        <CodeBlock
          lang="markdown"
          title="Example: dynamic context in a skill body"
          code={`## Current repository state

Branch and changes:
!\`git status --short --branch\`

Analyze the changes and prepare $0 commit(s).`}
        />
      </>
    ),
  },
  {
    id: "skills-live-deck-stats",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="live demo">
          A skill from this repo: <em>/deck-stats</em>
        </SlideTitle>
        <CodeBlock
          lang="markdown"
          title=".claude/skills/deck-stats/SKILL.md"
          code={`---
name: deck-stats
description: "Compute quick stats for this slide deck: slides per
  section, total count, biggest slides, code-block usage. Use when:
  asking how many slides there are, deck statistics, or mentions
  'deck stats'."
allowed-tools: Read, Glob, Grep
context: fork
agent: Explore
---

Compute statistics for the slide deck and return ONLY the compact
summary below.

This skill runs with \`context: fork\` — the whole analysis (reading
every slides file) happens in a forked subagent context...`}
        />
        <Note>
          Live: <Term>/context</Term> → <Term>/deck-stats</Term> → <Term>/context</Term> — the
          deck files never landed in the main window.
        </Note>
      </>
    ),
  },
  {
    id: "skills-feature-forge",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="composition">
          /feature-forge — a skill that <em>conducts</em> other skills
        </SlideTitle>
        <Flow steps={["DISCOVER", "DESIGN", "REVIEW", "BUILD", "FINALIZE"]} />
        <Bullets
          items={[
            <>
              Every phase is a <strong>separate skill</strong>: <Term>grill-me</Term> (extracts
              requirements) → <Term>design-an-interface</Term> (3+ design alternatives) →{" "}
              <Term>tdd</Term> (red-green-refactor).
            </>,
            <>
              The orchestrator only owns the process: no skipping phases, explicit approval
              between phases, the spec is saved to a file (survives context limits).
            </>,
            <>
              Small skills are reusable on their own: <Term>/grill-me</Term> is useful without
              feature-forge too.
            </>,
          ]}
        />
        <Note>
          The pattern is "skill = function, orchestrator = main()". Both forge variants
          (<Term>/feature-forge</Term>, <Term>/feature-forge-solo</Term>) are{" "}
          <Term>disable-model-invocation: true</Term> — you type them with the feature
          description; Claude never self-triggers a 5-phase build.
        </Note>
      </>
    ),
  },
  {
    id: "skills-when-to-write",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="skills · when">Write a skill when…</SlideTitle>
        <Cols>
          <Col title="✅ Make it a skill">
            <Bullets
              items={[
                <>You've pasted the same instruction into chat a third time.</>,
                <>
                  A chunk of CLAUDE.md grew from a <em>fact</em> into a multi-step{" "}
                  <em>procedure</em>.
                </>,
                <>The task has a repeatable shape: review, release, scaffold, migrate.</>,
                <>You want a cheap, on-demand reference — not always-loaded weight.</>,
              ]}
            />
          </Col>
          <Col title="❌ Don't reach for a skill">
            <Bullets
              items={[
                <>
                  A one-off request — just ask. A skill is for the <em>third</em> time, not the
                  first.
                </>,
                <>
                  A always-true fact or convention → that's <Term>CLAUDE.md</Term>.
                </>,
                <>
                  You need an external system (browser, GitHub) → that's <Term>MCP</Term>.
                </>,
                <>
                  You need a guarantee, not a request → that's a <Term>hook</Term>.
                </>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          Rule of thumb: <strong>facts → CLAUDE.md, procedures → skills, guarantees → hooks,
          outside world → MCP.</strong>
        </Note>
      </>
    ),
  },
  {
    id: "skills-rules",
    section: "Skills",
    content: (
      <>
        <SlideTitle kicker="skills · how">
          What to write in a skill — and the behavior it <em>buys</em>
        </SlideTitle>
        <FieldTable
          headers={["Write this", "…and you buy this behavior"]}
          rows={[
            {
              field: 'description = "what it does + Use when: <triggers>"',
              meaning:
                "Claude actually self-triggers it. A vague description = a skill that never fires.",
            },
            {
              field: '"If the answer is in the codebase, investigate — don\'t ask"',
              meaning: "One line that kills ~80% of dumb clarifying questions.",
            },
            {
              field: "Explicit phases + 'no proceeding without approval'",
              meaning: "Stops the model from sprinting to code on the first message.",
            },
            {
              field: "disable-model-invocation: true (for deploys, releases)",
              meaning: "Consequential actions stay manual — never auto-triggered.",
            },
            {
              field: "Persist artifacts to files (specs → docs/)",
              meaning: "Long processes survive /compact and even a new session.",
            },
            {
              field: "Compose by name (grill-me → design → tdd)",
              meaning: "Small skills stay reusable; the orchestrator only owns the process.",
            },
          ]}
        />
        <Note>
          The skill body is <strong>behavioral rails</strong>, not documentation. Write the
          sentence that prevents the mistake you keep seeing.
        </Note>
      </>
    ),
  },
];
