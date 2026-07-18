---
title: "Seeing Confessions Clearly: Why the Standard Score for Interrogation Methods Rewards Silence"
subtitle: "A method that gets fewer confessions is not the same thing as a method that gets better ones"
date: 2026-07-18
summary: "For two decades, interrogation research has graded techniques with a single ratio: true confessions divided by false confessions. That ratio cannot tell the difference between a method that is better at separating guilty from innocent suspects and one that simply makes confessing harder for everyone. An interactive dashboard lets you see the problem in about fifteen seconds."
tags: ["false confessions", "interrogation", "signal detection theory", "measurement"]
featured: true
---

Imagine two interrogation methods. The first is genuinely better at telling a guilty suspect from an innocent one. The second is no better at all — it just makes everyone, guilty and innocent alike, less willing to talk.

The score the field uses to rank interrogation methods can rate the second one higher.

## The measure

That score is called **diagnosticity**. It is simple: take the share of guilty suspects who confess and divide it by the share of innocent suspects who confess. A method where guilty suspects confess far more often than innocent ones gets a high number, and a high number is treated as evidence that the method produces more trustworthy confessions.

The measure entered this literature through the cheating paradigm introduced by Russano and colleagues in 2005 — the first design that included both guilty and innocent participants, and therefore the first that could compute the ratio at all. It has been used ever since to rank techniques, to compare families of methods in meta-analyses, and to argue for interrogation policy.

Our paper argues it is the wrong statistic, and that the problem is not subtle.

## Two dials, one number

Any test that produces a yes-or-no answer has two separate properties.

The first is how well it **separates** the two groups — whether it can actually tell guilty from innocent. That is the thing you care about.

The second is where the **threshold** sits — how much it takes before anyone confesses at all. That is a setting, not a skill.

Diagnosticity blends them. And the blending is not a minor contamination: in the Russano data, the ranking produced by diagnosticity matches the ranking by threshold *exactly*, method for method. It matches the ranking by separation hardly at all.

The consequence is the reversal at the center of the paper. The **No tactic** condition — simply asking, with no technique applied — posts the highest diagnosticity of the four conditions, 7.67. It also ranks only **third** of four on actually separating guilty suspects from innocent ones. It looks best because it produced the fewest confessions of any kind, not because it sorted people correctly.

Think of the metal detector at a courthouse. It has two things going on: how good the machine is at telling a handgun from a belt buckle, and where the sensitivity dial is set. Turn the sensitivity down and it almost never beeps — so a higher *proportion* of the beeps you do get are real. You have not bought a better machine. You have bought a quieter one, and you are now walking guns past it.

## Two more problems

**Diagnosticity is not a risk.** A diagnosticity of 7.67 means guilty suspects confess about 7.7 times as often as innocent ones. It does not mean a confession is 7.7 times more likely to be true. Getting to that second statement requires knowing something the ratio does not contain: how many of the people being interrogated actually did it. Laboratory studies fix that at 50-50 by design, because they assign equal numbers of guilty and innocent participants. That is a design convenience, not a finding about the field.

**And it is fragile.** The ratio divides by the false confession rate — a small number estimated from a small group. At the sample sizes this literature actually uses, roughly 37 people per group, the score is *undefined* in about one run in ten, because no innocent participant confessed and you cannot divide by zero. When it can be computed, it runs high. One published study reports a diagnosticity of 87.0 for a condition in which no innocent participant confessed at all; the value appears to come from substituting one percent for the observed zero.

That last point has a practical edge. **If someone hands you a diagnosticity figure, ask what the false confession rate was. If it was zero, that number was chosen, not measured.**

## The replacement is already in the data

The useful part is that fixing this requires no new studies. Every experiment with both guilty and innocent participants already reports the two quantities needed: a true confession rate and a false confession rate. Those are a hit rate and a false alarm rate — exactly the inputs signal detection theory has used for seventy years. From them you can report separation and threshold as distinct numbers, and say which one actually differs between two methods.

Eyewitness identification research went through this same reckoning fifteen years ago, over the same statistic, and largely abandoned it for procedure comparisons. The confession literature can make the same move at very little cost.

None of this settles whether laboratory confession paradigms capture what happens in real interrogation rooms. That is a separate and unresolved question. The narrower claim is that even granting the laboratory setup entirely on its own terms, the field's preferred summary confuses accuracy with threshold, omits the base rate needed for any risk statement, and behaves badly at the sample sizes actually in use.

## See it yourself

The dashboard below is the argument in interactive form. The centerpiece has two sliders and a checkbox that **freezes** the method's separation so it cannot change. Lock it, then drag the threshold, and watch diagnosticity move anyway.

<div style="text-align: center; margin: 30px 0;">
<a href="/dashboards/diagnosticity-sdt/dashboard.html" style="background-color: #2a6496; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block; font-weight: bold;">
Open the Interactive Dashboard
</a>
</div>

Data and code to reproduce every figure and number in the paper are at [github.com/smourtgos/diagnosticity-reproduction](https://github.com/smourtgos/diagnosticity-reproduction).

---

*Working paper: Mourtgos, S. M., Blair, P., & Adams, I. T., "Seeing Confessions Clearly: Diagnosticity, Risk, and Signal Detection." Before circulating it we shared the manuscript with Dr. Melissa B. Russano and Dr. Christian A. Meissner, two authors of the 2005 study reanalyzed here; they confirmed the paradigm is accurately described. They also noted that they do not regard themselves as having presented diagnosticity as a posterior probability, and we agree — the concern here is with how the ratio gets interpreted downstream.*
