import type { VisualDef } from './types';
import {
  createPlot,
  drawAxes,
  integrate,
  strokePoints,
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

interface Lode {
  id: string;
  name: string;
  /** dy/dx = −P y + Q */
  P: (x: number) => number;
  Q: (x: number) => number;
  /** e^{∫P dx} up to a constant */
  IF: (x: number) => number;
  /** closed-form general solution if convenient */
  sol?: (x: number, C: number) => number;
  pLabel: string;
  ifLabel: string;
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const LODES: Lode[] = [
  {
    id: 'expo',
    name: "(1 + eˣ) y′ + y eˣ = 1",
    P: (x) => Math.exp(x) / (1 + Math.exp(x)),
    Q: (x) => 1 / (1 + Math.exp(x)),
    IF: (x) => 1 + Math.exp(x),
    pLabel: 'P(x) = eˣ/(1 + eˣ)',
    ifLabel: 'I.F. = e^{∫P dx} = 1 + eˣ',
    sol: (x, C) => (x + C) / (1 + Math.exp(x)),
    win: { xmin: -5, xmax: 3, ymin: -1, ymax: 5 },
  },
  {
    id: 'decay',
    name: "y′ + y = x",
    P: () => 1,
    Q: (x) => x,
    IF: (x) => Math.exp(x),
    sol: (x, C) => x - 1 + C * Math.exp(-x),
    pLabel: 'P(x) = 1',
    ifLabel: 'I.F. = e^x',
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'tan',
    name: "y′ + y tan x = sin x",
    P: (x) => Math.tan(x),
    Q: (x) => Math.sin(x),
    IF: (x) => Math.abs(Math.cos(x)) === 0 ? NaN : 1 / Math.cos(x),
    pLabel: 'P(x) = tan x',
    ifLabel: 'I.F. = sec x',
    win: { xmin: -1.4, xmax: 1.4, ymin: -3, ymax: 3 },
  },
  {
    id: 'sine',
    name: "y′ + 2y = sin 2x",
    P: () => 2,
    Q: (x) => Math.sin(2 * x),
    IF: (x) => Math.exp(2 * x),
    sol: (x, C) => (2 * Math.sin(2 * x) - 2 * Math.cos(2 * x) + 8 * C) / 8,
    pLabel: 'P(x) = 2',
    ifLabel: 'I.F. = e^{2x}',
    win: { xmin: -6, xmax: 6, ymin: -3, ymax: 3 },
  },
  {
    id: 'cool',
    name: "T′ = −k(T − 25),  cooling",
    P: () => 0.35,
    Q: () => 25 * 0.35,
    IF: (x) => Math.exp(0.35 * x),
    sol: (x, C) => 25 + C * Math.exp(-0.35 * x),
    pLabel: 'P(x) = k = 0.35',
    ifLabel: 'I.F. = e^{kx}',
    win: { xmin: -1, xmax: 14, ymin: 18, ymax: 105 },
  },
];

export const def: VisualDef = {
  id: 'linear-if',
  mount(host, props) {
    let ode = LODES.find((l) => l.id === props.ode) ?? LODES[0];
    let C = 0.5;
    let y0 = 1;
    let x0 = 0;
    let step = 3;

    const plot: Plot = createPlot(host, { win: ode.win, aspect: 1.75, minH: 230, maxH: 380 });
    const eqBar = equationBar(host, '');
    const readBar = equationBar(host, '');
    readBar.style.borderColor = 'rgba(158,203,255,0.4)';

    const stepsRow = el('div', 'viz-row');
    host.appendChild(stepsRow);

    const STEP_TEXT = [
      'normalise to y′ + P(x)y = Q(x). the coefficient of y′ must be 1.',
      'compute the integrating factor I.F. = e^{∫P dx} — watch the dashed curve',
      'multiply through: μy′ + μPy = μQ, and μ′y = μPy, so the left side is d/dx[μy]',
      'the left side is now one derivative: d/dx[y·I.F.] = Q·I.F.',
      'integrate: y·I.F. = ∫Q·I.F. dx + C',
    ];

    function yOf(x: number, c: number): number {
      if (ode.sol) return ode.sol(x, c);
      // numeric fallback for the equations without a handy closed form
      const f = (xx: number, yy: number) => -ode.P(xx) * yy + ode.Q(xx);
      const pts = integrate(f, x0, y0, plot.t, { dir: 1, steps: 3000 });
      let best = pts[0];
      for (const p of pts) if (Math.abs(p.x - x) < Math.abs(best.x - x)) best = p;
      void c;
      return best.y;
    }

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);

        // I.F. curve, normalised so it fits the window
        if (step >= 1) {
          const vals: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) {
            const v = ode.IF(x);
            vals.push({ x, y: Number.isFinite(v) ? v : NaN });
          }
          // rescale into view
          const finite = vals.filter((p) => Number.isFinite(p.y));
          if (finite.length) {
            const lo = Math.min(...finite.map((p) => p.y));
            const hi = Math.max(...finite.map((p) => p.y));
            const span = (hi - lo) || 1;
            const mid = (t.ymin + t.ymax) / 2;
            const scale = ((t.ymax - t.ymin) * 0.8) / span;
            const scaled = vals.map((p) => ({ x: p.x, y: Number.isFinite(p.y) ? mid + (p.y - lo) * scale - ((hi - lo) / 2) * scale : NaN }));
            strokePoints(ctx, t, scaled, { color: 'rgba(158,203,255,0.55)', width: 1.6, dash: [6, 4] });
            if (finite.length) label(ctx, 8, 14, 'dashed = integrating factor μ(x)', 'rgba(158,203,255,0.8)');
          }
        }

        // the family
        if (step >= 4) {
          [-1.5, -0.5, 0.5, 1.5].forEach((k) => {
            const pts: Array<{ x: number; y: number }> = [];
            for (let x = t.xmin; x <= t.xmax; x += 0.05) pts.push({ x, y: yOf(x, k) });
            strokePoints(ctx, t, pts, { color: 'rgba(255,255,255,0.2)', width: 1.1 });
          });
        }

        // the highlighted solution
        const pts: Array<{ x: number; y: number }> = [];
        for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: yOf(x, C) });
        strokePoints(ctx, t, pts, { color: INK, width: 2.2 });

        // μ·y : the quantity that becomes a perfect derivative
        if (step >= 2) {
          const pts2: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) {
            const yv = yOf(x, C);
            const mu = ode.IF(x);
            pts2.push({ x, y: Number.isFinite(mu) ? mu * yv : NaN });
          }
          const finite = pts2.filter((p) => Number.isFinite(p.y));
          if (finite.length) {
            const lo = Math.min(...finite.map((p) => p.y));
            const hi = Math.max(...finite.map((p) => p.y));
            const span = (hi - lo) || 1;
            const base = t.ymin + (t.ymax - t.ymin) * 0.12;
            const scale = ((t.ymax - t.ymin) * 0.25) / span;
            strokePoints(
              ctx,
              t,
              pts2.map((p) => ({ x: p.x, y: Number.isFinite(p.y) ? base + (p.y - lo) * scale : NaN })),
              { color: 'rgba(125,255,168,0.75)', width: 1.8 }
            );
          }
        }
      });

      eqBar.textContent = `${ode.name}    ⟹    ${ode.pLabel}`;
      const mu = ode.IF(x0);
      readBar.textContent = STEP_TEXT[step];
    }

    // stepper
    for (let i = 0; i < 5; i++) {
      const b = el('button', 'btn btn-ghost', String(i + 1));
      b.type = 'button';
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => {
        step = i;
        stepsRow.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
        redraw();
      });
      stepsRow.appendChild(b);
    }
    stepsRow.append(el('span', 'viz-label', '← walk through the method'));

    slider(host, {
      label: 'C',
      min: -2,
      max: 2,
      step: 0.05,
      value: C,
      fmt: (v) => v.toFixed(2),
      onInput: (v) => {
        C = v;
        redraw();
      },
    });

    slider(host, {
      label: 'x at which y₀ is set',
      min: ode.win?.xmin ?? -4,
      max: ode.win?.xmax ?? 4,
      step: 0.1,
      value: x0,
      fmt: (v) => v.toFixed(1),
      onInput: (v) => {
        x0 = v;
        redraw();
      },
    });

    slider(host, {
      label: 'y₀',
      min: -3,
      max: 4,
      step: 0.1,
      value: y0,
      fmt: (v) => v.toFixed(1),
      onInput: (v) => {
        y0 = v;
        redraw();
      },
    });

    const sel = el('select');
    LODES.forEach((l) => {
      const o = document.createElement('option');
      o.value = l.id;
      o.textContent = l.name;
      sel.appendChild(o);
    });
    sel.value = ode.id;
    sel.addEventListener('change', () => {
      ode = LODES.find((l) => l.id === sel.value) ?? LODES[0];
      if (ode.win) Object.assign(plot.window, ode.win);
      x0 = 0;
      redraw();
    });
    const r = el('div', 'viz-row');
    r.append(el('span', 'viz-label', 'equation'), sel);
    host.appendChild(r);

    note(
      host,
      'the green curve is y·μ. it is the one quantity whose derivative is trivially integrable, because the integrating factor was chosen to make it so.'
    );

    redraw();
    return { destroy: () => plot.destroy() };
  },
};