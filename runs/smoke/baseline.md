# Design: DECISIONS.md, a one-page decision log for two people and their agents

## Summary

One file, `DECISIONS.md`, at the repo root. Newest entries on top. Each entry is five short lines. An entry is written when a choice closes off an alternative someone might later try again, and it is written in the same commit that acts on the choice. Entries are never deleted; they are marked `replaced`, `reversed` or `stale` with a pointer. Agents read the file at session start, may draft entries in their commits, but a human sets the entry's status to `active`. The whole convention fits on the top of the file itself.

## 1 The format

```markdown
## D-014 Use SQLite, not Postgres, for v1
- status: active            (proposed | active | replaced by D-0xx | reversed | stale?)
- date: 2026-11-13 · by: ana (+agent)
- why: single-user deploys; no ops budget; data under 1 GB for a year
- rejected: Postgres (ops cost), flat JSON (no queries)
- revisit if: >1 writer process, or data >5 GB
```

What each line is for:

| Line | Purpose | Why it earns its place |
|---|---|---|
| ID + title | `D-NNN` and the choice stated as a verb phrase | The ID is what commits, code comments and other entries cite. The title is what a search hits. |
| status | One word | Lets a reader skip dead entries in a second. |
| date · by | When and who (human first; `+agent` if an agent drafted it) | "Ask Ana" is often the fastest path to more context. |
| why | The one or two facts that made this choice win | This is the line people forget a month later. It is the point of the log. |
| rejected | The alternatives and one reason each | Stops the same debate restarting, and stops agents "helpfully" proposing the rejected option. |
| revisit if | A concrete condition that would reopen the choice | Turns staleness from a judgement into a check. |

What an entry must leave out:

- The discussion. No "we talked about…", no pros/cons essay. Link to a chat thread or PR if it exists.
- Implementation detail. How SQLite is wired up belongs in code and its comments.
- Decisions that are already enforced and obvious from the code (formatter settings, folder names) unless someone has argued about them.
- Anything over about six lines. If it needs more, it is a design doc; write that elsewhere and link it from a short entry.

## 2 What counts as a decision

Write an entry when any one of these holds:

1. You picked between two or more options that a reasonable person (or agent) might pick differently.
2. The choice would cost more than a day to undo.
3. You noticed yourself, the other person or an agent asking "why is it like this?" and the answer was not in the code.

Do not log: bug fixes, refactors that keep behaviour, routine dependency bumps, and choices that only one file cares about (use a code comment).

Rule 3 is the safety net: the log grows where confusion actually happened, not where someone guessed it might.

## 3 When an entry is written

Answer: at commit time, in the same commit that acts on the decision. Not at the moment of deciding, and not in a weekly pass.

Why:

- At the moment of deciding, the decision often is not final. Chat-time decisions get revised within the hour. Writing them then produces entries that are wrong by the end of the day.
- A weekly pass is the step that gets skipped first when both people are busy. Nobody's job is to maintain the log, so any rule that needs a separate session will lapse within a month. By then the "why" is already gone.
- The commit is the one moment where the decision is final enough to act on, the person still remembers why, and they are already writing a message. Putting the entry in the same diff also links the two: `git log -S "D-014"` finds the commit, and the commit message carries `Decision: D-014`.

A fallback for decisions that do not come with a commit (a "we won't do X" decision): add the entry in the next commit either person makes, with the real decision date.

One light weekly habit is allowed but not required: skim the top of the file for `proposed` entries older than a week and either accept or delete them. This takes under two minutes and is the only time a draft may be deleted outright.

## 4 Stale, reversed and replaced

Entries are never deleted once `active`. They change status in place:

- `replaced by D-021`: a newer decision supersedes this one. The new entry says `replaces: D-014` in its `why` line. Both people and agents follow the pointer.
- `reversed`: we went back on it and nothing took its place. Add one line: `reversed 2026-12-02: <reason>`.
- `stale?`: someone suspects it no longer holds but has not decided. The question mark is deliberate. It is a flag, not a verdict.

Who notices, and how:

