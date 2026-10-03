/**
 * Client runtime for the learning directives emitted by src/lib/directives.ts.
 * Progressive enhancement: the markup already renders without JS; this only
 * adds the show/hide, check and feedback behaviour.
 */

type Doc = Document | HTMLElement;

import { matchesAny } from './match';

function fillMatches(expected: string, given: string): boolean {
  return matchesAny([expected], given);
}

/* ---------------- derive / worked steps ---------------- */

function showStep(step: HTMLElement): void {
  if (step.hasAttribute('data-shown')) return;
  step.setAttribute('data-shown', '');
  step.classList.add('step-shown');
  updateCounts(step.parentElement ?? step);
}

function updateCounts(scope: Element): void {
  const work = scope.closest?.('[data-work]') ?? scope.querySelector('[data-work]');
  const target = (work as HTMLElement | null) ?? null;
  if (!target) return;
  const total = target.querySelectorAll('[data-step]').length;
  const shown = target.querySelectorAll('[data-step][data-shown]').length;
  const out = target.querySelector('[data-work-count]');
  if (out) out.textContent = total ? `step ${shown} / ${total} revealed` : '';
}

function initStep(step: HTMLElement): void {
  const show = step.querySelector<HTMLElement>('[data-show-step]');
  show?.addEventListener('click', () => showStep(step));

  // fill-in-the-blank
  const input = step.querySelector<HTMLInputElement>('[data-fill-input]');
  const btn = step.querySelector<HTMLButtonElement>('[data-fill-check]');
  const msg = step.querySelector<HTMLElement>('[data-fill-msg]');
  const expected = step.getAttribute('data-fill') ?? '';
  if (input && btn) {
    const check = () => {
      const ok = fillMatches(expected, input.value);
      if (msg) {
        msg.textContent = ok ? 'yes — that is the step' : 'not quite. try again, or reveal the step.';
        msg.className = 'fill-msg ' + (ok ? 'ok' : 'no');
      }
      if (ok) {
        step.setAttribute('data-filled', '1');
        showStep(step);
        input.disabled = true;
        btn.disabled = true;
      }
    };
    btn.addEventListener('click', check);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        check();
      }
    });
  }

  // a step with a blank always reveals eventually — clicking the label reveals it
  if (step.hasAttribute('data-fill')) {
    const reason = step.querySelector<HTMLElement>('.step-reason');
    reason?.addEventListener('click', () => showStep(step));
  }
}

function initDerive(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[data-derive], [data-work]').forEach((box) => {
    const next = box.querySelector<HTMLElement>('[data-reveal-next]');
    const all = box.querySelector<HTMLElement>('[data-reveal-all]');
    const steps = () => Array.from(box.querySelectorAll<HTMLElement>('[data-step]'));
    next?.addEventListener('click', () => {
      const hidden = steps().find((s) => !s.hasAttribute('data-shown'));
      if (hidden) showStep(hidden);
      if (!steps().some((s) => !s.hasAttribute('data-shown')) && next) next.disabled = true;
    });
    all?.addEventListener('click', () => {
      steps().forEach(showStep);
      if (next) next.disabled = true;
      if (all) (all as HTMLButtonElement).disabled = true;
    });
    if (box.hasAttribute('data-work')) {
      // worked examples: first step visible, rest hidden — "fading" scaffolding
      const s = steps();
      const mode = box.getAttribute('data-work') ?? '';
      if (mode === 'all') s.forEach(showStep);
      else if (s[0]) showStep(s[0]);
      updateCounts(box);
    }
    box.querySelectorAll<HTMLElement>('[data-step]').forEach(initStep);
  });
}

/* ---------------- predict ---------------- */

