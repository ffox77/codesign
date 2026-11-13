import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runWorkflow } from './harness.mjs';

const CODESIGN = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(CODESIGN, 'trial.workflow.js');

const SPECIALISTS = [
  { slug: 'codesign-org-learning', field: 'Organizational learning and knowledge management' },
  { slug: 'codesign-eval-methods', field: 'Evaluation methods' },
  { slug: 'codesign-context-eng', field: 'Context engineering for agents' },
  { slug: 'codesign-daily-user', field: 'The daily user' },
];

const ARGS = {
  runDir: 'runs/test-1',
  brief: 'briefs/reasons.md',
  searchBudget: 20,
  specialists: SPECIALISTS,
};

const tasksFor = (slug) => ({
  items: [
    { id: 'K1', kind: 'task', text: `Task one for ${slug}`, excellent: 'Names the trade-off' },
    { id: 'K2', kind: 'task', text: `Task two for ${slug}`, excellent: 'Gives a case' },
    { id: 'Q1', kind: 'probe', text: `Probe one for ${slug}?`, excellent: 'Cites a failure' },
  ],
});

// Expected output file per onboarding step.
const EXPECTED = {
  plan: 'plan.md',
  viewpoints: 'plan.md',
  tasks: 'tasks.md',
  probe: 'baseline-answers.md',
  search: 'sources.md',
  extract: 'extracts.md',
  'check-answer': 'check-answers.md',
  'check-grade': 'check.md',
  compress: 'knowledge.md',
};
const ok = (slug, s) => ({ wrote: [`specialists/${slug}/${EXPECTED[s]}`], blocked: '' });
const RUN = ARGS.runDir;
const wrote = (p) => ({ wrote: [p], blocked: '' });

// critique-N -> its output file (odd N: research team, slug (N-1)/2; even N: label team, slug N/2-1).
const critiqueOut = (label) => {
  const n = Number(label.slice('critique-'.length));
  const team = n % 2 === 1 ? 'research' : 'label';
  return `${RUN}/critiques/${team}/${SPECIALISTS[Math.floor((n - 1) / 2)].slug}.md`;
};
const TENSION = { title: 't', roles: 'a, b', side1: 's1', side2: 's2', settle: 'x' };

// Schema-shaped fakes keyed by label. overrides[label] replaces the fake for that label.
function makeStub(nullLabels = [], overrides = {}) {
  return (prompt, opts) => {
    const label = opts.label || '';
    if (nullLabels.includes(label)) return null;
    if (label in overrides) return overrides[label];
    const m = label.match(/^onboard:([^:]+):(.+)$/);
    if (m && m[2] === 'tasks') return { ...tasksFor(m[1]), ...ok(m[1], 'tasks') };
    if (m && m[2] === 'check-grade') {
      return {
        ...ok(m[1], 'check-grade'),
        slug: m[1],
        items: [
          { id: 'K1', verdict: 'improved', reason: 'r', drivenBy: ['F1'] },
          { id: 'K2', verdict: 'same', reason: 'r', drivenBy: [] },
          { id: 'Q1', verdict: 'worse', reason: 'r', drivenBy: [] },
        ],
        findingsKept: ['F1'],
        findingsDropped: ['F2', 'F3'],
      };
    }
    if (label === 'baseline') return wrote(`${RUN}/baseline.md`);
    if (/^critique-\d+$/.test(label)) return { wrong: ['w'], requirements: ['r'], conflicts: [], ...wrote(critiqueOut(label)) };
    if (/^mapper-[ab]$/.test(label)) {
      const team = label === 'mapper-a' ? 'research' : 'label';
      return { foundBeforeCut: 3, tensions: [TENSION], ...wrote(`${RUN}/tensions/${team}.md`) };
    }
    if (label === 'scrub') return { list1Count: 1, list2Count: 1 };
    if (label === 'tell-check') return { tell: false };
    if (/^judge-[12]$/.test(label)) {
      return {
        first: [{ id: 'T1', mark: 'real', inBaseline: false, reason: 'r' }],
        second: [{ id: 'T1', mark: 'noise', inBaseline: true, reason: 'r' }],
        preferred: 'first',
        why: 'w',
        ...wrote(`${RUN}/judge/${label}.json`),
      };
    }
    if (label === 'fold') return { decisions: [
      { entry: 'list-1 T1', outcome: 'settled', how: 'h' },
      { entry: 'list-2 T1', outcome: 'settled', how: 'h' },
    ], ...wrote(`${RUN}/final.md`) };
    if (label === 'compare') return { changes: [], briefGaps: [], ...wrote(`${RUN}/compare.md`) };
    if (m) return ok(m[1], m[2]);
    return 'done';
  };
}

const run = (nullLabels, overrides) => runWorkflow(SCRIPT, { args: ARGS, agentStub: makeStub(nullLabels, overrides) });
const byLabel = (calls, label) => calls.find((c) => c.opts.label === label);
const indexOf = (calls, label) => calls.findIndex((c) => c.opts.label === label);
const isResearchCritique = (c) => /^critique-/.test(c.opts.label) && c.prompt.includes('critiques/research/');
const isLabelCritique = (c) => /^critique-/.test(c.opts.label) && c.prompt.includes('critiques/label/');

