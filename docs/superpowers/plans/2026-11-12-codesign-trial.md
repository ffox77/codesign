# Codesign Trial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the files that let one Workflow run carry out the codesign trial on the Reasons brief, from baseline through the blind packet, and prove it on a small smoke run.

**Architecture:** The Workflow script (`codesign/trial.workflow.js`) only orchestrates: it can't read files, so every agent prompt is a short line pointing at a prompt file in `codesign/prompts/` plus run-specific paths. Prompt files give both teams the same wording, so they are easy to check. Codex steps are thin Claude agents that run `codex exec` with an output schema from `codesign/schemas/`. A Node mock harness runs the script with stub agents to test the orchestration rules; `codesign/tools/check-blind.mjs` tests the blind packet.

**Tech Stack:** Claude Code Workflow (plain JS), Node 22 (`node --test`), Codex CLI 0.167.1, Markdown.

**Spec:** `docs/superpowers/specs/2026-11-12-codesign-design.md`

## Global Constraints

- Script is plain JS; no `Date.now()`, `Math.random()`, argless `new Date()`, file or Node APIs. All inputs come through `args`.
- Both teams get the same critique prompt file and the same reading; the only difference is the identity line (knowledge file vs. "You are an expert in <field>.").
- Both mappers use the same prompt file; each sees only its own team's four critiques; at most **8** tensions each, plus the count found before the cut.
- Scrub: reword only, entries one to one; no merge, split, add or drop.
- Agent labels from step 3 on: `critique-1`…`critique-8`, `mapper-a`, `mapper-b`, `scrub`. Workflow and scrub return values give counts per list number and paths only, never a team name.
- Codex steps: `codex exec -C <repo> -s read-only --ephemeral --output-schema codesign/schemas/<name>.json -o <outfile> "<prompt>" < /dev/null`. The Claude wrapper writes files from Codex's output.
- Codex is referee only: research-check grader and scrub. Everything else is Claude.
- Plain-model test (protocol step 4): questions passed inline; no reading, no web; writes only its answers file.
- Specialists live in `codesign/specialists/<slug>/`; run output in `<runDir>/`.
- **Isolation (Frank's decision):** everything is built and run in a git worktree on branch `codesign-trial`, with this session moved into it, so `main` and the live Reasons plugins are untouched. No agent may read or write `~/Projects/Personal/tavryn/reasons/**` (Dora's tree) or any `plugins/reasons-*/**`. The Tavryn docs in `tavryn/docs/` and `inbox/reasons-measuring-decisions.md` stay readable; they are on the reading list.
- Readings for both teams: the brief, `<runDir>/baseline.md`, `~/Projects/Personal/tavryn/docs/{reasons-contract,reasons-build-and-measure-plan,target-customers,ebsidian-correction-sample}.md`, `inbox/reasons-measuring-decisions.md`.

## Review Focus

0. **A blocked path is reached anyway**, through a shell command the deny rules don't recognise (for example a Python script). The guard hook checks the full tool input text, logs every block to `codesign/runs/blocked.log`, and Task 0's tests try each route (Task 0).
1. **Blinding leaks through wording.** A scrubbed list still quoting a source or naming a field reveals the team. `check-blind.mjs` must catch citations (`http`, `et al.`, `(19|20)\d\d)`), team words and slugs (Task 3 tests).
2. **A Codex call hangs or returns non-JSON.** The wrapper must use `< /dev/null` and fail loudly if the `-o` file is missing or doesn't parse (Task 2 smoke test).
3. **A research critique runs before its knowledge file exists.** Each research critique must come after that specialist's compress step in the same chain (Task 4 ordering test).
4. **A specialist's chain dies partway** (an agent returns `null`). The run must continue with the other specialists and report the missing slug, not crash (Task 4 test).
5. **Scrub changes entry counts.** The list counts must equal the two mappers' counts as a set (Task 3 test).

---

### Task 0: Isolated worktree and blocked paths

**Files:**
- Commit on `main` first: the staged moves (`inbox/reasons-agent-design-process.md` → `codesign/agent-design-process.md`, `inbox/reasons-brief.md` → `codesign/briefs/reasons.md`), so the worktree has them.
- Create (in the worktree): `.claude/settings.json`, `codesign/tools/guard.sh`
- Test: `codesign/test/guard.test.sh`

