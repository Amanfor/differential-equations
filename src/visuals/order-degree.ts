import type { VisualDef } from './types';
import { el, select, equationBar, note, INK, DIM, ACCENT, OK } from './kit';

interface Row {
  eq: string;
  order: string;
  degree: string;
  why: string;
  poly: boolean;
}

const ROWS: Row[] = [
  {
    eq: String.raw`$(y'')^3 + y(y')^4 = x^5$`,
    order: '2',
    degree: '3',
    why: 'already a polynomial in the derivatives. the highest derivative y″ appears cubed.',
    poly: true,
  },
  {
    eq: String.raw`$[1+(y')^2]^{3/2} = k\,y''$`,
    order: '2',
    degree: '2',
    why: 'square both sides to clear the 3/2: [1+(y′)²]³ = k²(y″)². now y″ has power 2.',
    poly: true,
  },
  {
    eq: String.raw`$y'' + \sin(y') = 0$`,
    order: '2',
    degree: '—',
    why: 'y′ sits inside sin, which has an infinite power series. no finite polynomial exists, so degree is undefined.',
    poly: false,
  },
  {
    eq: String.raw`$e^{\,y''' - xy' + y} = 0$`,
    order: '3',
    degree: '1',
    why: 'take ln: y‴ − xy′ + y = 0. linear in the derivatives, highest one to power 1.',
    poly: true,
  },
  {
    eq: String.raw`$y = xy' + \frac{k}{y'}$`,
    order: '1',
    degree: '2',
    why: 'multiply by y′: yy′ = x(y′)² + k. a polynomial, and y′ reaches power 2.',
    poly: true,
  },
  {
    eq: String.raw`$\ln(y'') = ax + by$`,
    order: '2',
    degree: '1',
    why: 'exponentiate: y″ = e^{ax+by}. the derivative is free again, at power 1.',
    poly: true,
  },
  {
    eq: String.raw`$y' + \sin y = 0$`,
    order: '1',
    degree: '1',
    why: 'the trig is on y, not on a derivative. only y′ appears, at power 1.',
    poly: true,
  },
  {
    eq: String.raw`$\ln(y') = 3x + 4y$`,
    order: '1',
    degree: '1',
    why: 'isolate the derivative first: y′ = e^{3x+4y}. a student who stops at the ln would wrongly say undefined.',
    poly: true,
  },
];

export const def: VisualDef = {
  id: 'order-degree',
  mount(host) {
    const table = el('div');
    table.setAttribute('data-od-table', '');
    host.appendChild(table);

    const bar = equationBar(host, '');
    bar.style.borderColor = 'rgba(158,203,255,0.4)';

    function build(): void {
      const sel = el('select');
      ROWS.forEach((r) => {
        const o = document.createElement('option');
        o.value = r.eq;
        o.textContent = r.eq.replace(/\$|\\[,;!()]|\\frac|\\sin|\\ln|\\exp|'/g, '').slice(0, 44);
        sel.appendChild(o);
      });

      const out = el('div', 'viz-row');
      const orderTag = el('span', 'viz-readout');
      const degreeTag = el('span', 'viz-readout');

      function render(eq: string): void {
        const r = ROWS.find((x) => x.eq === eq) ?? ROWS[0];
        orderTag.textContent = `order = ${r.order}`;
        degreeTag.textContent = r.degree === '—' ? 'degree = undefined' : `degree = ${r.degree}`;
        degreeTag.style.color = r.poly ? OK : '#ff8b8b';
        bar.textContent = r.why;
      }

      sel.addEventListener('change', () => render(sel.value));

      const r1 = el('div', 'viz-row');
      r1.append(el('span', 'viz-label', 'equation'), sel);
      const r2 = el('div', 'viz-row');
      r2.append(orderTag, degreeTag);
      out.append(r1, r2);

      table.replaceChildren(out);
      render(sel.value);
    }

    build();

    note(
      host,
      'order is always defined — it is just the highest derivative present. degree exists only if the equation can be written as a polynomial in the derivatives, so the first move is always to try to isolate the derivative.'
    );

    void INK;
    void DIM;
    void ACCENT;
    return {};
  },
};