const $=[{slug:"order-and-degree",title:"order and degree",blurb:"how to read a differential equation before you solve it — highest derivative, power, and the constants that actually count.",minutes:7,visuals:["order-degree"],keywords:["order","degree","polynomial","essential constants","arbitrary constants","undefined degree","transcendental"]},{slug:"formation",title:"formation, general and particular solutions",blurb:"kill the constants: differentiate n times, eliminate n constants, and see why the order equals the number of free parameters.",minutes:8,visuals:["family-curve"],keywords:["formation","eliminate constants","general solution","particular solution","singular solution","family of curves","initial condition"]},{slug:"slope-fields",title:"slope fields and the geometry of a solution",blurb:"what a differential equation really says: at every point the plane carries an arrow. a solution is a path that never crosses an arrow.",minutes:7,visuals:["slope-field","tangent-geometry"],keywords:["slope field","direction field","isocline","integral curve","tangent","normal","subtangent","subnormal","geometric"]},{slug:"variable-separable",title:"variable separable",blurb:"the simplest move in the subject: get every x with dx, every y with dy, then integrate. plus the ax + by + c trick.",minutes:8,visuals:["separable"],keywords:["separable","separate variables","integrating","ax+by+c","substitution","reducible"]},{slug:"homogeneous",title:"homogeneous equations (y = vx)",blurb:"why does one substitution work? because the equation only sees the ratio y/x — and v = y/x is exactly that ratio.",minutes:9,visuals:["homogeneous"],keywords:["homogeneous","y = vx","substitution","ratio","dv/dx","shift of origin","parallel lines","cross multiplication"]},{slug:"linear-first-order",title:"linear first-order equations",blurb:"the integrating factor is not a formula to memorise — it is the answer to a one-line question, derived in front of you.",minutes:10,visuals:["linear-if"],keywords:["linear","integrating factor","IF","e^int P","Leibniz","dx/dy","linear in x","first order"]},{slug:"reducible-equations",title:"equations reducible to these forms",blurb:"Bernoulli, generalised linear, and Clairaut: three disguises that collapse into forms you already know.",minutes:9,visuals:["bernoulli"],keywords:["Bernoulli","reducible","z = y^(1-n)","generalised linear","Clairaut","singular solution","envelope","substitution"]},{slug:"exact-and-inspection",title:"exact equations and inspection",blurb:"recognise a perfect differential on sight: d(xy), d(y/x), d(atan(y/x)) — and integrate without doing any work.",minutes:8,visuals:["inspection"],keywords:["exact","inspection","M dx + N dy","partial derivative","potential function","d(xy)","polar","r dr"]},{slug:"orthogonal-trajectories",title:"orthogonal trajectories",blurb:"find the family that crosses every curve of your family at a right angle — one substitution turns slopes upside down.",minutes:8,visuals:["orthogonal"],keywords:["orthogonal","trajectories","perpendicular","families of curves","y -> -1/y","polar trajectory"]},{slug:"applications",title:"applications: growth, cooling, mixing, motion",blurb:"where the maths meets the world: populations, radioactive clocks, cooling coffee, tanks of salt, and an RL circuit switching on.",minutes:10,visuals:["growth-cooling","mixing"],keywords:["growth","decay","Newton cooling","mixing","tank","half life","logistic","RL circuit","application","motion","population"]}];new Map($.map(e=>[e.slug,e]));const i=[{id:"ord-01",topic:"order-and-degree",level:"basic",prompt:String.raw`Find the order and degree of the equation
      $$\left(\frac{d^2y}{dx^2}\right)^3 + y\left(\frac{dy}{dx}\right)^4 = x^5.$$`,options:["order $2$, degree $3$","order $3$, degree $2$","order $2$, degree $5$","order $4$, degree $3$"],correct:0,hints:[String.raw`Order is simply the highest derivative that appears. Which derivative is highest here?`,String.raw`The equation is already a polynomial in $y'$ and $y''$, so the degree is the power of the highest derivative. Look only at the $y''$-term.`,String.raw`Highest derivative is $y''$, and it enters as $\left(y''\right)^3$ — a power, not a product of two derivatives.`],solution:String.raw`The derivatives present are $y'$ and $y''$, so the highest one is $y''$ and the **order is $2$**.

The equation is already free of radicals and fractions in the derivatives, and every derivative enters as a whole power — it is a polynomial in $y', y''$. So the **degree is defined**, and it is the power of the highest-order derivative $y''$.

The $y''$-term is $\left(y''\right)^3$, so its power is $3$: **degree $= 3$**.

(The term $y(y')^4$ has degree $4$ in $y'$, but the degree is read off the *highest-order* derivative, not the largest power anywhere in the equation. That is why degree is $3$ and not $4$.)`},{id:"ord-02",topic:"order-and-degree",level:"basic",prompt:String.raw`Find the order and degree of
      $$\left[1+\left(\frac{dy}{dx}\right)^2\right]^{3/2} = k\frac{d^2y}{dx^2}, \quad k \neq 0 .$$`,options:["order $2$, degree $1$","order $2$, degree $2$","order $1$, degree $2$","order $2$, degree $3$"],correct:1,hints:[String.raw`The fractional power $3/2$ means the equation is not yet a polynomial in the derivatives. You must clear it before the degree can even be read.`,String.raw`Square both sides — that turns $\left[\cdots\right]^{3/2}$ into $\left[\cdots\right]^3$. Then look at the power of $y''$.`,String.raw`After squaring: $\left[1+(y')^2\right]^3 = k^2(y'')^2$. Order stays $2$; the exponent on $y''$ is now $2$.`],solution:String.raw`The highest derivative present is $y''$, so the **order is $2$** and this never changes.

For the degree we must first clear the fractional power $3/2$. Square both sides:
$$\left[1+(y')^2\right]^3 = k^2 (y'')^2 .$$
This is now a polynomial in $y'$ and $y''$ (the $3$ in the bracket is just a power on a whole expression, not a fractional exponent on a derivative).

The highest-order derivative $y''$ now appears squared, so the **degree is $2$**.

Note the trap: the $3$ on the left bracket is *not* the degree — the degree is the power of the highest-order derivative $y''$, which is $2$.`},{id:"ord-03",topic:"order-and-degree",level:"basic",prompt:String.raw`Find the order and degree of
      $$\frac{d^2y}{dx^2} + \sin\left(\frac{dy}{dx}\right) = 0.$$`,options:["order $2$, degree **not defined**","order $2$, degree $2$","order $1$, degree **not defined**","order $2$, degree $1$"],correct:0,hints:[String.raw`Degree asks a separate question from order: can you write the equation as a polynomial in $y', y'', \dots$? Ask that of the $\sin$ term.`,String.raw`$\sin(y') = y' - \frac{(y')^3}{3!} + \frac{(y')^5}{5!} - \dots$ — powers of $y'$ that never stop. Is that a polynomial?`,String.raw`The derivative is *trapped inside* $\sin$ and cannot be freed algebraically, so there is no highest power to read off.`],solution:String.raw`**Order.** The highest derivative appearing is $y''$, so the order is $2$. (Order is always defined.)

**Degree.** Expand the sine term:
$$\sin(y') = y' - \frac{(y')^3}{3!} + \frac{(y')^5}{5!} - \frac{(y')^7}{7!} + \cdots$$
The powers of $y'$ run $1, 3, 5, 7, \dots$ without bound, so there is no finite highest power and the expression is not a polynomial in $y'$.

The derivative is trapped inside the transcendental function $\sin(\cdot)$ and cannot be freed by any algebraic manoeuvre. Therefore the **degree is not defined**.

A student who says "degree $1$ because the $y''$-term is linear" has confused order with degree: linear in $y''$ is irrelevant while $y'$ sits inside a sine.`},{id:"ord-04",topic:"order-and-degree",level:"main",prompt:String.raw`Find the order and degree of
      $$e^{\frac{d^3y}{dx^3} - x\frac{dy}{dx} + y} = 0.$$`,options:["order $3$, degree $1$","order $1$, degree $3$","order $3$, degree $3$","order $3$, degree **not defined**"],correct:0,hints:[String.raw`As written this does not look like a polynomial in the derivatives — but one cheap algebraic move frees every derivative. Take the natural log of both sides.`,String.raw`$e^{W} = 0$ forces the exponent $W$ to be $0$. So $\frac{d^3y}{dx^3} - x\frac{dy}{dx} + y = 0$.`,String.raw`Now it is a polynomial: highest derivative $y'''$ appears to the first power only.`],solution:String.raw`Take the natural logarithm of both sides:
$$\frac{d^3y}{dx^3} - x\frac{dy}{dx} + y = 0 .$$

Now every derivative enters algebraically, so the equation is a polynomial in $y', y'', y'''$ and the degree is defined.

- Highest derivative present: $y'''$ ⟹ **order $= 3$**.
- Power of $y'''$: it appears only to the first power ⟹ **degree $= 1$**.

This is the standard "escape the exponential" move. The $e^{(\cdot)} = 0$ shell hides a perfectly ordinary linear equation; had the derivative been inside a $\sin$ instead, the degree would have been undefined.`},{id:"ord-05",topic:"order-and-degree",level:"main",prompt:String.raw`Find the order and degree of
      $$y = x\frac{dy}{dx} + \frac{k}{dy/dx}.$$`,options:["order $1$, degree $2$","order $2$, degree $1$","order $1$, degree $1$","order $1$, degree **not defined**"],correct:0,hints:[String.raw`Only $y'$ appears anywhere — but the denominator $dy/dx$ has to be cleared before the equation counts as a polynomial. What is the derivative order?`,String.raw`Multiply the whole equation by $y'$: $y\,y' = x(y')^2 + k$. Read the power of $y'$ from the right-hand side.`,String.raw`$x(y')^2 - y\,y' + k = 0$ — the highest derivative is $y'$ and it appears squared, so degree $2$.`],solution:String.raw`**Order.** The only derivative in the equation is $y' = \dfrac{dy}{dx}$, so the order is $1$.

**Degree.** The derivative sits in a denominator, so first clear it. Multiply by $y'$:
$$y\,y' = x(y')^2 + k \quad\Longrightarrow\quad x(y')^2 - y\,y' + k = 0 .$$
This is now a polynomial in $y'$, with $y'$ appearing to powers $2$ and $1$.

The highest-order derivative is $y'$ and its highest power is $2$, so the **degree is $2$**.

This is a Clairaut-type equation ($y = xp + k/p$ with $p = y'$); its order $1$ / degree $2$ signature is the standard marker, and its singular solution is the envelope $y^2 = 4ax$.`},{id:"ord-06",topic:"order-and-degree",level:"main",prompt:String.raw`What is the order of the differential equation whose general solution is
      $$y = c_1e^{\,x+c_2} + c_3e^{\,x+c_4}?$$`,options:["$1$","$2$","$3$","$4$"],correct:0,hints:[String.raw`Order equals the number of **essential** arbitrary constants — not the number of $c$-symbols you can count.`,String.raw`Factor out the common $e^x$: $y = e^x\left(c_1e^{c_2} + c_3e^{c_4}\right)$. How many independent quantities remain inside the bracket?`,String.raw`Write $A = c_1e^{c_2}$ and $B = c_3e^{c_4}$. Then $y = Ae^x + Be^x$, which has just two constants — not four.`],solution:String.raw`The order of the differential equation that governs a family equals the number of **essential (independent)** arbitrary constants in that family.

Here four symbols appear, but they do not survive as four parameters. Factor out $e^x$:
$$y = e^x\left(c_1e^{c_2} + c_3e^{c_4}\right) = Ae^x + Be^x,$$
where
$$A = c_1e^{c_2}, \qquad B = c_3e^{c_4}.$$
The four symbols have collapsed to exactly two essential constants, so $A$ and $B$ are the only free parameters.

Differentiating twice gives $y' = Ae^x + Be^x = y$ and $y'' = y' = y$, and eliminating $A, B$ from $y = Ae^x+Be^x$ and $y' = Ae^x+Be^x$ forces $y' = y$. The equation $y' - y = 0$ has order $1$.

So the **order is $1$** (degree $1$), not $4$.`},{id:"ord-07",topic:"order-and-degree",level:"main",prompt:String.raw`What is the order of the differential equation whose general solution is
      $$y = c_1\ln(c_2x)?$$`,options:["$1$","$2$","$3$","$4$"],correct:1,hints:[String.raw`Two constants are written, but before you count them check whether they are *independent*.`,String.raw`$\ln(c_2x) = \ln c_2 + \ln x$, so $y = c_1\ln x + c_1\ln c_2$. One constant survives inside $c_1\ln c_2$.`,String.raw`With $A = c_1$ and $B = c_1\ln c_2$ the family is $y = A\ln x + B$: two genuinely independent parameters.`],solution:String.raw`Expand the logarithm:
$$y = c_1(\ln c_2 + \ln x) = c_1\ln x + c_1\ln c_2 .$$
Now rename the surviving parameters:
$$A = c_1, \qquad B = c_1\ln c_2 .$$
These are two **independent** constants: $c_2 = e^{B/A}$ can be recovered from them (for $A \neq 0$), and $c_1 = A$. So nothing has been lost — the family really is two-dimensional, just written with two symbols.

Two essential constants ⟹ **order $= 2$**.

Check by elimination. Differentiate twice:
$$y' = \frac{c_1}{x}, \qquad y'' = -\frac{c_1}{x^2} = -\frac{y'}{x},$$
so $xy'' + y' = 0$, an equation of order $2$ — matching the parameter count.

(The contrast with $y = c_1e^{x+c_2}$ is the point: there $c_1e^{c_2}$ merged into a *single* constant and the order dropped to $1$, whereas here $c_1$ and $c_1\ln c_2$ stay independent.)`},{id:"ord-08",topic:"order-and-degree",level:"advanced",prompt:String.raw`What is the order and degree of the differential equation whose general solution is
      $$y = (c_1+c_2)\cos(x+c_3) - c_4e^{\,x+c_5}?$$`,options:["order $3$, degree $1$","order $5$, degree $1$","order $3$, degree $3$","order $5$, degree $3$"],correct:0,hints:[String.raw`Five $c$-symbols are written. Merge the ones that combine algebraically or through an exponential before you count.`,String.raw`$c_1+c_2$ is a *single* parameter, and $c_4e^{c_5}$ is a single parameter. So which three survive?`,String.raw`With $A = c_1+c_2$, $C = c_3$, $B = c_4e^{c_5}$ the family is $y = A\cos(x+C) - Be^x$: three parameters ⟹ order $3$, and the eliminant $y'''-y''+y'-y=0$ is linear in $y'''$ ⟹ degree $1$.`],solution:String.raw`Count **essential** constants, then read the degree off the derivative.

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

Order $3$, degree $1$ — despite five constants being written down.`},{id:"ord-09",topic:"order-and-degree",level:"advanced",prompt:String.raw`Find the order and degree of
      $$\left(\frac{d^3y}{dx^3}\right)^2 + \ln\left(\frac{d^2y}{dx^2}\right) = 0.$$`,options:["order $3$, degree $2$","order $3$, degree **not defined**","order $2$, degree $3$","order $2$, degree **not defined**"],correct:1,hints:[String.raw`Order is easy — find the highest derivative. For the degree you must clear the logarithm, and see whether clearing it also frees $y'''$.`,String.raw`$\ln(y'') = -(y''')^2$ exponentiates to $y'' = e^{-(y''')^2}$. That is *not* a polynomial in $y'''$ — the derivative is still trapped in an exponential.`,String.raw`The square on $y'''$ looks like it should set the degree, but you must first remove the logarithm, and doing so re-traps $y'''$. Hence degree undefined.`],solution:String.raw`**Order.** The highest derivative present is $y'''$, so **order $= 3$**.

**Degree.** You cannot read a degree straight off the $(y''')^2$ term, because the equation is not yet a polynomial in the derivatives. Try to clear the logarithm: isolate it and exponentiate,
$$\ln(y'') = -(y''')^2 \quad\Longrightarrow\quad y'' = e^{-(y''')^2}.$$
That is not a polynomial in $y'''$ — the highest derivative is now trapped inside an exponential, whose series $-(y''')^2 + \frac{(y''')^4}{2!} - \cdots$ has unbounded powers of $y'''$. And you cannot clear both at once: no algebraic identity frees $y'''$ from the exponential while keeping $y''$ linear.

Since the equation cannot be written as a polynomial in $y', y'', y'''$, the **degree is not defined**.

The moral: "power $2$ of the highest derivative" only sets the degree *after* the equation is genuinely polynomial. Here it is not.`},{id:"ord-10",topic:"order-and-degree",level:"advanced",prompt:String.raw`Find the order and degree of
      $$\ln\left(\frac{d^2y}{dx^2}\right) = ax + by,$$`,answer:"order $2$, degree $1$",accept:["order 2, degree 1","order 2 and degree 1","2, 1","order=2, degree=1"],hints:[String.raw`The logarithm has $y''$ inside it, so nothing can be read off until you exponentiate. What does $\ln(y'') = ax+by$ become?`,String.raw`$y'' = e^{ax+by}$. The derivative is now out of the transcendental function and sits alone on the left.`,String.raw`Highest derivative $y''$ ⟹ order $2$; it appears to the first power ⟹ degree $1$. (Note the contrast with $\sin(y'')$, where no exponentiation frees the derivative.)`],solution:String.raw`Exponentiate both sides:
$$\frac{d^2y}{dx^2} = e^{ax+by}.$$
Now the derivative is completely free of the transcendental function and stands alone on the left, while the right-hand side depends only on $x$ and $y$. The equation is a polynomial in the derivatives.

- Highest derivative present: $y''$ ⟹ **order $= 2$**.
- Power of $y''$: $1$ ⟹ **degree $= 1$**.

This is the key discrimination the chapter is built on. $\ln(y'') = ax+by$ has a *defined* degree because exponentiating frees $y''$, whereas $y'' + \sin(y') = 0$ has an *undefined* degree because $y'$ stays trapped in the sine. Undefined degree means only "cannot be made polynomial" — not "there is a logarithm somewhere".`},{id:"frm-01",topic:"formation",level:"basic",prompt:String.raw`Find the differential equation of the family of all circles which touch the $x$-axis at the origin, i.e.
      $$x^2 + (y-a)^2 = a^2 \iff x^2 + y^2 = 2ay,$$
      where $a$ is the single arbitrary parameter.`,options:[String.raw`$(y^2-x^2)\dfrac{dy}{dx} + 2xy = 0$`,String.raw`$(x^2-y^2)\dfrac{dy}{dx} + 2xy = 0$`,String.raw`$(y^2-x^2)\dfrac{dy}{dx} - 2xy = 0$`,String.raw`$(x^2+y^2)\dfrac{dy}{dx} = 2xy$`],correct:0,hints:[String.raw`One parameter means differentiate **once**, then eliminate $a$ using the original equation and its derivative together.`,String.raw`Solve for the parameter first: $\dfrac{x^2+y^2}{y} = 2a$. Now differentiate that with respect to $x$ — but do not throw away the $y'$ terms from the denominator.`,String.raw`$\dfrac{y(2x+2yy') - (x^2+y^2)y'}{y^2} = 0 \Rightarrow 2xy + y^2y' - x^2y' = 0$, and the $y^2y'$ combines with $-x^2y'$.`],solution:String.raw`There is **one** parameter $a$, so differentiate once and eliminate it.

**Step 1 — isolate the parameter.**
$$x^2+y^2 = 2ay \quad\Longrightarrow\quad \frac{x^2+y^2}{y} = 2a .$$

**Step 2 — differentiate.**
$$\frac{y(2x + 2yy') - (x^2+y^2)y'}{y^2} = 0 .$$

**Step 3 — clear and simplify the numerator.**
$$2xy + 2y^2y' - x^2y' - y^2y' = 0 \quad\Longrightarrow\quad 2xy + y^2y' - x^2y' = 0 .$$

**Step 4 — group.**
$$\boxed{(y^2-x^2)\frac{dy}{dx} + 2xy = 0}.$$

The parameter $a$ is gone, and the resulting equation is first order — as it must be, since the family had one parameter.

*Verification:* with $y = a \pm \sqrt{a^2-x^2}$, so $y' = \mp \frac{x}{\sqrt{a^2-x^2}}$ and $y^2-x^2 = 2a(a\pm\sqrt{\cdot}) \mp \ldots$, direct symbolic substitution reduces $(y^2-x^2)y' + 2xy$ to $0$ identically for every $a$ and both branches.`},{id:"frm-02",topic:"formation",level:"basic",prompt:String.raw`Find the differential equation of the family of all non-vertical straight lines
      $$y = mx + c,$$
      where $m$ and $c$ are arbitrary constants.`,answer:String.raw`$y'' = 0$`,accept:["y'' = 0","d^2y/dx^2 = 0","d²y/dx² = 0"],hints:[String.raw`Count the parameters first: $m$ and $c$ are both arbitrary, so how many times must you differentiate?`,String.raw`$y' = m$ kills $m$; $y'' = 0$ kills $c$. The straightness of a line is expressed by its vanishing second derivative.`,String.raw`Differentiate twice: $y' = m$, then $y'' = 0$. That relation has no constants left in it.`],solution:String.raw`The family $y = mx+c$ has **two** essential parameters, $m$ and $c$, so the differential equation must be of order $2$.

Differentiate once:
$$y' = m \quad\Longrightarrow\quad m = y'.$$
Differentiate a second time:
$$y'' = 0 .$$

Both $m$ and $c$ have disappeared without ever needing to be substituted back — the two differentiations have produced exactly the two equations needed to eliminate them. Hence the differential equation of the family of all straight lines is

$$y'' = 0,$$

which has order $2$ and degree $1$. Geometrically this is exactly "curvature is zero everywhere".

(Vertical lines are missed only because they cannot be written as $y = f(x)$; that is why the question says *non-vertical*.)`},{id:"frm-03",topic:"formation",level:"basic",prompt:String.raw`Form the differential equation of the one-parameter family
      $$y = ce^{2x}.$$
      Give the equation in the form $F(x,y,y') = 0$.`,answer:String.raw`$y' - 2y = 0$`,accept:["y' - 2y = 0","y' = 2y","dy/dx = 2y","y' - 2y=0","y'=2y"],hints:[String.raw`One parameter $c$ means order $1$: differentiate exactly once.`,String.raw`$\dfrac{dy}{dx} = 2ce^{2x}$. Now compare this with the original equation — $y = ce^{2x}$.`,String.raw`The two right-hand sides differ by a factor $2$, so $y' = 2y$, i.e. $y' - 2y = 0$.`],solution:String.raw`One parameter $c$ ⟹ differentiate once.

$$y = ce^{2x} \quad\Longrightarrow\quad \frac{dy}{dx} = 2ce^{2x}.$$

Now eliminate $c$ without substituting it explicitly. Since $y = ce^{2x}$, the derivative equation reads
$$y' = 2\,(ce^{2x}) = 2y .$$

So the differential equation of the family is

$$y' - 2y = 0,$$

first order and first degree — as it must be for a one-parameter family.

*Verification:* for $y = ce^{2x}$, $y' - 2y = 2ce^{2x} - 2ce^{2x} = 0$ identically for every $c$.`},{id:"frm-04",topic:"formation",level:"main",prompt:String.raw`Find the differential equation of the family of all parabolas whose axis is parallel to the $x$-axis:
      $$(y-k)^2 = 4a(x-h),$$
      with $h, k, a$ three arbitrary parameters.`,options:[String.raw`$3(y'')^2 - y'\,y''' = 0$`,String.raw`$3(y''')^2 - y''\,y^{(4)} = 0$`,String.raw`$(y'')^3 - (y''')^2 = 0$`,String.raw`$2(y'')^3 - 3y'y''y''' = 0$`],correct:0,hints:[String.raw`Three parameters means differentiate three times. But do **not** try to expand $(y-k)^2$ first — differentiate in the factored form where $y-k$ appears as a single block.`,String.raw`First derivative: $(y-k)y' = 2a$, so $y-k = 2a/y'$. Second: $(y')^2 + (y-k)y'' = 0$. Notice $a$ is already gone — you only need $y-k$.`,String.raw`Substitute $y-k = -\dfrac{(y')^2}{y''}$ into the second derivative relation and clear the $y''$: $3y'y'' - \dfrac{(y')^2y'''}{y''} = 0$.`],solution:String.raw`Three parameters $(h,k,a)$ ⟹ differentiate three times. Keep $(y-k)$ unexpanded so it behaves as one block.

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

*Verification:* writing $y = k \pm 2\sqrt{a(x-h)}$ and differentiating through to $y'''$, the residual $3(y'')^2 - y'y'''$ simplifies to exactly $0$ for several exact parameter triples, e.g. $(a,k,h) = (1, \tfrac12, \tfrac15)$ and $(2,-1,\tfrac1{10})$, on both branches.`},{id:"frm-05",topic:"formation",level:"main",prompt:String.raw`The differential equation of the family of curves
      $$x^2 = 4b(y + b), \quad b \in \mathbb{R} \text{ arbitrary},$$
      is:`,options:[String.raw`$x(y')^2 = x - 2yy'$`,String.raw`$x\,y'' = y'$`,String.raw`$x(y')^2 = x + 2yy'$`,String.raw`$x(y')^2 = 2yy' - x$`],correct:2,source:"JEE Main 2020",hints:[String.raw`There is one parameter $b$, so differentiate once. Key convention: $b$ is a *constant of the family*, so $b' = 0$ when you differentiate.`,String.raw`$x^2 = 4by + 4b^2 \Rightarrow 2x = 4by' + 0$, hence $b = \dfrac{x}{2y'}$.`,String.raw`Put $b = \dfrac{x}{2y'}$ back into $x^2 = 4by + 4b^2$, multiply by $(y')^2$ and divide by $x$: you land on $x(y')^2 = x + 2yy'$.`],solution:String.raw`There is **one** parameter $b$, so differentiate once.

**Step 1 — differentiate.** This is a family of parabolas with axis along the $y$-axis. Since $b$ is an arbitrary *constant* of the family, it has derivative $0$:
$$2x = 4b\,y' + 8b\cdot 0 = 4b\,y'
\quad\Longrightarrow\quad
b = \frac{x}{2y'} .$$

**Step 2 — substitute back** into $x^2 = 4by + 4b^2$:
$$x^2 = 4\left(\frac{x}{2y'}\right)y + 4\left(\frac{x}{2y'}\right)^2 = \frac{2xy}{y'} + \frac{x^2}{(y')^2}.$$

**Step 4 — multiply by $(y')^2$ and divide by $x \neq 0$:**
$$x^2(y')^2 = 2xy\,y' + x^2 \quad\Longrightarrow\quad \boxed{x(y')^2 = x + 2yy'} .$$

Hence option **(3)**.

*Verification:* with $y = \dfrac{x^2}{4b} - b$ we get $y' = \dfrac{x}{2b}$, so $x(y')^2 = \dfrac{x^3}{4b^2}$ and $x + 2yy' = x + 2\left(\frac{x^2}{4b}-b\right)\frac{x}{2b} = x + \frac{x^3}{4b^2} - x = \dfrac{x^3}{4b^2}$. Identical, for every $b$.`},{id:"frm-06",topic:"formation",level:"main",prompt:String.raw`Form the differential equation of the family of confocal, coaxial parabolas
      $$y^2 = 4a(x+a),$$
      where $a$ is the single arbitrary parameter. (This family is self-orthogonal — check that in your solution.)`,answer:String.raw`$y(y')^2 + 2xy' - y = 0$`,accept:["y(y')^2 + 2xy' - y = 0","y(y')2+2xy'-y=0","2xy' + y(y')^2 = y","y(y')^2 + 2xy' - y =0"],hints:[String.raw`One parameter $a$ ⟹ differentiate once, and the derivative equation gives $a$ in terms of $x, y, y'$ immediately. Do that first.`,String.raw`$2yy' = 4a \Rightarrow a = \frac{yy'}{2}$. Put this back into $y^2 = 4a(x+a)$ — note the $x+a$ also contains $a$, so $a$ appears twice.`,String.raw`$y^2 = 4\cdot\frac{yy'}{2}\left(x + \frac{yy'}{2}\right) = 2xyy' + y^2(y')^2$. Divide by $y$.`],solution:String.raw`One parameter $a$ ⟹ differentiate once and eliminate $a$.

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

*Verification:* with $y = \pm\sqrt{4a(x+a)}$, symbolic substitution of $y'$ into $y(y')^2 + 2xy' - y$ simplifies to exactly $0$ for $a = 1, 2, \tfrac25$ on both branches.`},{id:"frm-07",topic:"formation",level:"advanced",prompt:String.raw`The differential equation of the family of curves
      $$c(y+c)^2 = x^3,$$
      where $c$ is an arbitrary non-zero constant, can be written in the form
      $$12y\,(y')^2 + ax = b\,x\,(y')^3 .$$
      Find $a + b$.`,options:["$33$","$35$","$37$","$43$"],correct:1,hints:[String.raw`One parameter $c$ ⟹ differentiate once: $2c(y+c)y' = 3x^2$. Then **divide the derivative equation by the original** — that kills $c$ and $(y+c)$ at the same time.`,String.raw`$\dfrac{2c(y+c)y'}{c(y+c)^2} = \dfrac{3x^2}{x^3} \Rightarrow \dfrac{2y'}{y+c} = \dfrac{3}{x} \Rightarrow y + c = \dfrac{2xy'}{3}$.`,String.raw`Now $c = y + c - y = \dfrac{2xy'}{3} - y$. Substitute **both** of these into the original equation and clear the denominators carefully.`],solution:String.raw`**Step 1 — differentiate once.**
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

*Verification:* with $y = \dfrac{x^{3/2}}{\sqrt{c}} - c$ one gets $y' = \dfrac{3\sqrt{x}}{2\sqrt{c}}$, and the residual $12y(y')^2 + 27x - 8x(y')^3$ simplifies to exactly $0$ for $c = 1,\, 2,\, \tfrac13$ on both branches.`},{id:"frm-08",topic:"formation",level:"advanced",prompt:String.raw`Find the differential equation of the family of all circles which pass through the origin and whose centre lies on the line $y = x$.`,options:[String.raw`$(x^2-y^2-2xy)\dfrac{dy}{dx} = x^2 - y^2 + 2xy$`,String.raw`$(x^2+y^2)\dfrac{dy}{dx} = x^2 + y^2 + 2xy$`,String.raw`$(x^2-y^2+2xy)\dfrac{dy}{dx} = x^2 - y^2 - 2xy$`,String.raw`$(x^2-y^2-2xy)\dfrac{dy}{dx} = -(x^2-y^2-2xy)$`],correct:0,hints:[String.raw`Write the general circle through the origin as $x^2+y^2+2gx+2fy = 0$. Its centre is $(-g, -f)$; impose the condition that this lies on $y = x$.`,String.raw`$(-g) = (-f) \Rightarrow g = f$. So the family is $x^2+y^2+2g(x+y)=0$ — one parameter, differentiate once.`,String.raw`$2x + 2yy' + 2g(1+y') = 0 \Rightarrow g = -\dfrac{x+yy'}{1+y'}$. Substitute into the original and multiply by $(1+y')$.`],solution:String.raw`**Step 1 — write the family.** A circle through the origin has no constant term:
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

*Sanity check on the sign:* compare the easy special case "centre on the $x$-axis", $x^2+y^2=2cx$, which is the same computation with $f=0$; it reproduces $\dfrac{dy}{dx} = \dfrac{y^2-x^2}{2xy}$ from the tangent-bisector problem.`}],n=[{id:"sep-01",topic:"variable-separable",level:"basic",prompt:String.raw`Solve $\frac{dy}{dx} = (1+x)(1+y)$.`,answer:String.raw`y = Ae^{x + x^2/2} - 1`,accept:["y = Ae^(x + x^2/2) - 1 || y=Ae^(x+x^2/2)-1 || y = A e^(x + x^2/2) - 1 || y=A*e^(x + x^2/2)-1","y + 1 = Ae^(x + x^2/2) || y+1=Ae^(x+x^2/2)","ln|1+y| = x + x^2/2 + C || ln|1+y|=x+x^2/2+C"],hints:[String.raw`Factor the right side as $f(x)\,g(y)$. If you can move every $y$-part to one side and every $x$-part to the other, the variables have separated.`,String.raw`You get $\frac{dy}{1+y} = (1+x)\,dx$. Integrate both sides and add $C$ at the moment you integrate — not afterwards.`,String.raw`$\ln|1+y| = x + \frac{x^2}{2} + C$, so $1+y = A e^{x + x^2/2}$. Replace $\pm e^C$ by a single arbitrary constant $A$ and solve for $y$.`],solution:String.raw`The right side factors: $f(x) = 1+x$, $g(y) = 1+y$.

Divide both sides by $1+y$:
$$\frac{dy}{1+y} = (1+x)\,dx$$

Integrate, adding $C$ at this moment:
$$\ln|1+y| = \int (1+x)\,dx = x + \frac{x^2}{2} + C$$

Exponentiate and fold the sign into the constant ($A = \pm e^C$, any non-zero constant):
$$1+y = A e^{x + x^2/2} \quad\Longrightarrow\quad \boxed{y = Ae^{x+x^2/2} - 1}$$

**Check.** $\dfrac{d}{dx}\left(Ae^{x+x^2/2}-1\right) = Ae^{x+x^2/2}(1+x) = (1+x)(1+y)$, which is the original right side. Good.

**Caveat.** Dividing by $1+y$ loses the constant solution $y = -1$; substituting it back confirms it also satisfies the original equation.`},{id:"sep-02",topic:"variable-separable",level:"basic",prompt:String.raw`Solve $\frac{dy}{dx} = \frac{1}{x + 2y + 1}$.`,answer:String.raw`2y + 1 - 2\ln|x+2y+3| = C`,accept:["2y+1-2ln|x+2y+3|=C || 2y + 1 - 2ln|x+2y+3| = C || 2y+1-2ln(x+2y+3)=C","x+2y+1-2ln|x+2y+3|=x+C"],hints:[String.raw`The right side mixes $x$ and $y$ inside one linear expression, so you cannot separate yet. Look at the combination $x + 2y$ — that is the whole story.`,String.raw`Put $u = x + 2y + 1$ and use the chain rule: $\frac{du}{dx} = 1 + 2\frac{dy}{dx} = 1 + \frac{2}{u}$. That equation separates in $u$ and $x$.`,String.raw`$\frac{u}{u+2}\,du = dx$ integrates to $u - 2\ln|u+2| = x + C$. Substitute $u = x+2y+1$ back, and the lone $x$ on the right cancels the one on the left.`],solution:String.raw`This is the "$f(ax+by+c)$" pattern. Put
$$u = x + 2y + 1$$

Chain rule (do not forget the product rule!):
$$\frac{du}{dx} = 1 + 2\frac{dy}{dx} = 1 + \frac{2}{u} = \frac{u+2}{u}$$

Separate:
$$\frac{u}{u+2}\,du = dx$$

Integrate. Split $u = (u+2) - 2$:
$$\int\left(1 - \frac{2}{u+2}\right)du = u - 2\ln|u+2| = x + C$$

Back-substitute $u = x+2y+1$ (so $u+2 = x+2y+3$):
$$x + 2y + 1 - 2\ln|x+2y+3| = x + C$$
which simplifies to
$$\boxed{2y + 1 - 2\ln|x+2y+3| = C}$$

**Check.** Differentiating the implicit relation gives
$$2y' - \frac{2(1+2y')}{x+2y+3} = 0 \;\Longrightarrow\; y'(x+2y+3) = 1 + 2y' \;\Longrightarrow\; y'(x+2y+1) = 1,$$
so $y' = \dfrac{1}{x+2y+1}$. Exactly the original equation.`},{id:"sep-03",topic:"variable-separable",level:"basic",prompt:String.raw`The population $p$ of a colony satisfies $\frac{dp}{dt} = \frac{1}{2}p - 450$ with $p(0) = 850$. Find the time at which the population first becomes zero.`,answer:String.raw`t = 2\ln 18`,accept:["t = 2ln18 || t=2ln18 || 2ln18 || t = 2 ln 18 || t = ln324"],hints:[String.raw`Look at $\frac{dp}{dt} = \frac{1}{2}p - 450$: is there any term that mixes $p$ and $t$? If not, the variables are already separated.`,String.raw`Write the right side as $\frac{1}{2}(p - 900)$ so that $p$ sits alone in a difference. That gives $\frac{dp}{p-900} = \frac{1}{2}dt$.`,String.raw`$\ln|p-900| = \frac{t}{2} + C$, and $p(0) = 850$ gives $C = \ln 50$. So $p(t) = 900 - 50e^{t/2}$. Now set $p = 0$ and solve for $t$.`],solution:String.raw`Nothing mixes $p$ and $t$, so separate immediately. Factor the right side:
$$\frac{dp}{dt} = \frac{1}{2}(p - 900) \;\Longrightarrow\; \frac{dp}{p-900} = \frac{1}{2}dt$$

Integrate:
$$\ln|p - 900| = \frac{t}{2} + C$$

Use $p(0) = 850$: $\ln 50 = C$, so $|p-900| = 50e^{t/2}$. Since the population starts below $900$ and $p' < 0$, take $p - 900 = -50e^{t/2}$:
$$p(t) = 900 - 50e^{t/2}$$

**Check.** $p' = -25e^{t/2}$ and $\frac{1}{2}p - 450 = 450 - 25e^{t/2} - 450 = -25e^{t/2}$. Also $p(0) = 900 - 50 = 850$. Good.

Population hits zero when
$$900 = 50e^{t/2} \;\Longrightarrow\; e^{t/2} = 18 \;\Longrightarrow\; \boxed{t = 2\ln 18}$$
(equivalently $t = \ln 324 \approx 5.78$ time units).`},{id:"sep-04",topic:"variable-separable",level:"main",prompt:String.raw`The general solution of $(1+x^2)(1+y)\,dy + (1+y^2)(1+x)\,dx = 0$ is:`,options:[String.raw`$\arctan x + \frac{1}{2}\ln(1+x^2) + \arctan y + \frac{1}{2}\ln(1+y^2) = C$`,String.raw`$\frac{1}{2}\ln(1+x^2) + \frac{1}{2}\ln(1+y^2) + \frac{xy}{2} = C$`,String.raw`$\arctan x + \arctan y + \ln(1+x^2) + \ln(1+y^2) = C$`,String.raw`$\frac{1}{2}\ln\left[\frac{1+x^2}{1+y^2}\right] = C$`],correct:0,hints:[String.raw`Both $dx$ and $dy$ carry a product $(1+x^2)(1+y^2)$-type factor. Can you divide the whole equation by one product so that each term contains only one variable?`,String.raw`Divide by $(1+x^2)(1+y^2)$: you get $\frac{1+y}{1+y^2}dy + \frac{1+x}{1+x^2}dx = 0$. Now each numerator must be split into two pieces over its denominator.`,String.raw`$\frac{1}{1+u^2} + \frac{1}{2}\frac{2u}{1+u^2}$ gives $\arctan u + \frac{1}{2}\ln(1+u^2)$. Apply that to both $x$ and $y$.`],solution:String.raw`Divide the whole equation by $(1+x^2)(1+y^2)$ so that each term holds a single variable:
$$\frac{1+y}{1+y^2}\,dy + \frac{1+x}{1+x^2}\,dx = 0$$

Split each fraction over its denominator:
$$\left[\frac{1}{1+y^2} + \frac{1}{2}\frac{2y}{1+y^2}\right]dy + \left[\frac{1}{1+x^2} + \frac{1}{2}\frac{2x}{1+x^2}\right]dx = 0$$

Integrate term by term (each bracket is one $\arctan$ plus one $\frac{1}{2}\ln$):
$$\arctan y + \frac{1}{2}\ln(1+y^2) + \arctan x + \frac{1}{2}\ln(1+x^2) = C$$

**Check.** Differentiating:
$$\frac{1+x}{1+x^2} + \frac{(1+y)y'}{1+y^2} = 0 \;\Longrightarrow\; y' = -\frac{(1+y^2)(1+x)}{(1+x^2)(1+y)}$$
which is precisely the original equation $\frac{dy}{dx} = -\dfrac{(1+y^2)(1+x)}{(1+x^2)(1+y)}$. Good.

(One may also combine the two arctangents using $\arctan x + \arctan y = \arctan\frac{x+y}{1-xy}$, but the four-term form above is the safer answer.)`},{id:"sep-05",topic:"variable-separable",level:"main",prompt:String.raw`The solution of $\frac{dy}{dx} = \sin^2(x + 3y) + 5$ is:`,options:[String.raw`$\frac{1}{4\sqrt{19}}\arctan\left(\frac{\sqrt{19}\tan(x+3y)}{4}\right) = x + C$`,String.raw`$\frac{1}{4\sqrt{19}}\arctan\left(\frac{\sqrt{19}}{4\tan(x+3y)}\right) = x + C$`,String.raw`$\frac{1}{2\sqrt{19}}\arctan\left(\frac{\sqrt{19}}{2}\tan(x+3y)\right) = x + C$`,String.raw`$\frac{1}{4\sqrt{19}}\arctan\left(\frac{4}{\sqrt{19}}\tan(x+3y)\right) = -x + C$`],correct:0,hints:[String.raw`The right side depends on $x$ and $y$ only through $x + 3y$. Substitute that whole combination as a single variable.`,String.raw`With $u = x+3y$ you get $\frac{du}{dx} = 1 + 3y'$, so $\frac{du}{dx} = 3\sin^2 u + 16$. That is separable — but the integrand has $\sin^2$ in it, so divide top and bottom by $\cos^2 u$ and put $t = \tan u$.`,String.raw`$\frac{1}{19}\int\frac{dt}{t^2 + \left(\frac{4}{\sqrt{19}}\right)^2}$ gives $\frac{1}{4\sqrt{19}}\arctan\left(\frac{\sqrt{19}\tan u}{4}\right)$. Put $u = x+3y$ back.`],solution:String.raw`Let $u = x + 3y$. Then $\frac{du}{dx} = 1 + 3\frac{dy}{dx}$, so $\frac{dy}{dx} = \frac{1}{3}\left(\frac{du}{dx} - 1\right)$.

Substitute:
$$\frac{1}{3}\left(\frac{du}{dx} - 1\right) = \sin^2 u + 5 \;\Longrightarrow\; \frac{du}{dx} = 3\sin^2 u + 16$$

Separate:
$$\int \frac{du}{3\sin^2 u + 16} = \int dx = x + C$$

Divide numerator and denominator by $\cos^2 u$ (then multiply the numerator by $\sec^2 u\,du$):
$$\int \frac{\sec^2 u\,du}{3\tan^2 u + 16(1+\tan^2 u)} = \int\frac{\sec^2 u\,du}{19\tan^2 u + 16}$$

Put $t = \tan u$, $dt = \sec^2 u\,du$:
$$\frac{1}{19}\int \frac{dt}{t^2 + \frac{16}{19}} = \frac{1}{19}\cdot\frac{\sqrt{19}}{4}\arctan\left(\frac{\sqrt{19}\,t}{4}\right) = \frac{1}{4\sqrt{19}}\arctan\left(\frac{\sqrt{19}\tan u}{4}\right)$$

So
$$\boxed{\frac{1}{4\sqrt{19}}\arctan\left(\frac{\sqrt{19}\tan(x+3y)}{4}\right) = x + C}$$

**Check.** $\dfrac{d}{du}\left[\frac{1}{4\sqrt{19}}\arctan\frac{\sqrt{19}\tan u}{4}\right] = \dfrac{1}{3\sin^2 u + 16}$, exactly the reciprocal of $\frac{du}{dx}$. Good.`},{id:"sep-06",topic:"variable-separable",level:"main",prompt:String.raw`If $e^y\left(\frac{dy}{dx} - 1\right) = e^x$ and $y(0) = 0$, then $y(1)$ is equal to:`,options:[String.raw`$\ln 2$`,String.raw`$1 + \ln 2$`,String.raw`$2 + \ln 2$`,String.raw`$\ln 2 - 1$`],correct:1,hints:[String.raw`Rewrite it as $\frac{dy}{dx} - 1 = e^{x-y}$. The left side is literally the derivative of $y - x$, so treat $y-x$ as one variable.`,String.raw`Put $u = y - x$. Then $u' = y' - 1 = e^{-u}$, which separates immediately: $e^u\,du = dx$.`,String.raw`$e^u = x + C$. With $u(0) = y(0) - 0 = 0$ you get $C = 1$, so $y = x + \ln(x+1)$. Plug in $x = 1$.`],solution:String.raw`Write the equation as
$$\frac{dy}{dx} - 1 = e^{x-y}$$

The left side is the derivative of $u = y - x$, so substitute $u = y - x$:
$$\frac{du}{dx} = e^{-u}$$

Separate:
$$e^u\,du = dx \;\Longrightarrow\; e^u = x + C$$

Initial condition: $u(0) = y(0) - 0 = 0$, so $1 = C$. Hence
$$e^{y-x} = x+1 \;\Longrightarrow\; \boxed{y = x + \ln(x+1)}$$

**Check.** $y' = 1 + \frac{1}{x+1}$, so $y' - 1 = \frac{1}{x+1} = e^{-(y-x)} = e^{x-y}$. Good.

Therefore
$$y(1) = 1 + \ln 2$$`,source:"JEE Main 2020"},{id:"sep-07",topic:"variable-separable",level:"main",prompt:String.raw`Let $y = y(x)$ satisfy $(x^2-4)\,dy - (y^2-3y)\,dx = 0$ for $x > 2$, with $y(4) = \frac{3}{2}$ and slope never zero. Then $y(10)$ equals:`,options:[String.raw`$\frac{3}{1+8^{1/4}}$`,String.raw`$\frac{3}{1-8^{1/4}}$`,String.raw`$\frac{3}{1+2\sqrt{2}}$`,String.raw`$\frac{3}{1-2\sqrt{2}}$`],correct:0,hints:[String.raw`Write it as $\frac{dy}{dx} = \frac{y(y-3)}{x^2-4}$. Nothing mixes the variables, so separate — but you will need partial fractions on both sides.`,String.raw`$\frac{1}{y(y-3)} = \frac{1}{3}\left(\frac{1}{y-3} - \frac{1}{y}\right)$ and $\frac{1}{x^2-4} = \frac{1}{4}\left(\frac{1}{x-2} + \frac{1}{x+2}\right)$. Integrate to get $\frac{1}{3}\ln\left|\frac{y-3}{y}\right| = \frac{1}{4}\ln\left|\frac{x-2}{x+2}\right| + C$.`,String.raw`Use $y(4) = \frac{3}{2}$ to pin the constant: it gives $C = \frac{1}{4}\ln 3$. At $x = 10$ the right side becomes $\frac{3}{4}\ln 2$, so $\frac{3-y}{y} = 2^{3/4} = 8^{1/4}$.`],solution:String.raw`Rearrange:
$$\frac{dy}{dx} = \frac{y(y-3)}{x^2-4}$$

Separate:
$$\frac{dy}{y(y-3)} = \frac{dx}{x^2-4}$$

Partial fractions on both sides:
$$\frac{1}{y(y-3)} = \frac{1}{3}\left(\frac{1}{y-3} - \frac{1}{y}\right), \qquad \frac{1}{x^2-4} = \frac{1}{4}\left(\frac{1}{x-2} + \frac{1}{x+2}\right)$$

Integrate:
$$\frac{1}{3}\ln\left|\frac{y-3}{y}\right| = \frac{1}{4}\ln\left|\frac{x-2}{x+2}\right| + C$$

Apply $y(4) = \frac{3}{2}$: the left side is $\frac{1}{3}\ln 1 = 0$, while the right side is $\frac{1}{4}\ln\frac{1}{3} + C$. Hence $C = \frac{1}{4}\ln 3$.

So
$$\frac{1}{3}\ln\left|\frac{y-3}{y}\right| = \frac{1}{4}\ln\left|\frac{3(x-2)}{x+2}\right|$$

The solution stays in $0 < y < 3$ (since $y' = \frac{y(y-3)}{x^2-4} < 0$ there), so $\frac{3-y}{y} > 0$ and the absolute values drop out. Multiplying the equation by $3$ and exponentiating:
$$\frac{3-y}{y} = \left(\frac{3(x-2)}{x+2}\right)^{3/4}$$

At $x = 10$: $\frac{3(x-2)}{x+2} = \frac{24}{12} = 2$, so
$$\frac{3-y}{y} = 2^{3/4} = 8^{1/4} \;\Longrightarrow\; 3 = y\left(1 + 8^{1/4}\right)$$

$$\boxed{y(10) = \frac{3}{1 + 8^{1/4}}} \approx 1.119$$

**Check.** Differentiating $\frac{1}{3}\ln\frac{3-y}{y} - \frac{1}{4}\ln\frac{3(x-2)}{x+2} = 0$ reproduces $y' = \frac{y(y-3)}{x^2-4}$. Good.`,source:"JEE Main 2024"},{id:"sep-08",topic:"variable-separable",level:"main",prompt:String.raw`The solution of the differential equation $\frac{dy}{dx} = (x-y)^2$, when $y(1) = 1$, is:`,options:[String.raw`$\log_e\left|\frac{1+x-y}{1-x+y}\right| = x+y-2$`,String.raw`$\log_e\left|\frac{2-x}{2-y}\right| = x-y$`,String.raw`$\log_e\left|\frac{2-y}{2-x}\right| = 2(y-1)$`,String.raw`$-\log_e\left|\frac{1-x+y}{1+x-y}\right| = 2(x-1)$`],correct:3,hints:[String.raw`The right side is the square of $x - y$, and the derivative of $x-y$ is $1 - y'$. That extra $1$ is the clue: substitute $z = x - y$.`,String.raw`$z' = 1 - y' = 1 - z^2$, which separates: $\frac{dz}{1-z^2} = dx$, and $\int\frac{dz}{1-z^2} = \frac{1}{2}\ln\left|\frac{1+z}{1-z}\right|$.`,String.raw`You get $\log_e\left|\frac{1+x-y}{1-x+y}\right| = 2x + C$. Then $y(1) = 1$ makes the logarithm $0$, so $C = -2$.`],solution:String.raw`Put $z = x - y$. Then $\frac{dz}{dx} = 1 - y' = 1 - (x-y)^2 = 1 - z^2$.

Separate and integrate:
$$\frac{dz}{1-z^2} = dx \;\Longrightarrow\; \frac{1}{2}\ln\left|\frac{1+z}{1-z}\right| = x + C$$

Substitute $z = x-y$ and multiply by $2$:
$$\ln\left|\frac{1+x-y}{1-x+y}\right| = 2x + C$$

Apply $y(1) = 1$: the log of $1$ is $0$, so $0 = 2 + C$, i.e. $C = -2$:
$$\ln\left|\frac{1+x-y}{1-x+y}\right| = 2(x-1)$$

Flipping the ratio (and remembering $\ln a = -\ln(1/a)$):
$$\boxed{-\log_e\left|\frac{1-x+y}{1+x-y}\right| = 2(x-1)}$$

**Check.** Differentiating $-\ln\frac{1-x+y}{1+x-y} = 2(x-1)$ gives back $\frac{dy}{dx} = (x-y)^2$. Good.`,source:"JEE Main 2019"},{id:"sep-09",topic:"variable-separable",level:"advanced",prompt:String.raw`Let $y(x)$ be the solution of $\frac{dy}{dx} = 1 + xe^{y-x}$ with $-\sqrt{2} < x < \sqrt{2}$ and $y(0) = 0$. Then the minimum value of $y(x)$ on this interval is:`,options:[String.raw`$(2-\sqrt{3}) - \log_e 2$`,String.raw`$(2+\sqrt{3}) + \log_e 2$`,String.raw`$(1+\sqrt{3}) - \log_e(\sqrt{3}-1)$`,String.raw`$(1-\sqrt{3}) - \log_e(\sqrt{3}-1)$`],correct:3,hints:[String.raw`The constant $1$ in $1 + xe^{y-x}$ is $\frac{d}{dx}(x)$. So the whole left side is $\frac{d}{dx}(y-x)$ — substitute $u = y - x$.`,String.raw`You get $u' = xe^{u}$, so $e^{-u}du = x\,dx$ and $-e^{-u} = \frac{x^2}{2} + C$. With $u(0) = 0$ this gives $y(x) = x - \ln\left(1 - \frac{x^2}{2}\right)$.`,String.raw`Now minimise: $y' = 0$ means $1 - \frac{x^2}{2} + x = 0$, i.e. $x = 1 \pm \sqrt{3}$. Only $x = 1-\sqrt3$ lies in $(-\sqrt2,\sqrt2)$. Evaluate $y$ there using $1 - \frac{x^2}{2} = \sqrt3 - 1$.`],solution:String.raw`Since $\frac{d}{dx}(x) = 1$, the natural variable is $u = y - x$:
$$\frac{du}{dx} = \frac{dy}{dx} - 1 = xe^{y-x} = xe^{u}$$

Separate:
$$e^{-u}du = x\,dx \;\Longrightarrow\; -e^{-u} = \frac{x^2}{2} + C$$

$u(0) = y(0) - 0 = 0$ gives $C = -1$, hence $e^{-u} = 1 - \frac{x^2}{2}$ and
$$u = -\ln\left(1 - \frac{x^2}{2}\right) \;\Longrightarrow\; \boxed{y(x) = x - \ln\left(1 - \frac{x^2}{2}\right)}$$

**Check.** $y' = 1 + \frac{x}{1-x^2/2}$, and $1 + xe^{y-x} = 1 + x\,e^{\ln(1-x^2/2)} = 1 + \frac{x}{1-x^2/2}$. Good.

Now minimise. On $(-\sqrt2,\sqrt2)$ the denominator $1-\frac{x^2}{2}$ is positive, so
$$y' = 0 \iff 1 + x - \frac{x^2}{2} = 0 \iff x = 1 \pm \sqrt{3}$$
Only $x = 1-\sqrt3 \approx -0.732$ is inside the interval (the other root exceeds $\sqrt2$). The numerator $1+x-x^2/2$ is negative for $x < 1-\sqrt3$ and positive for $x > 1-\sqrt3$, so $y$ decreases then increases — a genuine minimum.

At $x = 1-\sqrt3$:
$$1 - \frac{x^2}{2} = 1 - \frac{(1-\sqrt3)^2}{2} = 1 - (2-\sqrt3) = \sqrt3 - 1$$
so
$$\boxed{y_{\min} = (1-\sqrt3) - \log_e(\sqrt3-1)}$$`,source:"JEE Main 2022"},{id:"hom-01",topic:"homogeneous",level:"basic",prompt:String.raw`Solve $\frac{dy}{dx} = \frac{x^2+y^2}{2xy}$.`,answer:String.raw`x^2 - y^2 = Cx`,accept:["x^2 - y^2 = Cx || x^2-y^2=Cx || x2-y2=Cx || x^2 - y^2 = c x","x^2 = y^2 + Cx || x^2 = y^2 + cx"],hints:[String.raw`Check the degree of the numerator and denominator: both are degree $2$ in $(x,y)$. What does that tell you about $\frac{x^2+y^2}{2xy}$?`,String.raw`It is a function of $\frac{y}{x}$ alone, so put $y = vx$ and use $y' = v + x\frac{dv}{dx}$. Then isolate $x\frac{dv}{dx}$.`,String.raw`You get $\frac{2v}{1-v^2}dv = \frac{dx}{x}$, which integrates to $x(1-v^2) = K$. Replace $v = \frac{y}{x}$ and multiply through.`],solution:String.raw`$f(x,y) = \frac{x^2+y^2}{2xy}$ is homogeneous of degree $0$ (numerator and denominator both scale like $\lambda^2$), so it depends only on $\frac{y}{x}$.

Put $y = vx$, so $y' = v + x\frac{dv}{dx}$:
$$v + x\frac{dv}{dx} = \frac{x^2 + v^2x^2}{2x\cdot vx} = \frac{1+v^2}{2v}$$

Isolate the $v'$-term:
$$x\frac{dv}{dx} = \frac{1+v^2}{2v} - v = \frac{1-v^2}{2v}$$

Separate and integrate:
$$\frac{2v}{1-v^2}dv = \frac{dx}{x} \;\Longrightarrow\; -\ln|1-v^2| = \ln|x| + C$$

Exponentiate and absorb constants: $x(1-v^2) = K$. Back-substitute $v = \frac{y}{x}$:
$$x\left(1 - \frac{y^2}{x^2}\right) = \frac{x^2-y^2}{x} = K$$

$$\boxed{x^2 - y^2 = Cx}$$

**Check.** Differentiating $x^2-y^2 = Cx$: $2x - 2yy' = C = \frac{x^2-y^2}{x}$, so
$$y' = \frac{2x - \frac{x^2-y^2}{x}}{2y} = \frac{x^2+y^2}{2xy}$$ ✓`},{id:"hom-02",topic:"homogeneous",level:"basic",prompt:String.raw`Solve $\frac{dy}{dx} = \frac{y}{x} + \cos\left(\frac{y}{x}\right)$.`,answer:String.raw`\sec(y/x) + \tan(y/x) = Cx`,accept:["sec(y/x) + tan(y/x) = Cx || sec(y/x)+tan(y/x)=Cx || sec(y/x) + tan(y/x) = c x","ln(sec(y/x)+tan(y/x)) = ln x + C","1/cos(y/x) + tan(y/x) = Cx"],hints:[String.raw`Both terms on the right contain $y$ only through $\frac{y}{x}$. That is exactly the homogeneous pattern, so use the standard substitution.`,String.raw`Put $y = vx$ so $y' = v + x\frac{dv}{dx}$. The $v$'s will cancel on both sides, leaving $x\frac{dv}{dx} = \cos v$.`,String.raw`$\frac{dv}{\cos v} = \frac{dx}{x}$ integrates with $\int\sec v\,dv = \ln|\sec v + \tan v|$, so $\sec v + \tan v = C|x|$. Substitute $v = \frac{y}{x}$.`],solution:String.raw`The right side is $\frac{y}{x} + \cos\frac{y}{x}$, a function of $\frac{y}{x}$ only — homogeneous.

Put $y = vx$, so $\frac{dy}{dx} = v + x\frac{dv}{dx}$:
$$v + x\frac{dv}{dx} = v + \cos v$$

The $v$ terms cancel:
$$x\frac{dv}{dx} = \cos v$$

Separate:
$$\frac{dv}{\cos v} = \frac{dx}{x}$$

Integrate, using $\int\sec v\,dv = \ln|\sec v + \tan v|$:
$$\ln|\sec v + \tan v| = \ln|x| + C$$

Exponentiate (and take $x > 0$):
$$\sec v + \tan v = Cx$$

Back-substitute $v = \frac{y}{x}$:
$$\boxed{\sec\frac{y}{x} + \tan\frac{y}{x} = Cx}$$

**Check.** Differentiate $\sec v + \tan v = Cx$ with $v = y/x$:
$$\sec v\,(\sec v + \tan v)\left(\frac{v}{x} + \frac{dv}{dx}\right) = C$$
Substituting $\sec v + \tan v = Cx$ and dividing:
$$x\sec v\left(v + x\frac{dv}{dx}\right) = 1 \;\Longrightarrow\; v + x\frac{dv}{dx} = \cos v$$
which is exactly $\frac{dy}{dx} = \frac{y}{x} + \cos\frac{y}{x}$. Good.

(Equivalently $\tan\left(\frac{\pi}{4} + \frac{y}{2x}\right) = Cx$, since $\sec v + \tan v = \tan(\frac{\pi}{4} + \frac{v}{2})$.)`},{id:"hom-03",topic:"homogeneous",level:"main",prompt:String.raw`Solve $x\frac{dy}{dx} = y + x\tan\left(\frac{y}{x}\right)$ subject to $y(1) = \frac{\pi}{2}$. Express $y$ explicitly.`,answer:String.raw`y = x\sin^{-1}x`,accept:["y = x asin(x) || y=x asin(x) || y = x sin^-1(x) || y=x sin^-1(x) || y = x*sin^-1(x) || y = x arcsin(x)","sin(y/x) = x || sin(y/x)=x"],hints:[String.raw`Divide by $x$ to see the structure: $\frac{dy}{dx} = \frac{y}{x} + \tan\frac{y}{x}$. Both terms are functions of $\frac{y}{x}$, so it is homogeneous.`,String.raw`Put $y = vx$: then $v + x\frac{dv}{dx} = v + \tan v$, so $x\frac{dv}{dx} = \tan v$ and $\cot v\,dv = \frac{dx}{x}$. Integrating gives $\sin v = Cx$.`,String.raw`$y(1) = \frac{\pi}{2}$ means $v(1) = \frac{\pi}{2}$, so $C = 1$. So $\sin\frac{y}{x} = x$ — solve that for $y$ (take the branch through $y = \frac{\pi}{2}$ at $x = 1$).`],solution:String.raw`Divide by $x$:
$$\frac{dy}{dx} = \frac{y}{x} + \tan\frac{y}{x}$$

The right side depends on $\frac{y}{x}$ only, so put $y = vx$ with $\frac{dy}{dx} = v + x\frac{dv}{dx}$:
$$v + x\frac{dv}{dx} = v + \tan v \;\Longrightarrow\; x\frac{dv}{dx} = \tan v$$

Separate:
$$\frac{dv}{\tan v} = \frac{dx}{x} \;\Longrightarrow\; \cot v\,dv = \frac{dx}{x}$$

Integrate (with $\int\cot v\,dv = \ln|\sin v|$):
$$\ln|\sin v| = \ln|x| + C \;\Longrightarrow\; \sin v = Cx$$

Back-substitute:
$$\sin\frac{y}{x} = Cx$$

Use $y(1) = \frac{\pi}{2}$: $\sin\frac{\pi/2}{1} = 1 = C\cdot 1$, so $C = 1$ and $\sin\frac{y}{x} = x$.

Solving for $y$ (branch through $y = \frac{\pi}{2}$):
$$\boxed{y = x\sin^{-1}x}$$

**Check.** $y' = \sin^{-1}x + \frac{x}{\sqrt{1-x^2}}$, while $\frac{y}{x} + \tan\frac{y}{x} = \sin^{-1}x + \tan(\sin^{-1}x) = \sin^{-1}x + \frac{x}{\sqrt{1-x^2}}$. Identical. Good.`},{id:"hom-04",topic:"homogeneous",level:"main",prompt:String.raw`A curve passes through $\left(1, \frac{\pi}{6}\right)$. Let the slope of the curve at each point $(x,y)$ be $\frac{y}{x} + \sec\left(\frac{y}{x}\right)$, for $x > 0$. Then the equation of the curve is:`,options:[String.raw`$\sin\left(\frac{y}{x}\right) = \ln x + \frac{1}{2}$`,String.raw`$\csc\left(\frac{y}{x}\right) = \ln x + 2$`,String.raw`$\sec\left(\frac{2y}{x}\right) = \ln x + 2$`,String.raw`$\cos\left(\frac{2y}{x}\right) = \ln x + \frac{1}{2}$`],correct:0,hints:[String.raw`The slope is a function of $\frac{y}{x}$ alone, so this is a homogeneous equation. Use $y = vx$ so that $\frac{dy}{dx} = v + x\frac{dv}{dx}$.`,String.raw`The $v$ terms cancel again, leaving $x\frac{dv}{dx} = \sec v$. Then $\cos v\,dv = \frac{dx}{x}$, which integrates to $\sin v = \ln x + C$.`,String.raw`At $(1, \frac{\pi}{6})$ you have $v = \frac{\pi}{6}$ and $\ln 1 = 0$, so $\sin\frac{\pi}{6} = C = \frac{1}{2}$.`],solution:String.raw`$\frac{dy}{dx} = \frac{y}{x} + \sec\frac{y}{x}$ is a function of $\frac{y}{x}$ only — homogeneous.

Put $y = vx$:
$$v + x\frac{dv}{dx} = v + \sec v \;\Longrightarrow\; x\frac{dv}{dx} = \sec v$$

Separate:
$$\frac{dv}{\sec v} = \frac{dx}{x} \;\Longrightarrow\; \cos v\,dv = \frac{dx}{x}$$

Integrate:
$$\sin v = \ln x + C$$

Back-substitute:
$$\sin\frac{y}{x} = \ln x + C$$

The curve passes through $\left(1, \frac{\pi}{6}\right)$: $\sin\frac{\pi/6}{1} = \ln 1 + C$, so $\frac{1}{2} = C$.

$$\boxed{\sin\left(\frac{y}{x}\right) = \ln x + \frac{1}{2}}$$

**Check.** Writing $y = x\arcsin\left(\ln x + \frac{1}{2}\right)$ and differentiating gives $y' = \frac{y}{x} + \frac{1}{x\cos(y/x)} = \frac{y}{x} + \sec\frac{y}{x}$. Good.`,source:"JEE Advanced 2013"},{id:"hom-05",topic:"homogeneous",level:"main",prompt:String.raw`If $y = y(x)$ solves $2x^2\frac{dy}{dx} - 2xy + 3y^2 = 0$ and $y(e) = \frac{e}{3}$, then $y(1)$ is equal to:`,options:["$\frac{1}{3}$","$\frac{2}{3}$","$\frac{3}{2}$","$3$"],correct:1,hints:[String.raw`Rewrite it as $\frac{dy}{dx} = \frac{y}{x} - \frac{3}{2}\left(\frac{y}{x}\right)^2$. Both powers of $y$ come with matching powers of $x$, so this is homogeneous.`,String.raw`Put $y = vx$: $v + x\frac{dv}{dx} = v - \frac{3}{2}v^2$, hence $\frac{dv}{v^2} = -\frac{3}{2}\frac{dx}{x}$ and $\frac{1}{v} = \frac{3}{2}\ln x + C$.`,String.raw`Back-substitute $v = \frac{y}{x}$ to get $\frac{2x}{y} = 3\ln x + C'$, then use $y(e) = \frac{e}{3}$ to find $C'$. Finally put $x = 1$, where $\ln 1 = 0$.`],solution:String.raw`Rewrite the equation:
$$\frac{dy}{dx} = \frac{2xy - 3y^2}{2x^2} = \frac{y}{x} - \frac{3}{2}\left(\frac{y}{x}\right)^2$$

Every $y$-power is matched by the same power of $x$, so the right side is a function of $\frac{y}{x}$ — homogeneous.

Put $y = vx$:
$$v + x\frac{dv}{dx} = v - \frac{3}{2}v^2 \;\Longrightarrow\; x\frac{dv}{dx} = -\frac{3}{2}v^2$$

Separate and integrate:
$$\frac{dv}{v^2} = -\frac{3}{2}\frac{dx}{x} \;\Longrightarrow\; -\frac{1}{v} = -\frac{3}{2}\ln|x| + C \;\Longrightarrow\; \frac{1}{v} = \frac{3}{2}\ln x + C$$

Back-substitute $v = \frac{y}{x}$:
$$\frac{x}{y} = \frac{3}{2}\ln x + C \;\Longrightarrow\; \frac{2x}{y} = 3\ln x + C'$$

So $y = \dfrac{2x}{3\ln x + C'}$. Use $y(e) = \frac{e}{3}$:
$$\frac{2e}{e/3} = 3\ln e + C' \;\Longrightarrow\; 6 = 3 + C' \;\Longrightarrow\; C' = 3$$

$$y(x) = \frac{2x}{3(\ln x + 1)}$$

**Check.** With $y = \frac{2x}{3(\ln x+1)}$ one gets $y' = \frac{2\ln x}{3(\ln x+1)^2}$ and
$$2x^2y' - 2xy + 3y^2 = \frac{4x^2[\ln x - (\ln x + 1) + 1]}{3(\ln x+1)^2} = 0.$$ Good.

Finally, $\ln 1 = 0$, so
$$y(1) = \frac{2}{3(0+1)} = \frac{2}{3}$$`,source:"JEE Main 2022"},{id:"hom-06",topic:"homogeneous",level:"main",prompt:String.raw`Solve $\frac{dy}{dx} = \frac{x+y}{x-y}$.`,answer:String.raw`2\arctan(y/x) - \ln(x^2+y^2) = C`,accept:["2arctan(y/x) - ln(x^2+y^2) = C || 2atan(y/x) - ln(x^2+y^2) = C || 2atan(y/x)-ln(x^2+y^2)=C || 2tan^-1(y/x) - ln(x^2+y^2) = C","atan(y/x) - (1/2)ln(x^2+y^2) = C || atan(y/x)-1/2 ln(x^2+y^2)=C"],hints:[String.raw`Divide top and bottom by $x$: $\frac{1+y/x}{1-y/x}$. The right side is a function of $\frac{y}{x}$ only, so it is homogeneous.`,String.raw`Put $y = vx$: $v + x\frac{dv}{dx} = \frac{1+v}{1-v}$, and the subtler part is $\frac{1+v}{1-v} - v$. You will need $\frac{1-v}{1+v^2}\,dv = \frac{dx}{x}$.`,String.raw`$\arctan v - \frac{1}{2}\ln(1+v^2) = \ln|x| + C$. Replace $\ln(1+v^2)$ by $\ln(x^2+y^2) - 2\ln|x|$ — the $\ln|x|$ terms cancel.`],solution:String.raw`$\frac{x+y}{x-y} = \frac{1+v}{1-v}$ with $v = \frac{y}{x}$: the right side depends only on $v$, so the equation is homogeneous.

Put $y = vx$, so $y' = v + x\frac{dv}{dx}$:
$$v + x\frac{dv}{dx} = \frac{1+v}{1-v}$$

Isolate the $v'$-term:
$$x\frac{dv}{dx} = \frac{1+v}{1-v} - v = \frac{1+v - v + v^2}{1-v} = \frac{1+v^2}{1-v}$$

Separate:
$$\frac{1-v}{1+v^2}\,dv = \frac{dx}{x}$$

Integrate both halves:
$$\arctan v - \frac{1}{2}\ln(1+v^2) = \ln|x| + C$$

Back-substitute $v = \frac{y}{x}$, and use $\ln\left(1+\frac{y^2}{x^2}\right) = \ln(x^2+y^2) - 2\ln|x|$:
$$\arctan\frac{y}{x} - \frac{1}{2}\ln(x^2+y^2) + \ln|x| = \ln|x| + C$$

The $\ln|x|$ terms cancel:
$$\arctan\frac{y}{x} - \frac{1}{2}\ln(x^2+y^2) = C \;\Longrightarrow\; \boxed{2\arctan\frac{y}{x} - \ln(x^2+y^2) = C}$$

**Check.** Differentiating $2\arctan\frac{y}{x} - \ln(x^2+y^2) = C$ with respect to $x$ gives
$$\frac{2(xy' - y)}{x^2+y^2} - \frac{2x + 2yy'}{x^2+y^2} = 0 \;\Longrightarrow\; xy' - y = x + yy' \;\Longrightarrow\; y'(x-y) = x+y$$
which is exactly $y' = \dfrac{x+y}{x-y}$. Good.`},{id:"hom-07",topic:"homogeneous",level:"main",prompt:String.raw`Solve $\frac{dy}{dx} = \frac{2x - y + 1}{x + 3y - 2}$.`,answer:String.raw`\tfrac{3}{2}y^2 + xy - x^2 - 2y - x = C`,accept:["(3/2)y^2 + xy - x^2 - 2y - x = C || 1.5y^2+xy-x^2-2y-x=C || 3y^2/2+xy-x^2-2y-x=C","3y^2 + 2xy - 2x^2 - 4y - 2x = C"],hints:[String.raw`This is a linear fractional equation $\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$. Read off the coefficients: $a_1 = 2$, $b_1 = -1$, $a_2 = 1$, $b_2 = 3$. What is $b_1 + a_2$?`,String.raw`$b_1 + a_2 = -1 + 1 = 0$, so the cross coefficients are negatives (Case 3). Cross-multiply and group the differentials: $x\,dy + y\,dx$ is $d(xy)$.`,String.raw`Group the remaining pieces as $3y\,dy = d\left(\frac{3}{2}y^2\right)$, $2x\,dx = d(x^2)$, $2\,dy$ and $dx$ integrate directly, then add $C$ at the end.`],solution:String.raw`The equation is of the form $\frac{dy}{dx} = \frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$ with $a_1 = 2$, $b_1 = -1$, $c_1 = 1$, $a_2 = 1$, $b_2 = 3$, $c_2 = -2$.

Since $b_1 + a_2 = -1 + 1 = 0$, the cross coefficients are negatives — the equation integrates into exact differentials without any substitution.

Cross-multiply:
$$(x + 3y - 2)dy = (2x - y + 1)dx$$

Move everything to one side:
$$3y\,dy - 2\,dy + x\,dy - 2x\,dx - dx + y\,dx = 0$$

Now recognise the pieces:
$$x\,dy + y\,dx = d(xy), \qquad 3y\,dy = d\!\left(\frac{3}{2}y^2\right), \qquad 2x\,dx = d(x^2)$$

So
$$d\!\left(\frac{3}{2}y^2\right) + d(xy) - d(x^2) - 2\,dy - dx = 0$$

Integrating term by term:
$$\boxed{\frac{3}{2}y^2 + xy - x^2 - 2y - x = C}$$

**Check.** Differentiating gives $(3y + x - 2)y' + y - 2x - 1 = 0$, i.e. $(x+3y-2)y' = 2x - y + 1$, which is exactly the original equation. Good.`},{id:"hom-08",topic:"homogeneous",level:"advanced",prompt:String.raw`If the solution curve of $\frac{dy}{dx} = \frac{x+y-2}{x-y}$ passes through the points $(2, 1)$ and $(k+1, 2)$ with $k > 0$, then:`,options:[String.raw`$2\tan^{-1}\left(\frac{1}{k}\right) = \log_e(k^2+1)$`,String.raw`$\tan^{-1}\left(\frac{1}{k}\right) = \log_e(k^2+1)$`,String.raw`$2\tan^{-1}\left(\frac{1}{k+1}\right) = \log_e(k^2+2k+2)$`,String.raw`$2\tan^{-1}\left(\frac{1}{k}\right) = \log_e\left(\frac{k^2+1}{k^2}\right)$`],correct:0,hints:[String.raw`As it stands the equation is not homogeneous — the $-2$ and the $-y$ break it. Find where the lines $x+y-2 = 0$ and $x - y = 0$ intersect and move the origin there.`,String.raw`They meet at $(1, 1)$. Put $x = X+1$, $y = Y+1$: the equation becomes $\frac{dY}{dX} = \frac{X+Y}{X-Y}$, now genuinely homogeneous. Use $Y = vX$.`,String.raw`You get $\frac{1-v}{1+v^2}dv = \frac{dX}{X}$, i.e. $\arctan v - \frac{1}{2}\ln(1+v^2) = \ln|X| + C$. The $\ln|X|$ cancels, leaving $2\arctan\frac{Y}{X} - \ln(X^2+Y^2) = C$. Then use both given points.`],solution:String.raw`$\frac{dy}{dx} = \frac{x+y-2}{x-y}$ has constant terms, so it is not homogeneous as written. But the lines $x+y-2 = 0$ and $x-y = 0$ meet at $(1,1)$, so shift the origin there:
$$x = X + 1, \qquad y = Y + 1$$

Then $x + y - 2 = X + Y$ and $x - y = X - Y$, so
$$\frac{dY}{dX} = \frac{X+Y}{X-Y}$$
which is homogeneous of degree $0$.

Put $Y = vX$, so $\frac{dY}{dX} = v + X\frac{dv}{dX}$:
$$X\frac{dv}{dX} = \frac{1+v}{1-v} - v = \frac{1+v^2}{1-v}$$

Separate:
$$\frac{1-v}{1+v^2}dv = \frac{dX}{X} \;\Longrightarrow\; \arctan v - \frac{1}{2}\ln(1+v^2) = \ln|X| + C$$

Since $\ln(1+v^2) = \ln(X^2+Y^2) - 2\ln|X|$, the logarithms cancel:
$$2\arctan\frac{Y}{X} - \ln(X^2+Y^2) = C$$

Now use the two points.

At $(2,1)$: $X = 1$, $Y = 0$, so $0 - \ln 1 = 0$ and hence $C = 0$. The curve is
$$2\arctan\frac{Y}{X} = \ln(X^2+Y^2)$$

At $(k+1, 2)$: $X = k$, $Y = 1$, so
$$2\arctan\frac{1}{k} = \ln(k^2 + 1)$$

$$\boxed{2\tan^{-1}\left(\frac{1}{k}\right) = \log_e(k^2+1)}$$

**Check.** Differentiating $2\arctan\frac{Y}{X} - \ln(X^2+Y^2) = 0$ gives $Y'(X-Y) = X+Y$, i.e. $Y' = \frac{X+Y}{X-Y}$ — the shifted original equation. Good.`,source:"JEE Main 2022"},{id:"hom-09",topic:"homogeneous",level:"advanced",prompt:String.raw`The solution of $\frac{dy}{dx} = -\left(\frac{x^2+3y^2}{3x^2+y^2}\right)$ with $y(1) = 0$ is:`,options:[String.raw`$\log_e|x+y| - \frac{xy}{(x+y)^2} = 0$`,String.raw`$\log_e|x+y| + \frac{xy}{(x+y)^2} = 0$`,String.raw`$\log_e|x+y| + \frac{2xy}{(x+y)^2} = 0$`,String.raw`$\log_e|x+y| - \frac{2xy}{(x+y)^2} = 0$`],correct:2,hints:[String.raw`$-\frac{x^2+3y^2}{3x^2+y^2}$ depends only on $\frac{y}{x}$, so the equation is homogeneous. But putting $y = vx$ directly produces $4v^2+3v+1$, which does not factor over the reals — the quadratic forms are not diagonal in $(x,y)$.`,String.raw`Rotate the axes by $45^\circ$: put $u = x+y$, $v = x-y$. Then $x^2+3y^2 = u^2-uv+v^2$ and $3x^2+y^2 = u^2+uv+v^2$, and the equation collapses to $(u^2+v^2)du = uv\,dv$.`,String.raw`Set $w = \frac{v}{u}$: then $\frac{dv}{du} = w + u\frac{dw}{du} = \frac{u^2+v^2}{uv} = \frac{1+w^2}{w}$, so $w\,dw = \frac{du}{u}$ and $w^2 = 2\ln|u| + C$.`],solution:String.raw`Write the equation as
$$(x^2+3y^2)\,dx + (3x^2+y^2)\,dy = 0$$

**Rotate the axes by $45^\circ$:** put $u = x+y$, $v = x-y$, so $x = \frac{u+v}{2}$, $y = \frac{u-v}{2}$, $dx = \frac{du+dv}{2}$, $dy = \frac{du-dv}{2}$. Then
$$x^2+3y^2 = u^2 - uv + v^2, \qquad 3x^2+y^2 = u^2 + uv + v^2$$

Substitute:
$$(u^2-uv+v^2)(du+dv) + (u^2+uv+v^2)(du-dv) = 0$$
$$2(u^2+v^2)\,du - 2uv\,dv = 0$$

Now the equation is homogeneous in $u,v$. Set $w = \frac{v}{u}$ (so $v = wu$, $\frac{dv}{du} = w + u\frac{dw}{du}$):
$$w + u\frac{dw}{du} = \frac{u^2+v^2}{uv} = \frac{1+w^2}{w} \;\Longrightarrow\; u\frac{dw}{du} = \frac{1}{w}$$

Separate and integrate:
$$w\,dw = \frac{du}{u} \;\Longrightarrow\; \frac{w^2}{2} = \ln|u| + C$$

i.e. $w^2 = 2\ln|u| + C$. With $w = \frac{x-y}{x+y}$ and $u = x+y$:
$$\frac{(x-y)^2}{(x+y)^2} = 2\ln|x+y| + C$$

Apply $y(1) = 0$: the left side is $1$ and $\ln 1 = 0$, so $C = 1$. Multiply through by $(x+y)^2$ and use $(x-y)^2 = (x+y)^2 - 4xy$:
$$(x+y)^2 - 4xy = (x+y)^2 + 2(x+y)^2\ln|x+y|$$
$$-4xy = 2(x+y)^2\ln|x+y|$$
$$\boxed{\log_e|x+y| + \frac{2xy}{(x+y)^2} = 0}$$

**Check.** With $F = \ln|x+y| + \frac{2xy}{(x+y)^2}$ one finds
$$F_x = \frac{x^2+3y^2}{(x+y)^3}, \qquad F_y = \frac{3x^2+y^2}{(x+y)^3}$$
so $y' = -\frac{F_x}{F_y} = -\frac{x^2+3y^2}{3x^2+y^2}$, exactly the original equation. And $F(1,0) = \ln 1 + 0 = 0$. Good.`,source:"JEE Main 2023"}],o=[...i,...n];function s(e){const t=e.replace(/\$\$([\s\S]+?)\$\$/g,(a,r)=>r.replace(/[\\{}]/g," ").trim()).replace(/\$([^$\n]+?)\$/g,(a,r)=>r.replace(/\\[a-zA-Z]+/g,"").replace(/[\\{}]/g,"").trim()).replace(/\s+/g," ").trim();return t.length>96?t.slice(0,93).trimEnd()+"…":t}const y=o.map(e=>({id:e.id,topic:e.topic,title:s(e.prompt),level:e.level})),c=Object.fromEntries(y.map(e=>[e.id,e]));export{c as A,$ as T};
