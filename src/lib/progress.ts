/**
 * Mastery tracking — localStorage only, no network.
 *
 * Stores per-question attempts and a lightweight SM-2 review schedule so the
 * review page can resurface what the student got wrong or needed hints on,
 * spaced over time.
 */

export interface AttemptStat {
  attempted: number;
  correct: number;
  hints: number;
}

export interface Card {
  due: number; // timestamp ms
  ease: number; // 1.3 .. 3.0
  interval: number; // days
  lapses: number;
}

export interface Store {
  v: 1;
  attempts: Record<string, AttemptStat>; // key: question id
  cards: Record<string, Card>; // key: question id (review schedule)
  topicAttempts: Record<string, AttemptStat>; // key: topic slug
  lastSeen: Record<string, number>; // key: topic slug
}

const KEY = 'de-progress-v1';
const DAY = 86400000;

const emptyStat = (): AttemptStat => ({ attempted: 0, correct: 0, hints: 0 });

const emptyStore = (): Store => ({
  v: 1,
  attempts: {},
  cards: {},
  topicAttempts: {},
  lastSeen: {},
});

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

class Progress {
  store: Store = emptyStore();
  private ready = false;

  init(): void {
    if (this.ready) return;
    this.ready = true;
    const raw = safe(() => localStorage.getItem(KEY), null);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Store;
        if (parsed && parsed.v === 1) this.store = { ...emptyStore(), ...parsed };
      } catch {
        /* corrupted store — start clean */
      }
    }
  }

  private save(): void {
    safe(() => localStorage.setItem(KEY, JSON.stringify(this.store)), undefined);
  }

  /** Record an attempt on a practice question. */
  record(opts: {
    questionId: string;
    topic: string;
    correct: boolean;
    hints?: number;
    /** set false when this is a self-check that should not disturb the schedule */
    schedule?: boolean;
  }): void {
    this.init();
    const { questionId, topic, correct } = opts;
    const hints = opts.hints ?? 0;

    const a = this.store.attempts[questionId] ?? emptyStat();
    a.attempted += 1;
    if (correct) a.correct += 1;
    a.hints += hints;
    this.store.attempts[questionId] = a;

    const t = this.store.topicAttempts[topic] ?? emptyStat();
    t.attempted += 1;
    if (correct) t.correct += 1;
    t.hints += hints;
    this.store.topicAttempts[topic] = t;
    this.store.lastSeen[topic] = Date.now();

    if (opts.schedule !== false) this.schedule(questionId, correct, hints);
    this.save();
  }

  /** SM-2 lite: correct answers push the due date out; mistakes pull it back in. */
  private schedule(id: string, correct: boolean, hints: number): void {
    const now = Date.now();
    let c = this.store.cards[id] ?? { due: now, ease: 2.5, interval: 0, lapses: 0 };

    // heavy hint use counts as a partial lapse — the student hasn't really got it
    const effective = correct && hints < 3;

    if (effective) {
      if (c.interval === 0) c.interval = 1;
      else if (c.interval === 1) c.interval = 3;
      else c.interval = Math.round(c.interval * Math.min(c.ease, 3));
      c.ease = Math.min(3, c.ease + 0.08 - (hints > 0 ? 0.04 : 0));
      c.due = now + c.interval * DAY;
    } else {
      c.lapses += 1;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.interval = correct ? Math.max(1, Math.round(c.interval / 2)) : 0;
      c.due = now + (correct ? Math.max(1, c.interval) : 3600000); // wrong again in an hour
    }
    this.store.cards[id] = c;
  }

  topic(slug: string): AttemptStat & { mastery: number } {
    this.init();
    const t = this.store.topicAttempts[slug] ?? emptyStat();
    return { ...t, mastery: this.mastery(t) };
  }

  /** 0..1 — correct answers with few hints move the needle; repeat mistakes stall it. */
  private mastery(t: AttemptStat): number {
    if (t.attempted === 0) return 0;
    const rate = t.correct / t.attempted;
    const hintDrag = t.attempted > 0 ? Math.min(0.3, t.hints / (t.attempted * 3)) : 0;
    const coverage = Math.min(1, t.attempted / 5);
    return Math.max(0, Math.min(1, (rate - hintDrag) * coverage));
  }

  /** Questions due for spaced review (or overdue). */
  due(now = Date.now()): string[] {
    this.init();
    return Object.entries(this.store.cards)
      .filter(([, c]) => c.due <= now && c.lapses > 0)
      .sort((a, b) => a[1].due - b[1].due)
      .map(([id]) => id);
  }

  soon(now = Date.now()): string[] {
    this.init();
    return Object.entries(this.store.cards)
      .filter(([, c]) => c.due <= now)
      .map(([id]) => id);
  }

  /** Topics worth revisiting: anything attempted with mistakes or heavy hints. */
  weakTopics(): string[] {
    this.init();
    return Object.entries(this.store.topicAttempts)
      .filter(([, t]) => t.attempted > 0 && (t.correct < t.attempted || t.hints >= t.attempted))
      .map(([slug]) => slug);
  }

  totals(): { attempted: number; correct: number; hints: number; mastered: number } {
    this.init();
    let attempted = 0,
      correct = 0,
      hints = 0;
    for (const t of Object.values(this.store.topicAttempts)) {
      attempted += t.attempted;
      correct += t.correct;
      hints += t.hints;
    }
    const mastered = Object.values(this.store.topicAttempts).filter((t) => this.mastery(t) >= 0.75).length;
    return { attempted, correct, hints, mastered };
  }

  reset(): void {
    this.store = emptyStore();
    this.save();
  }
}

export const progress = new Progress();

declare global {
  interface Window {
    __de?: { progress: Progress };
  }
}
