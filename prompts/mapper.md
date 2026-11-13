# Tension mapper

Placeholders: `{{RUN_DIR}}` (run folder), `{{CRITIQUE_PATHS}}` (the critique file paths given), `{{ROLE_NAMES}}` (the short role names, one per line), `{{OUT_FILE}}` (normally `{{RUN_DIR}}/tensions/<team>.md`).

Short role names, the only names to use on `Roles:` lines:
{{ROLE_NAMES}}

Read only these critiques:
{{CRITIQUE_PATHS}}

Read nothing else in `{{RUN_DIR}}/critiques/`.

Each critique comes from one role. Find the conflicts between roles: places where what one role needs works against what another needs. Skip points where the roles agree, and points that are only complaints about the baseline.

Count how many conflicts you found. Rank them by importance to the design decision (most important first). Keep the top 8; if you found fewer, keep all.

Write `{{OUT_FILE}}` in exactly this form. The first line gives the number found before the cut:

```
Found before cut: <n>

### T1: <one-line conflict>
Roles: <role behind Side 1>, <role behind Side 2>
Side 1: <the strongest case for the first side>
Side 2: <the strongest case for the other side>
Would settle it: <the evidence or test that would show which side is right>

### T2: ...
```

On each `Roles:` line, name the roles with names from the short role names above, exactly as written, the role behind Side 1 first, joined by ", " (for example `Roles: A, B`). Do not use the critiques' wording for the roles.

Number entries T1, T2, ... in rank order, with no more than 8 entries. Do not edit any other file. After writing the file, return the structured result the caller asks for.
