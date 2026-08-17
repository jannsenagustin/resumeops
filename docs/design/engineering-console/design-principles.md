# Atlas Engineering Console Design Principles

These rules are stable references for the current redesign and future visual
work. They apply alongside the
[Project Atlas Engineering Manifesto](../../../ATLAS_PRINCIPLES.md), especially
its design, documentation, evidence, and user-experience principles.

## Engineering Before Marketing

Present engineering systems, state, decisions, and records directly. Do not use
promotional hero sections, conversion language, inflated claims, or portfolio
theatre.

## Evidence Before Claims

Make claims traceable to validation and evidence. Never invent metrics, imply
validation, or use visual polish to strengthen an unsupported claim.

## Visuals Communicate Engineering State

Every diagram, indicator, label, and image must clarify architecture, state,
sequence, validation, or another engineering fact. Decorative visuals do not
belong in the console.

## Every Component Has Operational Meaning

Each component must help a reader orient, inspect, compare, navigate, or verify.
If it has no operational meaning, remove it.

## Typography Before Decoration

Use typographic hierarchy to create focus and rhythm before adding visual
effects. IBM Plex Sans is the primary interface and reading face. IBM Plex Mono
is reserved for identifiers, state labels, technical metadata, commands, and
other genuinely monospaced material.

## Structured Spacing

Use a deliberate spacing system to establish hierarchy, grouping, and
continuity. Dense layouts must remain readable; empty space must communicate
structure rather than luxury or spectacle.

## Borders Over Shadows

Prefer restrained borders, rules, and tonal separation. Avoid elevation as a
default organizing device and do not use dramatic shadows.

## Panels Over Floating Cards

Group related operational information in panels that belong to the page grid.
Avoid collections of disconnected floating cards and generic SaaS layouts.

## Minimal Color Semantics

Use color only for stable operational meaning:

| State | Color | Meaning |
| --- | --- | --- |
| Validated | Green | Supported by completed validation and evidence |
| Planned | Amber | Defined work that has not been implemented |
| Future | Gray | Longer-term direction without a current implementation claim |
| Danger | Red | Failure, destructive risk, or a condition requiring attention |

Always pair color with text, symbols, or another non-color signal. Introduce no
additional branding colors.

## Operational Language

Use terms such as Current System State, Engineering Records, Evidence,
Validation, Architecture, Repository, Milestones, Systems, and Engineer. Avoid
marketing terminology and labels that obscure technical ownership or state.

## Documentation Remains the Product

The interface supports the documentation record; it does not replace it.
Summaries direct readers to canonical detail. Components must not fragment,
duplicate, or silently rewrite milestones, engineering records, evidence, or
DEA responsibilities.

## Prohibited Patterns

- No AI slop or generic generated-interface patterns.
- No decorative gradients.
- No glassmorphism, glows, or translucent spectacle.
- No meaningless or decorative animation.
- No fake metrics, activity, terminals, or system state.
- No promotional hero sections.
- No additional branding colors.
- No decoration that competes with evidence.

## Design Source Principles

Draw inspiration from engineering notebooks, operational consoles,
infrastructure dashboards, mission-control interfaces, technical runbooks, and
documentation systems. Adopt their clarity, durability, and state awareness;
do not imitate product-specific styling.

See the approved
[visual reference](images/atlas-engineering-console-visual-reference-v1.png)
and [vision](VISION.md) for the intended expression of these principles.

