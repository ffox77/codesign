### K1

Start by ranking the work by user impact, deadlines, uncertainty, and dependencies. Reserve the developer’s attention for the urgent bug’s diagnosis, the API contract decision, and final integration. If the bug is contained, an agent can implement a fix from a reproduction while the developer reviews the proposed API contract. Give another agent a bounded investigation of the unfamiliar subsystem: map its entry points, invariants, dependencies, and likely change risks, with concrete evidence and unanswered questions.

Agree on the API’s request and response shapes, error behavior, compatibility requirements, and examples before implementation. Then API and UI implementation can run concurrently against that contract, using fixtures or a stub for the UI. Keep changes in separate branches or worktrees with explicit ownership. Integrate the API before validating the UI end to end. Do not fill every available agent slot: leave time for review, resolving discoveries, and a personal walkthrough of the unfamiliar subsystem. Replan if the bug or investigation exposes a dependency that invalidates the parallel work.

### K2

Pause edits to the shared code and preserve each agent’s current diff, tests, assumptions, and unfinished work. Clarify the changed requirement, identify which decisions and changes it invalidates, and publish one updated contract and acceptance criteria. Assign a single owner for the shared code; give the other agent a separate consumer change, test task, or review task. Establish the integration order and require acknowledgement of the new scope before either resumes.

Have each agent hand off its base revision, relevant commits, rationale, interface changes, validation results, and known gaps. The integrator should reconcile semantics rather than merely resolve merge conflicts, carry forward useful work, and discard superseded changes explicitly. Validate the integrated behavior against the new requirement, including compatibility and failure cases. Finish with a shared record of what shipped, what was deferred, and who owns remaining problems.

### K3

Do not accept the change on completion and approval claims alone. Intermittent failures are unresolved evidence against readiness, and missing reasoning makes independent approval less convincing. Preserve failing logs, seeds, timing, environment, and revisions; reproduce or instrument the failure and compare with the baseline to establish whether the change caused it. Ask for a concise reconstruction of the intended behavior, critical assumptions, alternatives, and validation evidence—not a transcript of every action.

Keep the change isolated while investigating. If it is already affecting users and a safe rollback exists, restore service first while retaining the evidence. Use a reviewer with a different hypothesis or a developer familiar with the subsystem when the original agents cannot explain the failure. Reassign if the problem exceeds their demonstrated understanding. Accept only after the failure mechanism is understood or convincingly bounded, the fix is validated, and someone can maintain it; a few successful reruns do not establish that an intermittent defect is gone.

### K4

Compare several days of completed, usable work with a comparable solo or single-agent baseline. Count the developer’s total attention: briefing, interruptions, review, explanation recovery, conflict resolution, integration, and subsequent repairs. Include elapsed delivery time, correctness, maintainability, and retained understanding. Faster drafts alone do not justify the team.

Identify whether the added cost comes from poor boundaries, unstable requirements, excessive concurrency, or tasks that need continuous human judgment. Try a smaller team, clearer interfaces, batched updates, and one integration owner on suitable tasks. Continue only if the workflow produces sustained net gains at acceptable quality and cognitive load. Keep agents for the task types that benefit, and return tightly coupled work to a developer or one agent when coordination costs dominate.

### Q1

Define the understanding the developer must retain before delegating: the subsystem’s purpose, entry points, data flow, invariants, failure modes, operational signals, and how to test or revert changes. Delegate bounded exploration or implementation while personally examining the highest-risk decisions. Require a concise map tied to code locations, examples, and unresolved questions.

Then test understanding through use: can the developer explain why the change works, predict a failure, locate its cause, and make a small follow-up change without asking the original agent? If not, arrange a walkthrough and hands-on debugging or narrow the delegation. The acceptable depth depends on the subsystem’s criticality and expected maintenance responsibility.

### Q2

Warning signs include repeated context switching, growing review queues, agents waiting for decisions, duplicate explanations, overlapping edits, frequent corrections, and late surprises. Another signal is that the developer cannot describe each task’s current state or spends more time reconstructing work than advancing it. High message volume and many active tasks are not evidence of throughput.

Reduce concurrency, stop low-value work, clarify ownership and acceptance criteria, and batch routine updates into predictable checkpoints. Give one person or agent integration responsibility with explicit limits. Measure whether completed work per unit of developer attention improves; if it does not, use fewer agents or work alone on that class of task.

### Q3

Assignments are independent when each can produce a useful, testable contribution without repeatedly waiting for the other’s decisions. They should have stable interfaces, limited overlap in files and state, separate validation paths, and a manageable integration step. Different files alone do not imply independence: shared schemas, behavior, migrations, or assumptions can create tight coupling.

Each brief should state the objective, context, scope and exclusions, owned areas, base revision, interface contract, constraints, dependencies, acceptance examples, required checks, and expected handoff artifacts. Include who decides ambiguities, what triggers an interruption, and where integration will occur. If the contract is unsettled, resolve it first or make one assignment explicitly exploratory.

### Q4

Estimate the remaining critical path, then ask which part the extra agent can actually shorten. Account for startup, briefing, duplicated exploration, communication, review, integration, contention, and the chance of rework. A new agent helps when it owns a bounded task that can run in parallel and delivers before its output is needed, with enough review capacity available.

