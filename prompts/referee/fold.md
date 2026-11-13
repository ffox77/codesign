# Fold (referee)

Placeholders: `{{BRIEF_PATH}}`, `{{BASELINE_PATH}}`, `{{LIST_1_PATH}}`, `{{LIST_2_PATH}}`.

Read only these four files. Do not edit anything. The brief states a design problem. The baseline is a first design for it. The two lists hold conflicts other reviewers found in the baseline, as entries of this form: `### T<n>: <conflict>`, then `Roles:`, `Side 1:`, `Side 2:`, `Would settle it:`. Call an entry by its list and number, for example `list-1 T3`.

Write the next version of the design. Start from the baseline and revise it so it takes a position on every entry in both lists. For each entry, decide one outcome:
- `settled`: the design now picks a side, or a combination, and says why in its own text.
- `open`: the design cannot pick without evidence. Make the smallest choice that keeps both options possible, and keep the entry's "Would settle it" test as an open question.
- `rejected`: not a real conflict for this design. Leave the design as it is on that point.

Rules:
- Keep what the baseline gets right. Change only what an entry gives a reason to change, and add nothing that neither the brief nor an entry asks for.
- Keep the baseline's section structure where you can, so the two versions can be compared section by section.
- After each change, name the entry that drove it in square brackets, for example `[list-1 T3]`.
- End the design with `## Open questions`: each open entry, the choice made for now, and its test.
- The two lists are equal sources. Never say or guess where either came from.

Return JSON matching the output schema: `markdown` (the whole revised design) and `decisions` (one item per entry in both lists, none skipped: `entry` as `list-<n> T<m>`, `outcome`, and `how`, one line on what the design now does about it).
