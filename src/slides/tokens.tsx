import { CodeBlock } from "../components/code-block";
import {
  Bullets,
  Col,
  Cols,
  FieldTable,
  Note,
  SlideTitle,
  Term,
  Warn,
} from "../components/primitives";
import type { DeckSlide } from "../types";

export const tokensSlides: DeckSlide[] = [
  {
    id: "tokens-where",
    section: "Tokens",
    content: (
      <>
        <SlideTitle kicker="tokens">Where the tokens actually go</SlideTitle>
        <FieldTable
          headers={["Source", "How much and why"]}
          rows={[
            {
              field: "System prompt + tools",
              meaning: "~20–25k baseline, in every request. Not under your control.",
            },
            {
              field: "MCP servers",
              meaning:
                "Tool schemas: Chrome DevTools MCP ≈ 18k tokens once loaded. Newer Claude Code defers schemas until first use — check the real cost in /context.",
            },
            {
              field: "CLAUDE.md + rules",
              meaning: "Loaded in full, always. A bloated CLAUDE.md is a tax on every request.",
            },
            {
              field: "History + tool results",
              meaning: "The biggest eater: command output, file contents, logs — it all settles in context.",
            },
            {
              field: "Output (responses)",
              meaning: "Model chatter: 'Great question!', restating the task, half-page summaries.",
            },
          ]}
        />
        <Note>
          Step one is always <Term>/context</Term>: it shows the context breakdown by category.
          Don't optimize blind.
        </Note>
      </>
    ),
  },
  {
    id: "tokens-builtin",
    section: "Tokens",
    content: (
      <>
        <SlideTitle kicker="tokens">Built-in mechanics — start here</SlideTitle>
        <FieldTable
          headers={["Tool", "When"]}
          rows={[
            { field: "/context", meaning: "Diagnostics: what exactly occupies the window" },
            {
              field: "/clear",
              meaning: "New independent task = clean context. The most underrated command.",
            },
            {
              field: "/compact",
              meaning: "Compress history into a summary. Auto-microcompact works too, but deliberate compaction is better.",
            },
            {
              field: "model per task",
              meaning: "Subagents on haiku/sonnet for routine — the model field in frontmatter.",
            },
            {
              field: "effort",
              meaning: "low/medium for simple tasks — less 'thinking', fewer tokens.",
            },
            {
              field: "Explore agent",
              meaning: "Codebase search in someone else's context instead of polluting yours.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "tokens-model-effort",
    section: "Tokens",
    content: (
      <>
        <SlideTitle kicker="tokens">
          Two dials that change the bill: <em>model</em> and <em>effort</em>
        </SlideTitle>
        <Cols>
          <Col title="/model — who does the work">
            <FieldTable
              headers={["Option", "What it does"]}
              rows={[
                { field: "default", meaning: "Opus, then auto-switches to Sonnet past ~50% usage." },
                {
                  field: "opusplan",
                  meaning: "Opus thinks in Plan Mode → Sonnet writes the code. Reasoning where it matters, cheap execution.",
                },
                { field: "sonnet / haiku", meaning: "Pin a cheaper model for a whole session of routine work." },
              ]}
            />
            <Note>
              <Term>/model opusplan</Term> is the one-command answer to "use the smart model only
              where it pays".
            </Note>
          </Col>
          <Col title="effort — how hard it thinks">
            <FieldTable
              headers={["Level", "When"]}
              rows={[
                { field: "low", meaning: "Subagents, routine, latency-sensitive." },
                { field: "medium", meaning: "Cost-sensitive, simple tasks." },
                { field: "high", meaning: "Default in Claude Code; most real work." },
                { field: "xhigh", meaning: "Best for coding / agentic loops." },
                { field: "max", meaning: "Correctness > cost; can overthink." },
              ]}
            />
            <Note>
              Set per skill/agent in frontmatter (<Term>effort: low</Term>) — or globally. Lower
              effort = fewer tokens, terser, fewer tool calls.
            </Note>
          </Col>
        </Cols>
      </>
    ),
  },
  {
    id: "tokens-caveman",
    section: "Tokens",
    content: (
      <>
        <SlideTitle kicker="tokens">
          Caveman: <em>"why use many token when few token do trick"</em>
        </SlideTitle>
        <Cols>
          <Col title="What it does">
            <Bullets
              items={[
                <>
                  A skill-plugin that cuts the chatter: no "Great question!", no restating the
                  task, no "let me know if..." — telegraphic style.
                </>,
                <>
                  On average <strong>−65% output tokens</strong> (range 22–87%).
                </>,
                <>
                  <strong>The code stays identical.</strong> Caveman makes the mouth smaller,
                  not the brain.
                </>,
              ]}
            />
            <Warn>
              Honestly: it doesn't touch thinking tokens. The savings are on visible responses.
            </Warn>
          </Col>
          <Col title="Install and modes">
            <CodeBlock
              lang="bash"
              code={`claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman

# modes:
/caveman lite   # remove only the filler
/caveman full   # fragments, articles dropped
/caveman ultra  # maximum compression`}
            />
          </Col>
        </Cols>
      </>
    ),
  },
  {
    id: "tokens-checklist",
    section: "Tokens",
    content: (
      <>
        <SlideTitle kicker="tokens">The savings checklist</SlideTitle>
        <Bullets
          items={[
            <>
              <strong>Disable MCP servers you don't use daily</strong> — each one hangs
              thousands of schema tokens onto every request.
            </>,
            <>
              <strong>Procedures from CLAUDE.md → into skills</strong>: the description hangs
              around (~100 tokens), the body loads on demand.
            </>,
            <>
              <Term>paths</Term> on skills and <Term>disable-model-invocation</Term> for rare
              ones — fewer descriptions in the listing.
            </>,
            <>
              <strong>Subagents on cheap models</strong> + <Term>maxTurns</Term> as an emergency
              brake.
            </>,
            <>
              <Term>/clear</Term> between tasks, <Term>/compact</Term> on long sessions —
              deliberately, not when it's already burning.
            </>,
            <>
              Monitoring: <Term>/usage</Term> in Claude Code, <Term>ccusage</Term> for
              per-session stats.
            </>,
          ]}
        />
      </>
    ),
  },
];
