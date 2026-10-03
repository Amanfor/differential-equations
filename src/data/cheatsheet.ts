/**
 * One-page formula & method cheat sheet.
 * Data only; rendering happens in src/pages/cheatsheet.astro via renderTex.
 *
 * NOTE ON QUOTING: these strings hold LaTeX, which uses `'` freely (e.g. y\').
 * Keep every such string in single quotes with `\'` escaped, or use a
 * template literal only if the string contains no `${` sequence.
 */

import { renderTex } from '../lib/tex';

export interface CheatRow {
  class: string;
  form: string;
  substitution: string;
  answer: string;
}

export const METHOD_TABLE: CheatRow[] = [
  {
    class: 'variable separable',
    form: String.raw`$f(x)\,dx + g(y)\,dy = 0$`,
    substitution: 'direct',
    answer: String.raw`$\int f(x)dx + \int g(y)dy = C$`,
  },
  {
    class: 'reducible: $ax+by+c$',
    form: String.raw`$\frac{dy}{dx} = f(ax+by+c)$`,
    substitution: String.raw`$t = ax+by+c \implies \frac{dt}{a+bf(t)} = dx$`,
    answer: String.raw`$\int \frac{dt}{a+bf(t)} = x+C$`,
  },
  {
    class: 'homogeneous',
    form: String.raw`$\frac{dy}{dx} = F\left(\frac{y}{x}\right)$`,
    substitution: String.raw`$y=vx \implies \frac{dv}{F(v)-v} = \frac{dx}{x}$`,
    answer: String.raw`$\int \frac{dv}{F(v)-v} = \ln|x|+C$, back-sub $v=y/x$`,
  },
  {
    class: 'linear in $y$',
    form: String.raw`$\frac{dy}{dx} + P(x)y = Q(x)$`,
    substitution: String.raw`$\text{I.F.} = e^{\int P(x)dx}$`,
    answer: String.raw`$y\cdot\text{I.F.} = \int Q(x)\cdot\text{I.F.}\,dx + C$`,
  },
  {
    class: 'linear in $x$',
    form: String.raw`$\frac{dx}{dy} + P(y)x = Q(y)$`,
    substitution: String.raw`$\text{I.F.} = e^{\int P(y)dy}$`,
    answer: String.raw`$x\cdot\text{I.F.} = \int Q(y)\cdot\text{I.F.}\,dy + C$`,
  },
  {
    class: 'Bernoulli',
    form: String.raw`$\frac{dy}{dx} + P(x)y = Q(x)y^n\ (n\ne0,1)$`,
    substitution: String.raw`$z=y^{1-n} \implies \frac{dz}{dx}+(1-n)P(x)z = (1-n)Q(x)$`,
    answer: 'solve linear in $z$, then $y=z^{1/(1-n)}$',
  },
  {
    class: 'generalised linear',
    form: String.raw`$f'(y)y' + P(x)f(y) = Q(x)$`,
    substitution: String.raw`$z=f(y) \implies z'+P(x)z=Q(x)$`,
    answer: 'solve linear in $z$, then $y=f^{-1}(z)$',
  },
  {
    class: 'exact',
    form: String.raw`$M dx + N dy = 0,\ \frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$`,
    substitution: 'inspection or a potential $u$',
    answer: String.raw`$u(x,y)=C$ where $du=Mdx+Ndy$`,
  },
  {
    class: 'Clairaut',
    form: String.raw`$y = xp + f(p),\ p=y'$`,
    substitution: String.raw`$p=C$ (general) or $x+f'(p)=0$ (singular)`,
    answer: 'general: $y=Cx+f(C)$; singular: the envelope of that family',
  },
];

export interface InspectRow {
  expr: string;
  equals: string;
}

