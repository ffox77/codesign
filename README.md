# codesign

A test rig for agent design teams. Two teams of agents critique the same baseline design. One team's specialists are built from research (`research-protocol.md`); the other team is only told which role to play. Each team's conflicts become a list of at most 8 tensions. The two lists are rewritten into one neutral style, shuffled and judged blind (`rubric.md`).

- `trial.workflow.js`: the workflow. Args: `{runDir, brief, searchBudget, specialists: [{slug, field}]}`.
- `briefs/`: design briefs. A brief must be self-contained; agents read nothing else about the project.
- `prompts/`, `schemas/`: agent prompts and Codex output schemas.
- `specialists/<slug>/`: each specialist's research, ending in `knowledge.md`.
- `runs/<name>/`: a run's baseline, critiques, tension lists, blind packet and key.
- `tools/check-blind.mjs`: checks a blind packet before a person reads it.
- `.claude/settings.local.json` (not committed): turns off the Reasons plugins for this project and denies the file tools access to the Reasons project, the playground repo and the local plugin marketplace. Bash is not covered.
- `docs/`: the original design spec and plan, written when this lived in the playground repo (their paths use a `codesign/` prefix).

## Tests

```
node --test test/workflow.test.mjs test/check-blind.test.mjs
bash test/codex-smoke.sh   # calls Codex
```
