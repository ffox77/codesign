#!/usr/bin/env node
// Checks a blind packet before a person reads it.
// Usage: node tools/check-blind.mjs <runDir> <slug>...
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MAX_ENTRIES = 8;
const ENTRY_HEADING = /^### T\d+/gm;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Team words and citation marks. A leading word boundary so "unlabeled" and "let alone" pass,
// while "labels", "researchers" and "et al." still fail.
const FIXED_WORDS = ['research', 'label', 'specialist', 'knowledge.md', 'http', 'et al'];

// Signs that a list carries study evidence (figures, study wording, finding/source ids).
const EVIDENCE = [
  { what: 'a finding or source id', re: /\b[FS]\d+\b/ },
  { what: 'a percent sign', re: /%/ },
  { what: '"study"/"studies"', re: /\bstud(y|ies)\b/i },
  { what: '"shown"', re: /\bshown\b/i },
  { what: '"meta-analysis"', re: /meta-analys/i },
  { what: '"survey"', re: /\bsurvey/i },
];

function countEntries(text) {
  return (text.match(ENTRY_HEADING) || []).length;
}

export function checkBlind(runDir, slugs = []) {
  const problems = [];

  const read = (rel) => {
    const file = path.join(runDir, rel);
    if (!fs.existsSync(file)) {
      problems.push(`missing ${rel}`);
      return null;
    }
    return fs.readFileSync(file, 'utf8');
  };

  const list1 = read('blind/list-1.md');
  const list2 = read('blind/list-2.md');
  // Existence only: rubric is fixed text, key names the teams by design.
  read('blind/rubric.md');
  read('key.md');
  const research = read('tensions/research.md');
  const label = read('tensions/label.md');

  const lists = [
    ['blind/list-1.md', list1],
    ['blind/list-2.md', list2],
  ];

  // Entry counts: the reworded lists must keep the same entries as the tensions.
  if (list1 !== null && list2 !== null && research !== null && label !== null) {
    const tensionCounts = [countEntries(research), countEntries(label)].sort((a, b) => a - b);
    const listCounts = [countEntries(list1), countEntries(list2)].sort((a, b) => a - b);
    if (tensionCounts.join(',') !== listCounts.join(',')) {
      problems.push(
        `entry counts changed: tensions have ${tensionCounts.join(' and ')}, ` +
          `blind lists have ${listCounts.join(' and ')}`
      );
    }
  }

  // Entry cap and forbidden text, per blind list.
  const patterns = [
    ...FIXED_WORDS.map((w) => ({ what: `"${w}"`, re: new RegExp(`\\b${escapeRe(w)}`, 'i') })),
    { what: 'a year', re: /\b(19|20)\d\d\b/i },
    ...EVIDENCE,
    ...slugs
      .filter((s) => s)
      .map((s) => ({ what: `slug "${s}"`, re: new RegExp(escapeRe(s), 'i') })),
  ];

  for (const [rel, text] of lists) {
    if (text === null) continue;
    const n = countEntries(text);
    if (n > MAX_ENTRIES) {
      problems.push(`${rel} has ${n} entries; the limit is ${MAX_ENTRIES}`);
    }
    for (const { what, re } of patterns) {
      const m = text.match(re);
      if (m) problems.push(`${rel} contains ${what} ("${m[0]}")`);
    }
  }

  return { ok: problems.length === 0, problems };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const [runDir, ...slugs] = process.argv.slice(2);
  if (!runDir) {
    console.error('usage: node tools/check-blind.mjs <runDir> <slug>...');
    process.exit(1);
  }
  const { ok, problems } = checkBlind(runDir, slugs);
  for (const p of problems) console.log(p);
  console.log(ok ? 'blind packet ok' : `blind packet FAILED (${problems.length} problem(s))`);
  process.exitCode = ok ? 0 : 1;
}
