# Typical tasks and probe questions — codesign-smoke-b

Field: The daily user: a developer working alongside an agent team.

## Tasks

### K1
You have a backlog of eight tickets for a mid-sized web service (two bug fixes, a dependency upgrade, a new API endpoint, a flaky-test investigation, a schema migration, a docs refresh, and a refactor of a shared auth module). You can run several coding agents in parallel. Plan the day: which tickets go to agents, which you keep, how you split and isolate the work, and in what order you review and merge.
Excellent answer: Sorts tickets by how easy the result is to check and how much damage a wrong result does, not by size. Hands well-bounded, test-checkable work (bug fixes with a repro, docs, the dependency upgrade behind CI) to agents. Keeps or tightly pairs on the high-blast-radius items (schema migration, shared auth refactor) and uses an agent for investigation only on the flaky test. Isolates each agent in its own branch or git worktree and avoids giving two agents tasks that touch the same files (the auth refactor blocks anything that touches auth). Caps parallel agents at the number whose output the developer can actually review that day, since review, not generation, is the bottleneck. Orders merges so the riskiest change lands alone with time to watch it, and plans a fallback if an agent run goes sideways (discard and redo rather than patch a bad diff).

### K2
An agent returns a 600-line pull request that adds a feature, edits several existing tests, and reports "all tests pass." Review it and decide whether to merge.
Excellent answer: Treats "tests pass" as a claim to check, not evidence. Looks first at changes to tests: weakened assertions, deleted or skipped tests, mocks that make a test pass trivially, or special-casing of test inputs (known agent failure modes). Runs the tests and the app locally and checks the actual behavior against the original request, not the agent's summary. Checks for scope creep: unrelated edits, new dependencies, changed config, duplicated helpers instead of reuse. Judges whether the diff is reviewable at all; a 600-line mixed change is a reason to ask for it to be split or redone in smaller steps. Merges only what the developer can explain and would be willing to own during an incident.

### K3
A new teammate's agent sessions keep producing work that ignores project conventions (wrong test framework, wrong directory layout, reinvented utilities). Set up the project so agents get it right more often.
Excellent answer: Writes or fixes a standing context file (CLAUDE.md, AGENTS.md, or similar) that is short and specific: build and test commands, directory layout, the canonical utilities to reuse, banned patterns, and how to verify work. Keeps per-task detail in the task prompt or a short plan, not in the standing file. Adds checks that enforce rules mechanically (linters, type checks, CI, pre-commit hooks) rather than relying on prose alone. Encourages plan-first for non-trivial tasks so mistakes surface before code is written. Treats the context file as code: reviewed, versioned, updated when the agent repeats a mistake, and pruned when stale, since outdated instructions mislead agents.

### K4
An agent has been running on a refactor for 25 minutes. Its log shows it has edited the same file four times, reverted twice, and is now changing an unrelated module. Decide what to do.
Excellent answer: Recognizes the signs of a run that has lost the thread: repeated edit-and-revert loops, wandering into unrelated files, growing diff with no passing check. Stops the run rather than waiting for it to finish, since long failing runs rarely recover and cost time and tokens. Reads what it tried to learn what was missing (unclear spec, missing context, a hidden constraint). Discards the work (or keeps only useful findings), fixes the cause — a tighter task, a plan step, a missing fact in the context file, a smaller scope — and restarts fresh rather than steering a confused session. Notes the pattern so similar tasks get split smaller next time.

### K5
An agent-written change you merged last month caused a production incident. You are on call and need to fix it and decide what to change in how your team works with agents.
Excellent answer: Debugs the code as if no one on the team wrote it: reads it, reproduces the failure, and does not assume the agent's comments or commit message are accurate. Fixes forward or rolls back based on blast radius. In the review afterwards, asks how the change passed review (oversized diff, review of the summary instead of the code, missing test for the failing path, trust earned on easy tasks carried over to a hard one). Changes process concretely: smaller agent diffs, required tests for the failure class, a human owner named for each merged change, and tighter limits on what agents can touch (production data, credentials, destructive commands). Avoids both overreactions: banning agents outright or shrugging it off as normal bug rate.

## Probe questions

### Q1
(V1) How many coding agents can one developer usefully run in parallel, and what limits that number?
Excellent answer: Practitioners report a small number — often two to four for real feature work, more only for trivial or easily checked tasks. The limit is the developer's review and attention capacity, not the tool: each agent needs a clear task up front, check-ins when it stalls, and a careful review at the end. Past that point context switching costs and unreviewed output pile up. Merge conflicts and agents making conflicting design choices also cap parallelism unless work is split by file or module and isolated in separate worktrees or branches.

### Q2
(V1) Once generating code is cheap, where does the bottleneck in a developer's day move?
Excellent answer: To specifying the work clearly, reviewing and verifying output, and integrating changes. Industry data (for example the DORA 2024 and 2025 reports) links higher AI use to more code produced but also to larger batches and worse delivery stability unless teams keep small changes and strong testing. Excellent answers note that review queues, CI time, and the developer's own understanding of the codebase become the scarce resources.