- The `revisit if` line does most of the work. Its condition is concrete, so anyone (including an agent) can check it.
- Agents are told to check it. When an agent's task touches an area covered by an active entry, and the `revisit if` condition looks true, the agent says so in its session output and may set `stale?`. It may not set `reversed` or `replaced`.
- When either person changes code that contradicts an active entry, the change is not finished until the entry's status is updated in the same commit. This is the same "same commit" rule as section 3, which keeps the convention to one habit.

Nobody is assigned to audit. That is a deliberate trade-off: some entries will go stale without being marked. The cost of that is lower than the cost of an audit duty that nobody keeps.

## 5 How agents use it

Read:

- At session start, agents read the file top to bottom, skipping entries whose status is `replaced`, `reversed` or `stale?` unless the task touches that area.
- Agents treat `rejected` lines as constraints: do not propose a rejected option unless the `revisit if` condition is met, and say so when proposing it.
- When asked "why is X like this?", agents search the file before guessing, and cite the ID.

Write:

- Agents may add an entry only with `status: proposed`, and only when a decision rule from section 2 is met by a choice the agent actually made in the current task. The `by:` line is `agent (for <person>)`.
- Agents may set `stale?` as above. Nothing else.
- Only a person changes `proposed` to `active`. This is the noise filter: the log of record is only what a human has accepted. An unaccepted draft costs one line of review and is deleted after a week.
- Agents never rewrite an existing entry's `why` or `rejected` line. They are history.

This gives each agent one job (read before acting, flag when the world changed) and limits their writes to drafts and flags, so a busy week of agent sessions cannot bury the human entries.

## 6 Finding a reason in under a minute

The test from the brief: either person, or an agent, finds the reason behind a past choice in under a minute.

- Searching the file for the subject ("SQLite", "auth") hits the title. Titles state the choice, so they contain the nouns people search for.
- From code: a comment `// see D-014` next to the place the decision shows up. Only for decisions that a reader of that code would question.
- From history: commit messages carry `Decision: D-014`, so `git log --grep D-014` works both ways.
- Status on the second line means a reader knows in a glance whether the reason still holds.

## 7 The top of the file

The convention lives in the file, so it cannot drift from a separate doc:

```markdown
# Decisions

Newest first. One entry = one choice someone might reasonably try to undo.
Write it in the same commit that acts on it; put `Decision: D-NNN` in the commit message.
Format: title, status, date·by, why, rejected, revisit if. Six lines max.
Never delete an active entry; mark it replaced by / reversed / stale?.
Agents: read before acting; draft as `proposed`; may flag `stale?`; never set active.
```

## 8 What it costs

- Per decision: about two minutes, at a time when the author already holds the context.
- Per week: at most two minutes to accept or delete agent drafts. Optional.
- Agent context: at a rough 60 tokens per entry, 100 entries is about 6,000 tokens per session start. Acceptable for a year or more of a two-person product. If the file grows past about 150 active entries, move entries with status `replaced` or `reversed` into `DECISIONS-archive.md` with their IDs unchanged, so pointers still work.
- One habit to keep: "the decision goes in the commit that acts on it." Every other rule hangs off that one.

## 9 What it leaves out, and why

- Categories, tags, owners, priorities, review dates. Each adds a field to fill and a field to get wrong. Search covers what tags would.
- An approval step between the two people. The brief says either can add or change an entry alone. Disagreements show up as a new entry that replaces the old one, which is itself a useful record.
- Tooling: no linter, no bot, no CI check. A check that IDs are unique and statuses are valid would be easy later, but the convention should prove itself without it first.
- Meeting notes and decision process. The log records outcomes and reasons, not how the two people got there.
- Small, local, or easily undone choices. These belong in code comments, which sit closer to the code they explain.

## 10 Why this should still hold after three months

- It adds one habit to an act they already do (committing), rather than a new ritual.
- Each entry is small enough to write in the moment and the format is printed at the top of the file being edited.
- Agents help keep it alive (reading it, citing it, flagging staleness) without being allowed to fill it.
- The failure mode is mild: a missed entry means one decision is unrecorded, not that the system has collapsed. Rule 3 in section 2 ("someone asked why") brings back the decisions that matter most even if they were missed the first time.
