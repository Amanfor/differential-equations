---
title: "exact equations and inspection"
description: "recognise a perfect differential on sight — d(xy), d(y/x), d(atan(y/x)) — and integrate without doing any work"
---

## before any formula — what is "exact"?

an expression $M(x,y)\,dx + N(x,y)\,dy$ is an **exact differential** if there exists a function $u(x,y)$ such that

$$du = \frac{\partial u}{\partial x}dx + \frac{\partial u}{\partial y}dy = M\,dx + N\,dy$$

this happens **iff** $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ (mixed partials are equal).

when exact, the solution is simply $u(x,y) = C$.

---

## exactness test

| $M\,dx + N\,dy$ | $\partial M/\partial y$ | $\partial N/\partial x$ | exact? |
|-----------------|------------------------|------------------------|--------|
| $2xy\,dx + x^2\,dy$ | $2x$ | $2x$ | yes, $u = x^2y$ |
| $y\,dx - x\,dy$ | $1$ | $-1$ | **no** |
| $x\,dy + y\,dx$ | $1$ | $1$ | yes, $u = xy$ |

---

## the 14 inspection formulas — recognise and integrate instantly

:::visual{id="inspection" caption="drag to match an expression to its exact differential form"}
:::

| expression | exact differential |
|------------|-------------------|
| $x\,dy + y\,dx$ | $d(xy)$ |
| $\frac{x\,dy - y\,dx}{x^2}$ | $d(y/x)$ |
| $\frac{y\,dx - x\,dy}{y^2}$ | $d(x/y)$ |
| $\frac{x\,dy - y\,dx}{xy}$ | $d\ln|y/x| = dy/y - dx/x$ |
| $\frac{x\,dy - y\,dx}{x^2+y^2}$ | $d\arctan(y/x)$ |
| $\frac{y\,dx - x\,dy}{x^2+y^2}$ | $d\arctan(x/y)$ |
| $\frac{x\,dx + y\,dy}{x^2+y^2}$ | $\frac{1}{2}d\ln(x^2+y^2)$ |
| $\frac{x\,dx + y\,dy}{\sqrt{x^2+y^2}}$ | $d\sqrt{x^2+y^2}$ |
| $\frac{x\,dy + y\,dx}{xy}$ | $d\ln|xy|$ |
| $\frac{x\,dy - y\,dx}{x^2-y^2}$ | $\frac{1}{2}d\ln|\frac{x+y}{x-y}|$ |
| $e^{xy}(x\,dy + y\,dx)$ | $d(e^{xy})$ |
| $e^{x/y}\frac{y\,dx - x\,dy}{y^2}$ | $d(e^{x/y})$ |
| $\frac{y\,dx - x\,dy}{y\sqrt{y^2-x^2}}$ | $d\arcsin(x/y)$ |
| $\frac{x\,dy - y\,dx}{x\sqrt{x^2-y^2}}$ | $d\arcsec(x/y)$ |

---

## polar coordinate substitution

when you see $x\,dx + y\,dy$ and $x\,dy - y\,dx$ together:

- **circular polar**: $x = r\cos\theta, y = r\sin\theta$
  - $x\,dx + y\,dy = r\,dr$
  - $x\,dy - y\,dx = r^2\,d\theta$

- **hyperbolic polar**: $x = r\sec\theta, y = r\tan\theta$
  - $x\,dx - y\,dy = r\,dr$
  - $x\,dy - y\,dx = r^2\sec\theta\,d\theta$

---

## worked examples that fade

### fully worked: $(x^3 + xy^2 + y)\,dx + (y^3 + x^2y + x)\,dy = 0$

:::work
:::step{reason="group by degree and recognisable patterns"}
$x(x^2+y^2)\,dx + y(x^2+y^2)\,dy + (x\,dy + y\,dx) = 0$
::
:::step{reason="factor $(x^2+y^2)$"}
$(x^2+y^2)(x\,dx + y\,dy) + (x\,dy + y\,dx) = 0$
::
:::step{reason="recognise exact differentials"}
$x\,dx + y\,dy = \frac{1}{2}d(x^2+y^2)$
$x\,dy + y\,dx = d(xy)$
::
:::step{reason="substitute"}
$(x^2+y^2)\cdot\frac{1}{2}d(x^2+y^2) + d(xy) = 0$
::
:::step{reason="integrate directly"}
$\frac{1}{2}\int (x^2+y^2)\,d(x^2+y^2) + \int d(xy) = C$
$\frac{1}{4}(x^2+y^2)^2 + xy = C$
::
:::

### partly worked: you fill the blank

solve $x\,dy - y\,dx = \sqrt{x^2+y^2}\,(x\,dx + y\,dy)$

:::work
:::step{reason="polar substitution: $x = r\cos\theta, y = r\sin\theta$"}
$x\,dx + y\,dy = r\,dr, \quad x\,dy - y\,dx = r^2\,d\theta$
::
:::step{reason="equation becomes" fill="r^2\,d\theta = r\sqrt{r^2}\,r\,dr = r^3\,dr \implies d\theta = r\,dr"}
$r^2\,d\theta = \sqrt{r^2}\,(r\,dr) \implies \_$
::
:::step{reason="integrate" fill="\theta = \frac{1}{2}r^2 + C"}
$\int d\theta = \int r\,dr \implies \_$
::
:::step{reason="back to cartesian" fill="\arctan(y/x) = \frac{1}{2}(x^2+y^2) + C"}
$\arctan(y/x) = \frac{1}{2}(x^2+y^2) + C$
::
:::

### blank — you do it all

$(x^2 + y^2)\,dx = 2xy\,dy$

:::work
:::step
::
:::step
::
:::step
::

---

## method chooser — recognise the type

:::visual{id="inspection" caption="type an expression, see if it matches a known exact differential"}
:::

---

## common mistakes

:::mistakes
:::m
thinking any $M\,dx + N\,dy$ is exact. always check $\partial M/\partial y = \partial N/\partial x$ first.
::
:::m
not spotting $x\,dy + y\,dx = d(xy)$ because the terms are separated. always look for $x\,dy$ and $y\,dx$ together.
::
:::m
forgetting the chain rule in polar: $x\,dy - y\,dx = r^2\,d\theta$, not just $d\theta$.
::
:::m
confusing $\frac{x\,dy - y\,dx}{x^2} = d(y/x)$ with $\frac{y\,dx - x\,dy}{y^2} = d(x/y)$. the signs matter.
::
:::m
trying to find an integrating factor when the equation is already exact by inspection.
::
:::