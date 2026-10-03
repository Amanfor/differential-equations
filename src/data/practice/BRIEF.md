# writing question bank modules

You are writing TypeScript data files for a differential-equation learning site.

## Read these first

- `/home/aman/differential-equations/src/data/practice.ts` — the `Question` type and how modules are merged
- `/home/aman/differential-equations/src/content/topics/*.md` — the topic pages, so hints match the taught method

## The contract

Create **one** file per assignment, e.g. `src/data/practice/bank-separable.ts`:

```ts
import type { Question } from '../practice';

export const BANK_VARIABLE_SEPARABLE: Question[] = [
  {
    id: 'sep-01',                 // unique across the WHOLE site: prefix per topic
    topic: 'variable-separable',  // must exactly match a slug in src/data/topics.ts
    level: 'basic',               // 'basic' | 'main' | 'advanced'
    prompt: 'Solve $\\frac{dy}{dx} = (1+x)(1+y)$.',
    options: ['$y = Ae^{x+x^2/2}-1$', '$y = Ae^{x}-1$'],  // omit entirely for free-answer
    correct: 0,                   // index into options; omit for free-answer
    answer: 'y = A e^{x + x^2/2} - 1',   // canonical free-text answer
    accept: ['y=Ae^(x+x^2/2)-1'],        // all acceptable spellings; use '||' inside one entry for or
    hints: ['...', '...', '...'],        // EXACTLY three: nudge -> push -> nearly there
    solution: '...full worked solution, LaTeX in $...$...',
    source: 'JEE Main 2020',     // omit if you invented it
  },
];
```

Rules that matter:

1. **`accept` must match the student's typing** after normalisation (see `src/lib/match.ts`):
   whitespace, `$`, `\left`, `\right`, `{`, `}`, `^`, `*` and case are ignored.
   So `y = Ae^{x+x^2/2}-1` and `y=Ae^(x+x^2/2)-1` normalise the same. Do not include LaTeX
   backslash commands in `accept` — the student types plain characters like `e^`, `/`, `-1`.
2. **Hints escalate.** Hint 1 points at the method, hint 2 gives the key move, hint 3 is nearly the answer
   with one piece missing. Never make hint 1 the answer.
3. **`solution` must be correct and complete.** Show the real steps, in order, with the reason for each.
4. **Every question must be verified.** Before you finish, for each free-answer question substitute your
   solution back into the original equation symbolically (sympy) or check numerically, and fix any mismatch.
   If sympy is unavailable, verify by differentiating your answer and comparing to the RHS.
5. Mark difficulty honestly: `basic` = one method, one step of algebra. `main` = JEE Main level.
   `advanced` = JEE Advanced level (multi-step, needs a substitution plus an initial condition).
6. Escaping: inside a TypeScript single-quoted string, LaTeX backslashes must be doubled (`\\frac`).
   If that gets hard to read, use `String.raw` template literals instead:
   `prompt: String.raw`Solve $\frac{dy}{dx}=x$.`` — but then the string must not contain `${`.
7. Prefer `String.raw` for anything with backslashes. It is much less error-prone.

## Volume

**14–18 questions per topic**, spread roughly 5 basic / 7 main / 3 advanced.

## Verify your work

Run a script that imports your file and, for each question, asserts the array is non-empty,
every `hints` array has length 3, `id` is unique, `topic` matches, and `options` (if present)
has `correct` in range. Print the result. Iterate until it passes.