test('makes 53 agent calls with 4 specialists', async () => {
  const { calls } = await run();
  assert.strictEqual(calls.length, 53);
  assert.strictEqual(calls.filter((c) => c.opts.label.startsWith('onboard:')).length, 36);
});

test('meta phases equal the phase() calls', async () => {
  const { meta, phases, calls } = await run();
  const titles = meta.phases.map((p) => p.title);
  assert.deepStrictEqual(titles, ['Baseline', 'Onboard', 'Critique', 'Map', 'Blind', 'Judge', 'Fold']);
  assert.deepStrictEqual(phases, titles);
  for (const c of calls) assert.ok(titles.includes(c.opts.phase), `bad phase on ${c.opts.label}`);
});

test('research and label critique prompts differ only in the identity line', async () => {
  const { calls } = await run();
  const norm = (p) =>
    p
      .split('\n')
      .filter((l) => !l.startsWith('IDENTITY='))
      .join('\n')
      .replace(/critiques\/(research|label)\//g, 'critiques/<team>/');
  for (const { slug } of SPECIALISTS) {
    const r = calls.find((c) => isResearchCritique(c) && c.prompt.includes(`/${slug}.md`));
    const l = calls.find((c) => isLabelCritique(c) && c.prompt.includes(`/${slug}.md`));
    assert.ok(r && l, `both critiques for ${slug}`);
    assert.notStrictEqual(r.prompt, l.prompt);
    assert.strictEqual(norm(r.prompt), norm(l.prompt));
    assert.match(r.prompt, new RegExp(`specialists/${slug}/knowledge\\.md`));
    assert.match(l.prompt, /IDENTITY=You are an expert in /);
    assert.doesNotMatch(l.prompt, /knowledge\.md|specialist/);
  }
});

test('critiques read only the brief and the baseline', async () => {
  const { calls } = await run();
  const crits = calls.filter((c) => /^critique-/.test(c.opts.label));
  assert.strictEqual(crits.length, 2 * SPECIALISTS.length);
  for (const c of crits) {
    const lines = c.prompt.split('\n');
    const start = lines.indexOf('READINGS=') + 1;
    const end = lines.findIndex((l, k) => k >= start && !l.startsWith('- '));
    assert.deepStrictEqual(lines.slice(start, end), [`- ${ARGS.brief}`, `- ${RUN}/baseline.md`]);
  }
});

test('critique labels interleave research and label slugs', async () => {
  const { calls } = await run();
  SPECIALISTS.forEach(({ slug }, i) => {
    const r = byLabel(calls, `critique-${2 * i + 1}`);
    const l = byLabel(calls, `critique-${2 * i + 2}`);
    assert.ok(r.prompt.includes(`critiques/research/${slug}.md`));
    assert.ok(l.prompt.includes(`critiques/label/${slug}.md`));
  });
});

test('mapper prompts differ only in the four input paths and output path', async () => {
  const { calls } = await run();
  const a = byLabel(calls, 'mapper-a').prompt;
  const b = byLabel(calls, 'mapper-b').prompt;
  assert.strictEqual((a.match(/critiques\/research\//g) || []).length, 4);
  assert.strictEqual((b.match(/critiques\/label\//g) || []).length, 4);
  const norm = (p) =>
    p.replace(/critiques\/(research|label)\//g, 'critiques/<team>/').replace(/tensions\/(research|label)\.md/g, 'tensions/<team>.md');
  assert.notStrictEqual(a, b);
  assert.strictEqual(norm(a), norm(b));
});

test('labels from Critique on are neutral', async () => {
  const { calls } = await run();
  const late = calls.filter((c) => ['Critique', 'Map', 'Blind'].includes(c.opts.phase));
  assert.strictEqual(late.length, 12);
  for (const c of late) assert.match(c.opts.label, /^(critique-[1-8]|mapper-[ab]|scrub|tell-check)$/);
});

test('return value names no team or slug', async () => {
  const { result } = await run();
  const s = JSON.stringify(result);
  assert.doesNotMatch(s, /research|label/i);
  for (const { slug } of SPECIALISTS) assert.ok(!s.includes(slug), `names ${slug}`);
  assert.deepStrictEqual(result.lists, { 'list-1': 1, 'list-2': 1 });
  assert.deepStrictEqual(result.missing, []);
  assert.deepStrictEqual(result.failed, []);
  assert.strictEqual(result.scrubSkipped, null);
  assert.strictEqual(result.tellCheck, false);
  assert.strictEqual(result.checks.length, 4);
  assert.deepStrictEqual(result.checks[0], {
    specialist: 1, improved: 1, same: 1, worse: 1, total: 3, findingsKept: 1, findingsDropped: 2,
  });
  assert.ok(result.paths.includes('runs/test-1/blind/list-1.md'));
});

test('grader and scrub prompts point at codex-wrapper.md and a schema in schemas/', async () => {
  const { calls } = await run();
  const graders = calls.filter((c) => c.opts.label.endsWith(':check-grade'));
  assert.strictEqual(graders.length, 4);
  for (const c of graders) {
    assert.ok(c.prompt.includes('prompts/wrappers/codex-wrapper.md'));
    assert.ok(c.prompt.includes('prompts/referee/grader.md'));
    assert.ok(c.prompt.includes('schemas/grade.json'));
  }
  const scrub = byLabel(calls, 'scrub');
  assert.ok(scrub.prompt.includes('prompts/wrappers/codex-wrapper.md'));
  assert.ok(scrub.prompt.includes('prompts/referee/scrub.md'));
  assert.ok(scrub.prompt.includes('schemas/scrub.json'));
  assert.ok(scrub.prompt.includes('echo $((RANDOM % 2))'));
});

test('probe prompt contains every task and probe text inline and no file path except its output', async () => {
  const { calls } = await run();
  for (const { slug } of SPECIALISTS) {
    const p = byLabel(calls, `onboard:${slug}:probe`).prompt;
    for (const item of tasksFor(slug).items) assert.ok(p.includes(item.text), `missing ${item.id}`);
    for (const item of tasksFor(slug).items) assert.ok(!p.includes(item.excellent), 'leaks excellent answer');
    const paths = [...new Set((p.match(/[\w.~-]*\/[\w./~-]+/g) || []).map((x) => x.replace(/\.$/, '')))];
    assert.deepStrictEqual(paths, [`specialists/${slug}/baseline-answers.md`]);
  }
});

test('research critique for a slug is called after that slug\'s compress', async () => {
  const { calls } = await run();
  for (const { slug } of SPECIALISTS) {
    const crit = calls.findIndex((c) => isResearchCritique(c) && c.prompt.includes(`/${slug}.md`));
    assert.ok(crit > indexOf(calls, `onboard:${slug}:compress`));
  }
});

test('label critiques are called before any compress', async () => {
  const { calls } = await run();
  const firstCompress = calls.findIndex((c) => c.opts.label.endsWith(':compress'));
  const lastLabel = calls.map(isLabelCritique).lastIndexOf(true);
  assert.ok(lastLabel >= 0 && lastLabel < firstCompress);
});

test('baseline runs first', async () => {
  const { calls } = await run();
  assert.strictEqual(calls[0].opts.label, 'baseline');
  assert.ok(calls[0].prompt.includes('prompts/make/baseline.md'));
});

test('a specialist whose chain returns null is listed in missing and the run still returns lists', async () => {
  const { calls, result } = await run(['onboard:codesign-daily-user:search']);
  assert.deepStrictEqual(result.missing, [4]);
  assert.strictEqual(result.checks.length, 3);
  assert.deepStrictEqual(result.lists, { 'list-1': 1, 'list-2': 1 });
  assert.strictEqual(indexOf(calls, 'onboard:codesign-daily-user:extract'), -1);
  assert.strictEqual(indexOf(calls, 'critique-7'), -1);
  const a = byLabel(calls, 'mapper-a').prompt;
  assert.strictEqual((a.match(/critiques\/research\//g) || []).length, 3);
  const b = byLabel(calls, 'mapper-b').prompt;
  assert.strictEqual((b.match(/critiques\/label\//g) || []).length, 4);
});

test('identity lines lowercase the field\'s first letter', async () => {
  const { calls } = await run();
  assert.match(byLabel(calls, 'critique-8').prompt, /IDENTITY=You are an expert in the daily user\./);
  assert.match(
    byLabel(calls, 'critique-1').prompt,
    /IDENTITY=You are the specialist on this team for: organizational learning and knowledge management\. /
  );
});

test('a team with no critiques skips its mapper and logs it', async () => {
  const { calls, logs, result } = await run(['critique-2', 'critique-4', 'critique-6', 'critique-8']);
  assert.strictEqual(indexOf(calls, 'mapper-b'), -1);
  assert.ok(indexOf(calls, 'mapper-a') >= 0);
  assert.ok(logs.some((l) => l.includes('mapper-b skipped')));
  assert.ok(result);
});

// An onboarding failure ends that specialist's chain: pipeline turns the throw into a null
// chain, so the specialist shows up in `missing`, and the failure is logged with its label.
const assertOnboardFailed = (r, label, pattern) => {
  assert.deepStrictEqual(r.result.missing, [4]);
  assert.strictEqual(r.result.checks.length, 3);
  assert.ok(
    r.logs.some((l) => l.startsWith(`${label} failed:`) && pattern.test(l)),
    `no failure log for ${label}: ${JSON.stringify(r.logs)}`
  );
};

test('onboarding steps ask for and use the step-report schema', async () => {
  const { calls } = await run();
  const steps = calls.filter((c) => c.opts.label.startsWith('onboard:'));
  for (const c of steps) {
    const props = c.opts.schema && c.opts.schema.properties;
    assert.ok(props && props.wrote && props.blocked, `no step report schema on ${c.opts.label}`);
    if (!c.opts.label.endsWith(':check-grade')) assert.match(c.prompt, /blocked = an empty string on success/, c.opts.label);
  }
});

test('a step that returns blocked fails that chain with its label and reason', async () => {
  const label = 'onboard:codesign-daily-user:extract';
  const r = await run([], { [label]: { wrote: [], blocked: 'harness refused the file name' } });
  assertOnboardFailed(r, label, /harness refused the file name/);
  assert.strictEqual(indexOf(r.calls, 'onboard:codesign-daily-user:check-answer'), -1);
});

test('a step whose wrote lacks its expected file fails that chain', async () => {
  const label = 'onboard:codesign-daily-user:extract';
  const r = await run([], { [label]: { wrote: ['specialists/codesign-daily-user/notes.md'], blocked: '' } });
  assertOnboardFailed(r, label, /extracts\.md/);
  assert.strictEqual(indexOf(r.calls, 'onboard:codesign-daily-user:check-answer'), -1);
});

test('a step that replies with prose instead of a step report fails that chain', async () => {
  const label = 'onboard:codesign-daily-user:search';
  const r = await run([], { [label]: "I couldn't create sources.md" });
  assertOnboardFailed(r, label, /no step report/);
});

test('a grade with zero items fails that chain', async () => {
  const label = 'onboard:codesign-daily-user:check-grade';
  const r = await run([], {
    [label]: { ...ok('codesign-daily-user', 'check-grade'), slug: 'codesign-daily-user', items: [], findingsKept: [], findingsDropped: [] },
  });
  assertOnboardFailed(r, label, /zero items/);
  assert.strictEqual(indexOf(r.calls, 'onboard:codesign-daily-user:compress'), -1);
});

test('a tasks step with no items fails that chain', async () => {
  const label = 'onboard:codesign-daily-user:tasks';
  const r = await run([], { [label]: { items: [], ...ok('codesign-daily-user', 'tasks') } });
  assertOnboardFailed(r, label, /no items/);
});

test('no output file in the protocol or prompts is named like a report', () => {
  const files = [
    path.join(CODESIGN, 'method/research-protocol.md'),
    ...fs.readdirSync(path.join(CODESIGN, 'prompts')).filter((f) => f.endsWith('.md')).map((f) => path.join(CODESIGN, 'prompts', f)),
  ];
  const bad = [];
  for (const f of files) {
    const names = fs.readFileSync(f, 'utf8').match(/`[^`\s]*\.md`/g) || [];
    for (const n of names) if (/(report|summary|findings|analysis)[^/]*\.md`$/i.test(n)) bad.push(`${path.basename(f)}: ${n}`);
  }
  assert.deepStrictEqual(bad, []);
});

// ---------- Final-review fixes: baseline, critiques, mappers, blind steps ----------

const runWith = (args, nullLabels, overrides) => runWorkflow(SCRIPT, { args, agentStub: makeStub(nullLabels, overrides) });

test('baseline, critiques and mappers ask for and use the step-report schema', async () => {
  const { calls } = await run();
  const steps = calls.filter((c) => /^(baseline|critique-\d|mapper-[ab])$/.test(c.opts.label));
  assert.strictEqual(steps.length, 11);
  for (const c of steps) {
    const props = c.opts.schema && c.opts.schema.properties;
    assert.ok(props && props.wrote && props.blocked, `no step report schema on ${c.opts.label}`);
    assert.ok(c.opts.schema.required.includes('wrote') && c.opts.schema.required.includes('blocked'), c.opts.label);
    assert.match(c.prompt, /blocked = an empty string on success/, c.opts.label);
  }
});

test('a blocked baseline stops the run', async () => {
  const seen = [];
  const stub = makeStub([], { baseline: { wrote: [], blocked: 'could not write' } });
  await assert.rejects(
    runWorkflow(SCRIPT, { args: ARGS, agentStub: (p, o) => (seen.push(o.label), stub(p, o)) }),
    /baseline failed: blocked: could not write/
  );
  assert.deepStrictEqual(seen, ['baseline']);
});

test('a step that echoes blocked as a literal "" counts as success', async () => {
  const { result } = await run([], { baseline: { wrote: [`${RUN}/baseline.md`], blocked: '""' } });
  assert.deepStrictEqual(result.missing, []);
  assert.deepStrictEqual(result.failed, []);
});

test('a baseline that wrote the wrong file stops the run', async () => {
  await assert.rejects(run([], { baseline: wrote('runs/other/baseline.md') }), /baseline failed: did not write/);
});

test('a baseline that returns nothing stops the run', async () => {
  await assert.rejects(run(['baseline']), /baseline failed: returned nothing/);
});

test('a failed research critique goes in failed, not missing, and its mapper maps the rest', async () => {
  const { calls, logs, result } = await run([], {
    'critique-3': { wrong: [], requirements: [], conflicts: [], wrote: [], blocked: 'refused' },
  });
  assert.deepStrictEqual(result.failed, ['critique-3']);
  assert.deepStrictEqual(result.missing, []);
  assert.strictEqual(result.checks.length, 4);
  assert.ok(logs.some((l) => l.startsWith('critique-3 failed:') && l.includes('refused')));
  const a = byLabel(calls, 'mapper-a').prompt;
  assert.strictEqual((a.match(/critiques\/research\//g) || []).length, 3);
  assert.deepStrictEqual(result.lists, { 'list-1': 1, 'list-2': 1 });
});

test('a label critique that returns nothing goes in failed', async () => {
  const { calls, result } = await run(['critique-6']);
  assert.deepStrictEqual(result.failed, ['critique-6']);
  assert.deepStrictEqual(result.missing, []);
  const b = byLabel(calls, 'mapper-b').prompt;
  assert.strictEqual((b.match(/critiques\/label\//g) || []).length, 3);
});

test('a critique whose wrote lacks its own file goes in failed', async () => {
  // critique-2 reports another slug's file: only the full expected path counts.
  const { result } = await run([], {
    'critique-2': { wrong: [], requirements: [], conflicts: [], ...wrote(critiqueOut('critique-4')) },
  });
  assert.deepStrictEqual(result.failed, ['critique-2']);
});

const assertScrubSkipped = (calls, result, mapperLabel) => {
  assert.ok(result.failed.includes(mapperLabel), JSON.stringify(result.failed));
  assert.strictEqual(result.lists, null);
  assert.strictEqual(result.tellCheck, null);
  assert.ok(result.scrubSkipped.includes(mapperLabel), result.scrubSkipped);
  assert.strictEqual(indexOf(calls, 'scrub'), -1);
  assert.strictEqual(indexOf(calls, 'tell-check'), -1);
};

test('a mapper that returns nothing skips the scrub and tell-check', async () => {
  const { calls, result } = await run(['mapper-a']);
  assertScrubSkipped(calls, result, 'mapper-a');
  assert.deepStrictEqual(result.failed, ['mapper-a']);
});

test('a mapper whose wrote lacks its tensions file skips the scrub and tell-check', async () => {
  const { calls, result } = await run([], {
    'mapper-b': { foundBeforeCut: 1, tensions: [TENSION], ...wrote(`${RUN}/tensions/research.md`) },
  });
  assertScrubSkipped(calls, result, 'mapper-b');
});

test('a blocked mapper skips the scrub and tell-check', async () => {
  const { calls, result } = await run([], {
    'mapper-b': { foundBeforeCut: 0, tensions: [], wrote: [], blocked: 'no critiques readable' },
  });
  assertScrubSkipped(calls, result, 'mapper-b');
});

test('a team with no critiques lists them and its mapper in failed and skips the scrub', async () => {
  const { calls, result } = await run(['critique-2', 'critique-4', 'critique-6', 'critique-8']);
  assert.deepStrictEqual(result.failed, ['critique-2', 'critique-4', 'critique-6', 'critique-8', 'mapper-b']);
  assertScrubSkipped(calls, result, 'mapper-b');
});

test('a failed scrub goes in failed and skips the tell-check', async () => {
  const { calls, result } = await run(['scrub']);
  assert.deepStrictEqual(result.failed, ['scrub']);
  assert.strictEqual(result.lists, null);
  assert.strictEqual(result.tellCheck, null);
  assert.strictEqual(indexOf(calls, 'tell-check'), -1);
});

test('tell-check reads only the two blind lists, cannot tell which is which, and returns only tell', async () => {
  const { calls, result } = await run([], { 'tell-check': { tell: true } });
  const c = byLabel(calls, 'tell-check');
  assert.ok(indexOf(calls, 'tell-check') > indexOf(calls, 'scrub'));
  assert.strictEqual(c.opts.phase, 'Blind');
  assert.deepStrictEqual(Object.keys(c.opts.schema.properties), ['tell']);
  const paths = [...new Set(c.prompt.match(/[\w.~-]*\/[\w./~-]+/g).map((x) => x.replace(/\.$/, '')))];
  assert.deepStrictEqual(paths.sort(), [`${RUN}/blind/list-1.md`, `${RUN}/blind/list-2.md`]);
  assert.doesNotMatch(c.prompt, /tensions|key\.md|label|team|specialist|knowledge/i);
  assert.match(c.prompt, /do not write/i);
  assert.strictEqual(result.tellCheck, true);
});

test('a tell-check with no answer goes in failed', async () => {
  const { result } = await run(['tell-check']);
  assert.deepStrictEqual(result.failed, ['tell-check']);
  assert.strictEqual(result.tellCheck, null);
  assert.deepStrictEqual(result.lists, { 'list-1': 1, 'list-2': 1 });
});

test('an onboarding step that wrote the same file name in another folder fails that chain', async () => {
  const label = 'onboard:codesign-daily-user:plan';
  const r = await run([], { [label]: { wrote: ['specialists/codesign-eval-methods/plan.md'], blocked: '' } });
  assertOnboardFailed(r, label, /did not write specialists\/codesign-daily-user\/plan\.md/);
});

test('an onboarding step that reports ./ before its path passes', async () => {
  const label = 'onboard:codesign-daily-user:plan';
  const { result } = await run([], { [label]: { wrote: ['./specialists/codesign-daily-user/plan.md'], blocked: '' } });
  assert.deepStrictEqual(result.missing, []);
});

// ---------- Roles format ----------
const FIELD_ARGS = {
  ...ARGS,
  specialists: [
    { slug: 'codesign-org-learning', field: 'Organizational learning: how teams record decisions (design-rationale research)' },
    { slug: 'codesign-eval-methods', field: 'Evaluation methods: measuring whether a log helps' },
    { slug: 'codesign-context-eng', field: 'Context engineering for agents' },
    { slug: 'codesign-daily-user', field: 'The daily user: a developer working with agents' },
  ],
};
const NAMES = ['organizational learning', 'evaluation methods', 'context engineering for agents', 'the daily user'];

test('mapper and scrub prompts carry short role names from the field lines, in one "A, B" format', async () => {
  const { calls } = await runWith(FIELD_ARGS);
  for (const label of ['mapper-a', 'mapper-b', 'scrub']) {
    const lines = byLabel(calls, label).prompt.split('\n').map((l) => l.trim());
    for (const n of NAMES) assert.ok(lines.includes(`- ${n}`), `${label} lacks ${n}`);
    assert.ok(!lines.some((l) => l.startsWith('- organizational learning:')), label);
  }
  const scrub = byLabel(calls, 'scrub').prompt;
  assert.ok(scrub.includes('joined by ", "'));
  assert.ok(scrub.includes("do not copy the item's roles text"));
});

test('a role name with a forbidden word stops the run before any agent', async () => {
  const seen = [];
  const args = { ...FIELD_ARGS, specialists: [...FIELD_ARGS.specialists] };
  args.specialists[0] = { slug: 'codesign-org-learning', field: 'Design-rationale research: how teams record decisions' };
  const stub = makeStub();
  await assert.rejects(
    runWorkflow(SCRIPT, { args, agentStub: (p, o) => (seen.push(o.label), stub(p, o)) }),
    /role name "design-rationale research".*contains "research"/
  );
  assert.deepStrictEqual(seen, []);
});

// ---------- N1: absolute paths in wrote ----------
const ABS = '/Users/someone/repo';

test('an onboarding step that reports an absolute path to its file passes', async () => {
  const label = 'onboard:codesign-daily-user:search';
  const { result } = await run([], { [label]: { wrote: [`${ABS}/specialists/codesign-daily-user/sources.md`], blocked: '' } });
  assert.deepStrictEqual(result.missing, []);
  assert.strictEqual(result.checks.length, 4);
});

test('a baseline that reports an absolute path to its file passes', async () => {
  const { result } = await run([], { baseline: wrote(`${ABS}/${RUN}/baseline.md`) });
  assert.deepStrictEqual(result.failed, []);
});

test('an absolute path to another slug\'s file still fails the step', async () => {
  const label = 'onboard:codesign-daily-user:plan';
  const r = await run([], { [label]: { wrote: [`${ABS}/specialists/codesign-eval-methods/plan.md`], blocked: '' } });
  assertOnboardFailed(r, label, /did not write specialists\/codesign-daily-user\/plan\.md/);
});

const JUDGE_COUNTS = {
  real: { real: 1, obvious: 0, noise: 0, realNew: 1, total: 1 },
  noise: { real: 0, obvious: 0, noise: 1, realNew: 0, total: 1 },
};

test('two judges run after the scrub, one per list order, through Codex', async () => {
  const { calls } = await run();
  const j1 = byLabel(calls, 'judge-1');
  const j2 = byLabel(calls, 'judge-2');
  assert.ok(j1 && j2);
  for (const c of [j1, j2]) {
    assert.ok(indexOf(calls, c.opts.label) > indexOf(calls, 'scrub'));
    assert.strictEqual(c.opts.phase, 'Judge');
    assert.ok(c.prompt.includes('prompts/wrappers/codex-wrapper.md'));
    assert.ok(c.prompt.includes('PROMPT_FILE=prompts/referee/judge.md'));
    assert.ok(c.prompt.includes('SCHEMA=schemas/judge.json'));
    assert.ok(c.prompt.includes(`BRIEF_PATH=${ARGS.brief}`));
    assert.ok(c.prompt.includes(`BASELINE_PATH=${RUN}/baseline.md`));
    assert.ok(c.prompt.includes(`${RUN}/judge/${c.opts.label}.json`));
    assert.doesNotMatch(c.prompt, /tensions|key\.md|label|team|specialist|knowledge/i);
  }
  assert.ok(j1.prompt.includes(`FIRST_PATH=${RUN}/blind/list-1.md, SECOND_PATH=${RUN}/blind/list-2.md`));
  assert.ok(j2.prompt.includes(`FIRST_PATH=${RUN}/blind/list-2.md, SECOND_PATH=${RUN}/blind/list-1.md`));
});

test('judge results are mapped back to list numbers', async () => {
  const { result } = await run();
  assert.deepStrictEqual(result.judge, [
    { firstShown: 1, preferred: 1, 'list-1': JUDGE_COUNTS.real, 'list-2': JUDGE_COUNTS.noise },
    { firstShown: 2, preferred: 2, 'list-1': JUDGE_COUNTS.noise, 'list-2': JUDGE_COUNTS.real },
  ]);
  assert.strictEqual(result.judgesAgree, false);
});

test('a failed judge goes in failed and the other judge still reports', async () => {
  const { result } = await run(['judge-2']);
  assert.deepStrictEqual(result.failed, ['judge-2']);
  assert.strictEqual(result.judge.length, 1);
  assert.strictEqual(result.judge[0].firstShown, 1);
  assert.strictEqual(result.judgesAgree, null);
});

test('a judge whose entry count differs from the blind list fails', async () => {
  const bad = {
    first: [],
    second: [{ id: 'T1', mark: 'real', inBaseline: false, reason: 'r' }],
    preferred: 'second',
    why: 'w',
    ...wrote(`${RUN}/judge/judge-1.json`),
  };
  const { result, logs } = await run([], { 'judge-1': bad });
  assert.deepStrictEqual(result.failed, ['judge-1']);
  assert.ok(logs.some((l) => l.startsWith('judge-1 failed:') && /entries/.test(l)), JSON.stringify(logs));
});

test('a failed scrub skips the judges', async () => {
  const { calls, result } = await run(['scrub']);
  assert.strictEqual(indexOf(calls, 'judge-1'), -1);
  assert.strictEqual(indexOf(calls, 'judge-2'), -1);
  assert.strictEqual(result.judge, null);
});

// ---------- Fold and compare ----------
const FOLD_OK = {
  decisions: [
    { entry: 'list-1 T1', outcome: 'settled', how: 'h' },
    { entry: 'list-2 T1', outcome: 'open', how: 'h' },
  ],
  ...wrote(`${RUN}/final.md`),
};
const COMPARE_OK = {
  changes: [
    { section: 's1', change: 'c', entries: ['list-1 T1'] },
    { section: 's2', change: 'c', entries: ['list-1 T1', 'list-2 T1'] },
  ],
  briefGaps: [{ entry: 'list-1 T1', why: 'w', briefLine: 'b' }],
  ...wrote(`${RUN}/compare.md`),
};
const runFold = (nullLabels = [], overrides = {}) => run(nullLabels, { fold: FOLD_OK, compare: COMPARE_OK, ...overrides });

test('fold runs after the judges and compare after fold, both through Codex on the blind lists', async () => {
  const { calls } = await runFold();
  const fold = byLabel(calls, 'fold');
  const compare = byLabel(calls, 'compare');
  assert.ok(fold && compare);
  assert.ok(indexOf(calls, 'fold') > indexOf(calls, 'judge-2'));
  assert.ok(indexOf(calls, 'compare') > indexOf(calls, 'fold'));
  for (const [c, name] of [[fold, 'fold'], [compare, 'compare']]) {
    assert.strictEqual(c.opts.phase, 'Fold');
    assert.ok(c.prompt.includes('prompts/wrappers/codex-wrapper.md'));
    assert.ok(c.prompt.includes(`PROMPT_FILE=prompts/referee/${name}.md`));
    assert.ok(c.prompt.includes(`SCHEMA=schemas/${name}.json`));
    assert.ok(c.prompt.includes(`LIST_1_PATH=${RUN}/blind/list-1.md`));
    assert.ok(c.prompt.includes(`LIST_2_PATH=${RUN}/blind/list-2.md`));
    assert.ok(c.prompt.includes(`BRIEF_PATH=${ARGS.brief}`));
    assert.ok(c.prompt.includes(`BASELINE_PATH=${RUN}/baseline.md`));
    assert.doesNotMatch(c.prompt, /tensions|key\.md|label|team|specialist|knowledge/i);
  }
  assert.ok(compare.prompt.includes(`FINAL_PATH=${RUN}/final.md`));
});

test('fold and compare results are counted by list number', async () => {
  const { result } = await runFold();
  assert.deepStrictEqual(result.fold, {
    'list-1': { settled: 1, open: 0, rejected: 0 },
    'list-2': { settled: 0, open: 1, rejected: 0 },
  });
  assert.deepStrictEqual(result.compare, {
    changes: 2,
    changesByList: { 'list-1': 2, 'list-2': 1 },
    briefGaps: ['list-1 T1'],
  });
  assert.ok(result.paths.includes(`${RUN}/final.md`));
  assert.ok(result.paths.includes(`${RUN}/compare.md`));
  assert.doesNotMatch(JSON.stringify(result), /research|label/i);
});

test('a fold that skips an entry fails, and compare is skipped', async () => {
  const short = { ...FOLD_OK, decisions: FOLD_OK.decisions.slice(0, 1) };
  const { calls, result, logs } = await runFold([], { fold: short });
  assert.deepStrictEqual(result.failed, ['fold']);
  assert.ok(logs.some((l) => l.startsWith('fold failed:') && /entries/.test(l)), JSON.stringify(logs));
  assert.strictEqual(indexOf(calls, 'compare'), -1);
  assert.strictEqual(result.fold, null);
  assert.strictEqual(result.compare, null);
});

test('a decision naming an unknown entry fails the fold', async () => {
  const bad = { ...FOLD_OK, decisions: [FOLD_OK.decisions[0], { entry: 'list-2 T9', outcome: 'open', how: 'h' }] };
  const { result } = await runFold([], { fold: bad });
  assert.deepStrictEqual(result.failed, ['fold']);
});

test('a failed compare goes in failed and keeps the fold result', async () => {
  const { result } = await runFold(['compare']);
  assert.deepStrictEqual(result.failed, ['compare']);
  assert.ok(result.fold);
  assert.strictEqual(result.compare, null);
});

test('a failed scrub skips fold and compare', async () => {
  const { calls, result } = await runFold(['scrub']);
  assert.strictEqual(indexOf(calls, 'fold'), -1);
  assert.strictEqual(result.fold, null);
  assert.strictEqual(result.compare, null);
});

// ---------- Swapped providers: Codex makes, Claude referees ----------
const SWAP_ARGS = { ...ARGS, makers: 'codex' };
const runSwap = (nullLabels, overrides) => runWorkflow(SCRIPT, { args: SWAP_ARGS, agentStub: makeStub(nullLabels, overrides) });
const MAKER_RE = /^(baseline|critique-\d+|mapper-[ab]|onboard:[^:]+:(plan|viewpoints|tasks|probe|search|extract|check-answer|compress))$/;
const REFEREE_RE = /^(onboard:[^:]+:check-grade|scrub|judge-[12]|fold|compare)$/;

test('with makers=codex, every making step goes through the Codex maker wrapper with a strict schema', async () => {
  const { calls: plain } = await run();
  const { calls, result } = await runSwap();
  assert.strictEqual(calls.length, plain.length);
  assert.deepStrictEqual(result.failed, []);
  const makers = calls.filter((c) => MAKER_RE.test(c.opts.label));
  assert.strictEqual(makers.length, 1 + 4 * 8 + 8 + 2);
  for (const c of makers) {
    assert.ok(c.prompt.startsWith('Follow prompts/wrappers/codex-maker-wrapper.md'), c.opts.label);
    const orig = byLabel(plain, c.opts.label).prompt;
    assert.ok(c.prompt.endsWith(`TASK=\n${orig}`), `task text differs for ${c.opts.label}`);
    const line = c.prompt.split('\n').find((l) => l.startsWith('SCHEMA_JSON='));
    const schema = JSON.parse(line.slice('SCHEMA_JSON='.length));
    assert.strictEqual(schema.additionalProperties, false, c.opts.label);
    assert.deepStrictEqual([...schema.required].sort(), Object.keys(schema.properties).sort(), c.opts.label);
    const search = c.opts.label.endsWith(':search') ? 'yes' : 'no';
    assert.ok(c.prompt.includes(`\nSEARCH=${search}\n`), c.opts.label);
  }
});

test('with makers=codex, the refereeing steps are done by Claude from the same prompt files', async () => {
  const { calls } = await runSwap();
  const refs = calls.filter((c) => REFEREE_RE.test(c.opts.label));
  assert.strictEqual(refs.length, 4 + 1 + 2 + 2);
  const file = (l) =>
    l.endsWith(':check-grade') ? 'grader' : l.startsWith('judge-') ? 'judge' : l;
  for (const c of refs) {
    assert.doesNotMatch(c.prompt, /codex/i, c.opts.label);
    assert.ok(c.prompt.startsWith(`Do the task in prompts/referee/${file(c.opts.label)}.md yourself`), c.opts.label);
  }
  const tell = byLabel(calls, 'tell-check');
  assert.doesNotMatch(tell.prompt, /codex/i);
});

test('the default run keeps Claude making and Codex refereeing', async () => {
  const { calls } = await run();
  for (const c of calls.filter((c) => MAKER_RE.test(c.opts.label))) assert.doesNotMatch(c.prompt, /codex/i, c.opts.label);
  for (const c of calls.filter((c) => REFEREE_RE.test(c.opts.label))) assert.ok(c.prompt.includes('prompts/wrappers/codex-wrapper.md'), c.opts.label);
});

test('an unknown makers value stops the run before any agent starts', async () => {
  const seen = [];
  const stub = makeStub();
  await assert.rejects(
    runWorkflow(SCRIPT, { args: { ...ARGS, makers: 'gpt' }, agentStub: (p, o) => (seen.push(o.label), stub(p, o)) }),
    /makers/
  );
  assert.deepStrictEqual(seen, []);
});

// ---------- Shared design discipline ----------
test('the baseline step reads the shared discipline file, with either maker', async () => {
  for (const r of [run, runSwap]) {
    const { calls } = await r();
    assert.ok(byLabel(calls, 'baseline').prompt.includes('DISCIPLINE=method/discipline.md'));
  }
  const baseline = fs.readFileSync(path.join(CODESIGN, 'prompts/make/baseline.md'), 'utf8');
  assert.match(baseline, /\{\{DISCIPLINE\}\}/);
  assert.ok(fs.existsSync(path.join(CODESIGN, 'method/discipline.md')));
});

test('critiques do not get the discipline file, so it cannot differ between teams', async () => {
  const { calls } = await run();
  for (const c of calls.filter((c) => /^critique-/.test(c.opts.label))) assert.doesNotMatch(c.prompt, /discipline/i);
});

test('the shared mapper prompt defines importance by how hard a choice is to undo', () => {
  const mapper = fs.readFileSync(path.join(CODESIGN, 'prompts/make/mapper.md'), 'utf8');
  assert.match(mapper, /hard that choice is to undo/);
});

// ---------- Layout ----------
test('every prompt, method and schema file named in an agent prompt exists, with either maker', async () => {
  for (const r of [run, runSwap]) {
    const { calls } = await r();
    const named = new Set();
    for (const c of calls) for (const m of c.prompt.matchAll(/\b(?:prompts|method|schemas)\/[\w/-]+\.(?:md|json)/g)) named.add(m[0]);
    assert.ok(named.size >= 10, [...named].join(', '));
    for (const p of named) assert.ok(fs.existsSync(path.join(CODESIGN, p)), `missing ${p}`);
  }
});

test('specialistsDir moves every specialist path, including the research identity line', async () => {
  const DIR = `${RUN}/specialists`;
  const base = makeStub();
  const stub = (prompt, opts) => {
    const r = base(prompt, opts);
    if (opts.label.startsWith('onboard:') && r && Array.isArray(r.wrote)) return { ...r, wrote: r.wrote.map((p) => `${RUN}/${p}`) };
    return r;
  };
  const { calls, result } = await runWorkflow(SCRIPT, { args: { ...ARGS, specialistsDir: DIR }, agentStub: stub });
  assert.deepStrictEqual(result.missing, []);
  assert.deepStrictEqual(result.failed, []);
  const onboard = calls.filter((c) => c.opts.label.startsWith('onboard:'));
  for (const c of onboard) assert.ok(c.prompt.includes(`${DIR}/`), c.opts.label);
  for (const c of calls.filter(isResearchCritique)) assert.match(c.prompt, new RegExp(`read ${DIR}/[\\w-]+/knowledge\\.md`));
  for (const c of calls) assert.doesNotMatch(c.prompt, /(^|[\s=`(])specialists\//m, c.opts.label);
});
