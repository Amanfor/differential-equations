---
title: "variable separable"
description: "the simplest move — get every x with dx, every y with dy, then integrate. plus the ax + by + c trick"
---

## before any formula — what does "separable" mean?

a differential equation is **separable** when you can write it as

$$f(x)\,dx = g(y)\,dy$$

all $x$'s on one side, all $y$'s on the other. then just integrate both sides.

:::visual{id="separable" caption="animation: variables separate, both sides integrate, constant appears"}
:::

:::predict{q="before integrating $\frac{dy}{dx} = (1+x)(1+y)$, what do you expect the shape of the solution family? straight lines? exponentials? something else?"}
:::choice
straight lines
::
:::choice
parabolas
::
:::choice{correct}
exponential-like curves — the solution is $\ln|1+y| = x + x^2/2 + C \implies 1+y = A e^{x + x^2/2}$
::
:::reveal
separating gives $\frac{dy}{1+y} = (1+x)dx$. integrate: $\ln|1+y| = x + \frac{x^2}{2} + C$. exponentiate: $|1+y| = e^C e^{x + x^2/2}$. the family is $y = A e^{x + x^2/2} - 1$ — exponential in a quadratic, so curves that grow/decay faster than pure exponentials.
::
:::

---

## standard form and solution

$$\frac{dy}{dx} = f(x)g(y) \implies \frac{dy}{g(y)} = f(x)\,dx \implies \int \frac{dy}{g(y)} = \int f(x)\,dx + C$$

**crucial**: the constant $C$ is added **at the moment of integration**, not later. carrying it through algebraic steps is what keeps the family intact.

---

## reducible to separable: $ax + by + c$

$$\frac{dy}{dx} = f(ax + by + c)$$

substitute $t = ax + by + c$. then $\frac{dt}{dx} = a + b\frac{dy}{dx} \implies \frac{dy}{dx} = \frac{1}{b}\left(\frac{dt}{dx} - a\right)$.

the equation becomes:

$$\frac{1}{b}\left(\frac{dt}{dx} - a\right) = f(t) \implies \frac{dt}{dx} = a + b f(t) \implies \frac{dt}{a + b f(t)} = dx$$

now integrate both sides.

---

## worked examples that fade

### fully worked: $(1+x^2)(1+y)\,dy + (1+y^2)(1+x)\,dx = 0$

:::work
:::step{reason="divide by $(1+x^2)(1+y^2)$"}
$\frac{1+y}{1+y^2}\,dy + \frac{1+x}{1+x^2}\,dx = 0$
::
:::step{reason="split each fraction"}
$\left[\frac{1}{1+y^2} + \frac{1}{2}\frac{2y}{1+y^2}\right]dy + \left[\frac{1}{1+x^2} + \frac{1}{2}\frac{2x}{1+x^2}\right]dx = 0$
::
:::step{reason="integrate each term"}
$\arctan y + \frac{1}{2}\ln(1+y^2) + \arctan x + \frac{1}{2}\ln(1+x^2) = C$
::
:::step{reason="combine using $\arctan x + \arctan y = \arctan\frac{x+y}{1-xy}$"}
$\arctan\left(\frac{x+y}{1-xy}\right) + \frac{1}{2}\ln\left[(1+x^2)(1+y^2)\right] = C$
::
:::

### partly worked: you fill the blank

solve $\frac{dy}{dx} = \sin^2(x + 3y) + 5$

:::work
:::step{reason="substitute $u = x + 3y$"}
$\frac{du}{dx} = 1 + 3y' \implies y' = \frac{1}{3}\left(\frac{du}{dx} - 1\right)$
::
:::step{reason="the equation becomes separable in $u$" fill="du/dx = 3\sin^2 u + 16"}
$\frac{1}{3}\left(\frac{du}{dx} - 1\right) = \sin^2 u + 5 \implies \frac{du}{dx} = \_$
::
:::step{reason="separate and integrate" fill="\int \frac{du}{3\sin^2 u + 16} = x + C"}
$\int \frac{du}{3\sin^2 u + 16} = \_$
::
:::

### blank — you do it all

solve $\frac{dy}{dx} = \frac{1}{x + 2y + 1}$

:::work
:::step
::
:::step
::
:::step
::

---

## common mistakes

:::mistakes
:::m
adding $+C$ after exponentiating: $\ln y = x + C \implies y = e^x + C$ (wrong). add $C$ at integration: $\ln y = x + C \implies y = A e^x$ where $A = e^C$.
::
:::m
dividing by $g(y)$ without checking $g(y)=0$. the roots $y=k$ where $g(k)=0$ are **constant singular solutions** that may not appear from the general integral.
::
:::m
in $ax+by+c$ substitution, forgetting the chain rule: $dt/dx = a + b\,dy/dx$, not just $a$.
::
:::m
integrating $\int \frac{du}{a+bf(u)}$ incorrectly. divide numerator/denominator by $\cos^2$ when $\tan$ appears, or use standard forms.
::
:::