Found before cut: 6

### T1: How much an entry holds: a checkable expected outcome, failure tags and a "reconstructed" mark versus one-reply recording
Roles: organizational learning, daily user
Side 1: Without a stated expectation (R1), a tag naming which line failed on reversal (R2), and a mark for after-the-fact entries (R6), a later reader cannot tell bad reasoning from a changed world, so the log records outcomes but teaches nothing. The added cost is capped at one line per entry.
Side 2: Recording must cost the human at most one short reply inside the session they are already in (R1). Every added field is something someone has to think up or check at the moment they least want to, which raises the chance the entry is skipped, and a skipped entry teaches nothing either.
Would settle it: A month-long trial with and without the `expect` line (or on two halves of the decisions): count entries written per decision made (from commits and session logs), and for reversals count how many let a reader say what went wrong. If the extra line cuts the writing rate by more than about a quarter, the short format wins; if reversals without it cannot be explained, the longer one wins.

### T2: A recurring check for decisions no code touches versus no ritual the log's correctness depends on
Roles: organizational learning, daily user
Side 1: Decisions with no code footprint (scope, pricing, vendor, "we won't do X") are never touched by a task, so their `revisit if` is never evaluated. Only a check that runs without a task touching the entry (R3, R4) catches them, and any such prompt is a recurring moment.
Side 2: The baseline itself argues that any separate session lapses. A scheduled review costs time every week whether or not anything changed, and the log must stay correct with no human ritual (R1, R4); triggers fire only when the area is touched, which costs nothing otherwise.
Would settle it: At three months, list active entries with no code footprint and check how many are still true, and how many scheduled reviews actually happened. If most are still true and nothing harmful came from unchecked ones, no ritual is needed; if several are silently wrong and someone acted on one, the check pays for itself.

### T3: Keeping reversed and replaced entries in the agents' session-start read versus keeping that read small
Roles: organizational learning, daily user
Side 1: Moving reversed/replaced entries to an archive removes exactly the lessons from failed choices from what agents see (R8); an agent asked "did we try X before?" should answer correctly.
Side 2: Reading the log at session start must cost under 5% of the agent's context budget at its one-year size (R8), and clutter in what agents read is the reason to remove anything not active.
Would settle it: Project the file size at one year with reversed entries kept in full, kept as one-line summaries, and archived; measure the context share of each, and test whether agents answer "did we try X before?" correctly under the summary option.

### T4: Agents drafting the `why` from the session versus the reason being the real one
Roles: daily user, organizational learning
Side 1: The decisions that matter are made by the human in chat and committed by an agent; if the agent may not draft the entry (R2), it does not get written at all.
Side 2: Reconstructed reasons are systematically tidier than real ones, and an agent paraphrasing a session is a form of reconstruction; a plausible but wrong `why` (or `expect`) corrupts exactly what a later review learns from (organizational learning R1, R6).
Would settle it: Take 10 agent-drafted and 10 human-written entries and, a month later, ask the deciding human whether each `why` line states the real reason. If agent drafts are wrong noticeably more often, the human must write at least the `why` line.

### T5: Agents free to reopen rejected options versus agents that do not re-raise settled questions mid-task
Roles: organizational learning, daily user
Side 1: Treating `rejected` as a hard constraint freezes early choices made under conditions nobody wrote into `revisit if`; agents should be able to propose a rejected option when they state which condition changed (R7).
Side 2: Each re-raise costs the developer attention in the middle of a task; the developer wants agents to stop and ask only when a change actually contradicts an active entry (R7), not to reopen settled questions on their own initiative.
Would settle it: Log every agent re-raise of a rejected option for a month and count how many led to a real revisit. A useful share under roughly one in five favours the no-re-raise side.

### T6: Telling the other person about every entry change versus less session output
Roles: organizational learning, daily user
Side 1: In a two-person log, a decision recorded by one and never read by the other does not stop the other from re-arguing it; the other person must learn of every change within a day without opening the file (R5).
Side 2: A developer working with agents already gets a lot of session output and reads only the final summary and the diff; more notices get ignored, which defeats the purpose. Notice should be limited to the session's own summary (R3).
Would settle it: At one and three months, ask each person to name the other's last three entries. If they can without notices, drop the notice requirement; if not, test whether a one-line summary at agent session start fixes it without being skipped.
