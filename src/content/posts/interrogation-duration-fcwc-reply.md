---
title: "Does a Six-Hour Interrogation Carry a 10% Risk of Wrongful Conviction? A Reply to Smith and Colleagues, Forthcoming in the Journal of Criminal Justice"
date: 2026-09-19
summary: "Smith et al. replicated our analysis of false confession wrongful conviction risk, then extended it to ask whether that risk rises with interrogation duration, reporting roughly 10% at six hours and 25% at twelve. Changing only which false confession study supplies one of the two duration distributions moves the twelve-hour estimate from 26.3% to 72.6%. A comparison drawn from both groups of a single study never reaches 10% at any duration we evaluated."
tags: ["false confessions", "interrogation", "wrongful convictions", "Bayesian", "measurement", "replication"]
featured: true
---

> **Status:** This paper is forthcoming in the *Journal of Criminal Justice*. The DOI will be added
> here once it is published. All data and code are already available at
> [github.com/smourtgos/fcwc-duration-reply](https://github.com/smourtgos/fcwc-duration-reply).

## The exchange

In 2026 we published an analysis in the *Journal of Criminal Justice* arguing that the false
confession literature cannot currently estimate the population risk that a lawful interrogation tactic
contributes to a wrongful conviction (Mourtgos & Adams, 2026). The obstacle is not the quality of the
research. It is that studies assembled from known false confession cases cannot supply a denominator:
the much larger population of interrogations that did *not* produce a false confession wrongful
conviction (FCWC).

Smith and colleagues (2026) responded — and did something unusual and genuinely valuable. They
independently reconstructed our analysis and reproduced its results. Replications of this kind remain
rare in criminology, and we welcome the effort. Their replication also confirms the central point of
the original article: the existing literature does not contain the empirical likelihoods needed to
estimate FCWC risk under different interrogation tactics.

They then asked a different question. Rather than conditioning on tactics, they conditioned on
**interrogation duration**, and reported FCWC risk of roughly 1% at one to two hours, **10% at about
six hours**, and **25% at about twelve**. Those are specific, policy-relevant numbers. Our reply asks
whether the available evidence supports them.

## What we did

We recalculated Smith et al.'s duration model using their own study inputs and model functions, taken
from their deposited code, and retaining their lognormal distributions and 0–48-hour truncation. Unless
otherwise noted, we fixed the FCWC base rate at .019 so that only the duration inputs changed. We then
varied, one at a time, the choices the model requires an analyst to make: which false confession study
supplies the FCWC duration distribution, which studies form the comparison group, how those components
are weighted, and how much spread the comparison distribution is assumed to have.

## What we found

**The reported thresholds are not stable estimates of population risk.**

- **Changing one study nearly triples the twelve-hour estimate.** Smith et al. motivate the duration
  contrast with Drizin and Leo's (2004) documented false confession cases (mean 16.3 hours), but the
  model actually uses Redlich et al. (2011): 35 people with serious mental illness who self-reported a
  false confession, with a mean *total* questioning time of 3.07 hours across multiple sittings. At
  12.06 hours, the published Redlich-only specification gives **26.3%**. Including both sources gives
  **62.1%**. Using Drizin and Leo alone gives **72.6%**. Nothing else changes. These estimates do not
  bracket a true value; they show that the answer is determined substantially by inputs that neither
  study was designed to estimate.
- **A comparison within a single study never reaches 10%.** Redlich et al. (2011) allow a more
  comparable check, because both confession groups came from the same population and answered the same
  questions. Keeping the false confession curve and replacing the pooled comparison group with
  Redlich's own 30 true confessors, estimated risk falls from 10.6% to **3.6%** at 6.28 hours and from
  26.3% to **4.0%** at 12.06 hours, never exceeding about 4.2% across the evaluated range. This is not
  a corrected population estimate — that sample is small, retrospective, and restricted to persons
  with serious mental illness. What it shows is that the sharp increase in the published model does
  not come from the difference observed *within* that study. It appears when that study's false
  confessors are compared against the narrower pooled distribution assembled from other sources.
- **The two distributions are not measuring the same thing.** The comparison group pools twelve sets of
  summary statistics from eight studies, weighted by sample size — but the sample sizes count
  different things. About **62.4%** of the weight comes from officer surveys, 16.0% from suspects'
  retrospective reports, and 21.6% from recorded interrogations. Kassin et al.'s (2007) *n* = 601
  counts officers estimating their typical interrogation length; Kelly et al.'s (2016) *n* = 29 counts
  29 recorded interrogations. Weighting by sample size gives the officer survey roughly **21 times**
  the influence, although the two count and measure different things. The same issue affects the
  reported variation: Kassin et al.'s standard deviation describes variation across *officers'
  estimates*, not across individual interrogations, yet the model uses it to determine how often
  individual interrogations run into the right tail.
- **Six hours is not a stable feature of the data.** The thresholds sit far out in the tails of fitted
  curves. Under the published specification only about **0.116%** of the fitted comparison distribution
  lies above 12.06 hours, and 0.0024% above 34 hours — outputs of an assumed curve, not observed
  frequencies. Widening each comparison component's log-scale spread by 25% moves the 10% crossing from
  6.07 to **14.75 hours**; widening it by 50% eliminates the crossing entirely; narrowing it by 25%
  moves it to **3.93 hours**. Composition matters too: 7.20 hours with equal weights, 8.69 hours
  without the officer surveys, 6.62 hours using recorded interrogations only.
- **The threshold is uncertain even within the published specification.** Applying Smith et al.'s own
  bootstrap procedure to both duration likelihoods and carrying the draws through Bayes' theorem, with
  the base rate fixed, gives a 95% interval of about **5.7%–14.6% at 6.28 hours** and **7.1%–42.3% at
  12.06 hours**. At the point where the published estimate reaches 10%, uncertainty in the fitted
  likelihoods places the risk on either side of that threshold.

We also address three further issues the response raises: that completed interrogation duration is
partly an *outcome* rather than pure exposure (a suspect who confesses at hour two and is questioned
four hours more is coded as a six-hour interrogation); that shifting the estimand from P(FCWC) to
P(FC | WC) answers a different question rather than supplying the missing denominator; and that the
problem we identified is not collider bias, which requires a causal structure neither analysis
specifies.

**What this does not show.** These analyses do not establish that prolonged interrogation is safe, or
that duration is unrelated to FCWC. Prolonged interrogations may well increase risk. The finding is
narrower and about measurement: the available studies do not identify the *magnitude* of the
relationship, and the six-hour threshold is a product of selected inputs and fitted tails rather than a
risk boundary established by observed interrogations.

## Where we agree

More of this exchange is agreement than disagreement.
Smith et al.'s replication is a real contribution, and it confirms our central result. Both papers
agree on what the field should do next: code actual interrogations for tactic presence, duration, and
outcome as recordings become more widely available. Both agree that even a 1% FCWC rate would be
problematic — as the original article put it, a society may judge even low probabilities unacceptable,
and such judgments are ethical and political rather than empirical.

The disagreement is narrower than it may appear. It concerns whether the available evidence establishes
the magnitude of the risk. The seriousness of an outcome informs how much risk society should tolerate;
it cannot establish how frequently that outcome occurs.

Recording alone, though, will not supply the denominator. Researchers would also need to define the
population from which interrogations are sampled, distinguish individual sessions from cumulative
questioning, record the time of the first admission, link interrogation characteristics to case
outcomes, and distinguish a false confession from one that contributed to a wrongful conviction.

## Explore the results

Every figure in the dashboard below is computed live in your browser from the published model. Move the
duration slider and watch the three source choices diverge; scale the comparison curve's spread and
watch the six-hour threshold move between roughly four and fifteen hours; swap the comparison group and
watch it disappear entirely.

<div style="text-align: center; margin: 30px 0;">
<a href="/dashboards/fcwc-duration/dashboard.html" style="background-color: #2a6496; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block; font-weight: bold;">
Open the Interactive Dashboard
</a>
</div>

## Methods summary

- **Model**: Smith et al.'s (2026) duration model, reusing their study inputs and model functions from
  their deposited code — mixtures of 0–48-hour truncated lognormal densities for FCWC and non-FCWC
  interrogations, combined with a base rate through Bayes' theorem
- **Base rate**: fixed at .019 throughout, so that only the duration inputs vary. Smith et al.'s
  published results use base-rate draws and report posterior medians, so their values and ours are not
  computed the same way
- **Sensitivity analyses**: alternative FCWC sources (Redlich only, both sources sample-size weighted,
  Drizin & Leo only); alternative comparison groups (published pooled, equal weights, officer surveys
  excluded, recorded interrogations only, within-study); log-scale spread scaled by ×0.75 to ×1.5
- **Uncertainty**: Smith et al.'s parametric-bootstrap likelihood procedure applied to both duration
  likelihoods, 400 replications, carried through Bayes' theorem at a fixed base rate
- **Reproducibility**: one script reproduces every number and figure in the reply;
  [github.com/smourtgos/fcwc-duration-reply](https://github.com/smourtgos/fcwc-duration-reply)

## References

Mourtgos, S. M., & Adams, I. T. (forthcoming). Interrogation duration and the estimation of false
confession wrongful conviction risk: A reply to Smith and colleagues. *Journal of Criminal Justice*.

Mourtgos, S. M., & Adams, I. T. (2026). Recalibrating the risk of false confession wrongful
convictions: Interrogation tactics and inverse probability. *Journal of Criminal Justice, 103*, 102600.
[https://doi.org/10.1016/j.jcrimjus.2026.102600](https://doi.org/10.1016/j.jcrimjus.2026.102600)

Smith, T. B., Catlin, M., May, B., Redlich, A. D., Meissner, C. A., & Kelly, C. E. (2026). Simulating
the probability of false confession-wrongful conviction conditional on features of police interrogation:
A response to Mourtgos and Adams (2026). *Journal of Criminal Justice, 107*, 102742.
[https://doi.org/10.1016/j.jcrimjus.2026.102742](https://doi.org/10.1016/j.jcrimjus.2026.102742)
