# Extracts

Field: The daily user: a developer working alongside an agent team

The Experts lines express source-grounded distinctions useful to practitioners; these sources do not generally compare experts directly with novices. Evidence ratings apply to the stated finding within its setting, not to effectiveness across professional agent teams. Observational and practitioner cases support mechanisms and cautions, not causal prescriptions.

### F1
Experts: Calibrate perceived speed against measured completion time; feeling helped can coexist with slower delivery.
Cue: Developers report faster work without a comparable measured baseline.
Case: METR's February–June 2025 randomized study assigned 246 tasks among 16 experienced open-source developers. AI-allowed work took 19% longer, although participants afterward estimated a 20% speedup. They mainly used Cursor and Claude 3.5/3.7 Sonnet; this is not a current agent-team estimate.
Evidence: strong
Source: S1

### F2
Experts: Inspect who and what disappears from a productivity experiment before interpreting its treatment estimate.
Cue: Developers resist the no-AI condition or selectively submit tasks.
Case: METR's follow-up, begun August 2025 and reported February 24, 2026, covered 57 developers and 800+ tasks. Surveyed developers reported withholding tasks they did not want to do without AI; one participant completed none assigned without AI. Recruitment and lower pay also affected selection. METR judged its productivity estimate unreliable.
Evidence: moderate
Source: S2

### F3
Experts: Distinguish task elapsed time, human work, and delivered scope when interpreting agent productivity; overlapping work complicates task-time attribution.
Cue: A developer works on another task while an agent runs, or AI changes the amount of tests and documentation delivered.
Case: In METR's same follow-up, developers reported difficulty recording time because they worked on unrelated tasks while waiting for agents. Others reported different final quality and supporting artifacts across conditions. These reports identify measurement problems, not a validated replacement metric.
Evidence: moderate
Source: S2

### F4
Experts: Count prompting and checking as substantial work rather than treating agent execution as unattended throughput.
Cue: More sessions produce more outputs needing human interpretation.
Case: Chou and colleagues shadowed 11 professionals for about 15 hours. Prompt formulation averaged 11.3% and checking AI responses 22.1% of session time. These short observations describe attention allocation, not the causal overhead of adding an agent.
Evidence: moderate
Source: S3

### F5
Experts: Track attention fragmentation separately from the number of active tasks.
Cue: High concurrency appears manageable by task count but entails frequent revisits or fatigue.
Case: In Chou and colleagues' study, P6 switched 101.6 times/hour across five tasks; P8 switched 62.73 times/hour across 17. P8 reported fatigue managing concurrent tasks. Brief checks counted as switches, so these are not measurements of deep cognitive transitions.
Evidence: moderate
Source: S3

### F6
Experts: Externalize reminders and context when parallel work exceeds prospective memory.
Cue: Finished agent tasks are forgotten or returning to a session requires reconstruction.
Case: P6 used ten-minute watch reminders to revisit agent results; P9 maintained a personal notes repository for session context. These are reported workplace strategies, not evidence that a ten-minute schedule improves performance.
Evidence: moderate
Source: S3

### F7
Experts: Change validation with task familiarity: unfamiliar APIs require explicit comprehension and documentation checks rather than recognition alone.
Cue: A plausible suggestion uses arguments or behavior the developer cannot independently explain.
Case: In Barke, James, and Polikarpova's 20-programmer Copilot study, P11 checked suggested matplotlib histogram arguments in IDE documentation; P14 checked Python splitlines behavior against official documentation. Exploration favored examination and documentation, while acceleration favored execution. This describes single-assistant interaction, not agent-team verification efficacy.
Evidence: moderate
Source: S4

### F8
Experts: Create independently diagnosable failures before increasing parallelism.
Cue: Agents converge on the same blocking failure and overwrite fixes.
Case: Nicholas Carlini's February 2026 compiler report describes 16 agents duplicating Linux-build fixes. A harness substituted GCC for most files, isolating different failing subsets for parallel investigation. File pairs that failed only together still required delta debugging.
Evidence: moderate
Source: S5

### F9
Experts: Make regression detection constrain continued feature work.
Cue: New features repeatedly break previously working behavior.
Case: Late in Carlini's compiler experiment, frequent regressions prompted CI and stricter enforcement of testing before new commits. This is a vendor-affiliated prototype account, not a controlled estimate of the benefit.
Evidence: moderate
Source: S5

### F10
Experts: Preserve ownership and restart context explicitly across parallel sessions.
Cue: Workers can claim identical tasks or restart without prior reasoning.
Case: Carlini's harness used task-lock files synchronized through git. Fresh containers received README/progress instructions; agents recorded failed approaches. Locks addressed duplicate claims but did not eliminate merge conflicts.
Evidence: moderate
Source: S5

### F11
Experts: Choose parallel work with the human review bottleneck in mind.
Cue: Agent output arrives faster than significant changes can be reviewed and landed.
Case: On October 5, 2025, Simon Willison reported weeks of parallel-agent use while retaining capacity to review one significant change at a time. He described disposable proofs of concept, codebase research, and minor maintenance as useful concurrent work. This is firsthand experience with independent sessions, not a comparative team experiment.
Evidence: moderate
Source: S6

### F12
Experts: Specify goals and implementation approach before delegation when those decisions are already known, reducing the reviewer’s need to reconstruct intent.
Cue: Reviewing an unsolicited implementation first requires deciding why it exists and whether its approach fits future plans.
Case: In the same account, Willison contrasted that review burden with his experience reviewing work built from his own detailed specifications. The reduction in effort is his practitioner judgment, not a measured causal result.
Evidence: moderate
Source: S6

### F13
Experts: Evaluate code comprehension separately from initial task accuracy and later extension performance.
Cue: An agent produces a working artifact whose maintainer may not understand it.
Case: Balepur and colleagues studied 54 retained student participants on a website task. Agent users initially performed better but scored lower on comprehension than chatbot users. Overall extension accuracy was similar: better starting code and worse comprehension both mattered. Extension used a chatbot, not an unaided condition; this does not establish long-term professional maintenance costs.
Evidence: moderate
Source: S7

### F14
Experts: Treat associations between active review and comprehension as hypotheses for intervention, not proven learning remedies.
Cue: A workflow proposal assumes requiring more review or explanations will restore understanding.
Case: In the same study, per-file reviewers had higher comprehension than auto-accept users and tended to have stronger background skills. Review strategies were not independently randomized, and even per-file reviewers did not reach chatbot users' mean comprehension.
Evidence: moderate
Source: S7

### F15
Experts: Treat action approval and final-code review as distinct checks; care in one does not establish care in the other.
Cue: An agent requests commands, file access, or external interactions whose effects may not appear in a diff.
Case: Wu and colleagues' November 2026 exploratory survey of 203 developers found 64% often approved at least one action type without close review. Careful code reviewers were not significantly less likely to do so. These are self-reported habits; familiar low-risk approvals are not necessarily mistakes.
Evidence: moderate
Source: S8

### F16
Experts: Watch intent, approach, and scope during delegation, not just destructive operations.
Cue: The agent misreads the task, overcomplicates the approach, or expands the requested change.
Case: In the same survey, 65% reported intervention for misunderstood intent or wrong direction, 54% for a wrong or overcomplicated approach, and 51% for excess scope. These reports support concrete supervision concerns, but do not establish an optimal interruption policy or acknowledgement protocol.
Evidence: moderate
Source: S8
