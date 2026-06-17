import { CodeBlock } from "../components/code-block";
import {
  BigStatement,
  Bullets,
  Col,
  Cols,
  FieldTable,
  Flow,
  Note,
  SlideTitle,
  Term,
} from "../components/primitives";
import type { DeckSlide } from "../types";

export const agentsSlides: DeckSlide[] = [
  {
    id: "agents-why",
    section: "Subagents",
    content: (
      <>
        <BigStatement sub="A subagent works in its OWN context window and returns only a summary to the conversation.">
          Researching 50 files ≈ 40,000 tokens.
          <br />
          The report from it ≈ 500.
        </BigStatement>
        <Note>
          If a side task would flood your main conversation with search results, logs, or file
          contents you'll never look at again — that's a job for a subagent.
        </Note>
      </>
    ),
  },
  {
    id: "agents-format",
    section: "Subagents",
    content: (
      <>
        <SlideTitle kicker="subagents">
          The format: <em>.claude/agents/name.md</em>
        </SlideTitle>
        <FieldTable
          headers={["Field", "What for"]}
          rows={[
            { field: "name", meaning: "Identifier: lowercase-with-hyphens. Required." },
            {
              field: "description",
              meaning: "When to delegate to this agent — Claude decides based on it. Required.",
            },
            {
              field: "tools / disallowedTools",
              meaning: "Which tools are available. Omitted = inherits all. A read-only agent is a safe agent.",
            },
            {
              field: "model",
              meaning: "sonnet | haiku | opus | inherit. Cheap model for mass routine work.",
            },
            { field: "permissionMode", meaning: "default | acceptEdits | plan | bypassPermissions..." },
            { field: "maxTurns", meaning: "Emergency brake: maximum number of agentic turns." },
            {
              field: "skills",
              meaning: "Skills injected IN FULL into the agent's context at startup (not just descriptions).",
            },
            {
              field: "memory",
              meaning: "user | project | local — the agent learns across sessions (writes notes to itself).",
            },
            {
              field: "isolation: worktree",
              meaning: "A separate git worktree — the agent works on an isolated copy of the repo.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "agents-builtin",
    section: "Subagents",
    content: (
      <>
        <SlideTitle kicker="subagents">The built-ins already work for you</SlideTitle>
        <FieldTable
          headers={["Agent", "What it does"]}
          rows={[
            {
              field: "Explore",
              meaning:
                "Read-only codebase search. 'Find where we handle authorization' — returns a conclusion, not files.",
            },
            {
              field: "Plan",
              meaning: "An architect: researches and returns an implementation plan with key files.",
            },
            {
              field: "general-purpose",
              meaning: "Universal: multi-step side tasks with all tools.",
            },
          ]}
        />
        <Bullets
          items={[
            <>
              Write your own agent when you <strong>keep spawning the same worker</strong> with
              the same instructions.
            </>,
            <>
              Invocation: Claude delegates on its own based on the description, or explicitly —
              "use the mantine-css-audit-worker agent for ...".
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "agents-vs-commands",
    section: "Subagents",
    content: (
      <>
        <SlideTitle kicker="key nuance">
          Skill or subagent? The question is <em>interactivity</em>
        </SlideTitle>
        <Cols>
          <Col title="Skill / command — in the main conversation">
            <Bullets
              items={[
                <>Can ask the user questions (a grill-me session)</>,
                <>Can spawn subagents</>,
                <>Shares context with the main conversation</>,
              ]}
            />
          </Col>
          <Col title="Subagent — autonomous">
            <Bullets
              items={[
                <>
                  <strong>Cannot talk to you mid-run</strong> — takes a prompt, returns one
                  report
                </>,
                <>Its own clean context</>,
                <>Perfect for read-only audits and parallel work</>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          That's exactly why in this repo <Term>mr-reviewer</Term> and <Term>feature-forge</Term>{" "}
          are commands (they interview the user), while <Term>mantine-css-audit-worker</Term> is
          a subagent (audits silently and reports). Details in <Term>.claude/README.md</Term>.
        </Note>
      </>
    ),
  },
  {
    id: "agents-fanout",
    section: "Subagents",
    content: (
      <>
        <SlideTitle kicker="a pattern from this repo">
          Fan-out: orchestrator → N workers → reconciler
        </SlideTitle>
        <Flow steps={["/mantine-css-auditor", "worker × N (parallel)", "reconciler", "report"]} />
        <CodeBlock
          lang="yaml"
          title=".claude/agents/mantine-css-audit-worker.md — frontmatter"
          code={`---
name: mantine-css-audit-worker
description: "Run one read-only Mantine CSS audit pass for a React
  feature or file. Use when: a parent agent needs an independent
  audit proposal..."
tools: Read, Grep, Glob, WebFetch   # read-only: can't break anything
model: sonnet                        # cheaper than opus, enough for an audit
---`}
        />
        <Bullets
          items={[
            <>Each worker reviews its slice of code independently — in its own context.</>,
            <>The reconciler merges the reports, removing duplicates and conflicts.</>,
            <>The main conversation receives one final report.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "agents-forge-compare",
    section: "Subagents",
    content: (
      <>
        <SlideTitle kicker="live comparison">
          feature-forge: the DESIGN phase <em>with</em> and <em>without</em> subagents
        </SlideTitle>
        <Cols>
          <Col title="/feature-forge (with subagents)">
            <Bullets
              items={[
                <>3 × design-explorer in parallel, each with its own constraint</>,
                <>3 genuinely independent perspectives — no anchoring on the first idea</>,
                <>Research drafts never reach the main context</>,
                <>Faster (parallel), but pricier (3 separate contexts)</>,
              ]}
            />
          </Col>
          <Col title="/feature-forge-solo (without)">
            <Bullets
              items={[
                <>One context generates all 3 alternatives sequentially</>,
                <>Alternatives "peek" at each other — less diversity</>,
                <>All the research settles into the main conversation</>,
                <>Cheaper and easier to debug — fine for small features</>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          Demo: run both modes and compare <Term>/context</Term>. Quick version of the same
          experiment: <Term>/deck-review</Term> vs <Term>/deck-review --solo</Term> — 7 parallel
          slide reviewers (on haiku) vs one inline pass.
        </Note>
      </>
    ),
  },
];
