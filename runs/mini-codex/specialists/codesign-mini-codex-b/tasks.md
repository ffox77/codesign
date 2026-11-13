## Tasks

### K1
Plan a developer's workday in which a bug fix, an API change, a dependent UI change, and an unfamiliar subsystem investigation compete for attention. Decide what to do personally, what to assign to agents, and which work can run concurrently.
Excellent answer: Identifies uncertainty, dependencies, consequences of failure, and the developer's available review capacity before assigning work. Gives agents bounded goals, relevant context, interface constraints, ownership, and observable completion criteria; sequences dependent work and schedules integration. Explains when another agent is worth its coordination cost, retains human decisions where needed, and makes time for understanding the resulting code.

### K2
Two agents are implementing related changes when a requirement changes and both begin editing shared code. Replan the work and carry the contributions through a coordinated handoff and integration.
Excellent answer: Establishes the current changes and authoritative requirement, identifies affected interfaces and dependencies, and pauses or redirects only the affected work. Updates assignments and shared decisions, establishes edit and integration ownership, and confirms receipt of the change. Reconciles semantic conflicts as well as textual conflicts, integrates in a justified order, verifies the combined behavior, and leaves a handoff recording state, unresolved issues, and the next owner.

### K3
An agent reports that a change is complete and another agent approves it, but a developer notices intermittent failures and cannot reconstruct the reasoning from the summaries. Decide whether to accept, investigate, reassign, or roll back the change.
Excellent answer: Treats completion and approval as claims requiring evidence. Inspects the actual diff and relevant execution evidence, reproduces the failure, and tests requirements and boundary conditions independently of the agents' shared assumptions. Matches verification and containment to the consequences of failure, distinguishes incorrect implementation from unclear requirements or environment problems, and sets explicit conditions for acceptance, reassignment, rollback, or human takeover. Restores enough developer understanding to maintain and debug the accepted result.

### K4
Assess whether a developer should continue using an agent team after several working days that produced faster drafts but more interruptions, review work, and late integration problems.
Excellent answer: Compares completed, acceptable work across reasonably comparable tasks and distinguishes team use from single-agent and developer-only work. Counts elapsed time, developer planning and monitoring effort, review, rework, integration, cost, and delayed defects without double counting overlapping time. Examines task difficulty, familiarity, agent concurrency, and selection effects; includes attention, understanding, and recovery burden. Proposes repeated observations with explicit decision criteria and states uncertainty rather than inferring sustained value from draft speed.

## Probe questions

### Q1
How would you decide whether delegating work in an unfamiliar subsystem preserves enough developer understanding to maintain and debug it later?
Excellent answer: Relates delegation scope to the developer's current knowledge, change consequences, and ability to check behavior. Specifies the understanding needed for future maintenance and practical ways to establish it through inspection, explanation checked against code, and hands-on debugging or modification. Recognizes the cost of rebuilding context and gives criteria for narrowing delegation or doing part of the work personally.

### Q2
What signs suggest that supervising several agents is consuming more of a developer's attention than the work warrants, and how should the developer respond?
Excellent answer: Looks for repeated context switching, growing review queues, unanswered decisions, duplicated explanations, and lost task understanding, assessed against actual progress and developer effort. Considers reducing concurrent work, batching nonurgent updates, clarifying assignments, or taking over a difficult task. Explains the tradeoff between throughput, responsiveness, learning, and recovery capacity without assuming that more autonomy always reduces workload.

### Q3
What makes two coding assignments independent enough to run concurrently, and what should their assignment briefs contain?
Excellent answer: Checks dependencies in behavior, interfaces, files, mutable state, environments, and decisions rather than equating separate files with independence. Gives each assignment a goal, context, constraints, ownership boundaries, agreed interfaces, dependencies, verification criteria, and handoff expectations. Identifies work that must be sequenced or revisited and accounts for integration effort.

