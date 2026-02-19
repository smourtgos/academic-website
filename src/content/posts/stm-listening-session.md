---
title: "Don't Forget the Good with the Bad and the Ugly: Topic Modeling a Policing Commission Listening Session"
date: 2021-02-05
summary: "A structural topic model analysis of public comments from a policing commission listening session reveals four distinct themes---including one of appreciation for officers that the local news coverage missed."
tags: ["police", "topic modeling", "text analysis"]
featured: false
---

Following the summer of civil unrest in 2020, one capital city in the western US (like many other cities around the country) formed a Racial Equity in Policing Commission. According to the city's administration, the commission was formed to examine the police department's policies, culture, and budget. As part of the commission's activities, in January 2021, it held a public 'listening session' in which residents could provide their perspectives on policing in the city.

A local news outlet covered the listening session and reported three common threads among the comments: (1) inconsistency in police response, (2) displeasure with the police department, and (3) concerns about police procedures. The story is understandable---these are important and valid concerns expressed by community members that need to be heard.

However, a news reporter is only a single coder examining the comments. Machine learning methods, such as structural topic modeling (STM), provide a way to examine whether those observations hold up under more rigorous analysis. In this post, I use STM to analyze the listening session comments and evaluate whether the themes identified in the news story align with what the data reveal.

## Getting the Data

The first thing I needed to do was obtain all of the comments made during the listening session. Luckily, the commission's meetings are public and posted on YouTube. I submitted the listening session video to an online transcription service for a nominal fee, and within 20 minutes, I had the transcript for the listening session.

## Analyzing the Data

With the transcript in hand, I used structural topic modeling (STM) to identify latent themes in the comments. STM is an unsupervised machine learning method that identifies topics by examining the probabilistic co-occurrence of words across documents. If you are interested in learning more about STM, you can read about it in a [paper](https://www.sciencedirect.com/science/article/abs/pii/S0047235219302867?via%3Dihub) I co-authored with [Ian T. Adams](https://ianadamsresearch.com/).

### Descriptives

A total of 22 individuals gave comments during the listening session, although it was reported over 1,000 members of the public attended the virtual meeting. The shortest statement consisted of 130 words, with the most extended comment composed of 895 words. The median comment was 284 words long, with a mean of 375 words.

### Determining the Number of Topics

A data-driven approach was used to determine the appropriate number of topics. Multiple models were estimated ranging from 3 to 10 topics, and diagnostic measures including held-out likelihood, residual analysis, and semantic coherence were examined. Based on these measures and manual review of topic quality, the four-topic model was selected as providing the best fit.

### Were There Common Threads?

While the news story suggested that there were three common threads, the STM analysis identified four. As can be seen below, while all of the four topics are correlated, they are distinct.

![Topic correlation plot showing four distinct but correlated topics](/images/posts/stm-listening-session/unnamed-chunk-1-1.png)

The four topics are relatively evenly dispersed across all transcribed comments (23% - 30%).

![Topic percentages across all comments, showing an even distribution from 23% to 30%](/images/posts/stm-listening-session/unnamed-chunk-2-1.png)

And if each comment is placed in a discrete topic category based on the percentage of topic it encompasses, there is a fairly even distribution.

![Number of comments per topic showing a roughly even distribution across the four topics](/images/posts/stm-listening-session/unnamed-chunk-3-1.png)

In sum, we can say with a reasonably high degree of certainty that there were four distinct themes among the comments given in the listening session.

### What were the Themes?

Now we turn to the heart of the question: Do the themes identified in the news story align with the analysis? To answer this question, I manually explore the four estimated topics. This was accomplished by reviewing comments that were estimated to be highly associated with each topic. Through several close readings of the comments, an underlying theme for each topic was identified. Below I briefly describe each theme and provide comment excerpts demonstrating that theme.

#### Topic 1 -- Police Procedures

Comments highly associated with Topic 1 appear to mostly convey concerns with police procedures:

> I'm sure that there is a technical legal explanation for why it might be okay to be taking these items from the homeless folks. But as a civilian, it's hard for me to understand...that sort of a policy...Do you have any documentation that you're returning the gear to them?

> [The PD] should also ensure equitable language access, including alternative means of communication for all who encounter police or enter the criminal justice system.

> I'd like to see that manual updated to reflect this new [hate crime] legislation...for the benefit of all.

#### Topic 2 -- Appreciation

Comments highly associated with Topic 2 appear either to 1) call for people to be more gracious and understanding with officers, 2) praise the work of officers, or 3) call for more police:

> Before we point fingers, we should perhaps open our ears and listen to what our police officers have to go through first.

> The female supervisor of internal affairs...I have a very positive message about them...she seemed to be...willing to listen to me.

> A great concern with the [PD] is the reduction of staffing numbers. We've seen this year...a mass exodus. If we don't understand why this happens, then we can only expect this problem to repeat itself at another time, an extremely difficult time in history when we need our public safety servants the most.

#### Topic 3 -- Inconsistency

Comments highly associated with Topic 3 appear to mostly express concern with inconsistency in police response (or the broader criminal justice system):

> There were two incidents that happened, but one was handled differently, and it affected me.

> We need to be able to depend upon our police force to be there for us and help us. We don't need to be in fear of calling them and wondering, will they show up? Are they going to help or are they going to make matters worse?

> If the police are still serving, you know, an oppressive purpose against minorities then a minority being the one serving that group, this wouldn't help, you know.

#### Topic 4 -- Displeasure

Comments highly associated with Topic 4 appear to mostly be expressing displeasure:

> There's been a lot of issues. People are trying to break in my apartment and, um, I reported so many different times over it...and for a while, things were ignored.

> The cop gave me a ticket for following too close...It's like he was using a power move...it just wasn't fair at all.

> I still do not have a driver's license and it is because of my fear of the police force.

> Our daughter was murdered two years ago...It was carelessly investigated by the police department and he was not even arrested until seven months after the actual murder.

## Conclusion

Three of the four topics identified by STM align with the themes identified in the news story: police procedures, inconsistency, and displeasure. However, the STM analysis also identified a fourth topic that the news story did not mention: appreciation. This topic, comprising roughly a quarter of the comments, included statements praising officers, calling for understanding of police work, and expressing concern about staffing reductions. While the other three themes represent important concerns that deserve attention, the appreciation topic highlights that the public's relationship with their police department is more nuanced than what was reflected in the news coverage. As the title of this post suggests: don't forget the good with the bad and the ugly.
