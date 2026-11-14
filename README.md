# codesign

A test rig for agent design teams. Two teams of agents critique the same baseline design. One team's specialists are built from research; the other team is only told which role to play. Each team's conflicts become a list of at most 8 tensions. The two lists are rewritten into one neutral style, shuffled and judged blind. Why, and where it goes next: `docs/vision.md`.

Explainer with diagrams: [Codesign Trial](https://claude.ai/artifact/9WCK8o3cQmXwD55hUpzZKC) (private).

## Map

| Path | What it holds |
|---|---|
| `trial.workflow.js` | The workflow that runs a trial, from baseline to blind packet, judges, fold and compare. |
| `method/` | The rules of the trial. Changing these changes the experiment: `research-protocol.md` (how a specialist is built), `rubric.md` (the judging sheet), `discipline.md` (shared design discipline every baseline maker gets). |
| `prompts/make/` | Tasks for the making side: baseline, critique, mapper. |
| `prompts/referee/` | Tasks for the refereeing side: grader, scrub, judge, fold, compare. |
| `prompts/wrappers/` | How a Claude agent hands a step to Codex: `codex-wrapper.md` (referee steps, read-only) and `codex-maker-wrapper.md` (making steps, can write; `--search` for the search step). |
| `schemas/` | Output schemas for the refereeing steps. |
| `briefs/` | Design briefs. A brief must be self-contained; agents read nothing else about the project. |
| `specialists/` | Reusable specialists, one folder per slug, each ending in `knowledge.md`. |
| `runs/<name>/` | A run's output: baseline, critiques, tensions, blind packet, key, judges, `final.md`, `compare.md`. Test runs also keep their own `specialists/`. |
| `tools/check-blind.mjs` | Checks a blind packet before a person reads it. |
| `test/` | Tests, the Codex smoke test, and fixtures (including the smoke brief). |
| `docs/` | `vision.md`, `agent-design-process.md` (the original thought piece), and the original design spec and plan from the superpowers skills (`superpowers/specs/`, `superpowers/plans/`). Those older docs use a `codesign/` path prefix from when this lived in the playground repo. |

## Running a trial

Args: `{runDir, brief, searchBudget, specialists: [{slug, field}], makers?, specialistsDir?}`.

- `makers`: `"claude"` (default) or `"codex"`, the provider that writes the baseline, onboarding, critiques and tension maps. The other provider referees (grader, scrub, judges, fold, compare). The tell-check is Claude either way.
- `specialistsDir`: where specialists are built and read; default `specialists`. Test runs use `runs/<name>/specialists`.
- Each specialist's role name is its field line up to the first colon; it must not hint at a team.

After a run: score `runs/<name>/blind/list-1.md` and `list-2.md` with `blind/rubric.md` first. Then read the judges (`judge/`), `final.md` and `compare.md`, which show which list moved the design. Open `key.md` last.

Launch a run in a turn whose message is only the go-ahead: the workflow tool copies the latest user message into every agent's prompt, and an unrelated request there can make an agent refuse its step.

## Runs kept

- `runs/smoke`: the first smoke run, Claude making, before the move (paths inside use the old layout).
- `runs/mini-codex`: smoke brief, Codex making, Claude refereeing, before the shared discipline was added.

## Local settings

`.claude/settings.local.json` (not committed) turns off the Reasons plugins for this project and denies the file tools access to the Reasons project, the playground repo and the local plugin marketplace. It does not cover Bash.

`.codex/config.toml` (not committed) does the same for Codex. It defines two permission profiles that deny reads of those three paths: `codesign-make` (can write the workspace) and `codesign-referee` (read-only). The wrappers pick one with `-c 'default_permissions="…"'`. The macOS sandbox enforces the block, not only the model's instructions. Never pass `-s`/`--sandbox` alongside a profile: it replaces the profile and the reads go through. Without this file, every Codex step fails with `default_permissions refers to undefined profile`.

## Tests

```
node --test test/workflow.test.mjs test/check-blind.test.mjs
bash test/codex-smoke.sh   # calls Codex
```
