/** Lightweight question index for the progress / review UIs (title + topic only). */
import { QUESTIONS } from './practice';

export interface Lite {
  id: string;
  topic: string;
  title: string;
  level: string;
}

function titleOf(prompt: string): string {
  const text = prompt
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m: string) => m.replace(/[\\{}]/g, ' ').trim())
    .replace(/\$([^$\n]+?)\$/g, (_, m: string) => m.replace(/\\[a-zA-Z]+/g, '').replace(/[\\{}]/g, '').trim())
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 96 ? text.slice(0, 93).trimEnd() + '…' : text;
}

export const ALL_QUESTIONS: Lite[] = QUESTIONS.map((q) => ({
  id: q.id,
  topic: q.topic,
  title: titleOf(q.prompt),
  level: q.level,
}));

export const ALL_QUESTIONS_BY_ID: Record<string, Lite> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q])
);
