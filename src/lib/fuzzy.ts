/**
 * Tiny fuzzy search — no dependency, fast enough for a few hundred entries.
 * Scores: exact prefix > word prefix > subsequence, with a small bonus for
 * keyword hits. Returns highlighted snippets for the results list.
 */

export interface Entry {
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string[];
  kind?: string;
}

export interface Hit extends Entry {
  score: number;
  titleHtml: string;
}

function subsequence(needle: string, hay: string): { ok: boolean; gaps: number; first: number } {
  let i = 0;
  let gaps = 0;
  let first = -1;
  for (let j = 0; j < hay.length && i < needle.length; j++) {
    if (needle[i] === hay[j]) {
      if (first < 0) first = j;
      i++;
    } else if (first >= 0) {
      gaps++;
    }
  }
  return { ok: i === needle.length, gaps, first: i === needle.length ? first : -1 };
}

export function search(query: string, entries: Entry[], limit = 24): Hit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const hits: Hit[] = [];

  for (const e of entries) {
    const title = e.title.toLowerCase();
    const sub = (e.subtitle ?? '').toLowerCase();
    const keys = (e.keywords ?? []).join(' ').toLowerCase();
    let score = 0;
    let matchedAll = true;

    for (const w of words) {
      let s = 0;
      if (title === w) s = 100;
      else if (title.startsWith(w)) s = 80;
      else if (title.includes(w)) s = 60;
      else if (sub.includes(w)) s = 40;
      else if (keys.includes(w)) s = 34;
      else {
        const r = subsequence(w, title);
        if (r.ok) s = Math.max(10, 30 - r.gaps);
        else {
          const r2 = subsequence(w, sub + ' ' + keys);
          if (r2.ok) s = Math.max(6, 18 - r2.gaps);
        }
      }
      if (s === 0) matchedAll = false;
      score += s;
    }
    if (!matchedAll) continue;
    hits.push({ ...e, score, titleHtml: highlight(e.title, words) });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function highlight(text: string, words: string[]): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escaped = esc(text);
  let out = escaped;
  for (const w of words) {
    if (!w) continue;
    const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    out = out.replace(re, '<mark>$1</mark>');
  }
  return out;
}
