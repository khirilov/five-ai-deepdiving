# Покроковий гайд: MCP, плагіни та демо цього репозиторію

> Особистий конспект для підготовки до доповіді. Тут — що де працює, які MCP та плагіни
> ставити, і як усе налаштувати крок за кроком. Команди виконуються в терміналі в корені
> цього репо, якщо не сказано інше.

---

## 0. Три способи розширити Claude Code — як вони співвідносяться

| Механізм | Що це | Де живе | Коли обирати |
| --- | --- | --- | --- |
| **Скіли / команди / агенти / хуки** | Твої власні інструкції та автоматика | `.claude/` у репо (або `~/.claude/` глобально) | Знання і процеси ТВОЄЇ команди |
| **MCP-сервер** | Міст до зовнішнього інструмента (браузер, GitHub, доки) | `claude mcp add` → `~/.claude.json` або `.mcp.json` | Claude має ЧИТАТИ/КЕРУВАТИ зовнішньою системою |
| **Плагін** | Пакет «скіли + агенти + хуки + MCP» від когось іншого, ставиться однією командою | `~/.claude/plugins/` | Готове чуже рішення, не хочеш писати сам |

Важливо для розуміння: плагін — це формат **дистрибуції**. Всередині плагіна ті самі
скіли/агенти/хуки/MCP, що ми пишемо руками в `.claude/` — просто запаковані.

---

## 1. MCP: як це працює і базові команди

**Як працює:** MCP-сервер — окремий процес (локальний `stdio` або віддалений `http`),
який оголошує Claude список своїх інструментів. Claude бачить їх як `mcp__<сервер>__<тул>`
і викликає так само, як вбудовані Read/Bash.

**Ціна:** схеми інструментів кожного увімкненого сервера висять у контексті КОЖНОГО
запиту (Chrome DevTools ≈ 18k токенів, Playwright ≈ 13.7k). Тому правило: **підключай
під задачу, вимикай після**.

**Три скоупи** (куди зберігається конфіг):

