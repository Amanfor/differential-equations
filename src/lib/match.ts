/** Lenient answer matching for fill-in-the-blank steps and free-answer questions. */

export function normalize(s: string): string {
  return String(s ?? '')
    .toLowerCase()
    .replace(/\\left|\\right|\\,|\\;|\\!|\\displaystyle|\\text/g, '')
    .replace(/[\\$\\s{}^*·]/g, '')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/¹/g, '1')
    .replace(/\|\|/g, '§')
    .trim();
}

/** `accepted` entries may contain `||` to mean "or". */
export function matchesAny(accepted: string[], given: string): boolean {
  const g = normalize(given);
  if (!g) return false;
  return accepted.some((alt) => alt.split('||').some((a) => normalize(a) === g));
}
