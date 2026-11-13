import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkBlind } from '../tools/check-blind.mjs';

const SLUG = 'codesign-org-learning';

// n entries in the entry format. Bodies avoid every forbidden word.
function entries(n) {
  return Array.from({ length: n }, (_, i) =>
    `### T${i + 1}: Schedule and staffing pull in opposite directions ${i + 1}\n` +
    'Roles: Editor and maintainer\n' +
    'Side 1: Keep the release date fixed\n' +
    'Side 2: Let the release date move\n' +
    'Would settle it: A monthly joint review\n'
  ).join('\n');
}

// Builds a run dir in a fresh temp dir; removed after the test.
function makeRun(t, opts = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'check-blind-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const o = { n1: 5, n2: 7, tr: 5, tl: 7, rubric: true, key: true, ...opts };
  const files = {
    'blind/list-1.md': o.list1 ?? entries(o.n1),
    'blind/list-2.md': o.list2 ?? entries(o.n2),
    'tensions/research.md': 'Found before cut: 9\n\n' + entries(o.tr),
    'tensions/label.md': 'Found before cut: 9\n\n' + entries(o.tl),
  };
  if (o.rubric) files['blind/rubric.md'] = '# Rubric\n\nReal / obvious / noise\n';
  if (o.key) files['key.md'] = '# Key\n\nlist-1 is research\n';
  for (const [rel, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), text);
  }
  return dir;
}

test('passes a clean packet', (t) => {
  const dir = makeRun(t);
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, true, result.problems.join('\n'));
  assert.deepStrictEqual(result.problems, []);
});

test('flags a citation', (t) => {
  const dir = makeRun(t, { list1: entries(5) + '\nNotes: Smith et al. 2019 covered this.\n' });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
  assert.ok(result.problems.some((p) => p.includes('list-1')), result.problems.join('\n'));
});

test('flags a URL', (t) => {
  const dir = makeRun(t, { list2: entries(7) + '\nNotes: see https://example.com\n' });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
  assert.ok(result.problems.some((p) => p.includes('list-2')), result.problems.join('\n'));
});

test('flags the word "research"', (t) => {
  const dir = makeRun(t, { list1: entries(5) + '\nNotes: the Research desk\n' });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
});

test('flags a slug', (t) => {
  const dir = makeRun(t, { list1: entries(5) + `\nNotes: ${SLUG}\n` });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
});

test('flags more than 8 entries', (t) => {
  const dir = makeRun(t, { n1: 9, n2: 9, tr: 9, tl: 9 });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
  assert.ok(result.problems.some((p) => p.includes('8')), result.problems.join('\n'));
});

test('flags changed counts', (t) => {
  // Tensions have 5 and 7; lists have 5 and 6.
  const dir = makeRun(t, { n1: 5, n2: 6, tr: 5, tl: 7 });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
  assert.ok(result.problems.some((p) => /count/i.test(p)), result.problems.join('\n'));
});

test('flags a missing key.md', (t) => {
  const dir = makeRun(t, { key: false });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
  assert.ok(result.problems.some((p) => p.includes('key.md')), result.problems.join('\n'));
});

test('flags a missing rubric.md', (t) => {
  const dir = makeRun(t, { rubric: false });
  const result = checkBlind(dir, [SLUG]);
  assert.strictEqual(result.ok, false);
  assert.ok(result.problems.some((p) => p.includes('rubric.md')), result.problems.join('\n'));
});

// Study evidence that survives the scrub tells the reader which list had research.
const flagsNote = (note, label) =>
  test(`flags ${label}`, (t) => {
    const dir = makeRun(t, { list1: entries(5) + `\nNotes: ${note}\n` });
    const result = checkBlind(dir, [SLUG]);
    assert.strictEqual(result.ok, false, `not flagged: ${note}`);
    assert.ok(result.problems.some((p) => p.includes('list-1')), result.problems.join('\n'));
  });

flagsNote('as F9 found, reviews help', 'a finding id');
flagsNote('see S12 for details', 'a source id');
flagsNote('about a 25% improvement', 'a percent sign');
flagsNote('one study found this', '"study"');
flagsNote('studies agree on this', '"studies"');
flagsNote('this has been shown before', '"shown"');
flagsNote('a meta-analysis of debriefs', '"meta-analysis"');
flagsNote('a survey of managers', '"survey"');
flagsNote('written in knowledge.md', '"knowledge.md"');

const passesNote = (note, label) =>
  test(`does not flag ${label}`, (t) => {
    const dir = makeRun(t, { list1: entries(5) + `\nNotes: ${note}\n` });
    const result = checkBlind(dir, [SLUG]);
    assert.strictEqual(result.ok, true, result.problems.join('\n'));
  });

passesNote('keep it short, let alone a weekly review', '"let alone" as "et al"');
passesNote('unlabeled entries pile up', '"unlabeled" as "label"');
passesNote('Side 1 and Side 2 stay apart', 'side numbers as ids');
