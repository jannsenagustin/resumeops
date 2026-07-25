# Enterprise Observability Home Lab Diagram

This diagram represents the planned Sprint 6A architecture. It describes responsibilities and relationships, not a completed deployment.

```mermaid
flowchart TB
    subgraph host["Windows Host"]
        subgraph docker["Docker Desktop"]
            network["Dedicated Docker Network"]
            searchHead["Splunk Search Head<br/>Monitoring Console"]
            indexer["Splunk Indexer"]
            deploymentServer["Splunk Deployment Server"]
            linuxSource["Linux Log Source"]
            forwarder["Splunk Universal Forwarder"]

            network --- searchHead
            network --- indexer
            network --- deploymentServer
            network --- linuxSource
            network --- forwarder

            linuxSource -->|"provides log files"| forwarder
            forwarder -->|"sends event data"| indexer
            searchHead -->|"searches"| indexer
            deploymentServer -->|"manages forwarder configuration"| forwarder
        end
    end
```

The Deployment Server relationship is limited to the Universal Forwarder. The diagram does not imply Deployment Server management of the Indexer or Search Head.