export const INSPECTION_TABLE: InspectRow[] = [
  { expr: String.raw`$x\,dy + y\,dx$`, equals: '$d(xy)$' },
  { expr: String.raw`$\frac{x\,dy - y\,dx}{x^2}$`, equals: '$d(y/x)$' },
  { expr: String.raw`$\frac{y\,dx - x\,dy}{y^2}$`, equals: '$d(x/y)$' },
  { expr: String.raw`$\frac{x\,dy - y\,dx}{xy}$`, equals: String.raw`$d\ln|y/x| = dy/y - dx/x$` },
  { expr: String.raw`$\frac{x\,dy - y\,dx}{x^2+y^2}$`, equals: '$d\arctan(y/x)$' },
  { expr: String.raw`$\frac{y\,dx - x\,dy}{x^2+y^2}$`, equals: '$d\arctan(x/y)$' },
  { expr: String.raw`$\frac{x\,dx + y\,dy}{x^2+y^2}$`, equals: String.raw`$\frac12 d\ln(x^2+y^2)$` },
  { expr: String.raw`$\frac{x\,dx + y\,dy}{\sqrt{x^2+y^2}}$`, equals: '$d\sqrt{x^2+y^2}$' },
  { expr: String.raw`$\frac{x\,dy + y\,dx}{xy}$`, equals: '$d\ln|xy|$' },
  { expr: String.raw`$\frac{x\,dy - y\,dx}{x^2-y^2}$`, equals: String.raw`$\frac12 d\ln|\frac{x+y}{x-y}|$` },
  { expr: String.raw`$e^{xy}(x\,dy + y\,dx)$`, equals: '$d(e^{xy})$' },
  { expr: String.raw`$e^{x/y}\frac{y\,dx - x\,dy}{y^2}$`, equals: '$d(e^{x/y})$' },
];

export interface GeomRow {
  name: string;
  formula: string;
}

export const GEOMETRY_TABLE: GeomRow[] = [
  { name: 'slope of tangent', formula: String.raw`$m = \tan\psi = y'$` },
  { name: 'slope of normal', formula: String.raw`$-1/m = -\cot\psi = -dx/dy$` },
  { name: 'tangent line', formula: String.raw`$Y-y = y'(X-x)$` },
  { name: 'normal line', formula: String.raw`$Y-y = -\frac{1}{y'}(X-x)$` },
  { name: 'x-intercept of tangent', formula: String.raw`$X_T = x - \frac{y}{y'}$` },
  { name: 'y-intercept of tangent', formula: String.raw`$Y_T = y - xy'$` },
  { name: 'x-intercept of normal', formula: String.raw`$X_N = x + yy'$` },
  { name: 'y-intercept of normal', formula: String.raw`$Y_N = y + \frac{x}{y'}$` },
  { name: 'subtangent $|ST|$', formula: String.raw`$|\frac{y}{y'}|$` },
  { name: 'subnormal $|SN|$', formula: String.raw`$|yy'|$` },
  { name: 'length of tangent $|PT|$', formula: String.raw`$|y|\sqrt{1+(y')^2}\,/\,|y'|$` },
  { name: 'length of normal $|PN|$', formula: String.raw`$|y|\sqrt{1+(y')^2}$` },
];

export interface AppRow {
  name: string;
  ode: string;
  solution: string;
  notes: string;
}

export const APP_TABLE: AppRow[] = [
  {
    name: "Newton's cooling",
    ode: String.raw`$\frac{dT}{dt} = -k(T-T_s)$`,
    solution: String.raw`$T(t) = T_s + (T_0-T_s)e^{-kt}$`,
    notes: '$T_s$ ambient, $k>0$',
  },
  {
    name: 'radioactive decay',
    ode: String.raw`$\frac{dN}{dt} = -\lambda N$`,
    solution: '$N(t) = N_0 e^{-\\lambda t}$',
    notes: String.raw`$t_{1/2} = \ln 2/\lambda \approx 0.693/\lambda$`,
  },
  {
    name: 'exponential growth',
    ode: String.raw`$\frac{dP}{dt} = rP$`,
    solution: '$P(t) = P_0 e^{rt}$',
    notes: '$r$ intrinsic rate',
  },
  {
    name: 'logistic growth',
    ode: String.raw`$\frac{dP}{dt} = rP(1-P/K)$`,
    solution: String.raw`$P(t) = \frac{K}{1+\frac{K-P_0}{P_0}e^{-rt}}$`,
    notes: '$K$ carrying capacity; inflection at $P=K/2$',
  },
  {
    name: 'RL circuit',
    ode: '$L\\frac{di}{dt} + Ri = E$',
    solution: String.raw`$i(t) = \frac{E}{R}(1-e^{-t/\tau}),\ \tau=L/R$`,
    notes: '$i(\\tau) \\approx 0.63\\,I_{\\max}$',
  },
  {
    name: 'mixing tank',
    ode: String.raw`$\frac{dm}{dt} = r_{in}c_{in} - r_{out}\frac{m}{V(t)}$`,
    solution: 'linear equation — I.F. $= e^{\\int (r_{out}/V)dt}$',
    notes: '$V(t) = V_0 + (r_{in} - r_{out})t$',
  },
];

