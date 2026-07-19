---
title: "Seeing Confessions Clearly: Why the Standard Score for Interrogation Methods Rewards Silence"
subtitle: "A method that gets fewer confessions is not the same thing as a method that gets better ones"
date: 2026-07-18
summary: "For two decades, interrogation research has graded techniques with a single ratio: true confessions divided by false confessions. That ratio cannot tell the difference between a method that is better at separating guilty from innocent suspects and one that simply makes confessing harder for everyone. An interactive dashboard demonstrates the problem."
tags: ["false confessions", "interrogation", "signal detection theory", "measurement"]
featured: true
---

Imagine two interrogation methods.

The first is genuinely better at distinguishing guilty suspects from innocent ones. The second is no better at telling them apart. It simply makes everyone, guilty and innocent alike, less willing to confess.

The score commonly used to rank interrogation methods can make the second method look better.

## The measure

That score is called diagnosticity. The calculation is simple: divide the percentage of guilty suspects who confess by the percentage of innocent suspects who confess.

Suppose 60 percent of guilty suspects confess and 10 percent of innocent suspects confess. The diagnosticity is 6. Guilty suspects confessed six times as often as innocent suspects.

A high diagnosticity score is often treated as evidence that an interrogation method produces more trustworthy confessions.

The measure entered the confession literature about twenty years ago. Researchers have since used diagnosticity to rank interrogation techniques, compare groups of methods in meta-analyses, and support policy recommendations.

Our paper argues that diagnosticity is the wrong statistic for those purposes. The problem is not a minor technical detail. It can change which method appears to work best.

## Two dials, one number

Any test that produces a yes-or-no answer has two separate features.

The first is separation. How well does the test distinguish between the two groups? In this setting, how well does the interrogation method separate guilty suspects from innocent ones?

That is the ability we care about.

The second is the threshold. How much pressure or evidence does it take before anyone confesses? A high threshold produces fewer confessions from both guilty and innocent suspects. A low threshold produces more confessions from both groups.

The threshold is not the same thing as accuracy.

Diagnosticity combines separation and threshold into a single number. As a result, the score can change even when a method's ability to distinguish guilty suspects from innocent ones stays exactly the same.

This is not just a theoretical possibility. In the work that first published this measure, the ranking produced by diagnosticity matches the ranking produced by threshold exactly, method for method. It barely matches the ranking based on actual separation.

That produces the reversal at the center of our paper.

The No tactic condition, in which the experimenter simply asked for a confession without using an interrogation technique, had the highest diagnosticity of the four conditions: 7.67.

But it ranked only third out of four in its ability to separate guilty participants from innocent participants.

It looked best because it produced the fewest confessions of any kind, not because it did the best job of sorting guilty people from innocent ones.

Think about a metal detector at a courthouse.

Two things matter. One is how well the machine can distinguish a handgun from a belt buckle. The other is where the sensitivity dial is set.

Turn the sensitivity down and the machine will almost never beep. A larger share of the few alarms it does produce may involve real weapons. But the machine has not become better at detecting weapons. It has simply become quieter, and more weapons may now pass through unnoticed.

Diagnosticity can reward an interrogation method for becoming quieter in much the same way.

## Two more problems

Diagnosticity has two additional weaknesses.

First, diagnosticity is not the probability that a confession is true.

A diagnosticity of 7.67 means that guilty suspects confessed about 7.7 times as often as innocent suspects. It does not mean that a confession is 7.7 times more likely to be true than false.

To determine how likely a confession is to be true, we also need to know how many of the people being interrogated are actually guilty. That information is called the base rate.

Laboratory studies usually assign equal numbers of participants to the guilty and innocent conditions. That means the laboratory base rate is 50 percent by design. Half the participants are guilty and half are innocent.

That is useful for conducting an experiment, but it tells us nothing about the percentage of real-world suspects who are actually guilty. Diagnosticity leaves that information out, so it cannot by itself tell us the risk that a confession is false.

Second, diagnosticity is statistically fragile.

The calculation divides the true confession rate by the false confession rate. The false confession rate is often a very small number estimated from a small group of innocent participants.

At the sample sizes commonly used in this literature, about 37 people per group, diagnosticity is undefined in roughly one out of every ten repeated experiments. This happens when no innocent participant confesses. The false confession rate is then zero, and division by zero is impossible.

Even when the score can be calculated, it tends to be too high.

One published study reported a diagnosticity of 87.0 for a condition in which no innocent participant confessed. Because the observed false confession rate was zero, the reported value appears to have been produced by replacing that zero with an assumed rate of 1 percent.

That point has a simple practical lesson.

When someone reports a diagnosticity score, ask what the false confession rate was. If no innocent participant confessed, the diagnosticity value was not directly measured. It depended on a number chosen by the researcher.

## The replacement is already in the data

The good news is that fixing the problem does not require new experiments.

Every study that includes both guilty and innocent participants already reports the two pieces of information we need: the true confession rate and the false confession rate.

In signal detection theory, these are called the hit rate and the false alarm rate. Researchers have used these measures for decades to separate two different questions:

1. How well does a test distinguish one group from another?
2. Where is the threshold for producing a positive response?

Using the same approach in confession research would allow researchers to report separation and threshold as two distinct numbers. We could then tell whether one interrogation method is genuinely better at distinguishing guilty suspects from innocent ones, or whether it simply makes everyone more or less likely to confess.

Eyewitness identification researchers faced the same problem with diagnosticity about fifteen years ago. Many researchers in that field have moved away from using the ratio to compare identification procedures.

The confession literature can make the same change at very little cost because the necessary information is already being collected.

None of this answers the larger question of whether laboratory confession experiments accurately capture what happens in real interrogation rooms. That remains a separate and unresolved issue.

Our claim is narrower.

Even if we accept the laboratory experiments entirely on their own terms, the field's preferred summary measure has three serious problems. It confuses accuracy with threshold, leaves out the base rate needed to interpret the risk that a confession is false, and behaves poorly at the small sample sizes commonly used in the research.

## See it yourself

The dashboard below turns the argument into an interactive demonstration.

Its main display includes two sliders and a checkbox that holds the method's ability to separate guilty participants from innocent participants constant.

Check the box to lock separation. Then move the threshold slider.

The method's actual ability to distinguish guilty from innocent participants will not change, but its diagnosticity score will.

That is the problem.

<div style="text-align: center; margin: 30px 0;">
<a href="/dashboards/diagnosticity-sdt/dashboard.html" style="background-color: #2a6496; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block; font-weight: bold;">
Open the Interactive Dashboard
</a>
</div>

Replication data and code for the paper are available at [github.com/smourtgos/diagnosticity-reproduction](https://github.com/smourtgos/diagnosticity-reproduction).

---

*Before posting the preprint, we shared the manuscript with Doctors Russano and Meissner and invited their feedback. They noted that, to the extent the manuscript could be read as implying that Russano et al. (2005) presented diagnosticity as a measure of posterior probability, they disagreed and did not regard that as an accurate characterization of their work. We agree. As we make explicit in the paper, Russano et al. (2005) did not present diagnosticity as a posterior probability. Our concern instead arises when diagnosticity is used to draw conclusions about applied risk. They bear no responsibility for the arguments advanced here, and any remaining errors are our own.*
