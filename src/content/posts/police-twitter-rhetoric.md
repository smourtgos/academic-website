---
title: "Police Twitter Rhetoric post George Floyd: Differences by Party in the US Senate"
date: 2020-08-20
summary: "Text mining analysis of US senators' tweets in the two months following George Floyd's death reveals distinct differences in policing rhetoric between Republican and Democrat senators."
tags: ["police", "text mining", "political parties"]
featured: false
---

## Introduction

Following the death of George Floyd while in police custody on May 25th 2020, protests and riots spread across the United States. Over the following months, politicians weighed in on Floyd's death, policing, and ideas regarding police reform. As recently shown in a [post](https://pgshky.rbind.io/post/sentiment-analysis-mps/) examining English MP's online rhetoric, natural language processing (NLP) and text mining provide an opportunity to better evaluate the statements being made by political leaders. While speeches from the Senate Chamber are available for analysis, Twitter provides a different avenue of political communication, providing a more direct view of political leaders' 'every-day' opinions and thoughts.

With increased political polarization, it is especially interesting to gauge differences in the rhetorical response to Floyd's death across political parties. In this post, I analyze the political rhetoric of all US senators on Twitter in the two months directly following Floyd's death. As discussed below, there are distinct differences between the Republican and Democrat response.

## Preparing the Data for the Analysis

Twitter handles for each US senator were gathered from a comprehensive list of all Twitter handles for members of the 116th Congress. The accuracy of this list was cross-referenced and corrections were made where necessary. Party affiliation was added to the database for comparison purposes between the Democrat and Republican parties. Two senators (Angus King and Bernie Sanders) are officially listed as Independents, but were designated as Democrats for this analysis.

Up to 1,000 tweets per senator were pulled, restricted to original tweets only (retweets were excluded). The data were then filtered to the two-month window directly following Floyd's death (May 25th through July 25th, 2020). The tweets were cleaned by removing URLs, mentions, line breaks, special characters, and unnecessary blank space.

Since the analysis is specifically interested in tweets about policing, only those tweets mentioning "police," "cop," "cops," "law enforcement," or "policing" were retained. The resulting dataset shows that Democrat senators produced more police-related tweets than Republican senators directly following Floyd's death.

![Histogram showing the frequency of police-related tweets over time, faceted by party](/images/posts/police-twitter-rhetoric/unnamed-chunk-1-1.png)

The tweets were then tokenized (each word separated) and stopwords (extremely common words like "the," "of," "to") were removed.

## Distributions, Frequencies, and Odds Ratios

The word frequency distributions by party follow Zipf's law, as is typical in language: the frequency with which a word appears is inversely proportional to its rank.

![Word frequency distributions by party showing typical Zipfian long-tailed patterns](/images/posts/police-twitter-rhetoric/unnamed-chunk-2-1.png)

Plotting word frequencies grouped by party reveals which words are used with equal frequency by both parties and which are used with differing frequencies. Words near the diagonal line are used with equal frequency by Republicans and Democrats, while words away from the line are used more by one party compared to the other.

![Scatter plot of word frequencies comparing Democrat and Republican usage, with words near the diagonal used equally by both parties](/images/posts/police-twitter-rhetoric/unnamed-chunk-3-1.png)

From the plot we can see that Democrats use words such as "racism," "black," and "excessive" much more frequently than Republicans. While Republicans use words such as "safe," "security," and "crime" much more frequently than Democrats.

An even clearer picture emerges from log odds ratios, which identify the words most distinctively associated with each party's Twitter statements. The top 15 most distinctive words from each party are plotted below.

## Bigrams

Beyond single words, we can also examine consecutive word pairs (bigrams) to gain better insight into the meaning within senators' tweets.

### Bigram Network

Tokenizing tweets into bigrams and creating a network visualization reveals the structure of policing discussions. The arrows indicate the directionality of a bigram, and darker connecting arrows indicate more common bigrams.

Many of the policing reform discussions that have been publicized in the past few months are apparent in the senators' tweets, with nodes surrounding police accountability, reform, brutality, and violence; political parties; the Justice in Policing Act; race; qualified immunity; and systemic racism.

### TF-IDF

To better understand the more important bigrams in each party's rhetoric, we can use the term frequency-inverse document frequency (tf-idf) statistic. This statistic decreases the weight given to commonly used bigrams and increases the weight given to bigrams not used as frequently, and are thus more distinctive.

By examining bigrams between parties with tf-idf weighting, we gain a better understanding of each party's rhetoric. Democrats most frequently reference ideas regarding the Justice in Policing Act, police accountability, systemic racism, police violence, and George Floyd. And while Republicans frequently mention ideas surrounding police reform, they also frequently reference ideas regarding radicals, mobs, and the police defunding movement.

## Sentiment Analysis

Finally, we can examine differences between the two parties with sentiment analysis. Using the VADER package (whose scoring rules were established from social media blogs), we extract the emotional content of senators' tweets.

The top 9 most positive senators, when tweeting about policing, are Republicans. Comparing sentiment across all senators confirms that Democrats express more negative sentiment toward policing than Republicans.

When examining sentiment by party across time, a more nuanced story emerges. Immediately following Floyd's death, Republican senators spoke about policing in much more positive terms than Democrat senators. However, across time, Republican senators' sentiment became more and more negative, until ultimately at the end of June 2020, aligning with negative Democrat senator sentiment.

## Takeaways

This analysis has shown distinct differences between Republican and Democrat senators' rhetorical response to policing in the months following George Floyd's death. In an increasingly polarized political environment, perhaps this isn't too surprising. Regardless, as demonstrated here, we can see that text mining methods allow us to better understand political leader rhetoric surrounding the issues of policing in the US.
