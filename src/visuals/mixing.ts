import type { VisualDef } from './types';
import { el } from './kit';

/** mixing tank — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'mixing',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'mixing tank: visual coming soon.'));
  },
};
