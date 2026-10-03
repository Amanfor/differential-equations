---
title: "formation, general and particular solutions"
description: "kill the constants: differentiate n times, eliminate n constants, and see why the order equals the number of free parameters"
---

## before any formula — what is a family of curves?

:::visual{id="family-curve" caption="a family of curves: one equation, one parameter. differentiate, eliminate, get the differential equation"}
:::

:::predict{q="the family $y = c e^{2x}$ has one parameter. how many times must you differentiate before you can eliminate $c$?"}
:::choice
once
::
:::choice{correct}
once — because one parameter means order 1
::
:::choice
twice
::
:::reveal
one parameter $c$ means the differential equation is order 1. differentiate once: $y' = 2c e^{2x} = 2y$. the parameter $c$ is gone. the differential equation is $y' = 2y$ or $y' - 2y = 0$.
::
:::

---

## formation algorithm

given an $n$-parameter family $f(x, y, c_1, \dots, c_n) = 0$:

1. differentiate $n$ times with respect to $x$ (you get $n$ new equations)
2. eliminate the $n$ parameters across the $n+1$ equations
3. the resulting relation $F(x, y, y', \dots, y^{(n)}) = 0$ is the differential equation

---

## worked examples that fade

### fully worked: family of circles touching $x$-axis at origin

$x^2 + (y - a)^2 = a^2 \implies x^2 + y^2 - 2ay = 0$

:::work
:::step{reason="solve for the parameter $a$ first"}
$\frac{x^2 + y^2}{y} = 2a$
::
:::step{reason="differentiate with respect to $x$"}
$\frac{y(2x + 2y y') - (x^2 + y^2)y'}{y^2} = 0$
::
:::step{reason="simplify the numerator"}
$2xy + 2y^2 y' - x^2 y' - y^2 y' = 0 \implies 2xy + y^2 y' - x^2 y' = 0$
::
:::step{reason="factor and write in standard form"}
$(y^2 - x^2)y' + 2xy = 0$
::
:::

### partly worked: you fill the blank

family of all non-vertical straight lines: $y = mx + c$

:::work
:::step{reason="differentiate once"}
$y' = m$
::
:::step{reason="differentiate again" fill="0"}
$y'' = \_$
::
:::step{reason="the differential equation of all straight lines"}
$y'' = 0$
::
:::

### blank — you do it all

family of parabolas $(y - k)^2 = 4a(x - h)$ with parameters $h, k, a$

:::work
:::step
::
:::step
::
:::step
::

---

## general vs particular vs singular

| type | constants | geometric meaning |
|------|-----------|-------------------|
| general solution | exactly $n$ (order $n$) | $n$-parameter family of curves |
| particular solution | all constants fixed by initial/boundary conditions | one specific curve |
| singular solution | none (not from any $C$) | envelope of the general family |

:::spot
:::s
the singular solution can always be obtained by picking a special value of $C$
::
:::s{bad="the singular solution is the envelope of the family — it touches every curve of the general solution but cannot be obtained for any numerical value of the constant $C$."}
the singular solution is $y = 2\sqrt{ax}$ (the parabola itself)
::
:::

---

## common mistakes

:::mistakes
:::m
forgetting that $c_1 e^{x+c_2}$ has **one** essential constant ($A = c_1 e^{c_2}$), not two. order = 1, not 2.
::
:::m
differentiating fewer times than the number of parameters. each parameter needs one differentiation.
::
:::m
eliminating constants incorrectly — use the original equation and all differentiated equations together as a system.
::
:::m
thinking a singular solution is just a particular solution with $C=0$. it is not in the family at all.
::
:::