**Interfaces:**
- Produces: a session whose primary working directory is the worktree (project settings load only from there), on branch `codesign-trial`. Every later task runs in it.
- `guard.sh`: a PreToolUse hook. Reads the hook JSON on stdin; if the serialized `tool_input` contains `tavryn/reasons/` or `plugins/reasons-`, it appends `<tool_name> <first 200 chars>` to `codesign/runs/blocked.log` and blocks the call (exit 2 with a reason on stderr); otherwise exit 0.
- `.claude/settings.json`: `permissions.deny` = `Read(//Users/ffox/Projects/Personal/tavryn/reasons/**)`, `Edit(//Users/ffox/Projects/Personal/tavryn/reasons/**)`, `Read(//Users/ffox/Projects/Personal/playground/**/plugins/reasons-*/**)`, `Edit(//Users/ffox/Projects/Personal/playground/**/plugins/reasons-*/**)`; `hooks.PreToolUse` = one entry, matcher `*`, command `bash codesign/tools/guard.sh`.

- [ ] **Step 1: Commit the moves on `main`:** `git commit -m "codesign: move design notes into codesign/" -- codesign/agent-design-process.md codesign/briefs/reasons.md inbox/reasons-agent-design-process.md inbox/reasons-brief.md`
- [ ] **Step 2: Create the worktree and move the session into it** with the EnterWorktree tool, branch `codesign-trial`. Verify: `git branch --show-current` → `codesign-trial`.
- [ ] **Step 3: Write the failing test** `codesign/test/guard.test.sh`: pipes hook JSON into `guard.sh` and asserts exit 2 for a `Bash` command `cat ~/Projects/Personal/tavryn/reasons/dora/tree.md`, a `Bash` command `python3 -c "open('/Users/ffox/Projects/Personal/tavryn/reasons/dora/tree.md')"`, a `Read` of `.../plugins/reasons-delivery/README.md`, and an `Edit` of `.../plugins/reasons-audit/x`; exit 0 for a `Read` of `~/Projects/Personal/tavryn/docs/reasons-contract.md` and of `inbox/reasons-measuring-decisions.md`; and that `blocked.log` gained exactly 4 lines.
- [ ] **Step 4: Run** `bash codesign/test/guard.test.sh` → FAIL.
- [ ] **Step 5: Write `guard.sh` and `.claude/settings.json`** per Interfaces.
- [ ] **Step 6: Run** `bash codesign/test/guard.test.sh` → PASS.
- [ ] **Step 7: Live check in a subagent:** dispatch one throwaway Agent told to `cat` Dora's `tree.md` and to Read `plugins/reasons-delivery/README.md`, and to report what happened. Expected: both refused, two new lines in `blocked.log`. If the subagent got through, stop and report; the run is not isolated.
- [ ] **Step 8: Commit** `git add .claude/settings.json codesign/tools/guard.sh codesign/test/guard.test.sh` then `git commit -m "codesign: block Dora's tree and Reasons plugins in the trial worktree" -- .claude/settings.json codesign/tools/guard.sh codesign/test/guard.test.sh`. (`blocked.log` is not committed until the runs.)

### Task 1: Research protocol and research-step prompts

**Files:**
- Create: `codesign/research-protocol.md`

**Interfaces:**
- Produces: `codesign/research-protocol.md` with sections `## Step 1 — Plan` … `## Step 8 — Compress`. Each research agent is told "Do Step N of codesign/research-protocol.md for specialist `<slug>` (field: `<field>`), working in `codesign/specialists/<slug>/`, search budget `<n>`."
- Produces file names per specialist: `plan.md`, `tasks.md`, `baseline-answers.md`, `sources.md`, `extracts.md`, `check-answers.md`, `check.md`, `knowledge.md`.

