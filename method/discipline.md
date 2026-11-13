# Design discipline

Whoever writes the baseline design applies this, whatever tool they are.

Before deciding anything, sort the decisions by how hard they are to undo once built and in use.

- **Hard to undo (one-way doors).** Reversing them costs far more than the code: data already written in the old shape, contracts others depend on (APIs, event and file formats), boundaries and ownership between parts or teams, the consistency model, the security and tenancy model, platform and vendor commitments, and habits people have formed.
- **Cheap to undo (two-way doors).** Internal structure and most choices inside one boundary. Decide these quickly; don't spend the design on them.

For each hard-to-undo decision in the design:
1. Name it, and say what would make it hard to reverse.
2. Decide it deliberately, and say why.
3. Where you can, make it cheaper to undo: version contracts from the start, translate at boundaries instead of sharing internal shapes, keep data shapes plain, and plan to replace things gradually rather than all at once.

End the design with a short `## Hard to undo` section listing those decisions.
