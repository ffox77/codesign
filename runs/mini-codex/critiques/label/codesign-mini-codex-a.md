## What the baseline gets wrong

- **Entry format:** “Why” captures a justification and tradeoff, but need not identify the assumption supporting the choice or what success would look like. A later reader can retrieve a persuasive reason without knowing whether experience supported it.
- **Rule 4:** Checking a trigger before relying on an entry misses decisions that quietly stop being mentioned. The weekly scan depends on a “first shared session” that may never occur; nothing says who checks an unattended trigger or when. Naming an owner does not establish a working reminder.
- **Rules 3–4:** An entry becomes nonbinding as soon as either person marks it stale, but there is no temporary working choice while the uncertainty is resolved. Different agent sessions can act on different interpretations of the same unresolved decision.
- **Rule 3:** “Date substantive changes” does not explicitly preserve the original rationale when editing an active entry. Rewriting the reason after seeing the outcome can erase what the team actually believed and make hindsight look like foresight.
- **Use and cost:** The monthly retrieval test measures finding a reason, not learning from it. A log can pass while the team repeatedly retains choices whose assumptions failed. Session-start reading of the whole growing history also has no bounded cost.

## My requirements

1. For each qualifying decision, record the pivotal assumption and an observable signal that would support or challenge it. These may fit inside the existing Why and Revisit lines; no extra document is required.
2. Give each revisit trigger a named observer and a concrete inspection occasion, including a fallback when no shared weekly session happens. A simulated week without a shared session must still identify who checks due triggers.
3. For a stale decision, state the temporary working choice and who will resolve it at the next relevant work occasion. Two agents reading the same file must infer the same permitted next action.
4. Preserve the original choice and rationale when substantively revising them; append a dated correction or link a replacement. A reader must be able to distinguish the original belief from later evidence.
5. After a month, sample one revisited decision and show the observed evidence, the resulting retain/change action, and why. If no decision was revisited, test the process using a deliberately failed assumption.
6. At three months, test a representative developer and agent on finding the governing choice and its reason within one minute, including a replaced decision. Measure session-start reading time as history grows.

## Expected conflicts with other roles

- **The daily user: a developer working alongside an agent team — capture effort.** I want a falsifiable assumption and follow-up signal; the developer will likely want to record only the choice and immediate rationale. Under the two-minute budget, ambiguous decisions may require more thinking than the developer can spare, or lose the evidence needed for later learning.
- **The daily user: a developer working alongside an agent team — review effort.** I want explicit follow-up even without a shared session, plus an evidence-based revisit test. The developer will likely want checks only when related work occurs. Those preferences cannot both cover decisions that cause quiet harm without returning to active discussion.

## Evidence that would settle it

- **Capture effort:** Over a month, compare a minimal choice/reason entry with one that embeds an assumption and signal. Measure capture time, qualifying decisions omitted, and whether the other developer can identify evidence that would change each choice. Keep the added requirement only if its learning benefit survives the two-minute capture budget without materially increasing omissions.
- **Review effort:** During a trial, include a known failed assumption in a decision that current work will not touch. Compare touch-only checking with a named weekly fallback. Measure detection delay, review minutes, and whether detection changes an actual next action. Faster detection without a useful action would not justify recurring review cost.
