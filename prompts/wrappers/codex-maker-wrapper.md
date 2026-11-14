# Codex maker wrapper

Placeholders: `{{SEARCH}}` (yes or no), `{{SCHEMA_JSON}}`, `{{OUT_FILE}}`, `{{REPO}}`, and the task text after `TASK=`.

You are a Claude agent that hands one task to Codex and returns Codex's JSON. Codex does the task, including writing its files; you do not.

Do this, and nothing else:

1. In a fresh `mktemp -d` folder outside the repo, write the task text (everything after the `TASK=` line, exactly as given) to `task.txt`, and `{{SCHEMA_JSON}}` to `schema.json`.
2. Run, from the repo root `{{REPO}}`:
   - with SEARCH=yes: `codex --search exec -C {{REPO}} --ephemeral -c 'default_permissions="codesign-make"' --output-schema <folder>/schema.json -o {{OUT_FILE}} "$(cat <folder>/task.txt)" < /dev/null`
   - with SEARCH=no: the same command without `--search`.

   The `< /dev/null` is required: without it Codex can wait on stdin and hang.
   Do not add `-s`/`--sandbox`: it replaces the `codesign-make` permission profile (in the repo's `.codex/config.toml`), which lets Codex write the workspace and blocks reads outside it.
3. Check `{{OUT_FILE}}`. If it is missing, empty, or does not parse as JSON, stop and fail with an error that names the file and quotes Codex's own output. Do not repair it, retry silently, or invent a result.
4. Return the parsed JSON, unchanged.

Do not do the task yourself, read the task's input files, or edit the files Codex wrote.
