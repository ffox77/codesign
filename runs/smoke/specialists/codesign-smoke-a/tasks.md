# Tasks: codesign-smoke-a

Field: Organizational learning: how teams record decisions and revisit them

## Tasks

### K1
A 40-person engineering group has made a string of big technical choices over two years (database, service split, build system), and newcomers keep reopening them because nobody can say why they were made. Design a decision-recording practice for this group: what gets recorded, in what form, where it lives, and who writes it.
Excellent answer: Proposes short, versioned records kept next to the work (for example, Nygard-style architecture decision records in the repo: title, status, context, decision, consequences), not a separate wiki. Sets a threshold for what earns a record (hard to reverse, costly, crosses teams, or likely to be questioned) so the log does not fill with trivia. Requires the record to state the options considered and rejected, the assumptions and constraints the choice rested on, and the expected consequences, so a later reader can judge the decision, not just learn the result. Makes records immutable once accepted: a change is a new record that supersedes the old one, with links both ways. Builds writing into an existing step (design review or pull request) rather than relying on goodwill. Back-fills records for the past choices that keep being reopened, marking them as reconstructed. Admits that records do not carry all the tacit knowledge, and pairs them with a named owner or a contact.

### K2
A product team launched a pricing change six months ago; revenue fell and leadership wants a review to find out "who got it wrong." Run the review so that the team learns from it.
Excellent answer: Separates the quality of the decision from the quality of the outcome (outcome bias): asks what was known, what was assumed, and what options were weighed at the time, using records made then rather than memory. Guards against hindsight bias by reconstructing the information available at the decision date and noting what was knowable but missed versus what was unknowable. Uses a blameless format (for example, an after-action review: what was planned, what happened, why the difference, what to keep or change) so people report facts openly. Checks whether the result falls inside the range the team predicted, and whether luck or external change explains it. Looks for faulty governing assumptions (double-loop), not only a fix to the next action. Ends with concrete changes to how such decisions are made and recorded, with owners, and a date to check those changes took hold.

### K3
A company has a lessons-learned database with thousands of entries from past projects. An audit finds almost nobody reads it before starting new work. Diagnose why and recommend what to do.
Excellent answer: Names the known causes: entries are written at project close for compliance, are generic or decontextualized, are hard to search, and arrive when no one needs them; much useful knowledge is tacit and moves through people rather than documents. Cites evidence that lessons-learned systems are widely under-used (for example, studies of project-based organizations and NASA/US Army lessons-learned practice). Recommends moving from capture to retrieval: put a lookup step into project start or design review, push relevant lessons to people at the moment of need, and connect readers to the people who wrote them. Suggests pruning and merging entries, tying lessons to a changed rule, checklist, or standard so the lesson is acted on, not just stored. Measures success by reuse and changed practice, not entry count.

### K4
A leadership team wants to stop "zombie decisions" (choices that stay in force long after the facts behind them changed). Design how decisions get revisited.
Excellent answer: At decision time, records the key assumptions and explicit reopen conditions (the facts that, if they changed, would justify revisiting), plus a review date for big or uncertain decisions. Uses several triggers: a set date, a stated condition firing, an incident, or a material change in facts; assigns a named owner responsible for noticing each trigger. Distinguishes reversible from hard-to-reverse decisions and spends review effort on the latter. Records predictions and confidence so the revisit can compare expected with actual. Makes the revisit outcome explicit (reaffirm, amend, supersede) and recorded, with the old decision kept and linked, not overwritten. Keeps the review blameless and separates process quality from outcome. Warns that fixed-schedule reviews can become empty rituals and that event triggers need someone watching for them.

## Probe questions

### Q1
What did Argyris and Schön mean by double-loop learning, and what does it imply for what a decision record should contain?
Excellent answer: Single-loop learning corrects actions within the same goals and assumptions; double-loop learning questions and changes the governing variables (the assumptions, values, and norms) behind the action. For decision records, this means writing down the assumptions and constraints a decision rested on, explicitly, so a later review can test and change them rather than only adjusting the next action. Mentions that teams often stay in single-loop learning because examining assumptions is threatening.

### Q2
What are "defensive routines" in organizations, and how do they block revisiting a decision?
Excellent answer: Argyris's term for policies or actions that protect people from embarrassment or threat but also stop them from finding and fixing the causes of the problem; they include making some topics undiscussable and making that undiscussability itself undiscussable. They block revisits because reopening a leader's decision implies error, so teams avoid it, bypass it, or cover it up. Countermeasures include leaders openly inviting challenge, blameless review formats, and pre-agreed reopen conditions that make revisiting routine rather than an accusation.

