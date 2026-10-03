import type { VisualDef } from './types';
import { el } from './kit';

/** orthogonal trajectories — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'orthogonal',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'orthogonal trajectories: visual coming soon.'));
  },
};
