# How a team of agents could run a design phase

November 12, 2026  
Status: Thought piece from a job-search session; not reviewed, not adopted. The design task used as the example is Reasons (brief: `briefs/reasons.md`). Design phase only; building is out of scope.

Labels: *(Frank)* = Frank's words or decisions; *(record)* = from Frank's repos and Tavryn's docs; *(agent's read)* = interpretation, for Frank to accept or reject.

## 1 The idea behind it

- *(Frank)* A cross-functional team gets its value from each role's expertise. An agent team that simulates the roles by label (as early Paperclip iterations did) gets the average of each role. To avoid that, each role would need to be researched to find what sets one expert apart from another. Agents could then specialize by building up their own tacit knowledge on top of the foundation model, as Frank did with askboard's sme plugin. The aim is to set an agent's knowledge and experience level, from foundation to specialization.
- *(record)* sme (`~/Projects/Personal/askboard/sme-plugin/`) runs scope → web research → ingest materials → interview the user for tacit knowledge → validate → compress. Its "baseline probe" first asks a model with no tools the domain questions, so research targets only what the model gets wrong. Ten experts were built and are in use (`research/projects/askboard.md` in the job-search workspace).

*(agent's read)* Three layers sit above the foundation model, each from a different source:

| Layer | Source | What it adds |
|---|---|---|
| Discipline | Outside research on what top practitioners do differently | The expert version of the role, not the average |
| Project | The people on this team, written down | This company's tacit knowledge (Reasons) |
| Experience | The agent's own cases and their outcomes | Judgment from cases it worked through |

Research reaches the discipline layer only. Everything research can find has been written down publicly, so it is a more specific average. The experience layer needs cases, outcomes and someone who can judge them.

## 2 The steps

0. **Frank writes the brief.** The decision the design supports, what he already believes and why, and what would show the design is wrong. One page. This is the project layer. For Reasons: `briefs/reasons.md`.
1. **Baseline probe.** A plain model with no project context designs the feature. Keep its answer: it is the average design, written down so the team can see what it departs from and why.
2. **Build three or four specialists from research, not labels.** For Reasons:
   - Organizational learning and knowledge management: how teams record decisions and revisit them (ADRs, double-loop learning, design-rationale research).
   - Evaluation methods: what can be measured from real use, attribution, after-the-fact bias.
   - Context engineering for agents: delivery, timing, cost.
   - The daily user: a developer working alongside an agent team; what they would actually keep up.

   Each is built sme-style: research what experts in the field do differently, keep only what the baseline gets wrong, then add Tavryn's docs as project context.
3. **Work alone first.** Each specialist reviews the brief and the baseline in its own session and writes what the baseline gets wrong from its angle, its requirements, and where it expects to conflict with the others. Separate sessions keep them from converging.
4. **Map the tensions; don't average them.** One agent collects the disagreements into a list: what is in conflict, each side's strongest case, and what evidence would settle it. This list is the main output of the design phase, and each entry is a candidate Reason, so the design phase uses Reasons on itself.
5. **Frank decides the tensions.** Each decision is recorded with what would reopen it.
6. **Attack the chosen design.** An adversary agent runs a pre-mortem. Then the design is tested against real past cases: for Reasons, case 45's 18.5-hour drift and cases 44 and 46. For each, the design says what it would have recorded and when it would have raised the question.

**Outputs:** the design doc, the tension list with Frank's decisions, open questions, and the measures, each tied to a real case.

## 3 Solo or team

*(agent's read)* A single agent can do steps 1, 4 and 6. The team only matters at steps 2–3, where real disagreement comes from different knowledge. If the specialists don't disagree in step 3, they weren't specialized, and a solo agent would have done as well. That is a cheap test of whether the specialist layer works at all.

Real cross-functional teams are useful because the roles want different things (the job-search workspace's `narrative/core-ideas.md` 18, gap 3: decisions across roles with conflicting requirements). Role-play agents agree too easily because they share the same average. Specialists with their own knowledge can raise real tensions; Reasons records them; people decide.

## 4 Holes

- **Specialists share one literature, and none has experience.** Specialists built from public research draw on the same sources and stop at well-read. Frank's real cases (step 6) and his decisions (step 5) fill that gap. The design does not get around it.
- **Cost.** Building specialists for a single design phase is expensive. *(agent's read)* It pays only if the specialists are reused across designs, as sme's library is.
- **Telling a real difference from habit.** A specialist's "experts do it this way" can be the field's habit. The baseline probe and the tension list's "what evidence would settle it" are the checks.

## 5 Names elsewhere

From memory, unverified:

- **Dreyfus model of skill acquisition** (Stuart and Hubert Dreyfus, 1980): novice → advanced beginner → competent → proficient → expert. Close to "levels". Its warning: rules take you to competent; experts recognize situations from cases.
- **Recognition-primed decision making** (Gary Klein): experts match a situation to past cases rather than weighing options.
- **Case-based reasoning** (AI research, 1980s–90s): a system stores cases with outcomes and reasons from the most similar ones. The older version of the experience layer.
- **Deliberate practice** (Anders Ericsson): expertise comes from practice with feedback, not experience alone.
- On role prompting: studies are recalled as finding that "You are an expert…" prompts do little for accuracy. Not checked.

## 6 Open question for Frank

Which specialist would Frank trust least to be built from research, and want a real person for instead? That marks where the human team stays in this setup.
