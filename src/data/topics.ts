export interface TopicMeta {
  slug: string;
  title: string;
  blurb: string;
  minutes: number;
  /** ids of interactive visuals used by this topic (see src/visuals/registry.ts) */
  visuals: string[];
  keywords: string[];
}

/** Merged, de-duplicated topic list — union of nomad chapters 23 and 44. */
export const TOPICS: TopicMeta[] = [
  {
    slug: 'order-and-degree',
    title: 'order and degree',
    blurb: 'how to read a differential equation before you solve it — highest derivative, power, and the constants that actually count.',
    minutes: 7,
    visuals: ['order-degree'],
    keywords: ['order', 'degree', 'polynomial', 'essential constants', 'arbitrary constants', 'undefined degree', 'transcendental'],
  },
  {
    slug: 'formation',
    title: 'formation, general and particular solutions',
    blurb: 'kill the constants: differentiate n times, eliminate n constants, and see why the order equals the number of free parameters.',
    minutes: 8,
    visuals: ['family-curve'],
    keywords: ['formation', 'eliminate constants', 'general solution', 'particular solution', 'singular solution', 'family of curves', 'initial condition'],
  },
  {
    slug: 'slope-fields',
    title: 'slope fields and the geometry of a solution',
    blurb: 'what a differential equation really says: at every point the plane carries an arrow. a solution is a path that never crosses an arrow.',
    minutes: 7,
    visuals: ['slope-field', 'tangent-geometry'],
    keywords: ['slope field', 'direction field', 'isocline', 'integral curve', 'tangent', 'normal', 'subtangent', 'subnormal', 'geometric'],
  },
  {
    slug: 'variable-separable',
    title: 'variable separable',
    blurb: 'the simplest move in the subject: get every x with dx, every y with dy, then integrate. plus the ax + by + c trick.',
    minutes: 8,
    visuals: ['separable'],
    keywords: ['separable', 'separate variables', 'integrating', 'ax+by+c', 'substitution', 'reducible'],
  },
  {
    slug: 'homogeneous',
    title: 'homogeneous equations (y = vx)',
    blurb: 'why does one substitution work? because the equation only sees the ratio y/x — and v = y/x is exactly that ratio.',
    minutes: 9,
    visuals: ['homogeneous'],
    keywords: ['homogeneous', 'y = vx', 'substitution', 'ratio', 'dv/dx', 'shift of origin', 'parallel lines', 'cross multiplication'],
  },
  {
    slug: 'linear-first-order',
    title: 'linear first-order equations',
    blurb: 'the integrating factor is not a formula to memorise — it is the answer to a one-line question, derived in front of you.',
    minutes: 10,
    visuals: ['linear-if'],
    keywords: ['linear', 'integrating factor', 'IF', 'e^int P', 'Leibniz', 'dx/dy', 'linear in x', 'first order'],
  },
  {
    slug: 'reducible-equations',
    title: 'equations reducible to these forms',
    blurb: 'Bernoulli, generalised linear, and Clairaut: three disguises that collapse into forms you already know.',
    minutes: 9,
    visuals: ['bernoulli'],
    keywords: ['Bernoulli', 'reducible', 'z = y^(1-n)', 'generalised linear', 'Clairaut', 'singular solution', 'envelope', 'substitution'],
  },
  {
    slug: 'exact-and-inspection',
    title: 'exact equations and inspection',
    blurb: 'recognise a perfect differential on sight: d(xy), d(y/x), d(atan(y/x)) — and integrate without doing any work.',
    minutes: 8,
    visuals: ['inspection'],
    keywords: ['exact', 'inspection', 'M dx + N dy', 'partial derivative', 'potential function', 'd(xy)', 'polar', 'r dr'],
  },
  {
    slug: 'orthogonal-trajectories',
    title: 'orthogonal trajectories',
    blurb: 'find the family that crosses every curve of your family at a right angle — one substitution turns slopes upside down.',
    minutes: 8,
    visuals: ['orthogonal'],
    keywords: ['orthogonal', 'trajectories', 'perpendicular', 'families of curves', 'y -> -1/y', 'polar trajectory'],
  },
  {
    slug: 'applications',
    title: 'applications: growth, cooling, mixing, motion',
    blurb: 'where the maths meets the world: populations, radioactive clocks, cooling coffee, tanks of salt, and an RL circuit switching on.',
    minutes: 10,
    visuals: ['growth-cooling', 'mixing'],
    keywords: ['growth', 'decay', 'Newton cooling', 'mixing', 'tank', 'half life', 'logistic', 'RL circuit', 'application', 'motion', 'population'],
  },
];

export const TOPIC_BY_SLUG = new Map(TOPICS.map((t) => [t.slug, t]));

export function topicIndex(slug: string) {
  return TOPICS.findIndex((t) => t.slug === slug);
}
