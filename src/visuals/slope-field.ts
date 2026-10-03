import type { VisualDef } from './types';
import { el } from './kit';

/** slope field — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'slope-field',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'slope field: visual coming soon.'));
  },
};
