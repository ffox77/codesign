# Baseline answers (from own knowledge, no lookup)

### K1

**Triage by how well each ticket can be checked and how much shared state it touches.**

- **Give to agents, in parallel, each in its own git worktree/branch:**
  - Bug fix 1 and bug fix 2: first have the agent write a failing test that reproduces the bug, then the fix. Small diffs, easy to review.
  - Docs refresh: low risk. Review for accuracy against the code, not just prose.
  - New API endpoint: give the agent a written spec (route, request/response shapes, auth, errors, an example of an existing endpoint to copy). Ask for tests.
  - Dependency upgrade: agent reads changelogs, bumps, fixes breakages, and lists behavior changes. Run the full test suite plus a smoke test.
- **Keep or pair closely (high blast radius or needs judgment):**
  - Shared auth module refactor: I own the design. An agent can do mechanical steps under tight supervision, in small commits, after characterization tests are in place. Do it after the endpoint and bug fixes merge, since they may touch auth.
  - Schema migration: I write or closely review it. Check it is backward compatible (expand, then contract), reversible, safe on production-size tables (locks, backfill time). Deploy separately from code that depends on it.
  - Flaky-test investigation: an agent can do the legwork (run the test in a loop, gather failure logs, look for order or timing dependence), but I judge the root cause. Don't accept "added a retry" or "raised the timeout" as a fix.
- **Isolation:** one worktree and branch per ticket; separate ports/test databases if tests touch shared resources; no agent gets production credentials; tell each agent which files are off-limits (e.g., the auth module) to avoid merge conflicts.
- **Order:**
  1. Morning: write specs, kick off the four agent tickets plus the flaky-test log gathering. Start migration design myself.
  2. Review and merge in order of smallest and most independent first: bug fixes, docs, then dependency upgrade (rebase others onto it if it changes the lockfile), then the endpoint.
  3. Merge the migration (expand step only) on its own.
  4. Start the auth refactor last on a fresh main, or push it to tomorrow if review capacity is used up. Review capacity, not agent count, sets how much of this lands today.

### K2

**Don't trust the "all tests pass" claim, and look hardest at the edited tests.**

1. Run the tests myself in CI or a clean checkout. Confirm the suite actually ran (count, no skips added).
2. Diff the test changes first. For each edited test, ask: was it changed because the spec changed, or to make it pass? Look for loosened assertions, deleted cases, added `skip`/`xfail`, broadened mocks, updated snapshots without reason, changed expected values to match new output.
3. Check scope: does the PR do only what was asked? A 600-line PR that mixes a feature and test edits should usually be split: test changes justified separately.
4. Review the feature code for the usual agent weak spots: error handling and edge cases, duplicated helpers that already exist, invented APIs or config, security (input validation, auth checks), performance (N+1 queries), dead code.
5. Check that new behavior has new tests that would fail without the change (revert the code, see tests fail).
6. Decision: merge only if test edits are each justified and the feature is covered. Otherwise request changes: split the PR, restore weakened tests, and add missing coverage. In practice the default for this shape is "not yet."

### K3

- Write a project context file (e.g., CLAUDE.md / AGENTS.md) at the repo root with: test framework and how to run tests, directory layout, where shared utilities live ("check `lib/utils` before writing a helper"), naming and style rules, commands to build/lint/test. Keep it short and specific; add nested files for subdirectories with their own rules.
- Make conventions machine-checked: linters, formatters, import rules, a lint rule banning the wrong test library, CI that fails on the wrong layout. Agents respond well to failing checks they can run.
- Add hooks or pre-commit checks the agent runs automatically.
- Provide good examples: point to a canonical module and test file to copy.
- Share team-level settings, slash commands or skills for common tasks (e.g., "add endpoint") so the teammate's sessions start with the same setup.
- Pair with the teammate once: watch how they prompt; teach them to reference existing code and ask for a plan first.
- When a mistake repeats, add a line to the context file. Review it periodically to prune stale rules.

### K4

**Stop it.** Editing the same file four times and reverting twice means it is looping; drifting into an unrelated module means it has lost the goal.

