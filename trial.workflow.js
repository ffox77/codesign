export const meta = {
  name: 'codesign-trial',
  description: 'Codesign trial: baseline, specialist onboarding, blind critiques, tension maps, scrubbed blind packet',
  phases: [
    { title: 'Baseline', detail: 'one agent designs from the brief alone' },
    { title: 'Onboard', detail: 'nine research-protocol calls per specialist' },
    { title: 'Critique', detail: 'one critique per role per team, each alone' },
    { title: 'Map', detail: 'one tension mapper per team' },
    { title: 'Blind', detail: 'Codex scrub, blind order draw, key' },
    { title: 'Judge', detail: 'two Codex judges score both blind lists, one per list order' },
    { title: 'Fold', detail: 'Codex folds both lists into a final design, then compares it with the baseline' },
  ],
}

// args: {runDir, brief, searchBudget, specialists: [{slug, field}]}
const RUN = args.runDir.replace(/\/+$/, '')
const SPECS = args.specialists
// Which provider makes (baseline, onboarding, critiques, mappers); the other referees
// (grader, scrub, judges, fold, compare). The tell-check is Claude either way.
const MAKERS = args.makers === undefined ? 'claude' : args.makers
if (MAKERS !== 'claude' && MAKERS !== 'codex') {
  const msg = `makers must be "claude" or "codex", not ${JSON.stringify(args.makers)}`
  log(msg)
  throw new Error(msg)
}
const PROTOCOL = 'method/research-protocol.md'
const DISCIPLINE = 'method/discipline.md'
const RUBRIC = 'method/rubric.md'
const WRAPPER = 'prompts/wrappers/codex-wrapper.md'
const MAKER_WRAPPER = 'prompts/wrappers/codex-maker-wrapper.md'
// Where specialists live: reusable ones in specialists/ (the default); a test run can keep its own
// under its run folder, for example runs/<name>/specialists.
const SPEC_ROOT = (args.specialistsDir || 'specialists').replace(/\/+$/, '')
const specDir = (spec) => `${SPEC_ROOT}/${spec.slug}`
const REPO_LINE = 'REPO=the repo root (run `git rev-parse --show-toplevel`)'
const OUT_LINE = 'OUT_FILE=a new file inside a fresh `mktemp -d` folder (outside the repo)'

// Every onboarding step reports the repo-relative paths it wrote or appended to,
// and blocked="" on success or one line saying why the step could not be done.
const STEP_REPORT_PROPS = {
  wrote: { type: 'array', items: { type: 'string' } },
  blocked: { type: 'string' },
}
const STEP = {
  type: 'object',
  additionalProperties: false,
  required: ['wrote', 'blocked'],
  properties: STEP_REPORT_PROPS,
}
const STEP_LINE =
  'Return structured output: wrote = the repo-relative paths you wrote or appended to; ' +
  'blocked = an empty string on success, or one line saying why you could not do the step.'

const TASKS = {
  type: 'object',
  additionalProperties: false,
  required: ['items', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    items: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'kind', 'text', 'excellent'],
        properties: {
          id: { type: 'string' },
          kind: { type: 'string', enum: ['task', 'probe'] },
          text: { type: 'string' },
          excellent: { type: 'string' },
        },
      },
    },
  },
}

const CRITIQUE = {
  type: 'object',
  required: ['wrong', 'requirements', 'conflicts', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    wrong: { type: 'array', items: { type: 'string' } },
    requirements: { type: 'array', items: { type: 'string' } },
    conflicts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['withRole', 'about'],
        properties: { withRole: { type: 'string' }, about: { type: 'string' } },
      },
    },
  },
}

const TENSIONS = {
  type: 'object',
  required: ['foundBeforeCut', 'tensions', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    foundBeforeCut: { type: 'integer' },
    tensions: {
      type: 'array',
      maxItems: 8,
      items: {
        type: 'object',
        required: ['title', 'roles', 'side1', 'side2', 'settle'],
        properties: {
          title: { type: 'string' },
          roles: { type: 'string' },
          side1: { type: 'string' },
          side2: { type: 'string' },
          settle: { type: 'string' },
        },
      },
    },
  },
}

