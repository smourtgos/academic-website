---
title: "100% of Shark Attack Victims Were Wet"
date: 2026-09-25
summary: "A six-panel comic and an interactive page about one of the first lessons in research methods: if your data only contains the people something happened to, you can describe them, but you can't say how much anything raised their risk. Potato salad and sharks stand in for the serious version."
tags: ["research methods", "selection bias", "causal inference", "wrongful convictions", "just for fun"]
featured: true
image: /images/posts/shark-attack-victims-were-wet/panel-1.svg
imageCaption: "A lifeguard with a clipboard announces the finding."
---

I spend a lot of my research life on a single, slightly boring point: you can't say how much anything raises
the risk of an outcome from a dataset that only contains the outcome. Every methods course teaches it early,
usually under the heading "selecting on the dependent variable," and then everyone forgets it the moment the
outcome is something they care about.

So here it is with sharks instead.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;margin:28px 0;">
  <img src="/images/posts/shark-attack-victims-were-wet/panel-1.svg" alt="Panel 1. A lifeguard on a tower reads from a clipboard: I've read every shark attack report ever filed. 100% of the victims were wet. A nervous beachgoer asks: so I should stay dry? Box: shark attack victims on record, 16; wet, 16 of 16." style="margin:0;width:100%;height:auto;" />
  <img src="/images/posts/shark-attack-victims-were-wet/panel-2.svg" alt="Panel 2. The same beach from above: dozens of wet swimmers bobbing in the water and one shark fin next to a single shocked swimmer. Box: wet and not bitten, 184; wet and bitten, 16; being wet can't tell them apart. A small tag reads: the denominator enters the chat." style="margin:0;width:100%;height:auto;" />
  <img src="/images/posts/shark-attack-victims-were-wet/panel-3.svg" alt="Panel 3. At a wedding, a green-faced guest shouts: It was the potato salad! Across the room a table of happy guests eat the same potato salad and say it is the best ever. Box: sick guests who ate it, 36 of 40 (90%); fine guests who ate it, 144 of 160 (90%); same share, the salad raised nobody's risk." style="margin:0;width:100%;height:auto;" />
  <img src="/images/posts/shark-attack-victims-were-wet/panel-4.svg" alt="Panel 4. A professor points at a whiteboard with a two-by-two table. The Got Sick column is full of dots; the Fine column is hatched out with a big question mark. The board reads: risk for salad-eaters equals got sick divided by got sick plus fine; you need both columns. Speech bubble: You looked at one column and asked for a ratio." style="margin:0;width:100%;height:auto;" />
  <img src="/images/posts/shark-attack-victims-were-wet/panel-5.svg" alt="Panel 5. Three worlds side by side, each with the identical case file: 40 sick, 36 ate the salad. But among everyone else, 99%, 90%, or 64% ate the salad, so the salad is protective (0.3 times), no effect (1.0 times), or dangerous (4.0 times). Box: the case file looks identical in all three; it can't tell you which world you're in." style="margin:0;width:100%;height:auto;" />
  <img src="/images/posts/shark-attack-victims-were-wet/panel-6.svg" alt="Panel 6. The rule, in a big yellow box: if your data only has the people it happened to, you can describe them. You can't say how much anything raised their risk. For that, you need the people it didn't happen to. The lifeguard, the wedding guest, the beachgoer and the professor stand below. A burst says: try it yourself." style="margin:0;width:100%;height:auto;" />
</div>

## The whole idea in one sentence

If your sample was chosen because the outcome happened, you can describe the cases. You cannot say how much
anything changed the odds of the outcome. That takes the people it didn't happen to.

"Ninety percent of the sick guests ate the potato salad" is a real, useful fact about the sick guests. It is
also completely silent about whether the salad made anyone sick, because the guests who ate it and felt fine
were never interviewed. Depending on how many of them there were, the salad could have been harmless,
dangerous, or (why not) protective. The case file looks identical in all three worlds.

That's the whole trick, and it's what the interactive version is for: a switch that reveals the people who
were never in the file, and a slider that lets you move the true risk from "safe" to "yikes" while the number
from the file sits there, refusing to budge.

<div style="text-align: center; margin: 30px 0;">
<a href="/dashboards/missing-denominator/dashboard.html" target="_blank" rel="noopener noreferrer" style="background-color: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 999px; font-weight: 700; display: inline-block; box-shadow: 4px 4px 0 #1c1917;">Open the Interactive Version</a>
</div>

## Okay, but seriously

The reason I keep making this point is that a lot of what we know about false confessions and wrongful
convictions comes from case files: exoneration databases, collections of proven false confessions, and so
on. I rely on them constantly. They are often the only evidence we have about what wrongful convictions look
like and what tends to appear in them.

What they can't do is what the potato salad can't do. "X% of exonerees falsely confessed" is a fact about the
people in the file, the same way "90% of the sick guests ate the salad" is. It does not, on its own, tell you
how much more likely a wrongful conviction becomes when someone confesses, or when a particular interrogation
tactic is used. That number is a ratio, and the ratio needs the people who confessed, or were questioned the
same way, and were *not* wrongfully convicted. They aren't in the file, so we simply don't know that number.

None of that is a criticism of the databases, or of the people who built them. It's a statement about what a
ratio is. From case file data alone, we really can't say specifically how big or small the risk from tactic T
is. If you'd like the grown-up version of this argument, with the real studies and the real numbers, the
[interrogation duration](/dashboards/fcwc-duration/dashboard.html) and
[false confession risk](/dashboards/fcwc-risk/dashboard.html) dashboards walk through what it would take to
estimate the denominator for real.

## My work on this problem

- Mourtgos, S. M., & Adams, I. T. (2026). Recalibrating the risk of false confession wrongful convictions:
  Interrogation tactics and inverse probability. *Journal of Criminal Justice, 103*, 102600.
  [https://doi.org/10.1016/j.jcrimjus.2026.102600](https://doi.org/10.1016/j.jcrimjus.2026.102600)
- Mourtgos, S. M., & Adams, I. T. (2026). Interrogation duration and the estimation of false confession
  wrongful conviction risk: A reply to Smith and colleagues. *Journal of Criminal Justice, 107*, 102747.
  [https://doi.org/10.1016/j.jcrimjus.2026.102747](https://www.sciencedirect.com/science/article/pii/S0047235226001546)
- Mourtgos, S. M., & Adams, I. T. (2026). What do laboratory false confession paradigms measure? A calibration
  meta-analysis. *Journal of Quantitative Criminology*.
  [https://doi.org/10.1007/s10940-026-09687-1](https://doi.org/10.1007/s10940-026-09687-1)

*No sharks were harmed. The potato salad remains under investigation.*
