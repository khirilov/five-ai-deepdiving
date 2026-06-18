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
    content: {
      en: (
        <>
          <SlideTitle kicker="tokens">Where the tokens actually go</SlideTitle>
          <FieldTable
            headers={["Source", "How much and why"]}
            rows={[
              {
                field: "System prompt + tools",
                meaning: "~20–25k present in every request — but it's a stable prefix, so caching reads it at ~0.1× after the first call.",
              },
              {
                field: "MCP servers",
                meaning:
                  "Tool schemas: Chrome DevTools MCP ≈ 18k tokens. Sits in the cached prefix too; newer Claude Code even defers schemas until first use. Check the real cost in /context.",
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
      uk: (
        <>
          <SlideTitle kicker="токени">Куди насправді йдуть токени</SlideTitle>
          <FieldTable
            headers={["Джерело", "Скільки і чому"]}
            rows={[
              {
                field: "Системний промпт + тули",
                meaning: "~20–25k присутні в кожному запиті — але це стабільний префікс, тож кеш читає його по ~0.1× після першого виклику.",
              },
              {
                field: "MCP-сервери",
                meaning:
                  "Схеми тулів: Chrome DevTools MCP ≈ 18k токенів. Теж у кешованому префіксі; новіші версії Claude Code ще й відкладають схеми до першого використання. Реальну ціну дивись у /context.",
              },
              {
                field: "CLAUDE.md + правила",
                meaning: "Вантажиться цілком, завжди. Роздутий CLAUDE.md — податок на кожен запит.",
              },
              {
                field: "Історія + результати тулів",
                meaning: "Найбільший пожирач: вивід команд, вміст файлів, логи — усе осідає в контексті.",
              },
              {
                field: "Output (відповіді)",
                meaning: "Балачки моделі: «Чудове питання!», переказ задачі, підсумки на пів сторінки.",
              },
            ]}
          />
          <Note>
            Перший крок завжди <Term>/context</Term>: він показує розклад контексту по категоріях.
            Не оптимізуй наосліп.
          </Note>
        </>
      ),
    },
  },
  {
    id: "tokens-builtin",
    section: "Tokens",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="токени">Вбудована механіка — почни звідси</SlideTitle>
          <FieldTable
            headers={["Інструмент", "Коли"]}
            rows={[
              { field: "/context", meaning: "Діагностика: що саме займає вікно" },
              {
                field: "/clear",
                meaning: "Нова незалежна задача = чистий контекст. Найнедооціненіша команда.",
              },
              {
                field: "/compact",
                meaning: "Стиснути історію в підсумок. Авто-microcompact теж є, але керований кращий.",
              },
              {
                field: "model під задачу",
                meaning: "Субагенти на haiku/sonnet під рутину — поле model у frontmatter.",
              },
              {
                field: "effort",
                meaning: "low/medium для простих задач — менше «думання», менше токенів.",
              },
              {
                field: "Explore agent",
                meaning: "Пошук по коду в чужому контексті замість засмічення твого.",
              },
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "tokens-context-commands",
    section: "Tokens",
    content: {
      en: (
        <>
          <SlideTitle kicker="tokens">
            <Term>/context</Term> · <Term>/compact</Term> · <Term>/clear</Term> — and a few honest answers
          </SlideTitle>
          <FieldTable
            headers={["Command", "What it really does to the bill"]}
            rows={[
              {
                field: "/context",
                meaning: "Read-only report of what fills the window. Cheap — it inspects the existing context, it doesn't add a turn. Run it freely.",
              },
              {
                field: "/clear",
                meaning: "Drops the whole history tail to zero. Next request rebuilds only the cached prefix. The cheapest reset between unrelated tasks.",
              },
              {
                field: "/compact",
                meaning: "Summarizes history into a shorter version. Costs one pass to produce the summary now, but every later turn re-reads a smaller tail.",
              },
            ]}
          />
          <Bullets
            items={[
              <>
                <strong>"Does switching model mid-session re-charge the whole chat?"</strong> The
                tokens are re-sent (always are), but a model switch <em>changes the prefix</em>, so
                the cache is cold for the new model — that turn pays write, not read. Still small vs
                the value; <Term>opusplan</Term> switches Opus→Sonnet by design and is usually a net win.
              </>,
              <>
                <strong>"Why not just run /context constantly?"</strong> You can — it's a local
                inspector, ~free. What costs tokens is letting the history <em>grow</em>, not looking at it.
              </>,
            ]}
          />
          <Warn>
            <Term>/compact</Term> mid-task can drop detail you still need. Prefer <Term>/clear</Term>{" "}
            at clean task boundaries; compact long sessions deliberately, not in a panic.
          </Warn>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="токени">
            <Term>/context</Term> · <Term>/compact</Term> · <Term>/clear</Term> — і кілька чесних відповідей
          </SlideTitle>
          <FieldTable
            headers={["Команда", "Що вона реально робить з рахунком"]}
            rows={[
              {
                field: "/context",
                meaning: "Звіт лише для читання: що заповнює вікно. Дешево — оглядає наявний контекст, не додає хід. Ганяй вільно.",
              },
              {
                field: "/clear",
                meaning: "Скидає весь хвіст історії в нуль. Наступний запит відбудовує лише кешований префікс. Найдешевший ресет між незв'язаними задачами.",
              },
              {
                field: "/compact",
                meaning: "Стискає історію в коротшу версію. Коштує один прохід, щоб зробити підсумок зараз, але далі кожен хід читає менший хвіст.",
              },
            ]}
          />
          <Bullets
            items={[
              <>
                <strong>«Чи зміна моделі посеред сесії заново їсть весь чат?»</strong> Токени
                пересилаються (завжди так), але зміна моделі <em>міняє префікс</em>, тож для нової
                моделі кеш холодний — той хід платить write, а не read. Все одно мало проти користі;{" "}
                <Term>opusplan</Term> свідомо перемикає Opus→Sonnet і зазвичай у плюсі.
              </>,
              <>
                <strong>«Чому просто не ганяти /context постійно?»</strong> Можна — це локальний
                інспектор, майже безкоштовно. Токени їсть <em>ріст</em> історії, а не погляд на неї.
              </>,
            ]}
          />
          <Warn>
            <Term>/compact</Term> посеред задачі може викинути деталь, яка ще потрібна. Краще{" "}
            <Term>/clear</Term> на чистих межах задач; компактуй довгі сесії свідомо, а не в паніці.
          </Warn>
        </>
      ),
    },
  },
  {
    id: "tokens-model-effort",
    section: "Tokens",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="токени">
            Два важелі, що міняють рахунок: <em>model</em> і <em>effort</em>
          </SlideTitle>
          <Cols>
            <Col title="/model — хто робить роботу">
              <FieldTable
                headers={["Опція", "Що робить"]}
                rows={[
                  { field: "default", meaning: "Opus, потім авто-перемикання на Sonnet після ~50% usage." },
                  {
                    field: "opusplan",
                    meaning: "Opus думає в Plan Mode → Sonnet пише код. Розум там, де важливо, дешеве виконання.",
                  },
                  { field: "sonnet / haiku", meaning: "Закріпити дешевшу модель на цілу сесію рутини." },
                ]}
              />
              <Note>
                <Term>/model opusplan</Term> — це відповідь однією командою на «використовуй розумну
                модель лише там, де вона окупається».
              </Note>
            </Col>
            <Col title="effort — як сильно думає">
              <FieldTable
                headers={["Рівень", "Коли"]}
                rows={[
                  { field: "low", meaning: "Субагенти, рутина, чутливе до затримки." },
                  { field: "medium", meaning: "Cost-sensitive, прості задачі." },
                  { field: "high", meaning: "Дефолт у Claude Code; більшість реальної роботи." },
                  { field: "xhigh", meaning: "Найкраще для кодингу / агентних циклів." },
                  { field: "max", meaning: "Correctness > cost; може перемудрити." },
                ]}
              />
              <Note>
                Ставиться у frontmatter скіла/агента (<Term>effort: low</Term>) — або глобально.
                Менше effort = менше токенів, стисліше, менше викликів тулів.
              </Note>
            </Col>
          </Cols>
        </>
      ),
    },
  },
  {
    id: "tokens-caveman",
    section: "Tokens",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="токени">
            Caveman: <em>«нащо багато токен коли мало токен теж робота»</em>
          </SlideTitle>
          <Cols>
            <Col title="Що робить">
              <Bullets
                items={[
                  <>
                    Скіл-плагін, що ріже балачки: жодних «Чудове питання!», переказу задачі,
                    «дай знати, якщо…» — телеграфний стиль.
                  </>,
                  <>
                    У середньому <strong>−65% output-токенів</strong> (розкид 22–87%).
                  </>,
                  <>
                    <strong>Код лишається ідентичним.</strong> Caveman робить рот меншим, а не мозок.
                  </>,
                ]}
              />
              <Warn>
                Чесно: він не чіпає thinking-токени. Економія — на видимих відповідях.
              </Warn>
            </Col>
            <Col title="Встановлення і режими">
              <CodeBlock
                lang="bash"
                code={`claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman

# режими:
/caveman lite   # прибрати лише воду
/caveman full   # фрагменти, артиклі викинуто
/caveman ultra  # максимальне стиснення`}
              />
            </Col>
          </Cols>
        </>
      ),
    },
  },
  {
    id: "tokens-caching",
    section: "Tokens",
    content: {
      en: (
        <>
          <SlideTitle kicker="tokens">
            The biggest underused lever: <em>prompt caching</em>
          </SlideTitle>
          <Bullets
            items={[
              <>
                The model is stateless — your whole prefix (system prompt, tools, CLAUDE.md,
                history) is re-sent every turn. <strong>Caching makes that re-send ~10× cheaper</strong>
                {" "}— but only if the prefix is byte-for-byte identical.
              </>,
              <>
                It's a <strong>prefix match</strong>: one changed byte invalidates everything after
                it. Render order is <Term>tools → system → messages</Term>, so volatile content must
                go <em>last</em>.
              </>,
            ]}
          />
          <Cols>
            <Col title="🧊 Keeps the cache (cheap)">
              <Bullets
                items={[
                  <>A frozen CLAUDE.md and a stable tool set.</>,
                  <>Appending to the conversation — old turns stay cached.</>,
                  <>Putting today's date / IDs at the end, not the top.</>,
                ]}
              />
            </Col>
            <Col title="🔥 Breaks the cache (full price)">
              <Bullets
                items={[
                  <>
                    Editing <Term>CLAUDE.md</Term> or a skill mid-session → the whole history
                    re-bills uncached.
                  </>,
                  <>Adding/removing an MCP server or switching model → full rebuild.</>,
                  <>
                    A <Term>!`date`</Term> or session id near the top of the prompt.
                  </>,
                ]}
              />
            </Col>
          </Cols>
          <FieldTable
            headers={["Opus 4.8 · per 1M tokens", "Price"]}
            rows={[
              { field: "Fresh input", meaning: "$5.00" },
              { field: "Cache write (1.25×)", meaning: "$6.25 — paid once, on the first request" },
              { field: "Cache read (0.1×)", meaning: "$0.50 — every reused turn after that" },
            ]}
          />
          <Note>
            So a ~33k prefix (base + MCP) costs ≈<strong>$0.21</strong> to write once, then ≈
            <strong>$0.017</strong> per reused turn. Saying "every <code>hi</code> burns 33k tokens"
            is ~10× off on money. The real cost is the growing <em>history tail</em> — that's why{" "}
            <Term>/clear</Term> saves. Verify hits in <Term>/context</Term>.
          </Note>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="токени">
            Найбільший недооцінений важіль: <em>prompt caching</em>
          </SlideTitle>
          <Bullets
            items={[
              <>
                Модель stateless — увесь твій префікс (системний промпт, тули, CLAUDE.md, історія)
                пересилається щоразу. <strong>Кешування робить це пересилання ~10× дешевшим</strong>
                {" "}— але лише якщо префікс байт-у-байт ідентичний.
              </>,
              <>
                Це <strong>prefix match</strong>: один змінений байт анулює все після нього.
                Порядок рендеру <Term>tools → system → messages</Term>, тому волатильне має йти{" "}
                <em>останнім</em>.
              </>,
            ]}
          />
          <Cols>
            <Col title="🧊 Береже кеш (дешево)">
              <Bullets
                items={[
                  <>Заморожений CLAUDE.md і стабільний набір тулів.</>,
                  <>Дописування в розмову — старі ходи лишаються в кеші.</>,
                  <>Сьогоднішня дата / id — в кінці, а не на початку.</>,
                ]}
              />
            </Col>
            <Col title="🔥 Ламає кеш (повна ціна)">
              <Bullets
                items={[
                  <>
                    Правка <Term>CLAUDE.md</Term> чи скіла посеред сесії → уся історія
                    перебиловується некешовано.
                  </>,
                  <>Додавання/зняття MCP-сервера чи зміна моделі → повна перебудова.</>,
                  <>
                    <Term>!`date`</Term> чи id сесії на початку промпта.
                  </>,
                ]}
              />
            </Col>
          </Cols>
          <FieldTable
            headers={["Opus 4.8 · за 1M токенів", "Ціна"]}
            rows={[
              { field: "Свіжий input", meaning: "$5.00" },
              { field: "Cache write (1.25×)", meaning: "$6.25 — платиш раз, на першому запиті" },
              { field: "Cache read (0.1×)", meaning: "$0.50 — кожен наступний перевикористаний хід" },
            ]}
          />
          <Note>
            Тож ~33k префікс (база + MCP) коштує ≈<strong>$0.21</strong> записати раз, далі ≈
            <strong>$0.017</strong> за перевикористаний хід. «Кожне <code>привіт</code> палить 33k»
            — це ~10× перебільшення в грошах. Реальна вага — це хвіст історії, що росте; саме тому{" "}
            <Term>/clear</Term> економить. Перевіряй попадання в <Term>/context</Term>.
          </Note>
        </>
      ),
    },
  },
  {
    id: "tokens-checklist",
    section: "Tokens",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="токени">Чек-лист економії</SlideTitle>
          <Bullets
            items={[
              <>
                <strong>Вимикай MCP-сервери, якими не користуєшся щодня</strong> — кожен вішає
                тисячі токенів схем на кожен запит.
              </>,
              <>
                <strong>Процедури з CLAUDE.md → у скіли</strong>: description висить (~100 токенів),
                тіло вантажиться на вимогу.
              </>,
              <>
                <Term>paths</Term> на скілах і <Term>disable-model-invocation</Term> для рідкісних —
                менше описів у листингу.
              </>,
              <>
                <strong>Субагенти на дешевих моделях</strong> + <Term>maxTurns</Term> як стоп-кран.
              </>,
              <>
                <Term>/clear</Term> між задачами, <Term>/compact</Term> на довгих сесіях — свідомо, а
                не коли вже горить.
              </>,
              <>
                Моніторинг: <Term>/usage</Term> у Claude Code, <Term>ccusage</Term> для статистики по
                сесіях.
              </>,
            ]}
          />
        </>
      ),
    },
  },
];
