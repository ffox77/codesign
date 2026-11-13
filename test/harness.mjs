// Runs a Workflow script under Node with stub globals, for tests.
// Usage: const run = await runWorkflow(path, {args, agentStub});
//   agentStub(prompt, opts) returns the fake result (sync or async).
// Returns {meta, result, calls: [{prompt, opts}], phases: [title], logs: [msg]}.
import fs from 'node:fs';

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

// Finds the object literal after `export const meta =` by brace matching.
function extractMeta(src) {
  const head = src.match(/^export const meta\s*=\s*/m);
  if (!head) throw new Error('script must begin with `export const meta = {...}`');
  const start = head.index + head[0].length;
  if (src[start] !== '{') throw new Error('meta must be an object literal');
  let depth = 0;
  let quote = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) {
      return new Function(`return (${src.slice(start, i + 1)});`)();
    }
  }
  throw new Error('unterminated meta literal');
}

export async function runWorkflow(scriptPath, { args, agentStub, budget } = {}) {
  const src = fs.readFileSync(scriptPath, 'utf8');
  const meta = extractMeta(src);
  const body = src.replace(/^export const meta/m, 'const meta');

  const calls = [];
  const phases = [];
  const logs = [];

  const agent = async (prompt, opts = {}) => {
    calls.push({ prompt, opts });
    await Promise.resolve(); // let other branches interleave, as the real runtime does
    return agentStub(prompt, opts);
  };
  const parallel = (thunks) =>
    Promise.all(thunks.map((t) => Promise.resolve().then(t).catch(() => null)));
  const pipeline = (items, ...stages) =>
    Promise.all(
      items.map(async (item, index) => {
        let prev = item;
        try {
          for (const stage of stages) prev = await stage(prev, item, index);
          return prev;
        } catch {
          return null;
        }
      })
    );
  const phase = (title) => phases.push(title);
  const log = (msg) => logs.push(msg);
  const budgetObj = budget || { total: null, spent: () => 0, remaining: () => Infinity };

  const fn = new AsyncFunction('agent', 'parallel', 'pipeline', 'phase', 'log', 'args', 'budget', body);
  const result = await fn(agent, parallel, pipeline, phase, log, args, budgetObj);
  return { meta, result, calls, phases, logs };
}
