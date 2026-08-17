import type { Metadata } from "next";
import AtlasProjectExplorer from "../../../components/AtlasProjectExplorer";
import EvidenceViewer from "../../../components/EvidenceViewer";
import composeValidation from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_001_compose_validation.png";
import indexerHealthy from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_002_container_healthy.png";
import indexerDockerDesktop from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_003_docker_desktop.png";
import indexerFirstLogin from "../../../docs/evidence/milestone-01-first-containerized-deployment/2026-08-01_004_first_successful_login.png";
import rolesHealthy from "../../../docs/evidence/milestone-02-search-head/2026-08-05_001_search_head_and_indexer_healthy.png";
import searchHeadFirstLogin from "../../../docs/evidence/milestone-02-search-head/2026-08-05_002_search_head_first_login.png";
import multiServiceRuntime from "../../../docs/evidence/milestone-02-search-head/2026-08-05_003_docker_desktop_multi_service.png";
import sharedNetwork from "../../../docs/evidence/milestone-02-search-head/2026-08-05_004_shared_network.png";
import searchPeer from "../../../docs/evidence/milestone-03-distributed-search/2026-08-06_001_search_peer_configuration.png";
import distributedResults from "../../../docs/evidence/milestone-03-distributed-search/2026-08-06_001_distributed_search_results.png";
import distributedInspector from "../../../docs/evidence/milestone-03-distributed-search/2026-08-06_001_search_job_inspector_results.png";
import forwarderService from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-01-universal-forwarder-service-running.png";
import receiverConnectivity from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-02-indexer-receiver-connectivity.png";
import activeForward from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-03-universal-forwarder-active-connection.png";
import windowsIngestion from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-04-windows-event-ingestion.png";
import windowsExecution from "../../../docs/evidence/milestone-04-windows-event-ingestion/milestone-04-05-distributed-search-execution.png";

export const metadata: Metadata = {
  title: "Engineering Record",
  description: "Explore Atlas through its milestone chronology, system architecture, decision trail, validation evidence, field notes, and source.",
  openGraph: {
    title: "Engineering Record | Project Atlas",
    description: "Explore Atlas through its milestone chronology, system architecture, decision trail, validation evidence, field notes, and source.",
  },
  twitter: {
    title: "Engineering Record | Project Atlas",
    description: "Explore Atlas through its milestone chronology, system architecture, decision trail, validation evidence, field notes, and source.",
  },
};

const evidence = [
  { id:"EVD-01-01", claim:"Compose configuration resolved", observed:"docker compose config completed successfully with the configured environment values.", src:composeValidation, alt:"Terminal output showing successful Docker Compose configuration validation for Atlas.", related:["Milestone 01"] },
  { id:"EVD-01-02", claim:"Indexer container healthy", observed:"Docker reported atlas-indexer running with a healthy status.", src:indexerHealthy, alt:"Docker command output showing the atlas-indexer container in a healthy state.", related:["Milestone 01"] },
  { id:"EVD-01-03", claim:"Container runtime established", observed:"Docker Desktop showed the running atlas-indexer service.", src:indexerDockerDesktop, alt:"Docker Desktop showing the running Atlas Indexer container.", related:["Milestone 01"] },
  { id:"EVD-01-04", claim:"Indexer login confirmed", observed:"Splunk Web accepted the first Atlas administrator login through the Indexer.", src:indexerFirstLogin, alt:"Splunk Web displayed after the first successful administrator login to the Atlas Indexer.", related:["Milestone 01"] },
  { id:"EVD-02-01", claim:"Both Splunk roles healthy", observed:"Docker reported atlas-search-head and atlas-indexer healthy at the same time.", src:rolesHealthy, alt:"Docker command output showing healthy Search Head and Indexer containers.", related:["D-001","Milestone 02"] },
  { id:"EVD-02-02", claim:"Search Head login confirmed", observed:"Splunk Web accepted administrator access through the Search Head.", src:searchHeadFirstLogin, alt:"Splunk Search Head interface after the first successful administrator login.", related:["Milestone 02"] },
  { id:"EVD-02-03", claim:"Multi-service runtime established", observed:"Docker Desktop showed the Search Head and Indexer running as separate services.", src:multiServiceRuntime, alt:"Docker Desktop showing separate Atlas Search Head and Indexer containers running together.", related:["D-001","Milestone 02"] },
  { id:"EVD-02-04", claim:"Shared network membership confirmed", observed:"Docker network inspection showed both Splunk services attached to atlas-network with separate private addresses.", src:sharedNetwork, alt:"Docker network inspection showing atlas-search-head and atlas-indexer attached to atlas-network.", related:["D-003","Milestone 02"] },
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
  return <AtlasProjectExplorer evidence={<>{evidence.map(item=>{const isPrimary=item.id==="EVD-03-03"||item.id==="EVD-04-05";return <article id={item.id.toLowerCase()} className={`evidence-record ${isPrimary?"is-primary":""}`} key={item.id}><div><b>{item.id}</b><h3>{item.claim}</h3><dl><div><dt>OBSERVED</dt><dd>{item.observed}</dd></div><div><dt>RESULT</dt><dd className="state-value">VALIDATED</dd></div><div><dt>RELATED</dt><dd>{item.related.join(" · ")}</dd></div></dl></div><EvidenceViewer src={item.src} alt={item.alt} caption={`${item.id} · ${item.claim}`} prominence={isPrimary?"primary":"supporting"}/></article>})}</>} />;
}
