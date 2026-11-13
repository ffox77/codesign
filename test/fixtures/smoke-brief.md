# Brief: a one-page decision log for a two-person team

Status: smoke-test fixture for the codesign trial. Small on purpose.

## 1 The decision this design supports

Two people build a small product together, with an agent team doing much of the coding. Decisions get made in chat, in commits and in passing, and a month later neither person can say why a choice was made or whether it still holds. The design question: what one-page convention for recording decisions would they actually keep up, and would it help the next decision?

## 2 Who uses it

- Two developers, each working alongside agents most days.
- The agents read the log at the start of a session and may propose entries.
- No manager, no review board; nobody's job is to maintain the log.

## 3 What is already decided

- It lives in the repo as one Markdown file.
- An entry is short: a few lines, not a document.
- Either person can add or change an entry without asking the other first.

## 4 What is open

- What an entry must contain, and what it should leave out.
- When an entry gets written: at the moment of deciding, at commit time, or in a weekly pass.
- How an entry is marked as stale, reversed or replaced, and who notices.
- How the agents use it without filling it with noise.

## 5 What a good answer looks like

A one-page convention (the format, plus a handful of rules) that two busy people would still follow after three months, and that lets either of them, or an agent, find the reason behind a past choice in under a minute.
