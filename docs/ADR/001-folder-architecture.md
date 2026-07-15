# Architecture Decision Record: 001 Folder Architecture

## Decision
Adopt a strictly structured, feature-based directory architecture decoupled from the `src/` Next.js standard wrapper, utilizing absolute path aliases (`@/*`).

## Context
The project needs to support scalability, maintainability, and clear separation of concerns as the Stuti-Vani Foundation platform grows. Default Next.js architectures often place everything in `app/` or `src/`, which becomes monolithic and tangled.

## Alternatives Considered
- **Default Next.js Structure:** Keeping everything in `app/` or `src/app/`.
- **Domain-Driven Design (DDD):** Overly complex for the current stage.

## Advantages
- Strong separation of concerns.
- Clear module boundaries (e.g., `features/auth/`, `features/projects/`).
- Enforces strict import rules, preventing tightly coupled code.
- Simplifies finding related components, hooks, and services.

## Disadvantages
- Initial scaffolding is heavy.
- Requires strict enforcement of path aliases.

## Long-Term Impact
Allows the team to add new features independently without causing regressions in existing areas. Enables seamless scaling of the engineering team.
