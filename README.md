# differential equations

A standalone, fully static website for learning first-order differential equations for JEE.

**Live site:** https://amanfor.github.io/differential-equations/

Built from the differential equations material in [`Amanfor/nomad`](https://github.com/Amanfor/nomad)
(chapters `23_Differential_Equations.md` and `44_Differential_Equations.md`, plus the
maths PYQ entries mined from `public/pyq-database.json`). The two source chapters
overlap heavily; they were merged into one topic list and de-duplicated here.

---

## the idea

Most differential equations resources are formula dumps. This one is built around
how people actually learn the subject:

1. **intuition first** — every topic opens with a visual and a plain-language
   question, before a single formula
2. **derive, don't state** — the integrating factor is derived line by line with a
   reason attached to each line, not presented as a rule to memorise
3. **worked examples that fade** — three examples per method: fully worked, partly
   worked with checkable blanks, then blank
4. **predict, then check** — you commit to the shape of the answer before you see it
5. **hint ladder** — three hints per question, nudge → push → nearly there, then the
   full solution; you choose when to move on
6. **recognise the type** — a method chooser, because JEE never tells you the method
7. **common mistakes** — 3–4 per topic, plus "spot the mistake" in a worked solution
8. **mastery tracking** — attempted / correct / hints used per topic, in `localStorage`
9. **spaced review** — a review queue that resurfaces what you missed
10. **graded difficulty** — basic → JEE Main → JEE Advanced

## stack

- **Astro** 4, static output, deployed to GitHub Pages
- **KaTeX** rendered at build time via `remark-math` + `rehype-katex` (and
  `katex.renderToString` for data-driven strings) — **no math runtime in the browser**
- vanilla TypeScript for the interactive parts; no framework, no client router
- design: pure black, white text, thin lines, lowercase titles, mobile-first

Dependencies: `astro`, `katex`, `remark-math`, `remark-directive`, `rehype-katex`.
No UI library, no state library, no search library.

## layout

```
src/
  content/topics/*.md      topic pages (markdown + math + learning directives)
  content/config.ts        content collection
  lib/
    directives.ts          remark plugin: :::derive :::predict :::spot :::work :::visual :::mistakes
    interact.ts            client runtime for those directives (reveal, check, feedback)
    practice-ui.ts         hint ladder, answer checking, mastery recording
    qhtml.ts               single source of truth for question markup
    progress.ts            localStorage mastery + SM-2-lite review schedule
    fuzzy.ts               tiny fuzzy search, no dependency
    tex.ts / match.ts      build-time math rendering, lenient answer matching
  visuals/                 interactive canvas widgets (one file per visual id)
  data/                    topics, practice bank, chooser items, cheat sheet
  pages/                   routes
  layouts/Base.astro       shell: nav, KaTeX CSS, global boot
```

### writing a topic

Topic pages are markdown. On top of standard markdown + `$math$` there are a few
custom container directives:

| directive | what it does |
|-----------|--------------|
| `:::derive` / `::step{reason="..."}` | a derivation revealed one line at a time, each line carrying its reason |
| `:::work` / `::step{fill="expected answer"}` | worked examples that fade; a step with `fill` asks the student to type the missing step and checks it |
| `:::predict{q="..."}` + `::choice[correct]` + `:::reveal` | predict before you look, then check |
| `:::spot` + `::s[bad="why it's wrong"]` | click the wrong step in a worked solution |
| `:::mistakes` + `::m` | the typical-errors list |
| `:::visual{id="..." eq="..."}` | mounts a canvas widget from `src/visuals/` |

## decisions and deviations

- **Astro over plain Vite.** Ten content pages that all need built-time math,
  shared layout and per-topic routes; Astro's content collections and partial
  hydration fit better than hand-rolling a MPA. Output is still fully static.
- **Math is rendered at build time.** KaTeX never ships to the browser, which keeps
  pages light and avoids a client-side math pipeline. The tradeoff is that math
  strings in data files must be valid LaTeX at build time.
- **Exact equations and Clairaut got their own topics.** They are in the source
  chapters and are JEE-relevant, but they are not in the original topic brief.
  Rather than bolt them onto "reducible" as an afterthought, they are separate
  pages. Bernoulli, generalised linear and Clairaut share `reducible-equations`.
- **`(x^2 + y^2)` type applications are quoted for the physics**, and each
  application visual shows the model beside the curve it produces.
- **Progress is per-device.** No accounts, no network calls. A review session
  fetches a prerendered `/data/review.json` only when you actually start one.
- **The nomad repo was cloned read-only into a scratch folder** and never modified.

## topics

order and degree · formation, general and particular solutions · slope fields and
the geometry of a solution · variable separable · homogeneous equations (y = vx) ·
linear first-order equations · equations reducible to these forms · exact equations
and inspection · orthogonal trajectories · applications (growth, cooling, mixing,
motion)

## development

```bash
npm install
npm run dev      # http://localhost:4321/differential-equations/
npm run build    # static output in dist/
npm run preview
```

Deploys automatically from `main` via `.github/workflows/deploy.yml`.