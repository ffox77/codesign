# Plan: codesign-smoke-a

Field: Organizational learning: how teams record decisions and revisit them

## Research questions

1. What should a decision record contain (context, options considered, rationale, expected outcome, owner) so that a later reader can judge the decision, not just learn what was chosen?
2. When should a decision be written down, and what decides whether it gets a record at all (reversibility, cost, number of people affected)?
3. What triggers a revisit of a past decision: a set date, a stated reopen condition, an incident, or a change in the facts it rested on?
4. How do teams avoid hindsight bias and outcome bias when reviewing a decision, judging the process separately from how it turned out?
5. Why do decision logs and lessons-learned databases tend to go unread, and what makes some of them actually used later?
6. How should a superseded decision be handled: edited in place, marked as replaced, or kept alongside the new one?
7. Who owns a decision record over time when the original authors leave, and how is that knowledge kept from being lost?
8. What evidence links decision recording and revisiting practices to better team outcomes?

## Sources that count

Count:
- Peer-reviewed papers in organizational learning, management science, software engineering (architecture decision records), and decision science.
- Books by researchers or practitioners with a stated basis (studies, cases).
- Practitioner posts and talks by named authors describing real use in named or clearly described organizations.
- Postmortems, after-action reviews, and incident reports that show a decision being recorded or revisited.

Do not count:
- Vendor marketing for decision-log or wiki tools.
- Anonymous listicles, SEO content, and unsourced templates with no account of use.
- AI-generated summaries or aggregator pages that do not cite primary sources.

## Inclusion rules

A source is logged only if it has all of:
- A named author or named organization.
- Either a stated method (study design, data, review protocol) or real cases (specific teams, decisions, or incidents).
- Direct bearing on at least one research question above.

Excluded:
- Sources that only restate a template with no evidence it was used or what happened.
- Sources about individual decision-making with no team or organizational setting, unless they cover a review method (for example, outcome bias) that teams apply.
- Duplicates of a source already logged; keep the primary one.

## Stop rule

At most 5 searches (the search budget). Searches run in rounds of 5. Stop early if two consecutive rounds of 5 searches add no new finding.

## Changes

Changes (date, what, why)

## Viewpoints

### V1: Organizational learning theory (academic)
Position: learning happens when teams question the assumptions behind a decision (double-loop learning, Argyris and Schön), not just when they fix the action; records matter only if they expose those assumptions.
- Which assumptions did the decision rest on, and are they written down where a later reader can test them?
- When a decision goes wrong, does the review change the governing assumptions or only the next action?
- What defensive routines stop a team from reopening a decision its leaders made?

### V2: Lightweight decision records (software practitioners)
Position: short, versioned records kept next to the work (architecture decision records, Nygard style) beat heavy documents, and a decision is superseded by a new record rather than edited.
- What is the smallest record that still lets a newcomer understand why a choice was made?
- Should a superseded record be edited, marked replaced, or left as is with a link forward?
- How do records stay close enough to the work that people find them when they need them?
- Which decisions are worth a record at all?

### V3: Decision quality and debiasing (decision science)
Position: judge a decision by the process and information at the time, not by its outcome; record predictions and confidence up front so a later review can separate bad luck from bad judgment (outcome bias, hindsight bias, decision journals).
- What must be recorded before the outcome is known so a review is not distorted by hindsight?
- How do you tell a good decision with a bad outcome from a bad decision?
- Do pre-mortems and stated confidence levels make later reviews more accurate?

### V4: Knowledge management skeptics (lessons-learned critique)
Position: lessons-learned databases and decision logs are mostly written and not read; knowledge moves through people, conversation and routines, so capture alone does not produce learning.
- What evidence shows anyone reads the records later, and in what situations?
- When authors leave, does the record keep the knowledge, or does the tacit part leave with them?
- What makes retrieval happen: a forcing step in a workflow, a named owner, or a review ritual?

### V5: Reviews and revisits as practice (after-action and governance)
Position: revisiting is the part that produces learning, so it needs set triggers (dates, reopen conditions, incidents, changed facts) and a blameless, regular review format such as the U.S. Army after-action review or blameless postmortems.
- What triggers a revisit, and who is responsible for noticing it fired?
- How often should decisions be reviewed, and does a fixed schedule beat event-driven review?
- How does a blameless format change what people are willing to record?
