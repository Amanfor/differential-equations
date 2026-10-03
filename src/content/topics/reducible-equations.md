---
title: "equations reducible to these forms"
description: "Bernoulli, generalised linear, and Clairaut — three disguises that collapse into forms you already know"
---

## Bernoulli's equation

$$\frac{dy}{dx} + P(x)y = Q(x)y^n \quad (n \neq 0, 1)$$

the extra $y^n$ makes it non-linear. divide by $y^n$ to get a linear equation in disguise:

$$y^{-n}\frac{dy}{dx} + P(x)y^{1-n} = Q(x)$$

let $z = y^{1-n}$. then $\frac{dz}{dx} = (1-n)y^{-n}\frac{dy}{dx}$, so $y^{-n}\frac{dy}{dx} = \frac{1}{1-n}\frac{dz}{dx}$.

substituting:

$$\frac{1}{1-n}\frac{dz}{dx} + P(x)z = Q(x) \implies \frac{dz}{dx} + (1-n)P(x)z = (1-n)Q(x)$$

this is a standard linear equation in $z$! solve it, then back-substitute $y = z^{1/(1-n)}$.

:::visual{id="bernoulli" caption="watch Bernoulli reduce to linear: divide by $y^n$, substitute $z=y^{1-n}$, solve linear, back-substitute"}
:::

:::predict{q="in $y' + 2xy = xy^3$, what substitution makes it linear?"}
:::choice
$z = y^{-2}$
::
:::choice
$z = y^2$
::
:::choice{correct}
$z = y^{1-3} = y^{-2}$ — divide by $y^3$: $y^{-3}y' + 2xy^{-2} = x$, then $z=y^{-2}$ gives $z' - 4xz = -2x$
::
:::reveal
$n=3 \implies 1-n = -2$. divide by $y^3$: $y^{-3}y' + 2xy^{-2} = x$. let $z = y^{-2} \implies z' = -2y^{-3}y'$. the equation becomes $-\frac{1}{2}z' + 2xz = x \implies z' - 4xz = -2x$. linear in $z$!
::
:::

---

## generalised linear form

$$f'(y)\frac{dy}{dx} + P(x)f(y) = Q(x)$$

the derivative of $f(y)$ is already sitting next to $y'$. let $z = f(y)$. then $\frac{dz}{dx} = f'(y)\frac{dy}{dx}$.

the equation becomes the standard linear form:

$$\frac{dz}{dx} + P(x)z = Q(x)$$

common patterns:
| $f(y)$ | $f'(y)$ | equation becomes |
|--------|---------|------------------|
| $\tan y$ | $\sec^2 y$ | $\sec^2 y\,y' + P\tan y = Q$ |
| $\ln y$ | $1/y$ | $\frac{1}{y}y' + P\ln y = Q$ |
| $\sin y$ | $\cos y$ | $\cos y\,y' + P\sin y = Q$ |

---

## Clairaut's form

$$y = xp + f(p), \quad p = \frac{dy}{dx}$$

differentiate with respect to $x$:

$$\frac{dy}{dx} = p = p + x\frac{dp}{dx} + f'(p)\frac{dp}{dx} \implies \frac{dp}{dx}\left[x + f'(p)\right] = 0$$

two branches:

**Branch A (general solution)**: $\frac{dp}{dx} = 0 \implies p = C$.

$$y = Cx + f(C) \quad \text{(family of straight lines)}$$

**Branch B (singular solution)**: $x + f'(p) = 0$.

eliminate $p$ between $x + f'(p) = 0$ and $y = xp + f(p)$ to get a curve with no arbitrary constant — the **envelope** of the family of lines.

---

## worked examples that fade

### fully worked: Bernoulli — $y' + \frac{1}{x}y = x^2 y^3$

:::work
:::step{reason="Bernoulli with $n=3$, divide by $y^3$"}
$y^{-3}y' + \frac{1}{x}y^{-2} = x^2$
::
:::step{reason="substitute $z = y^{1-3} = y^{-2}$"}
$z' = -2y^{-3}y' \implies y^{-3}y' = -\frac{1}{2}z'$
::
:::step{reason="linear in $z$"}
$-\frac{1}{2}z' + \frac{1}{x}z = x^2 \implies z' - \frac{2}{x}z = -2x^2$
::
:::step{reason="I.F. $= e^{\int -2/x\,dx} = x^{-2}$"}
$z \cdot x^{-2} = \int -2x^2 \cdot x^{-2}\,dx = \int -2\,dx = -2x + C$
::
:::step{reason="back-substitute"}
$z = -2x^3 + Cx^2 \implies y^{-2} = x^2(C - 2x) \implies y^2 = \frac{1}{x^2(C-2x)}$
::
:::

### partly worked: you fill the blank

solve $\sec^2 y\,y' + 2x\tan y = x$

:::work
:::step{reason="generalised linear: $f(y) = \tan y, f'(y) = \sec^2 y$"}
let $z = \tan y \implies z' = \sec^2 y\,y'$
::
:::step{reason="equation becomes linear in $z$" fill="z' + 2xz = x"}
$z' + 2xz = \_$
::
:::step{reason="I.F. $= e^{\int 2x\,dx} = e^{x^2}$" fill="ze^{x^2} = \int xe^{x^2}dx = \frac{1}{2}e^{x^2} + C"}
$z e^{x^2} = \_$
::
:::step{reason="back-substitute" fill="\tan y = \frac{1}{2} + Ce^{-x^2}"}
$\tan y = \_$
::
:::

### blank — you do it all

Clairaut: $y = xp + \frac{a}{p}$

:::work
:::step
::
:::step
::
:::step
::

---

## method chooser — recognise the type

:::visual{id="bernoulli" caption="enter a Bernoulli equation, see the substitution and solution live"}
:::

---

## common mistakes

:::mistakes
:::m
forgetting to divide by $y^n$ first. the substitution $z=y^{1-n}$ only works after dividing.
::
:::m
wrong exponent in $z = y^{1-n}$. if $n=3$, $z=y^{-2}$ not $y^2$.
::
:::m
in Clairaut, thinking the singular solution is just another member of the $y=Cx+f(C)$ family. it is not — it is the envelope.
::
:::m
missing the second branch in Clairaut: always check $x + f'(p) = 0$ for a singular solution.
::
:::m
in generalised linear, not spotting that $f'(y)$ is already multiplying $y'$.
::
:::