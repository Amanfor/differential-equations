import type { VisualDef } from './types';
import { el } from './kit';

/** formation of a family — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'family-curve',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'formation of a family: visual coming soon.'));
  },
};
