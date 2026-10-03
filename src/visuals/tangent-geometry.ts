import type { VisualDef } from './types';
import { el } from './kit';

/** tangent and normal geometry — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'tangent-geometry',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'tangent and normal geometry: visual coming soon.'));
  },
};
