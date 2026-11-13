# Research plan

Field: The daily user: a developer working alongside an agent team

## Research questions

1. How does a developer decide which daily tasks to delegate to agents, retain personally, or divide between people and agents?
2. How does a developer communicate goals, constraints, relevant context, and acceptance criteria so several agents can work effectively?
3. How does a developer track agent progress, dependencies, ownership, and handoffs without excessive monitoring or interruption?
4. How does a developer review and verify agent contributions, detect errors, and decide when intervention or rework is necessary?
5. How does a developer coordinate concurrent agent work on shared code, resolve conflicting changes, and integrate results?
6. How do agent teams affect a developer's attention, cognitive load, trust, learning, and sense of control over a working day?
7. Which practices help developers recover from agent failures, context loss, stalled work, or misunderstood instructions, and what tradeoffs do they introduce?
8. What evidence distinguishes sustainable daily use from short demonstrations, including effects on quality, elapsed time, review effort, and cost?

## Sources that count

- Empirical papers and research reports studying developers using coding agents or coordinating multiple agents, with methods and results available.
- Books or book chapters grounded in observed developer workflows, human–automation interaction, or team coordination, where the relevance to developer–agent work is explicit.
- Named practitioners' posts, talks, workflow diaries, and postmortems describing actual developer use of agent teams, including concrete tasks, decisions, outcomes, or failures.
- Primary artifacts such as study datasets, workflow logs, issue histories, and documented experiments that make the developer's actions and agent behavior inspectable.
- Studies of single-agent developer work or adjacent human–automation settings may count as supporting evidence when they directly address a research question; their limits for agent teams must be stated.

Marketing copy, generic productivity claims, anonymous anecdotes without inspectable evidence, fictional scenarios, and tool feature lists without observed use do not count as evidence. Search snippets and summaries are discovery aids, not sources.

## Inclusion rules

- A logged source must identify its author or accountable organization, provide an accessible original source, and directly inform at least one research question.
- Empirical sources must state their method, task or setting, and observations or outcomes sufficiently to assess their claims. Record sample and setting limitations when extracting findings.
- Practitioner sources must describe a real workflow, case, or incident and give enough context to distinguish what the developer did, what agents did, and what happened. Favor sustained use and concrete failures or tradeoffs over isolated demonstrations.
- Distinguish a team of coordinated agents from one agent and distinguish agents acting concurrently from repeated independent runs. Do not generalize evidence across these settings without naming the limitation.
- Favor original studies, firsthand accounts, and independently inspectable artifacts. Treat several reports of the same case as one underlying evidence base.
- Exclude unsupported causal or productivity claims, benchmark-only reports with no connection to developer work, purely autonomous system architecture without developer interaction, and sources concerned only with hypothetical capabilities.
- Prefer peer-reviewed research or primary data (grade A), then named practitioners with a track record and real cases (grade B). Log opinion or unsourced material (grade C) only when no stronger source covers a question, explicitly stating that gap.

## Stop rule

Use at most 5 searches in the search step. Run searches in rounds of 5, recording each search against that budget. Stop when the budget is exhausted; do not start a round that would exceed it. Stop early if two consecutive rounds of 5 searches add no new finding. With this five-search budget, only one round is possible, so the budget limit takes precedence over the two-round saturation rule. Source reading does not authorize additional search queries.

This planning step performs no searches. Search and source logging belong to Step 5.

## Changes

Changes (date, what, why)

## Viewpoints

These are perspectives to investigate, not established findings or mutually exclusive schools; the questions test where research accounts and daily practice agree or diverge.

### 1. The hands-on developer: agency and understanding

Position: Delegation should preserve the developer's ability to understand the code, make decisions, and take over when necessary.

- Which tasks can I delegate while retaining enough understanding to maintain and debug the result?
- When does supervising several agents demand more attention than doing the work myself?
- How does sustained agent use change my learning, confidence, and ability to recover without agent help?

### 2. The workflow orchestrator: throughput through parallel work

Position: Agent teams are useful when task decomposition, ownership, and integration make concurrent work worth its coordination cost.

- What makes a task sufficiently independent to assign to another agent, and what requires sequential work?
- How should I specify context, interfaces, dependencies, and completion criteria for each assignment?
- When do additional agents improve elapsed time, and when do duplicated work, conflicts, or integration effort erase the gain?

### 3. The reliability practitioner: evidence before acceptance

Position: The developer remains accountable for contributions and needs verification matched to the consequences of failure.

- What evidence lets me accept a contribution when I cannot inspect every action an agent took?
- How can review detect shared wrong assumptions across agents, including when one agent checks another's work?
- Which failures call for a correction, a fresh assignment, a rollback, or direct human intervention?

### 4. The human–automation researcher: calibrated trust and attention

Position: Effective collaboration depends on whether developers can judge agent capability, maintain awareness, and intervene at the right time.

- Which cues help developers distinguish meaningful progress from confident but incorrect or stalled activity?
- How do interruption timing, progress summaries, and uncertainty signals affect monitoring effort and intervention decisions?
- Does increasing autonomy help daily work, or does it make loss of awareness and recovery more costly under some conditions?

### 5. The collaboration researcher: shared context and coordination

Position: Developer–agent teams should be examined as coordination systems in which shared understanding, handoffs, and decision authority require maintenance.

- How do the developer and agents establish and update a shared understanding when requirements change?
- What makes ownership and handoffs clear enough to prevent duplicated work, abandoned dependencies, and conflicting edits?
- Which lessons from human teams transfer to agent teams, and where do limited context, unreliable reports, or absent accountability break that analogy?

### 6. The empirical evaluator: sustainable value in everyday work

Position: Claims about agent teams should rest on observed daily outcomes, including quality, human effort, and cost, rather than demonstration speed alone.

- How should an evaluation count planning, monitoring, review, rework, integration, and delayed defects alongside execution time?
- What comparisons distinguish the effect of an agent team from a single agent, developer expertise, task selection, or increased compute spending?
- What evidence over repeated working days would show that a workflow remains useful as novelty fades and maintenance obligations accumulate?