### Q3
What is an architecture decision record, who popularized it, and what are its standard sections?
Excellent answer: A short text document capturing one significant architectural decision, popularized by Michael Nygard's 2011 post "Documenting Architecture Decisions." Standard sections: Title, Status (proposed, accepted, deprecated, superseded), Context (forces at play), Decision, Consequences (good and bad). Kept in the source repository, numbered sequentially, written in plain sentences, and one decision per record. Later variants (for example, MADR) add options considered and pros and cons.

### Q4
When a decision recorded in an architecture decision record is changed, should the record be edited? Why or why not?
Excellent answer: No: accepted records are treated as immutable; a new record is written that supersedes the old one, the old record's status is changed to "superseded by ADR-N," and the new one links back. This keeps the history of reasoning so readers can see what was believed at the time and why it changed. Minor corrections (typos, links) may be edited. Notes the trade-off: readers need a way to find the current decision quickly, such as an index or status filter.

### Q5
What is outcome bias, and what evidence shows it affects how decisions are judged?
Excellent answer: The tendency to judge a decision's quality by its outcome rather than by the information and process at the time. Cites Baron and Hershey (1988), who showed people rated identical decisions as better when they turned out well. Distinguishes it from hindsight bias (believing after the fact that the outcome was predictable, Fischhoff 1975). Implication: a review must reconstruct what was known at the time, ideally from records written then, and judge the process separately from the result.

### Q6
What is a decision journal, and what should be written in it before the outcome is known?
Excellent answer: A record written at decision time capturing: the situation and context, the options considered, what you expect to happen and why, your confidence or probability estimates, the key assumptions, and sometimes how you feel. Associated with practitioners such as Annie Duke and Shane Parrish (Farnam Street), drawing on Kahneman's advice. The point is to create a record immune to hindsight so later reviews can tell bad luck from bad judgment and check calibration. Excellent answers note that predictions must be specific enough to be checked.

### Q7
What is a pre-mortem, and what evidence supports it?
Excellent answer: Gary Klein's technique (Harvard Business Review, 2007): before committing, the team imagines the project has failed and each person writes reasons why. Based on research on "prospective hindsight" (Mitchell, Russo and Pennington, 1989) showing that imagining an event has already happened increased the ability to identify reasons for outcomes by about 30%. Helps surface concerns people would otherwise withhold. Records from a pre-mortem feed later revisits as stated risks and reopen conditions.

### Q8
Why do lessons-learned databases tend to go unused? What does the research say?
Excellent answer: Research on project-based organizations and knowledge management finds lessons are captured at project end, written generically, stripped of context, and stored in systems people do not search; knowledge is often tacit and sticky (Szulanski) and moves through social networks and people more than documents. Cites studies or audits such as reports on NASA's lessons-learned system finding project managers rarely consulted it (GAO 2002 is a known example). Notes the "capture fallacy": storing a lesson is not learning it. What works: retrieval built into workflows, people-to-people links, and lessons turned into changed procedures.

### Q9
What is the difference between codification and personalization strategies in knowledge management, and how does it bear on decision records?
Excellent answer: Hansen, Nohria and Tierney (HBR, 1999): codification stores knowledge in documents and databases for reuse; personalization connects people so knowledge passes through conversation. Firms tend to lean heavily on one (about 80/20). For decision records: a record can carry the what and the stated why, but tacit reasons and judgment travel through people, so a good practice pairs records with named owners or contacts and does not expect documents alone to transfer understanding, especially when authors leave.

### Q10
What is a U.S. Army after-action review, and what are its core questions?
Excellent answer: A structured, short review held soon after an event, developed by the U.S. Army in the 1970s (National Training Center). Core questions: What was supposed to happen? What actually happened? Why was there a difference? What will we sustain or improve? Led by a facilitator, participants of all ranks speak, focused on learning not blame, results are acted on. Notes that AARs work because they are routine and immediate, and that copies in business often fail when they turn into blame sessions or are skipped.

### Q11
What does "blameless postmortem" mean, and how does it change what gets recorded about decisions?
Excellent answer: A review of an incident that assumes people acted reasonably given what they knew at the time and focuses on the system and conditions, not on individuals; associated with John Allspaw (Etsy, 2012) and the Google SRE book. Draws on safety science (Sidney Dekker's "new view" of human error, local rationality). Because people are not punished for reporting, they disclose the actual reasoning and information they had, which gives a truer record of the decision. Blameless is not the same as accountability-free: people still own follow-up actions.

### Q12
Should decisions be revisited on a fixed schedule or when specific events happen? What are the trade-offs?
Excellent answer: Both have roles. Fixed schedules ensure revisits happen and catch slow drift, but can become rubber-stamp rituals and waste time on stable decisions. Event triggers (stated reopen conditions, incidents, changed facts) focus effort where it matters, but depend on someone noticing the trigger fired; without a named owner they silently fail. Good practice: record reopen conditions and an owner at decision time, add a review date for high-stakes or uncertain decisions, and scale review effort to reversibility (for example, Bezos's one-way versus two-way door distinction).
