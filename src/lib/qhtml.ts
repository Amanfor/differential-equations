/**
 * Single source of truth for question markup.
 *
 * Used by <Practice/>, by the static `data/review.json` endpoint and by review
 * mode, so every place a question appears has exactly the same DOM contract
 * with src/lib/practice-ui.ts.
 */
import { renderTex } from './tex';
import type { Question } from '../data/practice';

export interface QHtmlOptions {
  showTopic?: boolean;
  /** omit the "back to topic" link (review session) */
  bare?: boolean;
}

const LEVEL_LABEL: Record<string, string> = {
  basic: 'basic',
  main: 'JEE Main',
  advanced: 'JEE Advanced',
};

const HINT_LEVELS = ['nudge', 'push', 'nearly there'];
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const esc = (s: string): string =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function questionHTML(q: Question, opts: QHtmlOptions = {}): string {
  const { showTopic = false, bare = false } = opts;
  const accepted = q.accept && q.accept.length ? q.accept : q.answer ? [q.answer] : [];
  const mcq = !!q.options && q.options.length > 0;
  const tags: string[] = [`<span class="tag ${esc(q.level)}">${esc(LEVEL_LABEL[q.level] ?? q.level)}</span>`];
  if (showTopic) tags.push(`<span class="tag">${esc(q.topic)}</span>`);
  if (q.source) tags.push(`<span class="tag">${esc(q.source)}</span>`);

  const optsHtml = mcq
    ? `<ul class="q-opts" data-opts data-correct="${Number(q.correct ?? -1)}">${q
        .options!.map(
          (o, i) =>
            `<li><button type="button" class="q-opt" data-opt="${i}"><span class="k">${
              LETTERS[i] ?? i + 1
            }</span><span class="q-opt-t">${renderTex(o)}</span></button></li>`
        )
        .join('')}</ul>`
    : `<div class="step-fill" data-text-fill><input type="text" spellcheck="false" autocomplete="off" placeholder="your answer" data-text-input><button type="button" class="btn" data-text-check>check</button></div>`;

  const hints = q.hints
    .map(
      (h, i) =>
        `<div class="hint" data-hint data-hindex="${i}"><button type="button" class="btn btn-ghost" data-hint-open>hint ${
          i + 1
        }<span class="h-lvl">${HINT_LEVELS[i]}</span></button><div class="hint-body" data-hint-body>${renderTex(
          h
        )}</div></div>`
    )
    .join('');

  const back = bare
    ? ''
    : `<p class="small">back to <a href="${import.meta.env.BASE_URL}/topics/${esc(q.topic)}/">${esc(
        q.topic
      )}</a></p>`;

  return `<article class="q" id="q-${esc(q.id)}" data-q data-qid="${esc(q.id)}" data-topic="${esc(
    q.topic
  )}" data-level="${esc(q.level)}" data-kind="${mcq ? 'mcq' : 'text'}" data-answer="${esc(
    JSON.stringify(accepted)
  )}">
<div class="q-head">${tags.join('')}<span class="spacer"></span><span class="q-score small" data-score></span></div>
<div class="q-prompt">${renderTex(q.prompt)}</div>
${optsHtml}
<p class="q-msg" data-msg></p>
<div class="hints" data-hints>${hints}
<p class="hint-ctl"><button type="button" class="btn btn-ghost" data-solution-open>show full solution</button><span class="small" data-hint-count></span></p>
</div>
<div class="solution" data-solution><div class="solution-body">${renderTex(q.solution)}</div>${back}</div>
</article>`;
}
