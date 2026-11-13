# Baseline answers (from own knowledge, no lookup)

### K1

**What gets recorded.** Any choice that is costly to reverse, affects more than one team, or that newcomers will reasonably question: storage engines, service boundaries, build/CI tooling, language/framework adoption, cross-cutting conventions (auth, observability, API style). Rule of thumb: if reversing it would take more than roughly a sprint of work, or two teams would argue about it, write it down. Small, local, easily reversed choices are not recorded.

**Form.** A short architecture decision record (ADR), one page, one decision per record, numbered and dated:
- Title and status (proposed / accepted / superseded by #N / deprecated).
- Context: the forces at the time: constraints, scale, team skills, deadlines, what was known and not known.
- Options considered, including "do nothing," with the main reason each was rejected.
- Decision, stated plainly.
- Consequences: what gets easier, what gets harder, what risks are accepted.
- Assumptions and revisit triggers: the specific facts that, if they changed, would justify reopening (e.g. "if write volume exceeds X", "if we hire no Rust engineers within a year").
- People: who decided, who was consulted.

**Where it lives.** In version control next to the code it governs (e.g. `docs/decisions/` in the relevant repo, or one central "architecture" repo for cross-cutting choices), reviewed through pull requests like code. An index page links them all. Records are append-only: a changed decision gets a new record that supersedes the old one, and the old one is marked superseded with a link forward.

**Who writes it.** The person driving the decision (usually the tech lead or proposing engineer) drafts it; it is accepted through PR review by affected teams; an architecture group or staff engineer owns the index and nudges people when a big choice lacks a record.

**Backfill the existing decisions.** For the database, service split, and build system, run short sessions with the people who made them and write retroactive ADRs, clearly marked as reconstructed, focusing on context and assumptions. This is the direct fix for the "nobody can say why" problem.

**Make it used.** Link ADRs from onboarding docs and from READMEs; when a newcomer reopens a decision, the norm is "read the ADR, then argue against its stated assumptions." Reopening is allowed, but it means writing a new ADR, not re-litigating in chat. Keep the template short so writing one takes under an hour.

### K2

1. **Reframe the goal before starting.** Tell leadership the review will produce better decisions, not a culprit. Searching for "who got it wrong" makes people defend themselves and hide information, so the review learns less. Get an executive sponsor to say this publicly.
2. **Separate decision quality from outcome.** Revenue fell, but that alone does not prove the decision was bad (outcome bias). The questions are: given what was known and knowable then, was the reasoning sound? Was the process sound? What was unlucky versus foreseeable?
3. **Reconstruct the decision as it was made.** Gather the original docs, models, forecasts, experiment results, and who was consulted. Build a timeline. Write down what the team expected (revenue, churn, conversion) and the assumptions behind it, using contemporaneous material, not memory, because memory gets rewritten by hindsight.
4. **Establish what actually happened.** Separate the causes of the revenue drop: price effect, churn, conversion, mix shift, competitor moves, macro conditions, implementation issues (billing bugs, messaging). Some of the drop may not be caused by pricing at all.
5. **Compare expectation and reality, assumption by assumption.** Which assumptions failed? Could they have been tested more cheaply (staged rollout, A/B test, cohort holdout)? Were there warning signs that were ignored, and why?
6. **Look at the system, not individuals.** Ask what in the process allowed a weak assumption through: no experiment step, no kill criteria, pressure to hit a date, dissent not heard. Interview participants one-on-one with a facilitator who is not in their chain of command.
7. **Output.** A written review: timeline, expected vs. actual, root causes framed as process gaps, what to do now about the pricing (keep, roll back, adjust), and concrete process changes (e.g. future pricing changes require a staged rollout with predefined success and kill metrics, and a decision record with assumptions). Assign owners and dates to the changes, and follow up.
8. **Accountability without blame.** If someone acted recklessly or concealed information, that is handled separately through normal management, not in the learning review.

### K3

**Likely causes.**
- **Wrong time and place.** The database is a separate destination; people start projects in their own tools and do not think to go look. Knowledge that is not pulled into the workflow at the moment of need goes unused.
- **Poor entries.** Entries are written at project close, by tired people, as generic platitudes ("communicate early," "involve stakeholders"), stripped of context, so they are neither searchable nor actionable.
- **Hard to find.** Thousands of entries, weak tagging, no curation, many duplicates and outdated items. Searching costs more than it returns.
- **Lessons "identified" but not "learned."** Recording is treated as the end. Nothing changes in process, checklists, or standards, so the database is a graveyard.
- **Low trust and incentives.** Entries are sanitized to avoid blame; people prefer asking a colleague, which is faster and gives context. No one is rewarded for consulting it.
- **Not-invented-here and novelty.** Teams believe their project is different.

**Recommendations.**
1. Turn the top lessons into changes in the work itself: checklists, templates, standards, gates, tooling defaults. A lesson is "learned" only when something changed.
2. Bring lessons to the point of need: a project-kickoff step that pulls a small, curated set relevant to the project type, or a short pre-start review with someone who ran a similar project.
3. Curate hard: merge duplicates, retire stale entries, keep a short "top lessons per project type" set with owners.
4. Raise entry quality: require context, what happened, why, and a specific recommendation; capture during the project (after each phase), not only at the end.
5. Connect people, not just documents: tag entries with a contact person; support communities of practice and peer assists.
6. Measure use and impact (lessons applied, process changes made), not entries written.

### K4

1. **Record decisions with their premises.** Each significant decision is written down with the assumptions it rests on, the expected outcome, an owner, and explicit revisit triggers ("revisit if market share falls below X," "if cost of capital rises above Y," "if vendor Z is acquired").
2. **Keep a register.** A single list of standing decisions with owner, date, key assumptions, triggers, and next review date. Without a list, nothing can be revisited.
3. **Two revisit paths.**
   - Event-based: owners (or a light monitoring process) watch the trigger metrics; tripping one puts the decision on the leadership agenda automatically.
   - Time-based backstop: every decision gets an expiry or review date (e.g. 12 months, shorter for fast-changing domains). At expiry the owner must either reaffirm with a short note on whether premises still hold, revise, or retire. A "sunset" default (the decision lapses unless renewed) works for policies and rules.
4. **Make revisiting cheap and safe.** Reviewing is a check of premises, not a re-litigation. Changing a past decision is framed as responding to new facts, not admitting failure, so leaders are not defending sunk costs or their reputations. Leaders model this by retiring their own decisions.
5. **Assign a challenger.** Rotate someone (or a small group) whose job in the quarterly review is to name the decisions most likely to be zombies, using the register.
6. **Close the loop.** When a decision is revised, record the new decision and link the old one, so history stays intact.

### Q1

Chris Argyris and Donald Schön (Organizational Learning, 1978; Argyris earlier) distinguished:
- **Single-loop learning:** detecting and correcting errors in actions while leaving the underlying goals, values, norms, and assumptions ("governing variables") unchanged. Like a thermostat adjusting to a set temperature.
- **Double-loop learning:** questioning and changing the governing variables themselves: asking whether the goal or the assumptions behind the action are right. Like asking whether the thermostat should be set to that temperature at all.

They also tied this to the gap between espoused theory (what people say guides them) and theory-in-use (what actually guides behavior), and argued most organizations default to single-loop learning because of defensive routines (Model I behavior).

**Implication for decision records.** A record that only states what was decided supports at most single-loop correction (did we execute well?). To allow double-loop learning, it must make the governing variables visible: the goals the decision served, the assumptions and beliefs about cause and effect, the values and constraints that ruled options in or out, and the options rejected and why. Then later readers can ask not just "did it work?" but "were the premises and goals right, and are they still?" Including revisit triggers tied to those premises builds the second loop into the record.

### Q2

Argyris defined organizational defensive routines as actions or policies meant to prevent individuals or parts of the organization from experiencing embarrassment or threat, while also preventing them from identifying and reducing the causes of that embarrassment or threat. They are anti-learning and overprotective. A typical pattern: send a mixed message, act as if it is not mixed, make the mixedness undiscussable, and make the undiscussability itself undiscussable. Examples: easing in, face-saving, bypassing hard issues, cover-ups, polite agreement in meetings with criticism afterwards.

**How they block revisiting a decision.** Reopening a decision implies someone, often a senior person, was wrong, which is embarrassing and threatening. So people avoid raising it, frame evidence of failure as noise or execution problems, protect the original decision maker, and treat the topic as undiscussable. Escalation of commitment and sunk-cost reasoning reinforce this. The result is that the assumptions behind the decision are never tested (no double-loop learning), and the decision persists after its premises fail.

### Q3

An architecture decision record (ADR) is a short document capturing one significant architectural decision, its context, and its consequences. A project keeps a sequential, append-only log of them, usually as text/Markdown files in the code repository.

It was popularized by Michael Nygard in his 2011 blog post "Documenting Architecture Decisions." It spread further via ThoughtWorks Technology Radar (which recommended "lightweight architecture decision records"), and tools such as adr-tools (Nat Pryce), plus variants like MADR (Markdown Any Decision Records) and Y-statements (Olaf Zimmermann).

Nygard's standard sections:
- **Title** (short noun phrase, numbered)
- **Status** (proposed, accepted, deprecated, superseded by another ADR)
- **Context** (the forces at play: technical, political, social, project-specific; value-neutral)
- **Decision** (stated in active voice: "We will…")
- **Consequences** (resulting context after applying the decision, positive, negative, and neutral)

Variants such as MADR add sections like decision drivers, considered options, and pros and cons of each option.

### Q4

Generally no: the substance should not be edited. ADRs are treated as an immutable, append-only log. When a decision changes, you write a new ADR describing the new decision and its context, and change the old record's status to "Superseded by ADR-N" (with the new one saying "Supersedes ADR-M"). The only edits to the old record are the status change and link, plus perhaps fixing typos.

Why:
- The value of the log is history: it shows what was decided, given what was known at the time. Editing it rewrites history and destroys the "why it was like this" context that newcomers and auditors need.
- It avoids hindsight bias contaminating the record and lets people see how thinking evolved.
- It keeps references from code, commits, and other documents meaningful.
- It makes changes visible and reviewable as explicit new decisions.

Some teams allow editing while an ADR is still "proposed"; once accepted, it is frozen.

### Q5

Outcome bias is judging the quality of a decision by its outcome rather than by the quality of the reasoning and information available when it was made. A good decision with a bad outcome gets judged as bad, and vice versa. It is related to, but distinct from, hindsight bias (believing after the fact that the outcome was predictable).

Evidence:
- **Baron and Hershey (1988)** gave participants descriptions of decisions (e.g. a surgeon choosing to operate, gambles) that were identical except for the outcome. Participants rated the same decision as better, and the decision maker as more competent, when the outcome was good, even though they agreed outcomes should not matter.
- Later studies replicated this in medical judgment (e.g. Caplan, Posner and Cheney 1991, where anesthesiologists rated the same care as appropriate less often when the patient outcome was severe), legal/negligence judgments, and evaluations of managers and employees (e.g. Mazzocco, Alicke and Davis 2004; Gino, Shu and Bazerman 2010 on outcomes affecting judgments of ethicality).
- Related hindsight-bias research (Fischhoff 1975) shows people overestimate how predictable outcomes were once known.

Implication: evaluations should rely on contemporaneous records of what was known and expected, not on results alone.

### Q6

A decision journal is a personal (or team) log in which you record important decisions at the moment you make them, so you can later compare your reasoning with what happened. It is promoted by, among others, Shane Parrish (Farnam Street), Annie Duke, and associated with Daniel Kahneman's advice to counter hindsight bias.

Write before the outcome is known:
- Date, the decision, and the situation/context.
- The problem framing: what you are trying to achieve.
- Options considered, and why you chose this one.
- Key information and assumptions you relied on; what you did not know.
- What you expect to happen, with probabilities or ranges and a time frame.
- What would make you change your mind (and what signals to watch).
- Your mental and physical state (tired, rushed, emotional) and how confident you feel.
- Optionally, what you think could go wrong.

Then, later, review: compare expectations with the outcome, and separate luck from skill. The point of writing before is to fix your reasoning in place so hindsight cannot rewrite it.

### Q7

A pre-mortem is a technique proposed by Gary Klein (HBR, 2007, "Performing a Project Premortem"). Before committing to a plan, the team imagines that it is some time in the future and the project has failed badly. Each person independently writes down all the reasons it might have failed. Reasons are shared (often round-robin), and the plan is revised to address the most serious ones.

It works because "prospective hindsight" (imagining an event has already happened) makes it easier to generate explanations, and because it gives permission to voice doubts that groupthink and optimism would otherwise suppress.

Evidence:
- **Mitchell, Russo and Pennington (1989)**, "Back to the future: temporal perspective in the explanation of events," found that prospective hindsight increased the ability to correctly identify reasons for future outcomes by about 30%. Klein cites this as the main basis.
- Klein's own field experience and later studies (e.g. Veinott, Klein and Wiggins 2010) found pre-mortems reduced overconfidence in plans more than other critique methods.
- Kahneman endorses it in Thinking, Fast and Slow as a cheap debiasing method.

The evidence base is modest: mostly lab studies and practitioner reports, not large field trials on project outcomes.

### Q8

Common reasons, supported by knowledge management and project management research:
- **"Lessons identified, not learned."** Organizations capture lessons but lack mechanisms to turn them into changed practice (NASA's own audits, e.g. GAO and NASA OIG reports in the 2000s, found the Lessons Learned Information System was underused by project managers; similar findings for U.S. Army and other agencies).
- **Push vs. pull mismatch.** Databases rely on people going to look. Research on knowledge reuse (e.g. Markus 2001, "Toward a theory of knowledge reuse") shows reuse depends on context, and that people prefer asking colleagues because they get context and judgment.
- **Loss of context.** Codified lessons are stripped of the tacit knowledge and circumstances that make them meaningful (Nonaka; Polanyi on tacit knowledge; Hansen, Nohria and Tierney on codification limits). Lessons tend to be generic and hard to apply.
- **Poor quality and capture timing.** Captured at project end, by people leaving, as vague statements; sanitized for blame; not maintained (Williams 2008 on project lessons; Schindler and Eppler 2003, "Harvesting project knowledge," found process barriers, low motivation, and lack of time).
- **Incentives and culture.** Little reward for contributing or reading; fear of blame discourages honest entries; "our project is different."
- **Search costs.** Large, uncurated repositories with poor indexing.

Research suggests that lessons have impact when embedded into processes, standards, and training, delivered at the point of need, and supplemented with person-to-person methods (peer assists, communities of practice; e.g. BP's practices described by Collison and Parcell, Learning to Fly).

### Q9

From Hansen, Nohria and Tierney, "What's Your Strategy for Managing Knowledge?" (HBR, 1999):
- **Codification strategy:** knowledge is carefully extracted from people, written down, and stored in databases where anyone can reuse it. People-to-documents. Suits organizations doing repeated, similar work (they cited Andersen Consulting, Ernst & Young). Heavy IT investment; reuse economics.
- **Personalization strategy:** knowledge stays closely tied to the person who developed it and is shared mainly through direct person-to-person contact. IT helps people find and talk to each other. Suits unique, customized problems needing expert judgment (McKinsey, Bain). Investment in networks and people.

They argued firms should pick one as primary (roughly 80/20) rather than split evenly.

**Bearing on decision records.** A decision record is a codification tool: it captures the "why" so it survives turnover. But much of the reasoning behind big decisions is tacit and context-rich, which codification captures poorly. So records work best as a hybrid: keep them short and focused on context, assumptions, and rejected options (the parts most easily lost), and attach personalization pointers: who decided, who to ask. The record is also a conversation starter and a map to people, not a substitute for them. For an engineering group whose decisions are unique rather than repeated, personalization matters more, but codification is still needed because the people leave.

### Q10

The after-action review (AAR) is a structured, facilitated discussion the U.S. Army developed in the 1970s–80s (tied to training at the National Training Center) to learn from an event or exercise right after it happens. It is led by the unit itself (or a trainer), involves everyone who took part regardless of rank, focuses on what happened rather than who to blame, and is aimed at improving performance next time. It is described in Army doctrine such as TC 25-20, "A Leader's Guide to After-Action Reviews."

Core questions:
1. What was supposed to happen? (intent, plan)
2. What actually happened?
3. Why was there a difference?
4. What can we learn from this / what will we sustain and improve next time?

Key features: done soon after the event, candid, participants speak from their own observation, ground truth from data where available, and results feed directly into the next action. It is "not a critique": it is not a performance evaluation.

### Q11

A blameless postmortem is an incident or failure review conducted on the assumption that people acted reasonably given what they knew, their goals, and the pressures and tools they had at the time. Its aim is to understand how the system made the failure possible, not to punish individuals. Popularized in software operations by John Allspaw (Etsy, 2012, "Blameless PostMortems and a Just Culture"), and by Google's SRE book, drawing on safety science (Sidney Dekker's "new view" of human error, just culture).

How it changes what gets recorded about decisions:
- People can describe honestly what they knew, what they thought, and why they chose what they did, including mistakes, so the record holds the real reasoning instead of a sanitized story.
- The focus moves from "who made the wrong call" to the conditions that shaped the call: information available, signals missed, time pressure, unclear ownership, tool design, conflicting goals.
- The record captures the local rationality ("it made sense at the time because…") and the timeline of decisions, not just the outcome.
- Outputs are system changes (process, tooling, alerts, defaults), with owners, not disciplinary findings.
- Hindsight and outcome bias are explicitly guarded against: decisions are judged from the viewpoint at the time.

Blameless does not mean no accountability: accountability becomes people explaining their actions fully and helping fix the system.

### Q12

**Fixed schedule (time-based)**
- Pros: guarantees review even when nobody is watching, catches slow drift and unknown unknowns that no trigger anticipated, easy to administer, removes the stigma of reopening (it is routine, not an accusation).
- Cons: reviews can become rubber stamps or busywork; too frequent wastes time and creates churn and instability; too infrequent lets decisions run stale between reviews; timing does not match when facts actually change.

**Event-triggered**
- Pros: review happens when it matters; efficient; ties directly to the decision's premises (if the assumption breaks, revisit); prevents both churn and staleness when triggers are well chosen.
- Cons: requires naming triggers up front and monitoring them; misses changes nobody predicted; triggers can be ignored or rationalized away (defensive routines, sunk cost); thresholds can be gamed or poorly specified.

**Usual recommendation: both.** Record explicit triggers tied to the decision's key assumptions as the main mechanism, plus a time-based backstop (an expiry or review date, scaled to how fast the domain changes and how costly the decision is) to catch what triggers miss. Keep scheduled reviews light: a check of whether the premises still hold, not full re-litigation. Also allow an ad hoc path where anyone can request a review by showing that a premise has changed.