// schemas/grade.json plus slug and the step report. Counts are computed here, from the lists.
const CHECK = {
  type: 'object',
  required: ['slug', 'items', 'findingsKept', 'findingsDropped', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    slug: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'verdict', 'reason', 'drivenBy'],
        properties: {
          id: { type: 'string' },
          verdict: { type: 'string', enum: ['improved', 'same', 'worse'] },
          reason: { type: 'string' },
          drivenBy: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    findingsKept: { type: 'array', items: { type: 'string' } },
    findingsDropped: { type: 'array', items: { type: 'string' } },
  },
}

const SCRUB_RESULT = {
  type: 'object',
  required: ['list1Count', 'list2Count'],
  properties: { list1Count: { type: 'integer' }, list2Count: { type: 'integer' } },
}

// Tell-check answer: only whether either blind list reads as drawing on research the other lacks.
const TELL = {
  type: 'object',
  additionalProperties: false,
  required: ['tell'],
  properties: { tell: { type: 'boolean' } },
}

// schemas/judge.json plus the step report. One item per blind entry, in order.
const JUDGE_ITEMS = {
  type: 'array',
  items: {
    type: 'object',
    required: ['id', 'mark', 'inBaseline', 'reason'],
    properties: {
      id: { type: 'string' },
      mark: { type: 'string', enum: ['real', 'obvious', 'noise'] },
      inBaseline: { type: 'boolean' },
      reason: { type: 'string' },
    },
  },
}
const JUDGE = {
  type: 'object',
  required: ['first', 'second', 'preferred', 'why', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    first: JUDGE_ITEMS,
    second: JUDGE_ITEMS,
    preferred: { type: 'string', enum: ['first', 'second'] },
    why: { type: 'string' },
  },
}

