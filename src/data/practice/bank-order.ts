import type { Question } from '../practice';

/**
 * Question bank for `order-and-degree` and `formation`.
 *
 * Every formation answer was verified with sympy: for each family, `solve` for
 * y(x), differentiate to y', y'', y''', substitute into the claimed differential
 * equation and simplify. Residuals are identically zero for every branch and
 * several parameter values (exact rationals, so no float round-off).
 *
 * In particular the c(y+c)^2 = x^3 eliminant was re-derived from scratch:
 *   c(y+c)^2 = x^3,  2c(y+c)y' = 3x^2  =>  y + c = 2xy'/3  =>  c = (2xy' - 3y)/3
 *   => (2xy'-3y)/3 * 4x^2y'^2/9 = x^3  =>  8x(y')^3 - 12y(y')^2 - 27x = 0
 *   => 12y(y')^2 + 27x = 8x(y')^3, so a = 27, b = 8 and a + b = 35.
 */
export const BANK_ORDER: Question[] = [
  // ────────────────────────────── order and degree ──────────────────────────────
  {
    id: 'ord-01',
    topic: 'order-and-degree',
    level: 'basic',
    prompt: String.raw`Find the order and degree of the equation
      $$\left(\frac{d^2y}{dx^2}\right)^3 + y\left(\frac{dy}{dx}\right)^4 = x^5.$$`,
    options: [
      'order $2$, degree $3$',
      'order $3$, degree $2$',
      'order $2$, degree $5$',
      'order $4$, degree $3$',
    ],
    correct: 0,
    hints: [
      String.raw`Order is simply the highest derivative that appears. Which derivative is highest here?`,
      String.raw`The equation is already a polynomial in $y'$ and $y''$, so the degree is the power of the highest derivative. Look only at the $y''$-term.`,
      String.raw`Highest derivative is $y''$, and it enters as $\left(y''\right)^3$ — a power, not a product of two derivatives.`,
    ],
    solution: String.raw`The derivatives present are $y'$ and $y''$, so the highest one is $y''$ and the **order is $2$**.

The equation is already free of radicals and fractions in the derivatives, and every derivative enters as a whole power — it is a polynomial in $y', y''$. So the **degree is defined**, and it is the power of the highest-order derivative $y''$.

The $y''$-term is $\left(y''\right)^3$, so its power is $3$: **degree $= 3$**.

(The term $y(y')^4$ has degree $4$ in $y'$, but the degree is read off the *highest-order* derivative, not the largest power anywhere in the equation. That is why degree is $3$ and not $4$.)`,
  },

  {
    id: 'ord-02',
    topic: 'order-and-degree',
    level: 'basic',
    prompt: String.raw`Find the order and degree of
      $$\left[1+\left(\frac{dy}{dx}\right)^2\right]^{3/2} = k\frac{d^2y}{dx^2}, \quad k \neq 0 .$$`,
    options: [
      'order $2$, degree $1$',
      'order $2$, degree $2$',
      'order $1$, degree $2$',
      'order $2$, degree $3$',
    ],
    correct: 1,
    hints: [
      String.raw`The fractional power $3/2$ means the equation is not yet a polynomial in the derivatives. You must clear it before the degree can even be read.`,
      String.raw`Square both sides — that turns $\left[\cdots\right]^{3/2}$ into $\left[\cdots\right]^3$. Then look at the power of $y''$.`,
      String.raw`After squaring: $\left[1+(y')^2\right]^3 = k^2(y'')^2$. Order stays $2$; the exponent on $y''$ is now $2$.`,
    ],
    solution: String.raw`The highest derivative present is $y''$, so the **order is $2$** and this never changes.

For the degree we must first clear the fractional power $3/2$. Square both sides:
$$\left[1+(y')^2\right]^3 = k^2 (y'')^2 .$$
This is now a polynomial in $y'$ and $y''$ (the $3$ in the bracket is just a power on a whole expression, not a fractional exponent on a derivative).

The highest-order derivative $y''$ now appears squared, so the **degree is $2$**.

Note the trap: the $3$ on the left bracket is *not* the degree — the degree is the power of the highest-order derivative $y''$, which is $2$.`,
  },

  {
    id: 'ord-03',
    topic: 'order-and-degree',
    level: 'basic',
    prompt: String.raw`Find the order and degree of
      $$\frac{d^2y}{dx^2} + \sin\left(\frac{dy}{dx}\right) = 0.$$`,
    options: [
      'order $2$, degree **not defined**',
      'order $2$, degree $2$',
      'order $1$, degree **not defined**',
      'order $2$, degree $1$',
    ],
    correct: 0,
    hints: [
      String.raw`Degree asks a separate question from order: can you write the equation as a polynomial in $y', y'', \dots$? Ask that of the $\sin$ term.`,
      String.raw`$\sin(y') = y' - \frac{(y')^3}{3!} + \frac{(y')^5}{5!} - \dots$ — powers of $y'$ that never stop. Is that a polynomial?`,
      String.raw`The derivative is *trapped inside* $\sin$ and cannot be freed algebraically, so there is no highest power to read off.`,
    ],
    solution: String.raw`**Order.** The highest derivative appearing is $y''$, so the order is $2$. (Order is always defined.)

**Degree.** Expand the sine term:
$$\sin(y') = y' - \frac{(y')^3}{3!} + \frac{(y')^5}{5!} - \frac{(y')^7}{7!} + \cdots$$
The powers of $y'$ run $1, 3, 5, 7, \dots$ without bound, so there is no finite highest power and the expression is not a polynomial in $y'$.

The derivative is trapped inside the transcendental function $\sin(\cdot)$ and cannot be freed by any algebraic manoeuvre. Therefore the **degree is not defined**.

A student who says "degree $1$ because the $y''$-term is linear" has confused order with degree: linear in $y''$ is irrelevant while $y'$ sits inside a sine.`,
  },

  {
    id: 'ord-04',
    topic: 'order-and-degree',
    level: 'main',
    prompt: String.raw`Find the order and degree of
      $$e^{\frac{d^3y}{dx^3} - x\frac{dy}{dx} + y} = 0.$$`,
    options: [
      'order $3$, degree $1$',
      'order $1$, degree $3$',
      'order $3$, degree $3$',
      'order $3$, degree **not defined**',
    ],
    correct: 0,
    hints: [
      String.raw`As written this does not look like a polynomial in the derivatives — but one cheap algebraic move frees every derivative. Take the natural log of both sides.`,
      String.raw`$e^{W} = 0$ forces the exponent $W$ to be $0$. So $\frac{d^3y}{dx^3} - x\frac{dy}{dx} + y = 0$.`,
      String.raw`Now it is a polynomial: highest derivative $y'''$ appears to the first power only.`,
    ],
    solution: String.raw`Take the natural logarithm of both sides:
$$\frac{d^3y}{dx^3} - x\frac{dy}{dx} + y = 0 .$$

Now every derivative enters algebraically, so the equation is a polynomial in $y', y'', y'''$ and the degree is defined.

- Highest derivative present: $y'''$ ⟹ **order $= 3$**.
- Power of $y'''$: it appears only to the first power ⟹ **degree $= 1$**.

This is the standard "escape the exponential" move. The $e^{(\cdot)} = 0$ shell hides a perfectly ordinary linear equation; had the derivative been inside a $\sin$ instead, the degree would have been undefined.`,
  },

  {
    id: 'ord-05',
    topic: 'order-and-degree',
    level: 'main',
    prompt: String.raw`Find the order and degree of
      $$y = x\frac{dy}{dx} + \frac{k}{dy/dx}.$$`,
    options: [
      'order $1$, degree $2$',
      'order $2$, degree $1$',
      'order $1$, degree $1$',
      'order $1$, degree **not defined**',
    ],
    correct: 0,
    hints: [
      String.raw`Only $y'$ appears anywhere — but the denominator $dy/dx$ has to be cleared before the equation counts as a polynomial. What is the derivative order?`,
      String.raw`Multiply the whole equation by $y'$: $y\,y' = x(y')^2 + k$. Read the power of $y'$ from the right-hand side.`,
      String.raw`$x(y')^2 - y\,y' + k = 0$ — the highest derivative is $y'$ and it appears squared, so degree $2$.`,
    ],
    solution: String.raw`**Order.** The only derivative in the equation is $y' = \dfrac{dy}{dx}$, so the order is $1$.

**Degree.** The derivative sits in a denominator, so first clear it. Multiply by $y'$:
$$y\,y' = x(y')^2 + k \quad\Longrightarrow\quad x(y')^2 - y\,y' + k = 0 .$$
This is now a polynomial in $y'$, with $y'$ appearing to powers $2$ and $1$.

The highest-order derivative is $y'$ and its highest power is $2$, so the **degree is $2$**.

This is a Clairaut-type equation ($y = xp + k/p$ with $p = y'$); its order $1$ / degree $2$ signature is the standard marker, and its singular solution is the envelope $y^2 = 4ax$.`,
  },

  {
    id: 'ord-06',
    topic: 'order-and-degree',
    level: 'main',
    prompt: String.raw`What is the order of the differential equation whose general solution is
      $$y = c_1e^{\,x+c_2} + c_3e^{\,x+c_4}?$$`,
    options: ['$1$', '$2$', '$3$', '$4$'],
    correct: 0,
    hints: [
      String.raw`Order equals the number of **essential** arbitrary constants — not the number of $c$-symbols you can count.`,
      String.raw`Factor out the common $e^x$: $y = e^x\left(c_1e^{c_2} + c_3e^{c_4}\right)$. How many independent quantities remain inside the bracket?`,
      String.raw`Write $A = c_1e^{c_2}$ and $B = c_3e^{c_4}$. Then $y = Ae^x + Be^x$, which has just two constants — not four.`,
    ],
    solution: String.raw`The order of the differential equation that governs a family equals the number of **essential (independent)** arbitrary constants in that family.

Here four symbols appear, but they do not survive as four parameters. Factor out $e^x$:
$$y = e^x\left(c_1e^{c_2} + c_3e^{c_4}\right) = Ae^x + Be^x,$$
where
$$A = c_1e^{c_2}, \qquad B = c_3e^{c_4}.$$
The four symbols have collapsed to exactly two essential constants, so $A$ and $B$ are the only free parameters.

Differentiating twice gives $y' = Ae^x + Be^x = y$ and $y'' = y' = y$, and eliminating $A, B$ from $y = Ae^x+Be^x$ and $y' = Ae^x+Be^x$ forces $y' = y$. The equation $y' - y = 0$ has order $1$.

So the **order is $1$** (degree $1$), not $4$.`,
  },

  {
    id: 'ord-07',
    topic: 'order-and-degree',
    level: 'main',
    prompt: String.raw`What is the order of the differential equation whose general solution is
      $$y = c_1\ln(c_2x)?$$`,
    options: ['$1$', '$2$', '$3$', '$4$'],
    correct: 1,
    hints: [
      String.raw`Two constants are written, but before you count them check whether they are *independent*.`,
      String.raw`$\ln(c_2x) = \ln c_2 + \ln x$, so $y = c_1\ln x + c_1\ln c_2$. One constant survives inside $c_1\ln c_2$.`,
      String.raw`With $A = c_1$ and $B = c_1\ln c_2$ the family is $y = A\ln x + B$: two genuinely independent parameters.`,
    ],
    solution: String.raw`Expand the logarithm:
$$y = c_1(\ln c_2 + \ln x) = c_1\ln x + c_1\ln c_2 .$$
Now rename the surviving parameters:
$$A = c_1, \qquad B = c_1\ln c_2 .$$
These are two **independent** constants: $c_2 = e^{B/A}$ can be recovered from them (for $A \neq 0$), and $c_1 = A$. So nothing has been lost — the family really is two-dimensional, just written with two symbols.

Two essential constants ⟹ **order $= 2$**.

Check by elimination. Differentiate twice:
$$y' = \frac{c_1}{x}, \qquad y'' = -\frac{c_1}{x^2} = -\frac{y'}{x},$$
so $xy'' + y' = 0$, an equation of order $2$ — matching the parameter count.

(The contrast with $y = c_1e^{x+c_2}$ is the point: there $c_1e^{c_2}$ merged into a *single* constant and the order dropped to $1$, whereas here $c_1$ and $c_1\ln c_2$ stay independent.)`,
  },

  {
    id: 'ord-08',
    topic: 'order-and-degree',
    level: 'advanced',
    prompt: String.raw`What is the order and degree of the differential equation whose general solution is
      $$y = (c_1+c_2)\cos(x+c_3) - c_4e^{\,x+c_5}?$$`,
    options: [
      'order $3$, degree $1$',
      'order $5$, degree $1$',
      'order $3$, degree $3$',
      'order $5$, degree $3$',
    ],
    correct: 0,
    hints: [
      String.raw`Five $c$-symbols are written. Merge the ones that combine algebraically or through an exponential before you count.`,
      String.raw`$c_1+c_2$ is a *single* parameter, and $c_4e^{c_5}$ is a single parameter. So which three survive?`,
      String.raw`With $A = c_1+c_2$, $C = c_3$, $B = c_4e^{c_5}$ the family is $y = A\cos(x+C) - Be^x$: three parameters ⟹ order $3$, and the eliminant $y'''-y''+y'-y=0$ is linear in $y'''$ ⟹ degree $1$.`,
    ],
    solution: String.raw`Count **essential** constants, then read the degree off the derivative.

**Merging the parameters.** $c_1 + c_2$ is one parameter, not two: call it $A$. Also $c_4e^{x+c_5} = e^x(c_4e^{c_5})$ and $c_4e^{c_5}$ is one parameter: call it $B$. Let $C = c_3$. Then
$$y = A\cos(x+C) - Be^x$$
with exactly three essential constants $A, B, C$ — all mutually independent, since $c_1$ and $c_2$ can be swapped freely and $c_5 = \ln(B/c_4)$.

**Order.** Three parameters ⟹ **order $= 3$**.

**Degree.** Three parameters, so differentiate three times:
$$y' = -A\sin(x+C) - Be^x,$$
$$y'' = -A\cos(x+C) - Be^x,$$
$$y''' = A\sin(x+C) - Be^x .$$

Now eliminate $A$ and $B$ by adding and subtracting these:
$$y' + y''' = -2Be^x, \qquad y'' + y = -2Be^x \quad\Longrightarrow\quad y' + y''' = y'' + y,$$
$$\boxed{y''' - y'' + y' - y = 0}.$$
That relation involves no constant and no derivative of order above $3$, and $A, B, C$ have all dropped out. It is a polynomial in $y', y'', y'''$ with $y'''$ appearing only to the first power, so the **degree is $1$**.

Order $3$, degree $1$ — despite five constants being written down.`,
  },

  {
    id: 'ord-09',
    topic: 'order-and-degree',
    level: 'advanced',
    prompt: String.raw`Find the order and degree of
      $$\left(\frac{d^3y}{dx^3}\right)^2 + \ln\left(\frac{d^2y}{dx^2}\right) = 0.$$`,
    options: [
      'order $3$, degree $2$',
      'order $3$, degree **not defined**',
      'order $2$, degree $3$',
      'order $2$, degree **not defined**',
    ],
    correct: 1,
    hints: [
      String.raw`Order is easy — find the highest derivative. For the degree you must clear the logarithm, and see whether clearing it also frees $y'''$.`,
      String.raw`$\ln(y'') = -(y''')^2$ exponentiates to $y'' = e^{-(y''')^2}$. That is *not* a polynomial in $y'''$ — the derivative is still trapped in an exponential.`,
      String.raw`The square on $y'''$ looks like it should set the degree, but you must first remove the logarithm, and doing so re-traps $y'''$. Hence degree undefined.`,
    ],
    solution: String.raw`**Order.** The highest derivative present is $y'''$, so **order $= 3$**.

**Degree.** You cannot read a degree straight off the $(y''')^2$ term, because the equation is not yet a polynomial in the derivatives. Try to clear the logarithm: isolate it and exponentiate,
$$\ln(y'') = -(y''')^2 \quad\Longrightarrow\quad y'' = e^{-(y''')^2}.$$
That is not a polynomial in $y'''$ — the highest derivative is now trapped inside an exponential, whose series $-(y''')^2 + \frac{(y''')^4}{2!} - \cdots$ has unbounded powers of $y'''$. And you cannot clear both at once: no algebraic identity frees $y'''$ from the exponential while keeping $y''$ linear.

Since the equation cannot be written as a polynomial in $y', y'', y'''$, the **degree is not defined**.

The moral: "power $2$ of the highest derivative" only sets the degree *after* the equation is genuinely polynomial. Here it is not.`,
  },

  {
    id: 'ord-10',
    topic: 'order-and-degree',
    level: 'advanced',
    prompt: String.raw`Find the order and degree of
      $$\ln\left(\frac{d^2y}{dx^2}\right) = ax + by,$$`,
    answer: 'order $2$, degree $1$',
    accept: ['order 2, degree 1', 'order 2 and degree 1', '2, 1', 'order=2, degree=1'],
    hints: [
      String.raw`The logarithm has $y''$ inside it, so nothing can be read off until you exponentiate. What does $\ln(y'') = ax+by$ become?`,
      String.raw`$y'' = e^{ax+by}$. The derivative is now out of the transcendental function and sits alone on the left.`,
      String.raw`Highest derivative $y''$ ⟹ order $2$; it appears to the first power ⟹ degree $1$. (Note the contrast with $\sin(y'')$, where no exponentiation frees the derivative.)`,
    ],
    solution: String.raw`Exponentiate both sides:
$$\frac{d^2y}{dx^2} = e^{ax+by}.$$
Now the derivative is completely free of the transcendental function and stands alone on the left, while the right-hand side depends only on $x$ and $y$. The equation is a polynomial in the derivatives.

- Highest derivative present: $y''$ ⟹ **order $= 2$**.
- Power of $y''$: $1$ ⟹ **degree $= 1$**.

This is the key discrimination the chapter is built on. $\ln(y'') = ax+by$ has a *defined* degree because exponentiating frees $y''$, whereas $y'' + \sin(y') = 0$ has an *undefined* degree because $y'$ stays trapped in the sine. Undefined degree means only "cannot be made polynomial" — not "there is a logarithm somewhere".`,
  },

  // ───────────────────────────────── formation ─────────────────────────────────
  {
    id: 'frm-01',
    topic: 'formation',
    level: 'basic',
    prompt: String.raw`Find the differential equation of the family of all circles which touch the $x$-axis at the origin, i.e.
      $$x^2 + (y-a)^2 = a^2 \iff x^2 + y^2 = 2ay,$$
      where $a$ is the single arbitrary parameter.`,
    options: [
      String.raw`$(y^2-x^2)\dfrac{dy}{dx} + 2xy = 0$`,
      String.raw`$(x^2-y^2)\dfrac{dy}{dx} + 2xy = 0$`,
      String.raw`$(y^2-x^2)\dfrac{dy}{dx} - 2xy = 0$`,
      String.raw`$(x^2+y^2)\dfrac{dy}{dx} = 2xy$`,
    ],
    correct: 0,
    hints: [
      String.raw`One parameter means differentiate **once**, then eliminate $a$ using the original equation and its derivative together.`,
      String.raw`Solve for the parameter first: $\dfrac{x^2+y^2}{y} = 2a$. Now differentiate that with respect to $x$ — but do not throw away the $y'$ terms from the denominator.`,
      String.raw`$\dfrac{y(2x+2yy') - (x^2+y^2)y'}{y^2} = 0 \Rightarrow 2xy + y^2y' - x^2y' = 0$, and the $y^2y'$ combines with $-x^2y'$.`,
    ],
    solution: String.raw`There is **one** parameter $a$, so differentiate once and eliminate it.

**Step 1 — isolate the parameter.**
$$x^2+y^2 = 2ay \quad\Longrightarrow\quad \frac{x^2+y^2}{y} = 2a .$$

**Step 2 — differentiate.**
$$\frac{y(2x + 2yy') - (x^2+y^2)y'}{y^2} = 0 .$$

**Step 3 — clear and simplify the numerator.**
$$2xy + 2y^2y' - x^2y' - y^2y' = 0 \quad\Longrightarrow\quad 2xy + y^2y' - x^2y' = 0 .$$

**Step 4 — group.**
$$\boxed{(y^2-x^2)\frac{dy}{dx} + 2xy = 0}.$$

The parameter $a$ is gone, and the resulting equation is first order — as it must be, since the family had one parameter.

*Verification:* with $y = a \pm \sqrt{a^2-x^2}$, so $y' = \mp \frac{x}{\sqrt{a^2-x^2}}$ and $y^2-x^2 = 2a(a\pm\sqrt{\cdot}) \mp \ldots$, direct symbolic substitution reduces $(y^2-x^2)y' + 2xy$ to $0$ identically for every $a$ and both branches.`,
  },

  {
    id: 'frm-02',
    topic: 'formation',
    level: 'basic',
    prompt: String.raw`Find the differential equation of the family of all non-vertical straight lines
      $$y = mx + c,$$
      where $m$ and $c$ are arbitrary constants.`,
    answer: String.raw`$y'' = 0$`,
    accept: ["y'' = 0", "d^2y/dx^2 = 0", "d²y/dx² = 0"],
    hints: [
      String.raw`Count the parameters first: $m$ and $c$ are both arbitrary, so how many times must you differentiate?`,
      String.raw`$y' = m$ kills $m$; $y'' = 0$ kills $c$. The straightness of a line is expressed by its vanishing second derivative.`,
      String.raw`Differentiate twice: $y' = m$, then $y'' = 0$. That relation has no constants left in it.`,
    ],
    solution: String.raw`The family $y = mx+c$ has **two** essential parameters, $m$ and $c$, so the differential equation must be of order $2$.

Differentiate once:
$$y' = m \quad\Longrightarrow\quad m = y'.$$
Differentiate a second time:
$$y'' = 0 .$$

Both $m$ and $c$ have disappeared without ever needing to be substituted back — the two differentiations have produced exactly the two equations needed to eliminate them. Hence the differential equation of the family of all straight lines is

$$y'' = 0,$$

which has order $2$ and degree $1$. Geometrically this is exactly "curvature is zero everywhere".

(Vertical lines are missed only because they cannot be written as $y = f(x)$; that is why the question says *non-vertical*.)`,
  },

  {
    id: 'frm-03',
    topic: 'formation',
    level: 'basic',
    prompt: String.raw`Form the differential equation of the one-parameter family
      $$y = ce^{2x}.$$
      Give the equation in the form $F(x,y,y') = 0$.`,
    answer: String.raw`$y' - 2y = 0$`,
    accept: ['y\' - 2y = 0', 'y\' = 2y', 'dy/dx = 2y', 'y\' - 2y=0', 'y\'=2y'],
    hints: [
      String.raw`One parameter $c$ means order $1$: differentiate exactly once.`,
      String.raw`$\dfrac{dy}{dx} = 2ce^{2x}$. Now compare this with the original equation — $y = ce^{2x}$.`,
      String.raw`The two right-hand sides differ by a factor $2$, so $y' = 2y$, i.e. $y' - 2y = 0$.`,
    ],
    solution: String.raw`One parameter $c$ ⟹ differentiate once.

$$y = ce^{2x} \quad\Longrightarrow\quad \frac{dy}{dx} = 2ce^{2x}.$$

Now eliminate $c$ without substituting it explicitly. Since $y = ce^{2x}$, the derivative equation reads
$$y' = 2\,(ce^{2x}) = 2y .$$

So the differential equation of the family is

$$y' - 2y = 0,$$

first order and first degree — as it must be for a one-parameter family.

*Verification:* for $y = ce^{2x}$, $y' - 2y = 2ce^{2x} - 2ce^{2x} = 0$ identically for every $c$.`,
  },

  {
    id: 'frm-04',
    topic: 'formation',
    level: 'main',
    prompt: String.raw`Find the differential equation of the family of all parabolas whose axis is parallel to the $x$-axis:
      $$(y-k)^2 = 4a(x-h),$$
      with $h, k, a$ three arbitrary parameters.`,
    options: [
      String.raw`$3(y'')^2 - y'\,y''' = 0$`,
      String.raw`$3(y''')^2 - y''\,y^{(4)} = 0$`,
      String.raw`$(y'')^3 - (y''')^2 = 0$`,
      String.raw`$2(y'')^3 - 3y'y''y''' = 0$`,
    ],
    correct: 0,
    hints: [
      String.raw`Three parameters means differentiate three times. But do **not** try to expand $(y-k)^2$ first — differentiate in the factored form where $y-k$ appears as a single block.`,
      String.raw`First derivative: $(y-k)y' = 2a$, so $y-k = 2a/y'$. Second: $(y')^2 + (y-k)y'' = 0$. Notice $a$ is already gone — you only need $y-k$.`,
      String.raw`Substitute $y-k = -\dfrac{(y')^2}{y''}$ into the second derivative relation and clear the $y''$: $3y'y'' - \dfrac{(y')^2y'''}{y''} = 0$.`,
    ],
    solution: String.raw`Three parameters $(h,k,a)$ ⟹ differentiate three times. Keep $(y-k)$ unexpanded so it behaves as one block.

**First derivative.**
$$2(y-k)y' = 4a \quad\Longrightarrow\quad (y-k)y' = 2a \quad\Longrightarrow\quad y-k = \frac{2a}{y'} .$$

**Second derivative.**
$$(y')^2 + (y-k)y'' = 0 \quad\Longrightarrow\quad y-k = -\frac{(y')^2}{y''}.$$

**Third derivative** (differentiate the second-derivative equation directly):
$$2y'y'' + y'y'' + (y-k)y''' = 0 .$$

**Substitute** $y-k = -\dfrac{(y')^2}{y''}$:
$$3y'y'' - \frac{(y')^2 y'''}{y''} = 0 .$$

**Clear $y''$:**
$$\boxed{3(y'')^2 - y'y''' = 0},$$

of order $3$ and degree $1$ — matching the three parameters $h, k, a$.

*Verification:* writing $y = k \pm 2\sqrt{a(x-h)}$ and differentiating through to $y'''$, the residual $3(y'')^2 - y'y'''$ simplifies to exactly $0$ for several exact parameter triples, e.g. $(a,k,h) = (1, \tfrac12, \tfrac15)$ and $(2,-1,\tfrac1{10})$, on both branches.`,
  },

  {
    id: 'frm-05',
    topic: 'formation',
    level: 'main',
    prompt: String.raw`The differential equation of the family of curves
      $$x^2 = 4b(y + b), \quad b \in \mathbb{R} \text{ arbitrary},$$
      is:`,
    options: [
      String.raw`$x(y')^2 = x - 2yy'$`,
      String.raw`$x\,y'' = y'$`,
      String.raw`$x(y')^2 = x + 2yy'$`,
      String.raw`$x(y')^2 = 2yy' - x$`,
    ],
    correct: 2,
    source: 'JEE Main 2020',
    hints: [
      String.raw`There is one parameter $b$, so differentiate once. Key convention: $b$ is a *constant of the family*, so $b' = 0$ when you differentiate.`,
      String.raw`$x^2 = 4by + 4b^2 \Rightarrow 2x = 4by' + 0$, hence $b = \dfrac{x}{2y'}$.`,
      String.raw`Put $b = \dfrac{x}{2y'}$ back into $x^2 = 4by + 4b^2$, multiply by $(y')^2$ and divide by $x$: you land on $x(y')^2 = x + 2yy'$.`,
    ],
    solution: String.raw`There is **one** parameter $b$, so differentiate once.

**Step 1 — differentiate.** This is a family of parabolas with axis along the $y$-axis. Since $b$ is an arbitrary *constant* of the family, it has derivative $0$:
$$2x = 4b\,y' + 8b\cdot 0 = 4b\,y'
\quad\Longrightarrow\quad
b = \frac{x}{2y'} .$$

**Step 2 — substitute back** into $x^2 = 4by + 4b^2$:
$$x^2 = 4\left(\frac{x}{2y'}\right)y + 4\left(\frac{x}{2y'}\right)^2 = \frac{2xy}{y'} + \frac{x^2}{(y')^2}.$$

**Step 4 — multiply by $(y')^2$ and divide by $x \neq 0$:**
$$x^2(y')^2 = 2xy\,y' + x^2 \quad\Longrightarrow\quad \boxed{x(y')^2 = x + 2yy'} .$$

Hence option **(3)**.

*Verification:* with $y = \dfrac{x^2}{4b} - b$ we get $y' = \dfrac{x}{2b}$, so $x(y')^2 = \dfrac{x^3}{4b^2}$ and $x + 2yy' = x + 2\left(\frac{x^2}{4b}-b\right)\frac{x}{2b} = x + \frac{x^3}{4b^2} - x = \dfrac{x^3}{4b^2}$. Identical, for every $b$.`,
  },

  {
    id: 'frm-06',
    topic: 'formation',
    level: 'main',
    prompt: String.raw`Form the differential equation of the family of confocal, coaxial parabolas
      $$y^2 = 4a(x+a),$$
      where $a$ is the single arbitrary parameter. (This family is self-orthogonal — check that in your solution.)`,
    answer: String.raw`$y(y')^2 + 2xy' - y = 0$`,
    accept: [
      'y(y\')^2 + 2xy\' - y = 0',
      'y(y\')2+2xy\'-y=0',
      '2xy\' + y(y\')^2 = y',
      'y(y\')^2 + 2xy\' - y =0',
    ],
    hints: [
      String.raw`One parameter $a$ ⟹ differentiate once, and the derivative equation gives $a$ in terms of $x, y, y'$ immediately. Do that first.`,
      String.raw`$2yy' = 4a \Rightarrow a = \frac{yy'}{2}$. Put this back into $y^2 = 4a(x+a)$ — note the $x+a$ also contains $a$, so $a$ appears twice.`,
      String.raw`$y^2 = 4\cdot\frac{yy'}{2}\left(x + \frac{yy'}{2}\right) = 2xyy' + y^2(y')^2$. Divide by $y$.`,
    ],
    solution: String.raw`One parameter $a$ ⟹ differentiate once and eliminate $a$.

**Step 1 — differentiate.**
$$2y\,y' = 4a \quad\Longrightarrow\quad a = \frac{y\,y'}{2}.$$

**Step 2 — substitute back** into $y^2 = 4a(x+a)$, replacing *both* occurrences of $a$:
$$y^2 = 4\left(\frac{yy'}{2}\right)\left[x + \frac{yy'}{2}\right] = 2y\,y'\,x + (y\,y')^2 .$$

**Step 3 — divide by $y \neq 0$:**
$$\boxed{y\,(y')^2 + 2x\,y' - y = 0},$$
order $1$, degree $2$.

**Self-orthogonality.** Replace $y'$ by $-\dfrac{1}{y'} = -\dfrac{dx}{dy}$:
$$y\left(\frac{1}{y'}\right)^2 - \frac{2x}{y'} - y = 0 .$$
Multiplying by $(y')^2$:
$$y - 2x\,y' - y(y')^2 = 0,$$
which is exactly the *negative* of the original equation. So the family of orthogonal trajectories is the family itself — a **self-orthogonal** family.

*Verification:* with $y = \pm\sqrt{4a(x+a)}$, symbolic substitution of $y'$ into $y(y')^2 + 2xy' - y$ simplifies to exactly $0$ for $a = 1, 2, \tfrac25$ on both branches.`,
  },

  {
    id: 'frm-07',
    topic: 'formation',
    level: 'advanced',
    prompt: String.raw`The differential equation of the family of curves
      $$c(y+c)^2 = x^3,$$
      where $c$ is an arbitrary non-zero constant, can be written in the form
      $$12y\,(y')^2 + ax = b\,x\,(y')^3 .$$
      Find $a + b$.`,
    options: ['$33$', '$35$', '$37$', '$43$'],
    correct: 1,
    hints: [
      String.raw`One parameter $c$ ⟹ differentiate once: $2c(y+c)y' = 3x^2$. Then **divide the derivative equation by the original** — that kills $c$ and $(y+c)$ at the same time.`,
      String.raw`$\dfrac{2c(y+c)y'}{c(y+c)^2} = \dfrac{3x^2}{x^3} \Rightarrow \dfrac{2y'}{y+c} = \dfrac{3}{x} \Rightarrow y + c = \dfrac{2xy'}{3}$.`,
      String.raw`Now $c = y + c - y = \dfrac{2xy'}{3} - y$. Substitute **both** of these into the original equation and clear the denominators carefully.`,
    ],
    solution: String.raw`**Step 1 — differentiate once.**
$$2c(y+c)y' = 3x^2 .$$

**Step 2 — divide the derivative equation by the original equation.** This is the move that removes $c$ almost for free:
$$\frac{2c(y+c)y'}{c(y+c)^2} = \frac{3x^2}{x^3}
\quad\Longrightarrow\quad \frac{2y'}{y+c} = \frac{3}{x}
\quad\Longrightarrow\quad y + c = \frac{2x\,y'}{3}.$$

**Step 3 — recover $c$.**
$$c = (y+c) - y = \frac{2x\,y'}{3} - y = \frac{2xy' - 3y}{3}.$$

**Step 4 — put both back** into $c(y+c)^2 = x^3$:
$$\left(\frac{2xy' - 3y}{3}\right)\left(\frac{2xy'}{3}\right)^2 = x^3 .$$

**Step 5 — clear denominators.** Multiply by $27$ and by $x^2$:
$$(2xy' - 3y)\,4x^2(y')^2 = 27x^3
\quad\Longrightarrow\quad (y')^2(2xy' - 3y) = 27x .$$

**Step 6 — expand and rearrange.**
$$2x(y')^3 - 3y(y')^2 = 27x
\quad\Longrightarrow\quad 12y\,(y')^2 + 27x = 8x\,(y')^3 .$$

Comparing with $12y(y')^2 + ax = b\,x(y')^3$ gives $a = 27$ and $b = 8$, so
$$a + b = 27 + 8 = \boxed{35}.$$

**Watch the constant factors.** The easy mistake is to write $y + c = \dfrac{xy'}{3}$ (dropping the $2$) or to end at $12y(y')^2 + 9x = 8x(y')^3$ (forgetting the $4$ from $(2xy')^2$). Both give a plausible-looking but wrong coefficient pair.

*Verification:* with $y = \dfrac{x^{3/2}}{\sqrt{c}} - c$ one gets $y' = \dfrac{3\sqrt{x}}{2\sqrt{c}}$, and the residual $12y(y')^2 + 27x - 8x(y')^3$ simplifies to exactly $0$ for $c = 1,\, 2,\, \tfrac13$ on both branches.`,
  },

  {
    id: 'frm-08',
    topic: 'formation',
    level: 'advanced',
    prompt: String.raw`Find the differential equation of the family of all circles which pass through the origin and whose centre lies on the line $y = x$.`,
    options: [
      String.raw`$(x^2-y^2-2xy)\dfrac{dy}{dx} = x^2 - y^2 + 2xy$`,
      String.raw`$(x^2+y^2)\dfrac{dy}{dx} = x^2 + y^2 + 2xy$`,
      String.raw`$(x^2-y^2+2xy)\dfrac{dy}{dx} = x^2 - y^2 - 2xy$`,
      String.raw`$(x^2-y^2-2xy)\dfrac{dy}{dx} = -(x^2-y^2-2xy)$`,
    ],
    correct: 0,
    hints: [
      String.raw`Write the general circle through the origin as $x^2+y^2+2gx+2fy = 0$. Its centre is $(-g, -f)$; impose the condition that this lies on $y = x$.`,
      String.raw`$(-g) = (-f) \Rightarrow g = f$. So the family is $x^2+y^2+2g(x+y)=0$ — one parameter, differentiate once.`,
      String.raw`$2x + 2yy' + 2g(1+y') = 0 \Rightarrow g = -\dfrac{x+yy'}{1+y'}$. Substitute into the original and multiply by $(1+y')$.`,
    ],
    solution: String.raw`**Step 1 — write the family.** A circle through the origin has no constant term:
$$x^2+y^2+2gx+2fy = 0,$$
with centre $(-g,-f)$.

**Step 2 — impose "centre on $y=x$".** The centre must satisfy $-g = -f$, i.e. $g = f$. Writing the single parameter as $g$:
$$x^2 + y^2 + 2g(x+y) = 0 .$$
One parameter ⟹ differentiate once.

**Step 3 — differentiate.**
$$2x + 2y\,y' + 2g\,(1 + y') = 0
\quad\Longrightarrow\quad
g = -\frac{x + y\,y'}{1 + y'} .$$

**Step 4 — substitute** into the family equation:
$$x^2+y^2 - \frac{2(x+y)\,(x+y\,y')}{1+y'} = 0 .$$

**Step 5 — clear the denominator.**
$$(x^2+y^2)(1+y') - 2(x+y)(x + y\,y') = 0 .$$
Expanding:
$$x^2+y^2 + (x^2+y^2)y' - 2x^2 - 2xy - 2xy\,y' - 2y^2y' = 0,$$
$$(-x^2+y^2-2xy) + (x^2 - y^2 - 2xy)\,y' = 0 .$$

**Step 6 — rearrange into slope form.**
$$\boxed{(x^2-y^2-2xy)\frac{dy}{dx} = x^2 - y^2 + 2xy}$$

Order $1$, degree $1$ — correct for a one-parameter family.

*Verification:* the circles are $x^2+y^2+2g(x+y)=0$, so $y = -g \pm \sqrt{g^2-2gx-x^2}$. Substituting $y$ and $y'$ into $(x^2-y^2-2xy)y' - (x^2-y^2+2xy)$ simplifies to exactly $0$ for $g = 1,\, 2,\, -\tfrac32$ on both branches.

*Sanity check on the sign:* compare the easy special case "centre on the $x$-axis", $x^2+y^2=2cx$, which is the same computation with $f=0$; it reproduces $\dfrac{dy}{dx} = \dfrac{y^2-x^2}{2xy}$ from the tangent-bisector problem.`,
  },
];