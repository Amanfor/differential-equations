import type { VisualDef } from './types';
import {
  createPlot,
  drawAxes,
  strokePoints,
  label,
  slider,
  select,
  equationBar,
  note,
  el,
  INK,
  DIM,
  ACCENT,
  OK,
  type Plot,
} from './kit';

interface Model {
  id: string;
  name: string;
  ode: (p: Record<string, number>) => string;
  solution: (p: Record<string, number>, t: number) => number;
  /** y-axis label + range hint */
  unit: string;
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const MODELS: Model[] = [
  {
    id: 'cooling',
    name: "Newton's law of cooling",
    ode: (p) => `dT/dt = −${p.k.toFixed(3)}(T − ${p.Ts.toFixed(0)}),   T(0) = ${p.T0.toFixed(0)}`,
    solution: (p, t) => p.Ts + (p.T0 - p.Ts) * Math.exp(-p.k * t),
    unit: 'T  (°C)',
    win: { xmin: 0, xmax: 30, ymin: 0, ymax: 100 },
  },
  {
    id: 'decay',
    name: 'radioactive decay',
    ode: (p) => `dN/dt = −λN,   λ = ${p.k.toFixed(3)},   N(0) = ${p.T0.toFixed(0)}`,
    solution: (p, t) => p.T0 * Math.exp(-p.k * t),
    unit: 'N  (grams)',
    win: { xmin: 0, xmax: 40, ymin: 0, ymax: 110 },
  },
  {
    id: 'growth',
    name: 'exponential growth',
    ode: (p) => `dP/dt = ${p.k.toFixed(3)}P,   P(0) = ${p.T0.toFixed(0)}`,
    solution: (p, t) => p.T0 * Math.exp(p.k * t),
    unit: 'P',
    win: { xmin: 0, xmax: 30, ymin: 0, ymax: 400 },
  },
  {
    id: 'logistic',
    name: 'logistic growth (carrying capacity K = 100)',
    ode: (p) => `dP/dt = ${p.k.toFixed(3)}P(1 − P/100),   P(0) = ${p.T0.toFixed(0)}`,
    solution: (p, t) => 100 / (1 + ((100 - p.T0) / Math.max(p.T0, 0.01)) * Math.exp(-p.k * t)),
    unit: 'P',
    win: { xmin: 0, xmax: 40, ymin: 0, ymax: 115 },
  },
];

export const def: VisualDef = {
  id: 'growth-cooling',
  mount(host, props) {
    let model = MODELS.find((m) => m.id === props.model) ?? MODELS[0];
    const p = { T0: 90, Ts: 20, k: 0.12 };

    const plot: Plot = createPlot(host, { win: model.win, aspect: 1.75, minH: 230, maxH: 380 });
    const odeBar = equationBar(host, '');
    const solBar = equationBar(host, '');
    solBar.style.borderColor = 'rgba(158,203,255,0.45)';
    const read = equationBar(host, '');
    read.style.borderColor = 'rgba(125,255,168,0.45)';

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);

        // several initial values, so you see the family gather at the asymptote
        const spread = [0.4, 0.7, 1, 1.3, 1.6];
        spread.forEach((s) => {
          const pts: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) {
            pts.push({ x, y: model.solution({ ...p, T0: p.T0 * s }, x) });
          }
          strokePoints(ctx, t, pts, { color: 'rgba(255,255,255,0.22)', width: 1.1 });
        });

        // the ambient / equilibrium line
        if (model.id === 'cooling' || model.id === 'logistic') {
          const eq = model.id === 'cooling' ? p.Ts : 100;
          strokePoints(
            ctx,
            t,
            [
              { x: t.xmin, y: eq },
              { x: t.xmax, y: eq },
            ],
            { color: 'rgba(158,203,255,0.5)', width: 1.3, dash: [7, 5] }
          );
          label(ctx, t.X(t.xmax) - 6, t.Y(eq) - 6, model.id === 'cooling' ? 'ambient' : 'carrying capacity K', 'rgba(158,203,255,0.85)', 'right');
        }

