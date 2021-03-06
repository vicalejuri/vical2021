---
schema: article
status: draft
published: true
layout: ../../../layouts/Post/Post.astro
title: Introduction to complexity
subtitle: My Personal notes of Santa Fe Course
description: Personal notes of the complexity course(Santa Fe institute)
tags:
  - personal-notes
  - santa-fe institute
publishedAt: 2021-09-02
---

What is complexity? The term is incredibly hard to describe, but we can start
with some concrete examples. A great example is ants. Nigel Franks, a well know ant researcher once wrote
that:

> The solitary army ant is behaviorally one
> of the least sophisticated animals imaginable…if 100 army ants are placed on a flat
> surface, they will walk around and around in never decreasing circles until they die of
> exhaustion. In extremely high numbers, however, it is a different story.

<div class="right-25">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/Safari_ants_tunnel.jpg" alt="Ants building a tunnel"/>
  <figcaption>Ants building a tunnel</figcaption>
</div>

Figure 1 show a colony of army ants building a tunnel. Each ant on it's own is very simple, but the
colony as a whole can work together cooperatively to accomplish complex tasks without central control. In other words, ant colonies can organize themselves to produce structures much more complicated than any single ant can produce.

Another example is of ants building a bridge with their bodies[^1] so that other members of the colony can cross the
gap between the two leaves. Each ant is secreting chemicals to communicate with the other ants, and the whole bridge is built without any central control. You might call this an example of a decentralized, self-organizing or self-assembling system. Other social insects produce similar behaviour, for instance, [termites](https://en.wikipedia.org/wiki/Mound-building_termites), and many other kinds of animals.

Another classic example of a complex system is the brain, composed of individual simple agents, the neurons. The
human brain consists about 100 billion neuron, with a 100 trillion connections between those neurons. Each neuron
is relatively simple compared to the whole brain, and again there's no central control. Somehow, the huge
ensemble of neurons and connections give rise to the complex behaviours that we call cognition, intelligence, or even
creativity. Brain imaging has show that these neurons organize themselves into different functional areas[^a]. Just
like the ants or termites, neurons can self-organize into complex structures that help the species function
and survive.

<div class="centered">

  <img src="/pictures/brain-innerworkings.png" alt="brain architecture"/>
  <figcaption>Brain architecture
    <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>
  </figcaption>
</div>

Yet another complex system is the immune system, distributed across the body and involving many different organs and trillions of cells moving around the bloodstream or lymph stream protecting ad healing the body from damage or disease.
Like the ants we saw before, the immune system cells communicate with one another through chemical signals, and work together without any central control to launch coordinated attacks on what they perceive as threats to the body. In addition, the population of immune cells in the body is able to change, or adapt itself in response to what that population of cells perceives in its environment.
This kind of adaptation is another key characteristic of complex systems.

Another example of a complex system is the human genome. The genome is comprised of 23 chromosomes pairs, and each
is made of thousands of genes. Genes, are strings of dna along the chromosome. It's currently thought that the human
genome has about 25000 genes which code for proteins. In complex system terms, you could think of genes as simple
components that interact with other genes in decentralized way.

And they interact with other genes through genetic regulatory networks. They control one another's expression, where
expression means translation to proteins. It turns out, that the human genome is made up of thousands of regulatory networks like this one. And it's these interactions largely responsible for our own complexity.

<div class="centered">
<img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/DG_Network_in_Hybrid_Rice.png">
<figcaption>A genetic regulatory network in hybrid rice</figcaption>
</div>

The idea of networks is central to the study of complexity, because it's maps the relations of individuals
and how information is exchanged between individuals. It turns out that hte amount of connectivity in a network,
as well of the kinds of links present, can have a big effect how stable the network is to changes.

The new interdisciplinary field of network science, which arose from the complex systems research, studies
these kinds of phenomena in networks from many different disciplines. As the final example, we look at the example of cities as complex systems. Its often been said that a city is like a living organism in many ways. But to what extend do cities actually resemble living organisms, in the way that they're structured, grow, scale with size and operate?

# Properties of complex systems

<div class="twocolumn-page">

Now that we've seen several examples of complex systems, let's try to abstract some of the properties of the ones that we've seen.

- Simple components or agents (relative to whole system)
- Nonlinear interactions among components
- No central control
- Emergent behaviours
  - Hierarchical organization
  - Information processing
  - Complex dynamics
  - Evolution and learning

_Nonlinear_ means that the components interact in such a way
that you can't just sum up all their activities and thereby derive what the whole system is doing.
Colloquially, we might say that the whole is more than the sum of the parts.
That's really what nonlinear means.

_Emergent_ refers to properties of the system that can't be easily understood from individual components,
or small groups of individual components; but rather are collective outcomes of the whole system,
and have to be understood at the system level rather than at the individual level.

One of such behaviour is **hierarchical organization**, to things like biological organisms, which have hierarchical structure ranging from cells to organs to body-wide systems, to the whole body and even on to colonies and society.

A different kind of emergent behavior is **information processing**; that is, the system as a whole gaining information from the environment and about its own state as well; and using this information to make decisions, as a whole,
about what actions to take. The components don't gain the information, or make the decisions, individually.
This kind of information processing can only be done on the level of the system as a whole.

Another example of emergent behavior is **complex dynamics** of the system.
_Dynamics_ refers to how the system changes in its patterns
in space and in time. For instance, we might see ants building up foraging trails, and the whole colony takes on a kind of pattern that changes in complex ways over time.
You might also think of stock prices, which change in a complicated and unpredictable way.
Having complex dynamics is a property of all the complex systems we're going to see.

Finally, in all of these systems we see **evolution and learning**. All these systems, whether they be biological, social, or technological, exhibit some kind of evolution in the Darwinian sense, and this evolution often results in adaptation, or learning, that is, systems improve themselves to survive or do better in some environment.

</div>

[^1]: [Ants building bridges - National Geographic](https://www.youtube.com/watch?v=4BdjxYUdJS8)
[^a]: [The brains inner workins - Student manual](https://www.azscience.org/media/1732/brains-inner-workings-student-manual.pdf)
