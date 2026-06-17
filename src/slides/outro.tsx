import { CodeBlock } from "../components/code-block";
import {
  BigStatement,
  Bullets,
  Col,
  Cols,
  Flow,
  Note,
  SlideTitle,
  Term,
} from "../components/primitives";
import type { DeckSlide } from "../types";

export const outroSlides: DeckSlide[] = [
  {
    id: "start-tomorrow",
    section: "Wrap-up",
    content: (
      <>
        <SlideTitle kicker="wrap-up">Where to start tomorrow</SlideTitle>
        <Bullets
          items={[
            <>
              <strong>1.</strong> Open <Term>/context</Term> — see what actually eats your
              window.
            </>,
            <>
              <strong>2.</strong> Extract one procedure from CLAUDE.md into a skill with a
              proper <Term>description</Term>.
            </>,
            <>
              <strong>3.</strong> Create one subagent for your most frequent side task
              (read-only tools + a cheap model).
            </>,
            <>
              <strong>4.</strong> Add two hooks: typecheck after Edit and a notification on
              Stop.
            </>,
            <>
              <strong>5.</strong> Commit <Term>.claude</Term> into the repository — your skills
              become the whole team's skills.
            </>,
          ]}
        />
        <Note>
          Everything from this talk is in the repository: slides, skills, agents, hooks. Clone
          it and dig in.
        </Note>
      </>
    ),
  },
  {
    id: "learning-machine",
    section: "Wrap-up",
    content: (
      <>
        <SlideTitle kicker="bonus">
          Claude as a <em>learning machine</em>
        </SlideTitle>
        <Cols>
          <Col title="Turn it on — a built-in style, not an MCP">
            <CodeBlock
              lang="text"
              code={`# pick it in the config menu:
/config  →  Output style  →  Learning | Explanatory

# or set it directly in .claude/settings.local.json:
{ "outputStyle": "Learning" }

# applies after /clear or a new session
# (the old /output-style command was removed in v2.1.91)`}
            />
          </Col>
          <Col title="What changes">
            <Bullets
              items={[
                <>
                  <strong>Learning:</strong> Claude writes the boilerplate but stops at
                  decision points and asks <em>you</em> to write 5–10 lines of the real logic.
                </>,
                <>
                  <strong>Explanatory:</strong> every non-obvious choice comes with a short{" "}
                  <Term>★ Insight</Term> — why this pattern, what the trade-off is.
                </>,
                <>
                  Works for any topic: "teach me Zod by building a form validator with me".
                </>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          Distribute it to the team as a plugin instead:{" "}
          <Term>claude plugin install learning-output-style@claude-code-plugins</Term>. Same
          instructions, applied via a SessionStart hook.
        </Note>
      </>
    ),
  },
  {
    id: "learning-loop",
    section: "Wrap-up",
    content: (
      <>
        <SlideTitle kicker="bonus · how">
          We wrapped the loop in a skill: <em>/learn-with-me</em>
        </SlideTitle>
        <Flow steps={["SCOPE", "PLAN → file", "LEARN", "QUIZ", "REVIEW"]} />
        <Cols>
          <Col title="What the skill does">
            <Bullets
              items={[
                <>
                  <strong>SCOPE:</strong> a <Term>grill-me</Term> interview — what exactly to
                  learn, your level, the success test.
                </>,
                <>
                  <strong>PLAN:</strong> writes an ordered plan to{" "}
                  <Term>docs/learning-plans/&lt;topic&gt;-plan.md</Term> — topics, order, and the
                  lines <em>you'll</em> write. A file, so it outlives the session.
                </>,
                <>
                  <strong>LEARN:</strong> scaffolds, then stops at a <Term>TODO(human)</Term> — you
                  write the load-bearing code.
                </>,
                <>
                  <strong>QUIZ → REVIEW:</strong> <Term>grill-me</Term> on what you wrote, tick the
                  item, resume next session right where you stopped.
                </>,
              ]}
            />
          </Col>
          <Col title="Why a skill, not just a vibe">
            <Bullets
              items={[
                <>
                  The loop becomes <strong>enforceable</strong>: one item at a time, no code dump,
                  no moving on past a failed quiz.
                </>,
                <>
                  Pairs with <Term>Learning</Term> output style and <Term>context7</Term> (current
                  API, not a 2-year-old one).
                </>,
                <>
                  Same lesson as <Term>feature-forge</Term>: the process lives in a file you can
                  reuse and share — not in one chat.
                </>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          Live in this repo: <Term>/learn-with-me &lt;topic&gt;</Term> → it grills you, writes the
          plan file, then coaches one item at a time. Mode instructions are a small standing cost —
          back to <strong>Default</strong> when you're done.
        </Note>
      </>
    ),
  },
  {
    id: "questions",
    section: "Wrap-up",
    content: (
      <BigStatement sub="Slides, skills, agents, and hooks — all live in this repo. Clone it and dig in.">
        Questions?
      </BigStatement>
    ),
  },
];
