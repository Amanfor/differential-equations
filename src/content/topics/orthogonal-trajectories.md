---
title: "orthogonal trajectories"
description: "find the family that crosses every curve of your family at a right angle — one substitution turns slopes upside down."
---

## before any formula — what does "orthogonal" mean?

two curves are **orthogonal** at their intersection if their tangents are perpendicular ($m_1 m_2 = -1$).

an **orthogonal trajectory** of a given family of curves is a curve that intersects **every** member of the family at right angles.

:::visual{id="orthogonal" caption="a family of curves (blue) and its orthogonal trajectories (red). every blue curve meets every red curve at 90°."}
:::

:::predict{q="the family of circles $x^2+y^2=c^2$ centred at the origin. what is the orthogonal family?"}
:::choice
parabolas
::
:::choice
lines through the origin
::
:::choice{correct}
lines through the origin $y = kx$ — each radius is perpendicular to the circle
::
:::reveal
for $x^2+y^2=c^2$, differentiate: $2x+2yy'=0 \implies y' = -x/y$. orthogonal: $y' \to -1/y' = y/x \implies dy/dx = y/x \implies dy/y = dx/x \implies \ln|y| = \ln|x| + \ln|k| \implies y = kx$. the radii are the orthogonal trajectories.
::
:::

---

## cartesian algorithm

1. form the differential equation of the given family by eliminating the parameter $c$:
   $$F\left(x, y, \frac{dy}{dx}\right) = 0$$
2. replace $\frac{dy}{dx} \to -\frac{dx}{dy} = -\frac{1}{dy/dx}$ (perpendicular slopes)
3. solve the new differential equation

---

## polar algorithm

in polar coordinates $(r, \theta)$, the angle $\phi$ between the radius vector and the tangent satisfies $\tan\phi = r\frac{d\theta}{dr}$.

perpendicular means $\phi_2 = \phi_1 + \frac{\pi}{2} \implies \tan\phi_2 = -\cot\phi_1 = -\frac{1}{r\,d\theta/dr}$.

replacement rule: $\frac{dr}{d\theta} \to -r^2\frac{d\theta}{dr}$.

---

## worked examples that fade

### fully worked: orthogonal trajectories of $y^2 = 4ax$ (parabolas)

:::work
:::step{reason="differentiate the family"}
$2yy' = 4a \implies y' = \frac{2a}{y} = \frac{y^2/4a \cdot 2}{y} = \frac{y}{2x}$
::
:::step{reason="replace $y' \to -1/y'$"}
$-\frac{1}{y'} = \frac{y}{2x} \implies \frac{dy}{dx} = -\frac{2x}{y}$
::
:::step{reason="separate and integrate"}
$y\,dy = -2x\,dx \implies \frac{y^2}{2} = -x^2 + C \implies 2x^2 + y^2 = 2C$
::
:::step{reason="orthogonal family: coaxial ellipses"}
$2x^2 + y^2 = C^2$
::
:::

### partly worked: you fill the blank

orthogonal trajectories of concentric circles $x^2+y^2 = c^2$

:::work
:::step{reason="differentiate and eliminate $c$" fill="y' = -x/y"}
$2x + 2yy' = 0 \implies \_$
::
:::step{reason="orthogonal substitution $y' \to -1/y'$" fill="y' = y/x"}
$-\frac{1}{y'} = -\frac{x}{y} \implies \_$
::
:::step{reason="separate and integrate" fill="dy/y = dx/x \implies \ln|y| = \ln|x| + C \implies y = kx"}
$\frac{dy}{dx} = \frac{y}{x} \implies \_$
::

### blank — you do it all

orthogonal trajectories of $r = a\cos\theta$ (circles through origin)

:::work
:::step
::
:::step
::
:::step
::

---

## self-orthogonal families

some families are their own orthogonal trajectories. the most famous:

**confocal and coaxial parabolas**: $y^2 = 4a(x+a)$

differentiate: $2yy' = 4a \implies a = \frac{1}{2}yy'$

substitute back: $y^2 = 4(\frac{1}{2}yy')(x + \frac{1}{2}yy') = 2yy'x + (yy')^2$

DE: $y(y')^2 + 2xy' - y = 0$

replace $y' \to -1/y'$: $y(1/(y')^2) - 2x/y' - y = 0 \implies$ multiply by $(y')^2$: $y - 2xy' - y(y')^2 = 0$, which is the **same equation**.

---

## method chooser — recognise the type

:::visual{id="orthogonal" caption="enter a family, see its differential equation and the orthogonal family draw live"}
:::

---

## common mistakes

:::mistakes
:::m
replacing $y'$ with $1/y'$ instead of $-1/y'$. perpendicular slopes multiply to $-1$, so $y' \to -1/y'$.
::
:::m
forgetting to eliminate the parameter $c$ **before** doing the orthogonal substitution. you must have a parameter-free DE first.
::
:::m
in polar, using $y' \to -1/y'$ instead of $dr/d\theta \to -r^2 d\theta/dr$.
::
:::m
thinking the orthogonal family has the same parameter. it has its own parameter (the constant of integration from solving the orthogonal DE).
::
:::