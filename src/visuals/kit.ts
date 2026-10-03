/**
 * Shared canvas kit for every interactive visual.
 * Pure black background, thin white lines, DPR-aware, resize-aware.
 */

export interface Transform {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  w: number;
  h: number;
  X(x: number): number;
  Y(y: number): number;
  invX(px: number): number;
  invY(py: number): number;
}

export interface Plot {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  t: Transform;
  /** world window used for the next paint */
  window: { xmin: number; xmax: number; ymin: number; ymax: number };
  paint(fn: (ctx: CanvasRenderingContext2D, t: Transform) => void): void;
  /** css pixels → world coordinates */
  toWorld(ev: PointerEvent | MouseEvent): { x: number; y: number };
  destroy(): void;
}

export const INK = 'rgba(255,255,255,0.92)';
export const DIM = 'rgba(255,255,255,0.30)';
export const FAINT = 'rgba(255,255,255,0.13)';
export const ACCENT = '#9ecbff';
export const OK = '#7dffa8';

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

/** Wrap a canvas in a `.viz` scaffold with a resize observer. */
export function createPlot(
  host: HTMLElement,
  opts: { win?: Partial<Transform>; aspect?: number; minH?: number; maxH?: number } = {}
): Plot {
  const aspect = opts.aspect ?? 1.9;
  const minH = opts.minH ?? 200;
  const maxH = opts.maxH ?? 380;

  const box = el('div', 'viz');
  const canvas = el('canvas');
  box.appendChild(canvas);
  host.appendChild(box);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');

  const window_ = {
    xmin: opts.win?.xmin ?? -6,
    xmax: opts.win?.xmax ?? 6,
    ymin: opts.win?.ymin ?? -4,
    ymax: opts.win?.ymax ?? 4,
  };

  let cssW = 0;
  let cssH = 0;
  let painter: ((c: CanvasRenderingContext2D, t: Transform) => void) | null = null;

  function measure(): void {
    cssW = Math.max(200, host.clientWidth || box.clientWidth || 320);
    cssH = Math.max(minH, Math.min(maxH, Math.round(cssW / aspect)));
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeT(): Transform {
    const { xmin, xmax, ymin, ymax } = window_;
    const sx = cssW / (xmax - xmin);
    const sy = cssH / (ymax - ymin);
    return {
      ...window_,
      w: cssW,
      h: cssH,
      X: (x) => (x - xmin) * sx,
      Y: (y) => cssH - (y - ymin) * sy,
      invX: (px) => xmin + px / sx,
      invY: (py) => ymin + (cssH - py) / sy,
    };
  }

  const plot: Plot = {
    canvas,
    ctx,
    get t() {
      return makeT();
    },
    window: window_,
    paint(fn) {
      painter = fn;
      measure();
      const t = makeT();
      ctx.clearRect(0, 0, cssW, cssH);
      fn(ctx, t);
    },
    toWorld(ev) {
      const r = canvas.getBoundingClientRect();
      const t = makeT();
      return { x: t.invX(ev.clientX - r.left), y: t.invY(ev.clientY - r.top) };
    },
    destroy() {
      ro.disconnect();
      canvas.remove();
    },
  };

  const ro = new ResizeObserver(() => {
    if (!painter) return;
    plot.paint(painter);
  });
  ro.observe(box);

  return plot;
}

/* ------------------------------- drawing -------------------------------- */

export function drawAxes(ctx: CanvasRenderingContext2D, t: Transform, opts: { labels?: boolean } = {}): void {
  const labels = opts.labels !== false;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';

  // grid at integer ticks (nice-stepped)
  const stepX = niceStep((t.xmax - t.xmin) / 8);
  const stepY = niceStep((t.ymax - t.ymin) / 6);

  ctx.strokeStyle = FAINT;
  ctx.beginPath();
  for (let x = Math.ceil(t.xmin / stepX) * stepX; x <= t.xmax; x += stepX) {
    const px = Math.round(t.X(x)) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, t.h);
  }
  for (let y = Math.ceil(t.ymin / stepY) * stepY; y <= t.ymax; y += stepY) {
    const py = Math.round(t.Y(y)) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(t.w, py);
  }
  ctx.stroke();

  // axes
  ctx.strokeStyle = DIM;
  ctx.beginPath();
  if (t.ymin <= 0 && t.ymax >= 0) {
    const py = Math.round(t.Y(0)) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(t.w, py);
  }
  if (t.xmin <= 0 && t.xmax >= 0) {
    const px = Math.round(t.X(0)) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, t.h);
  }
  ctx.stroke();

  if (labels) {
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    if (t.ymin <= 0 && t.ymax >= 0) {
      ctx.textAlign = 'left';
      ctx.fillText('x', t.w - 12, t.Y(0) - 6);
    }
    if (t.xmin <= 0 && t.xmax >= 0) {
      ctx.textAlign = 'left';
      ctx.fillText('y', t.X(0) + 6, 12);
    }
    ctx.textAlign = 'center';
    for (let x = Math.ceil(t.xmin / stepX) * stepX; x <= t.xmax; x += stepX) {
      if (Math.abs(x) < 1e-9) continue;
      const px = t.X(x);
      if (px < 10 || px > t.w - 10) continue;
      ctx.fillText(fmt(x), px, t.Y(0) + 14);
    }
    ctx.textAlign = 'right';
    for (let y = Math.ceil(t.ymin / stepY) * stepY; y <= t.ymax; y += stepY) {
      if (Math.abs(y) < 1e-9) continue;
      const py = t.Y(y);
      if (py < 10 || py > t.h - 10) continue;
      ctx.fillText(fmt(y), t.X(0) - 6, py + 3);
    }
  }
  ctx.restore();
}

