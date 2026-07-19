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

<figure>
<svg viewBox="0 0 640 230" width="100%" role="img" aria-labelledby="f2t" style="max-width:640px;height:auto;font-family:inherit">
<title id="f2t">Two panels with identical guilty and innocent distributions. Only the confession threshold moves, yet diagnosticity changes from 2.34 to 7.67.</title>
<text x="8" y="14" font-size="12" font-weight="700" fill="currentColor" opacity="0.75">SAME METHOD. SAME ABILITY TO TELL GUILTY FROM INNOCENT.</text>
<g transform="translate(8,26)"><rect x="0" y="0" width="300" height="140" rx="8" fill="currentColor" opacity="0.04"/><path d="M135.0,118.0 L135.0,20.8 L135.0,20.8 L138.0,23.6 L141.0,26.9 L144.0,30.7 L147.0,34.8 L150.0,39.2 L153.0,43.9 L156.0,48.8 L159.0,53.7 L162.0,58.7 L165.0,63.7 L168.0,68.5 L171.0,73.2 L174.0,77.7 L177.0,82.0 L180.0,86.0 L183.0,89.8 L186.0,93.3 L189.0,96.5 L192.0,99.4 L195.0,102.0 L198.0,104.3 L201.0,106.4 L204.0,108.2 L207.0,109.8 L210.0,111.2 L213.0,112.3 L216.0,113.3 L219.0,114.2 L222.0,114.9 L225.0,115.5 L228.0,116.0 L231.0,116.4 L234.0,116.7 L237.0,117.0 L240.0,117.2 L243.0,117.4 L246.0,117.5 L249.0,117.6 L252.0,117.7 L255.0,117.8 L258.0,117.8 L261.0,117.9 L264.0,117.9 L267.0,117.9 L270.0,118.0 L273.0,118.0 L276.0,118.0 L279.0,118.0 L282.0,118.0 L285.0,118.0 L288.0,118.0 L291.0,118.0 L294.0,118.0 L297.0,118.0 L300.0,118.0 L300.0,118.0 Z" fill="#3b82f6" opacity="0.30"/><path d="M135.0,118.0 L135.0,63.7 L135.0,63.7 L138.0,58.7 L141.0,53.7 L144.0,48.8 L147.0,43.9 L150.0,39.2 L153.0,34.8 L156.0,30.7 L159.0,26.9 L162.0,23.6 L165.0,20.8 L168.0,18.5 L171.0,16.8 L174.0,15.8 L177.0,15.4 L180.0,15.7 L183.0,16.6 L186.0,18.2 L189.0,20.3 L192.0,23.0 L195.0,26.3 L198.0,30.0 L201.0,34.0 L204.0,38.4 L207.0,43.1 L210.0,47.9 L213.0,52.8 L216.0,57.8 L219.0,62.8 L222.0,67.6 L225.0,72.4 L228.0,76.9 L231.0,81.2 L234.0,85.3 L237.0,89.1 L240.0,92.7 L243.0,95.9 L246.0,98.9 L249.0,101.5 L252.0,103.9 L255.0,106.0 L258.0,107.9 L261.0,109.5 L264.0,110.9 L267.0,112.1 L270.0,113.2 L273.0,114.1 L276.0,114.8 L279.0,115.4 L282.0,115.9 L285.0,116.3 L288.0,116.7 L291.0,117.0 L294.0,117.2 L297.0,117.4 L300.0,117.5 L300.0,118.0 Z" fill="#f97316" opacity="0.30"/><path d="M0.0,117.5 L3.0,117.4 L6.0,117.2 L9.0,117.0 L12.0,116.7 L15.0,116.3 L18.0,115.9 L21.0,115.4 L24.0,114.8 L27.0,114.1 L30.0,113.2 L33.0,112.1 L36.0,110.9 L39.0,109.5 L42.0,107.9 L45.0,106.0 L48.0,103.9 L51.0,101.5 L54.0,98.9 L57.0,95.9 L60.0,92.7 L63.0,89.1 L66.0,85.3 L69.0,81.2 L72.0,76.9 L75.0,72.4 L78.0,67.6 L81.0,62.8 L84.0,57.8 L87.0,52.8 L90.0,47.9 L93.0,43.1 L96.0,38.4 L99.0,34.0 L102.0,30.0 L105.0,26.3 L108.0,23.0 L111.0,20.3 L114.0,18.2 L117.0,16.6 L120.0,15.7 L123.0,15.4 L126.0,15.8 L129.0,16.8 L132.0,18.5 L135.0,20.8 L138.0,23.6 L141.0,26.9 L144.0,30.7 L147.0,34.8 L150.0,39.2 L153.0,43.9 L156.0,48.8 L159.0,53.7 L162.0,58.7 L165.0,63.7 L168.0,68.5 L171.0,73.2 L174.0,77.7 L177.0,82.0 L180.0,86.0 L183.0,89.8 L186.0,93.3 L189.0,96.5 L192.0,99.4 L195.0,102.0 L198.0,104.3 L201.0,106.4 L204.0,108.2 L207.0,109.8 L210.0,111.2 L213.0,112.3 L216.0,113.3 L219.0,114.2 L222.0,114.9 L225.0,115.5 L228.0,116.0 L231.0,116.4 L234.0,116.7 L237.0,117.0 L240.0,117.2 L243.0,117.4 L246.0,117.5 L249.0,117.6 L252.0,117.7 L255.0,117.8 L258.0,117.8 L261.0,117.9 L264.0,117.9 L267.0,117.9 L270.0,118.0 L273.0,118.0 L276.0,118.0 L279.0,118.0 L282.0,118.0 L285.0,118.0 L288.0,118.0 L291.0,118.0 L294.0,118.0 L297.0,118.0 L300.0,118.0" fill="none" stroke="#3b82f6" stroke-width="2"/><path d="M0.0,118.0 L3.0,118.0 L6.0,118.0 L9.0,118.0 L12.0,118.0 L15.0,118.0 L18.0,118.0 L21.0,118.0 L24.0,118.0 L27.0,118.0 L30.0,118.0 L33.0,117.9 L36.0,117.9 L39.0,117.9 L42.0,117.8 L45.0,117.8 L48.0,117.7 L51.0,117.6 L54.0,117.5 L57.0,117.4 L60.0,117.2 L63.0,117.0 L66.0,116.7 L69.0,116.4 L72.0,116.0 L75.0,115.5 L78.0,114.9 L81.0,114.2 L84.0,113.3 L87.0,112.3 L90.0,111.2 L93.0,109.8 L96.0,108.2 L99.0,106.4 L102.0,104.3 L105.0,102.0 L108.0,99.4 L111.0,96.5 L114.0,93.3 L117.0,89.8 L120.0,86.0 L123.0,82.0 L126.0,77.7 L129.0,73.2 L132.0,68.5 L135.0,63.7 L138.0,58.7 L141.0,53.7 L144.0,48.8 L147.0,43.9 L150.0,39.2 L153.0,34.8 L156.0,30.7 L159.0,26.9 L162.0,23.6 L165.0,20.8 L168.0,18.5 L171.0,16.8 L174.0,15.8 L177.0,15.4 L180.0,15.7 L183.0,16.6 L186.0,18.2 L189.0,20.3 L192.0,23.0 L195.0,26.3 L198.0,30.0 L201.0,34.0 L204.0,38.4 L207.0,43.1 L210.0,47.9 L213.0,52.8 L216.0,57.8 L219.0,62.8 L222.0,67.6 L225.0,72.4 L228.0,76.9 L231.0,81.2 L234.0,85.3 L237.0,89.1 L240.0,92.7 L243.0,95.9 L246.0,98.9 L249.0,101.5 L252.0,103.9 L255.0,106.0 L258.0,107.9 L261.0,109.5 L264.0,110.9 L267.0,112.1 L270.0,113.2 L273.0,114.1 L276.0,114.8 L279.0,115.4 L282.0,115.9 L285.0,116.3 L288.0,116.7 L291.0,117.0 L294.0,117.2 L297.0,117.4 L300.0,117.5" fill="none" stroke="#f97316" stroke-width="2"/><line x1="0" y1="118" x2="300" y2="118" stroke="currentColor" stroke-width="1" opacity="0.35"/><line x1="135" y1="14" x2="135" y2="118" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.85"/><text x="135" y="10" font-size="10.5" text-anchor="middle" fill="currentColor" opacity="0.8">threshold</text><text x="150" y="134" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.65">Low threshold</text><text x="150" y="152" font-size="14" text-anchor="middle" font-weight="700" fill="currentColor">Diagnosticity = 2.34</text><text x="150" y="168" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.65">87% of guilty confess &#183; 37% of innocent confess</text></g><g transform="translate(332,26)"><rect x="0" y="0" width="300" height="140" rx="8" fill="currentColor" opacity="0.04"/><path d="M181.0,118.0 L181.0,87.4 L181.0,87.4 L184.0,91.0 L187.0,94.4 L190.0,97.5 L193.0,100.3 L196.0,102.8 L199.0,105.1 L202.0,107.0 L205.0,108.8 L208.0,110.3 L211.0,111.6 L214.0,112.7 L217.0,113.7 L220.0,114.5 L223.0,115.1 L226.0,115.7 L229.0,116.2 L232.0,116.5 L235.0,116.8 L238.0,117.1 L241.0,117.3 L244.0,117.5 L247.0,117.6 L250.0,117.7 L253.0,117.8 L256.0,117.8 L259.0,117.9 L262.0,117.9 L265.0,117.9 L268.0,117.9 L271.0,118.0 L274.0,118.0 L277.0,118.0 L280.0,118.0 L283.0,118.0 L286.0,118.0 L289.0,118.0 L292.0,118.0 L295.0,118.0 L298.0,118.0 L300.0,118.0 Z" fill="#3b82f6" opacity="0.30"/><path d="M181.0,118.0 L181.0,15.9 L181.0,15.9 L184.0,17.1 L187.0,18.8 L190.0,21.2 L193.0,24.1 L196.0,27.5 L199.0,31.3 L202.0,35.5 L205.0,40.0 L208.0,44.7 L211.0,49.6 L214.0,54.6 L217.0,59.5 L220.0,64.5 L223.0,69.3 L226.0,74.0 L229.0,78.4 L232.0,82.7 L235.0,86.7 L238.0,90.4 L241.0,93.8 L244.0,97.0 L247.0,99.8 L250.0,102.4 L253.0,104.7 L256.0,106.7 L259.0,108.5 L262.0,110.0 L265.0,111.4 L268.0,112.5 L271.0,113.5 L274.0,114.3 L277.0,115.0 L280.0,115.6 L283.0,116.1 L286.0,116.5 L289.0,116.8 L292.0,117.1 L295.0,117.3 L298.0,117.4 L300.0,118.0 Z" fill="#f97316" opacity="0.30"/><path d="M0.0,117.5 L3.0,117.4 L6.0,117.2 L9.0,117.0 L12.0,116.7 L15.0,116.3 L18.0,115.9 L21.0,115.4 L24.0,114.8 L27.0,114.1 L30.0,113.2 L33.0,112.1 L36.0,110.9 L39.0,109.5 L42.0,107.9 L45.0,106.0 L48.0,103.9 L51.0,101.5 L54.0,98.9 L57.0,95.9 L60.0,92.7 L63.0,89.1 L66.0,85.3 L69.0,81.2 L72.0,76.9 L75.0,72.4 L78.0,67.6 L81.0,62.8 L84.0,57.8 L87.0,52.8 L90.0,47.9 L93.0,43.1 L96.0,38.4 L99.0,34.0 L102.0,30.0 L105.0,26.3 L108.0,23.0 L111.0,20.3 L114.0,18.2 L117.0,16.6 L120.0,15.7 L123.0,15.4 L126.0,15.8 L129.0,16.8 L132.0,18.5 L135.0,20.8 L138.0,23.6 L141.0,26.9 L144.0,30.7 L147.0,34.8 L150.0,39.2 L153.0,43.9 L156.0,48.8 L159.0,53.7 L162.0,58.7 L165.0,63.7 L168.0,68.5 L171.0,73.2 L174.0,77.7 L177.0,82.0 L180.0,86.0 L183.0,89.8 L186.0,93.3 L189.0,96.5 L192.0,99.4 L195.0,102.0 L198.0,104.3 L201.0,106.4 L204.0,108.2 L207.0,109.8 L210.0,111.2 L213.0,112.3 L216.0,113.3 L219.0,114.2 L222.0,114.9 L225.0,115.5 L228.0,116.0 L231.0,116.4 L234.0,116.7 L237.0,117.0 L240.0,117.2 L243.0,117.4 L246.0,117.5 L249.0,117.6 L252.0,117.7 L255.0,117.8 L258.0,117.8 L261.0,117.9 L264.0,117.9 L267.0,117.9 L270.0,118.0 L273.0,118.0 L276.0,118.0 L279.0,118.0 L282.0,118.0 L285.0,118.0 L288.0,118.0 L291.0,118.0 L294.0,118.0 L297.0,118.0 L300.0,118.0" fill="none" stroke="#3b82f6" stroke-width="2"/><path d="M0.0,118.0 L3.0,118.0 L6.0,118.0 L9.0,118.0 L12.0,118.0 L15.0,118.0 L18.0,118.0 L21.0,118.0 L24.0,118.0 L27.0,118.0 L30.0,118.0 L33.0,117.9 L36.0,117.9 L39.0,117.9 L42.0,117.8 L45.0,117.8 L48.0,117.7 L51.0,117.6 L54.0,117.5 L57.0,117.4 L60.0,117.2 L63.0,117.0 L66.0,116.7 L69.0,116.4 L72.0,116.0 L75.0,115.5 L78.0,114.9 L81.0,114.2 L84.0,113.3 L87.0,112.3 L90.0,111.2 L93.0,109.8 L96.0,108.2 L99.0,106.4 L102.0,104.3 L105.0,102.0 L108.0,99.4 L111.0,96.5 L114.0,93.3 L117.0,89.8 L120.0,86.0 L123.0,82.0 L126.0,77.7 L129.0,73.2 L132.0,68.5 L135.0,63.7 L138.0,58.7 L141.0,53.7 L144.0,48.8 L147.0,43.9 L150.0,39.2 L153.0,34.8 L156.0,30.7 L159.0,26.9 L162.0,23.6 L165.0,20.8 L168.0,18.5 L171.0,16.8 L174.0,15.8 L177.0,15.4 L180.0,15.7 L183.0,16.6 L186.0,18.2 L189.0,20.3 L192.0,23.0 L195.0,26.3 L198.0,30.0 L201.0,34.0 L204.0,38.4 L207.0,43.1 L210.0,47.9 L213.0,52.8 L216.0,57.8 L219.0,62.8 L222.0,67.6 L225.0,72.4 L228.0,76.9 L231.0,81.2 L234.0,85.3 L237.0,89.1 L240.0,92.7 L243.0,95.9 L246.0,98.9 L249.0,101.5 L252.0,103.9 L255.0,106.0 L258.0,107.9 L261.0,109.5 L264.0,110.9 L267.0,112.1 L270.0,113.2 L273.0,114.1 L276.0,114.8 L279.0,115.4 L282.0,115.9 L285.0,116.3 L288.0,116.7 L291.0,117.0 L294.0,117.2 L297.0,117.4 L300.0,117.5" fill="none" stroke="#f97316" stroke-width="2"/><line x1="0" y1="118" x2="300" y2="118" stroke="currentColor" stroke-width="1" opacity="0.35"/><line x1="181" y1="14" x2="181" y2="118" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.85"/><text x="181" y="10" font-size="10.5" text-anchor="middle" fill="currentColor" opacity="0.8">threshold</text><text x="150" y="134" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.65">High threshold</text><text x="150" y="152" font-size="14" text-anchor="middle" font-weight="700" fill="currentColor">Diagnosticity = 7.67</text><text x="150" y="168" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.65">46% of guilty confess &#183; 6% of innocent confess</text></g><g transform="translate(8,214)"><circle cx="6" cy="-4" r="5" fill="#3b82f6" opacity="0.75"/><text x="18" y="0" font-size="11" fill="currentColor" opacity="0.7">Innocent suspects</text><circle cx="146" cy="-4" r="5" fill="#f97316" opacity="0.75"/><text x="158" y="0" font-size="11" fill="currentColor" opacity="0.7">Guilty suspects</text><text x="300" y="0" font-size="11" fill="currentColor" opacity="0.7">Shaded area = confessed</text></g>
</svg>
<figcaption>The two curves are identical in both panels: the method is exactly as good at telling guilty from innocent. Only the threshold moves. The diagnosticity score more than triples. The right-hand panel is the real <strong>No tactic</strong> condition.</figcaption>
</figure>

