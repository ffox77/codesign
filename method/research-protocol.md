# Research protocol

Each specialist's research follows these eight steps. One agent call does one step. You are told: the step number, the specialist slug, the field, the working folder (`specialists/<slug>/`, or a run's own `specialists/<slug>/` for a test run), and (for Step 1 and Step 5) a search budget `<n>`. Do only your step. Read only the files your step names. Research the field only; do not bring in any project or product context.

All files below sit in the working folder. Do not edit a file a step does not name, except to log a change in `plan.md` under `## Changes`.

## Step 1 — Plan

Prior art: Cochrane rapid reviews (plan before searching; log changes).

Inputs: the field line. Output: `plan.md`.

Write, before any search:
- `## Research questions` — 4–8 questions that a practitioner in the field would need answered.
- `## Sources that count` — which source types count (papers, books, practitioner posts, talks, postmortems) and which do not.
- `## Inclusion rules` — what a source must have to be logged (for example: real cases, named author, stated method). State what gets excluded.
- `## Stop rule` — at most `<n>` searches (the search budget you were given). Searches run in rounds of 5. Stop early if two consecutive rounds of 5 searches add no new finding.
- `## Changes` — empty log, headed "Changes (date, what, why)". Any later change to the plan is added here, never made silently.

## Step 2 — Viewpoints

Prior art: STORM (question-asking from several perspectives).

Inputs: `plan.md`. Output: appended to `plan.md`.

Map how the field divides: schools of thought, academic versus practitioner views, live debates. Append `## Viewpoints` with 3–6 viewpoints. Each has a name, one line on its position, and 2–4 questions that someone holding that view would ask. Do not change earlier sections.

## Step 3 — Typical tasks

Prior art: Ericsson's expert-performance approach (representative tasks that separate experts from novices).

Inputs: `plan.md`. Output: `tasks.md`, and the same items returned as structured output (schema `TASKS`).

`tasks.md` has two sections.

`## Tasks` — 3–5 typical tasks an expert in the field is given. Each:

```
### K<n>
<the task>
Excellent answer: <what an excellent answer contains and does>
```

`## Probe questions` — 8–12 questions drawn from the viewpoints, covering every viewpoint. Each:

```
### Q<n>
<the question>
Excellent answer: <what an excellent answer contains>
```

Write the excellent answers from what experts in the field would say, not from guesses about what a plain model says.

## Step 4 — Plain-model test

Prior art: sme baseline probe.

This step is run by a separate agent with no tools and no project context. The tasks and questions are in your prompt.

- Answer from your own knowledge only.
- Do not read files. Do not search.
- Write only `baseline-answers.md`.
- Give one answer per item, under `### K<n>` or `### Q<n>` matching the item's number. Answer every item, as well as you can; do not skip one for lack of certainty.

Research (Step 5) then targets what these answers get wrong or miss.

## Step 5 — Search

Prior art: multivocal literature review (Garousi et al.): academic and grey literature together, each source graded.

Inputs: `plan.md`, `tasks.md`, `baseline-answers.md`. Output: `sources.md`.

Compare `baseline-answers.md` with the `Excellent answer:` lines in `tasks.md`. Search for what the plain answers get wrong or miss. Follow the plan's inclusion rules and stop rule (stay within the search budget `<n>`; stop early after two rounds of 5 with nothing new). Mix academic and practitioner sources. Log any change of plan under `## Changes` in `plan.md`.

Log each source in `sources.md`:

```
### S<n>: <title>
URL: <url>
Type: paper | book | practitioner-post | talk | postmortem | other
Grade: A | B | C
Adds: <one line on what it adds>
```

Grades: `A` peer-reviewed or primary data. `B` named practitioner with a track record, real cases. `C` opinion or unsourced. Log C sources only if nothing better covers a question, and say so in `Adds`.

## Step 6 — Extract

Prior art: Critical Decision Method (Klein) and Chi, Feltovich and Glaser (how experts see and sort problems differently from novices).

Inputs: `sources.md` and the sources themselves (re-open them as needed). Output: `extracts.md`.

Write each finding in this form:

```
### F<n>
Experts: <what experts notice or do that novices don't>
Cue: <the signal that triggers it>
Case: <a real case or incident, with names, dates or places where the source gives them>
Evidence: strong | moderate | weak
Source: <S<n> from sources.md>
```

Cases and incidents rank above general advice: prefer findings that have a real `Case:`. If a finding has no case, write `Case: none` and rate evidence no higher than moderate. Do not invent cases. Do not add findings the sources do not support.

## Step 7 — Check

Prior art: sme validation. Two sub-steps, run by different agents, so Claude does not grade Claude's work.

### Step 7a — Answer with findings

Run by a fresh Claude agent. Inputs: `tasks.md`, `extracts.md`. Output: `check-answers.md`.

Read only those two files. Do not read `baseline-answers.md` or `sources.md`. Answer every `K` and `Q` item using the findings. Give one answer per item under `### K<n>` or `### Q<n>`. Under each answer add `Findings used:` listing the `F<n>` you drew on, or `none`.

### Step 7b — Grade (referee)

Run by the referee provider (Codex by default; Claude when Codex makes). Inputs: `tasks.md`, `baseline-answers.md`, `check-answers.md`, `extracts.md`. Output: `check.md`.

For each `K` and `Q` item, compare the answer in `check-answers.md` with the one in `baseline-answers.md`, against that item's `Excellent answer:` in `tasks.md`. Mark it `improved`, `same` or `worse`, with one line of reason. For each `improved` item, name the findings that drove the improvement (use the `Findings used:` lines, and check them against the text).

`check.md` contains:
- `## Items` — one line per item: `K1: improved — reason — drivers: F2, F5`. For `same` or `worse` items write `drivers: none`.
- `## Counts` — a fixed block, exactly these six lines:

```
improved: N
same: N
worse: N
total: N
findingsKept: N
findingsDropped: N
```

  Counts cover all `K` and `Q` items together. `total` is the number of items. `findingsKept` and `findingsDropped` are the sizes of `## Kept` and `## Dropped`; each finding appears in exactly one of the two lists.
- `## Kept` — findings that drove at least one `improved`.
- `## Dropped` — all other findings.

A finding is kept only if it drove at least one `improved`.

## Step 8 — Compress

Prior art: sme compression.

Inputs: `extracts.md`, `check.md`, `sources.md`. Output: `knowledge.md`.

Write `knowledge.md` with:
1. A 5-line summary at the top: the field's main lessons, one per line.
2. The kept findings only (from `## Kept` in `check.md`), in the Step 6 form (`### F<n>` with Experts, Cue, Case, Evidence, Source). Keep the citations: after each finding's `Source:` give the source's title and URL from `sources.md`.

Drop the dropped findings. Do not add anything not in `extracts.md`.
