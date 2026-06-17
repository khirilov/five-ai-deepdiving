import { Bullets, Flow, Note, SlideTitle, Term } from "../components/primitives";
import type { DeckSlide } from "../types";

export const introSlides: DeckSlide[] = [
  {
    id: "title",
    section: "Intro",
    content: (
      <div className="title-slide">
        <p className="subtitle">AI Deep Dive · part 2</p>
        <h1>
          Claude Code, <em>deeper</em>
        </h1>
        <p className="subtitle">
          Skills that write themselves. Agents that protect your context. Hooks that never forget.
        </p>
        <div className="badges">
          <span className="badge accent">skills</span>
          <span className="badge accent">subagents</span>
          <span className="badge accent">hooks</span>
          <span className="badge">tokens</span>
          <span className="badge">MCP</span>
        </div>
      </div>
    ),
  },
  {
    id: "recap",
    section: "Intro",
    content: (
      <>
        <SlideTitle kicker="last time">The basics in 60 seconds</SlideTitle>
        <Bullets
          items={[
            <>
              <strong>Context window</strong> — the conversation's "working memory". Everything
              Claude "sees": system prompt, history, tool results.
            </>,
            <>
              <strong>Tokens</strong> — the currency. Every character in context costs money and
              model "attention". A polluted context = dumber answers.
            </>,
            <>
              <strong>Skills, agents, MCP</strong> — we named them last time. Today we take them
              apart and learn how to write our own.
            </>,
          ]}
        />
        <Note>
          The thesis of the day: <strong>context is the most expensive resource</strong>. All
          three tools today are ways to give Claude knowledge and capabilities <em>without</em>{" "}
          bloating the context.
        </Note>
      </>
    ),
  },
  {
    id: "why-this-talk",
    section: "Intro",
    content: (
      <>
        <SlideTitle kicker="why we're here">
          Not <em>what</em> these are — <em>how to do them right</em>
        </SlideTitle>
        <Bullets
          items={[
            <>
              Last time we named the pieces. Naming them is easy; the value is in the{" "}
              <strong>craft</strong> — and that's where most setups go wrong.
            </>,
            <>
              <strong>Skills:</strong> when does a chunk of knowledge deserve to become a skill,
              what goes in one, and the rules that make Claude actually trigger it.
            </>,
            <>
              <strong>MCP:</strong> when a server earns its place — and when it's just a tax. The
              real, detailed cost of one request <em>with</em> a server attached.
            </>,
            <>
              <strong>Tokens:</strong> concrete moves to make every request cheaper, faster, and
              sharper.
            </>,
            <>
              <strong>Learning:</strong> how to use Claude to actually <em>learn</em> a stack, not
              just outsource it.
            </>,
          ]}
        />
        <Note>
          Take-away test for the day: after this talk you should be able to open an empty{" "}
          <Term>.claude/</Term> folder and know exactly what to put in it — and what to leave out.
        </Note>
      </>
    ),
  },
  {
    id: "map",
    section: "Intro",
    content: (
      <>
        <SlideTitle kicker="plan">Today</SlideTitle>
        <Flow steps={["Skills", "Subagents", "Hooks", "Tokens 💸", "MCP"]} />
        <Bullets
          items={[
            <>
              Everything I show <strong>lives in this repository</strong>. This presentation is a
              React app, and right next to it sits a <Term>.claude</Term> folder with real
              skills, agents, and hooks.
            </>,
            <>
              So we look at every topic twice: slide → the actual file → a live run in Claude
              Code.
            </>,
            <>
              Bonus meta: Claude Code built this app using the very skills we are about to
              dissect.
            </>,
          ]}
        />
      </>
    ),
  },
];
