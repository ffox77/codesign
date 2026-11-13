# Codesign: first trial run on the Reasons brief

November 12, 2026
Status: design, approved by Frank 2026-11-12. Full size (about 50 agents); 8-tension cap kept.
Sources: `codesign/agent-design-process.md` (the method), `codesign/briefs/reasons.md` (the brief for this run).

## 1 Intent

Codesign is a design phase run by a team of agents (the method in `codesign/agent-design-process.md`). The claim behind it: specialists built from research into what sets experts apart raise real design tensions that agents given a role label only do not.

This first run has two goals, in this order:

1. **Evidence about the method** (primary). Does the research-built team raise tensions that a label-only team does not?
2. **A better design for Reasons** (secondary), from the research team's output.

## 2 Goals, non-goals, anti-goals

**Goals**
- A blind comparison: two tension lists, one per team, that Frank reads without knowing which team wrote which.
- Four reusable specialists in `codesign/specialists/<slug>/`, built by the agents themselves in an onboarding session that follows a fixed research protocol (`codesign/research-protocol.md`).
- An early measure, before any critique: did each specialist's research change its answers?
- After the comparison, the research team's tensions carried through Frank's decisions, a pre-mortem and the real-case test (steps 5–6) to a Reasons design.

**Non-goals**
- A `codesign` plugin or a tool that works for any brief. Build that only if this run shows the method works.
- The experience layer (agents learning from their own cases).
- Interviews. Onboarding is research only; no tacit knowledge from Frank or outside practitioners.
- Statistical proof. One run on one brief is a first signal, not a result.

**Anti-goals** (the run fails even if it completes)
- The blind read leaks which team is which, so Frank's judgment is not blind.
- Frank's views reach the specialists before step 5, so a research-team win can't be credited to research.
- Specialists see each other's critiques before writing their own, so they converge.

## 3 Decided in conversation (Frank)

- Evidence about the method is primary; the Reasons design is secondary.
- Specialists prepare their own context in an onboarding session. sme is prior art, not a dependency.
- The research step follows a fixed protocol built from established review and expertise methods (§5 step 2), not free-form research.
- If a specialist's research barely changes its answers, that is recorded as an early measure and the run continues; all four still critique.
- The comparison team is label-only: same four roles, same brief, told only their role.
- Each tension list is capped at the 8 most important tensions, chosen by its mapper.
- Onboarding is research only, with no interview.
- The whole run is one Workflow script, not a runbook or plugin.
- Codex is used only as a referee: it grades the research check (§5 step 2, step 7) and does the blind-packet rewrite. Both teams' critiques and mappers stay on Claude, so the model is not a second difference between teams.

## 4 Approaches considered

| Approach | Trade-off | Outcome |
|---|---|---|
| Runbook in `codesign/` run by hand | Fastest to evidence; Frank watches each step; not repeatable as one run | Not chosen |
| `plugins/codesign/` plugin with onboard/run/judge skills | Reusable for any brief; built before knowing the method works | Not chosen |
| **One Workflow script that runs the trial end to end (steps 1–4 plus the blind packet)** | Repeatable and resumable; starts about 15 agents in one go | **Chosen by Frank** |

## 5 The run

Inputs passed as the workflow's `args`: the brief path, the run folder (`codesign/runs/reasons-1/`) and the four specialist definitions. The blind order is *not* an input (see Blind packet), because `args` show in the launching session, which Frank may watch.

All run output goes in `codesign/runs/reasons-1/`.

### Step 1 — Baseline
One agent reads the brief only (no Tavryn docs, no web) and designs the next version of Reasons. It writes `baseline.md`. This is the average design both teams critique.

### Step 2 — Onboarding (research team only)
Four agents run in parallel, one per specialist:

