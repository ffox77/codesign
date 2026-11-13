# Sources

Field: The daily user: a developer working alongside an agent team

## Search targeting

Compared `baseline-answers.md` with every excellent-answer criterion in `tasks.md`. The baseline already covers bounded delegation, ownership, artifact-based verification, escalation, and most evaluation confounds. Its main omissions are empirical calibration and concrete mechanisms: observed attention costs; a demonstrated way to create independently testable parallel work; measurement failures when task time overlaps; and evidence separating initial task success from retained understanding. These searches target those gaps rather than treating sensible baseline advice as established evidence.

## Search log

One round of five queries, conducted 2026-11-13:

1. `METR early 2025 AI experienced open source developer productivity randomized controlled trial 19 percent slower`
2. `developers multi agent coding monitoring coordination study interviews agent teams developer 2026`
3. `Barke Grounded Copilot programmers interact code generating models acceleration exploration study`
4. `site.anthropic.com engineering building C compiler parallel Claudes Nicholas Carlini agent teams`
5. `site.simonwillison.net coding agents parallel review code understanding agent 2025 2026`

Budget used: 5/5 searches. Original-source opens were used to check methods, results, and scope; search snippets were not treated as evidence. The round added eligible sources; stopped at the budget limit. No plan changes.

## Source register

### S1: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity
URL: https://arxiv.org/html/2507.09089v2
Type: paper
Grade: A
Adds: Supplies a randomized counterexample to perceived speed gains: 16 developers completing 246 familiar-repository tasks took 19% longer with AI while estimating a 20% speedup afterward (K4, Q11–Q12); Joel Becker, Nate Rush, Beth Barnes, and David Rein's primary study concerns early-2025 tools, not coordinated agent teams or current-tool performance.

### S2: We are Changing our Developer Productivity Experiment Design
URL: https://metr.org/blog/2026-02-24-uplift-update/
Type: other
Grade: A
Adds: METR's named investigators report primary follow-up data and design failures across 57 developers and 800+ tasks: refusal to work without AI, selective task submission, differing output scope, and overlapping agent work undermine simple task-time comparisons (K4, Q11–Q12); the authors explicitly call the productivity estimate unreliable, so this updates S1's limitations rather than establishing a new speedup or an independent replication.

### S3: Developers as Managers of AI Agents: A Workplace Shadowing Study
URL: https://arxiv.org/html/2610.33588
Type: paper
Grade: A
Adds: Yi-Hung Chou and colleagues observed 11 professionals for approximately 15 hours, analyzed 255 prompts, and interviewed them: prompting/checking averaged 33.4% of observed time, with concrete cases of timers, personal context notes, and parallel-task fatigue (K1, K4, Q2, Q7–Q10); primary observational preprint, short sessions rather than longitudinal causal evidence, and parallel sessions must not be assumed to be coordinated agent teams.

### S4: Grounded Copilot: How Programmers Interact with Code-Generating Models
URL: https://arxiv.org/html/2206.15000
Type: paper
Grade: A
Adds: Shraddha Barke, Michael B. James, and Nadia Polikarpova's grounded-theory observation of 20 programmers distinguishes acceleration from exploration and documents checking unfamiliar APIs against documentation (Q1, Q5, Q7); observed validation differs with knowledge and task mode, but this is single-assistant Copilot evidence, not an agent-team study or a causal test of verification practices.

### S5: Building a C compiler with a team of parallel Claudes
URL: https://www.anthropic.com/research/building-c-compiler
Type: practitioner-post
Grade: B
Adds: Nicholas Carlini's firsthand 16-agent compiler experiment shows task locks, fresh-session progress records, regression enforcement, and a GCC oracle that split a shared Linux-build bottleneck into parallel bug investigations after agents duplicated fixes (K1–K3, Q3–Q7, Q9–Q10); a vendor-affiliated prototype with public repository history, not evidence of comparative daily productivity, and interacting file failures still required delta debugging.

### S6: Embracing the parallel coding agent lifestyle
URL: https://simonwillison.net/2025/Oct/5/parallel-coding-agents/
Type: practitioner-post
Grade: B
Adds: Simon Willison describes weeks of actual use while retaining capacity to review and land only one significant change at a time: disposable proofs of concept, codebase research, small maintenance, and work specified by the reviewer provide concrete delegation choices (K1, Q2–Q4); independent parallel sessions and multiple tools are not evidence of a coordinated team's causal advantage, and the review-effort claim is firsthand experience rather than a controlled comparison.

### S7: (Im)Paired Programming: Coding Agents Improve Productivity but Harm Understanding
URL: https://arxiv.org/html/2607.26375
Type: paper
Grade: A
Adds: Nishant Balepur and colleagues compare 54 students using a code-editing agent or a chatbot on a website task, then test comprehension and unaided extension: better initial accuracy can coexist with worse comprehension, and extension comparisons depend on initial accuracy (K4, Q1, Q12); primary preprint, student/single-agent setting, with low-effort interaction associations that do not establish causal remedies or professional-team effects.

### S8: From Delegation to Action Approval: An Exploratory Study of Developers' Practices in Collaborating with AI Coding Agents
URL: https://arxiv.org/html/2611.10058
Type: paper
Grade: A
Adds: Yinan Wu and colleagues' 203-person survey distinguishes final-code review from approval of agent actions, reports intervention over misunderstood intent and excess scope, and finds autonomy varies more across developers than activity types (K3, Q2, Q5, Q8); primary exploratory preprint with self-reported, selected respondents rather than observed approval behavior, causal evidence, or a team-only sample.

## Coverage and remaining limits

The register mixes original academic studies with named practitioners' actual workflows. Grade A includes primary data even where peer review is unconfirmed; it does not imply that observational, survey, and randomized evidence have equal causal strength. No grade C sources were needed.

K2 and Q6 receive only partial support: S5 supplies real coordination, regression, and external-oracle failures, but does not directly test acknowledgement protocols after requirement changes or correlated errors between an implementing agent and its reviewer. No source here establishes that a particular interruption policy, handoff template, concurrency limit, or reviewer configuration improves outcomes. Sustained professional team use, delayed maintenance costs, and equal-compute comparisons remain gaps after the five-search budget; single-agent and independent-session results must retain their stated limits in subsequent extraction.
