import fs from 'node:fs';
import { normalize, matchesAny } from './src/lib/match.ts';
import { QUESTIONS } from './src/data/practice.ts';
import { TOPICS } from './src/data/topics.ts';
import { CHOOSER } from './src/data/chooser.ts';

const slugs = new Set(TOPICS.map((t) => t.slug));
let errors = 0;
const fail = (m) => { console.log('FAIL ' + m); errors++; };

console.log(`bank: ${QUESTIONS.length} questions, ${CHOOSER.length} chooser items`);

if (QUESTIONS.length === 0) fail('bank is empty');

// id uniqueness
const ids = new Set();
for (const q of QUESTIONS) {
  if (ids.has(q.id)) fail(`duplicate id ${q.id}`);
  ids.add(q.id);
}

// per-question checks
const byTopic = {};
for (const q of QUESTIONS) {
  byTopic[q.topic] = (byTopic[q.topic] ?? 0) + 1;
  if (!slugs.has(q.topic)) fail(`${q.id}: unknown topic "${q.topic}"`);
  if (!['basic', 'main', 'advanced'].includes(q.level)) fail(`${q.id}: bad level ${q.level}`);
  if (!Array.isArray(q.hints) || q.hints.length !== 3) fail(`${q.id}: needs exactly 3 hints, got ${q.hints?.length}`);
  q.hints?.forEach((h, i) => { if (!h || !String(h).trim()) fail(`${q.id}: hint ${i + 1} empty`); });
  if (!q.solution || q.solution.length < 40) fail(`${q.id}: solution too short`);
  if (!q.prompt || !q.prompt.trim()) fail(`${q.id}: empty prompt`);

  const hasOpts = Array.isArray(q.options) && q.options.length > 0;
  if (hasOpts) {
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length)
      fail(`${q.id}: correct index ${q.correct} out of range for ${q.options.length} options`);
  } else {
    if (!q.answer && !(q.accept && q.accept.length)) fail(`${q.id}: free-answer with no answer/accept`);
  }

  // free answers must be self-consistent
  if (!hasOpts) {
    const acc = q.accept?.length ? q.accept : [q.answer];
    if (acc.some((a) => !a || !String(a).trim())) fail(`${q.id}: blank accept entry`);
    // the canonical answer should match one of its own accepted spellings
    if (q.answer && !matchesAny(acc, q.answer)) fail(`${q.id}: answer "${q.answer}" not accepted by its own accept list`);
    // and accept entries should be plain-typable: no stray latex braces needed
    if (acc.some((a) => /\\/.test(a))) fail(`${q.id}: accept entry contains a backslash (student cannot type it)`);
  }
}

console.log('per topic:', byTopic);
const missing = [...slugs].filter((s) => !byTopic[s]);
console.log(missing.length ? `topics still without questions: ${missing.join(', ')}` : 'every topic has questions');

for (const c of CHOOSER) {
  if (!c.id || !c.answer || !c.why) fail(`chooser ${c.id}: incomplete`);
  if (!slugs.has(c.topic)) fail(`chooser ${c.id}: unknown topic`);
}

// free answers: cross-check normalisation is stable
for (const q of QUESTIONS) {
  if (q.options?.length) continue;
  const acc = q.accept?.length ? q.accept : [q.answer];
  if (acc.some((a) => normalize(a) === '')) fail(`${q.id}: accept entry normalises to empty`);
}

console.log(errors === 0 ? '\nALL CHECKS PASSED' : `\n${errors} PROBLEM(S)`);
process.exit(errors === 0 ? 0 : 1);