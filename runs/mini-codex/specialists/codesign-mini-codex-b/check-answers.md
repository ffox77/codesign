# Check answers

Field: The daily user: a developer working alongside an agent team

The recommendations below apply the findings to the scenarios. The underlying studies and practitioner accounts do not establish an optimal professional agent-team workflow; single-assistant, student, observational, and prototype results retain their stated limits.

### K1
Start by identifying the bug's consequences, the API/UI dependency, what is unknown in the subsystem, and how many significant changes I can review today. I would personally triage the bug and settle any consequential behavior or API decisions. Give an agent a bounded reproduction and fix if the failure is independently diagnosable; retain it myself if understanding the failure is essential or verification remains unclear. Carlini's agents duplicated fixes when they shared a blocking failure, so simply assigning more workers is insufficient.

Specify the API contract and acceptance examples before implementation. Assign one owner to the API change and sequence the dependent UI implementation after the contract is stable; preparatory UI investigation can run concurrently if it does not assume unsettled behavior. Give another agent a bounded subsystem investigation or disposable proof of concept, requesting code locations, unknowns, and failed approaches. I would inspect the unfamiliar interfaces and check relevant documentation before accepting its conclusions.

Each brief should state the goal, known approach where appropriate, context, ownership boundary, dependencies, expected artifacts, and verification criteria. Record task claims and progress so restarts do not duplicate work. Schedule integration and one significant review at a time, leaving time to understand the accepted code. Add a worker only for separable work that fits that review capacity. Willison's experience supports research and minor maintenance as useful concurrent work, not unlimited parallel feature delivery.

Findings used: F7, F8, F10, F11, F12, F13

### K2
First reconcile actual diffs, task claims, test results, and recorded progress with the changed requirement. Write down the authoritative goal, changed contract, superseded instructions, and acceptance examples. Redirect the affected workers and confirm they have the new assignment before allowing further overlapping edits; unrelated, independently verifiable work can continue. The findings support explicit ownership and restart context, but do not establish an experimentally validated acknowledgement protocol.

Assign one owner to shared code and one integration owner. Divide the remaining work by independently diagnosable behavior, not merely by files: Carlini's compiler could have file pairs that failed only together. Record failed approaches and remaining dependencies in the handoff. Stabilize and verify the shared interface first, then integrate dependent changes in that order. Resolve incompatible behavior or assumptions even when git reports no conflict. Run the combined regression checks before further feature work, following the regression-control lesson from the compiler case.

Leave the next owner a record of the current requirement, landed and pending artifacts, verification results, unresolved issues, and the next action. Reconcile that record with the actual repository on resumption; task locks reduce duplicate claims but do not eliminate merge conflicts.

Findings used: F8, F9, F10, F16

### K3
Investigate before accepting. Completion and reviewer agreement do not explain the intermittent failure. Inspect the diff and recover the relevant commands, inputs, environment, and test results. Distinguish final-code review from action review: external effects or commands may not be represented in the patch. Reproduce the failure and reduce it to a diagnosable case, including combinations of components if isolated tests pass.

Check the intended behavior against requirements and documentation, particularly where I cannot explain an unfamiliar API. Test the intermittent path and relevant boundaries independently of the agents' interpretation. Separate an implementation defect from a disputed requirement or environment problem. Pause dependent feature work while regression evidence remains unresolved.

For a narrow, reproducible defect with a clear expectation, return it to a bounded correction task. Reassign when the original worker repeats the same wrong approach despite clarified evidence. Take over when the underlying requirement or subsystem needs human judgment and I cannot yet evaluate the result. Roll back or disable the change if ongoing failures have material consequences and a known-good state is available. Accept only after the agreed behavior and regression checks pass, remaining uncertainty is appropriate to the consequences, and I can explain the failure and repair well enough to maintain it. These are scenario-specific decision conditions, not measured thresholds from the findings. More review alone is not proven to restore comprehension.

