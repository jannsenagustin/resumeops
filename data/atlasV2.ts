export const atlasSectionNav = [
  ["00", "Current State", "current-state"], ["01", "Milestones", "milestones"],
  ["02", "System", "system"], ["03", "Decision Trail", "decision-trail"],
  ["04", "Validation", "validation"], ["05", "Field Notes", "field-notes"],
  ["06", "Limitations", "limitations"], ["07", "Source of Truth", "source-of-truth"],
] as const;

export const atlasComponents = {
  logs: { name: "Windows Event Logs", role: "Supplies the Windows telemetry used to validate the Atlas ingestion path.", metadata: [["HOST", "JNNSN"], ["INPUTS", "Application / Security / System"], ["STATE", "VALIDATED"]], related: ["D-005", "EVD-04-04"] },
  forwarder: { name: "Universal Forwarder", role: "Collects Windows telemetry and forwards it to the Atlas Indexer.", metadata: [["VERSION", "10.0.8"], ["HOST", "JNNSN"], ["SERVICE", "SplunkForwarder"], ["DESTINATION", "127.0.0.1:9997"], ["STATE", "VALIDATED"]], related: ["D-005", "FN-004", "EVD-04-03"] },
  boundary: { name: "Host / container boundary", role: "Makes the container receiver reachable from Windows without exposing it to the LAN.", metadata: [["HOST", "127.0.0.1:9997"], ["CONTAINER", "atlas-indexer:9997"], ["SCOPE", "LOOPBACK ONLY"], ["STATE", "VALIDATED"]], related: ["D-004", "FN-004", "EVD-04-02"] },
  transport: { name: "TCP/9997 transport", role: "Carries Splunk-to-Splunk events from the host forwarder to the Indexer receiver.", metadata: [["PROTOCOL", "TCP"], ["PORT", "9997"], ["PURPOSE", "INGESTION"], ["STATE", "VALIDATED"]], related: ["D-004", "EVD-04-02", "EVD-04-03"] },
  indexer: { name: "atlas-indexer", role: "Stores and searches telemetry received from the Universal Forwarder.", metadata: [["RUNTIME", "Splunk 10.0.8"], ["RECEIVER", "TCP/9997"], ["MANAGEMENT", "HTTPS/8089"], ["WEB", "localhost:8001"], ["STATE", "VALIDATED"]], related: ["D-001", "D-002", "EVD-04-04"] },
  management: { name: "HTTPS/8089 relationship", role: "Carries distributed-search management traffic between the Search Head and Indexer.", metadata: [["ENDPOINT", "atlas-indexer:8089"], ["NETWORK", "atlas-network"], ["PURPOSE", "DISTRIBUTED SEARCH"], ["STATE", "VALIDATED"]], related: ["D-003", "D-007", "FN-003"] },
  searchHead: { name: "atlas-search-head", role: "Provides the interface that coordinates searches against the remote Indexer.", metadata: [["RUNTIME", "Splunk 10.0.8"], ["PEER", "atlas-indexer"], ["WEB", "localhost:8000"], ["STATE", "VALIDATED"]], related: ["D-001", "D-007", "EVD-03-03"] },
  storage: { name: "Docker named storage", role: "Preserves each Splunk role’s configuration and runtime data outside its disposable container layer.", metadata: [["ROLES", "Indexer / Search Head"], ["VOLUMES", "etc / var per role"], ["STATE", "VALIDATED"]], related: ["D-002", "Milestone 02"] },
} as const;

