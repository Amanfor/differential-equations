import type { APIRoute } from 'astro';
import { allQuestions } from '../../data/practice';
import { questionHTML } from '../../lib/qhtml';

/**
 * Prerendered question payload for review mode.
 * Fetched only when the student opens a review session, so topic pages stay light.
 */
export const GET: APIRoute = () => {
  const payload = allQuestions().map((q) => ({
    id: q.id,
    topic: q.topic,
    level: q.level,
    title: q.prompt.replace(/\s+/g, ' ').slice(0, 120),
    html: questionHTML(q, { showTopic: true, bare: true }),
  }));
  return new Response(JSON.stringify({ questions: payload }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
