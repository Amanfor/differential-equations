/**
 * Learning directives for topic markdown.
 *
 * Turns container directives into plain HTML wrappers + data-attributes so that
 * a tiny client runtime (`src/lib/interact.ts`) can power them. Nothing here
 * needs JavaScript to render — the markup is static, JS only adds behaviour.
 *
 * Usage in a topic file (blank lines matter — directives are block-level):
 *
 *   :::derive
 *   ::step{reason="product rule on the left"}
 *   $$\frac{d}{dx}[\mu y] = \mu y' + \mu' y$$
 *   ::
 *   :::
 *
 *   :::predict{q="Before you look: what shape do you expect?"}
 *   ::choice
 *   a straight line
 *   ::
 *   ::choice{correct}
 *   an exponential curve flattening out
 *   ::
 *   ::reveal
 *   The curve flattens because ...
 *   ::
 *   :::
 *
 *   :::spot
 *   ::s
   *   The degree is read off after clearing radicals.
 *   ::
 *   ::s{bad="Degree is read from the highest derivative *after* clearing.
 *             Here the radical was still present."}
 *   $$\text{degree} = 3$$
 *   ::
 *   :::
 *
 *   :::work
 *   ::step{reason="separate"}
 *   $$\frac{dy}{1+y} = (1+x)\,dx$$
 *   ::
 *   ::step{reason="integrate the right side" fill="x + x^2/2"}
 *   $$\ln|1+y| = \_ + C$$
 *   ::
 *   :::
 *
 *   :::visual{id="slope-field" eq="dy/dx = x - y" caption="..." }
 *   :::
 *
 *   :::mistakes
 *   ::m{title="dropping the constant"}
 *   The $+C$ disappears ...
 *   ::
 *   :::
 */
import type { Root, Content, Parent } from 'mdast';
import { renderTex } from './tex';

type Dir = Content & { type: 'containerDirective'; name: string; label?: string | null; attributes?: Record<string, string> };

const esc = (v: unknown): string =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function attrs(node: Dir, extra: Record<string, string | number | boolean | undefined> = {}): string {
  const out: string[] = [];
  const a = node.attributes ?? {};
  for (const [k, v] of Object.entries(a)) {
    // `class` and `bad` are handled separately: `bad` is typeset and exposed as
    // hidden HTML rather than left as a raw LaTeX attribute.
    if (k === 'class' || k === 'bad') continue;
    out.push(`${k}="${esc(v)}"`);
  }
  for (const [k, v] of Object.entries(extra)) {
    if (v === undefined || v === false) continue;
    out.push(`${k}="${esc(v)}"`);
  }
  return out.length ? ' ' + out.join(' ') : '';
}

function html(value: string): Content {
  return { type: 'html', value } as Content;
}

const isDir = (n: Content, name?: string): n is Dir =>
  n.type === 'containerDirective' && (name === undefined || (n as Dir).name === name);

/** Wrap a node's children in an open/close HTML tag, converting recursively. */
function wrap(node: Dir, openTag: string, closeTag: string): Content[] {
  const inner: Parent = { type: 'paragraph', children: [] } as unknown as Parent;
  inner.children = [...node.children];
  convertAll(inner);
  return [html(openTag), ...inner.children, html(closeTag)];
}