// schemas/fold.json and schemas/compare.json minus the markdown (written to file), plus the step report.
const FOLD = {
  type: 'object',
  required: ['decisions', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    decisions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['entry', 'outcome', 'how'],
        properties: {
          entry: { type: 'string' },
          outcome: { type: 'string', enum: ['settled', 'open', 'rejected'] },
          how: { type: 'string' },
        },
      },
    },
  },
}
const COMPARE = {
  type: 'object',
  required: ['changes', 'briefGaps', 'wrote', 'blocked'],
  properties: {
    ...STEP_REPORT_PROPS,
    changes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['section', 'change', 'entries'],
        properties: {
          section: { type: 'string' },
          change: { type: 'string' },
          entries: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    briefGaps: {
      type: 'array',
      items: {
        type: 'object',
        required: ['entry', 'why', 'briefLine'],
        properties: { entry: { type: 'string' }, why: { type: 'string' }, briefLine: { type: 'string' } },
      },
    },
  },
}

// phase() once per title, in first-use order (branches run concurrently).
const entered = new Set()
const enter = (title) => {
  if (!entered.has(title)) {
    entered.add(title)
    phase(title)
  }
}

// An onboarding failure ends only that specialist's chain (pipeline turns it into null),
// so log it too: the reason must reach the run log, not vanish with the branch.
const fail = (label, reason) => {
  const msg = `${label} failed: ${reason}`
  log(msg)
  const e = new Error(msg)
  e.logged = true
  throw e
}

// Logs an error unless fail() already did.
const logError = (label, e) => {
  if (!(e && e.logged)) log(`${label} failed: ${e && e.message ? e.message : String(e)}`)
}

// Throws unless the step reports success and names its expected output file
// (the full repo-relative path, or an absolute path ending in "/" + that full path; a leading
// "./" is ignored). Matching the full path, not just the file name, rejects another slug's file.
const normPath = (p) => p.replace(/^\.\//, '')
const samePath = (p, expected) => {
  const e = normPath(expected)
  const n = normPath(p)
  return n === e || n.endsWith(`/${e}`)
}
const checkStep = (label, r, expected) => {
  if (r === null || r === undefined) fail(label, 'returned nothing')
  if (typeof r !== 'object') fail(label, `returned no step report: ${String(r).slice(0, 200)}`)
  // An agent may echo the empty value literally as "" or '': that is success too.
  const blocked = typeof r.blocked === 'string' ? r.blocked.trim().replace(/^(""|'')$/, '') : ''
  if (blocked !== '') fail(label, `blocked: ${blocked}`)
  const wrote = Array.isArray(r.wrote) ? r.wrote : []
  const hit = wrote.some((p) => typeof p === 'string' && samePath(p, expected))
  if (!hit) fail(label, `did not write ${expected} (wrote: ${wrote.join(', ') || 'nothing'})`)
  return r
}

const values = (lines) => lines.join('\n')

// Codex output schemas need additionalProperties: false and every property required, at every level.
const strict = (schema) => {
  if (!schema || typeof schema !== 'object') return schema
  const out = { ...schema }
  if (out.properties) {
    out.properties = Object.fromEntries(Object.entries(out.properties).map(([k, v]) => [k, strict(v)]))
    out.additionalProperties = false
    out.required = Object.keys(out.properties)
  }
  if (out.items) out.items = strict(out.items)
  return out
}

// A making step: Claude does it, or a Claude wrapper hands the same task text to Codex.
const make = (prompt, opts, search = false) =>
  MAKERS === 'claude'
    ? agent(prompt, opts)
    : agent(
        values([
          `Follow ${MAKER_WRAPPER} with these values:`,
          `SEARCH=${search ? 'yes' : 'no'}`,
          `SCHEMA_JSON=${JSON.stringify(strict(opts.schema))}`,
          OUT_LINE,
          REPO_LINE,
          'TASK=',
          prompt,
        ]),
        opts
      )

// A refereeing step's opening lines: a Claude wrapper runs it on Codex, or Claude does it itself.
// SRC names the step's JSON answer in the caller lines that follow.
const SRC = MAKERS === 'claude' ? "Codex's JSON" : 'the JSON'
const refereeHead = (name, schema, inputs) =>
  MAKERS === 'claude'
    ? [`Follow ${WRAPPER} with these values:`, `PROMPT_FILE=prompts/referee/${name}.md`, `INPUTS=${inputs}`, `SCHEMA=schemas/${schema}.json`, OUT_LINE, REPO_LINE]
    : [
        `Do the task in prompts/referee/${name}.md yourself, with these values: ${inputs}`,
        `Read only the files that prompt names, and do not edit them. Shape your answer as schemas/${schema}.json describes; that answer is the JSON.`,
      ]

// ---------- Short role names ----------
// One "Roles: A, B" format in both tension lists, from names picked here rather than from mapper
// text: each field line up to its first colon, lowercased. A name that would trip the blind check
// stops the run before any agent starts.
const ROLE_NAMES = SPECS.map((s) => s.field.split(':')[0].trim().toLowerCase())
const ROLE_NAME_BAD =
  /\b(research|label|specialist|knowledge\.md|http|et al)|\b(19|20)\d\d\b|%|\bstud(y|ies)\b|\bshown\b|meta-analys|\bsurvey|\b[fs]\d+\b/i
ROLE_NAMES.forEach((name, i) => {
  const slug = SPECS[i].slug
  let why = null
  if (!name) why = 'is empty'
  else if (ROLE_NAME_BAD.test(name)) why = `contains "${name.match(ROLE_NAME_BAD)[0]}"`
  else if (name.includes(slug.toLowerCase())) why = 'contains the slug'
  else if (ROLE_NAMES.indexOf(name) !== i) why = 'is the same as another role name'
  if (why) {
    const msg = `role name "${name}" (from the field line of specialist ${i + 1}) ${why}; reword the field line before its first colon`
    log(msg)
    throw new Error(msg)
  }
})
const ROLE_NAME_LINES = ROLE_NAMES.map((n) => `- ${n}`)

// ---------- Baseline ----------
// A missing baseline would leave every critique criticizing nothing: fail the whole run.
enter('Baseline')
checkStep(
  'baseline',
  await make(
    values([
      'Follow prompts/make/baseline.md with these values:',
      `BRIEF=${args.brief}`,
      `DISCIPLINE=${DISCIPLINE}`,
      `RUN_DIR=${RUN}`,
      STEP_LINE,
    ]),
    { label: 'baseline', phase: 'Baseline', schema: STEP }
  ),
  `${RUN}/baseline.md`
)

// ---------- Shared critique prompt ----------
const READINGS = [args.brief, `${RUN}/baseline.md`]
const ROLES = SPECS.map((s) => `- ${s.field}`)
// Field lines read as noun phrases mid-sentence: "an expert in the daily user".
const lc = (field) => field.charAt(0).toLowerCase() + field.slice(1)

const critiquePrompt = (team, spec, identity) =>
  values([
    'Follow prompts/make/critique.md with these values:',
    `IDENTITY=${identity}`,
    `SLUG=${spec.slug}`,
    'ROLES=',
    ...ROLES,
    `RUN_DIR=${RUN}`,
    `BRIEF=${args.brief}`,
    'READINGS=',
    ...READINGS.map((p) => `- ${p}`),
    `OUT_FILE=${RUN}/critiques/${team}/${spec.slug}.md`,
    STEP_LINE,
  ])

// Research slug i -> critique-(2i+1), label slug i -> critique-(2i+2).
const critiqueLabel = (team, i) => `critique-${team === 'research' ? 2 * i + 1 : 2 * i + 2}`

// Never throws: returns {label, out}, with out null when the critique failed (already logged).
const critique = async (team, spec, i, identity) => {
  const label = critiqueLabel(team, i)
  const out = `${RUN}/critiques/${team}/${spec.slug}.md`
  try {
    checkStep(label, await make(critiquePrompt(team, spec, identity), { label, phase: 'Critique', schema: CRITIQUE }), out)
    return { label, out }
  } catch (e) {
    logError(label, e)
    return { label, out: null }
  }
}

// Returns the mapper's result, or null when it was skipped or failed (logged either way).
const mapper = async (team, label, critiquePaths) => {
  enter('Map')
  if (critiquePaths.length === 0) {
    log(`${label} skipped: no critiques survived`)
    return null
  }
  const out = `${RUN}/tensions/${team}.md`
  try {
    return checkStep(
      label,
      await make(
        values([
          'Follow prompts/make/mapper.md with these values:',
          `RUN_DIR=${RUN}`,
          'CRITIQUE_PATHS=',
          ...critiquePaths.map((p) => `- ${p}`),
          'ROLE_NAMES=',
          ...ROLE_NAME_LINES,
          `OUT_FILE=${out}`,
          'Also return the kept tensions and the count found before the cut as structured output.',
          STEP_LINE,
        ]),
        { label, phase: 'Map', schema: TENSIONS }
      ),
      out
    )
  } catch (e) {
    logError(label, e)
    return null
  }
}

// ---------- Onboarding steps ----------
const step = (n, spec, extra) =>
  `Do Step ${n} of ${PROTOCOL} for specialist ${spec.slug} (field: ${spec.field}), ` +
  `working in ${specDir(spec)}/${extra || ''}.`
const budgetNote = `, search budget ${args.searchBudget}`

const probePrompt = (spec, tasks) => {
  const out = `${specDir(spec)}/baseline-answers.md`
  const items = tasks.items.map((it) => `### ${it.id}\n${it.text}`)
  return values([
    'Answer each item below from your own knowledge only.',
    'Do not read files, do not search, and do not use any tool except to write your answers file.',
    'Give one answer per item, under a heading matching the item (### K1, ### Q1, and so on).',
    'Answer every item as well as you can; do not skip one for lack of certainty.',
    `Write the answers to ${out}.`,
    STEP_LINE,
    '',
    ...items,
  ])
}

const graderPrompt = (spec) =>
  values([
    ...refereeHead('grader', 'grade', `SPEC_DIR=${specDir(spec)}`),
    `Then, as the caller, write ${specDir(spec)}/check.md from ${SRC}, in the format of ` +
      `Step 7b of ${PROTOCOL}: ## Items, the fixed ## Counts block (counts computed from the lists), ## Kept, ## Dropped.`,
    `Return ${SRC} unchanged, plus slug=${spec.slug}.`,
    `Also return wrote = the repo-relative paths you wrote (check.md among them), and blocked = an empty string on success, ` +
      'or one line saying why you could not grade or write check.md.',
  ])

const onboard = (spec) => async () => {
  const L = (s) => `onboard:${spec.slug}:${s}`
  const run = async (s, prompt, file, schema = STEP) => {
    const opts = { label: L(s), phase: 'Onboard', schema }
    const r = s === 'check-grade' ? await agent(prompt, opts) : await make(prompt, opts, s === 'search')
    return checkStep(L(s), r, `${specDir(spec)}/${file}`)
  }
  const withLine = (p) => `${p} ${STEP_LINE}`

  await run('plan', withLine(step(1, spec, budgetNote)), 'plan.md')
  await run('viewpoints', withLine(step(2, spec)), 'plan.md')
  const tasks = await run('tasks', withLine(step(3, spec) + ' Return the items as structured output too.'), 'tasks.md', TASKS)
  if (!Array.isArray(tasks.items) || tasks.items.length === 0) fail(L('tasks'), 'returned no items')
  await run('probe', probePrompt(spec, tasks), 'baseline-answers.md')
  await run('search', withLine(step(5, spec, budgetNote)), 'sources.md')
  await run('extract', withLine(step(6, spec)), 'extracts.md')
  await run('check-answer', withLine(step('7a', spec)), 'check-answers.md')
  const grade = await run('check-grade', graderPrompt(spec), 'check.md', CHECK)
  if (!Array.isArray(grade.items) || grade.items.length === 0) fail(L('check-grade'), 'grade has zero items')
  await run('compress', withLine(step(8, spec)), 'knowledge.md')
  return grade
}

const counts = (grade) => {
  const n = (v) => grade.items.filter((it) => it.verdict === v).length
  return {
    improved: n('improved'),
    same: n('same'),
    worse: n('worse'),
    total: grade.items.length,
    findingsKept: grade.findingsKept.length,
    findingsDropped: grade.findingsDropped.length,
  }
}

// ---------- Research side and label side, concurrently ----------
enter('Onboard')
const [researchSide, labelSide] = await parallel([
  async () => {
    const chains = await pipeline(
      SPECS,
      (spec) => onboard(spec)(),
      async (grade, spec, i) => {
        enter('Critique')
        const identity =
          `You are the specialist on this team for: ${lc(spec.field)}. ` +
          `Load your knowledge first: read ${specDir(spec)}/knowledge.md.`
        const c = await critique('research', spec, i, identity)
        return { grade, ...c }
      }
    )
    const outs = chains.filter((c) => c && c.out).map((c) => c.out)
    const tensions = await mapper('research', 'mapper-a', outs)
    return { chains, tensions }
  },
  async () => {
    enter('Critique')
    const crits = await parallel(
      SPECS.map((spec, i) => () => critique('label', spec, i, `You are an expert in ${lc(spec.field)}.`))
    )
    const outs = crits.filter((c) => c && c.out).map((c) => c.out)
    const tensions = await mapper('label', 'mapper-b', outs)
    return { crits, tensions }
  },
])

// ---------- Failures, by neutral label ----------
// `missing` is for onboarding (a specialist with no grade); `failed` names every critique, mapper
// or blind step that produced no output. Critique and mapper labels do not reveal the list order.
const chains = (researchSide && researchSide.chains) || SPECS.map(() => null)
const failed = []
chains.forEach((c) => {
  if (c && !c.out) failed.push(c.label)
})
SPECS.forEach((spec, i) => {
  const c = labelSide && labelSide.crits ? labelSide.crits[i] : null
  if (!c || !c.out) failed.push(critiqueLabel('label', i))
})
if (!researchSide || !researchSide.tensions) failed.push('mapper-a')
if (!labelSide || !labelSide.tensions) failed.push('mapper-b')

// Agent calls in the blind phase: a throw counts as no result, and is logged.
const blindAgent = async (label, prompt, schema) => {
  try {
    return await agent(prompt, { label, phase: 'Blind', schema })
  } catch (e) {
    logError(label, e)
    return null
  }
}

// ---------- Blind packet ----------
enter('Blind')
let scrub = null
let tell = null
let scrubSkipped = null
const mappersFailed = ['mapper-a', 'mapper-b'].filter((l) => failed.includes(l))
if (mappersFailed.length > 0) {
  scrubSkipped = `${mappersFailed.join(' and ')} produced no tensions file`
  log(`scrub and tell-check skipped: ${scrubSkipped}`)
} else {
  scrub = await blindAgent(
    'scrub',
    values([
      ...refereeHead('scrub', 'scrub', `LIST_A_PATH=${RUN}/tensions/research.md, LIST_B_PATH=${RUN}/tensions/label.md`),
      'Then, as the caller:',
      '1. Draw the blind order with `echo $((RANDOM % 2))`. Use the draw to decide which of list A and list B becomes list-1; the other becomes list-2.',
      `2. Write ${RUN}/blind/list-1.md and ${RUN}/blind/list-2.md from ${SRC}, one entry per item, in order, numbered from T1, in exactly this form:`,
      '   ### T<n>: <title>',
      '   Roles: <role names>',
      '   Side 1: <side1>',
      '   Side 2: <side2>',
      '   Would settle it: <settle>',
      '   For Roles, do not copy the item\'s roles text. Write the roles it names using only these short names, ' +
        'the role behind Side 1 first, joined by ", " (for example "A, B"):',
      ...ROLE_NAME_LINES.map((l) => `   ${l}`),
      "   No \"Found before cut:\" line. Add nothing else.",
      "3. Check that each list's `### T` count equals its source tensions file's `### T` count. If not, stop and fail loudly.",
      `4. Write ${RUN}/key.md: the draw value, and which tensions file each blind list came from.`,
      `5. Copy ${RUBRIC} to ${RUN}/blind/rubric.md.`,
      'Return only the two entry counts, by list number. Say nothing about which list is which.',
    ]),
    SCRUB_RESULT
  )
  if (!scrub) {
    failed.push('scrub')
    log('tell-check skipped: scrub failed')
  } else {
    // One neutral read of both lists. It is not told how the lists were made or which is which.
    tell = await blindAgent(
      'tell-check',
      values([
        `Read only these two files: ${RUN}/blind/list-1.md and ${RUN}/blind/list-2.md.`,
        'Do not read, search or open anything else, and do not write or edit any file.',
        'Both lists describe conflicts in the same design, in the same format.',
        'Question: does either list read as drawing on research that the other list lacks? Signs include ' +
          'findings from studies or surveys, measured figures or percentages, effect or sample sizes, named ' +
          'organizations or incidents used as evidence, citations or source ids, and wording such as ' +
          '"studies show" or "has been shown".',
        'Return tell = true if a reader could tell the lists apart that way, otherwise tell = false. Return nothing else.',
      ]),
      TELL
    )
    if (!tell || typeof tell.tell !== 'boolean') failed.push('tell-check')
  }
}

// ---------- Judges ----------
// A second scorer beside the person: Codex marks each blind entry real / obvious / noise and says
// whether the baseline already raised it. Two calls, one per list order, since judges tend to
// favor whichever list they see first. Judges see list numbers only, never tensions or the key.
let judge = null
let judgesAgree = null
if (scrub) {
  enter('Judge')
  const judgeRun = async (n) => {
    const label = `judge-${n}`
    const firstShown = n
    const secondShown = 3 - n
    const out = `${RUN}/judge/${label}.json`
    try {
      const r = checkStep(
        label,
        await agent(
          values([
            ...refereeHead(
              'judge',
              'judge',
              `FIRST_PATH=${RUN}/blind/list-${firstShown}.md, SECOND_PATH=${RUN}/blind/list-${secondShown}.md, ` +
                `BRIEF_PATH=${args.brief}, BASELINE_PATH=${RUN}/baseline.md`
            ),
            `Then, as the caller, write ${SRC} unchanged to ${out}.`,
            `Return ${SRC} unchanged.`,
            `Also return wrote = the repo-relative paths you wrote (${out} among them), and blocked = an empty string ` +
              'on success, or one line saying why you could not judge or write the file.',
          ]),
          { label, phase: 'Judge', schema: JUDGE }
        ),
        out
      )
      const want = { first: scrub[`list${firstShown}Count`], second: scrub[`list${secondShown}Count`] }
      for (const side of ['first', 'second']) {
        const got = Array.isArray(r[side]) ? r[side].length : 0
        if (got !== want[side]) fail(label, `${side} list has ${got} entries; the blind list has ${want[side]}`)
      }
      const tally = (items) => ({
        real: items.filter((it) => it.mark === 'real').length,
        obvious: items.filter((it) => it.mark === 'obvious').length,
        noise: items.filter((it) => it.mark === 'noise').length,
        realNew: items.filter((it) => it.mark === 'real' && it.inBaseline === false).length,
        total: items.length,
      })
      return {
        firstShown,
        preferred: r.preferred === 'first' ? firstShown : secondShown,
        [`list-${firstShown}`]: tally(r.first),
        [`list-${secondShown}`]: tally(r.second),
      }
    } catch (e) {
      logError(label, e)
      failed.push(label)
      return null
    }
  }
  const judged = await parallel([() => judgeRun(1), () => judgeRun(2)])
  judge = judged.filter(Boolean).map((j) => ({ firstShown: j.firstShown, preferred: j.preferred, 'list-1': j['list-1'], 'list-2': j['list-2'] }))
  if (judge.length === 2) judgesAgree = judge[0].preferred === judge[1].preferred
}

// ---------- Fold and compare ----------
// Codex revises the baseline against both blind lists into final.md, then a separate call compares
// final.md with the baseline and names the conflicts the brief should have stated. Both read the
// blind lists only, so entries are named by list number ("list-1 T3"), never by team.
let fold = null
let compare = null
if (scrub) {
  enter('Fold')
  const listInputs = `LIST_1_PATH=${RUN}/blind/list-1.md, LIST_2_PATH=${RUN}/blind/list-2.md`
  const baseInputs = `BRIEF_PATH=${args.brief}, BASELINE_PATH=${RUN}/baseline.md`
  const refereeStep = (name, inputs, out, keep) =>
    values([
      ...refereeHead(name, name, inputs),
      `Then, as the caller, write the JSON's markdown field, unchanged, to ${out}.`,
      `Return the JSON's ${keep} unchanged, without the markdown field.`,
      `Also return wrote = the repo-relative paths you wrote (${out} among them), and blocked = an empty string ` +
        'on success, or one line saying why you could not run the step or write the file.',
    ])
  const ENTRY_RE = /^list-([12]) T(\d+)$/
  const counts12 = { 1: scrub.list1Count, 2: scrub.list2Count }
  const known = (e) => {
    const m = typeof e === 'string' ? e.trim().match(ENTRY_RE) : null
    return m && Number(m[2]) >= 1 && Number(m[2]) <= counts12[m[1]] ? `list-${m[1]} T${Number(m[2])}` : null
  }

  const foldOut = `${RUN}/final.md`
  try {
    const r = checkStep(
      'fold',
      await agent(refereeStep('fold', `${baseInputs}, ${listInputs}`, foldOut, 'decisions field'), {
        label: 'fold',
        phase: 'Fold',
        schema: FOLD,
      }),
      foldOut
    )
    const decisions = Array.isArray(r.decisions) ? r.decisions : []
    const ids = decisions.map((d) => known(d && d.entry))
    const bad = decisions.filter((d, i) => !ids[i]).map((d) => (d && d.entry) || '?')
    if (bad.length) fail('fold', `unknown entries: ${bad.join(', ')}`)
    const want = counts12[1] + counts12[2]
    if (new Set(ids).size !== want) fail('fold', `decided ${new Set(ids).size} distinct entries; the blind lists have ${want}`)
    const byList = (n) => {
      const mine = decisions.filter((d, i) => ids[i].startsWith(`list-${n} `))
      return {
        settled: mine.filter((d) => d.outcome === 'settled').length,
        open: mine.filter((d) => d.outcome === 'open').length,
        rejected: mine.filter((d) => d.outcome === 'rejected').length,
      }
    }
    fold = { 'list-1': byList(1), 'list-2': byList(2) }
  } catch (e) {
    logError('fold', e)
    failed.push('fold')
  }

  if (fold) {
    const compareOut = `${RUN}/compare.md`
    try {
      const r = checkStep(
        'compare',
        await agent(
          refereeStep('compare', `${baseInputs}, FINAL_PATH=${foldOut}, ${listInputs}`, compareOut, 'changes and briefGaps fields'),
          { label: 'compare', phase: 'Fold', schema: COMPARE }
        ),
        compareOut
      )
      const changes = Array.isArray(r.changes) ? r.changes : []
      const drove = (n) =>
        changes.filter((c) => Array.isArray(c.entries) && c.entries.some((e) => (known(e) || '').startsWith(`list-${n} `))).length
      compare = {
        changes: changes.length,
        changesByList: { 'list-1': drove(1), 'list-2': drove(2) },
        briefGaps: (Array.isArray(r.briefGaps) ? r.briefGaps : []).map((g) => known(g && g.entry)).filter(Boolean),
      }
    } catch (e) {
      logError('compare', e)
      failed.push('compare')
    }
  }
}

// ---------- Result: counts per list number and paths, never a team or slug ----------
const checks = []
const missing = []
chains.forEach((c, i) => {
  if (c) checks.push({ specialist: i + 1, ...counts(c.grade) })
  else missing.push(i + 1)
})
const ORDER = ['mapper-a', 'mapper-b', 'scrub', 'tell-check', 'judge-1', 'judge-2', 'fold', 'compare']
const rank = (l) => (/^critique-\d+$/.test(l) ? Number(l.slice(9)) : 100 + ORDER.indexOf(l))
failed.sort((a, b) => rank(a) - rank(b))

return {
  checks,
  missing,
  failed,
  lists: scrub ? { 'list-1': scrub.list1Count, 'list-2': scrub.list2Count } : null,
  scrubSkipped,
  tellCheck: tell && typeof tell.tell === 'boolean' ? tell.tell : null,
  judge,
  judgesAgree,
  fold,
  compare,
  paths: [
    `${RUN}/baseline.md`,
    `${RUN}/blind/list-1.md`,
    `${RUN}/blind/list-2.md`,
    `${RUN}/blind/rubric.md`,
    `${RUN}/key.md`,
    `${RUN}/final.md`,
    `${RUN}/compare.md`,
  ],
}
