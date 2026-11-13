# Research-check grader (referee)

Placeholders: `{{SPEC_DIR}}` (folder holding `tasks.md`, `baseline-answers.md`, `check-answers.md`, `extracts.md`). Used by the wrapper; the smoke test passes `FIXTURE_DIR` with the same meaning.

You are grading step 7b of the research protocol (`method/research-protocol.md`, "Step 7b"). Read only the four files in the folder you were given: `tasks.md`, `baseline-answers.md`, `check-answers.md`, `extracts.md`. Do not edit anything.

For each `K` and `Q` item in `tasks.md`:
1. Read the item's `Excellent answer:` line.
2. Read the answer to that item in `baseline-answers.md` and in `check-answers.md`.
3. Judge `check-answers.md` against `baseline-answers.md`, using the excellent answer as the yardstick:
   - `improved`: the check answer is materially closer to the excellent answer.
   - `same`: no material difference.
   - `worse`: the check answer is further from the excellent answer.
4. Give one line of reason.
5. For an `improved` item, list in `drivenBy` the `F<n>` ids that drove the gain. Start from that answer's `Findings used:` line and check each finding against the text of `extracts.md` and the answer; drop any the answer does not actually reflect. For `same` or `worse`, `drivenBy` is an empty list.

Then:
- `findingsKept`: every finding id in `extracts.md` that appears in at least one item's `drivenBy`.
- `findingsDropped`: every other finding id in `extracts.md`.
- Each finding appears in exactly one of the two lists.

Return your result as JSON matching the output schema: `items` (one per `K`/`Q` item, in file order, with `id` such as `K1`, `verdict`, `reason`, `drivenBy`), `findingsKept`, `findingsDropped`. Counts (`improved`, `same`, `worse`, `total`, and the sizes of the two finding lists) are computed by the wrapper from your lists, so do not return them.
