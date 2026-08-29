# Atlas Decision-Making Framework

Atlas values good engineering judgment more than fast implementation. A quick
change is not useful when it solves the wrong problem, weakens the system, or
leaves the next engineer unable to explain why it exists.

AI contributors should not jump from a request directly to a solution. First
understand what the engineer is trying to achieve, what the system currently
does, and what the available evidence supports. The goal is to understand
before acting.

This framework is a way to reason through work. It is not a substitute for
judgment, and it is not a checklist to complete mechanically.

## The Atlas Decision Loop

### 1. Understand the Request

Start with the outcome the engineer wants, not the first implementation idea
mentioned. Identify the problem, scope, constraints, acceptance criteria, and
anything explicitly excluded.

This step exists because a request can contain both a real need and an untested
assumption about how to meet it. Understanding the need makes it possible to
evaluate the proposed approach without losing sight of the goal.

### 2. Identify the Current State

Inspect the repository and, when authorized and available, the running system.
Read the affected files, configuration, recent records, and relevant history.
Do not assume that model memory, an old conversation, or a filename describes
the present state.

This establishes the starting point. Without it, even a reasonable change can
duplicate existing work, conflict with current architecture, or fix a condition
that no longer exists.

### 3. Find the Canonical Source of Truth

Determine which record owns the fact being considered. Planning state belongs
to [Atlas EOS](../docs/planning/README.md), milestone validation belongs to
[Milestones](../docs/milestones.md), published evidence belongs to the
[evidence index](../docs/evidence/README.md), and other ownership is mapped in
the [documentation ownership matrix](../docs/documentation/OWNERSHIP_MATRIX.md).

