import type { VisualDef } from './types';
import { el, equationBar, note, OK, '#ff8b8b' as BAD, ACCENT } from './kit';

interface Pair {
  id: string;
  expr: string;
  antideriv: string;
  /** what to look for */
  tell: string;
}

const PAIRS: Pair[] = [
  {
    id: 'xy',
    expr: 'x dy + y dx',
    antideriv: 'd(xy)',
    tell: 'x next to dy, y next to dx. the product rule run backwards.',
  },
  {
    id: 'yx',
    expr: 'y dx − x dy',
    antideriv: '−x² d(y/x)',
    tell: 'the cross combination. divide by x² and it collapses to d(y/x).',
  },
  {
    id: 'ratio',
    expr: '(x dy − y dx) / x²',
    antideriv: 'd(y/x)',
    tell: 'quotient rule: d(y/x) = (x dy − y dx)/x².',
  },
  {
    id: 'radial',
    expr: '(x dx + y dy) / (x² + y²)',
    antideriv: '½ d ln(x² + y²)',
    tell: 'the radial part. it is the derivative of ln r.',
  },
  {
    id: 'dist',
    expr: '(x dx + y dy) / √(x² + y²)',
    antideriv: 'd √(x² + y²)',
    tell: 'the same radial part over the distance — it is just dr.',
  },
  {
    id: 'ang',
    expr: '(x dy − y dx) / (x² + y²)',
    antideriv: 'd arctan(y/x)',
    tell: 'the angular part. in polar this is exactly dθ.',
  },
  {
    id: 'log',
    expr: '(x dy + y dx) / (xy)',
    antideriv: 'd ln|xy|',
    tell: 'sum of logs: dy/y + dx/x.',
  },
  {
    id: 'expo',
    expr: 'e^{xy} (x dy + y dx)',
    antideriv: 'd e^{xy}',
    tell: 'chain rule: d(e^{xy}) = e^{xy}·(x dy + y dx).',
  },
  {
    id: 'hyp',
    expr: '(x dy − y dx) / (x² − y²)',
    antideriv: '½ d ln|(x+y)/(x−y)|',
    tell: 'logarithmic coordinates again — same trick as ln|x/y| but hyperbolic.',
  },
  {
    id: 'notexact',
    expr: 'y dx − x dy',
    antideriv: 'NOT exact as it stands',
    tell: '∂M/∂y = 1 but ∂N/∂x = −1. it only becomes exact after dividing by x² or y².',
  },
];

export const def: VisualDef = {
  id: 'inspection',
  mount(host) {
    const list = el('div');
    host.appendChild(list);

    const bar = equationBar(host, '');
    bar.style.borderColor = 'rgba(158,203,255,0.45)';
    let current: Pair | null = null;

    function show(p: Pair): void {
      current = p;
      list.querySelectorAll('[data-pair]').forEach((n) => {
        const on = n === list.querySelector(`[data-id="${p.id}"]`);
        n.setAttribute('data-state', on ? 'on' : 'off');
      });
      bar.textContent = `${p.expr}  =  ${p.antideriv}   —   ${p.tell}`;
    }

    PAIRS.forEach((p) => {
      const row = el('button', 'inspect-row');
      row.type = 'button';
      row.setAttribute('data-pair', '');
      row.setAttribute('data-id', p.id);
      row.setAttribute('data-state', 'off');
      row.setAttribute('title', 'click to reveal the exact differential');
      const lhs = el('span', 'il');
      lhs.textContent = p.expr;
      const arrow = el('span', 'ia', '→');
      const rhs = el('span', 'ir');
      rhs.textContent = p.antideriv;
      const tell = el('span', 'it');
      tell.textContent = p.tell;
      row.append(lhs, arrow, rhs, tell);
      row.addEventListener('click', () => show(p));
      list.appendChild(row);
    });

    show(PAIRS[0]);
    void current;
    void OK;
    void BAD;
    void ACCENT;
    note(
      host,
      'each row is a differential that is already a total derivative, so it integrates in one step. click a row to see what to look for — the pattern is always the same: a known derivative in disguise.'
    );

    return {};
  },
};