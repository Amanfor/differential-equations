import type { VisualDef } from './types';
import { createPlot, strokePoints, dot, label, slider, equationBar, note, el, INK, DIM, ACCENT, type Plot } from './kit';

interface Fam {
  id: string;
  name: string;
  /** the one-parameter family */
  y: (x: number, c: number) => number;
  /** the parameter-free differential equation it satisfies */
  de: string;
  /** how the parameter was removed */
  how: string;
  n: number; // how many parameters
  cs: number[];
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const FAMS: Fam[] = [
  {
    id: 'lines',
    name: 'all straight lines  y = mx + c',
    y: (x, c) => c * x + 1.5,
    de: 'y″ = 0',
    how: 'two parameters m, c. differentiate twice: y′ = m, y″ = 0. m and c are gone. order 2 = number of parameters.',
    n: 2,
    cs: [-2, -1, 0, 1, 2],
    win: { xmin: -3, xmax: 3, ymin: -4, ymax: 4 },
  },
  {
    id: 'circles0',
    name: 'circles touching the x-axis at the origin',
    y: (x, c) => (c * c - x * x > 0 ? Math.sqrt(c * c - x * x) : NaN),
    de: '(y² − x²) y′ + 2xy = 0',
    how: 'x² + (y−a)² = a² gives x² + y² = 2ay. one parameter a. differentiate once and eliminate a.',
    n: 1,
    cs: [1.5, 2.5, 3.5, 4.5],
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'expo',
    name: 'exponentials  y = A e^{bx}',
    y: (x, c) => Math.exp(c * x),
    de: 'xy″ − y′ = 0',
    how: 'two parameters A, b. note A = (c₁e^{c₂}) so {c₁,c₂} collapse to one: A. differentiate and eliminate A, b.',
    n: 2,
    cs: [-0.8, -0.4, 0.4, 0.8],
    win: { xmin: -2, xmax: 2, ymin: -0.2, ymax: 6 },
  },
  {
    id: 'sinmix',
    name: 'y = A sin x + B cos x',
    y: (x, c) => c * Math.sin(x) + Math.cos(x),
    de: 'y″ + y = 0',
    how: 'four symbols collapse to two essential constants A and B. that is why the order is 2, not 4.',
    n: 2,
    cs: [-2, -1, 0, 1, 2],
    win: { xmin: 0, xmax: 7, ymin: -3, ymax: 3 },
  },
  {
    id: 'circlesx',
    name: 'circles through the origin, centre on the x-axis',
    y: (x, c) => (c - x * x > 0 ? Math.sqrt(c - x * x) : NaN),
    de: 'y′(x² + y²) = 2xy',
    how: 'x² + y² = 2ax. one parameter. differentiate: 2x + 2yy′ = 2ay′, eliminate a using 2a = (x²+y²)/y.',
    n: 1,
    cs: [1, 2, 3, 4, 6],
    win: { xmin: -3, xmax: 3, ymin: -3, ymax: 3 },
  },
];

export const def: VisualDef = {
  id: 'family-curve',
  mount(host, props) {
    let fam = FAMS.find((f) => f.id === props.family) ?? FAMS[0];

    const plot: Plot = createPlot(host, { win: fam.win, aspect: 1.7, minH: 220, maxH: 360 });
    const deBar = equationBar(host, '');
    const howBar = equationBar(host, '');
    howBar.style.borderColor = 'rgba(158,203,255,0.45)';

    let C = 1;

    function redraw(): void {
      plot.paint((ctx, t) => {
        fam.cs.forEach((c) => {
          const pts: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: fam.y(x, c) });
          strokePoints(ctx, t, pts, { color: c === C ? INK : 'rgba(255,255,255,0.28)', width: c === C ? 2.3 : 1.1 });
        });
        // mark the point that pins the particular solution
        const px = (t.xmin + t.xmax) / 2;
        const py = fam.y(px, C);
        if (Number.isFinite(py)) {
          dot(ctx, t, px, py, ACCENT, 4);
          label(ctx, t.X(px) + 8, t.Y(py) - 8, 'C = ' + C.toFixed(2), ACCENT);
        }
      });

      deBar.textContent = fam.de;
      howBar.textContent = fam.how;
    }

    slider(host, {
      label: 'parameter C',
      min: -3,
      max: 3,
      step: 0.05,
      value: C,
      fmt: (v) => v.toFixed(2),
      onInput: (v) => {
        C = v;
        redraw();
      },
    });

    const sel = el('select');
    FAMS.forEach((f) => {
      const o = document.createElement('option');
      o.value = f.id;
      o.textContent = f.name;
      sel.appendChild(o);
    });
    sel.value = fam.id;
    sel.addEventListener('change', () => {
      fam = FAMS.find((f) => f.id === sel.value) ?? FAMS[0];
      if (fam.win) Object.assign(plot.window, fam.win);
      redraw();
    });
    const r = el('div', 'viz-row');
    r.append(el('span', 'viz-label', 'family'), sel, el('span', 'viz-label', `· ${fam.n} essential parameter${fam.n > 1 ? 's' : ''}`));
    host.appendChild(r);

    note(host, 'one equation, one free knob. the differential equation of the family is what all of these curves have in common — the parameter has been traded for a derivative.');

    void DIM;
    redraw();
    return { destroy: () => plot.destroy() };
  },
};