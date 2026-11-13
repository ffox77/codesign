# Check answers: codesign-smoke-a

Field: Organizational learning: how teams record decisions and revisit them

### K1
Use short decision records (ADRs) kept as Markdown files in the repository next to the code, one decision per record: title, status (proposed, accepted, superseded), context, options considered and rejected, decision, the assumptions it rests on, and expected consequences. Accepted records are not edited; a change is a new record that supersedes the old one, with links both ways.

What earns a record: scale the record to how hard the choice is to reverse. One-way-door choices like the database, the service split and the build system get a full record and review. Reversible choices get a line or nothing. Do not push every small choice through the same write-up, or the practice slows the group down and gets dropped (F12).

Where records live: decide this at the start, because where records are stored strongly shapes whether people find them useful. Keep decisions local to one service in that service's repo. Keep decisions that span several teams' shared parts in one central decision repo with an index. Expect the cross-team decisions to be the hardest to keep current (F11).

Who writes it and when: the person proposing the change writes the record as part of design review or the pull request, so it is part of the work and not a task left for later. Budget the time. Count record-writing and reuse in performance reviews and recognize records that others cite. Do not rely on a mandate alone (F5, F8). Give one team a local owner of the practice; units with their own owned process contribute far more than those relying on a central system (F7).

Past choices: back-fill records for the three or four choices newcomers keep reopening, marked "reconstructed", with the original deciders interviewed. Each record names a contact person, because records do not carry all the tacit reasoning.

Keep checking: a mandate decays. Every 6 to 12 months, check whether records are being written, whether people know where they are, and whether a newcomer found the answer to "why" in them (F6). Measure by whether records are read and cited, not by how many exist (F2).

Findings used: F2, F5, F6, F7, F8, F11, F12

### K2
Reframe the goal first: the review is about how the decision was made and what the team can change, not who to blame. If people expect blame they will hold back what they knew and what went wrong, and the record you get will be false (F4).

Run it as a facilitated after-action review with an impartial facilitator from outside the team: what was planned and expected, what happened, why the difference, what to keep and what to change. Short, structured debriefs reliably improve later performance, and facilitated ones do much better than unfacilitated ones (F9, F10). Since the result in question is a team result, run a team-focused debrief (F10).

Separate decision quality from outcome. Reconstruct what was known on the decision date, from documents written then (pricing analysis, emails, meeting notes), not from memory. Ask: what options were weighed, what assumptions about customer response were made, what range of outcomes was predicted, and did the actual result fall outside it? Separate what was knowable but missed from what was unknowable or caused by outside change. Judging the decision by its outcome alone (outcome bias) and believing afterward it was obvious (hindsight bias) are the main traps.

Look for the assumptions behind the decision process, not only the fix to this price: for example, was there no pre-launch test, no stated stop condition, no review date?

End with specific changes to how pricing decisions are made and recorded (for example, a written decision record with predictions and reopen conditions), each with an owner and a date to check it took hold. Check the earlier record too: if a past review already named this cause, the failure is in applying lessons, and that is the bigger finding (F3).

Findings used: F3, F4, F9, F10

### K3
Diagnosis. This is the normal pattern, documented closely at NASA. GAO (2002) found that managers were required to consult the lessons system but actually learned from reviews, briefings and talking with colleagues; 27% had never heard of the system (F1). The store held 900+ lessons never pruned; 58% said they could not get the right lesson at the right time, and one official said reviewing it took about two weeks (F2). People withheld negative lessons because admitting mistakes felt risky, and saw writing lessons as unpaid extra work (F4, F8). Lessons were left to project close, when the team was being broken up (F8). Ten years later, a NASA OIG audit found the same low use, a policy that had been weakened, and almost no one who knew the requirement (F6). The cost of this is real: Mars Polar Lander repeated a telemetry lesson already learned from Mars Observer (F3). Project-based organizations learn poorly between projects because teams are temporary (F13).

Recommendations:
1. Move from storing to retrieving. Add a lookup step to project start and design review, with someone who prepares the relevant lessons for that project. Measure success by lessons reused and practice changed, not entry count (F2, F3).
2. Prune and merge. Review entries for currency; retire stale ones; merge duplicates (F2).
3. Turn key lessons into changed rules, checklists, or design standards, so they act without anyone having to search (F3).
4. Support the routes people already use: short debriefs after milestones, talks, the next project in a series, and links to the people who wrote each lesson (F1, F8, F9).
5. Fund capture as project work before the team disbands, and reward contributions that others adopt (F5, F8).
6. Back local, owned lessons processes in units, as at JPL, rather than relying on central funding (F7).
7. Make it safe to report failures, and ask for successes too (F4).
8. Re-audit periodically; mandates decay (F6).