| Скоуп | Команда | Де лежить | Хто бачить |
| --- | --- | --- | --- |
| local (дефолт) | `claude mcp add ...` | `~/.claude.json` (прив'язано до проєкту) | тільки ти, тільки цей проєкт |
| project | `claude mcp add --scope project ...` | `.mcp.json` у корені → комітиться в git | вся команда |
| user | `claude mcp add --scope user ...` | `~/.claude.json` | ти, у всіх проєктах |

**Службові команди:**

```bash
claude mcp list          # список серверів + статус підключення
claude mcp get <name>    # деталі одного сервера
claude mcp remove <name> # видалити
# всередині сесії: /mcp — статус, логін у OAuth-сервери, перегляд тулів
```

> ⚠️ Проєктні сервери з `.mcp.json` Claude Code попросить підтвердити при першому
> запуску — це захист від чужих конфігів. Скинути вибір: `claude mcp reset-project-choices`.

---

## 2. MCP-сервери для фронтенду — що ставити і як

> ✅ **У цьому репо вже лежить `.mcp.json`** (project scope) з трьома демо-серверами:
> `chrome-devtools`, `playwright`, `context7`. На твоїй машині нічого додавати не треба —
> при першому запуску Claude Code у цьому проєкті просто **підтверди** ці сервери
> (сам діалог підтвердження — теж демо: так команда ділиться інструментами через git).
> Команди нижче — довідка, як це робиться з нуля в будь-якому іншому проєкті.

### 2.1 Chrome DevTools MCP — дебаг і перформанс (ПОТРІБЕН для `/browser-reviewer`)

**Що дає:** Claude бачить консоль, network, робить скріншоти, знімає performance-трейси
та Lighthouse у справжньому Chrome. Питання, на яке відповідає: *«чому сторінка
повільна / сипле помилки?»*

**Налаштування (1 команда, потрібен Chrome і Node):**

```bash
claude mcp add --transport stdio chrome-devtools -- npx chrome-devtools-mcp@latest
```

> ⚠️ **Версія Node.** `chrome-devtools-mcp@latest` вимагає **Node ≥ 20.19.0**. На старіших
> (напр. 20.16) сервер мовчки падає в `✘ Failed to connect`, хоча playwright/context7 ще
> працюють. Перевір `node --version`; якщо менше — онови (через nvm-windows це
> `nvm install 22.20.0 && nvm use 22.20.0`, **у терміналі з правами адміністратора** —
> nvm міняє симлінк у `C:\Program Files\nodejs`). Після апгрейду перезапусти сесію.

**Перевірка:**
1. Перезапусти сесію Claude Code (або reload вікна VS Code).
2. `claude mcp list` → `chrome-devtools ✓ Connected`.
3. У сесії: «open localhost:5173 and check the console for errors» — Chrome відкриється сам.

**Демо на доповіді:** `pnpm dev` → `/browser-reviewer` → вставити acceptance criteria
(наприклад: «стрілки гортають слайди, #/5 відкриває п'ятий, консоль чиста») → Claude сам
клацає по деці й звітує з метриками.

---

### 2.2 Playwright MCP — драйв юзер-флоу (e2e)

**Що дає:** керує браузером через accessibility-снепшоти (не скріншоти): клік, форма,
сабміт, перевірка флоу end-to-end. Крос-браузерність (Chromium/Firefox/WebKit).
Питання: *«чи працює флоу від початку до кінця?»*

**Налаштування:**

```bash
claude mcp add --transport stdio playwright -- npx @playwright/mcp@latest
```

**Перевірка:** `claude mcp list` → Connected; у сесії «use playwright to open
localhost:5173, press ArrowRight three times and tell me which slide is shown».

**Різниця з DevTools (для слайда):** DevTools = спостерігати (дебаг/перф),
Playwright = діяти (флоу/e2e). Тримати обидва постійно = ~32k токенів податку —
показуй це через `/context` як живий аргумент.

---

### 2.3 Context7 — актуальні доки бібліотек

**Що дає:** підтягує свіжу документацію конкретної версії бібліотеки прямо в контекст.
Лікує «Claude пише код під React 17 / стару версію Next.js». Найпопулярніший MCP взагалі
(~54k зірок).

**Налаштування (віддалений http — нічого не треба ставити):**

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

(є й локальний варіант: `claude mcp add --transport stdio context7 -- npx -y @upstash/context7-mcp`)

**Перевірка:** «use context7 to look up how to define hooks in a Claude Code skill» або
«…the React 19 use() API» — у відповіді з'являться виклики `mcp__context7__*`.

---

### 2.4 GitHub: `gh` CLI (основне) — MCP не потрібен

**Висновок наперед:** для GitHub **MCP не обов'язковий**. `gh` CLI (вже встановлений,
`gh auth login`) покриває все демо, і Claude викликає його через Bash. Це навіть кращий
приклад для слайда: «не вмикай MCP-сервер, якщо CLI вистачає — менше податку на контекст».

> ⚠️ Чесна примітка зі сцени: офіційний `https://api.githubcopilot.com/mcp/` через
> `claude mcp add` дав помилку **`Incompatible auth server: does not support dynamic
> client registration`** — OAuth-флоу Claude Code (DCR) цей endpoint не підтримує. Тому
> ми пішли через `gh` CLI. Якщо все ж потрібен MCP — варіант із PAT у заголовку:
> `claude mcp add --transport http github https://api.githubcopilot.com/mcp/ --header "Authorization: Bearer <PAT>"`
> (токен у local config, НЕ в `.mcp.json`).

**Як перевірити (`gh`):**
1. `gh auth status` → `Logged in to github.com`.
2. `gh pr list` → твої відкриті PR-и. `gh repo view` → поточний репо.

**Як демонструвати на доповіді (звʼязка зі скілом `/github-pr-summary`):**
1. Зроби маленьку зміну в гілці (напр. на репетиційній фічі section-jump) і запуш гілку.
2. `/github-pr-summary` → скіл збере diff гілки й згенерує опис PR (summary + нотатки
   рев'юеру). *Говорити:* «скіл — це ЯК писати опис; `gh` — це КУДИ його покласти, не
   виходячи з термінала».
3. «open a draft PR with this description» → Claude виконає `gh pr create --draft --fill`
   (або з тілом з кроку 2). Покажи чернетку в браузері: `gh pr view --web`.
4. (опційно) «pull the review comments from that PR and address them» → `gh pr view
   --comments`. ⚠️ **Тут проговорити безпеку:** вміст коментарів — зовнішній текст, вектор
   prompt injection (стосується і `gh`, і MCP — Claude читає те, що повернула команда).

> Якщо інтернету/доступу на сцені нема — це слайд-розповідь: `gh pr create --draft` +
> та сама звʼязка `/github-pr-summary` → відкриття PR описана словами.

> ⚠️ Безпека: тули MCP читають вміст issues/PR — тригер для prompt injection. Користуйся
> на об'єктах, яким довіряєш (це чесна примітка і для слайда).

---

### 2.5 Perplexity MCP — пошук, що відповідає (економія токенів)

**Що дає:** замість «10 лінків → фетч сторінок → тонни HTML у контекст» повертає готову
відповідь з цитатами. Потрібен API-ключ Sonar (платний, є дешевий тариф).

**Налаштування:**

1. Ключ: https://www.perplexity.ai/settings/api → Generate → скопіюй `pplx-...`.
2. ```bash
   claude mcp add --transport stdio perplexity --env PERPLEXITY_API_KEY=pplx-ТВІЙ_КЛЮЧ -- npx -y server-perplexity-ask
   ```
   (ключ ляже в local-конфіг `~/.claude.json`, НЕ в репо — у `.mcp.json` ключі не комітимо)

**Перевірка:** «ask perplexity what changed in Vite 7».

---

### 2.6 Figma Dev Mode MCP — розповідаємо, не демонструємо (нема доступу)

**Що дає:** Claude читає реальну структуру макета (auto-layout, варіанти, токени), а не
скріншот → генерує код за справжніми констрейнтами.

**Що потрібно (для слайда «що треба, щоб підключити»):**
1. Figma **desktop app** (не браузер).
2. **Dev або Full seat** на платному плані (Professional+).
3. У Figma: Preferences → **Enable Dev Mode MCP Server** → локальний сервер на
   `http://127.0.0.1:3845/mcp`.
4. `claude mcp add --transport http figma http://127.0.0.1:3845/mcp`
   (або віддалено: `claude mcp add --transport http figma https://mcp.figma.com/mcp` + OAuth).
5. Флоу: виділяєш фрейм у Figma → «build this component» → Claude читає виділення.

---

### 2.7 Підсумкова рекомендація

| Сервер | Ставити? | Скоуп |
| --- | --- | --- |
| chrome-devtools | ✅ вже в `.mcp.json` репо — лише підтвердити | project |
| playwright | ✅ вже в `.mcp.json` репо — лише підтвердити | project |
| context7 | ✅ вже в `.mcp.json` репо — лише підтвердити | project |
| github | ❌ MCP не треба — `gh` CLI покриває (OAuth DCR не підтримується; PAT як запасний) | — |
| perplexity | ⚪ опційно (потрібен платний ключ — НЕ в `.mcp.json`!) | local |
| figma | ❌ нема доступу — лише слайд | — |

Після доповіді залиш увімкненими тільки те, чим реально користуєшся щодня
(перевір вагу через `/context`).

---

## 3. Плагіни: що це і які показати

**Як працює:** плагін = git-репозиторій-маркетплейс зі списком пакетів. Один пакет може
нести скіли, агентів, хуки та MCP-сервери разом. Ставиться глобально в `~/.claude/plugins/`
і працює в усіх проєктах.

**Базові команди:**

```bash
# додати маркетплейс (один раз)
claude plugin marketplace add <owner/repo>

# поставити плагін з маркетплейсу
claude plugin install <plugin>@<marketplace>

# в сесії: /plugin — інтерактивне меню (browse, install, enable/disable)
```

Офіційний каталог: https://claude.com/plugins (маркетплейс `claude-plugins-official`
вже підключений за замовчуванням).

### 3.1 caveman — головне демо економії токенів

```bash
claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman
```

Режими: `/caveman lite` (прибрати воду) · `/caveman full` (телеграфний стиль) ·
`/caveman ultra` (максимум). −65% output-токенів у середньому, код не змінюється,
thinking не чіпає. **Демо:** одне й те саме питання до/після `/caveman full` —
порівняй довжину відповіді.

### 3.2 frontend-design — найпопулярніший плагін взагалі (~830k встановлень)

```bash
claude plugin install frontend-design@claude-plugins-official
```

Скіл від Anthropic, що змушує Claude генерувати виразний UI замість «AI-слопу»:
смілива типографіка, нестандартні палітри й розкладки. **Демо:** «create a pricing
card component» до і після — різниця видовищна.

### 3.3 typescript-lsp — Claude бачить помилки типів як IDE

```bash
claude plugin install typescript-lsp@claude-plugins-official
```

Підключає TypeScript language server: Claude отримує діагностику типів одразу, без
запуску `tsc`. Для TS-команди — тихий, але постійний приріст якості.

### 3.4 context7 як плагін (альтернатива п.2.3)

```bash
claude plugin install context7@claude-plugins-official
```

Той самий Context7, але однією командою без ручного MCP-конфігу — гарний приклад
«плагін = зручна упаковка MCP» для слайда.

### 3.5 superpowers — згадати як «що далі» (~750k встановлень)

Великий community-набір скілів (brainstorm → plan → implement workflow). Для доповіді
не демо, а приклад того, наскільки розвинулась екосистема: одна команда — десятки скілів.

### 3.6 Learning mode — «машина для навчання» (бонус-слайд у кінці деки)

**Що це:** НЕ MCP і не сторонній плагін — це режим спілкування Claude Code
(output style), який Anthropic тепер постачає і як офіційний плагін. Два варіанти:

- **Learning** — Claude пише обв'язку сам, але на змістовних рішеннях зупиняється і
  лишає тобі `TODO(human)`: «напиши ці 5–10 рядків логіки сам», пояснює варіанти
  й трейдофи. Навчання через руки, а не через читання.
- **Explanatory** — Claude працює як завжди, але до кожного неочевидного рішення додає
  блок `★ Insight` з 2–3 пунктами «чому так».

**Як увімкнути (актуально для CLI ≥ 2.1.91 — стару команду `/output-style` видалили):**

```text
# 1) основний шлях — меню конфігурації:
/config  →  Output style  →  Learning | Explanatory

# 2) або руками в .claude/settings.local.json:
{ "outputStyle": "Learning" }

# ⚠️ застосовується ПІСЛЯ /clear або нової сесії
#    (системний промпт читається раз на старті)

# 3) альтернатива для роздачі команді — офіційний плагін:
#    (плагін є і в дефолтному claude-plugins-official, і в репо anthropics/claude-code;
#     останній додається як маркетплейс під іменем "claude-code-plugins")
claude plugin install learning-output-style@claude-plugins-official
# або, якщо додав маркетплейс anthropics/claude-code:
#   claude plugin install learning-output-style@claude-code-plugins
```

**Перевірка:** попроси «add a small util that groups slides by section» — у Learning
Claude залишить `TODO(human)` і чекатиме твій код; в Explanatory з'являться ★ Insight.

**Демо на доповіді (бонус-слайд):** увімкни `learning`, попроси дрібну фічу, покажи
`TODO(human)` наживо. Меседж: «вчити будь-що разом із Claude»: маленький проєкт →
learning mode → Claude скаффолдить, ти заповнюєш пропуски → `/grill-me` по тому, що
написав → повторити.

> ⚠️ Нюанс: інструкції режиму додаються в кожну сесію — це трохи токенів. Вимикай,
> коли не вчишся (`/config` → Output style → Default, або disable плагіна).

---

## 4. Що вже налаштовано в ЦЬОМУ репо (нічого ставити не треба)

| Що | Де | Як демонструвати |
| --- | --- | --- |
| Оркестратор `/feature-forge` | `.claude/skills/feature-forge/` | повний цикл із субагентами в DESIGN (довге демо) |
| `/feature-forge-solo` | `.claude/skills/feature-forge-solo/` | те саме БЕЗ субагентів → порівняти `/context` після DESIGN |
| **`/deck-review`** | `.claude/commands/deck-review.md` + агент `slide-reviewer` | ШВИДКЕ демо fan-out: 7 паралельних рев'юерів на haiku vs `--solo` інлайн |
| **`/deck-stats`** | `.claude/skills/deck-stats/` | живе демо `context: fork`: аналіз у форку, в основний контекст падає лише табличка |
| Субагент design-explorer | `.claude/agents/design-explorer.md` | спавниться з feature-forge (DESIGN-фаза) |
| Субагент slide-reviewer | `.claude/agents/slide-reviewer.md` | заодно демо `model: haiku` + `maxTurns` (дешева модель під рутину) |
| Fan-out `/mantine-css-auditor` | команда + 2 агенти | розповісти патерн словами (Mantine тут нема — не лайв) |
| `.mcp.json` | корінь репо | project-scope MCP: підтвердження при першому запуску + `/mcp` |
| `/mr-reviewer`, `/browser-reviewer` | `.claude/commands/` | browser-reviewer потребує chrome-devtools MCP (п.2.1) |
| Хуки проєкту | `.claude/settings.json` + `.claude/hooks/` | `/hooks`; спробувати `git push` → deny від хука |
| Хук у скілі | frontmatter `tdd` | «use TDD to build X» → у статусбарі видно хук |
| Пам'ять з імпортом | `CLAUDE.md` → `@AGENTS.md` | показати один рядок імпорту |

---

## 5. Чек-лист підготовки (за день до доповіді)

1. [ ] `git init && git add -A && git commit -m "init"` — без git не буде diff-демо
       для `/add-slide` і `/mr-reviewer`.
2. [ ] `pnpm install && pnpm dev` → http://localhost:5173 відкривається, дека гортається.
3. [ ] Запусти Claude Code у репо → **підтверди сервери з `.mcp.json`**
       (chrome-devtools, playwright, context7) → `claude mcp list` → всі Connected.
       ⚠️ **chrome-devtools вимагає Node ≥ 20.19** — якщо `✘ Failed to connect`, спершу
       онови Node (див. п.2.1). playwright + context7 — вже Connected.
       Прожени `npx chrome-devtools-mcp@latest --help` і `npx @playwright/mcp@latest --help`
       заздалегідь, щоб npx закешував пакети не на сцені.
4. [x] Плагіни ВЖЕ встановлені (user scope, всі проєкти): `caveman`, `frontend-design`,
       `typescript-lsp`, `learning-output-style` → перевір `claude plugin list` (усі enabled)
       і `/caveman lite`. Learning mode: `/config` → Output style → Learning → `/clear` →
       перевір, що з'являються TODO(human). Поверни Default після перевірки.
5. [ ] У сесії: `/help` (команди на місці), `/hooks` (3 хуки), `/mcp` (сервери), `/context` (вага).
6. [ ] Прогін демо: `/mr-reviewer` на якихось незакомічених змінах — він сам збере
       весь diff (staged + unstaged + untracked) і видасть рев'ю.
7. [ ] Прогін демо: `/deck-stats` (до/після `/context`), потім `/deck-review` і
       `/deck-review --solo` — швидке порівняння субагенти vs без, знай таймінг.
8. [ ] Найважливіше: **прогнати `/feature-forge-solo demo` і `/feature-forge demo`** —
       це найдовше демо; якщо таймінг не влазить, на сцені показуй `/deck-review`,
       а feature-forge — скрінкастом. Обидва forge-скіли ручні: набираєш
       `/feature-forge <опис фічі>` — самі вони не тригеряться.

## 6. Якщо щось не працює (траблшутінг)

- **MCP-сервер не видно в сесії** → перезапусти сесію/вікно; `claude mcp list` покаже
  помилку підключення, `claude mcp get <name>` — деталі.
- **`⏸ Pending approval`** біля проєктного сервера → запусти `claude` інтерактивно і
  підтверди; скинути вибір: `claude mcp reset-project-choices`.
- **`npx` висить на першому запуску** → перший старт качає пакет; прожени команду
  заздалегідь, не на сцені.
- **Хук не спрацьовує** → `/hooks` показує, що зареєстровано і з якого файлу; хуки
  читаються на старті сесії — після правки `settings.json` перезапусти сесію.
- **Контекст роздуло** → `/context` покаже винуватця (зазвичай MCP-сервер) →
  `claude mcp remove <name>` або вимкни в `/mcp`.