This is not just a theoretical possibility. In the work that first published this measure, the ranking produced by diagnosticity matches the ranking produced by threshold exactly, method for method. It barely matches the ranking based on actual separation.

That produces the reversal at the center of our paper.

The No tactic condition, in which the experimenter simply asked for a confession without using an interrogation technique, had the highest diagnosticity of the four conditions: 7.67.

But it ranked only third out of four in its ability to separate guilty participants from innocent participants.

It looked best because it produced the fewest confessions of any kind, not because it did the best job of sorting guilty people from innocent ones.

<figure>
<svg viewBox="0 0 640 250" width="100%" role="img" aria-labelledby="f1t" style="max-width:640px;height:auto;font-family:inherit">
<title id="f1t">The same four conditions ranked by diagnosticity and by separation. No tactic ranks first by diagnosticity but third by separation.</title>
<text x="14" y="22" font-size="12" font-weight="700" fill="currentColor" opacity="0.75" letter-spacing="0.5">RANKED BY DIAGNOSTICITY</text>
<text x="376" y="22" font-size="12" font-weight="700" fill="currentColor" opacity="0.75" letter-spacing="0.5">RANKED BY SEPARATION</text>
<g><rect x="8" y="42" width="250" height="32" rx="6" fill="#f59e0b" opacity="0.16"/><text x="22" y="62" font-size="13" fill="currentColor" opacity="1" font-weight="700">1. No tactic</text><text x="244" y="62" font-size="13" text-anchor="end" fill="currentColor" opacity="1" font-weight="700">7.67</text></g><g><rect x="8" y="82" width="250" height="32" rx="6" fill="currentColor" opacity="0.05"/><text x="22" y="102" font-size="13" fill="currentColor" opacity="0.6" font-weight="400">2. Deal</text><text x="244" y="102" font-size="13" text-anchor="end" fill="currentColor" opacity="0.6" font-weight="400">5.14</text></g><g><rect x="8" y="122" width="250" height="32" rx="6" fill="currentColor" opacity="0.05"/><text x="22" y="142" font-size="13" fill="currentColor" opacity="0.6" font-weight="400">3. Minimization</text><text x="244" y="142" font-size="13" text-anchor="end" fill="currentColor" opacity="0.6" font-weight="400">4.50</text></g><g><rect x="8" y="162" width="250" height="32" rx="6" fill="currentColor" opacity="0.05"/><text x="22" y="182" font-size="13" fill="currentColor" opacity="0.6" font-weight="400">4. Minimization + deal</text><text x="244" y="182" font-size="13" text-anchor="end" fill="currentColor" opacity="0.6" font-weight="400">2.02</text></g><g><rect x="370" y="42" width="250" height="32" rx="6" fill="currentColor" opacity="0.05"/><text x="384" y="62" font-size="13" fill="currentColor" opacity="0.6" font-weight="400">1. Minimization</text><text x="606" y="62" font-size="13" text-anchor="end" fill="currentColor" opacity="0.6" font-weight="400">1.79</text></g><g><rect x="370" y="82" width="250" height="32" rx="6" fill="currentColor" opacity="0.05"/><text x="384" y="102" font-size="13" fill="currentColor" opacity="0.6" font-weight="400">2. Deal</text><text x="606" y="102" font-size="13" text-anchor="end" fill="currentColor" opacity="0.6" font-weight="400">1.66</text></g><g><rect x="370" y="122" width="250" height="32" rx="6" fill="#f59e0b" opacity="0.16"/><text x="384" y="142" font-size="13" fill="currentColor" opacity="1" font-weight="700">3. No tactic</text><text x="606" y="142" font-size="13" text-anchor="end" fill="currentColor" opacity="1" font-weight="700">1.45</text></g><g><rect x="370" y="162" width="250" height="32" rx="6" fill="currentColor" opacity="0.05"/><text x="384" y="182" font-size="13" fill="currentColor" opacity="0.6" font-weight="400">4. Minimization + deal</text><text x="606" y="182" font-size="13" text-anchor="end" fill="currentColor" opacity="0.6" font-weight="400">1.30</text></g><path d="M266,56 C310,56 326,136 362,136" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M356,131 L364,136 L356,141 Z" fill="#f59e0b"/>
<text x="320" y="86" font-size="12" font-weight="700" text-anchor="middle" fill="#f59e0b">1st</text>
<text x="320" y="104" font-size="12" font-weight="700" text-anchor="middle" fill="#f59e0b">&#8595;</text>
<text x="320" y="122" font-size="12" font-weight="700" text-anchor="middle" fill="#f59e0b">3rd</text>
<text x="14" y="238" font-size="11.5" fill="currentColor" opacity="0.6">Diagnosticity score</text>
<text x="376" y="238" font-size="11.5" fill="currentColor" opacity="0.6">Ability to tell guilty from innocent</text>
</svg>
<figcaption>The four conditions from Russano et al. (2005), ranked two ways. <strong>No tactic</strong> has the highest diagnosticity but is only third at actually separating guilty participants from innocent ones.</figcaption>
</figure>

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

