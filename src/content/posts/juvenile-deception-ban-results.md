---
title: "Do Deceptive Interrogation Bans Affect Juvenile Case Resolution? Nine-State Results, Forthcoming in Crime & Delinquency"
date: 2026-08-22
summary: "Nine states banned deceptive interrogation tactics for juveniles between 2022 and 2024. Critics predicted fewer cases would be solved. Across 510,582 juvenile-involved incidents in NIBRS (2021-2024), arrest clearances did not decline after adoption --- estimates are null to modestly positive across every method --- and the one measure that fell, prosecution declinations, fell for adults in the same states too."
tags: ["juvenile justice", "interrogation", "deception bans", "NIBRS", "Bayesian DiD", "synthetic control"]
featured: true
---

> **Update (August 2026):** This post describes the final, peer-reviewed version of the study, now
> forthcoming at *Crime & Delinquency*. It replaces an earlier preliminary post based on a seven-state
> analysis; the [interactive dashboard](/dashboards/juvenile-deception-ban/dashboard.html) has been
> fully rebuilt around the accepted results.

## The question

American police may legally use deception when interrogating suspects --- fabricated evidence, false
promises of leniency. Because juveniles are especially prone to false confession under such pressure,
nine states restricted the practice for minors between 2021 and 2024: Illinois and Oregon (January
2022), Utah (May 2022), Delaware (October 2022), Indiana (July 2023), Colorado (August 2023),
Connecticut (October 2023), and Nevada and California (July 2024).

The laws had prominent critics, who predicted a concrete public-safety cost: fewer confessions, fewer
cases solved, more prosecutions refused. Our study, "Do Deceptive Interrogation Bans Affect Case
Resolution? Evidence from Juvenile Justice Reforms" (Mourtgos & Adams, forthcoming in *Crime &
Delinquency*), tests that prediction.

## What we did

Using FBI NIBRS incident data covering **510,582 serious juvenile-involved incidents** reported by
11,333 agencies from 2021 through 2024, we compare the nine adopting states to 42 never-treated state
units (including Washington, DC) on two outcomes: **arrest clearances** (the case is solved by arrest)
and **prosecution-declined exceptional clearances** (police present the case; the prosecutor refuses).
The primary model is a hierarchical Bayesian binomial-logit difference-in-differences on the
agency-month panel; each state also gets its own Bayesian synthetic control, and the results are
stress-tested with randomization inference, rank-based permutation tests, an adult-offender
triple-difference placebo, dose-response models over statute strength, and a battery of sample and
window robustness checks.

## What we found

**The predicted cost does not appear within the study period.**

- **Arrest clearances did not decline.** The primary estimate is **+2.25 percentage points** (95% CrI
  +0.99 to +3.60), with a posterior probability of any decline of 0.5%. Every one of twelve estimation
  strategies lands null-to-positive; all nine state-specific synthetic-control estimates are positive
  (only Indiana's credible interval excludes zero). By the paper's primary frequentist standard ---
  randomization inference, because nine treated clusters are too few for reliable clustered standard
  errors --- the pooled effect is not statistically significant (p = .47): the honest headline is "no
  decline," not "bans raised clearances." We report the positive drift as descriptive, not causal.
- **The strictest laws show no penalty.** A dose-response model over a statute-strength composite finds
  the strongest laws (Oregon, Connecticut) associated with the *largest positive* annual drift in
  arrest clearances (+2.28 pp/yr, CrI +1.00 to +3.51) --- the opposite of the critics' corollary.
- **Prosecution declinations fell, but not just for juveniles.** Declinations drifted down in ban
  states (-0.26 pp, P(increase) = .13) --- the opposite of the predicted surge. Adult cases in the same
  states show a comparable decline, and the juvenile-minus-adult triple-difference is null (-0.27 pp,
  CrI -1.11 to +0.49), so the pattern is not attributable to the juvenile bans.
- **Confession-heavy crimes show no collapse.** Murder and sex-crime clearances --- where
  interrogation evidence matters most --- show no change in either direction.

Honest limits: Nevada and California contribute only about six post-ban months; pre-trend tests reject
equal slopes for both outcomes (for arrest clearance the divergence biases *against* the positive
finding; for prosecution declined it warrants genuine caution); and we observe case outcomes, not
interrogation practice, so mechanisms remain unmeasured.

## Explore the results

The full walkthrough --- the nine statutes and their strength coding, the twelve-method forest plot,
state-by-state synthetic controls, dose-response, the adult placebo, subgroup and offense-specific
estimates, and the robustness suite --- is in the interactive dashboard:

<div style="text-align: center; margin: 30px 0;">
<a href="/dashboards/juvenile-deception-ban/dashboard.html" style="background-color: #2a6496; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block; font-weight: bold;">
Open the Interactive Dashboard
</a>
</div>

## Methods summary

- **Primary estimator**: hierarchical Bayesian binomial-logit difference-in-differences with random
  treatment slopes at the state and agency level (brms/CmdStan), incident-weighted average marginal
  effects
- **State-specific**: Bayesian synthetic control models with AR(1) latent structure, one per treated
  state
- **Frequentist convergence**: two-way fixed effects with two-way clustering, randomization inference
  (500 permutations; the primary significance measure), rank-based permutation tests (10,000
  permutations), augmented synthetic control (multisynth)
- **Placebos and robustness**: adult-offender triple-difference, leave-one-state-out, drop-California
  refit, consistent-reporter restriction, extended 2016-2024 panel, pre-trend diagnostics
