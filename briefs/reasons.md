# Brief: the next design of Reasons

November 12, 2026  
Status: Design brief. Self-contained: everything a reader needs is in this file.

Labels: *(Frank)* = Frank's words or decisions (Frank owns the project); *(record)* = from the project's own documents, summarized here; *(agent's read)* = interpretation, for Frank to accept or reject.

## 1 The decision this design supports

*(Frank)* The objective is helping people make well-informed decisions. The design question is not whether Reasons brings value; it is whether the system supplies the information that feeds the next decision: past Knowledge only, or the why behind it as well.

*(agent's read)* So the design has to settle two things: how Reasons takes part in decisions as they happen, and how we see whether it did.

## 2 What Reasons is, and is not

**Knowledge and Reasons.** *(record)* A software project already has Knowledge: its docs, specs, code, commit history and records of past work. Knowledge says what the project is and what changed. Reasons is a separate, small set of written judgments that says why: what the project holds, which alternative it declined, and what would make it reconsider.

- *(Frank)* Its biggest benefit is the gray areas: the pause before deciding whether to build the next feature, the challenge to whether we built the right things and should pivot. It is a medium that seeds new discussions and challenges old ideas and reasoning.
- *(Frank)* It is not a replacement for Knowledge. They are separate mechanisms and each benefits from the other. Knowledge holds the final state, or a history of changes, but not the reasons.
- *(Frank)* The foundation model is the baseline every team gets; the difference is the tacit knowledge a team makes explicit, and what teams learn raises the baseline. Reasons is one place that difference is written down.

**What a judgment carries.** *(record)* Each judgment is one plain-prose file, readable and writable without tools. Every judgment carries:

| Element | What it answers |
|---|---|
| Statement | What the judgment holds |
| Rationale | Why it holds, and which plausible alternative it declines |
| Scope | Where and when it applies: product, component, kind of decision, period |
| Standing | Proposed, adopted or superseded; who adopted it and when |
| Provenance | Who expressed it, whether stated or inferred, and links to the evidence behind it |

A *position* (a judgment that picks a side between two goods) also carries the strongest case against it and what would reopen it.

**How it is built today.** *(record)*

- **A tree.** Objectives and positions are nodes; rules are the leaves. Each item names its parents. A hand-kept index file lists the whole tree top-down. The current project's tree holds 4 objectives and 13 rules in force; 3 earlier rules were retired to Knowledge.
- **A shared foundation.** One short file with purpose, current priorities and recurring trade-offs.
- **Delivery.** The foundation and the tree index load at the start of every session. The agent opens an item's file for its rationale and scope before relying on it. Sessions restart between stages of a piece of work, so judgments arrive fresh.
- **Citation.** Agents cite a judgment's ID when a decision rests on it. No citation is a valid answer. A citation is checked against the work, not taken on trust.
- **Capture: the session audit.** An audit, run on request, reads the agents' session logs and finds *judgment moments*: points where a recorded judgment applied, or where one should have existed. It proposes additions and revisions for Frank to adopt. It never adopts anything itself.

**Why agents miss information they have.** *(record)* Conditions seen so far: a large knowledge base; low effort on the current turn; a long session where the information was given at the start; the task's words differing from the record's words; the agent believing its general knowledge is enough; nothing in the task signalling that a judgment applies; a judgment becoming relevant partway through; a competing source found first and believed; context lost at compaction, handoff or delegation; and an objection answered with a plan, treated as resolved, while the work drifts from that plan.

## 3 Who uses it

*(agent's read, from Frank's framing)* A human team working alongside an agent team. The human team keeps the roles of a cross-functional team and is where new judgment comes from: new cases, customers, decisions no one has made before. The agent team works from the baseline plus what Reasons and Knowledge give it.

*(record)* Today that is one owner, Frank, and a trial project: a software project whose own development tasks are the workload. Each piece of work (a *track*) has a driver agent and an advisor agent, one Claude and one Codex, taking turns. Frank joins only when an agent escalates. A judgment moment can be caught by the agent itself, by the other agent in review, by Frank on escalation, or only later by the audit; each catch costs more than the one before it.

## 4 What is already decided

*(record)*

- One project's set of judgments until a second project adopts Reasons. No layer shared across projects before then.
- The tree loads at the start of every session; a fresh session per stage of a track.
- Judgments are added only from Frank's corrections, or from choices of his that will recur; no bulk seeding. An earlier prototype seeded rules in bulk, and 9 of 27 earned their place.
- Frank adopts every item; the audit proposes, it never adopts.
- **The current trial.** It alternates two modes by track. In Reasons mode the tree loads at session start. In comparison mode the agents get the same foundation and the same judgment files but must find a judgment by search before citing it. It runs for 10 measured tracks or 2 weeks, whichever comes first. Reasons mode passes if, per track, it averages at least 1 fewer judgment moment that reached Frank on escalation or was found only by the audit, and at least 5 fewer of Frank's steering minutes, than comparison mode.
- **The stop rule.** Stop Reasons' distinct part if it does not beat comparison mode by that margin, or if maintaining Reasons costs more of Frank's minutes than it saves.

## 5 What the design has to answer

*(agent's read)*

1. **Raising a challenge.** When does Reasons bring a position back into question, to whom, and how does it avoid turning every tension into a request for Frank?
2. **Recording what happened to it.** How a challenge's outcome is recorded: hardened with evidence, weakened by a hole, led to a pivot, or dismissed. The tree's change history is the natural place.
3. **Seeing what fed a decision.** How to tell, for a decision, whether Knowledge, a reason, both or neither fed it. A reason counts only if it reached the agent before the agent committed to a choice; a reason cited afterward to justify a choice already made proves little. Delivery is already required to log its time relative to the agent's first commitment.
4. **Retiring what the model now knows.** Each rule marks a place where the model got it wrong at the time. When the model changes, how is a rule that the plain model now gets right found and proposed for retirement? One route: ask each rule's question of a model without Reasons, and propose retiring the rule if it now answers correctly.
5. **Judgment from people outside agent sessions.** The audit only sees judgment shown while someone works with an agent. Domain experts who never work in agent sessions, often not engineers, never appear there. How does their judgment get in, without bulk seeding? One route: an interview aimed at what the plain model gets wrong.
6. **The trial's measures.** The current trial measures how well Reasons is delivered, and may count its main benefit as a cost: a Reasons that raises "should we build this at all?" will sometimes send more moments to Frank, not fewer. Should the trial also count these?

| What to count | Recorded for each | What it shows |
|---|---|---|
| Tree changes | Added, revised, retired; what triggered it; who started it (person or agent) | Where judgment happened, which Knowledge's history doesn't record |
| Challenges | Hardened with evidence, weakened by a hole, led to a pivot, dismissed | Whether positions are tested or just sit there |
| Time to challenge | From when evidence against the current direction appeared to when someone raised it | How fast a wrong direction gets questioned |
| Surfaced discussions | Which reason came up, and the result: a decision, a task, a changed position, or nothing | Whether bringing up a reason leads to action |
| What fed a decision | For a sample of decisions: Knowledge, a reason, both, neither; and whether it was later reversed | Frank's core question: what goes into a decision |

## 6 What would show the design is wrong

*(agent's read)* Each is a real case the design must answer for in advance.

**The 18-hour drift.** *(record)* On November 6, Frank and the agents were building a test setup to evaluate Reasons. At 16:11 Frank pointed out that two missed rules (the next case) had been lost in very long sessions, and asked whether that made the evaluation depend on the environment. The agent agreed the sessions were long but answered that session length "can be a controlled condition", and proposed replaying the long sessions. The setup being built capped each run at 64,000 tokens, too small to reproduce them. The plan never made it into the build, and nothing checked the build against it. Frank kept approving work; the question "what decision does this inform?" came up three times without becoming a standing rule. At 10:39 on November 7 Frank listed the conditions again and asked whether to keep rebuilding environments or build Reasons, and the direction changed. The reason to change existed about 18.5 hours and 22 commits earlier. The pattern: an objection answered on paper is treated as resolved, and the work drifts from the answer.
*The design should say when it would have raised the question, and to whom. If it can't raise it sooner, it misses Frank's main benefit.*

**Two missed rules.** *(record)* In an earlier project, two rules sat in the instructions file loaded at the start of every session. One said an internal account ID must never be passed outside its module; the agent recommended passing it across modules anyway, judging it "zero impact on security". The other said every kind of entity uses the same primitives; the agent framed a feature as for one kind only. Both were missed far into long sessions, about 154,000 and 222,000 tokens in. In the first, the rule was stated but its reason (preventing leaks across modules) was not.
*The design should say how the rule comes back into view at the decision.*

**Noise.** If most challenges it raises are dismissed, it costs more than it gives.

**Upkeep.** If maintaining Reasons costs Frank more minutes than it saves (the stop rule in §4).

## 7 Out of scope for this design phase

- Building.
- A controlled comparison of whether Reasons beats good searchable Knowledge on unfamiliar work. That comparison answers an outside skeptic (an investor, a customer, a reviewer asking "how do you know it helps?") and is a separate decision.
- A layer shared across projects.
- Tiers (a fixed ranking of judgment kinds).

## 8 Questions for Frank

*(agent's read)* Where the agent is least sure it understands:

1. Is the design's main user the agent team (Reasons shapes what agents do) or the human team (Reasons raises questions for people), or both equally?
2. Does a challenge come from an agent noticing a tension, from new evidence arriving, from a scheduled review, or all three?
3. Is "pivot" in scope at the product level (should we build this at all?), or only within a track?
