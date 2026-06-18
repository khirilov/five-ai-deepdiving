import { CodeBlock } from "../components/code-block";
import {
  BigStatement,
  Bullets,
  Col,
  Cols,
  FieldTable,
  Note,
  SlideTitle,
  Term,
} from "../components/primitives";
import type { DeckSlide } from "../types";

export const hooksSlides: DeckSlide[] = [
  {
    id: "hooks-what",
    section: "Hooks",
    content: {
      en: (
        <>
          <BigStatement sub="A hook is deterministic code that runs on a Claude Code lifecycle event.">
            A prompt is a <em>request</em>.<br />
            A hook is a <em>guarantee</em>.
          </BigStatement>
          <Bullets
            items={[
              <>
                "Run the tests after changes" in CLAUDE.md — Claude <strong>might</strong> forget.
              </>,
              <>
                A <Term>PostToolUse</Term> hook on <Term>Edit|Write</Term> — the tests run{" "}
                <strong>every time</strong>. It's not the model deciding — it's code.
              </>,
            ]}
          />
        </>
      ),
      uk: (
        <>
          <BigStatement sub="Хук — це детермінований код, що виконується на події життєвого циклу Claude Code.">
            Промпт — це <em>прохання</em>.<br />
            Хук — це <em>гарантія</em>.
          </BigStatement>
          <Bullets
            items={[
              <>
                «Запускай тести після змін» у CLAUDE.md — Claude <strong>може</strong> забути.
              </>,
              <>
                Хук <Term>PostToolUse</Term> на <Term>Edit|Write</Term> — тести запускаються{" "}
                <strong>щоразу</strong>. Це не рішення моделі — це код.
              </>,
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "hooks-events",
    section: "Hooks",
    content: {
      en: (
        <>
          <SlideTitle kicker="hooks">The key events</SlideTitle>
          <FieldTable
            headers={["Event", "When it fires"]}
            rows={[
              { field: "SessionStart", meaning: "Session starts/resumes — inject context (git status)" },
              { field: "UserPromptSubmit", meaning: "You sent a prompt, Claude hasn't seen it yet — can append or block" },
              { field: "PreToolUse", meaning: "Before a tool call — CAN BLOCK (deny/ask/allow)" },
              { field: "PostToolUse", meaning: "After a successful call — lint after Edit, typecheck after Write" },
              { field: "PermissionRequest", meaning: "A permission dialog appeared — can auto-decide" },
              { field: "Stop", meaning: "Claude finished responding — notification, final check" },
              { field: "SubagentStart / SubagentStop", meaning: "Subagent lifecycle" },
              { field: "PreCompact / PostCompact", meaning: "Around context compaction" },
              { field: "SessionEnd", meaning: "Session ends — cleanup" },
            ]}
          />
          <Note>
            There are 30+ events — also <Term>FileChanged</Term>, <Term>Notification</Term>,{" "}
            <Term>TaskCompleted</Term>... To inspect what's configured: the <Term>/hooks</Term>{" "}
            command.
          </Note>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="хуки">Ключові події</SlideTitle>
          <FieldTable
            headers={["Подія", "Коли спрацьовує"]}
            rows={[
              { field: "SessionStart", meaning: "Сесія стартує/відновлюється — докинути контекст (git status)" },
              { field: "UserPromptSubmit", meaning: "Ти надіслав промпт, Claude ще не бачив — можна дописати або заблокувати" },
              { field: "PreToolUse", meaning: "Перед викликом тула — МОЖЕ ЗАБЛОКУВАТИ (deny/ask/allow)" },
              { field: "PostToolUse", meaning: "Після успішного виклику — lint після Edit, typecheck після Write" },
              { field: "PermissionRequest", meaning: "З'явився діалог дозволу — можна вирішити автоматично" },
              { field: "Stop", meaning: "Claude закінчив відповідь — сповіщення, фінальна перевірка" },
              { field: "SubagentStart / SubagentStop", meaning: "Життєвий цикл субагента" },
              { field: "PreCompact / PostCompact", meaning: "Навколо стиснення контексту" },
              { field: "SessionEnd", meaning: "Сесія завершується — прибирання" },
            ]}
          />
          <Note>
            Подій 30+ — є ще <Term>FileChanged</Term>, <Term>Notification</Term>,{" "}
            <Term>TaskCompleted</Term>... Подивитися, що налаштовано: команда <Term>/hooks</Term>.
          </Note>
        </>
      ),
    },
  },
  {
    id: "hooks-config",
    section: "Hooks",
    content: {
      en: (
        <>
          <SlideTitle kicker="hooks">Configuration: settings.json</SlideTitle>
          <CodeBlock
            lang="json"
            title=".claude/settings.json — typecheck after every code edit"
            code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm --silent typecheck",
            "async": true,
            "statusMessage": "typecheck..."
          }
        ]
      }
    ]
  }
}`}
          />
          <Bullets
            items={[
              <>
                <Term>matcher</Term> — tool name: <Term>Bash</Term>, <Term>Edit|Write</Term>, regex{" "}
                <Term>mcp__.*</Term>.
              </>,
              <>
                Exit code <Term>0</Term> = OK; <Term>2</Term> = block, stderr goes back to Claude
                as feedback — it will go fix the problem.
              </>,
              <>
                Hook types: <Term>command</Term>, <Term>prompt</Term> (ask the model yes/no),{" "}
                <Term>agent</Term>, <Term>http</Term>, <Term>mcp_tool</Term>.
              </>,
            ]}
          />
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="хуки">Конфігурація: settings.json</SlideTitle>
          <CodeBlock
            lang="json"
            title=".claude/settings.json — typecheck після кожної правки коду"
            code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm --silent typecheck",
            "async": true,
            "statusMessage": "typecheck..."
          }
        ]
      }
    ]
  }
}`}
          />
          <Bullets
            items={[
              <>
                <Term>matcher</Term> — ім'я тула: <Term>Bash</Term>, <Term>Edit|Write</Term>, regex{" "}
                <Term>mcp__.*</Term>.
              </>,
              <>
                Код виходу <Term>0</Term> = ОК; <Term>2</Term> = блок, stderr повертається Claude як
                фідбек — він піде виправляти проблему.
              </>,
              <>
                Типи хуків: <Term>command</Term>, <Term>prompt</Term> (спитати модель так/ні),{" "}
                <Term>agent</Term>, <Term>http</Term>, <Term>mcp_tool</Term>.
              </>,
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "hooks-this-repo",
    section: "Hooks",
    content: {
      en: (
        <>
          <SlideTitle kicker="live demo">This repository's hooks</SlideTitle>
          <FieldTable
            headers={["Hook", "What it does"]}
            rows={[
              {
                field: "PostToolUse · Edit|Write",
                meaning: "Runs typecheck asynchronously after every edit — a broken type shows up immediately.",
              },
              {
                field: "PreToolUse · Bash(git push*)",
                meaning: "deny: pushing is manual. Claude physically can't push, whatever it decides.",
              },
              {
                field: "Stop",
                meaning: "A sound signal — you hear when a long task finishes (coffee-proof).",
              },
            ]}
          />
          <Note>
            They live in <Term>.claude/settings.json</Term> — committed to git, so{" "}
            <strong>the whole team gets identical behavior</strong>. Inspect via{" "}
            <Term>/hooks</Term> — it lists <em>every</em> source (plugins, global, skills), so
            you'll see more than these; <strong>ours are exactly these 3</strong>.
          </Note>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="живе демо">Хуки цього репозиторію</SlideTitle>
          <FieldTable
            headers={["Хук", "Що робить"]}
            rows={[
              {
                field: "PostToolUse · Edit|Write",
                meaning: "Запускає typecheck асинхронно після кожної правки — зламаний тип видно одразу.",
              },
              {
                field: "PreToolUse · Bash(git push*)",
                meaning: "deny: пуш — тільки руками. Claude фізично не може запушити, що б він не вирішив.",
              },
              {
                field: "Stop",
                meaning: "Звуковий сигнал — чуєш, коли довга задача завершилась (можна йти за кавою).",
              },
            ]}
          />
          <Note>
            Вони лежать у <Term>.claude/settings.json</Term> — закомічені в git, тож{" "}
            <strong>уся команда має ідентичну поведінку</strong>. Дивись через{" "}
            <Term>/hooks</Term> — він показує <em>усі</em> джерела (плагіни, глобальні, скіли),
            тож побачиш більше; <strong>наших — рівно ці 3</strong>.
          </Note>
        </>
      ),
    },
  },
  {
    id: "hooks-scoped",
    section: "Hooks",
    content: {
      en: (
        <>
          <SlideTitle kicker="hooks">
            Hooks in skills and agents — active <em>only while they run</em>
          </SlideTitle>
          <Cols>
            <Col title="The tdd skill with a guarantee">
              <CodeBlock
                lang="yaml"
                code={`---
name: tdd
description: Test-driven development with
  red-green-refactor loop...
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "pnpm --silent typecheck"
---`}
              />
            </Col>
            <Col title="What this buys you">
              <Bullets
                items={[
                  <>
                    While a TDD session runs — every edit is checked. The skill ends — the hook is
                    gone.
                  </>,
                  <>Global hooks = project rules. Skill hooks = process rules.</>,
                  <>
                    Comparison: feature-forge <strong>without a hook</strong> — "check types in
                    FINALIZE" is an instruction in text, can be forgotten.{" "}
                    <strong>With a hook</strong> — the phase won't pass with a red typecheck.
                  </>,
                ]}
              />
            </Col>
          </Cols>
        </>
      ),
      uk: (
        <>
          <SlideTitle kicker="хуки">
            Хуки в скілах і агентах — діють <em>тільки поки ті працюють</em>
          </SlideTitle>
          <Cols>
            <Col title="Скіл tdd із гарантією">
              <CodeBlock
                lang="yaml"
                code={`---
name: tdd
description: Test-driven development with
  red-green-refactor loop...
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "pnpm --silent typecheck"
---`}
              />
            </Col>
            <Col title="Що це тобі купує">
              <Bullets
                items={[
                  <>
                    Поки йде TDD-сесія — кожна правка перевіряється. Скіл завершився — хука немає.
                  </>,
                  <>Глобальні хуки = правила проєкту. Хуки скіла = правила процесу.</>,
                  <>
                    Порівняння: feature-forge <strong>без хука</strong> — «перевір типи у
                    FINALIZE» це інструкція в тексті, її можна забути.{" "}
                    <strong>З хуком</strong> — фаза не пройде з червоним typecheck.
                  </>,
                ]}
              />
            </Col>
          </Cols>
        </>
      ),
    },
  },
];