1. Interrupt the run. Don't let it keep going hoping it recovers.
2. Look at the current diff and the log to understand what it was trying and why it failed (often a failing test it can't satisfy, or a wrong assumption).
3. Revert the unrelated-module changes. Keep any good partial work in a commit or discard everything if unclear.
4. Restart with a narrower task: smaller step, clearer success criteria, the specific obstacle named, and an explicit "don't touch X." Or have it write a plan first and approve it.
5. If the refactor is hard to specify, take that part myself and give the agent only the mechanical parts.
6. Lesson: set checkpoints (commit after each step, time or turn limits) for long runs.

### K5

**Fix first, process second.**

- Incident: mitigate fast (roll back or feature-flag off the change if possible, rather than hand-patching under pressure). Confirm recovery with metrics. Then write a proper fix with a regression test, reviewed normally. An agent can help investigate, but a human drives the incident.
- Blameless postmortem: find why review missed it. Was the PR too big? Did tests cover the failing path? Did anyone understand the code? Was it a context the agent couldn't see (production data shape, config, load)?
- Team changes, matched to the cause:
  - Cap PR size; require the author (human) to be able to explain every change.
  - Require tests that fail before the change; extra scrutiny on edited tests.
  - Mark high-risk areas (auth, payments, migrations, concurrency) for mandatory senior review regardless of who wrote the code.
  - Staged rollouts, feature flags, better monitoring on new paths.
  - Add learned rules to the agent context file.
- Ownership stays with the human who merged; "the agent wrote it" isn't a cause.

### Q1

Common reports put it at roughly two to five at once for real work; more for small well-specified tasks (e.g., batch fixes), fewer for hard ones. Limits:
- **Review capacity**: each agent's output needs human checking; review time, not generation, caps throughput.
- **Context switching**: each agent needs specs, answers to questions, and course corrections; switching costs attention.
- **Task independence**: tasks touching the same code cause merge conflicts.
- **Task specifiability**: vague tasks need close supervision and don't parallelize.
- **Infrastructure**: worktrees, test environments, ports, CI capacity, cost/rate limits.

### Q2

To specifying work (deciding what to build, writing clear tasks), reviewing and verifying output, integration (merging, resolving conflicts), and testing/CI time. Also to understanding the system well enough to judge changes, and to coordination with other people. Code review is the most commonly named new bottleneck.

### Q3

Mixed. Vendor and early controlled studies (e.g., the GitHub Copilot task study) showed large speedups (~55%) on small, well-defined tasks. More careful field work is less rosy: the METR 2025 randomized trial with experienced open-source developers on their own large repos found they were about 19% slower with AI tools while believing they were faster. Field studies at companies show modest gains in output (PRs, commits) but often with questions about quality and rework. Takeaway: gains are real for some tasks and people, smaller and less certain for experts in familiar complex codebases, and self-reported speedups are unreliable.

### Q4

- Plausible-looking logic errors on edge cases (off-by-one, null/empty handling, time zones, concurrency).
- Tests weakened or written to match the implementation rather than the spec.
- Silent error swallowing or broad catch blocks; fallbacks that hide failures.
- Security issues: missing auth checks, injection, unsafe defaults, secrets in code.
- Invented or misused APIs/config that happen to compile, or wrong library versions.
- Duplicated logic instead of reusing existing utilities, creating drift.
- Subtle changes outside the asked scope buried in a large diff.
- Performance problems (N+1 queries, unbounded loops) that tests don't catch.
They slip past because the code reads fluently and reviewers skim large diffs.

### Q5

**Belongs:** build/test/lint commands; project layout; conventions the agent can't infer (test framework, error-handling patterns, naming); where key utilities live; things never to do (e.g., don't edit generated files, don't run migrations); pointers to deeper docs; recurring mistakes to avoid.
**Does not belong:** long general docs or tutorials; things the linter already enforces; info obvious from the code; secrets; stale or aspirational rules; one-off task instructions; very long text that crowds context and dilutes the important rules. Keep it short, specific, and maintained.

### Q6

Generally yes for multi-file or ambiguous tasks: a plan exposes misunderstandings before code is written, is cheap to correct, and gives a checklist for review. Not worth it for small, clear changes (typo, one-line fix, well-specified bug with a failing test), for exploratory spikes where you learn by trying, or when the plan would just be restated code. Plans also aren't guarantees; agents can drift from them, so check against the plan.

### Q7

Stay in a tight loop when: requirements are unclear or evolving; the work touches risky or core code; you need to learn the code yourself; the task needs frequent judgment calls; early attempts failed; or the feedback cycle is fast (UI tweaks, debugging). Delegate a long run when: the task is well specified with an automated way to check success (tests, type checks), low risk, mostly mechanical (migrations across many files, upgrades), and isolated in a branch/sandbox.

### Q8

Losses: frequent interruptions from agents finishing or asking questions; shallow attention across several threads; less deep understanding of the code; waiting time that's too short to do real work; fatigue from constant review. Coping strategies: batch check-ins instead of reacting to every notification; limit parallel agents; give agents longer, well-specified tasks so they need less input; use a time-blocked rhythm (deep work block, then a review block); keep one "main" task you do yourself; use notifications sparingly; write tasks down so context lives outside your head.

### Q9

There's early evidence and widespread concern that it can. Studies on AI assistance (including some on learners and on cognitive offloading) show reduced retention and weaker independent problem solving when people accept output without engaging. Effects depend on use: skills you stop practicing (writing code from scratch, debugging, reading docs) fade; skills like reviewing, specifying, and system design may grow. Juniors are most at risk because they may never build the base. Mitigations: do some work unaided, require understanding before merging, use agents to explain rather than just produce.

### Q10

Trust typically starts either too high (impressed by early wins) or too low (burned by an early failure), then adjusts with experience to be task-specific: high for boilerplate and tests, low for complex logic or unfamiliar areas. Over-trust comes from fluent, confident output, passing tests that are weak, time pressure, automation bias, and long streaks of success. Under-trust comes from memorable failures, unclear explanations, and not knowing which tasks suit the agent. Good calibration comes from verifying output, tracking where agents fail, and keeping checks (tests, review) independent of the agent.

### Q11

Formally, whoever merged it, and the team that owns the code. In practice, often no one deeply understands it, because the author didn't write it line by line and reviewers skimmed. Problems: slow debugging during incidents; fear of changing it; duplicated or inconsistent patterns; growing "code nobody knows" debt; wrong fixes because intent isn't recorded. Mitigations: require authors to understand and explain changes; good PR descriptions and design notes recording intent; tests that document behavior; keep agent changes small; assign code owners.

### Q12

Guardrails: sandboxes/containers and git worktrees; permission prompts or allowlists for shell commands; denying commands like `rm -rf`, `git push --force`, `git reset --hard`, database drops; no production credentials in the agent environment; read-only database access; hooks that block edits to certain paths; branch protection and required reviews; backups and the ability to roll back; network restrictions; spending/rate limits. Motivating incidents: publicized cases of agents deleting production databases (e.g., the 2025 Replit agent incident that wiped a company's database during a code freeze), agents running `rm -rf` on home or project directories, force-pushing over history, deleting files they thought were unused, committing secrets, and runaway cloud resource or API costs.
