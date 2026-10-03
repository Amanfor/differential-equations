/**
 * Lenient answer matching, used for two things:
 *   - the fill-in-the-blank steps inside worked examples (:::step fill="...")
 *   - free-answer practice questions (Question.accept)
 *
 * The goal is to forgive formatting without forgiving wrong maths. Everything a
 * student is likely to type differently from us gets normalised away; nothing
 * that changes the value gets normalised away.
 */

/** Folds unicode look-alikes onto the ASCII we compare on. */
function fold(s: string): string {
  return s
    .replace(/[\u2212\u2013\u2014\u2011\u2010]/g, '-') // − – — ‑ ‐  ->  -
    .replace(/[\u00d7\u22c5]/g, '*') // × ⋅        ->  *
    .replace(/\u00f7/g, '/') // ÷            ->  /
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .replace(/[\u2260\u2264\u2265]/g, '='); // ≠ ≤ ≥  ->  =
}

export function normalize(input: string): string {
  return fold(String(input ?? ''))
    .toLowerCase()
    // LaTeX scaffolding a student will never type
    .replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '$1/$2')
    .replace(/\\left|\\right|\\displaystyle|\\mathrm|\\mathbf|\\text|\\cdot|\\times|\\!/g, '')
    .replace(/\\/g, '')
    // braces and brackets carry no information once exponents are marked by ^
    .replace(/[$\s{}()*·^]/g, '')
    .replace(/\u00b2/g, '2')
    .replace(/\u00b3/g, '3')
    .replace(/\u00b9/g, '1')
    .replace(/\|\|/g, '\u00a7') // sentinel so "||" survives as an or-separator
    .trim();
}

/** `accepted` entries may use '||' to mean "or". */
export function matchesAny(accepted: string[], given: string): boolean {
  const g = normalize(given);
  if (!g) return false;
  return accepted.some((alt) => alt.split('||').some((a) => normalize(a) === g));
}