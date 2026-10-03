---
title: "slope fields and the geometry of a solution"
description: "what a differential equation really says — at every point the plane carries an arrow; a solution is a path that never crosses an arrow"
---

## before any formula — what does a differential equation *mean*?

a differential equation $\frac{dy}{dx} = f(x, y)$ assigns a **slope** to every point $(x, y)$ in the plane. draw a tiny line segment with that slope at many points — you get a **slope field** (or direction field).

:::visual{id="slope-field" caption="slope field for $y' = x - y$. click a point to set an initial condition and watch the solution curve draw. drag $C$ to see the whole family."}
:::

:::predict{q="look at the slope field for $y' = x - y$. where do you think the solutions flatten out (horizontal tangents)? where do they become vertical?"}
:::choice
horizontal when $y=x$; vertical nowhere (finite slopes everywhere)
::
:::choice{correct}
horizontal when $y=x$; vertical nowhere — the slope is always finite
::
:::choice
horizontal when $x=0$; vertical when $y=0$
::
:::reveal
$y' = x - y = 0 \implies y = x$ gives horizontal tangents (isocline $c=0$). since $y'$ is always a finite real number for finite $x,y$, the slope never becomes vertical — solutions are smooth everywhere.
::
:::

---

## what the slope field tells you

- **isoclines**: curves where the slope is constant ($f(x,y) = c$). along an isocline, all line segments have the same angle.
- **integral curves**: solutions — curves tangent to the field at every point. they never cross the field.
- **existence & uniqueness**: if $f(x,y)$ is nice (Lipschitz in $y$), through every point there is exactly one solution curve.

:::visual{id="tangent-geometry" caption="geometric quantities at a point on a curve: tangent, normal, subtangent, subnormal"}
:::

---

## tangent and normal geometry

at a point $P(x, y)$ on $y = f(x)$ with slope $m = y'$:

| quantity | formula |
|----------|---------|
| tangent line | $Y - y = m(X - x)$ |
| normal line | $Y - y = -\frac{1}{m}(X - x)$ |
| $x$-intercept of tangent | $X_T = x - \frac{y}{m}$ |
| $y$-intercept of tangent | $Y_T = y - xm$ |
| $x$-intercept of normal | $X_N = x + ym$ |
| $y$-intercept of normal | $Y_N = y + \frac{x}{m}$ |
| subtangent $|ST|$ | $\left|\frac{y}{m}\right|$ |
| subnormal $|SN|$ | $|y m|$ |
| length of tangent $|PT|$ | $\left|\frac{y\sqrt{1+m^2}}{m}\right|$ |
| length of normal $|PN|$ | $|y|\sqrt{1+m^2}$ |

---

## worked examples that fade

### fully worked: find the curve where the subtangent is constant $k$

:::work
:::step{reason="subtangent $|ST| = |y/y'| = k$"}
$\left|\frac{y}{y'}\right| = k \implies y' = \pm \frac{y}{k}$
::
:::step{reason="separable: $dy/y = \pm dx/k$"}
$\ln|y| = \pm \frac{x}{k} + C \implies y = A e^{\pm x/k}$
::
:::step{reason="exponential curves"}
$y = A e^{x/k}$ or $y = A e^{-x/k}$
::
:::

### partly worked: you fill the blank

find the curve where the length of the normal is constant $c$

:::work
:::step{reason="length of normal $|PN| = |y|\sqrt{1+(y')^2} = c$"}
$y^2(1+(y')^2) = c^2 \implies (y')^2 = \frac{c^2}{y^2} - 1$
::
:::step{reason="take square root and separate" fill="dy/dx = \pm \sqrt{c^2/y^2 - 1}"}
$y' = \pm \sqrt{\frac{c^2 - y^2}{y^2}} = \_$
::
:::step{reason="integrate: substitute $y = c \sin\theta$"}
$y = c \sin\left(\frac{x}{c} + C\right)$ (circles of radius $c$)
::
:::

---

## method chooser — recognise the type

:::visual{id="slope-field" caption="interactive slope field: pick an equation, click to set an initial condition, drag the constant to see the family"}
:::

---

## common mistakes

:::mistakes
:::m
confusing subtangent ($|y/y'|$) with subnormal ($|yy'|$). subtangent = projection on $x$-axis of tangent segment; subnormal = projection of normal.
::
:::m
forgetting absolute values in length formulas. lengths are positive; the formulas use $|y|$ and $|y'|$.
::
:::m
thinking the normal line has slope $1/y'$. perpendicular slopes multiply to $-1$, so normal slope is $-1/y'$.
::
:::m
assuming isoclines are solution curves. isoclines are curves of *constant slope*; solutions are tangent to the field.
::
:::