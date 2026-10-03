import type { VisualDef } from './types';
import {
  createPlot,
  drawAxes,
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

interface Bd {
  id: string;
  name: string;
  n: number;
  P: (x: number) => number;
  Q: (x: number) => number;
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const BDE: Bd[] = [
  { id: 'r1', name: "y′ + 2x y = x y³   (n = 3)", n: 3, P: () => 2 * 1, Q: (x) => x },
  { id: 'r2', name: "y′ + y/x = x y²   (n = 2)", n: 2, P: (x) => (x === 0 ? 0 : 1 / x), Q: (x) => x },
  { id: 'r3', name: "y′ + (1/x)y = x² y⁴   (n = 4)", n: 4, P: (x) => (x === 0 ? 0 : 1 / x), Q: (x) => x * x },
  { id: 'r4', name: "y′ − y = e^{−2x} y^{1/2}   (n = ½)", n: 0.5, P: () => -1, Q: (x) => Math.exp(-2 * x) },
];

export const def: VisualDef = {
  id: 'bernoulli',
  mount(host, props) {
    let bd = BDE.find((b) => b.id === props.eq) ?? BDE[0];

    const plot: Plot = createPlot(host, { win: bd.win, aspect: 1.7, minH: 220, maxH: 360 });
    const raw = equationBar(host, '');
    const zed = equationBar(host, '');
    const lin = equationBar(host, '');
    lin.style.borderColor = 'rgba(125,255,168,0.45)';

    let step = 0;
    let C = 1;

    const STEPS = [
      'the original equation: linear except for one stray yⁿ on the right.',
      'divide through by yⁿ — now every term is linear in y.',
      'substitute z = y^(1−n). the stray power disappears and you have a linear equation in z.',
      'solve the linear equation for z, then put y = z^(1/(1−n)) back.',
    ];

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);

        const pts: Array<{ x: number; y: number }> = [];
        for (let x = t.xmin; x <= t.xmax; x += 0.03) pts.push({ x, y: yOf(x, C) });
        strokePoints(ctx, t, pts, { color: INK, width: 2.3 });

        if (step >= 1) {
          // the y^(1-n) = z curve, on the same axes
          const zp: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) {
            const y = yOf(x, C);
            zp.push({ x, y: Number.isFinite(y) ? Math.pow(Math.abs(y), 1 - bd.n) * Math.sign(y || 1) : NaN });
          }
          strokePoints(ctx, t, zp, { color: 'rgba(158,203,255,0.85)', width: 1.8, dash: [6, 4] });
          label(ctx, 8, 14, 'dashed = z = y^(1−n), the variable that makes it linear', 'rgba(158,203,255,0.85)');
        }

        const y0 = yOf(0, C);
        if (Number.isFinite(y0)) dot(ctx, t, 0, y0, ACCENT, 4);
      });

      const n = bd.n;
      raw.textContent = `y′ + P(x)y = Q(x)y^${n}`;
      zed.textContent =
        step >= 1 ? `divide by y^${n}:   y^(−${n})y′ + P(x)y^(1−${n}) = Q(x)` : `divide by y^${n}:  (next step)`;
      lin.textContent =
        step >= 2
          ? `z = y^(1−${n})  ⟹  z′ + (1−${n})P(x)z = (1−${n})Q(x)   — linear`
          : `z = y^(1−${n})  ⟹  a linear equation in z  (next step)`;
    }

    /** numerically solve y' = −P y + Q y^n for given C = y(x0) */
    function yOf(x: number, c: number): number {
      const f = (xx: number, y: number) => -bd.P(xx) * y + bd.Q(xx) * Math.pow(y, bd.n);
      const x0 = 0;
      const t = plot.t;
      const dir = x >= x0 ? 1 : -1;
      const span = dir > 0 ? Math.min(x, t.xmax) - x0 : Math.max(x, t.xmin) - x0;
      const steps = 500;
      const h = span / steps;
      let xx = x0;
      let y = Math.abs(c) < 1e-9 ? 0.2 : c;
      if (Math.abs(span) < 1e-12) return y;
      for (let i = 0; i < steps; i++) {
        const k1 = f(xx, y);
        const k2 = f(xx + h / 2, y + (h / 2) * k1);
        const k3 = f(xx + h / 2, y + (h / 2) * k2);
        const k4 = f(xx + h, y + h * k3);
        if (![k1, k2, k3, k4].every(Number.isFinite)) return NaN;
        y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
        xx += h;
        if (!Number.isFinite(y) || Math.abs(y) > 1e4) return NaN;
      }
      return y;
    }

    const stepRow = el('div', 'viz-row');
    host.appendChild(stepRow);
    STEPS.forEach((s, i) => {
      const b = el('button', 'btn btn-ghost', String(i + 1));
      b.type = 'button';
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => {
        step = i;
        stepRow.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
        redraw();
      });
      stepRow.appendChild(b);
    });
    stepRow.append(el('span', 'viz-label', '← the reduction, one move at a time'));

    slider(host, {
      label: 'C',
      min: -1.5,
      max: 1.5,
      step: 0.05,
      value: C,
      fmt: (v) => v.toFixed(2),
      onInput: (v) => {
        C = v;
        redraw();
      },
    });

    const sel = el('select');
    BDE.forEach((b) => {
      const o = document.createElement('option');
      o.value = b.id;
      o.textContent = b.name;
      sel.appendChild(o);
    });
    sel.value = bd.id;
    sel.addEventListener('change', () => {
      bd = BDE.find((b) => b.id === sel.value) ?? BDE[0];
      if (bd.win) Object.assign(plot.window, bd.win);
      redraw();
    });
    const r = el('div', 'viz-row');
    r.append(el('span', 'viz-label', 'equation'), sel);
    host.appendChild(r);

    note(host, STEPS[step]);

    void integrate;
    void DIM;
    redraw();
    return { destroy: () => plot.destroy() };
  },
};