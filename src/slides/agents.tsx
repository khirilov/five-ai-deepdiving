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
    content: {
      en: (
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
      uk: (
        <>
          <BigStatement sub="Субагент працює у ВЛАСНОМУ контекст-вікні й повертає в розмову лише підсумок.">
            Дослідження 50 файлів ≈ 40 000 токенів.
            <br />
            Звіт із нього ≈ 500.
          </BigStatement>
          <Note>
            Якщо побічна задача залила б твою головну розмову результатами пошуку, логами чи
            вмістом файлів, на які ти більше не глянеш — це робота для субагента.
          </Note>
        </>
      ),
    },
  },
  {
    id: "agents-format",
    section: "Subagents",
    content: {
      en: (
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
                meaning:
                  "Which tools are available. Omitted = inherits all. A read-only agent is a safe agent.",
              },
              {
                field: "model",
                meaning: "sonnet | haiku | opus | inherit. Cheap model for mass routine work.",
              },
              { field: "permissionMode", meaning: "default | acceptEdits | plan | bypassPermissions..." },
              { field: "maxTurns", meaning: "Emergency brake: maximum number of agentic turns." },
              {
                field: "skills",
                meaning:
                  "Skills injected IN FULL into the agent's context at startup (not just descriptions).",
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
      uk: (
        <>
          <SlideTitle kicker="субагенти">
            Формат: <em>.claude/agents/name.md</em>
          </SlideTitle>
          <FieldTable
            headers={["Поле", "Навіщо"]}
            rows={[
              { field: "name", meaning: "Ідентифікатор: малі-літери-через-дефіс. Обов'язкове." },
              {
                field: "description",
                meaning: "Коли делегувати цьому агенту — за цим Claude вирішує. Обов'язкове.",
              },
              {
                field: "tools / disallowedTools",
                meaning:
                  "Які тули доступні. Не вказано = успадковує всі. Read-only агент = безпечний агент.",
              },
              {
                field: "model",
                meaning: "sonnet | haiku | opus | inherit. Дешева модель під масову рутину.",
              },
              { field: "permissionMode", meaning: "default | acceptEdits | plan | bypassPermissions..." },
              { field: "maxTurns", meaning: "Стоп-кран: максимальна кількість кроків агента." },
              {
                field: "skills",
                meaning:
                  "Скіли, влиті ЦІЛКОМ у контекст агента на старті (не лише описи).",
              },
              {
                field: "memory",
                meaning: "user | project | local — агент вчиться між сесіями (пише собі нотатки).",
              },
              {
                field: "isolation: worktree",
                meaning: "Окремий git worktree — агент працює в ізольованій копії репо.",
              },
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "agents-builtin",
    section: "Subagents",
    content: {
      en: (
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
              { field: "general-purpose", meaning: "Universal: multi-step side tasks with all tools." },
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
      uk: (
        <>
          <SlideTitle kicker="субагенти">Вбудовані вже працюють на тебе</SlideTitle>
          <FieldTable
            headers={["Агент", "Що робить"]}
            rows={[
              {
                field: "Explore",
                meaning:
                  "Read-only пошук по коду. «Знайди, де ми обробляємо авторизацію» — повертає висновок, а не файли.",
              },
              {
                field: "Plan",
                meaning: "Архітектор: досліджує й повертає план реалізації з ключовими файлами.",
              },
              { field: "general-purpose", meaning: "Універсальний: багатокрокові побічні задачі з усіма тулами." },
            ]}
          />
          <Bullets
            items={[
              <>
                Пиши власного агента, коли ти <strong>раз за разом спавниш того самого
                воркера</strong> з тими самими інструкціями.
              </>,
              <>
                Виклик: Claude делегує сам за description, або явно — «use the
                mantine-css-audit-worker agent for ...».
              </>,
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "agents-vs-commands",
    section: "Subagents",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="ключовий нюанс">
            Скіл чи субагент? Питання — <em>інтерактивність</em>
          </SlideTitle>
          <Cols>
            <Col title="Скіл / команда — у головній розмові">
              <Bullets
                items={[
                  <>Може ставити користувачу питання (grill-me сесія)</>,
                  <>Може спавнити субагентів</>,
                  <>Ділить контекст із головною розмовою</>,
                ]}
              />
            </Col>
            <Col title="Субагент — автономний">
              <Bullets
                items={[
                  <>
                    <strong>Не може говорити з тобою посеред роботи</strong> — бере промпт, повертає
                    один звіт
                  </>,
                  <>Свій чистий контекст</>,
                  <>Ідеальний для read-only аудитів і паралельної роботи</>,
                ]}
              />
            </Col>
          </Cols>
          <Note>
            Саме тому в цьому репо <Term>mr-reviewer</Term> і <Term>feature-forge</Term> — це
            команди (вони інтерв'юють користувача), а <Term>mantine-css-audit-worker</Term> —
            субагент (мовчки аудитує й звітує). Деталі в <Term>.claude/README.md</Term>.
          </Note>
        </>
      ),
    },
  },
  {
    id: "agents-fanout",
    section: "Subagents",
    content: {
      en: (
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
          <Note>
            <strong>Why this is cheaper, not more expensive:</strong> a 40k-token search done in the
            main chat leaves all 40k of file dumps in your context <em>forever</em> — you re-read it
            every later turn. In a subagent the 40k is spent <em>there</em> and only the 50-token
            conclusion comes back. Same one-time cost; the difference is what stays behind.
          </Note>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="патерн із цього репо">
            Fan-out: оркестратор → N воркерів → reconciler
          </SlideTitle>
          <Flow steps={["/mantine-css-auditor", "worker × N (паралельно)", "reconciler", "звіт"]} />
          <CodeBlock
            lang="yaml"
            title=".claude/agents/mantine-css-audit-worker.md — frontmatter"
            code={`---
name: mantine-css-audit-worker
description: "Run one read-only Mantine CSS audit pass for a React
  feature or file. Use when: a parent agent needs an independent
  audit proposal..."
tools: Read, Grep, Glob, WebFetch   # read-only: нічого не зламає
model: sonnet                        # дешевше за opus, для аудиту досить
---`}
          />
          <Bullets
            items={[
              <>Кожен воркер рев'юїть свій шматок коду незалежно — у власному контексті.</>,
              <>Reconciler зливає звіти, прибираючи дублі й конфлікти.</>,
              <>У головну розмову повертається один підсумковий звіт.</>,
            ]}
          />
          <Note>
            <strong>Чому це дешевше, а не дорожче:</strong> пошук на 40k токенів у головному чаті
            лишає всі ці 40k вмісту файлів у твоєму контексті <em>назавжди</em> — ти перечитуєш їх
            кожен наступний хід. У субагенті 40k витрачаються <em>там</em>, а назад повертається лише
            висновок на 50 токенів. Разова вартість та сама; різниця — що лишається після.
          </Note>
        </>
      ),
    },
  },
  {
    id: "agents-forge-compare",
    section: "Subagents",
    content: {
      en: (
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
          <FieldTable
            headers={["DESIGN phase · ~footer section-filter feature", "Main context after"]}
            rows={[
              { field: "solo — 3 alternatives explored inline", meaning: "+15–20k stays in your window (all the design chatter)" },
              { field: "subagents — 3 forks explore in parallel", meaning: "+2–3k returns (just the proposals); ~45k spent in forks, then dropped" },
            ]}
          />
          <Note>
            More total tokens with subagents (3 separate contexts), but your <em>main</em> window
            stays lean — that's what every later turn re-reads. Demo: run both, compare{" "}
            <Term>/context</Term>. (Rough figures — read the real ones off <Term>/context</Term> on stage.)
          </Note>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="живе порівняння">
            feature-forge: фаза DESIGN <em>з</em> субагентами і <em>без</em> них
          </SlideTitle>
          <Cols>
            <Col title="/feature-forge (із субагентами)">
              <Bullets
                items={[
                  <>3 × design-explorer паралельно, кожен зі своїм обмеженням</>,
                  <>3 справді незалежні погляди — нема якоріння на першій ідеї</>,
                  <>Чернетки дослідження не потрапляють у головний контекст</>,
                  <>Швидше (паралельно), але дорожче (3 окремі контексти)</>,
                ]}
              />
            </Col>
            <Col title="/feature-forge-solo (без)">
              <Bullets
                items={[
                  <>Один контекст генерує всі 3 варіанти послідовно</>,
                  <>Варіанти «підглядають» один в одного — менше різноманіття</>,
                  <>Усе дослідження осідає в головній розмові</>,
                  <>Дешевше й простіше дебажити — годиться для малих фіч</>,
                ]}
              />
            </Col>
          </Cols>
          <FieldTable
            headers={["Фаза DESIGN · ~фіча «фільтр секцій» у футері", "Головний контекст після"]}
            rows={[
              { field: "solo — 3 варіанти інлайн", meaning: "+15–20k лишається у твоєму вікні (вся дизайн-балаканина)" },
              { field: "субагенти — 3 форки паралельно", meaning: "+2–3k повертається (лише пропозиції); ~45k витрачено у форках і скинуто" },
            ]}
          />
          <Note>
            З субагентами токенів більше загалом (3 окремі контексти), але твоє <em>головне</em>
            вікно лишається чистим — а саме його перечитує кожен наступний хід. Демо: запусти обидва,
            порівняй <Term>/context</Term>. (Цифри приблизні — реальні зчитай із <Term>/context</Term> на сцені.)
          </Note>
        </>
      ),
    },
  },
];