- [ ] **Step 1: Write `codesign/research-protocol.md`** following spec §5 step 2's table, one section per step, each naming its input files, output file, and the fixed form below:
  - Step 1 plan: research questions; source types counted; inclusion rules; stop rule = at most `<search budget>` searches, and stop early after two consecutive rounds of 5 searches add no new finding; a "Changes" log section.
  - Step 2 viewpoints: appended to `plan.md` under `## Viewpoints`; 3–6 viewpoints, each with 2–4 questions.
  - Step 3 tasks: `tasks.md` with `## Tasks` (3–5, each `### K<n>` with the task and `Excellent answer:`) and `## Probe questions` (8–12, each `### Q<n>` with `Excellent answer:`). Step 3 also returns the same items as structured output (schema `TASKS` in Task 4).
  - Step 5 source log entry: title, URL, type (`paper | book | practitioner-post | talk | postmortem | other`), grade (`A` peer-reviewed or primary data; `B` named practitioner with track record, real cases; `C` opinion or unsourced), one line on what it adds.
  - Step 6 finding form, `### F<n>`: `Experts:` what they notice or do that novices don't; `Cue:`; `Case:` a real case or incident; `Evidence:` strong/moderate/weak; `Source:` source-log entry. Cases rank above general advice.
  - Step 7a: answer every `K`/`Q` item with `extracts.md` loaded → `check-answers.md`.
  - Step 7b (Codex grader): per item `improved | same | worse` against `Excellent answer:`, and which findings drove each improvement; a finding is kept only if it drove at least one `improved`.
  - Step 8: `knowledge.md` = kept findings only, same form, plus a 5-line summary at top; citations kept.
- [ ] **Step 2: Verify** — `grep -c "^## Step" codesign/research-protocol.md` → `8`.
- [ ] **Step 3: Commit**

```bash
git add codesign/research-protocol.md
git commit -m "codesign: research protocol" -- codesign/research-protocol.md
```

### Task 2: Shared prompts, rubric and Codex schemas

**Files:**
- Create: `codesign/prompts/baseline.md`, `critique.md`, `mapper.md`, `grader.md`, `scrub.md`, `codex-wrapper.md`
- Create: `codesign/rubric.md`
- Create: `codesign/schemas/grade.json`, `codesign/schemas/scrub.json`
- Create: `codesign/test/fixtures/grade/` (a 2-item `tasks.md`, `baseline-answers.md`, `check-answers.md`, `extracts.md`)
- Test: `codesign/test/codex-smoke.sh`

**Interfaces:**
- Produces tension entry format (mapper output, scrub input and output): `### T<n>: <one-line conflict>`, then `Roles:`, `Side 1:`, `Side 2:`, `Would settle it:`. Mapper file header: `Found before cut: <n>`.
- Produces `grade.json`: `{items: [{id, verdict: "improved"|"same"|"worse", drivenBy: [findingId]}], findingsKept: [id], findingsDropped: [id]}`, all required.
- Produces `scrub.json`: `{listA: [{title, roles, side1, side2, settle}], listB: [...]}`, each `maxItems: 8`.
- `codex-wrapper.md`: instructions for a Claude agent given `{promptFile, inputs, schema, outFile}`: build the Codex prompt from `promptFile` + inputs, run the Global Constraints command, fail with an error if `outFile` is missing or not JSON, return the parsed JSON.

- [ ] **Step 1: Write the failing smoke test** `codesign/test/codex-smoke.sh`: runs the wrapper's command with `grader.md` on `codesign/test/fixtures/grade/`, output to the scratch dir, then `node -e` parses it and asserts `items.length === 2` and every `verdict` is one of the three values.
- [ ] **Step 2: Run** `bash codesign/test/codex-smoke.sh` → FAIL (no `grader.md` / schema).
- [ ] **Step 3: Write the prompt files, rubric and schemas.**
  - `baseline.md`: read only the brief; no web, no other files; design the next version of Reasons; write `<runDir>/baseline.md`.
  - `critique.md`: one prompt for both teams, with a `{{IDENTITY}}` line the script fills; read the readings list; return what the baseline gets wrong from your angle, your requirements, expected conflicts with the other roles (`organizational learning`, `evaluation methods`, `context engineering`, `daily user`); write `<runDir>/critiques/<team>/<slug>.md`.
  - `mapper.md`: read the four critique paths given; list conflicts between roles; rank by importance; keep the top 8; tension entry format above.
  - `grader.md`: Step 7b of the protocol; output per `grade.json`.
  - `scrub.md`: reword both lists into one neutral style; remove citations, source names, research-flavoured field jargon, team words; one to one; keep order within each list.
  - `rubric.md`: spec §6 verbatim marks (Real / obvious / noise; New to me: yes / no; overall preference + one line), a table per list with rows T1–T8, and the pre-decided evidence rule from §6.
  - Schemas per the Interfaces block (Codex needs `additionalProperties: false` and every property in `required`).