| Slug | Field |
|---|---|
| `codesign-org-learning` | Organizational learning and knowledge management: how teams record decisions and revisit them (ADRs, double-loop learning, design-rationale research) |
| `codesign-eval-methods` | Evaluation methods: what can be measured from real use, attribution, after-the-fact bias |
| `codesign-context-eng` | Context engineering for agents: delivery, timing, cost |
| `codesign-daily-user` | The daily user: a developer working alongside an agent team; what they would actually keep up |

Each specialist runs the same research protocol. The protocol is written once to `codesign/research-protocol.md` and is the same for all four; only the field line differs. Each step is its own `agent()` call, so the steps can't blur together, and each writes into `codesign/specialists/<slug>/`.

| # | Step | What it produces | Prior art |
|---|---|---|---|
| 1 | **Plan** before searching: the research questions, which source types count, inclusion rules, and a stop rule (a fixed search budget, or stop when two rounds add nothing new). Changes made later are logged, not hidden. | `plan.md` | Cochrane rapid reviews |
| 2 | **Viewpoints:** map how the field divides (schools of thought, academic versus practitioner, live debates) and write questions from each viewpoint. | added to `plan.md` | STORM |
| 3 | **Typical tasks:** 3–5 typical tasks in the field, each with what an excellent answer looks like, plus 8–12 probe questions drawn from the viewpoints. | `tasks.md` | Ericsson's expert-performance approach |
| 4 | **Plain-model test:** a separate agent with no tools and no project context answers the tasks and probe questions. Research then targets what it gets wrong or misses. | `baseline-answers.md` | sme baseline probe |
| 5 | **Search:** academic and practitioner sources (papers, books, practitioner blogs, talks, postmortems). Each source is logged with its type and a quality grade. | `sources.md` | Multivocal literature review (Garousi et al.) |
| 6 | **Extract** each finding in a fixed form: what experts notice or do that novices don't; the cue that triggers it; a real case or incident; evidence strength; source. Cases and incidents rank above general advice. | `extracts.md` | Critical Decision Method; Chi, Feltovich and Glaser |
| 7 | **Check:** a fresh agent answers the same tasks and probe questions with the findings loaded. A grader **on Codex** compares them with step 4, item by item, against the excellent-answer descriptions in `tasks.md`, so Claude is not grading Claude's work. A finding is kept only if it changed at least one answer for the better. | `check.md`: items whose answer changed, findings kept and dropped | sme validation |
| 8 | **Compress** the kept findings into a knowledge file with a fixed format and citations. | `knowledge.md` | sme compression |

The plain-model test (step 4) gets its questions passed in the prompt, so it needs no file access; it is told not to use tools.