        // the chosen curve
        const pts: Array<{ x: number; y: number }> = [];
        for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: model.solution(p, x) });
        strokePoints(ctx, t, pts, { color: INK, width: 2.4 });

        // half-life marker for decay
        if (model.id === 'decay') {
          const hl = Math.log(2) / p.k;
          if (hl < t.xmax) {
            strokePoints(
              ctx,
              t,
              [
                { x: hl, y: t.ymin },
                { x: hl, y: t.ymax },
              ],
              { color: 'rgba(125,255,168,0.5)', width: 1.2, dash: [4, 4] }
            );
            label(ctx, t.X(hl) + 5, 16, `half-life ${hl.toFixed(1)}`, 'rgba(125,255,168,0.9)');
          }
        }

        // inflection for logistic
        if (model.id === 'logistic') {
          strokePoints(
            ctx,
            t,
            [
              { x: t.xmin, y: 50 },
              { x: t.xmax, y: 50 },
            ],
            { color: 'rgba(125,255,168,0.45)', width: 1.2, dash: [4, 4] }
          );
          label(ctx, t.X(t.xmax) - 6, t.Y(50) - 6, 'inflection at P = K/2', 'rgba(125,255,168,0.85)', 'right');
        }
      });

      odeBar.textContent = `${model.name}:  ${model.ode(p)}`;
      solBar.textContent =
        model.id === 'cooling'
          ? `T(t) = ${p.Ts.toFixed(0)} + (${p.T0.toFixed(0)} − ${p.Ts.toFixed(0)})·e^(−${p.k.toFixed(3)}t)`
          : model.id === 'logistic'
            ? `P(t) = 100 / (1 + ${(((100 - p.T0) / Math.max(p.T0, 0.01)).toFixed(2))}·e^(−${p.k.toFixed(3)}t))`
            : `y(t) = ${p.T0.toFixed(0)}·e^(±${p.k.toFixed(3)}t)`;

      const half = Math.log(2) / p.k;
      const at = model.solution(p, model.id === 'cooling' ? 10 : half * 2);
      read.textContent =
        model.id === 'decay'
          ? `half-life = ln2/λ = ${half.toFixed(2)}   ·   after 2 half-lives: ${model.solution(p, 2 * half).toFixed(1)}`
          : model.id === 'cooling'
            ? `T(10) = ${model.solution(p, 10).toFixed(2)}   ·   time to reach 40 °C: ${solveCool(p, 40).toFixed(2)}`
            : `y(2/λ) = ${model.solution(p, 2 / p.k).toFixed(2)}`;
      void at;
    }

    function solveCool(q: { T0: number; Ts: number; k: number }, target: number): number {
      const d = q.T0 - q.Ts;
      if (target <= q.Ts || target >= q.T0) return NaN;
      return Math.log(d / (target - q.Ts)) / q.k;
    }

    slider(host, {
      label: 'initial value y₀',
      min: 5,
      max: 200,
      step: 1,
      value: p.T0,
      fmt: (v) => v.toFixed(0),
      onInput: (v) => {
        p.T0 = v;
        redraw();
      },
    });

    const sTs = slider(host, {
      label: 'ambient / equilibrium',
      min: 0,
      max: 80,
      step: 1,
      value: p.Ts,
      fmt: (v) => v.toFixed(0),
      onInput: (v) => {
        p.Ts = v;
        redraw();
      },
    });

    slider(host, {
      label: 'rate k',
      min: 0.02,
      max: 0.5,
      step: 0.005,
      value: p.k,
      fmt: (v) => v.toFixed(3),
      onInput: (v) => {
        p.k = v;
        redraw();
      },
    });

    const sel = el('select');
    MODELS.forEach((m) => {
      const o = document.createElement('option');
      o.value = m.id;
      o.textContent = m.name;
      sel.appendChild(o);
    });
    sel.value = model.id;
    sel.addEventListener('change', () => {
      model = MODELS.find((m) => m.id === sel.value) ?? MODELS[0];
      if (model.win) Object.assign(plot.window, model.win);
      if (model.id === 'logistic') {
        p.T0 = Math.min(p.T0, 90);
        p.Ts = 100;
        sTs.set(100);
        sTs.input.disabled = true;
      } else {
        sTs.input.disabled = false;
      }
      redraw();
    });

    const r = el('div', 'viz-row');
    r.append(el('span', 'viz-label', 'model'), sel);
    host.appendChild(r);

    note(
      host,
      'every one of these is a first-order linear (or separable) equation. the pale curves are the same model with other initial values — they all crowd towards the same asymptote, which is what tells you the constant in the solution.'
    );

    redraw();
    return { destroy: () => plot.destroy() };
  },
};