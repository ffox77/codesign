## What the baseline gets wrong

- **Session-start reading has no growth limit.** The introduction requires every developer and agent to read a file that retains all history. “Brief session-start read” becomes an unsupported cost assumption as entries accumulate; newest-first ordering does not distinguish current guidance from obsolete choices.
- **Rule 4 assumes shared attention is available.** A “first shared session each week” may never occur for two asynchronous developers. Ownership has no fallback when its owner is absent, and repeated agent flags can make one stale entry a recurring interruption across sessions.
- **Rule 5 adds review without preserving restart context.** It requires human adoption of agent drafts but gives no convention for distinguishing a pending proposal from governing guidance or finding it after a session ends. Parallel sessions can propose duplicate or incompatible entries and leave the developer to reconstruct their intent.
- **Rules 3 and 5 leave a race around authority.** Either developer can change an active entry while another agent works from its earlier version. Citing an ID alone does not reveal that its choice or status changed. “Surface conflicts before implementing” cannot catch changes the session never rereads.
- **The cost and success checks omit daily work.** Two minutes per choice excludes checking agent rationale, resolving duplicate drafts, interruptions and reconstructing context. The monthly lookup checks retrieval but never whether a developer or agent correctly understands which choice governs the next task.

## My requirements

1. With three months of representative history, either developer or a fresh agent must identify the governing choice and reason within one minute, including when the newest related entry is stale or replaced. Routine startup must not require reading every historical entry.
2. A stale entry must have one visible follow-up action and human owner in the same file. A week without a shared session must not prevent noticing or resolving it; repeated agent reports of the same unchanged issue must be coalesced.
3. An agent proposal awaiting adoption must be visibly nonbinding and recoverable after session termination, with its proposed choice, rationale and related entry IDs. Two agents proposing the same decision must not create two active authorities.
4. Before landing work governed by an entry, check whether its relevant choice or status changed since the session read it. In a two-session exercise where one developer replaces that entry, the other session must detect the change and surface its effect before landing.
5. Trial the convention on real work and count capture, reading, checking, interruption recovery and weekly upkeep as human effort; record elapsed completion time and delivered scope separately. After three months, test correct application to a new decision as well as one-minute retrieval. Agree on an acceptable upkeep budget before the trial.

## Expected conflicts with other roles

- **Organizational learning: historical completeness versus daily reading cost.** I want a compact route to current authority and selective historical reading. That role will likely want reasons and reversals encountered often enough to inform new decisions. A growing history cannot all receive routine attention within a fixed startup budget; retaining it alone does not ensure learning.
- **Organizational learning: reliable capture versus human review capacity.** I want agent proposals coalesced and human review attached to relevant work, with interruptions reserved for consequential conflicts. That role will likely favor immediate capture and prompt resolution so rationale does not disappear. When several sessions finish together, every proposal cannot receive immediate human attention while the developer maintains uninterrupted implementation work.

## Evidence that would settle it

- **Historical completeness:** Compare full-file startup reading with a compact current-authority view in the same Markdown file, using representative three-month history. Measure startup effort, one-minute retrieval, correct authority selection and whether the next decision uses a relevant past tradeoff. Prefer selective reading if it reduces effort without losing decision quality; retain broader reading if it prevents consequential mistakes within the agreed budget.
- **Capture and review:** Compare immediate proposal review with coalesced review at relevant commits across comparable multi-session work. Count lost or invented rationale, duplicate proposals, conflicts discovered after landing, human review time and attention switches. Keep immediate review where its reduction in consequential errors justifies the measured attention cost; otherwise use coalesced review.
