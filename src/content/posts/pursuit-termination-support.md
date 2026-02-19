---
title: "State-Level Patterns in Support for Calling Off Police Pursuits"
date: 2025-07-25
summary: "Where do Americans most support calling off police pursuits---and what factors drive those differences?"
tags: ["public opinion", "police pursuits", "termination decisions", "state variation", "geographic analysis"]
featured: true
---

**Author:**

- [Scott M. Mourtgos](https://smourtgos.netlify.app/)

**Based on data from a May 2025 nationally representative survey experiment (N ~ 3,300).**

### From Risk Evaluations to State-Level Patterns

Earlier this year, my colleagues Geoff Alpert, [Ian Adams](https://ianadamsresearch.com/), Kyle McLean, and I fielded a nationally representative conjoint survey experiment asking Americans to evaluate police pursuit scenarios. Each scenario varied on eleven factors: offense type, speed, traffic, weather, and more. Respondents indicated both how risky they thought the pursuit was and whether they would end it.

Those results (which we'll share in detail soon) showed that public preferences track closely with the proportional, risk-benefit reasoning embedded in modern pursuit policy. High-risk situations increased support for ending a pursuit, while more serious offenses reduced it.

I am always fascinated by geographic variation in public opinion on policing issues, so I was left with a separate question: *Do these preferences vary meaningfully by state---and if so, why?*

### Measuring State-Level Support

To find out, I aggregated the pursuit termination responses at the state level. The results? There is variation in how willing the public is to call off pursuits across states.

![Map of state-level support for calling off police pursuits](/images/posts/pursuit-termination-support/termination_support_map.png)

Some states show higher support for ending pursuits; others, less. The challenge is explaining *why*.

### Three Possible Explanations

I tested three state-level predictors that might influence public attitudes:

- Pursuit-related fatalities per 100,000 residents (2017-2022)[^1]
- State political lean[^2]
- Crime rates, residualized to remove overlap with pursuit fatalities[^3]

### All Three Matter

Using a multilevel Bayesian model, all three predictors showed credible positive effects:

- States with higher pursuit fatality rates lead to more support for ending pursuits
- More Democrat-leaning states show more support (not a value judgment, simply an observation from the data)
- Higher residualized crime rates correspond with more support

The posterior distributions for all three were shifted well into the positive range, indicating these are likely not just statistical noise.

I combined these weighted effects into a composite index to capture where state context most strongly aligns with public willingness to terminate pursuits.

![Composite support map showing where state context most strongly aligns with public willingness to terminate pursuits](/images/posts/pursuit-termination-support/composite_support_map.png)

### Risk Still Drives Most of the Decision

It's important to keep these results in perspective. While the state-level factors add credible explanatory power, the bulk of what drives termination judgments is still the risk evaluation inside each pursuit scenario.

The full model's Bayesian R-squared is ~0.28. Most of that variance is explained by the pursuit-specific attributes (speed, traffic, weather, location, offense seriousness, etc.), not by state context. The three state-level variables move the needle, but only modestly compared to the weight respondents place on the immediate risks in front of them.

![Posterior density plots for the three state-level predictor variables](/images/posts/pursuit-termination-support/posterior_densities_state_vars.png)

### Closing the Loop

In short:

* The main study shows the public's pursuit termination decisions largely follow a structured, proportional risk-benefit logic (again, we should be able to share these results soon).
* At the state level, there's variation, and three factors (pursuit fatalities, political lean, and crime) help explain it.
* However, most of the explanatory power still comes from how people interpret the risk factors in each scenario, not from the broader context they live in.

### Why This Matters

State-level variation in public preferences has practical implications:

- **Policy alignment:** Where support is already high, restrictive pursuit policies may face less pushback.
- **Policy communication:** Where support is low despite high fatality rates, explaining the risk-benefit rationale may be prudent.
- **Context awareness:** State-level political lean, crime context, and pursuit fatality prevalence appear to have some level of influence on public tolerance for pursuit risks.

At the same time, the results also show a unifying pattern: **regardless of state**, the public tends to apply the same basic risk-benefit logic embedded in modern pursuit policy. High-risk situations increase support for ending a pursuit, while more serious offenses reduce it. The state-level context may shift the baseline up or down, but the underlying decision process looks remarkably consistent nationwide.

> Citation: Mourtgos, S. M. (2025). State-Level Patterns in Support for Calling Off Police Pursuits. [Link](https://smourtgos.netlify.app/post/pursuit-termination-support/)

[^1]: Fatality data from the San Francisco Chronicle pursuit database. State populations from US Census 2024 estimates.
[^2]: Party lean data from [World Population Review](https://worldpopulationreview.com/state-rankings/political-parties-by-state)
[^3]: Crime rates from [World Population Review](https://worldpopulationreview.com/state-rankings/crime-rate-by-state). Because states with higher crime rates are more likely to have more police pursuits, and therefore more pursuit-related fatalities, I residualized crime on fatalities. This approach removes the portion of crime rates that simply reflects their correlation with fatalities, allowing the isolation of the independent association between crime context and pursuit termination support.
