import type { VisualDef } from './types';
import {
  createPlot,
  drawAxes,
  slopeField,
  strokePoints,
  dot,
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

interface Eq {
  id: string;
  name: string;
  f: (x: number, y: number) => number;
  /** F(v) where v = y/x */
  F: (v: number) => number;
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const EQS: Eq[] = [
  {
    id: 'ratio',
    name: "y' = (x² + y²)/(xy)   =   F(y/x)",
    f: (x, y) => (x * y === 0 ? 0 : (x * x + y * y) / (x * y)),
    F: (v) => (v === 0 ? Infinity : (1 + v * v) / v),
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'lines',
    name: "y' = (x + y)/(x − y)",
    f: (x, y) => (x - y === 0 ? 0 : (x + y) / (x - y)),
    F: (v) => (1 - v === 0 ? Infinity : (1 + v) / (1 - v)),
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'tank',
    name: "y' = (x − y)/(x + y)",
    f: (x, y) => (x + y === 0 ? 0 : (x - y) / (x + y)),
    F: (v) => (1 + v === 0 ? Infinity : (1 - v) / (1 + v)),
  },
  {
    id: 'rays',
    name: "y' = y/x   (already the ratio itself)",
    f: (x, y) => (x === 0 ? 0 : y / x),
    F: (v) => v,
  },
];

export const def: VisualDef = {
  id: 'homogeneous',
  mount(host, props) {
    let eq = EQS.find((e) => e.id === props.eq) ?? EQS[0];
    let C = 0.5;
    let v = 0.5;

    const plot: Plot = createPlot(host, { win: eq.win, aspect: 1.75, minH: 230, maxH: 380 });
    const beforeBar = equationBar(host, '');
    const afterBar = equationBar(host, '');
    const rows = el('div', 'viz-row');
    host.appendChild(rows);

    function yOf(x: number, c: number): number {
      switch (eq.id) {
        case 'ratio':
          // x² − y² = C·x  →  y = sqrt(x² − Cx)
          return Math.sqrt(Math.max(0, x * x - c * x));
        case 'rays':
          return c * x;
        default:
          // no closed form needed: trace the reduced separable equation
          return numeric(x, c);
      }
    }

    // numeric trace of the reduced separable equation dv/(F(v)−v) = dx/x
    function numeric(x: number, c: number): number {
      if (Math.abs(x) < 1e-6) return 0;
      const dir = x > 0 ? 1 : -1;
      const target = Math.abs(x);
      let h = target / 400;
      let vv = c;
      for (let i = 0; i < 400; i++) {
        const denom = eq.F(vv) - vv;
        if (!Number.isFinite(denom) || Math.abs(denom) < 1e-9) return NaN;
        vv += (h * dir) / denom;
        if (!Number.isFinite(vv) || Math.abs(vv) > 60) return NaN;
      }
      return vv * x;
    }

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);
        slopeField(ctx, t, eq.f);

        // the family
        [0.15, 0.4, 0.8, -0.4, -0.8].forEach((k) => {
          const pts: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) pts.push({ x, y: yOf(x, k) });
          strokePoints(ctx, t, pts, { color: 'rgba(255,255,255,0.22)', width: 1.1 });
        });
        const pts: Array<{ x: number; y: number }> = [];
        for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: yOf(x, C) });
        strokePoints(ctx, t, pts, { color: INK, width: 2.2 });

        // the ray y = vx: the whole point is that it is a straight line through the origin
        const rv: Array<{ x: number; y: number }> = [];
        for (let x = t.xmin; x <= t.xmax; x += 0.05) rv.push({ x, y: v * x });
        strokePoints(ctx, t, rv, { color: ACCENT, width: 1.6, dash: [6, 4] });
        dot(ctx, t, 0, 0, DIM, 3);
      });

      const denom = eq.F(v) - v;
      beforeBar.textContent = eq.name;
      afterBar.textContent = `y = vx  ⟹  y' = v + x v'  ⟹  ${Number.isFinite(denom) ? `dv/${fmtNum(denom)} = dx/x` : 'dv/0 = dx/x   (no solution here)'}`;
      afterBar.style.borderColor = 'rgba(158,203,255,0.4)';
    }

    function fmtNum(n: number): string {
      if (!Number.isFinite(n)) return '∞';
      const r = Math.round(n * 1000) / 1000;
      return String(r);
    }

    // v slider — watch F(v) − v approach zero (singular direction)
    const sv = slider(host, {
      label: 'v = y/x',
      min: -2,
      max: 3,
      step: 0.01,
      value: v,
      fmt: (x) => x.toFixed(2),
      onInput: (x) => {
        v = x;
        C = x;
        redraw();
      },
    });

    slider(host, {
      label: 'C',
      min: -3,
      max: 3,
      step: 0.05,
      value: C,
      fmt: (x) => x.toFixed(2),
      onInput: (x) => {
        C = x;
        redraw();
      },
    });

    const sel = el('select');
    EQS.forEach((e) => {
      const o = document.createElement('option');
      o.value = e.id;
      o.textContent = e.name;
      sel.appendChild(o);
    });
    sel.value = eq.id;
    sel.addEventListener('change', () => {
      eq = EQS.find((e) => e.id === sel.value) ?? EQS[0];
      if (eq.win) Object.assign(plot.window, eq.win);
      redraw();
    });
    rows.append(el('span', 'viz-label', 'equation'), sel);

    note(
      host,
      'the dashed ray is y = vx. because the equation is unchanged by scaling (x, y) together, the only combination of x and y it can possibly depend on is the ratio — and v is exactly that ratio.'
    );

    redraw();
    return { destroy: () => plot.destroy() };
  },
};