function convert(node: Dir): Content[] {
  const name = node.name;

  switch (name) {
    case 'derive':
      return wrap(
        node,
        `<div class="derive"${attrs(node, { 'data-derive': '' })}>` +
          `<p class="derive-head"><span class="derive-label">derive</span><button type="button" class="btn btn-ghost" data-reveal-next>show next step</button><button type="button" class="btn btn-ghost" data-reveal-all>show all</button></p>`,
        `</div>`
      );

    case 'step': {
      const a = node.attributes ?? {};
      const reason = a.reason ?? '';
      const fill = a.fill;
      // `reason` is shown to the reader, so any $math$ in it must be typeset.
      // `fill` is compared against what the student types, so it stays raw.
      const open =
        `<div class="step"${attrs(node, { 'data-step': '' })}` +
        (reason ? ` data-reason="${esc(reason)}"` : '') +
        (fill !== undefined ? ` data-fill="${esc(fill)}"` : '') +
        `><span class="step-reason">${reason ? renderTex(reason) : ''}</span>`;
      const inner = wrap(node, `<div class="step-body">`, `</div>`);
      const ctl =
        fill !== undefined
          ? `<div class="step-fill"><input type="text" spellcheck="false" autocomplete="off" placeholder="fill the blank" data-fill-input><button type="button" class="btn" data-fill-check>check</button><span class="fill-msg" data-fill-msg></span></div>`
          : '';
      return [html(open), ...inner, ctl ? html(ctl) : html(''), html(`<button type="button" class="btn btn-ghost step-show" data-show-step>show this step</button>`), html(`</div>`)];
    }

    case 'predict': {
      const q = node.attributes?.q ?? node.label ?? 'predict before you reveal';
      const inner = wrap(node, `<div class="predict-body">`, `</div>`);
      return [
        html(
          `<div class="predict" data-predict data-q="${esc(q)}"><p class="predict-q"><span class="tag">predict</span> ${renderTex(q)}</p>`
        ),
        ...inner,
        html(`</div>`),
      ];
    }

    case 'choice':
      return wrap(
        node,
        `<button type="button" class="predict-choice"${attrs(node, { 'data-choice': '', 'data-correct': node.attributes?.correct !== undefined ? '1' : '0' })}>`,
        `</button>`
      );

    case 'reveal':
      return wrap(
        node,
        `<div class="reveal"${attrs(node, { 'data-reveal': '' })}><div class="reveal-inner">`,
        `</div><p class="reveal-bar"><button type="button" class="btn" data-reveal-toggle>check my prediction</button></p></div>`
      );

    case 'spot': {
      const head = `<div class="spot"${attrs(node, { 'data-spot': '' })}><p class="spot-q"><span class="tag">spot the mistake</span> one step below is wrong — click it</p>`;
      const inner = wrap(node, `<div class="spot-steps">`, `</div>`);
      return [html(head), ...inner, html(`<p class="spot-msg" data-spot-msg></p></div>`)];
    }

    case 's': {
      const flaw = node.attributes?.bad;
      const open = `<button type="button" class="spot-step"${attrs(node, { 'data-spot-step': '' })}${
        flaw !== undefined ? ' data-flaw="1"' : ''
      }>`;
      const parts = wrap(node, open, `</button>`);
      if (flaw !== undefined) {
        // hidden typeset explanation; the runtime reads its innerHTML
        parts.splice(parts.length - 1, 0, html(`<span class="flaw" data-flaw-html>${renderTex(flaw)}</span>`));
      }
      return parts;
    }

    case 'work':
      return wrap(
        node,
        `<div class="work"${attrs(node, { 'data-work': '' })}><p class="work-head"><span class="tag">worked example</span><span class="work-count" data-work-count></span></p>`,
        `</div>`
      );

    case 'visual': {
      const id = node.attributes?.id;
      if (!id) return [html(`<div class="visual" data-visual-missing><p class="err">visual directive is missing <code>id</code></p></div>`)];
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(node.attributes ?? {})) {
        if (k === 'id' || k === 'caption') continue;
        props[k] = v;
      }
      const cap = node.attributes?.caption;
      return [
        html(
          `<figure class="visual" data-visual="${esc(id)}" data-props='${esc(JSON.stringify(props))}'>` +
            `<div class="visual-mount" data-mount></div>` +
            (cap ? `<figcaption class="visual-cap">${renderTex(cap)}</figcaption>` : '')
        ),
        html(`</figure>`),
      ];
    }

    case 'mistakes':
      return wrap(
        node,
        `<div class="mistakes"${attrs(node, { 'data-mistakes': '' })}><p class="mistakes-head"><span class="tag">typical mistakes</span></p><ol class="mistakes-list">`,
        `</ol></div>`
      );

    case 'm':
      return wrap(node, `<li class="mistake"${attrs(node, { 'data-mistake': '' })}>`, `</li>`);

    case 'detail':
      return wrap(node, `<div class="m-detail"${attrs(node, { 'data-detail': '' })}>`, `</div>`);

    case 'hint':
    case 'predict-only':
      return wrap(node, `<div class="hint"${attrs(node, { 'data-hint': '' })}>`, `</div>`);

    default:
      // Unknown directive: keep the children, drop the wrapper so nothing is lost.
      return [...node.children];
  }
}

function convertAll(parent: Parent): void {
  const out: Content[] = [];
  for (const child of parent.children as Content[]) {
    if (isDir(child)) {
      out.push(...convert(child));
    } else {
      if ('children' in child) convertAll(child as Parent);
      out.push(child);
    }
  }
  parent.children = out as never;
}

/** unified/remark plugin */
export function learningDirectives() {
  return (tree: Root) => {
    convertAll(tree as unknown as Parent);
  };
}