### Q4
How would you decide whether adding an agent will shorten the time to a usable result?
Excellent answer: Examines the critical dependency path, separable work, setup and communication overhead, shared-resource contention, and the developer's capacity to review and integrate. Counts duplicated work and rework, distinguishes concurrent execution from repeated independent attempts, and measures time to verified integration. States circumstances in which adding an agent helps and circumstances in which it lengthens completion.

### Q5
What evidence is sufficient to accept an agent's contribution when the developer cannot inspect every action the agent took?
Excellent answer: Ties acceptance to stated requirements and consequences of failure. Combines inspection of the delivered changes with reproducible verification of relevant behavior, including appropriate boundary or failure cases, and checks the scope and provenance of reported results. Explains the limits of passing tests and self-reports and identifies unresolved uncertainty that warrants further review.

### Q6
How can a developer detect a shared wrong assumption when one agent reviews another, and choose between correction, reassignment, rollback, and human intervention?
Excellent answer: Seeks checks grounded in requirements, independent observations, or alternative test cases rather than relying on agreement. Separates shared context errors from implementation errors and considers reviewer independence and common failure modes. Chooses a response using failure scope, reversibility, evidence quality, and repeated unsuccessful attempts, with explicit stop and acceptance conditions.

### Q7
Which progress cues would help a developer distinguish useful agent work from confident reporting, a stalled task, or activity in the wrong direction?
Excellent answer: Uses inspectable intermediate artifacts, verified milestones, current blockers, unresolved assumptions, and remaining dependencies to judge progress. Relates update frequency to task uncertainty and consequences, recognizes that visible activity and confident language do not establish correctness, and specifies when missing or contradictory evidence should prompt investigation.

### Q8
How should progress updates and interruption rules change as agents receive more autonomy?
Excellent answer: Distinguishes routine status from decisions needing timely developer input and defines escalation triggers based on uncertainty, blocked dependencies, scope changes, or consequential actions. Balances batched updates and protected focus against loss of awareness, decision latency, and the cost of rebuilding context. Preserves a way to inspect current state and take over, and evaluates whether the arrangement actually reduces developer effort.

### Q9
What information must survive a requirement change or handoff so the developer and agents can resume with a shared understanding?
Excellent answer: Identifies the authoritative goal and acceptance criteria, changed decisions and their rationale, current artifacts and verification state, ownership, dependencies, unresolved questions, and the next action. Makes superseded instructions explicit and checks that affected workers received the update. Treats a summary as something to reconcile with actual state when context is incomplete or reports conflict.

### Q10
Which coordination practices from human development teams transfer to agent teams, and where does the analogy break down?
Excellent answer: Explains the purpose of explicit ownership, interface agreements, shared decision records, and handoffs. Examines how limited or lost context, unreliable reports, uncertain persistence, and lack of human accountability can undermine assumed shared understanding. Keeps the developer's decision authority explicit and distinguishes useful coordination mechanisms from assumptions that agents have human teammates' memory or judgment.

### Q11
How would you compare a developer working alone, with one agent, and with an agent team without mistaking task selection or extra compute for a coordination benefit?
Excellent answer: Defines a comparable unit of acceptable completed work, records task difficulty and developer familiarity, and uses a justified comparison design with repeated observations and stated limitations. Separates team coordination from concurrency, repeated attempts, and compute expenditure. Includes human effort, elapsed time, quality, and cost, and identifies confounds and the limits of causal conclusions.

### Q12
What evidence over repeated working days would establish that an agent-team workflow remains useful after its initial demonstration?
Excellent answer: Tracks accepted integrated outcomes, maintenance and delayed defects, planning and review effort, interruptions, recovery, cost, and developer understanding across representative work. Records failures and abandoned attempts as well as successes and accounts for learning and novelty effects. Uses an explicit decision threshold tied to the developer's needs, reports variability and uncertainty, and avoids generalizing single-agent or short demonstration evidence to sustained team use.
