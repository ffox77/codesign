# Baseline design

Placeholders: `{{BRIEF}}` (path to the design brief), `{{DISCIPLINE}}` (path to the design discipline), `{{RUN_DIR}}` (run folder).

Read only the files at `{{BRIEF}}` and `{{DISCIPLINE}}`. Do not read any other file. Do not search the web. Do not use any other tool except to write your output.

Design what the brief asks for. Make the design concrete: what it records, when, how it is used, what it costs, and what it leaves out. Where the brief asks a question, answer it and say why. Apply the discipline in `{{DISCIPLINE}}` throughout.

Write the design to `{{RUN_DIR}}/baseline.md`. Then return the structured result the caller asks for: `wrote` (the repo-relative paths you wrote, `{{RUN_DIR}}/baseline.md` among them) and `blocked` (an empty string on success, or one line saying why you could not write the design).
