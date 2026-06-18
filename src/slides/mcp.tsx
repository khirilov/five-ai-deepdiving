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
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="mcp · огляд">
            MCP: стандартний конектор між Claude і <em>зовнішнім світом</em>
          </SlideTitle>
          <Bullets
            items={[
              <>
                Відкритий протокол: сервер описує тули, Claude ними користується. Браузер, Figma,
                бази даних, Jira — один механізм.
              </>,
              <>
                Транспорти: <Term>stdio</Term> (локальний процес) і <Term>http</Term> (віддалений
                сервер).
              </>,
              <>
                Скоупи: <strong>local</strong> (тільки я, цей проєкт) · <strong>project</strong>{" "}
                (<Term>.mcp.json</Term> у корені — комітиться, уся команда має ті самі тули) ·{" "}
                <strong>user</strong> (всі мої проєкти).
              </>,
            ]}
          />
          <CodeBlock
            lang="bash"
            code={`claude mcp add --transport stdio chrome-devtools -- npx chrome-devtools-mcp@latest
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope project`}
          />
          <Warn>
            Ціна підключення: після завантаження схеми тулів сервера сидять у контексті кожного
            запиту (новіші версії Claude Code відкладають завантаження до першого використання).
            Перевіряй реальну ціну в <Term>/context</Term> — і підключай лише те, чим реально
            користуєшся.
          </Warn>
        </>
      ),
    },
  },
  {
    id: "mcp-this-repo",
    section: "MCP",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="живе">
            Це репо несе свій MCP-конфіг: <em>.mcp.json</em>
          </SlideTitle>
          <CodeBlock
            lang="json"
            title=".mcp.json (корінь репо) — project scope, закомічено в git"
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
                Клонуєш репо → Claude Code просить <strong>підтвердити</strong> ці сервери один раз
                → уся команда має ідентичні тули. Дивись через <Term>/mcp</Term>.
              </>,
              <>
                Жодних секретів тут — сервери, яким потрібні ключі (Perplexity), ідуть у{" "}
                <strong>local</strong> scope.
              </>,
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "mcp-when",
    section: "MCP",
    content: {
      en: (
        <>
          <SlideTitle kicker="mcp · when">When to reach for MCP — and when not to</SlideTitle>
          <Cols>
            <Col title="✅ Use an MCP server">
              <Bullets
                items={[
                  <>
                    Claude must <strong>read or drive an external system</strong>: a browser, a
                    database, GitHub, Figma, your error tracker.
                  </>,
                  <>
                    The data is <strong>live and outside the repo</strong> — open PRs, a running
                    page's console, today's library docs.
                  </>,
                  <>You'd otherwise paste screenshots / logs / HTML by hand every time.</>,
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
                    <strong>A CLI already covers it</strong> → e.g. <Term>gh</Term> for GitHub PRs.
                    Claude calls it via Bash; no schema tax, billed only when run.
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
      uk: (
        <>
          <SlideTitle kicker="mcp · коли">Коли тягнутися до MCP — а коли ні</SlideTitle>
          <Cols>
            <Col title="✅ Бери MCP-сервер">
              <Bullets
                items={[
                  <>
                    Claude має <strong>читати чи керувати зовнішньою системою</strong>: браузер,
                    база даних, GitHub, Figma, твій трекер помилок.
                  </>,
                  <>
                    Дані <strong>живі й поза репо</strong> — відкриті PR, консоль працюючої
                    сторінки, сьогоднішні доки бібліотеки.
                  </>,
                  <>Інакше ти щоразу руками вставляєш скріншоти / логи / HTML.</>,
                ]}
              />
            </Col>
            <Col title="❌ Пропусти MCP (без нього дешевше)">
              <Bullets
                items={[
                  <>
                    Це <strong>знання чи процедура</strong> → скіл або CLAUDE.md, а не сервер.
                  </>,
                  <>
                    Разовий пошук → вбудовані <Term>WebSearch</Term>/<Term>WebFetch</Term> кращі за
                    постійний сервер.
                  </>,
                  <>
                    <strong>CLI вже це покриває</strong> → напр. <Term>gh</Term> для GitHub-PR.
                    Claude кличе його через Bash; жодного податку схем, білиться лише коли запущено.
                  </>,
                  <>
                    Сервер «гарно мати», але цього тижня не використовується → його схеми все одно
                    оподатковують <em>кожен</em> запит.
                  </>,
                ]}
              />
            </Col>
          </Cols>
          <Note>
            Дефолт — <strong>вимкнено</strong>. MCP-сервер це стоячий кошт; вмикай під задачу,
            вимикай після. Питання не «чи корисний?», а «чи корисний <em>прямо зараз</em> настільки,
            щоб платити за нього в кожному запиті?»
          </Note>
        </>
      ),
    },
  },
  {
    id: "mcp-cost",
    section: "MCP",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="mcp · ціна">
            Скільки <em>насправді</em> коштує запит із підключеним сервером
          </SlideTitle>
          <FieldTable
            headers={["Механіка", "Що це значить для рахунку"]}
            rows={[
              {
                field: "Схеми вантажаться в контекст один раз",
                meaning:
                  "DevTools ≈ 18k, Playwright ≈ 13.7k токенів. Це місце у вікні — і увага моделі, розмазана тонше.",
              },
              {
                field: "Модель stateless → схеми пересилаються кожного запиту",
                meaning:
                  "Вони частина префікса в кожному ході. Саме цього бояться — але дивись наступний рядок.",
              },
              {
                field: "Prompt caching робить префікс дешевим",
                meaning:
                  "Читання кешованого префікса ~10× дешевше за свіжі input-токени. Тож платиш переважно МІСЦЕМ у вікні, а не повною ціною щоразу.",
              },
              {
                field: "Новіші Claude Code відкладають схеми (tool search)",
                meaning:
                  "Поки тул не потрібен — у контексті лише його ІМ'Я; повна схема вантажиться при першому використанні. Стоячий податок дедалі менший.",
              },
              {
                field: "Сам ВИКЛИК тула білиться окремо",
                meaning:
                  "Аргументи виклику + результат осідають в історії. Снепшот сторінки Playwright може бути кілька тисяч токенів — і ось це НЕ кешується.",
              },
            ]}
          />
          <Warn>
            Тож чесна ціна = стоячу вагу схем (переважно кешовану) <strong>+</strong> некешовані
            результати викликів, які ти реально тригериш. Дивись реальне число в <Term>/context</Term>;
            вимикай те, що не виправдовує місце.
          </Warn>
        </>
      ),
    },
  },
  {
    id: "mcp-browser",
    section: "MCP",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="mcp">
            Chrome DevTools vs Playwright: <em>дебаг</em> vs <em>керування</em>
          </SlideTitle>
          <Cols>
            <Col title="Chrome DevTools MCP — спостерігати">
              <Bullets
                items={[
                  <>Консоль, network, перф-трейси, Lighthouse</>,
                  <>Питання: «чому сторінка повільна / сипле помилки?»</>,
                  <>Працює через CDP, тільки Chromium</>,
                  <>~26 тулів ≈ 18k токенів контексту</>,
                  <>
                    Наш <Term>/browser-reviewer</Term> побудований на ньому
                  </>,
                ]}
              />
            </Col>
            <Col title="Playwright MCP — діяти">
              <Bullets
                items={[
                  <>Драйвить юзер-флоу: клік, форма, сабміт, e2e</>,
                  <>Питання: «чи працює флоу від початку до кінця?»</>,
                  <>Accessibility-снепшоти замість скріншотів</>,
                  <>Крос-браузер: Chromium, Firefox, WebKit</>,
                  <>~21 тул ≈ 13.7k токенів</>,
                ]}
              />
            </Col>
          </Cols>
          <Note>
            Не конкуренти — різні задачі: QA-флоу → Playwright; перформанс і дебаг → DevTools.
            Тримати обидва ввімкненими постійно = ~32k податку токенів. Вмикай під задачу.
          </Note>
        </>
      ),
    },
  },
  {
    id: "mcp-figma",
    section: "MCP",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="mcp">Figma Dev Mode MCP — дизайн без скріншотів</SlideTitle>
          <Bullets
            items={[
              <>
                Claude бачить <strong>реальну структуру макета</strong>: ієрархію, auto-layout,
                варіанти компонентів, текстові стилі, токени — не пікселі.
              </>,
              <>Результат: код за справжніми констрейнтами макета, а не «на око зі скріншота».</>,
            ]}
          />
          <FieldTable
            headers={["Що потрібно", "Деталі"]}
            rows={[
              { field: "Figma desktop app", meaning: "Локальний MCP-сервер вмикається в Preferences → Dev Mode MCP Server" },
              { field: "Dev або Full seat", meaning: "На платному плані (Professional+)" },
              { field: "Endpoint", meaning: "Локально http://127.0.0.1:3845/mcp або віддалено mcp.figma.com з OAuth" },
              { field: "Флоу", meaning: "Виділяєш фрейм у Figma → просиш Claude «build this component» → він читає виділення" },
            ]}
          />
          <Note>У нас доступу немає — але якщо є Dev seat, це найкоротший шлях дизайн → код.</Note>
        </>
      ),
    },
  },
  {
    id: "mcp-perplexity",
    section: "MCP",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="mcp">Perplexity MCP — пошук, що відповідає</SlideTitle>
          <Cols>
            <Col title="Навіщо, якщо є вбудований WebSearch">
              <Bullets
                items={[
                  <>
                    Звичайний пошук: список лінків → Claude фетчить сторінки → десятки тисяч
                    HTML-токенів ллються в контекст.
                  </>,
                  <>
                    Perplexity (Sonar): повертає <strong>готову відповідь з цитатами</strong> — лише
                    вона потрапляє в контекст.
                  </>,
                  <>Свіжі дані: доки нових версій бібліотек, чейнджлоги, CVE.</>,
                ]}
              />
            </Col>
            <Col title="Підключення">
              <CodeBlock
                lang="bash"
                code={`# потрібен PERPLEXITY_API_KEY (Sonar API)
claude mcp add --transport stdio perplexity \\
  --env PERPLEXITY_API_KEY=pplx-... \\
  -- npx server-perplexity-ask`}
              />
            </Col>
          </Cols>
          <Note>
            Рішення, які MCP-сервери команда лишає ввімкненими — окрема розмова після тижня проби.
          </Note>
        </>
      ),
    },
  },
  {
    id: "mcp-plugins",
    section: "MCP",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="плагіни">
            Плагіни: скіли + агенти + хуки + MCP, <em>запаковані</em>
          </SlideTitle>
          <Bullets
            items={[
              <>
                Плагін — це <strong>формат дистрибуції</strong>: ті самі скіли, агенти, хуки й
                MCP-сервери, що ми пишемо руками в <Term>.claude/</Term>, просто запаковані й
                встановлювані однією командою. Маркетплейс — це git-репо зі списком пакетів.
              </>,
            ]}
          />
          <CodeBlock
            lang="bash"
            code={`claude plugin marketplace add anthropics/claude-code   # додати маркетплейс один раз
claude plugin install frontend-design@claude-code-plugins   # потім встановити пакет
# меню в сесії: /plugin  (browse · install · enable/disable)`}
          />
          <FieldTable
            headers={["Плагін", "Що дає"]}
            rows={[
              {
                field: "frontend-design",
                meaning: "Скіл від Anthropic для виразного UI замість дефолтного «AI-слопу».",
              },
              {
                field: "typescript-lsp",
                meaning: "Підключає TypeScript language server — Claude бачить помилки типів як IDE, без запуску tsc.",
              },
              {
                field: "caveman",
                meaning: "Скіл, що ріже токени, з попереднього блоку — у вигляді плагіна.",
              },
              {
                field: "superpowers (~750k встановлень)",
                meaning: "Великий community-набір скілів — доказ, наскільки виросла екосистема.",
              },
            ]}
          />
          <Note>
            Каталог: <Term>claude.com/plugins</Term>. Висновок: щойно ти вмієш писати скіл — ти вже
            вмієш читати й публікувати плагін.
          </Note>
        </>
      ),
    },
  },
];
