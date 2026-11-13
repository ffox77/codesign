Found before cut: 3

### T1: Checking unattended decisions catches quiet failures but adds recurring review work
Roles: organizational learning, the daily user
Side 1: Every revisit trigger needs a named observer and a concrete inspection occasion with a fallback when no shared session occurs. Decisions that never return to active work can still cause harm, so follow-up must detect failed assumptions even when nobody touches the entry.
Side 2: Follow-up should happen through related repo activity and keep developer effort bounded. Requiring visible disposition when new work touches a stale entry covers actionable concerns without imposing recurring checks on decisions unrelated to current work.
Would settle it: Plant a failed assumption in a decision that current work will not touch, then compare activity-driven checking with a named weekly fallback. Measure detection delay, review minutes, and whether earlier detection changes an actual next action; earlier detection must yield enough useful action to justify the recurring cost.

### T2: Recording testable assumptions improves learning but competes with the capture budget
Roles: organizational learning, the daily user
Side 1: Each qualifying decision must identify its pivotal assumption and an observable signal that could support or challenge it. A choice and persuasive rationale alone cannot show whether experience supports the decision or explain what evidence should change it.
Side 2: Both developers must sustain capture within the stated time budget, measured from noticing a decision through rationale recovery, agent review, and committing the entry. Additional thinking and recording requirements can make ambiguous or in-passing decisions too expensive to capture and increase omissions.
Would settle it: Over a month, compare choice-and-reason entries with entries that embed an assumption and signal across chat, coding, and in-passing decisions. Measure the complete capture time, qualifying decisions omitted, and whether another developer can identify evidence that would change each choice. Retain the added requirement if its learning benefit survives the two-minute budget without materially increasing omissions.

### T3: Sensitive staleness flags can prompt learning but interrupt work on weak evidence
Roles: organizational learning, the daily user
Side 1: Early, sensitive flags and prompt reassessment can prevent obsolete assumptions from reinforcing themselves. Waiting for an unmistakable failure affecting current work can delay learning; a stale decision needs an explicit temporary working choice and a person responsible for resolving it.
Side 2: Human intervention should require concrete evidence of the affected decision, the failed trigger or assumption, and the work affected. Speculative concerns and duplicate questions from parallel agents consume developer attention and can block ordinary work without changing the correct action.
Would settle it: Run concurrent agents on tasks containing deliberately failed triggers and harmless apparent contradictions, varying the threshold for human review. Count distinct and duplicate interruptions, waiting time, detection delay, and incorrect reliance on stale choices. Choose the threshold that prevents consequential stale reliance at an acceptable review burden, with one shared disposition for duplicate concerns.