Findings used: F7, F8, F9, F13, F14, F15, F16

### K4
Judge accepted, integrated work rather than draft speed or the feeling of acceleration. METR's 2025 randomized study found a slowdown despite participants' perceived speedup, but it does not estimate the effect of today's agent teams. Compare representative tasks across developer-only, one-agent, and team workflows, recording difficulty, familiarity, scope, quality, and concurrency. Include failed and abandoned work. Watch for selection: METR's follow-up could not support a reliable productivity estimate when developers withheld tasks and avoided conditions.

Record elapsed time to verified integration separately from active developer effort. Break human effort into planning/prompting, monitoring, review, debugging, integration, and context recovery; do not add agent waiting time to human work already counted on another task. Compare delivered tests and documentation too, since output scope may change. Record compute cost, delayed defects, interruptions, review backlog, and ability to explain and modify the resulting code. Prompting/checking and switching observations make these plausible burdens, not a causal estimate of team overhead.

Repeat over further comparable days, tracking learning and variability. Continue a team only if it meets a predeclared practical threshold, such as shorter time to acceptable integration within my review budget and without unacceptable maintenance or comprehension loss. Reduce concurrency or use agents mainly for bounded research if drafts outrun review. Several days can guide a local choice, but do not establish durable or general causal benefits.

Findings used: F1, F2, F3, F4, F5, F11, F13, F14

### Q1
Assess what I already know, how consequential a mistake would be, and whether I can independently check the subsystem's behavior. Define the understanding I need: the relevant interfaces, data flow, failure modes, and how to reproduce and diagnose the change. Start with bounded investigation and code pointers; inspect the code and check unfamiliar API behavior against documentation, as participants in the Copilot study did.

Before broad delegation, try explaining the implementation and making a small change or debugging a representative failure myself. Treat successful generation and comprehension as separate outcomes: the student study found better initial artifacts alongside lower comprehension. Per-file review was associated with higher comprehension but was not randomized and did not close the observed gap, so requiring explanations or more review is no guarantee. If I cannot reconstruct or check the behavior within the available time, narrow the task or do the uncertain part personally. Record context for later resumption and count reconstruction time as work.

Findings used: F6, F7, F13, F14

### Q2
Look for frequent revisits, fatigue, forgotten completed tasks, repeated context reconstruction, and output arriving faster than it can be reviewed. Count developer prompting and checking time as well as accepted progress. Task count alone is misleading: the observed developer with five tasks switched more frequently than another with seventeen, and brief checks were included in those counts.

Reduce concurrency when review or decisions become the bottleneck. Keep a visible queue and durable context notes; batch routine checks where delay is tolerable, while preserving timely escalation for wrong direction or scope. Use clearer specifications to reduce reconstruction of intent, and take over a difficult task if supervision consumes the available capacity. External reminders were observed coping strategies, not proof that a fixed ten-minute cadence works. Evaluate whether the changes actually reduce effort and preserve awareness and understanding.

Findings used: F4, F5, F6, F11, F12, F16

### Q3
Assignments are independent enough when each can make progress and demonstrate useful behavior without competing for the same unresolved decision, fix, mutable resource, or interface. Check shared files and environments, but also behavioral coupling: Carlini's file-pair failures show that separate files can still interact. First isolate failures or agree the interface; sequence work that depends on a decision still in flux.

Brief each worker with the goal, relevant context, known implementation constraints, explicit owner and edit boundary, agreed interfaces, dependencies, acceptance checks, and handoff expectations. Use a task-claim mechanism and persistent progress/failed-approach notes so restarts do not duplicate assignments. Reserve an integration owner and review time; ownership records alone do not prevent merge or semantic conflicts. These brief fields are an application of the ownership and specification findings, not a tested universal template.

Findings used: F8, F10, F11, F12

