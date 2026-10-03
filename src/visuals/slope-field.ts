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

interface Eq {
  id: string;
  name: string;
  f: (x: number, y: number) => number;
  /** closed form used to draw the family, if we have one */
  family?: (C: number) => (x: number) => number;
  win?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

const EQS: Eq[] = [
  {
    id: 'linear',
    name: "y' = x − y",
    f: (x, y) => x - y,
    family: (C) => (x) => x - 1 + C * Math.exp(-x),
    win: { xmin: -4, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'circles',
    name: "y' = −x/y   (x² + y² = C)",
    f: (x, y) => (y === 0 ? 0 : -x / y),
    family: (C) => (x) => (C - x * x) > 0 ? Math.sqrt(C - x * x) : NaN,
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'logistic',
    name: "y' = y(1 − y/4)",
    f: (x, y) => y * (1 - y / 4),
    family: (C) => (x) => 4 / (1 + C * Math.exp(-x)),
    win: { xmin: -5, xmax: 5, ymin: -0.6, ymax: 4.6 },
  },
  {
    id: 'parabola',
    name: "y' = 2x   (parabolas)",
    f: (x) => 2 * x,
    family: (C) => (x) => x * x + C,
    win: { xmin: -3, xmax: 3, ymin: -4, ymax: 6 },
  },
  {
    id: 'sine',
    name: "y' = cos y   (ripples)",
    f: (x, y) => Math.cos(y),
    win: { xmin: -6, xmax: 6, ymin: -6, ymax: 6 },
  },
  {
    id: 'radial',
    name: "y' = y/x   (rays)",
    f: (x, y) => (x === 0 ? 0 : y / x),
    family: (C) => (x) => C * x,
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'tangent',
    name: "y' = −y/x   (circles through 0)",
    f: (x, y) => (x === 0 ? 0 : -y / x),
    win: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
  },
  {
    id: 'damped',
    name: "y' = −y + sin x",
    f: (x, y) => -y + Math.sin(x),
    family: (C) => (x) => (Math.sin(x) - Math.cos(x)) / 2 + C * Math.exp(-x),
    win: { xmin: -2, xmax: 8, ymin: -3, ymax: 4 },
  },
];

export const def: VisualDef = {
  id: 'slope-field',
  mount(host, props) {
    let eq = EQS.find((e) => e.id === props.eq) ?? EQS[0];

    const plot: Plot = createPlot(host, { win: eq.win, aspect: 1.75, minH: 240, maxH: 400 });

    const controls = el('div', 'viz-row');
    host.appendChild(controls);

    const eqBar = equationBar(host, '');
    const hint = note(host, 'click anywhere on the plot to set the initial condition (y₀).');

    let ic = { x: 0, y: 0 };
    let showField = true;
    let C = 1;

    function redraw(): void {
      plot.paint((ctx, t) => {
        drawAxes(ctx, t);
        if (showField) slopeField(ctx, t, eq.f);

        // the whole family, lightly, for the highlighted constant
        if (eq.family) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255,255,255,0.22)';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          for (let k = -3; k <= 3; k++) {
            if (Math.abs(k) < 1e-9) continue;
            const yOf = eq.family!(k);
            ctx.moveTo(t.X(t.xmin), t.Y(yOf(t.xmin)));
            ctx.lineTo(t.X(t.xmax), t.Y(yOf(t.xmax)));
          }
          ctx.stroke();
          ctx.restore();

          // highlighted member
          const yOf = eq.family(C);
          const pts: Array<{ x: number; y: number }> = [];
          for (let x = t.xmin; x <= t.xmax; x += 0.05) pts.push({ x, y: yOf(x) });
          strokePoints(ctx, t, pts, { color: DIM, width: 2, dash: [5, 4] });
        }

        // the solution through the initial condition, both directions
        if (Number.isFinite(ic.y)) {
          const fwd = integrate(eq.f, ic.x, ic.y, t, { dir: 1, steps: 500 });
          const back = integrate(eq.f, ic.x, ic.y, t, { dir: -1, steps: 500 }).reverse();
          strokePoints(ctx, t, [...back, ...fwd], { color: INK, width: 2.2 });
          dot(ctx, t, ic.x, ic.y, ACCENT, 4.5);
          label(ctx, t.X(ic.x) + 8, t.Y(ic.y) - 8, 'initial condition', ACCENT);
        }
      });

      eqBar.textContent = eq.name;
    }

    // ---- picking the equation
    select(host, {
      label: 'equation',
      options: EQS.map((e) => ({ value: e.id, label: e.name })),
      value: eq.id,
      onChange: (v) => {
        eq = EQS.find((e) => e.id === v) ?? EQS[0];
        if (eq.win) Object.assign(plot.window, eq.win);
        ic = { x: 0, y: Math.max(eq.win ? eq.win.ymin + 1 : -1, 0.5) };
        redraw();
      },
    });

    // ---- initial condition from a click
    const onDown = (ev: PointerEvent) => {
      const w = plot.toWorld(ev);
      ic = w;
      redraw();
    };
    plot.canvas.addEventListener('pointerdown', onDown);
    plot.canvas.addEventListener('pointermove', (ev) => {
      if (ev.buttons !== 1) return;
      ic = plot.toWorld(ev);
      redraw();
    });

    // ---- the constant C of the family
    slider(host, {
      label: 'constant C',
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

    // ---- toggles
    const fieldBtn = el('button', 'btn btn-ghost', 'hide slope field');
    fieldBtn.type = 'button';
    fieldBtn.setAttribute('aria-pressed', 'true');
    fieldBtn.addEventListener('click', () => {
      showField = !showField;
      fieldBtn.setAttribute('aria-pressed', String(showField));
      fieldBtn.textContent = showField ? 'hide slope field' : 'show slope field';
      redraw();
    });

    const resetBtn = el('button', 'btn btn-ghost', 'reset view');
    resetBtn.type = 'button';
    resetBtn.addEventListener('click', () => {
      ic = { x: 0, y: 0.5 };
      redraw();
    });

    controls.append(fieldBtn, resetBtn);

    hint.textContent = 'every arrow is a slope the equation demands at that point. a solution is a curve that is tangent to all of them.';
    redraw();

    return { destroy: () => plot.canvas.removeEventListener('pointerdown', onDown) };
  },
};