import type { VisualDef } from './types';
import { el } from './kit';

/** order and degree — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'order-degree',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'order and degree: visual coming soon.'));
  },
};
