# Decision log: one file, small enough to keep using

Keep `DECISIONS.md` at the repo root. It answers: **what choice governs this work, why, and when should we reconsider it?** Both developers and agents read it before starting a session. This convention and its entry template fit on one page; the log keeps short historical entries so reasons survive a reversal.

## Entry format

Use a dated, searchable heading and three short lines. Dates use `YYYY-MM-DD`; IDs use the date plus a letter if needed. New entries go first.

```markdown
### 2026-11-13a — Keep decisions in one repo file [active]
Choice: Use DECISIONS.md for choices that constrain later work.
Why: Both people and agents already read the repo; separate documents add upkeep. Accept a growing file in exchange for one search location.
Revisit: If finding a reason takes more than a minute. Owner: Alex.
```

The example owner stands for whichever developer records the decision. Each entry needs a concrete choice, the reason and meaningful tradeoff, an observable reconsideration trigger, and one human owner. Include a repo path, commit or issue reference only when it materially helps explain the choice. Aim for 40–80 words. Leave out chat transcripts, implementation steps, exhaustive alternatives, routine code changes and unsupported claims about agreement.

## Five operating rules

1. **Record choices that will matter again.** Add an entry when a choice constrains future work, settles a recurring disagreement, or accepts a meaningful cost. Ask: “Would forgetting why cause us to repeat this discussion or undo it accidentally?” If no, leave it out. The entry records the working choice; it does not imply both people approved it.

2. **Write when deciding, with commit time as the backstop.** The person making the choice spends about two minutes recording it before moving on. If the choice emerges during coding, include the entry in the same commit. For decisions made in passing, whoever first returns to the repo writes it. Do not make a weekly catch-up the main capture mechanism: reasons fade and a backlog becomes work nobody owns.

3. **Preserve history, make current authority explicit.** Use `[active]`, `[stale]`, `[reversed]` or `[replaced]`. Stale means its assumptions need checking, so it is context rather than binding guidance. For reversal, append a dated sentence explaining why and mark `[reversed]`. For replacement, add a new active entry and mark the old one `[replaced by ID]`; the new entry names its predecessor. Keep the old reason. Correct typos directly; date substantive changes. Either developer may make any of these edits without permission.

4. **Notice staleness where work touches it.** Before relying on an entry, check its revisit trigger. Either developer can mark it stale and state which assumption failed. Agents flag suspected staleness to the human running their session. That developer decides whether to reaffirm, reverse or replace it before relying on it. At the first shared session each week, spend at most five minutes scanning active triggers and unresolved stale entries; skip a meeting devoted solely to the log. The owner is the default follow-up person, not an approval gate.

5. **Give agents a narrow job.** Agents read the log at session start, cite relevant entry IDs in their work plan, and surface conflicts before implementing a conflicting choice. They may draft entries only for qualifying decisions, with a proposed human owner. The session's developer adopts or edits the draft before committing it. Agents do not invent rationale, silently override active entries, or log every implementation detail. If no entry applies, say nothing about the log.

## Use and cost

Before the next related decision, search the topic, read the current entry and follow predecessor IDs if needed. Use its reason and revisit trigger to choose whether to retain or change it. Budget two minutes per qualifying choice, a brief session-start read, and five shared minutes weekly. After a month, each developer tries finding one past reason within a minute; failure means improving headings and shortening entries. This convention leaves out approvals, complete project history and task tracking. Its value is a retrievable reason that improves the next choice, not a count of entries.
