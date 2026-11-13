# Compare (referee)

Placeholders: `{{BRIEF_PATH}}`, `{{BASELINE_PATH}}`, `{{FINAL_PATH}}`, `{{LIST_1_PATH}}`, `{{LIST_2_PATH}}`.

Read only these five files. Do not edit anything. The brief states a design problem. The baseline is the first design. The final design is the baseline revised against two lists of conflicts; its changes name the entries that drove them in square brackets, such as `[list-1 T3]`.

Write a comparison of the final design against the baseline, as markdown with these sections:

1. `## Summary`: three to five lines on how the design changed overall.
2. `## Changes by section`: for each section that changed, what the baseline said, what the final design says, and which entries drove the change. Skip sections that did not change.
3. `## Conflicts the brief should have named`: the entries that changed the design materially and that the brief does not state as a conflict. A brief that mentions each force on its own (for example "entries must be short" and, elsewhere, "entries must keep the reasons") but never says they pull against each other, or which should win, has not stated the conflict; such an entry belongs here. Leave out only entries whose conflict the brief already spells out. These are the conflicts the problem statement would have been better for naming. For each: the entry, the conflict in one line, why it matters to the design, and one sentence the brief could have added. Rank them by how much they changed the design, largest first.
4. `## Entries that changed nothing`: each entry that drove no change, and why (rejected, or the baseline already handled it). Write "None." if every entry drove a change.
5. `## Changes per list`: how many changes each list drove.

Judge the two lists as equal sources. Never say or guess where either came from. Do not grade the final design; describe what changed.

Return JSON matching the output schema: `markdown` (the whole comparison), `changes` (one item per change: `section`, `change` in one line, `entries` that drove it, each as `list-<n> T<m>`), and `briefGaps` (the entries in section 3, in rank order: `entry`, `why`, `briefLine`).