function initPredict(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[data-predict]').forEach((box) => {
    const reveal = box.querySelector<HTMLElement>('[data-reveal]');
    const toggle = box.querySelector<HTMLElement>('[data-reveal-toggle]');
    const choices = Array.from(box.querySelectorAll<HTMLElement>('[data-choice]'));
    const open = () => reveal?.setAttribute('data-open', '');

    choices.forEach((c) => {
      c.addEventListener('click', () => {
        if (box.hasAttribute('data-answered')) return;
        box.setAttribute('data-answered', '');
        const correct = c.getAttribute('data-correct') === '1';
        c.setAttribute('data-state', correct ? 'right' : 'wrong');
        choices.forEach((o) => {
          if (o === c) return;
          if (o.getAttribute('data-correct') === '1') o.setAttribute('data-state', 'right');
        });
        const bar = box.querySelector<HTMLElement>('.predict-q');
        if (bar && !bar.querySelector('.p-msg')) {
          const s = document.createElement('span');
          s.className = 'p-msg';
          s.style.cssText = 'float:right;font-size:.8rem;color:' + (correct ? 'var(--ok)' : 'var(--bad)');
          s.textContent = correct ? 'good instinct' : 'not this time — see below';
          bar.appendChild(s);
        }
        open();
      });
    });

    toggle?.addEventListener('click', () => {
      if (reveal?.hasAttribute('data-open')) reveal.removeAttribute('data-open');
      else open();
    });

    // predict blocks with no choices: prediction is written down, then revealed
    if (!choices.length && !reveal?.hasAttribute('data-open')) {
      if (toggle) toggle.textContent = 'reveal';
    }
  });
}

/* ---------------- spot the mistake ---------------- */

function initSpot(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[data-spot]').forEach((box) => {
    const steps = Array.from(box.querySelectorAll<HTMLElement>('[data-spot-step]'));
    const msg = box.querySelector<HTMLElement>('[data-spot-msg]');
    let answered = false;

    const explain = (s: HTMLElement, state: 'right' | 'wrong') => {
      s.setAttribute('data-state', state);
      if (state === 'right') s.setAttribute('data-revealed', '');
    };

    steps.forEach((s) => {
      s.addEventListener('click', () => {
        const flaw = s.getAttribute('data-flaw');
        if (answered) return;
        answered = true;
        if (flaw !== null) {
          explain(s, 'right');
          if (msg) {
            msg.textContent = 'correct — ' + flaw;
            msg.className = 'spot-msg ok';
          }
        } else {
          explain(s, 'wrong');
          const bad = steps.find((t) => t.hasAttribute('data-flaw'));
          if (bad) bad.setAttribute('data-revealed', '');
          if (msg) {
            msg.textContent =
              'this step is fine. the flawed one is highlighted — ' + (bad?.getAttribute('data-flaw') ?? '');
            msg.className = 'spot-msg no';
          }
        }
        // reveal which one was flawed regardless
        steps.forEach((t) => {
          if (t.hasAttribute('data-flaw')) t.setAttribute('data-revealed', '');
        });
      });
    });
  });
}

/* ---------------- reveal ---------------- */

function initReveal(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((r) => {
    const bar = r.querySelector<HTMLElement>('[data-reveal-toggle]');
    bar?.addEventListener('click', () => r.toggleAttribute('data-open'));
  });
}

/* ---------------- mistakes list (each can be "spot it" tested) ------------- */

function initMistakes(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[data-mistakes]').forEach((list) => {
    list.querySelectorAll<HTMLElement>('[data-mistake]').forEach((m) => {
      const detail = m.querySelector<HTMLElement>('[data-detail]');
      if (!detail) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-ghost';
      btn.textContent = 'why?';
      btn.style.marginLeft = '0.5rem';
      btn.addEventListener('click', () => {
        const open = detail.hasAttribute('data-open');
        if (open) {
          detail.removeAttribute('data-open');
          btn.textContent = 'why?';
        } else {
          detail.setAttribute('data-open', '');
          btn.textContent = 'hide';
        }
      });
      m.appendChild(btn);
    });
  });
}

export function initInteractions(scope: Doc): void {
  const root = scope as HTMLElement;
  initDerive(root);
  initPredict(root);
  initSpot(root);
  initReveal(root);
  initMistakes(root);
}
