import type { VisualDef } from './types';
import { el } from './kit';

/** Bernoulli reduction — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'bernoulli',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'Bernoulli reduction: visual coming soon.'));
  },
};
