# differential equations agent prompt

Paste into an opencode session. It builds a differential equations site designed for learning: intuition first, then methods, then guided practice. It uses your nomad data, a new repo, and gh to deploy.

## before you run it

- Run `gh auth status` and confirm you are logged in. The deploy step needs it.
- Let the agent run shell commands and `gh` without asking each time, or it will stall on approvals.
- nomad has two differential equations chapters (`23_` and `44_`). The prompt tells the agent to merge them.
- No `/goal` wrapper is included. For Gemini, wrap the whole text as `/goal "..."` and replace any inner double quotes first.

## prompt

```
Build and deploy a standalone Differential Equations website for JEE, designed so a student actually learns the math, using the differential equations data from my existing repo. Work autonomously until it is live. Do not stop to ask questions; make reasonable decisions and note them in the new repo's README.

AGENTS
Use sub-agents in parallel where the work is independent, then integrate and review their output yourself:
- Agent 1, content: merge the source data into one clean topic list and write the explanations and derivations.
- Agent 2, visuals: build the interactive visuals and simulations.
- Agent 3, practice: build the question bank, hints, and worked solutions.
- Agent 4, research and review: web research to fill gaps, then verify every derivation, solution, and final answer. Check each worked solution by substituting back into the equation, and check numerics with a quick script.
You are responsible for the final integration, the build, and the deploy.

SOURCE DATA
- Clone https://github.com/Amanfor/nomad (public) into a scratch folder and treat it as read-only. Do not modify it.
- Material to mine: src/data/context/23_Differential_Equations.md, src/data/context/44_Differential_Equations.md, relevant entries in src/data/questions.ts and public/pyq-database.json, and relevant images in public/media/ (for example the differential equations geometric interpretations and physical applications diagrams).
- The two chapters overlap, so merge them into one clean, non-duplicated topic list. Fix any mathematical errors you find.

NEW REPOSITORY
- Create a new public repo named differential-equations (under my GitHub account) with gh repo create. Put the site in it. Do not put it inside nomad.
- Stack: Astro or plain Vite + vanilla JS/TS. Use KaTeX for math. Keep it a fully static site.

TOPICS
Order and degree; formation of a differential equation by eliminating constants; general and particular solutions; variable separable; homogeneous equations (substitution y = vx); linear first-order equations (integrating factor); equations reducible to these forms (including Bernoulli); orthogonal trajectories and families of curves; applications (growth and decay, Newton's law of cooling, geometric problems with tangents and normals, mixing, simple motion).

LEARNING DESIGN (this is the most important part)
Build the site around how people learn math, not as a formula dump:
1. Intuition first. Start each topic with a visual and a plain-language question before any formula. For example, a slope field shows what a differential equation means before anyone solves one.
2. Derive, do not state. Show where each method comes from: why the integrating factor works, why y = vx makes a homogeneous equation separable. Reveal derivations one line at a time, each line with a short reason.
3. Worked examples that fade. For each method give 3 examples in this order: fully worked, partly worked (the student fills the missing steps), and blank (the student does it all). Each step is checkable.
4. Predict, then check. Before a visual or solution appears, ask the student to predict the shape of the solution curve or the form of the answer, then reveal it.
5. Hint ladder. Every practice question has 3 hints that go from a nudge to a near-answer, then the full solution. The student chooses when to move on.
6. Recognize the type. Include a method chooser: given an equation, the student picks separable, homogeneous, linear, or something else, with immediate feedback explaining why. This is the skill JEE actually tests.
7. Common mistakes. For each topic, show 3 or 4 typical errors (dropping the constant, wrong integrating factor, forgetting the absolute value, sign slips), and let the student spot the mistake in a worked solution.
8. Mastery tracking. Keep progress per topic in localStorage (attempted, correct, hints used). Show a plain progress view. Add a review mode that resurfaces the topics the student got wrong or needed hints on, spaced over time.
9. Graded difficulty. Mark questions as basic, JEE Main, or JEE Advanced, and order them from easier to harder.
10. Keep the text short. One idea per screen, math typeset cleanly, no walls of text.

VISUALS TO BUILD
- Slope field plotter: type or pick an equation, see the field, click to set an initial condition, and watch the solution curve draw. Show the general solution family by dragging the constant C.
- Separable equations: animate separating variables and integrating both sides.
- Homogeneous substitution: show the equation before and after y = vx.
- Linear first order: show the integrating factor turning the left side into an exact derivative.
- Orthogonal trajectories: draw a family of curves and its orthogonal family together.
- Applications: interactive growth and decay, and cooling curves with sliders for the rate and the initial value, showing the equation next to the graph.
- Each visual shows the equation or rule it demonstrates and updates live.

DESIGN
- Pure black background, white text, thin lines, minimal, lowercase titles, no clutter. Must work well on mobile. Fast load, no heavy dependencies.
- Navigation: a simple topic index plus search (fuzzy search is fine). Include a one-page formula and method cheat sheet.

RESEARCH
- Use web search whenever the repo data is thin or ambiguous, or you need better intuition, derivations, or common student mistakes. Prefer authoritative sources such as NCERT, university calculus notes, and MIT OpenCourseWare. Do not copy text verbatim; write it in your own words.

DEPLOY
- Add a GitHub Actions workflow (or use gh) to deploy to GitHub Pages, enable Pages through gh, and wait for the deployment to succeed.
- Verify the live URL loads, the visuals work, and the practice flow works (hints, solutions, progress). Fix anything broken, then redeploy.

DONE WHEN
- The live site URL responds with HTTP 200, every topic page renders its visual and its practice questions without console errors, math renders correctly, and every worked solution has been checked.
- Finish by printing: the new repo URL, the live site URL, and a short list of the topics covered.
```