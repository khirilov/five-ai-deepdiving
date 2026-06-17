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

export const mcpSlides: DeckSlide[] = [
  {
    id: "mcp-what",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="mcp · overview">
          MCP: a standard connector between Claude and the <em>outside world</em>
        </SlideTitle>
        <Bullets
          items={[
            <>
              An open protocol: a server describes tools, Claude uses them. Browser, Figma,
              databases, Jira — one mechanism.
            </>,
            <>
              Transports: <Term>stdio</Term> (local process) and <Term>http</Term> (remote
              server).
            </>,
            <>
              Scopes: <strong>local</strong> (just me, this project) · <strong>project</strong>{" "}
              (<Term>.mcp.json</Term> at the root — committed, the whole team gets the same
              tools) · <strong>user</strong> (all my projects).
            </>,
          ]}
        />
        <CodeBlock
          lang="bash"
          code={`claude mcp add --transport stdio chrome-devtools -- npx chrome-devtools-mcp@latest
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope project`}
        />
        <Warn>
          The price of connecting: once loaded, the server's tool schemas sit in the context of
          every request (newer Claude Code defers loading until first use). Verify the real
          cost with <Term>/context</Term> — and connect only what you actually use.
        </Warn>
      </>
    ),
  },
  {
    id: "mcp-this-repo",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="live">
          This repo ships its MCP config: <em>.mcp.json</em>
        </SlideTitle>
        <CodeBlock
          lang="json"
          title=".mcp.json (repo root) — project scope, committed to git"
          code={`{
  "mcpServers": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}`}
        />
        <Bullets
          items={[
            <>
              Clone the repo → Claude Code asks you to <strong>approve</strong> these servers
              once → the whole team has identical tools. Inspect via <Term>/mcp</Term>.
            </>,
            <>
              No secrets in here — servers needing keys (Perplexity) go to <strong>local</strong>{" "}
              scope instead.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "mcp-when",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="mcp · when">When to reach for MCP — and when not to</SlideTitle>
        <Cols>
          <Col title="✅ Use an MCP server">
            <Bullets
              items={[
                <>
                  Claude must <strong>read or drive an external system</strong>: a browser, a
                  database, GitLab, Figma, your error tracker.
                </>,
                <>
                  The data is <strong>live and outside the repo</strong> — open MRs, a running
                  page's console, today's library docs.
                </>,
                <>
                  You'd otherwise paste screenshots / logs / HTML by hand every time.
                </>,
              ]}
            />
          </Col>
          <Col title="❌ Skip MCP (cheaper without)">
            <Bullets
              items={[
                <>
                  It's <strong>knowledge or a procedure</strong> → a skill or CLAUDE.md, not a
                  server.
                </>,
                <>
                  A one-off lookup → built-in <Term>WebSearch</Term>/<Term>WebFetch</Term> beats a
                  permanent server.
                </>,
                <>
                  The server is "nice to have" but unused this week → its schemas tax{" "}
                  <em>every</em> request anyway.
                </>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          Default to <strong>off</strong>. An MCP server is a standing cost; turn it on for the
          task, off after. The question is never "is it useful?" but "is it useful{" "}
          <em>right now</em>, enough to pay for it on every request?"
        </Note>
      </>
    ),
  },
  {
    id: "mcp-cost",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="mcp · cost">
          What a request with a server attached <em>actually</em> costs
        </SlideTitle>
        <FieldTable
          headers={["The mechanic", "What it means for the bill"]}
          rows={[
            {
              field: "Schemas load into context once",
              meaning:
                "DevTools ≈ 18k, Playwright ≈ 13.7k tokens. That's space in the window — and model attention spread thinner.",
            },
            {
              field: "Model is stateless → schemas re-sent every request",
              meaning:
                "They're part of the prefix on each turn. This is the part people fear — but see the next row.",
            },
            {
              field: "Prompt caching makes the prefix cheap",
              meaning:
                "A cached prefix read is ~10× cheaper than fresh input tokens. So you mostly pay in WINDOW SPACE, not full token price each turn.",
            },
            {
              field: "Newer Claude Code defers schemas (tool search)",
              meaning:
                "Until a tool is needed, only its NAME sits in context; the full schema loads on first use. The standing tax keeps dropping.",
            },
            {
              field: "The tool CALL is billed separately",
              meaning:
                "Call args + result land in history. A Playwright page snapshot can be several thousand tokens — and that part is NOT cached.",
            },
          ]}
        />
        <Warn>
          So the honest cost = standing schema weight (largely cached) <strong>+</strong> the
          uncached call results you actually trigger. Read the real number in{" "}
          <Term>/context</Term>; turn off what isn't earning its place.
        </Warn>
      </>
    ),
  },
  {
    id: "mcp-browser",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="mcp">
          Chrome DevTools vs Playwright: <em>debugging</em> vs <em>driving</em>
        </SlideTitle>
        <Cols>
          <Col title="Chrome DevTools MCP — observe">
            <Bullets
              items={[
                <>Console, network, performance traces, Lighthouse</>,
                <>The question: "why is the page slow / throwing errors?"</>,
                <>Works over CDP, Chromium only</>,
                <>~26 tools ≈ 18k tokens of context</>,
                <>
                  Our <Term>/browser-reviewer</Term> is built on it
                </>,
              ]}
            />
          </Col>
          <Col title="Playwright MCP — act">
            <Bullets
              items={[
                <>Drives user flows: click, form, submit, e2e</>,
                <>The question: "does the flow work end to end?"</>,
                <>Accessibility snapshots instead of screenshots</>,
                <>Cross-browser: Chromium, Firefox, WebKit</>,
                <>~21 tools ≈ 13.7k tokens</>,
              ]}
            />
          </Col>
        </Cols>
        <Note>
          Not competitors — different jobs: QA flow runs → Playwright; performance and debugging
          → DevTools. Keeping both enabled at all times = a ~32k token tax. Enable per task.
        </Note>
      </>
    ),
  },
  {
    id: "mcp-figma",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="mcp">Figma Dev Mode MCP — design without screenshots</SlideTitle>
        <Bullets
          items={[
            <>
              Claude sees the <strong>real structure of the design</strong>: hierarchy,
              auto-layout, component variants, text styles, tokens — not pixels.
            </>,
            <>The result: code built to the design's real constraints, not "eyeballed from a screenshot".</>,
          ]}
        />
        <FieldTable
          headers={["What you need", "Details"]}
          rows={[
            { field: "Figma desktop app", meaning: "The local MCP server is enabled in Preferences → Dev Mode MCP Server" },
            { field: "Dev or Full seat", meaning: "On a paid plan (Professional+)" },
            { field: "Endpoint", meaning: "Locally http://127.0.0.1:3845/mcp or remotely mcp.figma.com with OAuth" },
            { field: "The flow", meaning: "Select a frame in Figma → ask Claude to 'build this component' → it reads the selection" },
          ]}
        />
        <Note>We don't have access — but if you have a Dev seat, this is the shortest design → code path.</Note>
      </>
    ),
  },
  {
    id: "mcp-perplexity",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="mcp">Perplexity MCP — search that answers</SlideTitle>
        <Cols>
          <Col title="Why, when built-in WebSearch exists">
            <Bullets
              items={[
                <>
                  Regular search: a list of links → Claude fetches the pages → tens of thousands
                  of HTML tokens pour into the context.
                </>,
                <>
                  Perplexity (Sonar): returns a <strong>ready answer with citations</strong> —
                  only that lands in context.
                </>,
                <>Fresh data: docs for new library versions, changelogs, CVEs.</>,
              ]}
            />
          </Col>
          <Col title="Connecting">
            <CodeBlock
              lang="bash"
              code={`# needs a PERPLEXITY_API_KEY (Sonar API)
claude mcp add --transport stdio perplexity \\
  --env PERPLEXITY_API_KEY=pplx-... \\
  -- npx server-perplexity-ask`}
            />
          </Col>
        </Cols>
        <Note>
          Deciding which MCP servers the team keeps enabled — a separate conversation after a
          trial week.
        </Note>
      </>
    ),
  },
  {
    id: "mcp-plugins",
    section: "MCP",
    content: (
      <>
        <SlideTitle kicker="plugins">
          Plugins: skills + agents + hooks + MCP, <em>packaged</em>
        </SlideTitle>
        <Bullets
          items={[
            <>
              A plugin is a <strong>distribution format</strong> — the same skills, agents, hooks
              and MCP servers we write by hand in <Term>.claude/</Term>, just zipped up and
              installed with one command. A marketplace is a git repo listing packages.
            </>,
          ]}
        />
        <CodeBlock
          lang="bash"
          code={`claude plugin marketplace add anthropics/claude-code   # add a marketplace once
claude plugin install frontend-design@claude-code-plugins   # then install a package
# in-session menu: /plugin  (browse · install · enable/disable)`}
        />
        <FieldTable
          headers={["Plugin", "What it gives you"]}
          rows={[
            {
              field: "frontend-design",
              meaning: "Anthropic's skill for bold, distinctive UI instead of 'AI-slop' defaults.",
            },
            {
              field: "typescript-lsp",
              meaning: "Wires in the TypeScript language server — Claude sees type errors like an IDE, no tsc run.",
            },
            {
              field: "caveman",
              meaning: "The token-cutting skill from the previous block — distributed as a plugin.",
            },
            {
              field: "superpowers (~750k installs)",
              meaning: "A large community skill pack — proof of how far the ecosystem has grown.",
            },
          ]}
        />
        <Note>
          Catalog: <Term>claude.com/plugins</Term>. The takeaway: once you can write a skill, you
          can already read — and publish — a plugin.
        </Note>
      </>
    ),
  },
];
