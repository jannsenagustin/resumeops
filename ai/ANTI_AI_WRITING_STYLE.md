# Anti-AI Writing Style

Atlas documentation should sound like an engineer explaining real work to
another engineer. It should not sound like a generated brochure, a keynote, or
a generic process document.

## Avoid

- marketing and sales language;
- corporate buzzwords and management slogans;
- unnecessary praise or self-congratulation;
- exaggerated impact, maturity, scale, or certainty;
- filler introductions and summary paragraphs that add no information;
- repetitive conclusions or repeated restatements of the same fact;
- AI clichés such as "delve," "leverage," "robust," "seamless," "cutting-edge,"
  "game-changing," and "in today's fast-paced landscape";
- fake quotations, imagined reader reactions, and dramatic troubleshooting;
- long lists where a short explanation would be clearer;
- calling work "production-ready" without production-relevant evidence.

Do not use polished language to hide an unknown. Do not turn an ordinary change
into a transformation story. Do not describe planned architecture in the past
tense.

## Prefer

- concise, conversational engineering language;
- evidence before interpretation;
- active voice and concrete verbs;
- short paragraphs with one main idea;
- meaningful headings that help a reader navigate;
- simple explanations of cause, effect, and trade-offs;
- precise status terms from the planning system;
- honest uncertainty and explicit validation boundaries;
- links to canonical sources instead of duplicated narratives.

## Use Concrete Language

Write "The Search Head returned results from the Indexer" when runtime evidence
shows that behavior. Do not write "Atlas enables seamless distributed
observability."

Write "The cause is not yet known; the journal shows a service restart but no
supporting error output" when evidence is incomplete. Do not fill the gap with
a likely story.

Write "I recommend validating the manual deployment before automating it"
instead of "The optimal strategic approach is to leverage automation."

## Editing Test

Before accepting a paragraph, ask:

1. Does it state a fact, reason, decision, limitation, or useful instruction?
2. Can the factual claim be traced to evidence or a canonical record?
3. Could the same meaning use fewer or simpler words?
4. Does it sound natural when read aloud by an engineer?

If a sentence fails these checks, revise or remove it.