Findings used: F1, F2, F3, F4, F5, F6, F7, F8, F9, F13

### K4
At decision time, write down the key assumptions, a prediction with a confidence level, and explicit reopen conditions: the facts that, if they changed, would justify a revisit (for example, "revisit if monthly volume exceeds X" or "if vendor Y ends support"). Name an owner who watches those conditions.

Scale effort to reversibility. Hard-to-reverse decisions get recorded reopen conditions, a named owner and a review date. Reversible decisions are left to the team and revised freely; putting everything through the same heavy process slows the organization down (F12).

Use several triggers: a review date for big or uncertain decisions; a reopen condition firing; an incident; a material change in facts. Make each revisit end in a recorded result: reaffirm, amend, or supersede. Keep the old record and link it to the new one rather than overwriting it.

Keep revisits blameless, so reopening a decision is routine and not an accusation against whoever made it (F4). Judge the original by what was known then, not by how it turned out.

Watch for decay: scheduled reviews turn into rubber stamps, and mandated processes get quietly dropped over the years. Audit periodically whether revisits are happening (F6). A short, facilitated debrief format works well for the revisit itself (F9, F10).

Findings used: F4, F6, F9, F10, F12

### Q1
Argyris and Schön distinguished single-loop learning, which corrects actions while keeping the same goals, assumptions and norms, from double-loop learning, which questions and changes those governing assumptions. For a decision record this means stating the assumptions and constraints the decision rested on, explicitly, so that a later review can test them and change the decision's basis, not just tweak the next action. Teams tend to stay single-loop because examining assumptions threatens people's standing. NASA's experience shows the cost: a lesson recorded after Mars Observer did not change the design of Mars Polar Lander, so the underlying practice never changed (F3).

Findings used: F3

### Q2
Argyris's term for policies and actions that protect people from embarrassment or threat but also stop the organization from finding and fixing the real causes of problems. They make some topics undiscussable, and make that undiscussability itself undiscussable. They block revisits because reopening a decision implies someone, often a senior person, was wrong, so people avoid, bypass or cover up the problem. NASA managers described this directly: lessons were seen as admissions of failure and people needed to talk about mistakes "without feeling that they are risking their careers" (F4). Countermeasures: leaders openly inviting challenge, blameless and facilitated review formats (F10), asking for positive lessons too (F4), and reopen conditions agreed in advance so a revisit is routine rather than an accusation.

Findings used: F4, F10

### Q3
An architecture decision record is a short text document capturing one significant architectural decision. Michael Nygard popularized it in his 2011 post "Documenting Architecture Decisions." Standard sections: Title, Status (proposed, accepted, deprecated, superseded), Context (the forces at play), Decision, Consequences (good and bad). Records are numbered, kept in the source repository, written in plain sentences, one decision per record. Later templates such as MADR add the options considered with pros and cons. A field study (Ahmeti et al., 2024) found that introducing Markdown ADRs helped a microservice team decide what to document and pass knowledge on, but that where records are stored strongly affects their usefulness, and decisions spanning several teams' shared parts were not handled well (F11).

Findings used: F11

### Q4
No. Accepted ADRs are treated as immutable. When the decision changes, write a new record that supersedes the old one, set the old one's status to "superseded by ADR-N", and link the new one back. This keeps the history of reasoning: readers can see what was believed then and why it changed, which is what a later review needs to judge the decision fairly. Small fixes (typos, broken links) can be edited. The trade-off is that readers need a quick way to find the current decision, such as an index or a status filter; an unpruned pile of records becomes hard to search (F2).

Findings used: F2

### Q5
Outcome bias is judging a decision's quality by how it turned out rather than by the information and process at the time. Baron and Hershey (1988) showed people rated the same decision as better when it had a good outcome. It differs from hindsight bias (Fischhoff, 1975), the belief after the fact that the outcome was predictable. Implication for reviews: reconstruct what was known at the time, ideally from records written then, and judge the process separately from the result.

Findings used: none

