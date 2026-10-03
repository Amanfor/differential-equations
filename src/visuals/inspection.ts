import type { VisualDef } from './types';
import { el } from './kit';

/** exact differentials by inspection — placeholder, replaced by the visuals agent. */
export const def: VisualDef = {
  id: 'inspection',
  mount(host) {
    host.appendChild(el('p', 'viz-note', 'exact differentials by inspection: visual coming soon.'));
  },
};
