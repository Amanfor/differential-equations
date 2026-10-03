import { normalize, matchesAny } from './src/lib/match.ts';

const cases = [
  ['y = A e^{x + x^2/2} - 1', 'y=Ae^(x+x^2/2)-1'],
  ['sec(y/x) + tan(y/x) = Cx', 'sec(y/x)+tan(y/x)=Cx'],
  ['2 ln 18', '2ln18'],
  ['y = x asin(x)', 'y=x·asin(x)'],
  ['x^2 - y^2 = Cx', 'x²−y²=Cx'],
  ['(y^2 - x^2)y\' + 2xy = 0', '(y^2-x^2)y\'+2xy=0'],
  ['\\frac{dy}{dx}', 'dy/dx'],
  ['y = C', 'y=C'],
  ['x² + y² = 2C', 'x2 + y2 = 2C'],
  ['e^{−kt}', 'e^{-kt}'],
];

let pass = 0;
for (const [canon, typed] of cases) {
  const ok = normalize(canon) === normalize(typed);
  if (ok) pass++;
  console.log(`${ok ? 'MATCH  ' : 'DIFFER '} ${JSON.stringify(normalize(canon))} vs ${JSON.stringify(normalize(typed))}`);
}
console.log(`\n${pass}/${cases.length} agree`);
console.log('still rejects wrong answer:', matchesAny(['y=C'], 'y=C+1') === false);
console.log('accepts right answer      :', matchesAny(['y=C'], 'y = C'));
console.log('or-separator works        :', matchesAny(['x||y'], 'y') === true);