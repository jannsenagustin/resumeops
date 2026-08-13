"use client";

import { useState } from "react";
import Link from "next/link";

type TraceMode = "ingestion" | "search" | "reset";
type NodeId = "logs" | "forwarder" | "transport" | "indexer" | "search-head";

const nodes = {
  logs: { label: "Windows Event Logs", role: "Inputs", details: [["HOST", "JNNSN"], ["SOURCES", "Application / Security / System"], ["STATE", "VALIDATED"]] },
  forwarder: { label: "Universal Forwarder", role: "Host service", details: [["VERSION", "10.0.8"], ["HOST", "JNNSN"], ["SERVICE", "SplunkForwarder"], ["STATE", "RUNNING"]] },
  transport: { label: "Transport 9997", role: "Loopback-published receiver", details: [["HOST ENDPOINT", "127.0.0.1:9997"], ["CONTAINER ENDPOINT", "9997/tcp"], ["STATE", "VALIDATED"]] },
  indexer: { label: "atlas-indexer", role: "Indexer / search peer", details: [["RUNTIME", "Splunk 10.0.8"], ["RECEIVER", "TCP/9997"], ["MANAGEMENT", "HTTPS/8089"], ["STATE", "VALIDATED"]] },
  "search-head": { label: "atlas-search-head", role: "Search Head", details: [["RUNTIME", "Splunk 10.0.8"], ["RELATIONSHIP", "Distributed Search"], ["PEER", "atlas-indexer"], ["STATE", "VALIDATED"]] },
} satisfies Record<NodeId, { label: string; role: string; details: string[][] }>;

const traceNodes: Record<TraceMode, NodeId[]> = {
  ingestion: ["logs", "forwarder", "transport", "indexer"],
  search: ["indexer", "search-head"],
  reset: [],
};

export default function AtlasSystemExplorer() {
  const [mode, setMode] = useState<TraceMode>("reset");
  const [selected, setSelected] = useState<NodeId>("forwarder");
  const active = traceNodes[mode];
  const selectedNode = nodes[selected];

  function nodeButton(id: NodeId, eyebrow: string) {
    return (
      <button type="button" className={`atlas-node atlas-node--${id} ${active.includes(id) ? "is-traced" : ""} ${selected === id ? "is-selected" : ""}`} onClick={() => setSelected(id)} aria-pressed={selected === id}>
        <span className="atlas-node__eyebrow">{eyebrow}</span>
        <strong>{nodes[id].label}</strong><span>{nodes[id].role}</span>
        <span className="atlas-node__state">● {id === "forwarder" ? "RUNNING" : "VALIDATED"}</span>
      </button>
    );
  }

  return (
    <section className="system-explorer" aria-labelledby="system-explorer-title">
      <div className="system-explorer__topline"><div><p className="record-label">INTERACTIVE SYSTEM PREVIEW</p><h2 id="system-explorer-title">Atlas architecture</h2></div><p className="system-explorer__mode" aria-live="polite">MODE / {mode === "reset" ? "SYSTEM OVERVIEW" : `TRACE ${mode.toUpperCase()}`}</p></div>
      <div className={`atlas-schematic trace-${mode}`}>
        <div className="atlas-boundary atlas-boundary--host" aria-label="Windows host JNNSN"><span className="atlas-boundary__label">WINDOWS HOST / JNNSN</span>{nodeButton("logs", "EVENT SOURCES")}<span className="atlas-connector atlas-connector--one" aria-hidden="true">→</span>{nodeButton("forwarder", "HOST SERVICE")}</div>
        <span className="atlas-connector atlas-connector--two" aria-hidden="true">→</span>{nodeButton("transport", "TCP")}<span className="atlas-connector atlas-connector--three" aria-hidden="true">→</span>
        <div className="atlas-boundary atlas-boundary--docker" aria-label="Docker environment"><span className="atlas-boundary__label">DOCKER / ATLAS-NETWORK</span>{nodeButton("indexer", "CONTAINER")}<span className="atlas-connector atlas-connector--four" aria-hidden="true">⇄<small>HTTPS / 8089</small></span>{nodeButton("search-head", "CONTAINER")}</div>
      </div>
      <div className="system-explorer__controls" aria-label="Architecture trace controls"><button type="button" className={mode === "ingestion" ? "is-active" : ""} onClick={() => setMode("ingestion")} aria-pressed={mode === "ingestion"}>TRACE INGESTION</button><button type="button" className={mode === "search" ? "is-active" : ""} onClick={() => setMode("search")} aria-pressed={mode === "search"}>TRACE SEARCH</button><button type="button" onClick={() => setMode("reset")}>RESET</button></div>
      <aside className="component-inspector" aria-labelledby="inspector-title"><div><p className="record-label">SELECTED COMPONENT</p><h3 id="inspector-title">{selectedNode.label}</h3><p>{selectedNode.role}</p></div><dl>{selectedNode.details.map(([term, value]) => <div key={term}><dt>{term}</dt><dd className={term === "STATE" ? "state-value" : ""}>{value}</dd></div>)}</dl><Link href="/projects/atlas/#evidence">VIEW EVIDENCE <span aria-hidden="true">→</span></Link></aside>
      <p className="sr-only">Atlas uses a Windows-host Universal Forwarder to send Windows Event Logs to 127.0.0.1 port 9997, published to the atlas-indexer container. The atlas-search-head coordinates distributed search with atlas-indexer over management port 8089.</p>
    </section>
  );
}
