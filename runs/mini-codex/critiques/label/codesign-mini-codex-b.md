## What the baseline gets wrong

- **Session-start reading has no growth limit.** The introduction and rule 5 require every agent to read a file that retains all history. With several agents per developer, the “brief session-start read” becomes repeated context and attention cost; the one-minute lookup test does not measure that cost.
- **Staleness checks can block ordinary work.** Rule 4 makes the developer resolve a suspected stale decision before relying on it, but gives agents no rule for distinguishing a material failed assumption from a speculative concern. Several agents can repeatedly interrupt the same developer about the same entry.
- **The weekly scan assumes a shared session exists.** Rule 4 names no fallback when the two developers work asynchronously. An owner label alone does not make unresolved stale entries visible during actual work.
- **Capture has too many manual handoffs.** Rules 2 and 5 require the developer to remember an in-passing choice, recover its rationale, review an agent draft and commit it. The two-minute budget excludes that recovery and review effort, so the convention can look cheap while entries silently go missing.

## My requirements

- After three months of representative decisions, a fresh agent must identify the relevant current choice and reason within one minute; record session-start reading time and context size separately from lookup time.
- A suspected stale entry must produce one actionable notice identifying its ID, the failed trigger or assumption, and the work affected. Parallel agents must not require separate human answers to the same unresolved concern.
- The convention must specify how work proceeds while a staleness question awaits a human, including when affected work pauses and when independent work continues.
- Stale follow-up must work through repo activity without requiring a shared session. In a two-week asynchronous trial, every stale entry touched by new work must receive a visible disposition or remain visibly unresolved.
- Measure capture effort from noticing the decision through committing the entry, including agent review. In a trial containing chat, coding and in-passing choices, both developers must sustain the convention within its stated time budget and explain any qualifying choices omitted.

## Expected conflicts with other roles

- **Organizational learning: how teams record decisions and revisit them — reading scope.** I want agents to load the current decisions relevant to their work with bounded startup cost. That role will likely want historical reasons routinely available so agents recognize recurring mistakes. Requiring every agent to read all retained history cannot also keep startup effort bounded as the file grows.
- **Organizational learning: how teams record decisions and revisit them — interruption threshold.** I want concrete evidence of an affected decision before the developer must intervene. That role will likely prefer early, sensitive flags and prompt reassessment to avoid reinforcing obsolete assumptions. Weak signals cannot simultaneously trigger immediate human review and impose no interruption cost.

## Evidence that would settle it

- **Reading scope:** Replay representative tasks against a three-month log using full-file reading and topic-directed reading. Measure startup time, context consumed, one-minute reason retrieval, and implementations that repeat a documented mistake. Full reading earns its cost only if its additional context prevents consequential misses.
- **Interruption threshold:** Run concurrent agents on tasks containing both deliberately failed revisit triggers and harmless apparent contradictions. Count distinct human interruptions, duplicate notices, time waiting, and incorrect reliance on stale choices. Use the observed tradeoff between missed failures and review burden to choose the threshold.