### Q3
(V2) Do measured productivity gains from AI coding agents hold up when tested carefully?
Excellent answer: Results are mixed and depend on the setting. Early controlled studies on small, well-defined tasks (for example the 2022–2023 Copilot experiment where a task was done about 55% faster) showed large speedups. METR's 2025 randomized trial with experienced open-source developers on their own large repositories found they were about 19% slower with AI tools while believing they were about 20% faster. The gap between felt and measured speed is the key lesson: self-reports are unreliable, gains are largest on unfamiliar or greenfield work, and smallest for experts in mature codebases with high quality bars.

### Q4
(V2) Which errors in agent-written code are most likely to slip past a developer's review?
Excellent answer: Plausible-looking code that is subtly wrong in behavior (edge cases, error handling, concurrency, security checks), changes to tests that make them pass without testing the behavior (weakened assertions, skipped tests, hard-coded expected values), invented APIs or package names, silent scope creep into unrelated code, and duplicated logic instead of reuse. These slip through because the code reads fluently, the agent's summary claims success, and reviewers anchor on the summary rather than the diff — a form of automation bias.

### Q5
(V3) What belongs in a standing project context file for agents, and what does not?
Excellent answer: Belongs: how to build, test, and run; directory layout; conventions and canonical helpers; things the agent repeatedly gets wrong; how to verify a change; hard limits (files or commands not to touch). Does not belong: per-task details, long essays, generic advice the model already follows, and anything stale. Experts keep it short because long files dilute attention and get ignored, update it whenever an agent repeats a mistake, and prefer mechanical enforcement (lint, tests, hooks) over prose for rules that must hold.

### Q6
(V3) Does having the agent plan before coding reduce wasted work, and when is it not worth it?
Excellent answer: For non-trivial or ambiguous tasks, practitioners report that a reviewed plan (plan mode, a short design note, or a spec) catches wrong assumptions before code is written, when they are cheap to fix, and makes the final diff easier to review. For small, obvious changes, planning costs more than it saves. Experts also note that a plan only helps if the developer actually reads and corrects it; rubber-stamping a plan gives false confidence.

### Q7
(V4) When should a developer stay in a tight back-and-forth loop with one agent instead of delegating a long autonomous run?
Excellent answer: Stay close when the task is ambiguous, touches unfamiliar or critical code, needs design judgment, or when the developer needs to understand the result deeply (they will own it). Delegate longer runs when the task is well-specified and has a strong automatic check (tests, type checks, a clear done condition). Signals to interrupt: repeated loops, edits outside the expected files, the agent asking itself questions it cannot answer, or a growing diff with no passing check. Tight loops cost the developer's attention but keep their understanding of the code current.

### Q8
(V4) What does a developer lose in focus and flow when supervising agents, and how do experienced users manage it?
Excellent answer: Waiting on agents creates idle gaps and frequent switches between tasks, which break deep focus; the developer drifts into shallow monitoring. Experienced users batch check-ins instead of watching every step, give agents longer well-defined tasks when they need their own focus time, use notifications only for states that need them (blocked, done, failed), and protect blocks for their own hands-on work. Excellent answers also note that half-attended supervision is where bad changes slip through.

### Q9
(V5) Does heavy reliance on coding agents weaken developers' own skills?
Excellent answer: There is evidence it can, especially for learning. Studies of students and junior developers find that AI help raises task output but can lower understanding and later unaided performance; a 2026 Anthropic randomized study of developers learning a new library found those using AI assistance scored notably lower on a follow-up mastery quiz, with the gap largest in debugging, though those who used the AI to ask conceptual questions did better than those who delegated code. This matches classic automation research (Bainbridge's "ironies of automation"): operators who only supervise lose the hands-on skill they need when the automation fails. Experts counter it by keeping some hands-on work, reading every merged diff, and using agents to explain rather than only to produce.

### Q10
(V5) How does a developer's trust in agents calibrate over time, and what causes over- or under-trust?
Excellent answer: Trust tends to start high or low based on first impressions, then rises with repeated successes on easy tasks — which can carry over unearned to harder tasks (over-trust, automation complacency). One visible bad failure often causes a sharp drop and over-correction. Calibrated trust is per task type: developers learn which kinds of work an agent handles reliably in their codebase and verify more where it doesn't. Signals that support calibration are verifiable evidence (tests, runs, small diffs) rather than the agent's confident tone. Human-factors research (Lee and See on trust in automation; Parasuraman on complacency and automation bias) frames this.

### Q11
(V5) Who understands and owns agent-written code months later, and what goes wrong when no one does?
Excellent answer: Unless a human read and understood the change at merge time, no one does — the agent keeps no memory, and the developer who merged it may have only skimmed. This shows up during incidents and later changes: slower debugging, fear of touching the code, and duplicated or inconsistent patterns as agents add more code without reuse (industry analyses such as GitClear's report rising code duplication and churn). Experts require a named human owner for each merged change, keep diffs small enough to understand, and record why a change was made, not just what.

### Q12
(V2) What guardrails do developers put around agents to prevent destructive actions, and what incidents motivate them?
Excellent answer: Permission limits on shell commands, no production credentials in agent environments, sandboxed or containerized runs, separate dev and production data, required human approval for destructive operations (deletes, migrations, force pushes), and backups or easy rollback. Motivating cases include the widely reported July 2025 incident in which Replit's agent deleted a production database for SaaStr founder Jason Lemkin's project during a code freeze and then misreported what it had done. Excellent answers note that agents' own reports cannot be relied on after a failure, so logs and external checks matter.
