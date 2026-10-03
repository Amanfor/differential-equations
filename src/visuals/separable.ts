import type { VisualDef } from './types';
import {
  createPlot,
  drawAxes,
  slopeField,
  integrate,
  strokePoints,
  dot,
  label,
  slider,
  equationBar,
  note,
  el,
  INK,
  DIM,
  ACCENT,
  OK,
  type Plot,
} from './kit';

interface Ex {
  id: string;
  name: string;
  /** dy/dx */
  f: (x: number, y: number) => number;
  /** y-side integrand 1/g(y) */
  gy: (y: number) => number;
  /** x-side integrand f-part (after cancelling) */
  fx: (x: number) => number;
  /** primitive of gy, for the read-out */
  Gy: (y: number) => string;
  /** primitive of fx */
  Fx: (x: number) => string;
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const EXS: Ex[] = [
  {
    id: 'canonical',
    name: "y' = (1+x)(1+y)   →   dy/(1+y) = (1+x) dx",
    f: (x, y) => (1 + x) * (1 + y),
    gy: (y) => 1 / (1 + y),
    fx: (x) => 1 + x,
    Gy: (y) => `ln|1+y|`,
    Fx: (x) => `x + x²/2`,
  },
  {
    id: 'decay',
    name: "y' = −y   →   dy/y = −dx",
    f: (x, y) => -y,
    gy: (y) => 1 / y,
    fx: () => -1,
    Gy: () => `ln|y|`,
    Fx: () => `−x`,
  },
  {
    id: 'sin',
    name: "y' = cos x / y   →   y dy = cos x dx",
    f: (x, y) => (y === 0 ? 0 : Math.cos(x) / y),
    gy: (y) => y,
    fx: (x) => Math.cos(x),
    Gy: (y) => `y²/2`,
    Fx: (x) => `sin x`,
  },
  {
    id: 'power',
    name: "y' = 2xy   →   dy/y = 2x dx",
    f: (x, y) => 2 * x * y,
    gy: (y) => 1 / y,
    fx: (x) => 2 * x,
    Gy: () => `ln|y|`,
    Fx: (x) => `x²`,
  },
];

const STAGES = [
  { key: 'before', label: '1 · the equation as given' },
  { key: 'split', label: '2 · drag x-parts left, y-parts right' },
  { key: 'integrate', label: '3 · integrate each side' },
  { key: 'solve', label: '4 · the family' },
];

export const def: VisualDef = {
  id: 'separable',
  mount(host, props) {
    let ex = EXS.find((e) => e.id === props.ex) ?? EXS[0];
    let C = 1;

    const plot: Plot = createPlot(host, { win: ex.win, aspect: 1.8, minH: 230, maxH: 380 });
    const bar = equationBar(host, '');
    const stageNote = note(host, '');

    const stageRow = el('div', 'viz-row');
    host.appendChild(stageRow);
    let stage = 0;

    // reconstruct y from the two primitives, given C
    function yOf(x: number, c: number): number {
      switch (ex.id) {
        case 'canonical': {
          // ln|1+y| = x + x²/2 + c  →  y = exp(...) − 1
          const s = x + (x * x) / 2 + c;
          return Math.exp(s) - 1;
        }
        case 'decay':
          return c * Math.exp(-x);
        case 'sin': {
          // y²/2 = sin x + c
          const s = 2 * (Math.sin(x) + c);
          return s > 0 ? Math.sqrt(s) : NaN;
        }
        case 'power':
          return c * Math.exp(x * x);
        default:
          return NaN;
      }
    }

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);
        if (stage === 0) slopeField(ctx, t, ex.f);

        if (stage >= 1) {
          // colour the two sides differently so the split is visible
          ctx.save();
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.font = '11px ui-monospace, Menlo, monospace';
          ctx.fillText(`∫ ${ex.fx(0) === 0 ? 'f(x)' : 'f(x)'} dx`, 8, 16);
          ctx.fillStyle = ACCENT;
          ctx.fillText(`∫ ${ex.gy(1) === 1 ? '1/g(y)' : '1/g(y)'} dy`, 8, 32);
          ctx.restore();
        }

        // family grows in as the stages advance
        const shown = stage === 0 ? 0 : stage === 1 ? 3 : stage === 2 ? 6 : 9;
        const cs = shown === 0 ? [] : [-2, -1, -0.5, 0.5, 1, 2];
        cs.slice(0, shown).forEach((k) => {
          const pts: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: yOf(x, k) });
          strokePoints(ctx, t, pts, { color: k === C ? INK : 'rgba(255,255,255,0.28)', width: k === C ? 2.2 : 1.1 });
        });

        // the two antiderivatives, drawn as the "two sides" being integrated
        if (stage >= 2) {
          const ptsX: Array<{ x: number; y: number }> = [];
          const ptsY: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) {
            ptsX.push({ x, y: ex.fx(x) });
            ptsY.push({ x, y: ex.gy(0) + ex.fx(x) });
          }
          strokePoints(ctx, t, ptsX, { color: 'rgba(255,255,255,0.35)', width: 1.4, dash: [4, 4] });
          strokePoints(ctx, t, ptsY, { color: 'rgba(158,203,255,0.4)', width: 1.4, dash: [4, 4] });
        }
      });

      bar.textContent = ex.name;
      const s = STAGES[stage];
      stageNote.innerHTML = `<strong>${s.label}</strong> — ${STAGE_TEXT[stage]}`;
    }

    const STAGE_TEXT = [
      'nothing is separated yet. the arrows show how tangled the curves are.',
      'every term that belongs to x moves to the left with dx; every term that belongs to y moves to the right with dy.',
      'each side is now a function of one variable, so ordinary integration applies.',
      `the constant of integration is <code>${ex.Gy(0)} = ${ex.Fx(0)} + C</code> — one family, not one curve.`,
    ];

    // stage buttons
    STAGES.forEach((s, i) => {
      const b = el('button', 'btn btn-ghost', s.label);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(i === stage));
      b.addEventListener('click', () => {
        stage = i;
        stageRow.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
        redraw();
      });
      stageRow.appendChild(b);
    });

    slider(host, {
      label: 'C',
      min: -2.5,
      max: 2.5,
      step: 0.05,
      value: C,
      fmt: (v) => v.toFixed(2),
      onInput: (v) => {
        C = v;
        redraw();
      },
    });

    // equation picker
    const sel = el('select');
    EXS.forEach((e) => {
      const o = document.createElement('option');
      o.value = e.id;
      o.textContent = e.name;
      sel.appendChild(o);
    });
    sel.value = ex.id;
    sel.addEventListener('change', () => {
      ex = EXS.find((e) => e.id === sel.value) ?? EXS[0];
      if (ex.win) Object.assign(plot.window, ex.win);
      redraw();
    });
    const r = el('div', 'viz-row');
    r.append(el('span', 'viz-label', 'equation'), sel);
    host.appendChild(r);

    const ans = note(host, '');
    const updateAns = () => {
      ans.innerHTML = `separation gives <code>${ex.gy(1) === 1 ? '1/g(y)' : '1/g(y)'}</code> dy = <code>f(x)</code> dx, so &nbsp;∫${ex.gy(1) === 1 ? ' dy/g(y)' : ' dy/g(y)'} = ∫ f(x) dx + C &nbsp;⟹&nbsp; <strong>${ex.Gy(0)} = ${ex.Fx(0)} + C</strong>`;
    };
    updateAns();

    redraw();
    return { destroy: () => plot.destroy() };
  },
};