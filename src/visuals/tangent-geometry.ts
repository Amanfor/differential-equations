import type { VisualDef } from './types';
import { createPlot, drawAxes, strokePoints, dot, label, slider, equationBar, note, el, INK, DIM, ACCENT, OK, type Plot } from './kit';

const CURVES = [
  { id: 'parabola', name: 'y = x²', f: (x: number) => x * x, win: { xmin: -2.4, xmax: 2.4, ymin: -0.6, ymax: 4.2 } },
  { id: 'circle', name: 'x² + y² = 4', f: (x: number) => Math.sqrt(Math.max(0, 4 - x * x)), win: { xmin: -2.8, xmax: 2.8, ymin: -2.8, ymax: 2.8 } },
  { id: 'sine', name: 'y = 2 sin x', f: (x: number) => 2 * Math.sin(x), win: { xmin: -0.6, xmax: 6.4, ymin: -2.8, ymax: 2.8 } },
  { id: 'log', name: 'y = ln x', f: (x: number) => Math.log(Math.max(x, 1e-6)), win: { xmin: 0.1, xmax: 5, ymin: -3, ymax: 2.4 } },
];

export const def: VisualDef = {
  id: 'tangent-geometry',
  mount(host, props) {
    let curve = CURVES.find((c) => c.id === props.curve) ?? CURVES[0];
    let a = 0.6;

    const plot: Plot = createPlot(host, { win: curve.win, aspect: 1.6, minH: 230, maxH: 380 });
    const bar = equationBar(host, '');

    const READ = () => {
      const x = a;
      const y = curve.f(x);
      const h = 1e-4;
      const m = (curve.f(x + h) - curve.f(x - h)) / (2 * h);
      if (![x, y, m].every(Number.isFinite)) return null;
      const ST = Math.abs(y / m);
      const SN = Math.abs(y * m);
      const PT = ST * Math.sqrt(1 + m * m);
      const PN = Math.abs(y) * Math.sqrt(1 + m * m);
      const XT = x - y / m;
      const YT = y - x * m;
      const XN = x + y * m;
      const YN = y + x / m;
      return { x, y, m, ST, SN, PT, PN, XT, YT, XN, YN };
    };

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);

        // the curve
        const pts: Array<{ x: number; y: number }> = [];
        for (let x = t.xmin; x <= t.xmax; x += 0.02) pts.push({ x, y: curve.f(x) });
        strokePoints(ctx, t, pts, { color: 'rgba(255,255,255,0.8)', width: 1.9 });

        const r = READ();
        if (!r) return;

        // tangent and normal lines
        const seg = (m: number, color: string) => {
          const p1 = { x: r.x - (t.xmax - t.xmin) * 0.4, y: r.y + m * ((t.xmax - t.xmin) * 0.4 * -1) };
          const p2 = { x: r.x + (t.xmax - t.xmin) * 0.4, y: r.y + m * (t.xmax - t.xmin) * 0.4 };
          strokePoints(ctx, t, [p1, p2], { color, width: 1.6, dash: [6, 4] });
        };
        seg(r.m, 'rgba(158,203,255,0.95)');
        seg(-1 / r.m, 'rgba(255,139,139,0.9)');

        // intercepts
        dot(ctx, t, r.XT, 0, ACCENT, 3.5);
        dot(ctx, t, 0, r.YT, ACCENT, 3.5);
        dot(ctx, t, r.XN, 0, '#ff8b8b', 3.5);
        dot(ctx, t, 0, r.YN, '#ff8b8b', 3.5);
        label(ctx, t.X(r.XT) + 5, t.Y(0) - 6, 'T (x-int of tangent)', 'rgba(158,203,255,0.9)');
        label(ctx, t.X(r.XN) + 5, t.Y(0) + 14, 'N (x-int of normal)', 'rgba(255,139,139,0.9)');

        // subtangent / subnormal projections onto the x-axis
        const yOff = 16;
        strokePoints(ctx, t, [{ x: r.XT, y: yOff }, { x: r.x, y: yOff }], { color: ACCENT, width: 2.2 });
        strokePoints(ctx, t, [{ x: r.x, y: -yOff }, { x: r.XN, y: -yOff }], { color: '#ff8b8b', width: 2.2 });
        label(ctx, t.X((r.XT + r.x) / 2), t.Y(yOff) + 13, `|ST| = ${r.ST.toFixed(2)}`, ACCENT, 'center');
        label(ctx, t.X((r.x + r.XN) / 2), t.Y(-yOff) - 5, `|SN| = ${r.SN.toFixed(2)}`, '#ff8b8b', 'center');

        // the point of contact
        dot(ctx, t, r.x, r.y, OK, 5);
        label(ctx, t.X(r.x) + 10, t.Y(r.y) - 10, `P(${r.x.toFixed(2)}, ${r.y.toFixed(2)})`, OK);
        label(ctx, 8, 14, 'blue = tangent,  red = normal', 'rgba(255,255,255,0.65)');
      });

      const r = READ();
      bar.textContent = r
        ? `m = ${r.m.toFixed(3)}   |  |ST| = |y/y′| = ${r.ST.toFixed(3)}   |  |SN| = |yy′| = ${r.SN.toFixed(
            3
          )}   |  |PT| = ${r.PT.toFixed(3)}   |  |PN| = ${r.PN.toFixed(3)}`
        : 'move the point where the tangent is defined';
    }

    slider(host, {
      label: 'point of contact P',
      min: curve.win.xmin + 0.25,
      max: curve.win.xmax - 0.25,
      step: 0.01,
      value: a,
      fmt: (v) => v.toFixed(2),
      onInput: (v) => {
        a = v;
        redraw();
      },
    });

    const sel = el('select');
    CURVES.forEach((c) => {
      const o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name;
      sel.appendChild(o);
    });
    sel.value = curve.id;
    sel.addEventListener('change', () => {
      curve = CURVES.find((c) => c.id === sel.value) ?? CURVES[0];
      Object.assign(plot.window, curve.win);
      a = (curve.win.xmin + curve.win.xmax) / 3;
      redraw();
    });
    const r2 = el('div', 'viz-row');
    r2.append(el('span', 'viz-label', 'curve'), sel);
    host.appendChild(r2);

    note(
      host,
      'subtangent and subnormal are projections onto the x-axis: the horizontal piece of the tangent and of the normal. watch |ST| = |y/y′| blow up as the tangent flattens, and |SN| = |yy′| vanish.'
    );

    void INK;
    void DIM;
    redraw();
    return { destroy: () => plot.destroy() };
  },
};