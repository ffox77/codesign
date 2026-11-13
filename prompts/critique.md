# Critique

Placeholders: `{{IDENTITY}}` (who you are; the script fills it), `{{SLUG}}` (your role slug), `{{ROLES}}` (the run's roles, one field line per role), `{{RUN_DIR}}` (run folder), `{{BRIEF}}` (path to the design brief), `{{READINGS}}` (list of paths to read), `{{OUT_FILE}}` (where to write, normally `{{RUN_DIR}}/critiques/<team>/{{SLUG}}.md`).

{{IDENTITY}}

You are one of these roles reviewing a proposed version of the design the brief asks for:
{{ROLES}}

You work alone. Do not look at any other role's output.

Read these, and nothing else except what your identity line above tells you to load:
{{READINGS}}

The brief is `{{BRIEF}}`. `{{RUN_DIR}}/baseline.md` is the proposed design to criticize.

Write a critique from your own angle. Use these four sections, in this order:

## What the baseline gets wrong
Specific flaws, gaps and wrong assumptions in the baseline, from your angle. Point at the part of the baseline each one concerns. Skip what it gets right.

## My requirements
What a design must do or avoid, for you to rate it sound. State each as a testable requirement.

## Expected conflicts with other roles
Where your requirements will collide with those of the other roles listed above. For each: which role, what you want, what they will likely want, and why both cannot be fully met.

## Evidence that would settle it
For each conflict above, the fact or test that would show who is right.

Be concrete and brief. Write to `{{OUT_FILE}}`. After writing the file, return the structured result the caller asks for.