Do not add an agent simply because work remains. If the bottleneck is a decision, a shared file, an external dependency, or the developer’s review capacity, another agent may increase latency. Use a time-boxed trial when estimates are uncertain, and judge time to a validated, integrated result rather than time to a first draft.

### Q5

Require a reviewable diff against a known revision, a clear account of intended behavior and important decisions, and reproducible validation tied to the final code. Evidence should cover the acceptance criteria, relevant regressions and failure cases, and integration with surrounding code. Identify assumptions, skipped checks, and residual risks explicitly.

The developer need not inspect every action, but must inspect enough consequential code and independently check the claims that matter. Match assurance to risk: a small presentation change needs less scrutiny than authentication, data migration, or concurrency logic. Agent approval adds confidence only when the reviewer examined relevant evidence and challenged assumptions. A confident summary or passing tests that simply reproduce the implementation is insufficient.

### Q6

Ask the reviewer to derive expected behavior from the requirement independently, identify assumptions that would invalidate the implementation, and look for counterexamples. Compare both agents’ conclusions with external constraints such as existing callers, actual data, documented invariants, or an independently constructed test. Agreement is weak evidence when both agents inherited the same brief, examples, or mistaken interpretation.

Correct locally when the error is understood and bounded. Reassign when expertise or repeated reasoning failures are the obstacle, supplying evidence rather than a presumed conclusion. Roll back when the current change creates unacceptable impact and restoration is safer. Bring in a human domain owner when intent, tradeoffs, or high-impact uncertainty requires accountable judgment. Verify the revised result independently before resuming normal integration.

### Q7

Useful cues show observable movement: a reproduced bug, a narrowed hypothesis, a concrete diff, an agreed interface, a failing test turned into a passing one, or an integrated behavior demonstrated against acceptance criteria. Updates should include the current revision, evidence, remaining uncertainty, next milestone, and any decision needed.

Repeated promises without artifacts suggest reporting rather than progress. Repeated attempts with unchanged hypotheses suggest a stall. Growing scope, irrelevant improvements, or checks disconnected from the requirement suggest drift. Judge cues against the task’s stage: an investigation can make progress by eliminating a hypothesis, but should explain what evidence eliminated it and how that changes the next action.

### Q8

Greater autonomy should reduce routine permission requests while increasing the clarity of boundaries and observable state. Agree beforehand on outcomes, allowed decisions, scope, resource limits, checkpoints, and escalation triggers. Use concise milestone updates and durable artifacts rather than continuous narration.

Interrupt immediately for a requirement conflict, consequential interface change, newly discovered serious risk, exceeded authority, or a blocker requiring a human decision. Batch reversible details and low-impact questions. Increase checkpoint frequency when uncertainty or coupling rises, and relax it after reliable performance. Autonomy should not make failures silent or leave the developer unable to stop and resume the work.

### Q9

Preserve the objective and acceptance criteria; the changed requirement and why it changed; settled decisions and their rationale; assumptions and unresolved questions; interfaces and compatibility promises; ownership and dependencies; and the authoritative code revision. Record which previous work remains valid, which is superseded, and what must be reconsidered.

A handoff also needs the current diff or commits, completed and pending work, validation commands and results, known failures, environment prerequisites, next steps, and recovery options. Keep this in a concise shared record and require the receiving party to confirm its interpretation. A long activity transcript is less useful than a clear account of the present state and its reasons.

### Q10

Explicit ownership, small reviewable changes, interface contracts, issue tracking, acceptance criteria, code review, continuous integration, decision records, and disciplined handoffs all transfer. So do limiting work in progress, escalating blockers early, and assigning an integration owner. These practices make dependencies and accountability visible.

The analogy breaks down where humans assume durable memory, tacit context, independent judgment, or learning that persists automatically. Agents may share correlated errors, lose context, produce plausible unsupported reports, and generate code faster than a developer can evaluate it. More agents therefore do not imply more independent expertise. Preserve context explicitly, verify claims through artifacts, and keep accountable human judgment at consequential decisions.

### Q11

Use comparable tasks stratified by complexity, coupling, familiarity, and risk. Rotate or randomize solo, single-agent, and team conditions across tasks or developers, accounting for learning and order effects. Hold tools, acceptance criteria, and quality expectations constant. Report both equal-resource comparisons and practical comparisons with their actual compute costs, rather than attributing extra compute to coordination.

Measure time to an accepted integrated result, developer active time, total resource cost, defects, rework, interruptions, and later maintenance performance. Include failed attempts and integration time. Record task selection and agent experience, and report uncertainty rather than declaring a winner from a small demonstration. Distinguish a coordination benefit from benefits due to more parallel computation, easier tasks, or a better-specified brief.

### Q12

Look for repeated delivery gains across representative work after onboarding novelty fades: lower time to accepted integration, less developer effort, acceptable compute cost, stable quality, and manageable review queues and interruption rates. Track escaped defects, rollbacks, delayed rework, and maintenance tasks so early speed is not credited before its costs appear.

Check whether developers can still explain and debug the resulting system and whether handoffs survive requirement changes, absences, and fresh sessions. Compare with credible solo and single-agent baselines, include unsuccessful days, and examine which task types benefit. A useful workflow should remain beneficial without exceptional supervision or cherry-picked tasks, and should have clear rules for reducing concurrency when conditions change.
