import type { Metadata } from "next";
import AtlasProjectExplorer from "../../../components/AtlasProjectExplorer";
import EvidenceViewer from "../../../components/EvidenceViewer";
import searchPeer from "../../../docs/evidence/milestone-03-distributed-search/2026-08-06_001_search_peer_configuration.png";
import distributedResults from "../../../docs/evidence/milestone-03-distributed-search/2026-08-06_001_distributed_search_results.png";
import distributedInspector from "../../../docs/evidence/milestone-03-distributed-search/2026-08-06_001_search_job_inspector_results.png";
import forwarderService from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-01-universal-forwarder-service-running.png";
import receiverConnectivity from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-02-indexer-receiver-connectivity.png";
import activeForward from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-03-universal-forwarder-active-connection.png";
import windowsIngestion from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-04-windows-event-ingestion.png";
import windowsExecution from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-05-distributed-search-execution.png";

export const metadata: Metadata = {
  title: "Project Atlas | Engineering Record",
  description: "Explore Atlas through its system architecture, decision trail, validation evidence, build record, field notes, and source.",
};

const evidence = [
  { id:"EVD-03-01", claim:"Search peer configured", observed:"atlas-indexer:8089 captured as Up, Healthy, and Enabled.", src:searchPeer, alt:"Splunk Search Peers page showing atlas-indexer on port 8089 as Up, Healthy, and Enabled.", related:["D-003","FN-003"] },
  { id:"EVD-03-02", claim:"Distributed results returned", observed:"Metadata search returned Indexer-associated data; shown counts are point-in-time observations.", src:distributedResults, alt:"Search Head metadata results showing atlas-indexer and atlas-search-head.", related:["D-001","Milestone 03"] },
  { id:"EVD-03-03", claim:"Remote execution confirmed", observed:"Job Inspector showed dispatch.stream.remote.atlas-indexer.", src:distributedInspector, alt:"Search Job Inspector showing dispatch.stream.remote.atlas-indexer for the distributed metadata search.", related:["D-007","Milestone 03"] },
  { id:"EVD-04-01", claim:"Forwarder service running", observed:"Windows reported the SplunkForwarder service in Running state.", src:forwarderService, alt:"Windows PowerShell showing the SplunkForwarder service running.", related:["D-005","Milestone 04"] },
  { id:"EVD-04-02", claim:"Receiver reachable", observed:"Windows reached 127.0.0.1 on TCP 9997.", src:receiverConnectivity, alt:"Test-NetConnection confirming TCP connectivity to 127.0.0.1 port 9997.", related:["D-004","FN-004"] },
  { id:"EVD-04-03", claim:"Forwarding session active", observed:"Active forwards listed 127.0.0.1:9997 with no inactive forwards.", src:activeForward, alt:"Universal Forwarder CLI showing 127.0.0.1:9997 under active forwards.", related:["D-005","FN-004"] },
  { id:"EVD-04-04", claim:"Windows telemetry searchable", observed:"Application, Security, and System Event Logs returned for JNNSN; shown counts are point-in-time.", src:windowsIngestion, alt:"Search Head results listing Application, Security, and System Event Logs from JNNSN.", related:["D-005","Milestone 04"] },
  { id:"EVD-04-05", claim:"End-to-end remote execution", observed:"Job Inspector identified execution against atlas-indexer.", src:windowsExecution, alt:"Job Inspector showing remote atlas-indexer execution for the Windows telemetry search.", related:["D-007","FN-004"] },
] as const;

export default function AtlasProjectPage() {
  return <AtlasProjectExplorer evidence={<>{evidence.map((item,index)=><article id={item.id.toLowerCase()} className={`evidence-record ${index===2||index===7?"is-primary":""}`} key={item.id}><div><b>{item.id}</b><h3>{item.claim}</h3><dl><div><dt>OBSERVED</dt><dd>{item.observed}</dd></div><div><dt>RESULT</dt><dd className="state-value">VALIDATED</dd></div><div><dt>RELATED</dt><dd>{item.related.join(" · ")}</dd></div></dl></div><EvidenceViewer src={item.src} alt={item.alt} caption={`${item.id} · ${item.claim}`} prominence={index===2||index===7?"primary":"supporting"}/></article>)}</>} />;
}
