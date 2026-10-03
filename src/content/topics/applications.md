---
title: "applications: growth, cooling, mixing, motion"
description: "where the maths meets the world — populations, radioactive clocks, cooling coffee, tanks of salt, and an RL circuit switching on"
---

## before any formula — what do these have in common?

growth, decay, cooling, mixing, circuits — they all say: **rate of change is proportional to something**.

| phenomenon | "something" | differential equation |
|------------|-------------|----------------------|
| exponential growth | current amount | $dP/dt = rP$ |
| radioactive decay | current amount | $dN/dt = -\lambda N$ |
| Newton's cooling | temperature difference | $dT/dt = -k(T-T_s)$ |
| mixing tank | concentration difference | $dm/dt = r_{in}c_{in} - r_{out}(m/V)$ |
| RL circuit | voltage difference | $L\,di/dt + Ri = E$ |

all are **first-order linear** (or separable) — the methods you already know solve them.

---

## Newton's law of cooling

the rate of heat loss is proportional to the temperature difference with the surroundings:

$$\frac{dT}{dt} = -k(T - T_s), \quad k > 0$$

solution: $T(t) = T_s + (T_0 - T_s)e^{-kt}$

:::visual{id="growth-cooling" caption="sliders for $T_0$, $T_s$, $k$ — watch the curve and equation update live"}
:::

:::predict{q="a cup of coffee at $90^\circ\text{C}$ in a $20^\circ\text{C}$ room cools to $70^\circ\text{C}$ in 5 minutes. will it reach $40^\circ\text{C}$ in another 5 minutes? another 10?"}
:::choice
yes, it drops by $20^\circ$ every 5 minutes
::
:::choice{correct}
no — it drops by $20^\circ$ the first 5 min, then by $10^\circ$ the next 5 min, then by $5^\circ$... the gap halves each time
::
:::reveal
the solution is $T(t) = 20 + 70e^{-kt}$. from $T(5)=70$: $70 = 20 + 70e^{-5k} \implies e^{-5k} = 5/7$. then $T(10) = 20 + 70(5/7)^2 = 20 + 70(25/49) \approx 55.7^\circ$. the drop slows down exponentially.
::
:::

---

## growth and decay

| type | ODE | solution | key constant |
|------|-----|----------|--------------|
| exponential growth | $dP/dt = rP$ | $P = P_0 e^{rt}$ | $r$ |
| radioactive decay | $dN/dt = -\lambda N$ | $N = N_0 e^{-\lambda t}$ | $\lambda$ |
| half-life | — | $t_{1/2} = \ln 2/\lambda \approx 0.693/\lambda$ | — |
| logistic growth | $dP/dt = rP(1-P/K)$ | $P = \frac{K}{1+\frac{K-P_0}{P_0}e^{-rt}}$ | $K$ = carrying capacity |

logistic inflection at $P = K/2$ (maximum growth rate).

---

## mixing tank

a tank holds $V_0$ litres with $m_0$ grams of solute. inflow at $r_{in}$ with concentration $c_{in}$; outflow at $r_{out}$.

$$V(t) = V_0 + (r_{in} - r_{out})t$$
$$\frac{dm}{dt} = r_{in}c_{in} - r_{out}\frac{m(t)}{V(t)}$$

this is linear: $\frac{dm}{dt} + \frac{r_{out}}{V(t)}m = r_{in}c_{in}$.

:::visual{id="mixing" caption="sliders for $r_{in}$, $c_{in}$, $r_{out}$, $V_0$, $m_0$ — watch concentration curve"}
:::

---

## RL circuit

series RL: $L\frac{di}{dt} + Ri = E$

solution with $i(0)=0$: $i(t) = \frac{E}{R}(1 - e^{-t/\tau}), \quad \tau = L/R$

time constant $\tau$: at $t=\tau$, $i \approx 0.63 I_{\max}$.

---

## worked examples that fade

### fully worked: Newton's cooling — find $k$ and predict

a body cools from $80^\circ$ to $60^\circ$ in 10 min, ambient $20^\circ$. find temperature after 20 min.

:::work
:::step{reason="solution form: $T(t) = 20 + 60e^{-kt}$ (since $T_0=80$)"}
$T(t) = T_s + (T_0-T_s)e^{-kt} = 20 + 60e^{-kt}$
::
:::step{reason="use $T(10)=60$ to find $k$" fill="e^{-10k} = 2/3"}
$60 = 20 + 60e^{-10k} \implies 40 = 60e^{-10k} \implies e^{-10k} = \_$
::
:::step{reason="find $T(20)$" fill="T(20) = 20 + 60(2/3)^2 = 20 + 60(4/9) = 46.7^\circ"}
$T(20) = 20 + 60e^{-20k} = 20 + 60(e^{-10k})^2 = 20 + 60(\_)^2 = \_$
::
:::

### partly worked: you fill the blank

logistic growth: $dP/dt = 0.1 P(1 - P/1000)$, $P(0)=100$. find $P(20)$.

:::work
:::step{reason="logistic solution: $P(t) = \frac{K}{1+(\frac{K-P_0}{P_0})e^{-rt}}$"}
$K=1000, r=0.1, P_0=100 \implies \frac{K-P_0}{P_0} = 9$
::
:::step{reason="plug in" fill="P(t) = \frac{1000}{1+9e^{-0.1t}}"}
$P(t) = \_$
::
:::step{reason="evaluate at $t=20$" fill="P(20) = \frac{1000}{1+9e^{-2}} \approx 476"}
$P(20) = \frac{1000}{1+9e^{-2}} = \_$
::
:::

### blank — you do it all

RL circuit: $L=2$ H, $R=10\ \Omega$, $E=50$ V, $i(0)=0$. find $i(0.5)$.

:::work
:::step
::
:::step
::
:::step
::

---

## method chooser — recognise the type

:::visual{id="growth-cooling" caption="pick an application, adjust parameters, see the model and solution"}
:::

---

## common mistakes

:::mistakes
:::m
using $dT/dt = -kT$ instead of $dT/dt = -k(T-T_s)$. the rate depends on the **difference** from ambient.
::
:::m
in mixing, forgetting that $V(t)$ changes if $r_{in} \neq r_{out}$. the coefficient $r_{out}/V(t)$ is time-dependent.
::
:::m
confusing half-life formula: $t_{1/2} = \ln 2/\lambda$, not $1/\lambda$ or $\ln\lambda$.
::
:::m
in logistic growth, forgetting the inflection point is at $P=K/2$ (maximum growth rate).
::
:::m
in RL circuit, using $\tau = R/L$ instead of $L/R$. check units: $L/R$ is seconds.
::
:::