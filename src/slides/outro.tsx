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
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="підсумок">З чого почати завтра</SlideTitle>
          <Bullets
            items={[
              <>
                <strong>1.</strong> Відкрий <Term>/context</Term> — побач, що реально їсть твоє
                вікно.
              </>,
              <>
                <strong>2.</strong> Винеси одну процедуру з CLAUDE.md у скіл із нормальним{" "}
                <Term>description</Term>.
              </>,
              <>
                <strong>3.</strong> Створи одного субагента під найчастішу побічну задачу
                (read-only тули + дешева модель).
              </>,
              <>
                <strong>4.</strong> Додай два хуки: typecheck після Edit і сповіщення на Stop.
              </>,
              <>
                <strong>5.</strong> Закоміть <Term>.claude</Term> у репозиторій — твої скіли
                стають скілами всієї команди.
              </>,
            ]}
          />
          <Note>
            Усе з цієї доповіді — в репозиторії: слайди, скіли, агенти, хуки. Клонуй і копай.
          </Note>
        </>
      ),
    },
  },
  {
    id: "learning-machine",
    section: "Wrap-up",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="бонус">
            Claude як <em>навчальна машина</em>
          </SlideTitle>
          <Cols>
            <Col title="Увімкнути — вбудований стиль, не MCP">
              <CodeBlock
                lang="text"
                code={`# обери в меню конфігу:
/config  →  Output style  →  Learning | Explanatory

# або задай напряму в .claude/settings.local.json:
{ "outputStyle": "Learning" }

# застосовується після /clear або в новій сесії
# (стару команду /output-style прибрали у v2.1.91)`}
              />
            </Col>
            <Col title="Що змінюється">
              <Bullets
                items={[
                  <>
                    <strong>Learning:</strong> Claude пише шаблонний код, але зупиняється на точках
                    рішення і просить <em>тебе</em> написати 5–10 рядків справжньої логіки.
                  </>,
                  <>
                    <strong>Explanatory:</strong> кожне неочевидне рішення супроводжує короткий{" "}
                    <Term>★ Insight</Term> — чому саме цей патерн, у чому компроміс.
                  </>,
                  <>
                    Працює для будь-якої теми: «навчи мене Zod, побудувавши зі мною валідатор форми».
                  </>,
                ]}
              />
            </Col>
          </Cols>
          <Note>
            Або роздай команді як плагін:{" "}
            <Term>claude plugin install learning-output-style@claude-code-plugins</Term>. Ті ж
            інструкції, застосовані через SessionStart-хук.
          </Note>
        </>
      ),
    },
  },
  {
    id: "learning-loop",
    section: "Wrap-up",
    content: {
      en: (
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
      uk: (
        <>
          <SlideTitle kicker="бонус · як">
            Ми загорнули цикл у скіл: <em>/learn-with-me</em>
          </SlideTitle>
          <Flow steps={["SCOPE", "PLAN → файл", "LEARN", "QUIZ", "REVIEW"]} />
          <Cols>
            <Col title="Що робить скіл">
              <Bullets
                items={[
                  <>
                    <strong>SCOPE:</strong> інтерв'ю <Term>grill-me</Term> — що саме вчити, твій
                    рівень, тест на успіх.
                  </>,
                  <>
                    <strong>PLAN:</strong> пише впорядкований план у{" "}
                    <Term>docs/learning-plans/&lt;topic&gt;-plan.md</Term> — теми, порядок і рядки,
                    які напишеш <em>ти</em>. Файл, тож він переживає сесію.
                  </>,
                  <>
                    <strong>LEARN:</strong> робить каркас, тоді зупиняється на <Term>TODO(human)</Term>{" "}
                    — несучий код пишеш ти.
                  </>,
                  <>
                    <strong>QUIZ → REVIEW:</strong> <Term>grill-me</Term> по тому, що ти написав,
                    відмічає пункт, наступна сесія продовжує рівно там, де ти спинився.
                  </>,
                ]}
              />
            </Col>
            <Col title="Чому скіл, а не просто настрій">
              <Bullets
                items={[
                  <>
                    Цикл стає <strong>примусовим</strong>: один пункт за раз, без звалища коду,
                    без переходу далі через проваленого квіза.
                  </>,
                  <>
                    Працює в парі з output-стилем <Term>Learning</Term> і <Term>context7</Term>
                    (актуальне API, а не дворічної давнини).
                  </>,
                  <>
                    Той самий урок, що й <Term>feature-forge</Term>: процес живе у файлі, який можна
                    перевикористати й поділитися — а не в одному чаті.
                  </>,
                ]}
              />
            </Col>
          </Cols>
          <Note>
            Живе в цьому репо: <Term>/learn-with-me &lt;topic&gt;</Term> → грилить тебе, пише файл
            плану, далі веде по одному пункту за раз. Інструкції режиму — невелика постійна ціна —
            повертайся в <strong>Default</strong>, коли закінчив.
          </Note>
        </>
      ),
    },
  },
  {
    id: "questions",
    section: "Wrap-up",
    content: {
      en: (
        <BigStatement sub="Slides, skills, agents, and hooks — all live in this repo. Clone it and dig in.">
          Questions?
        </BigStatement>
      ),
      uk: (
        <BigStatement sub="Слайди, скіли, агенти й хуки — усе живе в цьому репо. Клонуй і копай.">
          Питання?
        </BigStatement>
      ),
    },
  },
];
