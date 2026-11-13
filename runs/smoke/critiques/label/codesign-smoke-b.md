# Critique: the daily user (a developer working alongside an agent team)

## What the baseline gets wrong

1. **It assumes humans make the commits (sections 3, 4, 8, 10).** With an agent team, most commits are written by agents. The rule "the person still remembers why, and they are already writing a message" fails: the person often never sees the commit message. The decision was made in chat with the agent; the agent then commits. The rule should require the *agent* to write the entry at that point, not the human.
2. **Agents may only draft entries for choices "the agent actually made" (section 5).** The decisions that matter most are made by the human in the agent session ("use SQLite, not Postgres"). Under this rule the agent cannot record them, and the human, who is not writing the commit, will not either. The best-placed writer is barred.
3. **The `proposed` → `active` step has no moment attached to it (sections 3, 5, 8).** Acceptance happens in an "optional" weekly skim, the same kind of separate ritual section 3 says will lapse. Expect a growing pile of `proposed` entries. The baseline also never says whether agents should treat a `proposed` entry as a constraint, so a pile of unaccepted drafts is either ignored (decisions lost) or obeyed (the noise filter does nothing).
4. **Parallel work breaks "newest on top" and `D-NNN` numbering (sections 1, 7).** Two people plus several agents in separate branches or worktrees will all add at the top of the same file and all pick the next free number. That means a merge conflict on most merges and duplicate IDs that break every `see D-014` pointer. This happens within the first week, not after three months.
5. **Nothing tells the agents to read the file (section 5).** The header in `DECISIONS.md` only helps an agent that has already opened it. The baseline needs a line in the agent instruction file (`CLAUDE.md` / `AGENTS.md`), and it doesn't say so.
6. **"The change is not finished until the entry is updated" relies on whoever writes the code noticing (section 4).** Usually an agent writes the code. The rule should make the agent check active entries for the area it touched before committing, and say in its summary which entry it contradicts.
7. **Agent flags get lost (section 4).** An agent setting `stale?` in a commit and "saying so in its session output" scrolls by unseen. A daily user reads the session's final summary and the diff, not the whole transcript.
8. **The fallback "next commit either person makes" (section 3)** has the same problem as 1: the next commit is usually an agent's, made in a session that does not know about the decision.

## My requirements

R1. Recording a decision costs the human at most one short reply inside the agent session they are already in (e.g. "yes, log it"). No separate session, review or weekly pass is needed to keep the log correct.
R2. An agent can draft an entry for a decision the human made in that session, not only for its own choices.
R3. Every entry an agent adds or changes is listed in the session's final summary (ID, title, new status), so the human sees it without reading the diff or transcript.
R4. The rule for `proposed` entries is explicit: agents either treat them as binding or ignore them, and a `proposed` entry cannot sit for more than N days without being resolved or removed by a defined rule (no human ritual needed).
R5. Two branches that each add an entry merge without a text conflict in most cases, and cannot produce duplicate IDs (e.g. IDs from date plus initials, or one file per entry, or append-at-bottom).
R6. The agent instruction file tells agents to read `DECISIONS.md` at session start, cite IDs, and check active entries for any area their change touches before committing.
R7. Before committing a change that contradicts an active entry, an agent stops and asks the human, rather than editing the status itself or committing silently.
R8. Reading the log at session start costs under 5% of the agent's context budget at the file's expected size after one year.

## Expected conflicts with other roles

C1. **Organizational learning, on how much an entry holds.** I want entries short enough that an agent can draft one and a human accept it in one reply. They will likely want more context: what was known at the time, who disagreed, what the expected outcome was, so a later review can judge whether the decision was good. Each added line is a line someone has to check, which goes against R1.
C2. **Organizational learning, on scheduled review.** They will likely want a review cadence (fixed revisit dates, a monthly pass checking outcomes against expectations), since recorded decisions that are never revisited don't teach anyone anything. I want no ritual that the log's correctness depends on (R1, R4). A scheduled review costs time every week whether or not anything changed; triggers only fire when someone touches the area.
C3. **Organizational learning, on who records.** They will likely want humans to write the `why` in their own words, because writing it down is part of how the team learns. I want agents to draft it from the session (R2) because otherwise it does not get written. Agent-drafted reasons risk being plausible paraphrase rather than the real reason.
C4. **Organizational learning, on deleting drafts.** They will likely want unaccepted drafts kept (as a record of what was considered). I want them removed automatically so they don't clutter what agents read (R4, R8).

## Evidence that would settle it

E1 (C1). Four-week trial with a short format and a long one: count decisions found in chat/session logs that never reached the log, and time how long it takes to find a past reason. If the long format records markedly fewer decisions, short wins. If the short one's entries can't answer "why" from the entry alone, long wins.
E2 (C2). At three months, count active entries whose `revisit if` condition is true but still marked `active`. Compare against how many scheduled reviews actually happened. If the reviews were skipped, the cadence costs nothing but also catches nothing. If they happened and caught stale entries that triggers missed, they earn their place.
E3 (C3). Take 10 agent-drafted and 10 human-written entries. Ask the deciding human, a month later, whether each `why` line states the real reason. If agent drafts are wrong noticeably more often, human writing is needed for the `why` line at least.
E4 (C4). At one month, count `proposed` entries. Check whether anyone ever looked at a deleted or expired draft again (from git history or by asking). If nobody did, auto-removal costs nothing.
