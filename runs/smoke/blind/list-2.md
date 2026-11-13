### T1: More entry fields versus recording with one short reply
Roles: organizational learning, daily user
Side 1: Entries need an expected outcome, an indication of which reasoning failed when a decision is reversed, and a mark when written after the fact. Without these, readers cannot distinguish faulty reasoning from changed circumstances. The added material is limited to one line per entry.
Side 2: Recording must require at most one short human reply within the current session. Each added field takes thought or checking when people are reluctant to spend time, increasing skipped entries that cannot help later decisions either.
Would settle it: For a month, compare entries with and without an expected-outcome line, using separate periods or halves of the decisions. Count entries per decision found in commits and session logs, and reversals whose causes readers can explain. A recording-rate drop above about a quarter favors the shorter format; unexplained reversals without the line favor the longer format.

### T2: Recurring checks for decisions without code changes versus checks only when work touches them
Roles: organizational learning, daily user
Side 1: Decisions about scope, pricing, vendors, or avoiding work may never be touched by a code task, leaving their reconsideration conditions unchecked. Catching these requires a check that runs independently of related tasks, creating a recurring review.
Side 2: Separate reviews are expected to lapse and consume time every week even when nothing changes. The log must remain correct without a human routine, while checks triggered by related work add no cost when the area is untouched.
Would settle it: After three months, list active decisions without code changes and check how many still hold and how many scheduled reviews happened. If most remain valid and unchecked entries caused no harm, a routine is unnecessary. If several became silently wrong and someone acted on one, the review is worthwhile.

### T3: Keeping reversed and replaced entries visible to agents versus limiting session-start reading
Roles: organizational learning, daily user
Side 1: Archiving reversed or replaced entries hides lessons from failed choices from agents. Agents should still answer correctly when asked whether an option has been tried before.
Side 2: At its projected one-year size, reading the log at session start must use less than 5% of an agent's context budget. Removing inactive entries reduces clutter in that reading.
Would settle it: Project the file's size after one year with reversed entries retained in full, reduced to one-line summaries, or archived. Measure each option's share of the context budget, and test whether agents using the summaries correctly identify options tried before.

### T4: Agent-drafted reasons versus accurate accounts of why decisions were made
Roles: daily user, organizational learning
Side 1: The important decisions are made by humans in chat and committed by agents. If agents cannot draft the entries, those decisions will not be recorded.
Side 2: Reasons written after the fact tend to sound tidier than the original reasoning, including when an agent summarizes a session. A plausible but inaccurate reason or expected outcome undermines what later reviews can learn.
Would settle it: Compare 10 agent-drafted and 10 human-written entries. A month later, ask the person who made each decision whether its recorded reason is accurate. If agent drafts are wrong noticeably more often, require the human to write at least the reason.

### T5: Allowing agents to reopen rejected options versus avoiding repeated questions during tasks
Roles: organizational learning, daily user
Side 1: Treating rejected options as permanent constraints can preserve early choices whose assumptions were never recorded as reconsideration conditions. Agents should be able to propose a rejected option if they state which condition changed.
Side 2: Every renewed proposal interrupts the developer during a task. Agents should ask only when a change contradicts an active entry, rather than independently reopening settled questions.
Would settle it: For a month, record every agent proposal to reconsider a rejected option and count how many lead to an actual review. If fewer than roughly one in five are useful, favor preventing these proposals.

### T6: Notifying the other person of every entry change versus limiting session output
Roles: organizational learning, daily user
Side 1: An entry recorded by one person cannot prevent the other from reopening the discussion if they never read it. Each person must hear about every change within a day without having to open the file.
Side 2: Developers already receive substantial agent output and read mainly the final summary and changes. Additional notices may be ignored, so updates should appear only in the summary of the session that made them.
Would settle it: After one and three months, ask each person to name the other's last three entries. If they can do so without notices, remove the notice requirement. Otherwise, test whether a one-line update at agent session start closes the gap without being skipped.
