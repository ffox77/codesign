# Judge (referee)

Placeholders: `{{FIRST_PATH}}`, `{{SECOND_PATH}}` (two lists of design tensions), `{{BRIEF_PATH}}`, `{{BASELINE_PATH}}`.

Read only these four files. Do not edit anything. The brief describes a design problem; the baseline is a first design for it. Each list holds entries of this form: `### T<n>: <conflict>`, then `Roles:`, `Side 1:`, `Side 2:`, `Would settle it:`. Both lists describe conflicts in the same baseline. Judge each entry on its own merits; the order in which the lists are given means nothing.

For every entry in each list, in order:
- `id`: the entry's `T<n>`.
- `mark`: one of
  - `real`: a genuine conflict in this design that someone has to decide, where both sides have a strong case;
  - `obvious`: true, but anyone working on this design would raise it unprompted;
  - `noise`: not a real conflict (one side is weak, the two sides don't actually pull against each other, or it is off the design problem).
- `inBaseline`: true if the baseline already raises this conflict or already settles it; false if the baseline does not address it.
- `reason`: one line on why you gave that mark.

Then `preferred`: `first` or `second`, the list you would rather design from, and `why`: one line.

Be strict. A list does not earn credit for length, polish or confident wording. A conflict whose "Would settle it" line could not actually be carried out is weaker than one whose could.

Return JSON matching the output schema. `first` holds the entries of `{{FIRST_PATH}}` and `second` those of `{{SECOND_PATH}}`, one item per entry, none skipped.