**The check is an early measure.** `check.md` records, per specialist, how many tasks and probe questions changed materially. A specialist whose research barely changes anything is recorded and still critiques (Frank's decision). The workflow returns the four check summaries; they are about the research team only and reveal nothing about the blind order.

The specialist holds the field only. Tavryn's docs are not part of its research; both teams get them equally at step 3.

### Step 3 — Critiques, alone
Eight agents, each in its own session, none seeing another's output:
- **Research team (4):** loads its specialist's `knowledge.md`.
- **Label team (4):** told only "You are an expert in <field>", with the same field line as the table above. No research, no expert files. These can start at once, while onboarding runs.

Both teams get the same prompt and the same reading: the brief, `baseline.md`, and the Tavryn docs the brief cites (`reasons-contract.md`, `reasons-build-and-measure-plan.md`, `target-customers.md`, `ebsidian-correction-sample.md`, all in `~/Projects/Personal/tavryn/docs/`), plus `inbox/reasons-measuring-decisions.md`, which brief §5 question 6 depends on *(agent's call)*. Each returns a structured critique: what the baseline gets wrong from its angle, its requirements, and where it expects to conflict with the other roles. Each critique is saved to `critiques/<team>/<slug>.md`.

### Step 4 — Tension lists
Two mapper agents, one per team, with the same prompt; each sees only its own team's four critiques. Each returns a ranked list of at most **8** tensions, the most important it finds (Frank's decision, so counts compare fairly): what is in conflict, the roles involved, each side's strongest case, and the evidence that would settle it. Each mapper also reports how many tensions it found before cutting to 8; that number goes only into the un-scrubbed list.

### Blind packet
One scrub agent **on Codex** rewrites both lists into the same neutral style. It removes citations, named sources, field jargon that points to research, and anything that names a team. Both lists use the same entry format. **Reword only** *(agent's call)*: entries map one to one; it may not merge, split, add or drop entries, so the counts the judging relies on don't change. It draws the blind order itself with a shell random draw and writes it only to `key.md`. It writes:
- `blind/list-1.md`, `blind/list-2.md`, in the order it drew.
- `blind/rubric.md`: the judging sheet (section 6).
- `key.md`: which list is which. Frank doesn't open it until he has finished judging.

The un-scrubbed lists are kept in `tensions/<team>.md` for after unblinding.

**Nothing visible while the run is going may reveal the order** *(agent's call)*: agent labels from step 3 on are neutral (`critique-1`…`critique-8`, `mapper-a`, `mapper-b`, assigned so the label doesn't follow the team); the scrub agent's return value and the workflow's return value give tension counts per *list number* and paths only, never a team name.

## 6 Judging (Frank, by hand)

For each tension in each list, Frank marks:
- **Real / obvious / noise.** Real = a genuine conflict worth a decision; obvious = true but anyone would have raised it; noise = not a real conflict.
- **New to me: yes / no.**

Then overall: which list he would rather design from, and one line on why.

**What counts as evidence, decided before the run:** both lists hold at most 8 tensions. The method shows a signal if the research team's list has more tensions marked real *and* new, and Frank prefers it overall. A tie or a loss means this run did not show the method works. If neither team's critiques disagree much (few tensions in both lists), that is the doc's section 3 failure: no specialization happened.

Frank records marks in `codesign/runs/reasons-1/judgment.md`, then opens `key.md`.

## 7 After the reveal (steps 5–6, interactive, outside the workflow)

Run in a normal session, on the research team's tensions only:
- **Step 5:** Frank decides each tension; each decision is recorded with what would reopen it (`decisions.md`).
- **Step 6:** a pre-mortem agent attacks the chosen design; then the design is tested against cases 44, 45 and 46 (brief §6), saying for each what it would have recorded and when it would have raised the question.
- **Output:** `reasons-design.md` in the run folder.

## 8 Constraints

- The Workflow script has no file or clock access, and no randomness. Agents do all reading and writing; the run date comes in through `args`, and the blind order is drawn by the scrub agent.
- About 50 agents in one run: 1 baseline, about 36 onboarding (9 calls × 4 specialists: 8 steps, with the check split into an answerer and a grader), 8 critiques, 2 mappers, 1 scrub. Onboarding is the costly part, because of web research. This is above the session's default workflow size; Frank chose this approach knowing that.
- **Codex steps.** The Workflow tool starts only Claude agents. A Codex step is a thin Claude agent that runs `codex exec` (Codex CLI 0.167.1 is installed) with a read-only sandbox, `--output-schema` pointing at a schema file in `codesign/schemas/`, and `< /dev/null` (it otherwise waits on stdin; see `plugins/reasons-delivery/README.md:162`). The wrapper writes Codex's structured output to the run files. For the scrub, the wrapper also does the shell random draw and writes `key.md`; its return value follows the no-team-names rule.
- Keep a copy of the script at `codesign/trial.workflow.js`, so it can be rerun or resumed with `scriptPath`.

## 9 Left to the builder

- Exact prompts and output schemas for each stage, within the rules above (same prompt for both teams at steps 3 and 4).
- The exact wording of `codesign/research-protocol.md`, the stop rule's numbers, and the source quality grades, within the table in §5 step 2.
- Pipeline versus barrier: label critiques start at once; each specialist's 8 steps run as one pipeline chain; each research critique starts when its specialist is built; each team's mapper waits for its own four critiques.
- Wording of `rubric.md`, following section 6.
