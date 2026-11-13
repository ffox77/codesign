## What the baseline gets wrong

- **The entry format compresses away operating conditions.** “Why” requires a reason and tradeoff, but not the constraint that made a plausible alternative unavailable. A future agent can recover the stated preference while missing a temporary budget, authority or deployment constraint. “Leave out … exhaustive alternatives” is sensible, but does not explain which rejected alternative matters enough to keep.
- **Rule 3 permits loss of the original account.** “Date substantive changes” does not explicitly preserve the previous rationale when an active entry is rewritten. A timestamp cannot explain what changed. Nor does the format distinguish an observed fact from an assumption or one person's uncertain recollection.
- **Rule 4 gives stale decisions no durable next step.** The owner is a default follow-up person, but there is no required action or completion condition. The five-minute scan can repeatedly acknowledge the same uncertainty. Calling stale entries nonbinding also leaves agents without a clear instruction when implementation depends on one and the human has not resolved it.
- **The use-and-cost check measures retrieval alone.** Finding one reason after a month does not establish that agents consulted it, that it changed a later decision, or that people still capture consequential choices after three months. Requiring every session to read an ever-growing history also has no tested cost boundary.

## My requirements

1. For a choice driven by a temporary constraint or a credible alternative, the few-line entry names that constraint and why that alternative was rejected. A reader can identify what changed conditions would undermine the choice without opening chat history.
2. Substantive revisions retain the earlier rationale and add a dated explanation or a linked replacement. Unverified assumptions and uncertain recollections are labeled; recording a working choice never silently turns it into shared agreement.
3. Every unresolved stale entry names a human, a next check and an observable completion condition, inline or through an existing issue. An agent encountering a dependent unresolved choice asks the session developer for direction before implementing that choice.
4. A three-month trial samples actual consequential decisions, including at least one reversal if one occurs. Check capture, reconstruction of original constraints, subsequent use and maintenance time—not just whether a heading can be found. Report missing evidence as unknown.

## Expected conflicts with other roles

- **The daily user: contextual detail versus capture effort.** I want the decisive constraint, relevant alternative and uncertainty preserved when applicable. The developer will likely want a predictable two-minute entry. Ambiguous decisions can require more investigation than that budget allows; neither guaranteed completeness nor a strict time cap can always hold.
- **The daily user: follow-through versus avoiding another task system.** I want unresolved staleness to have a next check and completion condition. The developer will likely want to mark an entry stale and resume coding. Reliable follow-through requires some explicit work that a status-only edit avoids, even if an existing issue carries it.
- **The daily user: evaluating use versus uninterrupted work.** I want evidence of capture and later decision use through three months. The developer will likely prefer the baseline's single monthly retrieval exercise. That exercise cannot reveal missed entries or ignored guidance; observing those costs additional attention.

## Evidence that would settle it

- **Context:** Compare baseline entries with entries adding only the decisive constraint/alternative. Have the other developer or a fresh agent explain why the choice held and whether a changed condition warrants reversal. Measure accuracy and writing time; equally accurate reconstruction favors the shorter format.
- **Follow-through:** During the trial, compare stale entries with and without an explicit next check. Inspect whether they resolve before dependent implementation and count reminders and maintenance time. If status plus owner reliably suffices, the additional requirement is unnecessary.
- **Evaluation:** Sample related work and commits at three months against the log, then ask what entries informed the next choice. Compare findings with the one-minute retrieval result. If retrieval passes while consequential decisions are missing or ignored, it is an inadequate success test. This small trial establishes local usefulness, not a causal performance gain.
