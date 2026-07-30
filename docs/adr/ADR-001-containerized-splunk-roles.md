# ADR-001: Model Separate Splunk Roles with Containers

## Status

Accepted

## Context

Atlas needs a practical environment for learning and demonstrating the
relationships between Splunk search, indexing, deployment management, log
generation, and forwarding. The available infrastructure is one Windows
workstation.

A single Splunk instance would minimize resource use but hide important role
boundaries. Multiple physical systems or a larger virtual-machine estate would
add cost and operating overhead before the core workflow was validated.

## Decision

Use Docker Desktop and Docker Compose to model the Search Head, Indexer, and
Deployment Server as separate services on a dedicated bridge network. Add the
Linux log source and Universal Forwarder only when the infrastructure layer has
completed runtime validation.

Treat Atlas as a containerized learning lab. Do not describe it as a production
deployment.

## Consequences

Separate services make responsibilities, storage ownership, and network paths
visible. They can be inspected and revised independently, and the topology is
achievable on personal hardware.

All roles still share one physical failure and resource domain. Container
networking and storage do not reproduce every production constraint. Image
support, licensing, resource use, security, and runtime behavior require
explicit validation before operational claims are made.
