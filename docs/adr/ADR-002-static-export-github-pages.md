# ADR-002: Static Export Deployment using GitHub Pages

## Status

Accepted

## Context

ResumeOps is currently a content-focused portfolio whose routes can be generated at build time. It needs a low-maintenance public deployment path that works directly from the GitHub repository and does not require a continuously running application server.

## Decision

Use Next.js static export and deploy the generated `out/` directory to GitHub Pages through GitHub Actions.

Production builds use the `/resumeops` base path and asset prefix, trailing slashes, and unoptimized images to support repository-based Pages hosting.

## Reasoning

- The current site does not require runtime server rendering.
- GitHub Pages aligns hosting with the public source repository.
- GitHub Actions provides a repeatable build-and-deploy workflow.
- Static assets are simple to cache, inspect, and serve.
- The deployment has no separate application-server operations burden.

## Consequences

### Benefits

- Reproducible deployment from `main`.
- No persistent Node.js server.
- Low hosting complexity for the current scope.
- Static routes can be validated during the production build.

### Trade-offs

- Next.js features that require a runtime server are unavailable.
- Production links and assets must respect the repository base path.
- Images cannot depend on the Next.js optimization service.
- Dynamic features would require client-side services, prebuilt data, or a different hosting architecture.

## Future Considerations

Revisit this decision if ResumeOps requires authenticated content, server actions, runtime APIs, request-time rendering, or other capabilities that cannot be delivered safely as a static export. A future hosting change should be recorded in a new ADR rather than silently changing this accepted decision.
