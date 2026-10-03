/**
 * Client behaviour for practice questions:
 *   - multiple choice and free-answer checking
 *   - a three-rung hint ladder the student climbs at their own pace
 *   - full solution reveal
 *   - mastery recording into localStorage (attempted / correct / hints used)
 */
import { progress } from './progress';
import { matchesAny } from './match';

interface State {
  hints: number;
  answered: boolean;
  correct: boolean;
}

const states = new WeakMap<HTMLElement, State>();

function stateOf(q: HTMLElement): State {
  let s = states.get(q);
  if (!s) {
    s = { hints: 0, answered: false, correct: false };
    states.set(q, s);
  }
  return s;
}

function updateScore(q: HTMLElement): void {
  const s = stateOf(q);
  const out = q.querySelector<HTMLElement>('[data-score]');
  if (out) out.textContent = s.answered ? (s.correct ? 'solved' : 'not yet') : '';
  const cnt = q.querySelector<HTMLElement>('[data-hint-count]');
  if (cnt) cnt.textContent = s.hints > 0 ? `${s.hints} hint${s.hints > 1 ? 's' : ''} used` : '';
}

function record(q: HTMLElement, correct: boolean): void {
  const s = stateOf(q);
  if (s.answered && s.correct && correct) return; // don't double count a re-check
  s.answered = true;
  s.correct = s.correct || correct;
  q.setAttribute('data-state', correct ? 'right' : 'wrong');
  progress.record({
    questionId: q.dataset.qid ?? '',
    topic: q.dataset.topic ?? '',
    correct,
    hints: s.hints,
  });
  updateScore(q);
  window.dispatchEvent(new CustomEvent('de:progress'));
}

function check(q: HTMLElement, given: string): void {
  const msg = q.querySelector<HTMLElement>('[data-msg]');
  const accepted = JSON.parse(q.getAttribute('data-answer') || '[]') as string[];
  const ok = matchesAny(accepted, given);
  if (msg) {
    msg.textContent = ok
      ? 'correct.'
      : 'not yet — take a hint and come back, or check the solution when you are ready.';
    msg.className = 'q-msg ' + (ok ? 'ok' : 'no');
  }
  if (ok) {
    const opts = q.querySelector<HTMLElement>('[data-opts]');
    opts?.setAttribute('data-done', '');
  }
  record(q, ok);
}

export function initPractice(scope: Document | HTMLElement): void {
  const root = scope as HTMLElement;
  root.querySelectorAll<HTMLElement>('[data-q]').forEach((q) => {
    if (q.hasAttribute('data-bound')) return;
    q.setAttribute('data-bound', '');
    stateOf(q);
    updateScore(q);

    const opts = q.querySelector<HTMLElement>('[data-opts]');
    const correctIdx = Number(opts?.getAttribute('data-correct') ?? -1);

    opts?.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (opts.hasAttribute('data-done')) return;
        const i = Number(btn.dataset.opt);
        const ok = i === correctIdx;
        opts.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach((b) => {
          const bi = Number(b.dataset.opt);
          if (bi === correctIdx) b.setAttribute('data-state', 'right');
          else if (b === btn) b.setAttribute('data-state', 'wrong');
        });
        opts.setAttribute('data-done', '');
        const msg = q.querySelector<HTMLElement>('[data-msg]');
        if (msg) {
          msg.textContent = ok ? 'correct.' : 'not the one — the correct option is highlighted. read the solution when you want to.';
          msg.className = 'q-msg ' + (ok ? 'ok' : 'no');
        }
        record(q, ok);
      });
    });

    const textWrap = q.querySelector<HTMLElement>('[data-text-fill]');
    if (textWrap) {
      const input = textWrap.querySelector<HTMLInputElement>('[data-text-input]');
      const btn = textWrap.querySelector<HTMLButtonElement>('[data-text-check]');
      const go = () => {
        if (!input) return;
        check(q, input.value);
      };
      btn?.addEventListener('click', go);
      input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          go();
        }
      });
    }

    q.querySelectorAll<HTMLElement>('[data-hint]').forEach((h) => {
      const open = h.querySelector<HTMLElement>('[data-hint-open]');
      open?.addEventListener('click', () => {
        const s = stateOf(q);
        const idx = Number(h.dataset.hindex ?? 0);
        if (h.hasAttribute('data-open')) return;
        // hints must be taken in order: open the ones below first
        q.querySelectorAll<HTMLElement>('[data-hint]').forEach((other) => {
          const oi = Number(other.dataset.hindex ?? 0);
          if (oi <= idx && !other.hasAttribute('data-open')) {
            other.setAttribute('data-open', '');
            if (oi === idx) s.hints = Math.max(s.hints, idx + 1);
          }
        });
        s.hints = Math.max(s.hints, idx + 1);
        updateScore(q);
        window.dispatchEvent(new CustomEvent('de:progress'));
      });
    });

    const solBtn = q.querySelector<HTMLElement>('[data-solution-open]');
    const sol = q.querySelector<HTMLElement>('[data-solution]');
    solBtn?.addEventListener('click', () => {
      if (!sol) return;
      if (sol.hasAttribute('data-open')) sol.removeAttribute('data-open');
      else {
        sol.setAttribute('data-open', '');
        solBtn.textContent = 'hide solution';
        const s = stateOf(q);
        if (!s.answered) {
          // peeking counts as an attempt so the review queue picks it up
          record(q, false);
        }
      }
      if (solBtn.textContent === 'show full solution') solBtn.textContent = 'hide solution';
      else solBtn.textContent = 'show full solution';
    });
  });
}
