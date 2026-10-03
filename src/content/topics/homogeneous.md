---
title: "homogeneous equations (y = vx)"
description: "why does one substitution work? because the equation only sees the ratio y/x — and v = y/x is exactly that ratio"
---

## before any formula — what does "homogeneous" mean here?

a function $f(x, y)$ is **homogeneous of degree $n$** if $f(\lambda x, \lambda y) = \lambda^n f(x, y)$.

a first-order equation is homogeneous if the RHS is a function of the ratio $y/x$ only:

$$\frac{dy}{dx} = \frac{f(x, y)}{g(x, y)} = F\left(\frac{y}{x}\right)$$

where $f$ and $g$ are homogeneous polynomials of the **same degree**.

:::visual{id="homogeneous" caption="the equation $\frac{dy}{dx} = \frac{x^2+y^2}{xy}$ only sees $y/x$. substitute $y=vx$ and it separates."}
:::

:::predict{q="look at $\frac{dy}{dx} = \frac{x^2+y^2}{xy}$. if you scale $(x,y) \to (2x, 2y)$, what happens to the RHS?"}
:::choice
it doubles
::
:::choice
it quadruples
::
:::choice{correct}
it stays exactly the same — both numerator and denominator scale by $2^2=4$, so the ratio is unchanged
::
:::reveal
$f(2x, 2y) = \frac{(2x)^2+(2y)^2}{(2x)(2y)} = \frac{4(x^2+y^2)}{4xy} = \frac{x^2+y^2}{xy} = f(x,y)$. the function is homogeneous of degree 0, so it depends only on $y/x$.
::
:::

---

## the substitution $y = vx$ — why it works

if the equation only sees $y/x$, then let $v = y/x$. the equation becomes a function of $v$ only:

$$y = vx \implies \frac{dy}{dx} = v + x\frac{dv}{dx}$$

substitute:

$$v + x\frac{dv}{dx} = F(v) \implies x\frac{dv}{dx} = F(v) - v \implies \frac{dv}{F(v) - v} = \frac{dx}{x}$$

now the variables are separated: $v$ on the left, $x$ on the right.

---

## worked examples that fade

### fully worked: $\frac{dy}{dx} = \frac{x^2+y^2}{2xy}$

:::work
:::step{reason="homogeneous of degree 0: $F(y/x) = \frac{1+(y/x)^2}{2(y/x)}$"}
let $y = vx \implies y' = v + xv'$
::
:::step{reason="substitute"}
$v + x\frac{dv}{dx} = \frac{1+v^2}{2v}$
::
:::step{reason="isolate $xv'$"}
$x\frac{dv}{dx} = \frac{1+v^2}{2v} - v = \frac{1-v^2}{2v}$
::
:::step{reason="separate and integrate"}
$\frac{2v}{1-v^2}\,dv = \frac{dx}{x} \implies -\ln|1-v^2| = \ln|x| + C$
::
:::step{reason="back-substitute $v = y/x$"}
$-\ln\left|1-\frac{y^2}{x^2}\right| = \ln|x| + C \implies \ln\left|\frac{x^2}{x^2-y^2}\right| = \ln|x| + C$
::
:::step{reason="simplify"}
$|x^2-y^2| = K|x| \implies x^2 - y^2 = Cx$
::
:::

### partly worked: you fill the blank

$x \frac{dy}{dx} = y + x\tan\left(\frac{y}{x}\right)$

:::work
:::step{reason="divide by $x$"}
$y' = \frac{y}{x} + \tan(y/x)$
::
:::step{reason="homogeneous — substitute $y=vx$" fill="v + x v' = v + \tan v"}
$v + x\frac{dv}{dx} = v + \tan v \implies x\frac{dv}{dx} = \_$
::
:::step{reason="separate and integrate" fill="\cot v\,dv = dx/x \implies \ln|\sin v| = \ln|x| + C"}
$\frac{dv}{\tan v} = \frac{dx}{x} \implies \_$
::
:::step{reason="back-substitute $v = y/x$" fill="\sin(y/x) = Cx"}
$\sin(y/x) = Cx$
::
:::

### blank — you do it all

$\frac{dy}{dx} = \frac{y}{x} + \cos\left(\frac{y}{x}\right)$

:::work
:::step
::
:::step
::
:::step
::

---

## non-homogeneous reducible to homogeneous

$$\frac{dy}{dx} = \frac{a_1x + b_1y + c_1}{a_2x + b_2y + c_2}$$

**Case 1**: $\frac{a_1}{a_2} \neq \frac{b_1}{b_2}$ (intersecting lines)
shift origin to intersection $(h,k)$: $x = X+h, y = Y+k$ where
$a_1h + b_1k + c_1 = 0$ and $a_2h + b_2k + c_2 = 0$.

**Case 2**: $\frac{a_1}{a_2} = \frac{b_1}{b_2} = m$ (parallel lines)
substitute $t = a_2x + b_2y$, reduces to $ax+by+c$ form.

**Case 3**: $b_1 + a_2 = 0$ (cross coefficients are negatives)
the equation groups into exact differentials directly.

---

## method chooser — recognise the type

:::visual{id="homogeneous" caption="type or pick an equation, see it transform under $y=vx$"}
:::

---

## common mistakes

:::mistakes
:::m
using $y=vx$ when the equation is not homogeneous. the RHS must be a function of $y/x$ only.
::
:::m
forgetting the product rule: $y' = v + xv'$, not just $v'$.
::
:::m
in case 1 (intersecting lines), solving for $h,k$ but then forgetting to shift back to $x,y$ at the end.
::
:::m
in case 2 (parallel lines), trying $y=vx$ instead of the substitution $t = a_2x + b_2y$.
::
:::m
sign error when separating: $x\frac{dv}{dx} = F(v) - v$, not $v - F(v)$.
::
:::