### Q4
Identify what actually delays the verified result: implementation, an unresolved dependency, diagnosis, or human review. An additional worker helps only if there is independently diagnosable work off the existing worker's path and enough review/integration capacity to use its output. Shared blockers can create duplicate fixes and overwrites; isolate them first. Bounded research, minor maintenance, or disposable experiments may fit spare capacity better than another significant feature change.

Compare time to accepted integration, including setup, specification, checking, duplicate work, and repair. Distinguish complementary work from multiple attempts at the same task, and record extra compute separately. Do not sum overlapping agent run times as elapsed time or assume waiting is free of human attention. Add the agent as a measured local trial; stop or reduce concurrency if the review queue or regressions lengthen completion. The findings supply bottleneck examples and measurement cautions, not a quantified staffing formula.

Findings used: F3, F4, F8, F9, F11, F12

### Q5
Require evidence tied to the agreed behavior and consequences: an inspectable change, reproducible checks on the delivered revision, relevant inputs/environment, and results covering likely failures and regressions. Verify unfamiliar API claims against code and documentation rather than accepting plausibility. Passing checks establish only what those checks exercise; they do not establish comprehension or exclude interacting failures.

Inspect consequential actions separately when their effects would not appear in the final diff. The survey found careful code review did not imply careful action approval. Missing provenance, unexplained intermittent failures, or a result I cannot maintain warrants further investigation. Acceptance need not require every action transcript, but it does require enough independently checkable evidence and understanding for the risk of this contribution. The findings do not prescribe a universal evidence threshold.

Findings used: F7, F8, F9, F13, F15

### Q6
Compare the agents' shared premise with the authoritative requirement and independent observations. Use documentation for unfamiliar behavior and a separately chosen failing example or interacting-component test; agreement and passing tests based on the same premise are insufficient. Look explicitly for misunderstood intent, an unsuitable approach, and excess scope, all common reported intervention reasons. The findings do not directly measure whether one agent reviewing another catches these errors.

Correct a narrow implementation error with clear expected behavior. Clarify and replace a shared mistaken requirement before either agent continues. Reassign if the worker repeats the same approach after that correction; take over if the key judgment remains unresolved or I cannot evaluate the result. Contain or roll back consequential regressions when a reliable previous state exists. Set a bounded retry and acceptance condition in advance: the independently specified case and relevant regression checks must pass, with no unexplained failure in the affected behavior. These response rules are practical applications, not validated stop thresholds.

Findings used: F7, F8, F9, F16

### Q7
Ask for artifacts showing the current state: a reproducible failure, isolated failing subset, code/diff, verification results, or documented investigation with code locations and failed approaches. Tie milestones to the assigned goal and approach. A growing collection of outputs is not useful progress if it expands scope, pursues the wrong intent, duplicates another worker, or cannot pass existing regression checks.

Keep task ownership, blockers, remaining dependencies, and next actions in durable progress notes. Investigate when claimed completion conflicts with failing behavior, when repeated attempts do not narrow a blocker, or when significant outputs accumulate without review. Use more frequent checkpoints for unfamiliar or changing work and fewer routine interruptions for bounded work. The sources support inspectable progress and supervision concerns, but do not demonstrate an optimal update frequency or the reliability of confidence language.

Findings used: F8, F9, F10, F11, F12, F16

### Q8
Greater autonomy should include an explicit goal and scope, persistent current state, and clear reasons to interrupt. Batch routine status when the work is bounded and independently checkable. Escalate an unresolved dependency, misunderstood requirement, approach change, scope expansion, or consequential action that needs a developer decision. Final-code review and action review remain separate responsibilities.

Maintain a readable task queue and progress/failed-approach notes so I can inspect or resume work without reconstructing everything. Protect focus, but check whether longer gaps increase lost context or decision delay. Track switching, prompting/checking effort, forgotten results, and accepted progress; reduce concurrency if autonomy merely shifts work into a review backlog. Reported reminders and notes are examples, not proven interruption policies, and the survey does not establish an optimal escalation protocol.

