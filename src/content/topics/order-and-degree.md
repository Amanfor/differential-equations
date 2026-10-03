---
title: "order and degree"
description: "how to read a differential equation before you solve it — highest derivative, power, and the constants that actually count"
---

## before any formula — what do you see?

:::visual{id="order-degree" caption="the order is the highest derivative; the degree is its power after clearing radicals"}
:::

:::predict{q="a student says: 'the degree of $\sin(y'') = x$ is 1 because the highest derivative is $y''$'. what is wrong?"}
:::choice
the student is right — the highest derivative is $y''$, power 1
::
:::choice{correct}
the derivative $y''$ is trapped inside $\sin$ and cannot be freed algebraically — degree is undefined
::
:::reveal
order is always the highest derivative present — here it is 2. degree asks: can you write the equation as a polynomial in $y', y'', \dots$? here $\sin(y'')$ expands to an infinite series in powers of $y''$, so it is not a polynomial and the degree is **not defined**.
::
:::

---

## order — always defined, always a positive integer

the order of a differential equation is the order of the highest derivative that appears.

| equation | order | why |
|----------|-------|-----|
| $y' + xy = \sin x$ | 1 | highest is $y'$ |
| $y''' + 3y'' + y = 0$ | 3 | highest is $y'''$ |
| $y = c_1 e^{x+c_2}$ | 1 | only one essential constant $A = c_1 e^{c_2}$ |

---

## degree — only when you can clear to a polynomial

the degree is the power of the highest derivative **after** the equation has been cleared of radicals and fractions so it is a polynomial in all derivatives.

| equation | polynomial? | degree |
|----------|-------------|--------|
| $(y'')^3 + y(y')^4 = x^5$ | yes | 3 |
| $[1+(y')^2]^{3/2} = k y''$ | square both sides → $[1+(y')^2]^3 = k^2 (y'')^2$ | 2 |
| $y'' + \sin(y') = 0$ | no — $y'$ inside $\sin$ | **not defined** |
| $e^{y'''} = x+y$ | take $\ln$ → $y''' = \ln(x+y)$ | 1 |
| $y = x y' + k/y'$ | multiply by $y'$ → $y y' = x(y')^2 + k$ | 2 |

:::derive
:::step{reason="highest derivative is $y''$"}
order = 2
::
:::step{reason="raise both sides to power 2 to clear the $3/2$ exponent"}
$[1+(y')^2]^3 = k^2 (y'')^2$
::
:::step{reason="highest derivative is $(y'')^2$, power is 2"}
degree = 2
::
:::

---

## essential (independent) constants — the ones that actually count

the order of the differential equation governing an $n$-parameter family equals the number of **essential** arbitrary constants. constants that combine algebraically are not independent.

| given family | constants written | essential | order |
|--------------|-------------------|-----------|-------|
| $y = c_1 e^{x+c_2}$ | $c_1, c_2$ | $A = c_1 e^{c_2}$ | 1 |
| $y = c_1 \sin(x+c_2) + c_3 \cos(x+c_4)$ | $c_1, c_2, c_3, c_4$ | $A = c_1\cos c_2 - c_3\sin c_4,\ B = c_1\sin c_2 + c_3\cos c_4$ | 2 |
| $y = c_1 \ln(c_2 x)$ | $c_1, c_2$ | $A = c_1,\ B = c_1\ln c_2$ | 2 |
| $y = (c_1+c_2)\cos(x+c_3) - c_4 e^{x+c_5}$ | 5 | $c_1+c_2,\ c_3,\ c_4 e^{c_5}$ | 3 |

:::spot
:::s
the order is the number of arbitrary constants you see written
::
:::s{bad="constants that combine (like $c_1+c_2$ or $e^{c_1+c_2}$) count as ONE essential constant. count the independent parameters after merging."}
order = 2 because we see $c_1$ and $c_2$
::
:::

---

## general, particular, and singular solutions

- **general solution**: contains exactly $n$ arbitrary constants (order $n$). represents an $n$-parameter family of curves.
- **particular solution**: specific values assigned to the constants, usually from an initial condition $y(x_0) = y_0$.
- **singular solution**: cannot be obtained from the general solution for any choice of constants. geometrically the **envelope** of the general family.

---

## worked examples that fade

### fully worked: find order and degree

$$\left(\frac{d^2y}{dx^2}\right)^2 + \sin\left(\frac{dy}{dx}\right) = 0$$

:::work
:::step{reason="highest derivative is $y''$"}
order = 2
::
:::step{reason="the term $\sin(y')$ cannot be written as a polynomial in $y'$ — $y'$ is trapped inside $\sin$"}
degree = **not defined**
::
:::

### partly worked: you fill the blank

$$e^{\frac{d^3y}{dx^3} - x y' + y} = 0$$

:::work
:::step{reason="take natural log of both sides"}
$\frac{d^3y}{dx^3} - x y' + y = 0$
::
:::step{reason="now it is a polynomial in derivatives; highest derivative is $y'''$, power 1" fill="1"}
order = 3, degree = \_
::
:::

### blank — you do it all

$$\ln\left(\frac{d^2y}{dx^2}\right) = ax + by$$

:::work
:::step
::
:::step
::

---

## method chooser — recognise the type

:::visual{id="order-degree" caption="drag the slider to change the equation and see its order and degree update live"}
:::

---

## common mistakes

:::mistakes
:::m
dropping the constant of integration until after taking exponentials: $\ln y = x + C \implies y = e^x + C$ (wrong). $C$ must be added at integration: $\ln y = x + C \implies y = A e^x$.
::
:::m
claiming degree is undefined whenever $\sin, \cos, \ln$ appear. degree is undefined only if the **derivative** is inside the transcendental function.
::
:::m
counting every $c_i$ symbol as an independent constant. $c_1 + c_2$ is one parameter; $e^{c_1+c_2}$ is one.
::
:::