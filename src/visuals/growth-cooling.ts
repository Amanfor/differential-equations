import type { VisualDef } from './types';
import { el } from './kit';

/** growth, decay and cooling — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'growth-cooling',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'growth, decay and cooling: visual coming soon.'));
  },
};