export interface RuleRow {
  concept: string;
  rule: string;
}

export const ORDER_DEGREE_RULES: RuleRow[] = [
  { concept: 'order', rule: 'order of the highest derivative; always defined; a positive integer' },
  {
    concept: 'degree',
    rule: 'power of the highest derivative AFTER clearing radicals and fractions so the equation is a polynomial in its derivatives',
  },
  {
    concept: 'degree undefined',
    rule: 'the derivative is trapped inside $\\sin, \\cos, \\ln, \\exp$ and cannot be isolated algebraically',
  },
  {
    concept: 'essential constants',
    rule: 'constants that combine ($c_1+c_2$, $c_1c_2$, $e^{c_1+c_2}$) count as ONE — order = essential constants',
  },
];

export const ORTHO_RULES: RuleRow[] = [
  {
    concept: 'cartesian',
    rule: "form the parameter-free DE of the family, then replace $y' \\to -1/y'$",
  },
  {
    concept: 'polar',
    rule: 'form the DE in $(r,\\theta)$, then replace $dr/d\\theta \\to -r^2 d\\theta/dr$',
  },
  {
    concept: 'polar angle',
    rule: '$\\tan\\phi = r\\frac{d\\theta}{dr}$; perpendicular means $\\phi_2=\\phi_1+\\pi/2 \\implies \\tan\\phi_2 = -\\cot\\phi_1$',
  },
];

export interface CommonMistake {
  trap: string;
  reality: string;
}

export const MISTAKES: CommonMistake[] = [
  {
    trap: 'declaring the degree undefined whenever trig or exp appear',
    reality: 'the degree is undefined ONLY if the derivative itself is inside the transcendental function',
  },
  {
    trap: 'counting every $c_i$ as independent',
    reality: 'constants that combine algebraically merge — order = number of essential constants',
  },
  {
    trap: 'forgetting to divide by the coefficient of $y\'$ before computing the I.F.',
    reality: "normalise to $y' + P(x)y = Q(x)$ first, then I.F. $= e^{\\int P\\,dx}$",
  },
  {
    trap: 'forcing an equation to be linear in $y$ when it is linear in $x$',
    reality: 'invert: $dx/dy - \\frac{1}{y}x = \\frac{f(y)}{y}$ is immediately linear in $x$',
  },
  {
    trap: 'dropping absolute values in $\\ln|x|$ too early',
    reality: 'keep them through integration; drop only after the initial condition fixes the sign',
  },
  {
    trap: "replacing $y'$ with $1/y'$ for orthogonal trajectories",
    reality: 'perpendicular slopes multiply to $-1$, so the substitution is $y\' \\to -1/y\'$',
  },
  {
    trap: 'assuming every Clairaut solution comes from $p = C$',
    reality: 'the singular solution (the envelope) is not in the $C$-family at all',
  },
];

/* ---- rendered HTML, so the template stays declarative ---- */

export const METHOD_TABLE_HTML = METHOD_TABLE.map(
  (r) =>
    `<tr><td>${r.class}</td><td>${renderTex(r.form)}</td><td>${renderTex(r.substitution)}</td><td>${renderTex(r.answer)}</td></tr>`
).join('');

export const INSPECTION_TABLE_HTML = INSPECTION_TABLE.map(
  (r) => `<tr><td>${renderTex(r.expr)}</td><td>${renderTex(r.equals)}</td></tr>`
).join('');

export const GEOMETRY_TABLE_HTML = GEOMETRY_TABLE.map(
  (r) => `<tr><td>${renderTex(r.name)}</td><td>${renderTex(r.formula)}</td></tr>`
).join('');

export const APP_TABLE_HTML = APP_TABLE.map(
  (r) =>
    `<tr><td>${renderTex(r.name)}</td><td>${renderTex(r.ode)}</td><td>${renderTex(r.solution)}</td><td>${renderTex(r.notes)}</td></tr>`
).join('');

export const ORDER_DEGREE_RULES_HTML = ORDER_DEGREE_RULES.map(
  (r) => `<li>${renderTex(r.concept)}: ${renderTex(r.rule)}</li>`
).join('');

export const ORTHO_RULES_HTML = ORTHO_RULES.map(
  (r) => `<li>${renderTex(r.concept)}: ${renderTex(r.rule)}</li>`
).join('');

export const MISTAKES_HTML = MISTAKES.map(
  (r) => `<li>${renderTex(r.trap)} — ${renderTex(r.reality)}</li>`
).join('');