import type { VisualDef } from './types';
import { def as orderDegree } from './order-degree';
import { def as familyCurve } from './family-curve';
import { def as slopeField } from './slope-field';
import { def as tangentGeometry } from './tangent-geometry';
import { def as separable } from './separable';
import { def as homogeneous } from './homogeneous';
import { def as linearIf } from './linear-if';
import { def as bernoulli } from './bernoulli';
import { def as inspection } from './inspection';
import { def as orthogonal } from './orthogonal';
import { def as growthCooling } from './growth-cooling';
import { def as mixing } from './mixing';

const DEFS: VisualDef[] = [
  orderDegree,
  familyCurve,
  slopeField,
  tangentGeometry,
  separable,
  homogeneous,
  linearIf,
  bernoulli,
  inspection,
  orthogonal,
  growthCooling,
  mixing,
];

const MAP = new Map(DEFS.map((d) => [d.id, d]));

export function mountAllVisuals(scope: Document | HTMLElement): void {
  const root = scope as HTMLElement;
  const figs = root.querySelectorAll<HTMLElement>('[data-visual]');
  figs.forEach((fig) => {
    if (fig.hasAttribute('data-mounted')) return;
    fig.setAttribute('data-mounted', '');
    const id = fig.getAttribute('data-visual') ?? '';
    const mountPoint = fig.querySelector<HTMLElement>('[data-mount]') ?? fig;
    let props: Record<string, string> = {};
    try {
      props = JSON.parse(fig.getAttribute('data-props') || '{}');
    } catch {
      props = {};
    }
    const def = MAP.get(id);
    if (!def) {
      mountPoint.innerHTML = `<p class="err small">missing visual <code>${id}</code></p>`;
      return;
    }
    try {
      def.mount(mountPoint, props);
    } catch (err) {
      mountPoint.innerHTML = `<p class="err small">visual failed to load: ${String((err as Error)?.message ?? err)}</p>`;
      console.error(`[visual:${id}]`, err);
    }
  });
}

export { DEFS as ALL_VISUALS };
