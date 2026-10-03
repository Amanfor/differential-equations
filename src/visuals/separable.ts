import type { VisualDef } from './types';
import { el } from './kit';

/** separable equations — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'separable',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'separable equations: visual coming soon.'));
  },
};
