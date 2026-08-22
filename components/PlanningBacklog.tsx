"use client";

import { useState } from "react";
import {
  planningFilters,
  planningPriorities,
  type BacklogItem,
  type Idea,
  type PlanningFilter,
} from "../lib/atlasPlanningTypes";

type SelectedFilter = PlanningFilter | "All";

export default function PlanningBacklog({ items, ideas }: { items: BacklogItem[]; ideas: Idea[] }) {
  const [filter, setFilter] = useState<SelectedFilter>("All");
  const filteredItems = filter === "All"
    ? items
    : items.filter((item) => item.categories.includes(filter));
  const filteredIdeas = filter === "All"
    ? ideas
    : ideas.filter((idea) => idea.category === filter || (filter === "Website / UX" && idea.category === "Website"));

  return (
    <>
      <section id="backlog" className="planning-section" aria-labelledby="planning-backlog-title">
      <header className="planning-section__header">
        <div><span>03 / WORK INVENTORY</span><h2 id="planning-backlog-title">Backlog by priority</h2></div>
        <p>Filters change only this view. Canonical task state remains in Git.</p>
      </header>

      <div className="planning-filters" aria-label="Filter backlog and Idea Inbox by category">
        {(["All", ...planningFilters] as const).map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="planning-priority-groups" aria-live="polite">
        {planningPriorities.map((priority) => {
          const priorityItems = filteredItems.filter((item) => item.priority === priority);
          return (
            <section key={priority} className="planning-priority" aria-labelledby={`priority-${priority.toLowerCase()}`}>
              <header><h3 id={`priority-${priority.toLowerCase()}`}>{priority}</h3><span>{priorityItems.length} records</span></header>
              {priorityItems.length === 0 ? (
                <p className="planning-inline-empty">No matching work at this priority.</p>
              ) : (
                <div className="planning-backlog-grid">
                  {priorityItems.map((item) => (
                    <details key={item.id} className="planning-task">
                      <summary>
                        <span><b>{item.id}</b><small>{item.status}</small></span>
                        <strong>{item.title}</strong>
                        <em>{item.milestone}</em>
                      </summary>
                      <div>
                        <p>{item.description}</p>
                        <dl>
                          <div><dt>WHY IT MATTERS</dt><dd>{item.whyItMatters}</dd></div>
                          <div><dt>DEPENDENCIES</dt><dd>{item.dependencies}</dd></div>
                          <div><dt>ACCEPTANCE</dt><dd>{item.acceptanceCriteria}</dd></div>
                          <div><dt>HUMAN VALIDATION</dt><dd>{item.humanValidationRequired}</dd></div>
                        </dl>
                        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Open canonical task ↗</a>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      </section>

      <section id="idea-inbox" className="planning-section" aria-labelledby="idea-inbox-title">
        <header className="planning-section__header">
          <div><span>04 / CAPTURE LAYER</span><h2 id="idea-inbox-title">Idea Inbox</h2></div>
          <p>Lightweight possibilities awaiting human review. Ideas are not commitments.</p>
        </header>
        {filteredIdeas.length === 0 ? (
          <p className="planning-inline-empty">No ideas match the selected category.</p>
        ) : (
          <div className="planning-idea-grid" aria-live="polite">
            {filteredIdeas.map((idea) => (
              <article className="planning-idea-card" data-status={idea.status.toLowerCase()} key={idea.id}>
                <header><span>{idea.id}</span><small>{idea.status}</small></header>
                <h3>{idea.title}</h3>
                <p>{idea.description}</p>
                <dl>
                  <div><dt>CATEGORY</dt><dd>{idea.category}</dd></div>
                  <div><dt>POTENTIAL DESTINATION</dt><dd>{idea.potentialDestination}</dd></div>
                  {idea.relatedProposal !== "None" && <div><dt>RELATED PROPOSAL</dt><dd>{idea.relatedProposal}</dd></div>}
                  {idea.relatedBacklog !== "None" && <div><dt>RELATED BACKLOG</dt><dd>{idea.relatedBacklog}</dd></div>}
                </dl>
                <a href={idea.sourceUrl} target="_blank" rel="noopener noreferrer">Open canonical idea ↗</a>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
