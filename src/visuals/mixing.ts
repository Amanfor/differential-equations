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
  ACCENT,
  OK,
  type Plot,
} from './kit';

export const def: VisualDef = {
  id: 'mixing',
  mount(host) {
    const p = {
      V0: 100, // litres at t = 0
      m0: 50, // kg of solute at t = 0
      rin: 3, // L/min in
      cin: 2, // kg/L incoming concentration
      rout: 2, // L/min out
    };

    const plot: Plot = createPlot(host, {
      win: { xmin: 0, xmax: 60, ymin: 0, ymax: 220 },
      aspect: 1.75,
      minH: 230,
      maxH: 380,
    });
    const volBar = equationBar(host, '');
    const odeBar = equationBar(host, '');
    const read = equationBar(host, '');
    read.style.borderColor = 'rgba(125,255,168,0.45)';

    // V(t) = V0 + (rin − rout) t
    const V = (t: number) => Math.max(p.V0 + (p.rin - p.rout) * t, 1e-6);

    // dm/dt = rin·cin − rout·m/V(t)   — linear ODE, integrate numerically
    const f = (t: number, m: number) => p.rin * p.cin - (p.rout * m) / V(t);

    let curve: Array<{ x: number; y: number }> = [];

    function redraw(): void {
      curve = integrate(f, 0, p.m0, plot.t, { dir: 1, steps: 900 });
      const conc = curve.map((q) => ({ x: q.x, y: (q.y / V(q.x)) * 100 }));

      plot.paint((ctx, t) => {
        drawAxes(ctx, t);

        // tank volume, as a faint area
        strokePoints(
          ctx,
          t,
          [
            { x: t.xmin, y: 0 },
            { x: t.xmin, y: V(t.xmin) },
            { x: t.xmax, y: V(t.xmax) },
          ],
          { color: 'rgba(255,255,255,0.25)', width: 1.4, dash: [5, 4] }
        );
        label(ctx, 8, 14, 'dashed = tank volume V(t) in litres', 'rgba(255,255,255,0.55)');

        // concentration, scaled to share the axis
        const fin = conc.filter((q) => Number.isFinite(q.y));
        if (fin.length) {
          const hi = Math.max(...fin.map((q) => q.y), 1);
          const scale = (t.ymax * 0.5) / hi;
          strokePoints(
            ctx,
            t,
            conc.map((q) => ({ x: q.x, y: Number.isFinite(q.y) ? q.y * scale : NaN })),
            { color: 'rgba(158,203,255,0.85)', width: 1.8 }
          );
          label(ctx, t.X(t.xmax) - 6, t.Y(fin[fin.length - 1].y * scale) - 8, 'concentration ×scale', 'rgba(158,203,255,0.9)', 'right');
        }

        // the solute mass itself
        strokePoints(ctx, t, curve, { color: INK, width: 2.4 });

        // asymptote when the tank fills and drains at equal rates
        if (Math.abs(p.rin - p.rout) < 1e-9) {
          const eq = (p.rin * p.cin * p.V0) / p.rout;
          strokePoints(
            ctx,
            t,
            [
              { x: t.xmin, y: eq },
              { x: t.xmax, y: eq },
            ],
            { color: 'rgba(125,255,168,0.6)', width: 1.3, dash: [6, 4] }
          );
          label(ctx, t.X(t.xmax) - 6, t.Y(eq) - 6, `equilibrium ${eq.toFixed(1)} kg`, 'rgba(125,255,168,0.9)', 'right');
        }
      });

      const dV = p.rin - p.rout;
      volBar.textContent =
        `V(t) = ${p.V0} + (${p.rin} − ${p.rout})t = ${p.V0} ${dV >= 0 ? '+' : '−'} ${Math.abs(dV).toFixed(1)}t  litres`;
      odeBar.textContent = `dm/dt = ${p.rin}·${p.cin} − (${p.rout} m)/V(t)   ⟹   dm/dt + (${p.rout}/V(t))m = ${(p.rin * p.cin).toFixed(1)}`;

      const at10 = curve.reduce((best, q) => (Math.abs(q.x - 10) < Math.abs(best.x - 10) ? q : best), curve[0]);
      const at30 = curve.reduce((best, q) => (Math.abs(q.x - 30) < Math.abs(best.x - 30) ? q : best), curve[0]);
      const c30 = (at30.y / V(30)) * 100;
      read.textContent = `m(10) = ${at10.y.toFixed(2)} kg   ·   m(30) = ${at30.y.toFixed(2)} kg   ·   concentration at 30 min = ${c30.toFixed(3)} kg/L`;
    }

    const add = (labelText: string, key: keyof typeof p, min: number, max: number, step: number) => {
      slider(host, {
        label: labelText,
        min,
        max,
        step,
        value: p[key],
        fmt: (v) => v.toFixed(step < 1 ? 2 : 0),
        onInput: (v) => {
          p[key] = v;
          redraw();
        },
      });
    };

    add('initial volume V₀ (L)', 'V0', 40, 200, 10);
    add('initial solute m₀ (kg)', 'm0', 0, 150, 5);
    add('inflow r_in (L/min)', 'rin', 0, 8, 0.5);
    add('inflow concentration c_in (kg/L)', 'cin', 0, 5, 0.25);
    add('outflow r_out (L/min)', 'rout', 0, 8, 0.5);

    note(
      host,
      'the coefficient of m is r_out/V(t), and V(t) is linear in t — so this is a first-order linear equation whose integrating factor is exp(∫ r_out/V(t) dt). set r_in = r_out to see the mass settle at an equilibrium instead of growing without bound.'
    );

    redraw();
    return { destroy: () => plot.destroy() };
  },
};