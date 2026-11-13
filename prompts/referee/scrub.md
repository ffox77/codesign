# Scrub (referee)

Placeholders: `{{LIST_A_PATH}}`, `{{LIST_B_PATH}}` (the two un-scrubbed tension files).

Read only the two files at `{{LIST_A_PATH}}` and `{{LIST_B_PATH}}`. Ignore their `Found before cut:` lines. Do not edit anything. Each file holds tension entries of this form: `### T<n>: <conflict>`, then `Roles:`, `Side 1:`, `Side 2:`, `Would settle it:`.

Reword both lists into one neutral style, so a reader cannot tell which list came from which source. Same plain register, same level of detail and same sentence length in both.

Remove or rephrase:
- citations, author names, years, URLs, and the words "et al";
- names of papers, books, methods, frameworks and other sources;
- jargon that points to a body of literature rather than to the design problem;
- the words "research", "label" and "specialist", the literal text "knowledge.md", and any wording that names or hints at a team, expert file or onboarding;
- statistics and figures taken from studies or surveys: percentages, effect sizes, sample sizes, and phrases such as "studies show", "has been shown", "measured", "meta-analysis", "survey";
- named organizations, agencies or incidents used as evidence (for example a space agency's lessons database or a government audit report);
- finding and source ids such as `F3` or `S12`;
- 4-digit years.

Keep numbers that are design parameters: thresholds, durations in weeks or minutes, entry counts, size limits. Write them in words or plain figures, without a percent sign (write "a quarter", not "25%").

Rewrite a removed evidence claim as a plain design claim; do not just delete the sentence's point. For example, "Short regular reviews have shown about a 25% performance improvement" becomes "Short, regular reviews make later decisions better". Do the same in both lists, so neither reads as backed by studies the other lacks.

A checker reads the output. Do not use the words "study", "studies", "shown", "survey", "meta-analysis", "research", "label" or "specialist" anywhere, even in another sense (write "displayed", not "shown"), and no `%` sign.

Rules:
- Reword only. Entries map one to one: do not merge, split, add or drop any entry. Keep each list's order.
- Keep the meaning, and keep each side's strongest case and what would settle it. Do not add content.
- Do not change the role names that the design itself uses (for example "daily user").

Return JSON matching the output schema: `listA` (entries from the first file) and `listB` (entries from the second), each entry `{title, roles, side1, side2, settle}`. `title` is the conflict line without the `### T<n>:` prefix. Keep each list's entry count equal to its source file's.