export function niceStep(raw: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(Math.max(raw, 1e-9))));
  const n = raw / p;
  const m = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10;
  return m * p;
}

export function fmt(v: number): string {
  if (Math.abs(v) < 1e-9) return '0';
  const r = Math.round(v * 1000) / 1000;
  return Number.isInteger(r) ? String(r) : String(r);
}

/** Slope tick marks (the "field") on a grid. */
export function slopeField(
  ctx: CanvasRenderingContext2D,
  t: Transform,
  f: (x: number, y: number) => number,
  opts: { nx?: number; ny?: number; len?: number; color?: string } = {}
): void {
  const nx = opts.nx ?? 22;
  const ny = opts.ny ?? 13;
  const len = opts.len ?? 11;
  ctx.save();
  ctx.strokeStyle = opts.color ?? 'rgba(255,255,255,0.42)';
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  for (let i = 1; i < nx; i++) {
    const x = t.xmin + ((t.xmax - t.xmin) * i) / nx;
    for (let j = 1; j < ny; j++) {
      const y = t.ymin + ((t.ymax - t.ymin) * j) / ny;
      let m: number;
      try {
        m = f(x, y);
      } catch {
        continue;
      }
      if (!Number.isFinite(m)) continue;
      const ang = Math.atan(m);
      const dx = (Math.cos(ang) * len) / 2;
      const dy = (Math.sin(ang) * len) / 2;
      const px = t.X(x);
      const py = t.Y(y);
      ctx.beginPath();
      ctx.moveTo(px - dx, py + dy);
      ctx.lineTo(px + dx, py - dy);
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** Integrate y' = f(x, y) with RK4; returns points, stopping on blow-up. */
export function integrate(
  f: (x: number, y: number) => number,
  x0: number,
  y0: number,
  t: Transform,
  opts: { dir?: 1 | -1; steps?: number; maxSteps?: number } = {}
): Array<{ x: number; y: number }> {
  const dir = opts.dir ?? 1;
  const n = opts.steps ?? 600;
  const span = dir > 0 ? t.xmax - x0 : x0 - t.xmin;
  const h = span / n;
  const pts: Array<{ x: number; y: number }> = [];
  if (!Number.isFinite(y0)) return pts;
  let x = x0;
  let y = y0;
  pts.push({ x, y });
  const lim = (t.ymax - t.ymin) * 40 + 1000;
  for (let i = 0; i < n; i++) {
    const k1 = f(x, y);
    const k2 = f(x + h / 2, y + (h / 2) * k1);
    const k3 = f(x + h / 2, y + (h / 2) * k2);
    const k4 = f(x + h, y + h * k3);
    if (![k1, k2, k3, k4].every(Number.isFinite)) break;
    y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    x += h;
    if (!Number.isFinite(y) || Math.abs(y) > lim) break;
    pts.push({ x, y });
    if (x < t.xmin - 1e-9 || x > t.xmax + 1e-9) break;
  }
  return pts;
}

export function strokePoints(
  ctx: CanvasRenderingContext2D,
  t: Transform,
  pts: Array<{ x: number; y: number }>,
  style: { color?: string; width?: number; dash?: number[]; clip?: boolean } = {}
): void {
  if (pts.length < 2) return;
  ctx.save();
  if (style.clip !== false) {
    ctx.beginPath();
    ctx.rect(0, 0, t.w, t.h);
    ctx.clip();
  }
  ctx.strokeStyle = style.color ?? INK;
  ctx.lineWidth = style.width ?? 1.6;
  ctx.lineJoin = 'round';
  if (style.dash) ctx.setLineDash(style.dash);
  ctx.beginPath();
  let pen = false;
  for (const p of pts) {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) {
      pen = false;
      continue;
    }
    const px = t.X(p.x);
    const py = t.Y(p.y);
    if (!pen) {
      ctx.moveTo(px, py);
      pen = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
  ctx.restore();
}

export function dot(
  ctx: CanvasRenderingContext2D,
  t: Transform,
  x: number,
  y: number,
  color = ACCENT,
  r = 4
): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(t.X(x), t.Y(y), r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function label(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color = 'rgba(255,255,255,0.65)',
  align: CanvasTextAlign = 'left'
): void {
  ctx.save();
  ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  ctx.restore();
}

/** Small control builders shared by the visuals. */
export function row(labelText: string): { row: HTMLElement; slot: HTMLElement } {
  const r = el('div', 'viz-row');
  if (labelText) r.appendChild(el('span', 'viz-label', labelText));
  const slot = el('span', 'viz-row');
  r.appendChild(slot);
  return { row: r, slot };
}

export function slider(
  host: HTMLElement,
  opts: { label: string; min: number; max: number; step: number; value: number; fmt?: (v: number) => string; onInput: (v: number) => void }
): { input: HTMLInputElement; set(v: number): void } {
  const r = el('div', 'viz-row');
  const lab = el('span', 'viz-label', opts.label);
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(opts.min);
  input.max = String(opts.max);
  input.step = String(opts.step);
  input.value = String(opts.value);
  const out = el('span', 'viz-readout', (opts.fmt ?? String)(opts.value));
  r.append(lab, input, out);
  host.appendChild(r);
  input.addEventListener('input', () => {
    const v = Number(input.value);
    out.textContent = (opts.fmt ?? String)(v);
    opts.onInput(v);
  });
  return {
    input,
    set(v: number) {
      input.value = String(v);
      out.textContent = (opts.fmt ?? String)(v);
    },
  };
}

export function select(
  host: HTMLElement,
  opts: { label: string; options: Array<{ value: string; label: string }>; value: string; onChange: (v: string) => void }
): HTMLSelectElement {
  const r = el('div', 'viz-row');
  const lab = el('span', 'viz-label', opts.label);
  const s = document.createElement('select');
  for (const o of opts.options) {
    const op = document.createElement('option');
    op.value = o.value;
    op.textContent = o.label;
    s.appendChild(op);
  }
  s.value = opts.value;
  r.append(lab, s);
  host.appendChild(r);
  s.addEventListener('change', () => opts.onChange(s.value));
  return s;
}

export function equationBar(host: HTMLElement, text: string): HTMLElement {
  const d = el('div', 'viz-eq', text);
  host.appendChild(d);
  return d;
}

export function note(host: HTMLElement, text: string): HTMLElement {
  const d = el('p', 'viz-note', text);
  d.style.margin = '0.1rem 0 0';
  host.appendChild(d);
  return d;
}
