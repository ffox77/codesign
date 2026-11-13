# Critique — codesign-smoke-b (the daily user: a developer working alongside an agent team)

## What the baseline gets wrong

1. **The "same commit" rule assumes a human makes the commit (§3, §4).** In this team agents make most commits. So the entry in the acting commit will almost always be an agent draft with `status: proposed`, and a human must accept it in some later commit. The one habit the design rests on ("the decision goes in the commit that acts on it") then splits into two acts, and the second act is the optional weekly skim (§3) that the baseline itself says gets skipped first.
2. **Accepting drafts is treated as cheap and optional (§3, §8).** "At most two minutes a week. Optional." If the human does not do it, drafts older than a week are "deleted", which means the log of record loses exactly the decisions agents made, which are most of them. Nothing says who deletes, or what happens when a week passes and nobody looked. Either drafts pile up (noise the agents read every session) or they vanish (silent loss).
3. **Agent limits are prompt text only (§5, §7).** "May set `stale?`. Nothing else", "never rewrite `why`", "never set active" live in the file header. An agent with write access to the repo can do all of these, and an instruction in text does not stop it (knowledge F4). The baseline also rejects all tooling (§9), so there is no check outside the agent at all.
4. **The agent is the only witness for the facts it records (§5).** An agent drafts the `why`, `rejected` and `revisit if` lines about "a choice the agent actually made", and later judges whether `revisit if` "looks true". Both are the agent's own account. The design has no step where a human checks the `why` against the diff, tests or chat before accepting (F5). A wrong `why` accepted in a two-minute skim becomes history that agents then treat as a constraint.
5. **Agents treat `rejected` as hard constraints (§5).** A plausible but wrong draft line, once accepted, stops agents proposing the better option. That can turn one bad draft into a lasting blind spot, and the developer will not see it happen because the agent just does not suggest the option.
6. **A contradicting agent change has no path (§4).** If an agent's task contradicts an active entry, the commit "is not finished until the status is updated", but agents may not set `replaced` or `reversed`. The baseline does not say whether the agent stops, asks, or commits anyway. In practice it will commit and say nothing, or stop work mid-task.
7. **The cost and speed claims are guesses (§6, §8, §10).** "About two minutes per decision", "under two minutes a week" and "under a minute to find" are forecasts, not measurements. Developers' sense of how fast agent-assisted work goes is unreliable (F1). The design names no way to check them after three months.
8. **Entries are tied to commit size (§3).** Agent changes tend to be large. One commit can carry several decisions or bury one in a big diff. Small changes are what keep delivery stable (F6); the design does not ask for it, and `git log --grep D-014` pointing into a 2,000-line agent commit does not explain much.
9. **`by: ana (+agent)` hides who knows the reason (§1).** If the agent drafted the `why` and Ana skimmed it, "ask Ana" (the stated reason for the line) may lead to someone who does not know.

## My requirements

R1. A human accepts or rejects every agent draft before the agent's session ends or in the developer's next commit, not in a separate weekly pass. Test: after 4 weeks, no `proposed` entry is older than 3 days.
R2. Agent limits on the log (no `active`, no rewriting `why`/`rejected`, no deleting) are enforced outside the agent: a pre-commit hook or CI check that rejects a diff where an agent-authored commit changes those fields. Test: an agent told to set `active` produces a commit that the check blocks.
R3. Each agent draft cites its evidence (PR, test name, chat link, or diff path) in the `why` line, so the human can check it in under a minute instead of taking the agent's word. Test: 100% of accepted agent drafts have a checkable link.
R4. When an agent's change contradicts an active entry, it stops before committing and asks the human, stating the entry ID and the `revisit if` condition. Test: seed a task that contradicts a known entry; the agent asks rather than commits.
R5. The `by:` line names who actually wrote the `why` and who accepted it (e.g. `drafted: agent · accepted: ana`).
R6. One decision per commit where a decision is logged; an agent commit that carries a decision stays reviewable (e.g. under ~300 changed lines, or split). Test: sample logged commits; median size is reviewable.
R7. The "under a minute to find" and "two minutes per decision" claims are timed, not assumed: at week 4 and week 12, each person times five lookups of real past decisions. Pass if at least 4 of 5 are under a minute for each.
R8. The daily cost to me stays at one action per decision: accept, edit, or reject a draft. No extra ritual beyond that.

## Expected conflicts with other roles

C1. **Organizational learning — who writes the reason.** I want agents to draft entries (with evidence) and the human only to accept, because that keeps my cost near zero. They will likely want humans to write the `why` themselves, because writing the reason is where the reflection and memory happen, and an accepted agent draft is a record nobody actually learned from. Both cannot hold: if humans write every `why`, cost per decision rises and entries get skipped; if agents write it, the record may be right but nobody remembers it.

C2. **Organizational learning — scheduled review.** I want no separate review session; everything rides on commits and the end of agent sessions. They will likely want a periodic revisit (monthly or at milestones) to look at `revisit if` conditions and stale entries, because decisions that are never revisited on purpose rot. A two-person team will not keep both a commit-time habit and a calendar ritual.

C3. **Organizational learning — entry richness.** I want the shortest entry that lets an agent avoid re-proposing a rejected option and lets me check the claim. They will likely want context, consequences and the assumptions behind the choice (ADR-style), because those make the entry useful for re-examining the decision later. More fields means more agent context per session and more for a human to verify before accepting.

C4. **Organizational learning — enforcement tooling.** I want a hook/CI check to hold agent limits (R2). They may side with the baseline's "prove the convention without tooling first", seeing a check as process weight before the habit exists. A check blocks a few legitimate edits; no check relies on agent prompt text.

## Evidence that would settle it

C1. Run 4–6 weeks with agent-drafted, human-accepted entries. Then, without looking, ask each person to state the reason for 10 random accepted decisions: 5 they wrote, 5 an agent drafted. If recall of agent-drafted reasons is much worse and the log does not make up for it (lookups still fail), organizational learning is right. If lookups succeed in under a minute either way, recall does not matter and agent drafting wins. Also count decisions made vs entries written in each mode, to see which mode gets skipped.

C2. Over 12 weeks, count entries whose `revisit if` condition became true, and how many were caught by commit-time and agent flags versus how many only a scheduled review found. If a review finds a material number the flags missed, it earns its place; if it finds almost none, or the review stops happening by week 6, it does not.

C3. Measure time to accept a draft and the rate of later-found errors in accepted entries, for short (5-line) versus rich entries. Also measure how often an agent re-proposes a rejected option with each format. Richer wins only if it cuts errors or re-proposals more than it raises acceptance time and skipped entries.

C4. Count, over the trial, how often an agent changed a field it was told not to (diff the log by commit author). Any non-zero count with no check in place settles it for the check; zero across a busy month weakens the case.
