/**
 * "Recognise the type" — the method chooser.
 *
 * JEE rarely hands you a labelled equation; it hands you an equation. Being
 * able to look at it and say "that is linear in x, not y" is the skill.
 */

export type MethodKey =
  | 'separable'
  | 'homogeneous'
  | 'linear'
  | 'bernoulli'
  | 'reducible'
  | 'exact'
  | 'none';

export interface Method {
  key: MethodKey;
  label: string;
  /** the one-line tell that gives the type away */
  tell: string;
}

export const METHODS: Method[] = [
  { key: 'separable', label: 'variable separable', tell: 'every x sits with dx, every y sits with dy' },
  { key: 'homogeneous', label: 'homogeneous (y = vx)', tell: 'quotient of same-degree pieces — only y/x survives' },
  { key: 'linear', label: 'linear (integrating factor)', tell: 'y and y′ appear to power 1 and never multiplied' },
  { key: 'bernoulli', label: 'Bernoulli (z = y^(1−n))', tell: 'linear, except for one extra yⁿ on the right' },
  { key: 'reducible', label: 'reducible by substitution', tell: 'a blob like ax + by + c, or f(y) riding on y′' },
  { key: 'exact', label: 'exact / by inspection', tell: 'M dx + N dy = 0 with ∂M/∂y = ∂N/∂x' },
  { key: 'none', label: 'none of these', tell: 'the tell is missing — look closer before you commit' },
];

export interface ChooserItem {
  id: string;
  /** the equation the student must classify (math between $...$) */
  equation: string;
  answer: MethodKey;
  /** why this is the type — and why the near-miss is not */
  why: string;
  /** shown after answering, an extra observation worth having */
  tip?: string;
  topic: string;
}

export const CHOOSER: ChooserItem[] = [];

export function chooserFor(topic: string): ChooserItem[] {
  return CHOOSER.filter((c) => c.topic === topic);
}
