# Critique: organizational learning (codesign-smoke-a)

Angle: how teams record decisions and come back to them, and whether the record changes the next decision.

## What the baseline gets wrong

1. **It records the reason but not the bet (§1 format).** `why` holds the facts that made the choice win. It does not hold what the team expected to happen as a result ("SQLite holds up until we add a second writer; we expect no ops work this quarter"). Without a stated expectation, a later reader cannot tell whether a reversal happened because the reasoning was wrong or because the world changed. That distinction is the thing a team learns from. The brief asks whether the log "would help the next decision"; the baseline answers only the retrieval half (§6).
2. **Reversals throw away the lesson (§4).** `reversed <date>: <reason>` and `replaced by D-021` say *that* a choice ended, not *which assumption failed*. Over three months the log becomes a list of outcomes with no pattern either person can read off (for example, "we keep underestimating ops cost").
3. **`revisit if` is checked only by accident (§4, §5).** The only checkers are agents whose current task happens to touch the area, and humans whose code happens to contradict an entry. Decisions with no code footprint (scope, pricing, "we won't do X", vendor choice) are never touched by a task, so their `revisit if` is never evaluated. The baseline admits "some entries will go stale without being marked" but does not say which kinds; it is exactly the non-code ones.
4. **`stale?` has no way out (§4).** An agent may set it; nothing says who resolves it or by when. A flag nobody is prompted to clear turns into background noise within weeks, and agents then skip those entries (§5 "skipping ... `stale?`"), so a merely suspected entry is treated as dead.
5. **The optional weekly skim is the only route for drafts (§3, §5).** Drafts become `active` only when a human promotes them, and deletion "after a week" happens only in the optional skim. If the skim lapses (the baseline's own argument in §3 says it will), `proposed` entries pile up with undefined status. The baseline does not say whether agents treat a `proposed` entry's `rejected` line as a constraint.
6. **Either person can change the record and the other never finds out (§9).** The brief permits solo edits; the baseline adds no signal to the other person. Shared understanding, which is half the point of a two-person log, is not formed. A decision recorded by Ana and never read by Ben does not prevent Ben from re-arguing it.
7. **Entries written after the fact look like entries written at the time (§2 rule 3, §3 fallback).** An entry added because "someone asked why" weeks later holds a reconstructed reason. The format gives no way to tell it apart from one written at the decision. Reconstructed reasons are systematically tidier than real ones.
8. **Treating `rejected` as a hard constraint for agents (§5) risks freezing early choices.** Agents stop surfacing options that were rejected under conditions nobody wrote into `revisit if`. The log then defends old choices instead of informing new ones.
9. **The archive breaks the one-minute lookup (§8).** Agents read only `DECISIONS.md` at session start; once `replaced`/`reversed` entries move to `DECISIONS-archive.md`, the lessons from failed choices are the ones that leave the agents' view.

## My requirements

- R1. Each entry states one expected outcome or key assumption that could later be checked as true or false. Test: for any active entry, a second person can say in one sentence what observation would show it was wrong.
- R2. Every `reversed` or `replaced` entry names which line failed: the `why` facts, the expected outcome, or an outside change. Test: 100% of reversed/replaced entries carry one of those three tags.
- R3. Entries with no code footprint get a check that does not depend on a task touching them. Test: after three months, every active non-code entry has been looked at at least once (a dated `checked:` mark or a status change).
- R4. `stale?` and `proposed` each have a named resolver and a time limit, enforced by something that runs without anyone remembering. Test: no entry stays `stale?` or `proposed` for more than 14 days.
- R5. When one person adds or changes an entry, the other learns of it within a day without opening the file on purpose (commit message prefix, a line in the agent's session-start summary, or similar). Test: ask the other person about the last three new entries; they know of all three.
- R6. Entries written after the fact are marked as such (`written: <date>` differing from `date:`, or `reconstructed`). Test: a reader can tell in one glance.
- R7. Agents may propose a rejected option when they state which condition changed, even if no `revisit if` covers it. Test: the agent instructions allow this and require citing the entry.
- R8. Reversed and replaced entries stay where the agents read them, or the agents' session-start read includes a one-line summary of them. Test: an agent asked "did we try X before?" answers correctly for an archived entry.
- R9. The added cost of R1–R8 stays under one extra line per entry and under five minutes per month. Test: time it during a trial.

## Expected conflicts with other roles

1. **The daily user, on entry length (R1, R2, R6).** I want an `expect` line and a failure tag on reversals. The developer wants the fewest fields possible, writing an entry at commit time while focused on code. Each extra line raises the chance the entry is skipped, and a skipped entry teaches nothing. Both cannot be fully met: a checkable expectation takes thought at the moment the developer least wants to spend it.
2. **The daily user, on a scheduled check (R3, R4).** I want a check that runs without a task touching the entry, which means some recurring moment. The developer will want no ritual at all; the baseline's own §3 argues any separate session lapses. The non-code decisions only get revisited if someone is prompted, and any prompt is a ritual.
3. **The daily user, on notification (R5).** I want the other person told about every change. The developer working with agents already gets a lot of session output and will want less of it, not more. Too many notices get ignored, which defeats R5.
4. **The daily user, on agent latitude (R7).** I want agents free to reopen rejected options with a stated reason. The developer may prefer agents that never re-raise a settled question, because each re-raise costs attention mid-task.

## Evidence that would settle it

1. Entry length: run the convention for a month in two versions (with and without the `expect` line) or on two halves of the decisions. Count entries actually written per decision made (from commits), and for reversals count how many let a reader say what went wrong. If the `expect` line cuts the writing rate by more than about a quarter, the developer is right; if reversals without it cannot be explained, I am.
2. Scheduled check: after three months, list active entries with no code footprint and check how many are still true. If most are still true and nothing harmful came from the unchecked ones, no ritual is needed. If several are silently wrong and someone acted on one, the check pays for itself.
3. Notification: at one and three months, ask each person to name the other's last three entries. If they can without notices, drop R5. If not, test whether a one-line summary at agent session start fixes it without being skipped.
4. Agent latitude: log every time an agent re-raises a rejected option over a month. Count how many re-raises were useful (led to a revisit) versus noise. A useful share under roughly one in five favours the developer.
