import type { VisualDef } from './types';
import { el } from './kit';

/** homogeneous substitution y = vx — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'homogeneous',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'homogeneous substitution y = vx: visual coming soon.'));
  },
};