### Q6
A decision journal is a record written when the decision is made, before the outcome is known. It contains: the situation and context, options considered, what you expect to happen and why, probability or confidence estimates, the key assumptions, and sometimes your state of mind. Associated with Annie Duke and Shane Parrish (Farnam Street), drawing on Kahneman. Its purpose is to make a record that hindsight cannot rewrite, so later you can tell bad luck from bad judgment and check calibration. Predictions must be specific enough to be checked later.

Findings used: none

### Q7
Gary Klein's technique (Harvard Business Review, 2007): before committing, the team imagines the project has already failed, and each person writes down why. It rests on "prospective hindsight" research (Mitchell, Russo and Pennington, 1989), which found that imagining an event has already happened increased the ability to name reasons for it by about 30%. It gives people permission to raise concerns they would otherwise keep back, which matters because people withhold bad news when it seems risky to their standing (F4). The risks it surfaces should be written into the decision record as reopen conditions for later revisits.

Findings used: F4

### Q8
Main causes, from NASA's well-documented case:
- People get lessons from reviews, briefings and colleagues, not from the official store; GAO (GAO-02-195, 2002) found 27% of NASA managers had not heard of the system (F1).
- Stores are unpruned and hard to search: 900+ lessons never reviewed, 58% could not get the right lesson at the right time (F2).
- People withhold negative lessons and see recording as unpaid extra work; lack of time, trust and tolerance for mistakes were named barriers (F4, F8).
- Capture is left to project close, when teams are disbanding (F8).
- Mandates decay: NASA's OIG (IG-12-012, 2012) found the same low use ten years on, a weakened policy, and few managers aware of the rule (F6).
- Project-based organizations learn poorly between projects because teams are temporary (F13). Knowledge is also often tacit and "sticky" (Szulanski) and travels through people.

Storing a lesson is not learning it: Mars Polar Lander repeated a lesson already recorded after Mars Observer (F3). What works: retrieval built into project start and reviews, short regular debriefs (F9), local owned processes like JPL's (F7), funding and rewarding reuse (F5), and turning lessons into changed procedures.

Findings used: F1, F2, F3, F4, F5, F6, F7, F8, F9, F13

### Q9
Hansen, Nohria and Tierney (HBR, 1999) described two strategies. Codification stores knowledge in documents and databases for reuse. Personalization connects people so knowledge passes through conversation. Successful firms lean heavily on one, about 80/20. For decision records: a record can carry what was decided and the stated reasons, but the tacit judgment travels through people. NASA managers relied mainly on colleagues and reviews rather than the database (F1), and the World Bank backed its knowledge work with about 120 communities of practice (F5). So pair each record with a named owner or contact, and do not expect documents alone to pass on understanding, especially once the authors leave.

Findings used: F1, F5

### Q10
A short, structured review held soon after an event, developed by the U.S. Army in the 1970s around the National Training Center. Core questions: What was supposed to happen? What actually happened? Why was there a difference? What will we sustain or improve? A facilitator runs it, participants of every rank speak, and the focus is learning, not blame. A meta-analysis of debriefs (Tannenbaum and Cerasoli, 2013: 46 samples) found they improve performance about 25% over controls, for teams and individuals, with sessions averaging about 18 minutes (F9). Facilitated debriefs did much better than unfacilitated ones, and debriefs work best when matched to the result being measured; video and other media added little (F10). AARs work because they are routine and immediate; business copies often fail when they become blame sessions or are skipped (F4).

Findings used: F4, F9, F10

### Q11
A blameless postmortem reviews an incident on the assumption that people acted reasonably given what they knew at the time, and looks at the system and conditions rather than individual fault. Associated with John Allspaw (Etsy, 2012) and the Google SRE book, drawing on Sidney Dekker's "new view" of human error and local rationality. Because people are not punished for reporting, they disclose their actual reasoning and the information they had, so the record of the decision is truer. Without that safety, people hold back negative lessons, as NASA managers reported (F4). Blameless does not mean free of accountability: people still own the follow-up actions.

Findings used: F4

### Q12
Both have a role. Fixed schedules make sure revisits happen and catch slow drift, but can become rubber stamps and waste time on stable decisions; scheduled requirements also tend to decay unless someone checks them (F6). Event triggers (stated reopen conditions, incidents, changed facts) focus effort where it matters, but fail silently if no named owner is watching for them. Good practice: at decision time record reopen conditions and an owner; add a review date for high-stakes or uncertain decisions; and scale the effort to how reversible the decision is, using Bezos's one-way versus two-way door distinction, so reversible decisions are not loaded with heavy review (F12).

Findings used: F6, F12