Canonical ownership prevents a convenient summary from overruling the actual
record. It also shows where an accepted change must eventually be documented.
Apply the
[Canonical Projection Principle](ENGINEERING_PHILOSOPHY.md#canonical-projection-principle):
confirm that each consumer derives from the owner, can be regenerated from Git,
and has an integrity check capable of detecting drift. A manually repeated UI
inventory is not a projection.

For interface decisions, apply
[Engineering Narrative](ENGINEERING_PHILOSOPHY.md#engineering-narrative): keep
the page's primary question visible and make supporting depth subordinate.

### 4. Gather Evidence

Collect only the evidence needed to understand the decision: runtime behavior,
logs, command output, configuration, tests, documentation history, or other
reviewable artifacts. Check the strength and limits of each source.

Evidence keeps the discussion tied to what Atlas actually does. Configuration
can prove intent, for example, but it does not by itself prove runtime behavior.

### 5. Determine the Root Cause

For a defect or failure, separate the symptom from the cause. Test likely
explanations and rule them in or out. For a design request, identify the
underlying constraint or capability gap rather than treating a preferred tool
as the problem statement.

A solution aimed only at a symptom may hide the failure temporarily or create
a second source of complexity. If the root cause remains unknown, say so and
recommend the next useful investigation instead of inventing certainty.

### 6. Consider Multiple Possible Solutions

Develop more than one plausible approach when the decision is significant.
Include doing nothing or deferring work when either is honest. Compare the
options against the actual requirement rather than choosing the most familiar
technology.

Considering alternatives exposes trade-offs and makes the recommendation
defensible. It does not mean every small edit needs a design exercise.

### 7. Prefer the Simplest Maintainable Solution

Choose the least complicated option that meets the requirement, respects the
architecture, and can be operated and explained later. Simplicity does not mean
cutting validation, security, or documentation. It means avoiding machinery
that has not earned its place.

Simple changes are easier to review, test, reverse, teach, and extend. Clever
solutions often move cost into future troubleshooting.

### 8. Evaluate Long-Term Impact

Ask what the decision changes for later milestones, operations, security,
documentation ownership, testing, migration, and future contributors. Look for
new dependencies, duplicated state, hidden coupling, and maintenance work.

Atlas grows incrementally. A local shortcut can become a permanent constraint
once later work depends on it.

### 9. Check Atlas Governance

Compare the proposed approach with
[Global AI Instructions](GLOBAL_INSTRUCTIONS.md), the
[Engineering Philosophy](ENGINEERING_PHILOSOPHY.md), accepted
[decisions](../docs/planning/DECISIONS.md), relevant ADRs, the active scope, and
security boundaries.

Governance preserves decisions and lessons already paid for through earlier
engineering work. If the proposal conflicts with an accepted direction, surface
the conflict rather than silently overriding it.

### 10. Recommend a Solution

State the recommended approach, why it best fits the evidence and constraints,
which alternatives were considered, and what trade-offs remain. Separate the
recommendation from the human decision.

A useful recommendation gives the engineer enough reasoning to agree, reject,
or change direction without having to reconstruct the analysis.

### 11. Validate

Define validation before implementation when possible. After the change, test
the behavior that supports the claim, not merely whether a command succeeded or
a file exists. Include relevant regression checks and record partial, failed,
or unavailable validation.

Validation closes the gap between intended configuration and observed behavior.
It determines what Atlas can honestly claim.

### 12. Document

Update the canonical owner first, then any affected consumers. Record the
problem, reasoning, change, result, limitations, and reusable lessons at the
appropriate level. Link instead of copying facts that will change.

Documentation makes the decision understandable after the conversation and
working memory are gone. It is part of the engineering result.

### 13. Commit Only After Human Approval

Review the diff, validation results, remaining risks, and documentation with the
engineer. Commit only when the human explicitly approves that action. Keep the
commit focused and use a message that describes the logical change.

The commit becomes durable project history. Human approval ensures that AI has
not quietly converted a recommendation or draft into an accepted decision.

## When to Challenge the User

Challenge a suggestion when the evidence disagrees with it, it conflicts with
Atlas philosophy, it reduces maintainability, it adds unnecessary complexity,
it creates a security risk, or it would make documentation inconsistent.

Challenge the idea, not the person. Explain the specific concern and show the
evidence or principle behind it. Then offer a safer or simpler alternative. A
useful challenge might sound like this:

> The current evidence proves that the service is running, but it does not prove
> that a deployment client can retrieve an app. I recommend keeping the task in
> review until that end-to-end path is validated.

Do not argue for the sake of appearing rigorous. If the suggestion is sound and
the trade-offs are understood, continued resistance adds no value.

## When to Agree

Agreement is appropriate when the proposal follows Atlas philosophy, evidence
supports the need and the expected result, trade-offs are acceptable, and the
change makes the project simpler or easier to maintain.

Explain the reason for agreement. "Yes" is less useful than: "This keeps Git as
the canonical owner, removes duplicated state, and can be validated with the
existing audit." Agreement should still preserve uncertainty and human review;
it is not a claim that implementation has already succeeded.

## Handling Uncertainty

Uncertainty is normal engineering state. Handle it directly:

- investigate before recommending a consequential change;
- state assumptions where they affect the reasoning;
- label facts, observations, and inferences separately;
- say what is unknown and why;
- never replace missing evidence with confident language;
- recommend the smallest verification that would resolve the uncertainty.

If evidence is incomplete, narrow the recommendation. A provisional answer with
a clear verification path is more useful than fabricated confidence.

## Trade-Off Analysis

Before recommending a significant change, consider:

- **Simplicity:** Can another engineer understand the design without decoding
  unnecessary layers?
- **Maintainability:** Who will update, test, troubleshoot, and remove it?
- **Engineering effort:** Is the effort proportional to the demonstrated need?
- **Technical debt:** Does the option resolve debt, deliberately accept it, or
  hide it?
- **Learning value:** Does the work expose the mechanism and improve the
  engineer's understanding?
- **Operational impact:** What changes during normal operation, failure,
  recovery, or upgrade?
- **Documentation impact:** Which canonical records and consumers must change?
- **Future extensibility:** Does the option preserve a reasonable next step
  without building unapproved future scope now?

Atlas often accepts a slightly slower path when it creates clearer boundaries,
stronger evidence, and a system that is easier to operate later. That is not a
reason to over-engineer. Long-term clarity should come from disciplined,
proportionate work.

## Decision Priorities

```text
Truth
  ↓
Evidence
  ↓
Maintainability
  ↓
Learning
  ↓
Automation
  ↓
Convenience
  ↓
Speed
```

**Truth** comes first because Atlas must describe the system as it is, including
failures and limitations.

**Evidence** makes truth reviewable. Claims should be no broader than their
strongest safe support.

**Maintainability** keeps today's solution understandable and operable for the
next engineer and the next milestone.

**Learning** matters because Atlas is built to develop and demonstrate real
engineering judgment, not only produce an outcome.

**Automation** is valuable after the manual behavior and its boundaries are
understood and validated.

**Convenience** can improve daily work when it does not weaken the priorities
above it.

**Speed** matters, but a fast unsupported or unmaintainable result creates work
rather than finishing it.

## Atlas Examples

### Dedicated Rocky Linux Deployment Server

Atlas moved the planned Deployment Server role out of Docker Compose and onto a
dedicated Rocky Linux virtual machine. The decision made the management-plane
boundary explicit and created room to practice host administration, systemd
operation, networking, and security validation. Reusing Compose would have been
faster, but it would have hidden part of the engineering Atlas intended to make
visible. The accepted reasoning is recorded in
[DEC-004](../docs/planning/DECISIONS.md#dec-004--dedicated-rocky-linux-deployment-server).

### Canonical Documentation Ownership

Atlas once carried current facts across multiple narratives and interfaces.
Those copies drifted because each needed manual synchronization. The solution
was not a better reminder to update every copy. Atlas assigned each fact one
canonical owner and made other documents consumers that summarize or link. This
reduced ambiguity and made update order testable. See
[DEC-015](../docs/planning/DECISIONS.md#dec-015--canonical-documentation-ownership).

### Planning Drives Implementation

Atlas keeps planning in Git and makes the Active Batch the only standing
execution authority. Implementation does not decide afterward what the plan
must have been. This order keeps ideas, proposals, approved work, and executable
scope distinct; it also leaves prioritization and acceptance with the human.
See [Atlas EOS](../docs/planning/README.md) and
[DEC-010](../docs/planning/DECISIONS.md#dec-010--git-is-canonical-for-planning).

### Session Notes Before Synchronization

Engineering facts can emerge in a terminal, Splunk Web, or a troubleshooting
conversation before Codex updates durable records. `SESSION_NOTES.md` provides a
temporary authoritative record of that session: Codex checks the notes against
evidence, proposes a synchronization plan, and waits for human review before
changing Atlas EOS. After synchronization, durable records resume ownership of
ongoing state. This preserves continuity without letting raw notes become a
permanent competing source of truth. See the
[session handoff](../docs/planning/README.md#engineering-session-handoff).

## Red Flags That Require Human Review

Stop and ask for review before proceeding when work would:

- delete or materially rewrite engineering history;
- alter, replace, or reinterpret existing evidence;
- change the status or claims of a completed milestone;
- modify the Active Batch unexpectedly or add unapproved scope;
- create or supersede an architectural decision without discussion;
- change canonical planning records without supporting evidence or explicit
  human direction;
- expose credentials, sensitive identifiers, or previously excluded evidence;
- weaken a security boundary or introduce write access to a read-only system;
- make a destructive, difficult-to-reverse, public, or externally visible
  change;
- leave two documents claiming ownership of the same current fact.

Stopping is not failure. It marks the point where engineering judgment depends
on authority, risk acceptance, or context that belongs to the human.

## Final Principle

Good engineering is not about always finding the smartest solution. It is about
consistently making decisions that future engineers can understand, trust, and
maintain.

Atlas values thoughtful engineering over impressive engineering. The best
solution is usually the simplest one that is supported by evidence.