- [ ] **Step 4: Run** `bash codesign/test/codex-smoke.sh` → PASS.
- [ ] **Step 5: Commit** `git add codesign/prompts codesign/rubric.md codesign/schemas codesign/test` then `git commit -m "codesign: prompts, rubric, Codex schemas" -- codesign/prompts codesign/rubric.md codesign/schemas codesign/test`.

### Task 3: Blind-packet checker

**Files:**
- Create: `codesign/tools/check-blind.mjs`
- Test: `codesign/test/check-blind.test.mjs` (fixtures built in temp dirs inside the test)

**Interfaces:**
- Produces: `checkBlind(runDir: string, slugs: string[]): {ok: boolean, problems: string[]}`, exported; CLI `node codesign/tools/check-blind.mjs <runDir> <slug>...` exits 0 or 1 and prints problems.
- Reads `<runDir>/blind/list-1.md`, `list-2.md`, `rubric.md`, `<runDir>/key.md`, `<runDir>/tensions/research.md`, `tensions/label.md`.

- [ ] **Step 1: Write failing tests:**
  - `passes a clean packet` → `ok === true`.
  - `flags a citation` (list-1 contains `Smith et al. 2019`) → problem mentions `list-1`.
  - `flags a URL`, `flags the word "research"`, `flags a slug` (`codesign-org-learning`), each → `ok === false`.
  - `flags more than 8 entries` (9 `### T` headings).
  - `flags changed counts` (tensions have 5 and 7 entries; lists have 5 and 6).
  - `flags a missing key.md` and `a missing rubric.md`.
