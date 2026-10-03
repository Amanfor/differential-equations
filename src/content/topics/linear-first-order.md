---
title: "linear first-order equations"
description: "the integrating factor is not a formula to memorise — it is the answer to a one-line question, derived in front of you"
---

## before any formula — why do we need an integrating factor?

the standard form is

$$\frac{dy}{dx} + P(x)y = Q(x)$$

the left side is **almost** a perfect derivative. we want to find a multiplier $\mu(x)$ that makes it exact.

:::visual{id="linear-if" caption="the integrating factor turns the left side into $d/dx[\mu y]$. watch it happen step by step."}
:::

:::predict{q="before deriving: what should $\mu(x)$ satisfy so that $\mu y' + \mu P y$ becomes $(d/dx)[\mu y]$?"}
:::choice
$\mu' = \mu P$
::
:::choice{correct}
$\mu' = \mu P$ — because $(d/dx)[\mu y] = \mu y' + \mu' y$, and we need $\mu' = \mu P$
::
:::choice
$\mu = P$
::
:::reveal
the product rule gives $(d/dx)[\mu y] = \mu y' + \mu' y$. we want this to equal $\mu y' + \mu P y$, so $\mu' = \mu P$. that is the differential equation for $\mu$.
::
:::

---

## derivation of the integrating factor

we want $\mu(x)$ such that

$$\mu(x)\frac{dy}{dx} + \mu(x)P(x)y = \frac{d}{dx}[\mu(x)y] = \mu(x)\frac{dy}{dx} + \mu'(x)y$$

equating the coefficients of $y$:

$$\mu'(x) = \mu(x)P(x) \implies \frac{d\mu}{\mu} = P(x)\,dx \implies \ln\mu = \int P(x)\,dx \implies \mu(x) = e^{\int P(x)\,dx}$$

this $\mu(x)$ is the **integrating factor (I.F.)**.

the equation becomes

$$\frac{d}{dx}[y \cdot \text{I.F.}] = Q(x) \cdot \text{I.F.}$$

integrate both sides:

$$y \cdot \text{I.F.} = \int Q(x) \cdot \text{I.F.}\,dx + C$$

---

## worked examples that fade

### fully worked: $(1+e^x)y' + y e^x = 1$

:::work
:::step{reason="divide by $1+e^x$ to get standard form"}
$y' + \frac{e^x}{1+e^x}y = \frac{1}{1+e^x}$
::
:::step{reason="notice $\frac{e^x}{1+e^x} = \frac{d}{dx}\ln(1+e^x)$"}
$\text{I.F.} = e^{\int \frac{e^x}{1+e^x}dx} = e^{\ln(1+e^x)} = 1+e^x$
::
:::step{reason="the left side is exactly $d/dx[y(1+e^x)]$"}
$\frac{d}{dx}[y(1+e^x)] = 1$
::
:::step{reason="integrate"}
$y(1+e^x) = x + C$
::
:::step{reason="apply initial condition $y(0)=2$"}
$2(1+e^0) = C \implies C = 4$
::
:::step{reason="solution"}
$y(x) = \frac{x+4}{1+e^x}$
::
:::

### partly worked: you fill the blank

$\frac{dy}{dx} + \frac{xy}{x^2-1} = \frac{x^4+2x}{\sqrt{1-x^2}}, \quad x \in (-1,1), \quad y(0)=0$

:::work
:::step{reason="standard form: $P(x) = \frac{x}{x^2-1} = -\frac{x}{1-x^2}$"}
$\text{I.F.} = e^{\int -\frac{x}{1-x^2}dx}$
::
:::step{reason="integrate" fill="e^{\frac{1}{2}\ln(1-x^2)} = \sqrt{1-x^2}"}
$\int -\frac{x}{1-x^2}dx = \frac{1}{2}\ln(1-x^2) \implies \text{I.F.} = \_$
::
:::step{reason="multiply the equation by I.F." fill="y\sqrt{1-x^2} = \int (x^4+2x)dx"}
$y\sqrt{1-x^2} = \int \frac{x^4+2x}{\sqrt{1-x^2}}\cdot\sqrt{1-x^2}\,dx = \_$
::
:::step{reason="integrate and apply $y(0)=0$" fill="x^5/5 + x^2"}
$y\sqrt{1-x^2} = \frac{x^5}{5} + x^2 + C \implies C = 0 \implies y = \frac{x^5/5 + x^2}{\sqrt{1-x^2}}$
::
:::

### blank — you do it all

$(x+1)\frac{dy}{dx} - y = e^{3x}(x+1)^2, \quad y(0)=1/3$

:::work
:::step
::
:::step
::
:::step
::

---

## linear in $x$ instead of $y$

when the equation is non-linear in $y$ but linear in $x$, invert:

$$\frac{dx}{dy} + P(y)x = Q(y)$$

$$\text{I.F.} = e^{\int P(y)\,dy}, \quad x \cdot \text{I.F.} = \int Q(y) \cdot \text{I.F.}\,dy + C$$

---

## method chooser — recognise the type

:::visual{id="linear-if" caption="enter $P(x)$ and $Q(x)$, see the integrating factor appear and the solution draw live"}
:::

---

## common mistakes

:::mistakes
:::m
forgetting to divide by the coefficient of $y'$ before computing $P(x)$. in $(x^2+1)y' + 2xy = Q$, $P(x) = \frac{2x}{x^2+1}$, not $2x$.
::
:::m
sign error in $P(x)$ when the standard form has a minus: $\frac{dy}{dx} - P y = Q \implies$ standard form is $\frac{dy}{dx} + (-P)y = Q$, so I.F. $= e^{-\int P dx}$.
::
:::m
using $e^{\int P dx}$ when the equation is linear in $x$. then the integrating factor is $e^{\int P(y) dy}$.
::
:::m
dropping absolute values in $\ln|x|$ when integrating $\int \frac{1}{x}dx$. keep them until the initial condition fixes the sign.
::
:::