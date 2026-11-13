# Critique: codesign-smoke-a (organizational learning)

## What the baseline gets wrong

1. **It counts recording as success, and never checks reuse** (sections 6, 10). The success test is "find the reason in under a minute". That checks retrieval, not use. Nothing in the design shows whether an entry ever changed a later decision. A required lessons store is not proof that lessons are used (F1); a lesson counts as learned only when it shows up in a later decision (F3). The design has no point where anyone notices that an earlier entry should have stopped a choice, or did.

2. **"Never delete" plus "no audit" is how a store becomes unsearchable** (sections 4, 8). Entries pile up; staleness depends on `revisit if` lines that nobody is assigned to check. The archive trigger (150 active entries) moves only `replaced`/`reversed` entries, so silently wrong `active` entries stay in front of every agent session. NASA's LLIS kept lessons forever with no review for relevance, and 58% of managers said it did not give them the right lesson at the right time (F2). The baseline's "some entries will go stale without being marked" understates this: stale `active` entries become constraints that agents enforce (section 5, "treat `rejected` lines as constraints").

3. **The one trigger is the commit, which misses the decisions most worth recording** (section 3). Decisions that close off an option ("we won't do X"), and decisions made in chat, have no acting commit. The fallback ("the next commit either person makes") is a second habit with no cue. Lessons left to an unlinked later moment are the ones that get lost (F8).

4. **No moment to look back** (sections 3, 9). The design drops the weekly pass as the first thing to lapse. That is a fair read of a mandated audit, but it also drops the one practice with measured payoff: short, regular debriefs improve performance about 25% (F9), in sessions of about 18 minutes. The optional weekly "accept or delete drafts" step is clerical, not a review of whether past decisions held.

5. **Only failures and reversals get recorded, framed as `reversed`** (section 4). There is no slot for "this held up, and here is why". Stores that record only what went wrong get fewer honest entries and miss positive lessons (F4). With two people, the risk is smaller than at NASA, but a `reversed` entry with a person's name on it is still a small admission.

6. **Same heavy-ish process for every logged decision** (sections 2, 1). A two-way choice that costs a day to undo gets the same five lines as a one-way one. Section 2 rule 2 sets the bar at "more than a day to undo", which is low. Review weight should scale with how hard a decision is to reverse (F12). There is no field that says which kind it is, so a reader cannot tell which entries deserve a real revisit.

7. **Agent drafts depend on a human step the design calls optional** (sections 3, 5). `proposed` entries become `active` only by a human; the weekly accept pass is "allowed but not required". If it lapses, agent-drafted entries either pile up or are never accepted, and the log loses the decisions agents actually made. Mandates without an owner decay (F6, F7).

## My requirements

R1. The design names a moment when a past entry is checked against a new decision, and leaves a trace when it is used (for example, a new entry or commit cites the old ID as a reason). Test: after three months, at least some entries are cited by later entries or commits, and someone can count them.

R2. The log stays short enough for a full read at session start. Test: the active section never exceeds a set size (say 40 entries or one screen of titles), enforced by a stated rule that moves or prunes entries, not just at 150.

R3. Every `active` entry is either re-confirmed or flagged within a fixed period, by a named trigger (not a named person). Test: no `active` entry has gone more than N weeks without its `revisit if` being checked, where "checked" leaves a dated mark.

R4. A short, regular look-back exists, bounded in time (15 minutes or less), held by both people together, that asks of recent entries: did this hold, should it change. Test: it happens at least monthly for three months.

R5. Decisions without an acting commit have their own cue. Test: a "we won't do X" decision made in chat appears in the log within a week.

R6. An entry marks whether it is easy or hard to undo, and only hard-to-undo entries get a `revisit if` and a look-back. Test: a reader can filter hard-to-undo entries in one search.

R7. An entry can record that a decision held, not only that it was reversed. Test: the format has a place for "confirmed <date>: <reason>".

## Expected conflicts with other roles

C1. **With the daily user, over the regular look-back (R4).** I want a short, scheduled joint review. The daily user will want zero recurring rituals, since nobody's job is the log and the baseline's own argument is that weekly passes lapse first. Both cannot be fully met: any look-back is a recurring cost; no look-back means recorded entries are never tested against later choices.

C2. **With the daily user, over re-confirming entries (R3) and pruning (R2).** I want entries to expire or get re-confirmed. The daily user will want entries to stay put once written and not be nagged about them. Expiry adds work and may drop an entry that still holds; no expiry lets stale entries steer agents.

C3. **With the daily user, over the extra fields (R6, R7, R1 citations).** I want reversibility and confirmation marks and citations. The daily user wants the shortest possible entry that can be written in two minutes at commit time. Each field adds friction and a thing to get wrong (the baseline's own section 9 argument).

C4. **With the daily user, over agent drafts.** I want agent-proposed entries to get a human look before they count, because an unreviewed store fills with noise (F2). The daily user may want agents to write `active` entries directly so the log stays current without a human step. One gives a cleaner log that may lag; the other gives a current log that may fill with low-value entries.

## Evidence that would settle it

C1: Run the baseline for six weeks with and without a 15-minute fortnightly look-back. Count how many later decisions cite an earlier entry, and how many times a rejected option got re-proposed. If the look-back weeks show more citations and fewer repeated debates, R4 earns its cost; if the sessions stop happening by week four, the daily user is right.

C2: At the three-month mark, sample the `active` entries and ask both people whether each still holds. If more than about 1 in 5 no longer hold and are unmarked, re-confirmation is needed. Also log any agent action blocked by a stale `rejected` line.

C3: Time entry writing with and without the extra fields over a month, and count skipped entries (decisions found later in chat or code with no entry). If the extra fields raise skip rates noticeably, drop them; if not, keep them.

C4: Over a month, count agent drafts, how many a human accepted, and how many accepted ones were later cited. A low accept rate means drafts are noise and the gate is earning its keep; a high accept rate with no lapse in review supports letting agents write more directly.