- [ ] **Step 2: Run** `node --test codesign/test/check-blind.test.mjs` → FAIL.
- [ ] **Step 3: Implement `checkBlind`.** Entries are `^### T\d+` headings; count check compares `{n1, n2}` as a sorted pair; forbidden patterns are case-insensitive: `research`, `label`, `specialist`, `knowledge.md`, `http`, `et al`, `\b(19|20)\d\d\b`, and each slug.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add codesign/tools codesign/test/check-blind.test.mjs` then `git commit -m "codesign: blind-packet checker" -- codesign/tools codesign/test/check-blind.test.mjs`.

### Task 4: Workflow script and mock harness

**Files:**
- Create: `codesign/trial.workflow.js`
- Create: `codesign/test/harness.mjs` (loads the script: strips `export ` from `export const meta`, wraps the body in an `AsyncFunction` with params `agent, parallel, pipeline, phase, log, args, budget`; `parallel` = `Promise.all` of thunks with throw → `null`; `pipeline` = per-item async chain with throw → `null`)
- Test: `codesign/test/workflow.test.mjs`

**Interfaces:**
- Consumes: prompt files (Task 2), `research-protocol.md` step names (Task 1), `grade.json`/`scrub.json` (Task 2).
- `args`: `{runDir: string, brief: string, readings: string[], searchBudget: number, specialists: [{slug: string, field: string}]}`.
- In-script schemas: `TASKS` `{items: [{id, kind: "task"|"probe", text, excellent}]}`; `CRITIQUE` `{wrong: string[], requirements: string[], conflicts: [{withRole, about}]}`; `TENSIONS` `{foundBeforeCut: integer, tensions: [{title, roles, side1, side2, settle}] maxItems 8}`; `CHECK` = `grade.json` shape plus `slug`; `SCRUB_RESULT` `{list1Count: integer, list2Count: integer}`.
- Returns: `{checks: [{slug, improved, same, worse, total, findingsKept, findingsDropped}], missing: [slug], lists: {"list-1": n, "list-2": n}, paths: [string]}`.
- Labels: `baseline`; `onboard:<slug>:<step>` for steps `plan, viewpoints, tasks, probe, search, extract, check-answer, check-grade, compress`; `critique-1`…`critique-8`; `mapper-a`, `mapper-b`; `scrub`.
- Phases (meta and calls match): `Baseline`, `Onboard`, `Critique`, `Map`, `Blind`.

- [ ] **Step 1: Write failing tests** in `workflow.test.mjs`, using the harness with a stub `agent` that records `{prompt, opts}` and returns schema-shaped fakes keyed by label:
  - `makes 48 agent calls with 4 specialists` (1 + 36 + 8 + 2 + 1).
  - `meta phases equal the phase() calls`.
  - `research and label critique prompts differ only in the identity line` (for each slug, after removing the `{{IDENTITY}}` line and the `critiques/<team>/` output path).
  - `mapper prompts differ only in the four input paths and output path`.
  - `labels from Critique on are neutral` (match `/^(critique-[1-8]|mapper-[ab]|scrub)$/`).
  - `return value names no team or slug` (`JSON.stringify(result)` has no `research`, `label`, or any slug).
  - `grader and scrub prompts point at codex-wrapper.md and a schema in codesign/schemas/`.
  - `probe prompt contains every task and probe text inline and no file path except its output`.
  - `research critique for a slug is called after that slug's compress` and `label critiques are called before any compress`.
  - `a specialist whose chain returns null is listed in missing and the run still returns lists` (stub returns `null` for `onboard:codesign-daily-user:search`; that team's mapper then gets 3 critiques).
- [ ] **Step 2: Run** `node --test codesign/test/workflow.test.mjs` → FAIL (no script).
- [ ] **Step 3: Implement `codesign/trial.workflow.js`.** Baseline first (both teams need `baseline.md`). Then one `parallel` of two thunks: the research side (`pipeline` over specialists: the nine onboarding calls, then the critique; then `mapper-a` on the surviving critiques) and the label side (`parallel` of four label critiques, then `mapper-b`). Pass the `TASKS` result into the `probe` prompt inline. Grader and scrub are Claude agents told to follow `codesign/prompts/codex-wrapper.md`. The scrub agent's prompt passes `tensions/research.md` and `tensions/label.md` as list A and list B, tells it to draw the order with `echo $((RANDOM % 2))`, write `blind/list-1.md` and `blind/list-2.md` in the entry format, write `key.md`, copy `codesign/rubric.md` to `blind/rubric.md`, and return `SCRUB_RESULT` only. Critique labels `critique-1`…`critique-8` are assigned in the order research slug 1, label slug 1, research slug 2, …
- [ ] **Step 4: Run** `node --test codesign/test/` → all PASS.
- [ ] **Step 5: Commit** `git add codesign/trial.workflow.js codesign/test/harness.mjs codesign/test/workflow.test.mjs` then `git commit -m "codesign: trial workflow script with mock harness" -- codesign/trial.workflow.js codesign/test/harness.mjs codesign/test/workflow.test.mjs`.

### Task 5: Smoke run

**Files:**
- Create: `codesign/test/fixtures/smoke-brief.md` (half a page: design a one-page "decision log" convention for a two-person team)
- Run output: `codesign/runs/smoke/` (committed, so the real run has a reference)

- [ ] **Step 1: Launch** the Workflow with `scriptPath: codesign/trial.workflow.js` and args `{runDir: "codesign/runs/smoke", brief: "codesign/test/fixtures/smoke-brief.md", readings: [], searchBudget: 5, specialists: [{slug: "codesign-smoke-a", field: "Organizational learning: how teams record decisions and revisit them"}, {slug: "codesign-smoke-b", field: "The daily user: a developer working alongside an agent team"}]}`.
- [ ] **Step 2: Verify outputs** — every per-specialist file from Task 1 exists for both slugs; `codesign/runs/smoke/critiques/{research,label}/` hold 2 files each; `node codesign/tools/check-blind.mjs codesign/runs/smoke codesign-smoke-a codesign-smoke-b` exits 0; the workflow's return value has `missing: []`; `codesign/runs/blocked.log` has no lines beyond Task 0's (if it has, read them: an agent tried a blocked path, and the prompt that led there needs fixing).
- [ ] **Step 3: If any check fails,** fix the prompt or script, rerun with `resumeFromRunId`, and add a test to Task 4's file for the cause.
- [ ] **Step 4: Commit** `git add codesign/test/fixtures/smoke-brief.md codesign/runs/smoke codesign/specialists/codesign-smoke-a codesign/specialists/codesign-smoke-b` then `git commit -m "codesign: smoke run" -- codesign/test/fixtures/smoke-brief.md codesign/runs/smoke codesign/specialists`.

**Not in this plan:** merging `codesign-trial` into `main`, and launching the real run (about 50 agents) on the Reasons brief. That is Frank's call after the smoke run; its args are the spec's four specialists, `readings` from Global Constraints, `runDir: codesign/runs/reasons-1`, `searchBudget: 30`.