Findings used: F4, F5, F6, F10, F11, F12, F15, F16

### Q9
Preserve the current goal, acceptance criteria, agreed approach and interfaces, what changed and why, and which prior instructions are superseded. Include task/edit ownership, artifacts and their actual verification state, dependencies, unresolved questions, failed approaches, and the next owner/action. Explicit restart instructions matter: Carlini's fresh containers relied on README/progress records, while task locks addressed duplicate claims without eliminating conflicts.

Send the changed instructions to each affected worker and check receipt before overlapping work resumes. On handoff, compare the summary with actual diffs and check results, especially if reports conflict. Persistent notes can reduce context loss, but the findings do not establish that summaries are reliable or that a particular acknowledgement mechanism is best. The proposed handoff fields apply the observed context and ownership mechanisms to the changed-requirement scenario.

Findings used: F6, F10, F12, F16

### Q10
Explicit ownership, interface decisions, clear specifications, progress records, and regression checks transfer because they address duplicate work, hidden dependencies, reconstruction of intent, and integration failures. The compiler case gives concrete examples: task locks, restart instructions, and failed-approach records helped organize work, but locks did not remove merge conflicts and interacting failures still required diagnosis.

Do not infer shared understanding or persistent memory from those mechanisms. Fresh agent sessions may need context rebuilt, and coherent output can coexist with misunderstood intent, excess scope, or poor maintainer comprehension. Keep the developer responsible for requirements, consequential decisions, evidence-based acceptance, and enough understanding to debug the result. Coordination practices are useful mechanisms, not evidence that agents have human teammates' accountability or judgment. The findings do not directly compare those human attributes.

Findings used: F8, F9, F10, F12, F13, F15, F16

### Q11
Define the unit as a completed, integrated change meeting comparable acceptance criteria, including supporting tests/documentation where relevant. Compare developer-only, one-agent, and team conditions on repeated tasks balanced for difficulty, familiarity, and scope, preferably with randomized assignment where feasible. Record refusals, withheld tasks, failures, and abandoned attempts; METR's follow-up shows how selection can undermine the estimate. State the limits of any observational or small local comparison.

Measure wall-clock time to acceptance, active developer work, cost, quality, delayed defects, interruptions, and comprehension separately. Do not double count human work done during agent waits or assume the delivered scope is identical. For the team condition, distinguish coordinated complementary roles from independent concurrent tasks and repeated attempts; record worker count and compute budget. A team using more compute than one agent cannot by itself establish a coordination benefit. Include a resource-comparable comparison when feasible and disclose remaining confounds. Perceived speed is another observation, not the outcome measure: METR's 2025 participants felt faster despite a measured slowdown in that setting.

Findings used: F1, F2, F3, F4, F5, F13

### Q12
Collect repeated records across representative working days: accepted integrated changes and their scope, elapsed time, active planning/prompting/checking/rework/integration effort, cost, failures and abandoned attempts, interruptions, forgotten results, and context-recovery work. Follow accepted changes for regressions and maintenance. Check developer understanding independently of initial artifact success; the student study supports that distinction but does not establish long-term professional maintenance effects.

Compare reasonably similar work under developer-only, one-agent, and team use, documenting task selection, familiarity, changing tools, learning, and novelty. Keep elapsed time distinct from overlapping human activity and track scope differences. Report distributions and uncertainty rather than just an average or a persuasive success story. Agree beforehand what sustained usefulness means locally: for example, more acceptable delivery within a fixed human-effort/cost budget, tolerable defects, and sufficient understanding to maintain the result. Reduce concurrency or stop team use if review and recovery overwhelm those gains. Existing short observations, single-assistant studies, and practitioner cases motivate these checks; they do not themselves establish sustained team value.

Findings used: F1, F2, F3, F4, F5, F6, F9, F11, F13, F14
