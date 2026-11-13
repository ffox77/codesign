## Summary

The final design keeps the baseline's file, entry template, status tags and five rules, and adds detail inside them rather than replacing anything.
Entries now name the assumption behind a choice and, where they apply, the deciding constraint and the rejected option, still within the 40–80 word aim.
Staleness handling became concrete: a fixed `Stale:` line with a stand-in choice and an owner, an evidence bar before an agent interrupts, and one answer per stale issue instead of one per session.
The weekly scan gained a solo fallback, upkeep got one total allowance per developer, and a new Open questions section records whether the weekly scan is worth its cost and how to test it.

## Changes by section

### Entry format

- **Example entry, Why line.** Baseline: reason plus tradeoff. Final: adds "Rejected: a docs folder, one file per decision." Driven by list-2 T1.
- **Example entry, Revisit line.** Baseline: "If finding a reason takes more than a minute." Final: "Assumes one search finds the reason; reconsider if finding a reason takes more than a minute." Driven by list-1 T2.
- **Revisit line rule.** Baseline: entries need "an observable reconsideration trigger." Final: the Revisit line names the assumption the choice rests on and the visible sign that would call it into question, in one clause, explicitly not a new field. Driven by list-1 T2.
- **Deciding context.** Baseline: no such requirement. Final: where they apply, the Why line names the temporary constraint that forced the choice and the one serious option turned down; uncertainty goes in the Revisit line; skip these when they do not apply and never exceed the word aim. Driven by list-2 T1.

### Rule 3 (Preserve history)

- **Stale marking.** Baseline: status tag `[stale]` with no set wording. Final: marking stale appends one dated line, `Stale: <failed assumption, with evidence>. Meanwhile: <choice to work from>. Owner: <name>.`, with the entry's owner as default. Driven by list-1 T3.

### Rule 4 (Notice staleness)

- **Weekly fallback.** Baseline: a five-minute scan at the first shared session each week. Final: same, plus in a week with no shared session each owner scans their own entries alone; the heading now says "with a small weekly fallback." Driven by list-1 T1.
- **Agent flagging moved out.** Baseline: "Agents flag suspected staleness to the human running their session," and that developer decides before relying on it. Final: rule 4 drops this and points to the rule 3 line; agent behavior moves to rule 5 (below). Part of the list-1 T3 and list-2 T2 changes.

### Rule 5 (Agents)

- **Flag only with evidence.** Baseline: agents flag suspected staleness, no bar. Final: an agent interrupts only when it can name the entry ID, the failed trigger or assumption, the evidence, and the work it touches; a hunch goes in the work plan as a one-line note. Driven by list-1 T3.
- **Ask once per stale issue.** Baseline: no rule for repeated questions. Final: if a stale entry has no `Meanwhile:` line, the agent asks its developer, who writes the `Stale:` line; if it has one, the agent follows and cites it and raises it again only with new evidence; the owner resolves it outside sessions. Driven by list-2 T2 and list-1 T3.

### Use and cost

- **Total upkeep allowance.** Baseline: "Budget two minutes per qualifying choice, a brief session-start read, and five shared minutes weekly." Final: states this as one total allowance per developer, counting agent draft review and the stale interruptions rule 5 allows, and says that if upkeep runs over, shorten entries and raise the bar for qualifying choices first. Driven by list-2 T1.

### Open questions (new section)

- **Weekly fallback scan.** Baseline: none. Final: keeps the weekly scan for now and describes a test (plant a failed assumption in an untouched decision; compare catching by repo activity with the weekly scan on time to catch, review minutes and useful action). Driven by list-1 T1.

## Conflicts the brief should have named

1. **list-1 T3: early staleness flags vs. interruptions on weak evidence.**
   - Conflict: catching stale assumptions early means flagging readily, but each flag pulls a developer away from work.
   - Why it matters: it produced the `Stale:` / `Meanwhile:` / `Owner:` line and both new agent rules, the largest change to the design. The brief asks "who notices" and wants agents to avoid "noise," but never says that noticing early costs attention or how much evidence should justify an interruption.
   - Brief line: "Flagging stale entries early helps, but every flag interrupts a busy developer; say how much evidence an agent needs before stopping someone."
2. **list-2 T1: keeping the deciding context vs. the upkeep budget.**
   - Conflict: keeping the constraint, rejected option and uncertainty helps later decisions, but costs writing time the team may not have.
   - Why it matters: it added context rules to the entry format, a rejected option to the example, and a total upkeep allowance with an overrun order. The brief says entries are "short" and separately asks "what an entry must contain," but never says these pull against each other or which wins.
   - Brief line: "Short entries and full reasons pull against each other; say which context is worth the words and what total upkeep each person will accept."
3. **list-1 T1: checking untouched decisions vs. regular review work.**
   - Conflict: decisions that no current work touches can fail quietly, but checking them takes regular time from people whose job is not the log.
   - Why it matters: it added the solo weekly fallback and the whole Open questions section. The brief says "nobody's job is to maintain the log" and asks "who notices," but does not say whether scheduled checks are worth their cost.
   - Brief line: "Nobody maintains the log, yet untouched decisions can go stale unseen; say whether a scheduled check is worth regular time."
4. **list-2 T2: each session asking about a stale entry vs. one grouped answer.**
   - Conflict: an agent should not build on an unsettled choice, but several sessions asking the same question repeats the interruption.
   - Why it matters: it produced the "ask once per stale issue" rule and the use of the `Meanwhile:` line as a shared stand-in. The brief mentions agents but not parallel sessions hitting the same entry.
   - Brief line: "Several agent sessions may hit the same stale entry; say whether each must ask or one shared answer can stand."
5. **list-1 T2: naming testable assumptions vs. the writing allowance.**
   - Conflict: an entry that names the assumption and the sign that would change it supports learning, but adds thinking and writing time.
   - Why it matters: it reworded the Revisit line and the example, kept to one clause and not a new field. The brief fixes short entries and leaves contents open, without naming this pull.
   - Brief line: "Naming the assumption behind each choice helps learning but adds writing time; say whether it belongs in a few-line entry."

## Entries that changed nothing

None.

## Changes per list

- list-1: 7 changes (T1: 2, T2: 2, T3: 3).
- list-2: 4 changes (T1: 3, T2: 1).
- One change (ask once per stale issue) was driven by both lists and is counted in each.
