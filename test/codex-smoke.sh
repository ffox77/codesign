#!/usr/bin/env bash
# Smoke test: run the grader prompt through Codex on a 2-item fixture and check the JSON.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
command -v codex >/dev/null 2>&1 || { echo "FAIL: codex is not on PATH" >&2; exit 1; }
[ -f "$REPO/prompts/referee/grader.md" ] || { echo "FAIL: prompts/referee/grader.md missing" >&2; exit 1; }
[ -f "$REPO/schemas/grade.json" ] || { echo "FAIL: schemas/grade.json missing" >&2; exit 1; }
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
OUT="$TMP/grade-out.json"
PROMPT="Follow prompts/referee/grader.md with these values: FIXTURE_DIR=test/fixtures/grade (tasks.md, baseline-answers.md, check-answers.md and extracts.md are in that folder)."
codex exec -C "$REPO" -s read-only --ephemeral \
  --output-schema schemas/grade.json -o "$OUT" "$PROMPT" < /dev/null
[ -s "$OUT" ] || { echo "FAIL: Codex wrote no output file" >&2; exit 1; }
node -e '
const g = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
const ok = ["improved","same","worse"];
if (!Array.isArray(g.items) || g.items.length !== 2) throw new Error("items.length !== 2: " + (g.items && g.items.length));
for (const i of g.items) if (!ok.includes(i.verdict)) throw new Error("bad verdict: " + i.verdict);
for (const k of ["findingsKept","findingsDropped"]) if (!Array.isArray(g[k])) throw new Error(k + " missing");
console.log("PASS: " + g.items.map(i => i.id + "=" + i.verdict).join(", "));
' "$OUT"
