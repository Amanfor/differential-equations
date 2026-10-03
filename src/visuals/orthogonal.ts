import type { VisualDef } from './types';
import {
  createPlot,
  drawAxes,
  strokePoints,
  dot,
  label,
  slider,
  select,
  equationBar,
  note,
  el,
  INK,
  DIM,
  FAINT,
  ACCENT,
  type Plot,
} from './kit';

interface Family {
  id: string;
  name: string;
  /** the given family as y(x) for a parameter value */
  given: (x: number, c: number) => number;
  /** its orthogonal trajectories as y(x) for a parameter value */
  ortho: (x: number, c: number) => number;
  /** the parameter-free differential equation of the given family */
  de: string;
  /** what the substitution does */
  rule: string;
  cs: number[];
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const FAMILIES: Family[] = [
  {
    id: 'circles',
    name: 'circles x² + y² = c²',
    given: (x, c) => (c * c - x * x > 0 ? Math.sqrt(c * c - x * x) : NaN),
    ortho: (x, c) => c * x,
    de: "2x + 2y y' = 0  ⟹  y' = −x/y",
    rule: "replace y' with −1/y'  →  y' = y/x  ⟹  y = kx  (the radii)",
    cs: [1.2, 2.2, 3.2, 4.2],
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'parabolas',
    name: 'parabolas y² = 4ax',
    given: (x, c) => (c * x > 0 ? Math.sqrt(c * x) : NaN),
    ortho: (x, c) => (2 * c - 2 * x * x > 0 ? Math.sqrt(Math.max(0, 2 * c - 2 * x * x)) : NaN),
    de: "2y y' = 4a = y²/x  ⟹  y' = y/(2x)",
    rule: "replace y' with −1/y'  →  y' = −2x/y  ⟹  2x² + y² = C  (coaxial ellipses)",
    cs: [1.2, 2.2, 3.2, 4.2],
    win: { xmin: -3, xmax: 6, ymin: -3, ymax: 5 },
  },
  {
    id: 'hyperbolas',
    name: 'hyperbolas xy = c',
    given: (x, c) => (x === 0 ? NaN : c / x),
    ortho: (x, c) => (x * x - c * c > 0 ? Math.sqrt(Math.max(0, x * x - c * c)) : NaN),
    de: "y + x y' = 0  ⟹  y' = −y/x",
    rule: "replace y' with −1/y'  →  y' = x/y  ⟹  x² − y² = k",
    cs: [0.8, 1.6, 2.4],
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'lines',
    name: 'parallel lines y = mx + b',
    given: (_x, c) => c,
    ortho: (x, c) => -x + c,
    de: "y' = m  (constant slope)",
    rule: "replace y' with −1/y'  →  y' = −1/m  (the orthogonal parallel family)",
    cs: [1.2, 2.2, 3.2, 4.2],
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'rays',
    name: 'rays y = kx',
    given: (x, c) => c * x,
    ortho: (x, c) => (x * x + c * c > 0 ? Math.sqrt(Math.max(0, x * x + c * c)) : NaN),
    de: "y' = y/x",
    rule: "replace y' with −1/y'  →  y' = −x/y  ⟹  x² + y² = C  (circles about the origin)",
    cs: [0.8, 1.6, 2.4, 3.2],
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
];

export const def: VisualDef = {
  id: 'orthogonal',
  mount(host, props) {
    let fam = FAMILIES.find((f) => f.id === props.family) ?? FAMILIES[0];
    let showOrtho = true;

    const plot: Plot = createPlot(host, { win: fam.win, aspect: 1.55, minH: 240, maxH: 400 });
    const deBar = equationBar(host, '');
    const ruleBar = equationBar(host, '');
    ruleBar.style.borderColor = 'rgba(158,203,255,0.45)';

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);

        // the original family — solid, white
        fam.cs.forEach((c) => {
          const pts: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: fam.given(x, c) });
          strokePoints(ctx, t, pts, { color: 'rgba(255,255,255,0.75)', width: 1.6 });
        });

        if (showOrtho) {
          // orthogonal trajectories — dashed, tinted
          fam.cs.forEach((c) => {
            const pts: Array<{ x: number; y: number }> = [];
            for (let x = t.xmin; x <= t.xmax; x += 0.04) pts.push({ x, y: fam.ortho(x, c) });
            strokePoints(ctx, t, pts, { color: 'rgba(158,203,255,0.9)', width: 1.6, dash: [6, 4] });
          });
        }

        // mark a right angle where one blue curve meets one white curve
        markRightAngle(ctx, t);
      });

      deBar.textContent = fam.de;
      ruleBar.textContent = fam.rule;
    }

    function markRightAngle(ctx: CanvasRenderingContext2D, t: Plot['t']): void {
      // pick the intersection of the largest members, approximately
      const c1 = fam.cs[fam.cs.length - 1];
      const c2 = fam.cs[0];
      let bx = 0;
      let by = 0;
      let bestErr = Infinity;
      for (let x = t.xmin; x <= t.xmax; x += 0.02) {
        const y1 = fam.given(x, c1);
        const y2 = fam.ortho(x, c2);
        if (!Number.isFinite(y1) || !Number.isFinite(y2)) continue;
        const err = Math.abs(y1 - y2);
        if (err < bestErr) {
          bestErr = err;
          bx = x;
          by = y1;
        }
      }
      if (bestErr > 0.35 || !Number.isFinite(by)) return;

      // local slopes via finite differences
      const h = 0.02;
      const m1 = (fam.given(bx + h, c1) - fam.given(bx - h, c1)) / (2 * h);
      const m2 = (fam.ortho(bx + h, c2) - fam.ortho(bx - h, c2)) / (2 * h);
      if (![m1, m2].every(Number.isFinite)) return;

      const px = t.X(bx);
      const py = t.Y(by);
      const r = 13;
      const a1 = Math.atan(m1);
      const a2 = Math.atan(m2);

      ctx.save();
      ctx.strokeStyle = 'rgba(125,255,168,0.95)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, r, -a1, -a1 - Math.PI / 2, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(px, py, r + 5, -a2, -a2 - Math.PI / 2, false);
      ctx.stroke();
      ctx.restore();
      dot(ctx, t, bx, by, '#7dffa8', 3);
      label(ctx, px + 18, py - 14, '90°', 'rgba(125,255,168,0.95)');
    }

    const toggle = el('button', 'btn btn-ghost', 'hide trajectories');
    toggle.type = 'button';
    toggle.setAttribute('aria-pressed', 'true');
    toggle.addEventListener('click', () => {
      showOrtho = !showOrtho;
      toggle.setAttribute('aria-pressed', String(showOrtho));
      toggle.textContent = showOrtho ? 'hide trajectories' : 'show trajectories';
      redraw();
    });

    const sel = el('select');
    FAMILIES.forEach((f) => {
      const o = document.createElement('option');
      o.value = f.id;
      o.textContent = f.name;
      sel.appendChild(o);
    });
    sel.value = fam.id;
    sel.addEventListener('change', () => {
      fam = FAMILIES.find((f) => f.id === sel.value) ?? FAMILIES[0];
      if (fam.win) Object.assign(plot.window, fam.win);
      redraw();
    });

    const r = el('div', 'viz-row');
    r.append(el('span', 'viz-label', 'family'), sel, toggle);
    host.appendChild(r);

    note(
      host,
      'solid white is the given family, dashed blue crosses every one of it at a right angle. the green arcs mark a 90° angle — that is the whole definition, and the green dot shows why the substitution y′ → −1/y′ is the right move.'
    );

    redraw();
    return { destroy: () => plot.destroy() };
  },
};