/**
 * Question bank contract.
 *
 * Every question carries: topic, difficulty (basic → JEE Main → JEE Advanced),
 * three hints that go from a nudge to a near-answer, and a full worked solution
 * that has been verified by substitution back into the equation.
 *
 * Answers are matched leniently (see src/lib/match.ts): case, spaces, `$`,
 * `\left`/`\right`, braces and `^` are ignored, and `||` separates alternatives.
 */

export type Level = 'basic' | 'main' | 'advanced';

export interface Question {
  /** stable unique id, e.g. 'sep-03' — used by the mastery/review store */
  id: string;
  /** topic slug from src/data/topics.ts */
  topic: string;
  level: Level;
  /** markdown-ish text; math between $...$ or $$...$$ */
  prompt: string;
  /** multiple choice options; omit (or leave empty) for free-answer questions */
  options?: string[];
  /** index of the correct option, when `options` is present */
  correct?: number;
  /** canonical free-text answer */
  answer?: string;
  /** every acceptable spelling of the free-text answer */
  accept?: string[];
  /** exactly three, in order: nudge → push → nearly there */
  hints: [string, string, string];
  /** full worked solution, checked by substitution */
  solution: string;
  /** e.g. 'JEE Main 2020' — shown as a tag */
  source?: string;
}

export const QUESTIONS: Question[] = [];

export function questionsFor(topic: string, limit?: number): Question[] {
  const order: Record<Level, number> = { basic: 0, main: 1, advanced: 2 };
  const list = QUESTIONS.filter((q) => q.topic === topic).sort((a, b) => order[a.level] - order[b.level]);
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function allQuestions(): Question[] {
  const order: Record<Level, number> = { basic: 0, main: 1, advanced: 2 };
  return [...QUESTIONS].sort((a, b) => order[a.level] - order[b.level] || a.topic.localeCompare(b.topic));
}
