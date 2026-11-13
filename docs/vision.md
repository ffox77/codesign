# Vision

## What codesign is for

Codesign is a design phase run by a team of agents. Before anything is built, agents in different roles critique a first design, and their conflicts are boiled down to a short list of tensions a person has to decide. This repo is the rig that tests whether that phase is worth running, and what makes it work.

The question behind it: when code is cheap to generate, which decisions are still expensive? Mostly the ones that are hard to undo once built and in use: the data model, contracts other people depend on, boundaries between parts and teams, the consistency and security models, platform commitments. AI makes rewriting code cheap. It does not make migrating written data, changing a contract consumers rely on, or coordinating other teams cheap. A reversal that can't be finished in one move leaves layers of old and new side by side. A design phase that finds the conflicts behind those decisions early is where the savings are.

## What the rig compares

Each comparison holds everything constant except one thing.

| Comparison | Held constant | Varies |
|---|---|---|
| The trial | provider, prompts, brief | specialists built from research vs. roles named only |
| Provider swap (`makers`) | prompts, method | the provider and model that do the making |
| Outside tools (later) | brief, shared discipline | the tool: Devin, Factory AI, spec-driven tools |

## Principle: shared discipline is not a difference

A discipline anyone can adopt is infrastructure. It goes in the prompts every contestant receives, and the rubric never scores it. If adopting the same discipline gives similar results, it doesn't tell two approaches apart, so it was never an advantage.

The first shared discipline is reversibility (`method/discipline.md`): sort decisions by how hard they are to undo, decide the hard ones deliberately, and make them cheaper to undo where possible. The baseline step reads it, whichever provider or tool writes the baseline, and the mappers rank conflicts by the same measure.

The same principle tests outside tools. Give our maker the discipline a tool provides, run both on the same brief, and look at what gap remains. That gap is the tool's value beyond discipline: its run environment, integrations, memory of a codebase, evaluation data, workflow, trust. A tool whose only addition is discipline is expected to converge to the model's defaults.

## What a run produces

- **Two blind tension lists** and a key. A person scores them with `rubric.md` before opening the key.
- **Two judges** (the referee provider), one per list order, as a second scorer beside the person. Their agreement tells how far to trust them.
- **A final design** (`final.md`): the baseline revised so it takes a position on every tension, settled, left open with its test, or rejected.
- **A comparison** (`compare.md`) of the final design against the baseline, including the conflicts the brief should have named, ranked. These feed better briefs, so the next design starts from the conflicts that matter.

## Where it goes next

1. **The real run** on the Reasons brief, at full size, after the mini runs confirm the pipeline with the shared discipline in place.
2. **Provider comparison**: the same brief with Claude making and with Codex making.
3. **Outside tools**, in one of three places:
   - as the maker of the baseline;
   - as a third team, adding a third blind list;
   - as the builder: build from `baseline.md` and from `final.md`, and measure the rework and reversals each causes. This is the most direct test of whether a design phase saves the costly reversals it is meant to.

## Open questions

- Small lists don't give scores room to separate. The mini runs produced 2 to 5 tensions per list, and on 2 to 3 entries the judges' preference followed list order.
- A baseline that already handles its hard-to-undo decisions may leave fewer conflicts to find. The next mini run should check whether the shared discipline shrinks the lists.
- When Codex makes, its file reads happen inside `codex exec`, outside the transcripts, and `.claude/settings.local.json` does not limit it.