<figure>
<svg viewBox="0 0 640 210" width="100%" role="img" aria-labelledby="f3t" style="max-width:640px;height:auto;font-family:inherit">
<title id="f3t">One hundred dots representing one hundred repeated experiments. Ten are marked red, showing runs in which diagnosticity cannot be computed.</title>
<text x="12" y="-2" font-size="12" fill="currentColor" opacity="0"> </text>
<g transform="translate(0,14)"><circle cx="12" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="43" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="74" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="105" cy="16" r="8" fill="#ef4444" opacity="0.9"/><text x="105" y="20" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="136" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="167" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="198" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="229" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="260" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="291" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="322" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="353" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="384" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="415" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="446" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="477" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="508" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="539" cy="16" r="8" fill="#ef4444" opacity="0.9"/><text x="539" y="20" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="570" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="601" cy="16" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="12" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="43" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="74" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="105" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="136" cy="46" r="8" fill="#ef4444" opacity="0.9"/><text x="136" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="167" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="198" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="229" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="260" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="291" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="322" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="353" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="384" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="415" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="446" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="477" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="508" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="539" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="570" cy="46" r="8" fill="#ef4444" opacity="0.9"/><text x="570" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="601" cy="46" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="12" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="43" cy="76" r="8" fill="#ef4444" opacity="0.9"/><text x="43" y="80" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="74" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="105" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="136" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="167" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="198" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="229" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="260" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="291" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="322" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="353" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="384" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="415" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="446" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="477" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="508" cy="76" r="8" fill="#ef4444" opacity="0.9"/><text x="508" y="80" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="539" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="570" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="601" cy="76" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="12" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="43" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="74" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="105" cy="106" r="8" fill="#ef4444" opacity="0.9"/><text x="105" y="110" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="136" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="167" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="198" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="229" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="260" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="291" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="322" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="353" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="384" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="415" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="446" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="477" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="508" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="539" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="570" cy="106" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="601" cy="106" r="8" fill="#ef4444" opacity="0.9"/><text x="601" y="110" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="12" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="43" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="74" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="105" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="136" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="167" cy="136" r="8" fill="#ef4444" opacity="0.9"/><text x="167" y="140" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="198" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="229" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="260" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="291" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="322" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="353" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="384" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="415" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="446" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="477" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="508" cy="136" r="8" fill="#ef4444" opacity="0.9"/><text x="508" y="140" font-size="10" font-weight="700" text-anchor="middle" fill="#ef4444" opacity="0.35">&#215;</text><circle cx="539" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="570" cy="136" r="6.5" fill="currentColor" opacity="0.18"/><circle cx="601" cy="136" r="6.5" fill="currentColor" opacity="0.18"/></g>
<g transform="translate(12,196)"><circle cx="6" cy="-4" r="6.5" fill="currentColor" opacity="0.18"/><text x="20" y="0" font-size="11.5" fill="currentColor" opacity="0.7">Score can be calculated</text><circle cx="226" cy="-4" r="8" fill="#ef4444" opacity="0.9"/><text x="240" y="0" font-size="11.5" fill="currentColor" opacity="0.85">No innocent participant confessed &#8212; score undefined</text></g>
</svg>
<figcaption>One hundred runs of the same experiment at the sample sizes this literature typically uses, about 37 people per group. In roughly ten of them, no innocent participant confesses, the false confession rate is zero, and diagnosticity cannot be calculated at all.</figcaption>
</figure>

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
