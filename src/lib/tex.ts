/**
 * Build-time math rendering for strings that come from data files (practice
 * questions, hints, solutions, cheat sheet rows). Markdown topic pages are
 * handled by remark-math + rehype-katex; this does the same job for anything
 * that arrives as a plain string, so nothing needs KaTeX in the browser.
 */
import katex from 'katex';

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tex(src: string, display: boolean): string {
  try {
    return katex.renderToString(src, {
      displayMode: display,
      throwOnError: false,
      output: 'html',
      strict: false,
    });
  } catch {
    return `<code>${escapeHtml(src)}</code>`;
  }
}

/**
 * Converts `$inline$` and `$$block$$` segments to KaTeX HTML.
 * Everything outside the math segments is HTML-escaped.
 */
export function renderTex(input: string): string {
  if (!input) return '';
  const parts: string[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    parts.push(escapeHtml(input.slice(last, m.index)));
    if (m[1] !== undefined) parts.push(tex(m[1].trim(), true));
    else parts.push(tex(m[2].trim(), false));
    last = m.index + m[0].length;
  }
  parts.push(escapeHtml(input.slice(last)));
  return parts.join('');
}

/** Only escapes — for text that has no math but may contain `<`, `&`. */
export function plain(input: string): string {
  return escapeHtml(input ?? '');
}