export const atlasDecisionsV2 = [
  { id:"D-001", title:"Separate Search Head and Indexer", context:"A single Splunk instance would hide the boundary between search coordination and indexing.", decision:"Run the Search Head and Indexer as separate services.", rationale:"Separate roles make distributed-search responsibilities visible on one workstation.", tradeoff:"Both roles still share one host and failure domain.", validation:"Milestone 03 proved remote Indexer execution from the Search Head.", related:["system","EVD-03-03","Milestone 03"] },
  { id:"D-002", title:"Persist each role independently", context:"Disposable containers must not own durable Splunk configuration and runtime state.", decision:"Assign separate etc and var named volumes to each role.", rationale:"Ownership and recovery boundaries remain explicit across container recreation.", related:["system","Milestone 02"] },
  { id:"D-003", title:"Use Docker DNS internally", context:"Container addresses may change.", decision:"Use atlas-indexer on atlas-network for internal communication.", rationale:"The stable service name supports the distributed-search endpoint at HTTPS/8089.", tradeoff:"Docker DNS is not available to the Windows-host forwarder.", related:["system","EVD-03-01"] },
  { id:"D-004", title:"Publish ingestion on loopback", context:"The Windows forwarder needs a host-reachable receiver.", decision:"Map 127.0.0.1:9997 to atlas-indexer:9997.", rationale:"The receiver remains available to the host without being opened to the LAN.", tradeoff:"Only local host clients can reach the published endpoint.", validation:"TCP reachability and an active Splunk forwarding session were validated separately.", related:["FN-004","EVD-04-02","EVD-04-03"] },
  { id:"D-005", title:"Install Universal Forwarder on Windows", context:"Atlas needed a real external source outside the Docker network.", decision:"Run Universal Forwarder 10.0.8 as the SplunkForwarder Windows service.", rationale:"This creates an authentic host-to-container ingestion boundary for Windows Event Logs.", tradeoff:"Configuration is direct because Deployment Server is not implemented.", validation:"Service, forwarding, searchable inputs, and remote execution were captured.", related:["FN-004","EVD-04-01","EVD-04-04"] },
  { id:"D-006", title:"Keep Deployment Server deferred", context:"Milestone 04 focused on proving one ingestion path.", decision:"Configure the forwarder directly and leave Deployment Server undeployed.", rationale:"Managed forwarding would add scope before the transport and data path were proven.", tradeoff:"No centralized UF app management exists.", related:["limitations","Milestone 04"] },
  { id:"D-007", title:"Require execution evidence", context:"A configured or healthy peer does not prove that searches execute remotely.", decision:"Use Job Inspector as the decisive validation record.", rationale:"dispatch.stream.remote.atlas-indexer identifies remote Indexer participation.", validation:"Captured for both Milestone 03 and Milestone 04 searches.", related:["EVD-03-03","EVD-04-05"] },
] as const;

export const fieldNotes = [
  { id:"FN-001", title:"Container permission boundary", observed:"The initial ansible user could not read server.conf.", cause:"The application container restricts access to instance configuration.", resolution:"Re-entered with UID 0 for focused inspection.", lesson:"Confirm the execution identity before diagnosing a missing file.", related:["D-003","Milestone 03"] },
  { id:"FN-002", title:"Minimal container toolset", observed:"Common editors and utilities were absent.", cause:"The image intentionally contains a minimal runtime toolset.", resolution:"Copied the file to the host, edited it there, and copied it back.", lesson:"Do not install unnecessary tooling into an application container.", related:["D-002","Milestone 03"] },
  { id:"FN-003", title:"Incorrect Splunk stanza placement", observed:"allowRemoteLogin was appended after an lmpool stanza.", cause:"Splunk assigns a parameter to the stanza immediately above it.", resolution:"Moved the setting into the existing [general] stanza under system/local and verified placement before restart.", lesson:"Inspect stanza structure before changing Splunk configuration.", related:["D-007","EVD-03-01"] },
  { id:"FN-004", title:"Configured but inactive forward", observed:"The configured destination appeared inactive while Docker services were unavailable.", cause:"A target cannot establish a Splunk session while its downstream receiver is offline; UF CLI validation also required a lab-specific remote-login adjustment.", resolution:"Restored Atlas services, adjusted the local CLI setting, restarted SplunkForwarder, and verified the active destination.", lesson:"Transport reachability, receiver availability, and forwarding state are separate validation questions.", related:["D-004","D-005","EVD-04-02","EVD-04-03"] },
] as const;

export const limitationsV2 = [
  ["Deployment Server", "NOT IMPLEMENTED"], ["UF app management", "NOT IMPLEMENTED"],
  ["Custom index strategy", "NOT IMPLEMENTED"], ["Custom TLS / PKI", "NOT IMPLEMENTED"],
  ["Indexer clustering", "NOT IMPLEMENTED"], ["Search Head clustering", "NOT IMPLEMENTED"],
  ["High availability", "NOT IMPLEMENTED"], ["Azure DevOps pipeline", "FUTURE"],
  ["Kubernetes / Splunk Operator", "EXPLORATORY"],
] as const;
