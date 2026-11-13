# Decision log: one file, small enough to keep using

Keep `DECISIONS.md` at the repo root. It answers: **what choice governs this work, why, and when should we reconsider it?** Both developers and agents read it before starting a session. This convention and its entry template fit on one page; the log keeps short historical entries so reasons survive a reversal.

## Entry format

Use a dated, searchable heading and three short lines. Dates use `YYYY-MM-DD`; IDs use the date plus a letter if needed. New entries go first.

```markdown
### 2026-11-13a — Keep decisions in one repo file [active]
Choice: Use DECISIONS.md for choices that constrain later work.
Why: Both people and agents already read the repo; separate documents add upkeep. Rejected: a docs folder, one file per decision. Accept a growing file in exchange for one search location.
Revisit: Assumes one search finds the reason; reconsider if finding a reason takes more than a minute. Owner: Alex.
```

The example owner stands for whichever developer records the decision. Each entry needs a concrete choice, the reason and meaningful tradeoff, an observable reconsideration trigger, and one human owner. The Revisit line names the assumption the choice rests on and the visible sign that would call it into question, in one clause; this is the same trigger the baseline asked for, stated so a reader knows what evidence would change it, not an extra field [list-1 T2]. Where they apply, the Why line also names the temporary constraint that forced the choice and the one serious option turned down, in a few words each; if the choice was uncertain, say so in the Revisit line. Skip these when they do not apply, and never let them push the entry past the word aim [list-2 T1]. Include a repo path, commit or issue reference only when it materially helps explain the choice. Aim for 40–80 words. Leave out chat transcripts, implementation steps, exhaustive alternatives, routine code changes and unsupported claims about agreement.

## Five operating rules

1. **Record choices that will matter again.** Add an entry when a choice constrains future work, settles a recurring disagreement, or accepts a meaningful cost. Ask: “Would forgetting why cause us to repeat this discussion or undo it accidentally?” If no, leave it out. The entry records the working choice; it does not imply both people approved it.

2. **Write when deciding, with commit time as the backstop.** The person making the choice spends about two minutes recording it before moving on. If the choice emerges during coding, include the entry in the same commit. For decisions made in passing, whoever first returns to the repo writes it. Do not make a weekly catch-up the main capture mechanism: reasons fade and a backlog becomes work nobody owns.

3. **Preserve history, make current authority explicit.** Use `[active]`, `[stale]`, `[reversed]` or `[replaced]`. Stale means its assumptions need checking, so it is context rather than binding guidance. When marking an entry stale, append one dated line: `Stale: <failed assumption or trigger, with the evidence>. Meanwhile: <the choice to work from until resolved>. Owner: <name>.` The owner is the entry's owner unless the person marking it names someone else [list-1 T3]. For reversal, append a dated sentence explaining why and mark `[reversed]`. For replacement, add a new active entry and mark the old one `[replaced by ID]`; the new entry names its predecessor. Keep the old reason. Correct typos directly; date substantive changes. Either developer may make any of these edits without permission.

4. **Notice staleness where work touches it, with a small weekly fallback.** Before relying on an entry, check its revisit trigger. Either developer can mark it stale using the line in rule 3. At the first shared session each week, spend at most five minutes scanning active triggers and unresolved stale entries; skip a meeting devoted solely to the log. In a week with no shared session, each owner does the same five-minute scan of their own entries alone [list-1 T1]. The owner is the default follow-up person, not an approval gate.

5. **Give agents a narrow job.** Agents read the log at session start, cite relevant entry IDs in their work plan, and surface conflicts before implementing a conflicting choice. They may draft entries only for qualifying decisions, with a proposed human owner. The session's developer adopts or edits the draft before committing it. Agents do not invent rationale, silently override active entries, or log every implementation detail. If no entry applies, say nothing about the log.
   - **Flag staleness only with evidence.** An agent interrupts its developer about staleness only when it can name the entry ID, the trigger or assumption that failed, the evidence, and the work it touches. A hunch without that goes in the work plan as a one-line note, not an interruption [list-1 T3].
   - **Ask once per stale issue, not once per session.** If work depends on a stale entry with no `Meanwhile:` line, the agent asks its developer for direction before building on it, and the developer writes the `Stale:` line from rule 3. If the entry already has a `Meanwhile:` line, the agent follows that choice and cites it, and raises it again only with new evidence. The owner resolves it outside sessions [list-2 T2] [list-1 T3].

## Use and cost

Before the next related decision, search the topic, read the current entry and follow predecessor IDs if needed. Use its reason and revisit trigger to choose whether to retain or change it. The total upkeep allowance per developer is: two minutes per qualifying choice (including any agent draft review), a brief session-start read, five minutes weekly for the trigger scan, and the stale interruptions rule 5 allows. If upkeep regularly runs past this, shorten entries and raise the bar for qualifying choices before dropping anything else [list-2 T1]. After a month, each developer tries finding one past reason within a minute; failure means improving headings and shortening entries. This convention leaves out approvals, complete project history and task tracking. Its value is a retrievable reason that improves the next choice, not a count of entries.

## Open questions

- **Is the weekly fallback scan worth its cost?** [list-1 T1] For now: the weekly five-minute scan stays, and owners scan alone in weeks with no shared session. Test: plant a failed assumption in a decision current work will not touch, then compare catching driven by repo activity alone with the weekly fallback scan. Track time to catch, review minutes spent, and whether catching it sooner changes what anyone does next; keep the fallback only if earlier catches lead to enough useful action to pay for the regular cost.
