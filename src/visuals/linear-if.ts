import type { VisualDef } from './types';
import { el } from './kit';

/** integrating factor — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'linear-if',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'integrating factor: visual coming soon.'));
  },
};
