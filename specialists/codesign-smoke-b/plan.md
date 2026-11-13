# Research plan — codesign-smoke-b

Field: The daily user: a developer working alongside an agent team.

## Research questions

1. Which tasks do developers hand to a team of coding agents, which do they keep, and how do they decide?
2. How do developers review and verify agent-written changes, and where does review become the bottleneck?
3. How do developers keep track of several agents running at once (status, attention, interruptions, context switching)?
4. What does a developer need to tell agents up front (specs, project rules, context files) to get usable work, and how does that change with experience?
5. When and how do developers step in mid-task — redirecting, stopping, or taking over — and what signals tell them to?
6. How does working with agents change trust over time: what builds it, what breaks it, and how do developers recover after a bad change?
7. What are the main failure modes developers report in daily use (wasted runs, conflicting edits, silent wrong work, cost surprises), and how do they guard against them?
8. How does the developer's own skill and role shift (from writing code to specifying, reviewing, and coordinating), and what do they lose or gain?

## Sources that count

Count:
- Peer-reviewed papers and preprints on developer use of AI coding assistants and agents (HCI, software engineering venues such as CHI, ICSE, FSE, CSCW).
- Field studies, surveys, and controlled experiments with stated methods (including industry research reports with published method).
- Practitioner posts and talks by named developers describing their own daily work with coding agents, with concrete examples.
- Postmortems or incident write-ups involving agent-made changes.
- Books or long-form guides by named authors with direct experience.

Do not count:
- Vendor marketing pages, product launch announcements, and feature lists.
- Anonymous or unattributed posts, listicles, and SEO content.
- Social-media threads with no worked example.
- Predictions about the future of programming with no observed use behind them.

## Inclusion rules

A source is logged only if it has all of:
- A named author or named organization responsible for it.
- Observed use: real cases, study participants, logs, or the author's own first-hand sessions — not speculation.
- A stated method (for studies) or enough concrete detail to check the claim (for practitioner sources: what task, which tool or setup, what happened).
- Relevance to a developer working with one or more agents on real code (not code completion alone, unless it informs review, trust, or delegation).

Excluded:
- Sources about AI in general with no software-development use.
- Benchmarks of model capability alone, with no human-in-the-loop element.
- Sources older than the agent era only where they add nothing beyond newer ones (older pair-programming or automation-trust research may be kept if it directly answers a question above).
- Duplicates: a re-post or summary of a source already logged.

## Stop rule

At most 5 searches (the search budget). Searches run in rounds of 5. Stop early if two consecutive rounds of 5 searches add no new finding.

## Changes

Changes (date, what, why)

## Viewpoints

### V1. Orchestrator / manager of agents
Position: the developer's job shifts to running a team — splitting work into parallel tasks, dispatching agents, and merging results; throughput comes from parallelism.
- How many agents can one developer usefully run at once before attention and merge conflicts eat the gain?
- How should work be split so agents don't collide on the same files or decisions?
- What status signals does a developer need to know which agent needs them now?
- Where does the bottleneck move once code generation is cheap — to specs, review, or integration?

### V2. Skeptical reviewer / verification-first
Position: agent output is plausible but unreliable, so review and testing are the real work; speed claims fall apart once verification cost is counted.
- How much review time does an agent-written change cost compared with writing it by hand?
- Which kinds of errors slip past review most often (silent wrong behavior, test tampering, scope creep)?
- Do measured productivity gains hold up in controlled studies, or only in self-reports?
- What checks (tests, CI, small diffs) make agent work safe to merge?

### V3. Context engineer / spec-first
Position: output quality depends mostly on what the agent is told — specs, project rule files, examples, and plans written before code.
- What belongs in a standing context file versus a per-task prompt?
- How detailed must a spec be before handing work off, and when is writing it slower than coding?
- How do developers keep context files current as the codebase changes?
- Does planning-before-coding (plan mode, design docs) measurably reduce wasted runs?

### V4. Pair programmer / tight-loop collaborator
Position: the best results come from staying close to one agent in short, interactive turns, steering often, rather than delegating long autonomous runs.
- When does a short steer-and-check loop beat a long autonomous run?
- What signals tell a developer to interrupt, redirect, or take over?
- How does staying in the loop affect the developer's understanding of the code?
- What does the developer lose in flow or focus when switching between watching and doing?

### V5. Craft and skill-erosion concern (academic / human-factors view)
Position: heavy delegation changes the developer's skill and trust in ways borrowed from automation research — over-trust, deskilling, and loss of code ownership.
- Does long-term agent use weaken developers' ability to write or debug code unaided?
- How does trust calibrate over time, and what makes developers over- or under-trust agents?
- Who owns and understands agent-written code months later, during incidents?
- How do junior and senior developers differ in what they gain or lose?
