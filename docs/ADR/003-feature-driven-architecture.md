# Architecture Decision Record: 003 Feature Driven Architecture

## Decision
Organize the codebase using Feature Driven Development (FDD), grouping related code (components, hooks, services, types) by business feature rather than by technical layer.

## Context
Standard React applications often group files by type (e.g., all hooks in one folder, all components in another). As the platform scales, this approach creates massive directories and makes it difficult to understand the context of a feature or safely delete/refactor one.

## Alternatives Considered
- **Layer-first Architecture:** The traditional approach (all components together, all hooks together). Rejected because it scales poorly.
- **Micro-frontends:** Unnecessary complexity for the current team size and product scope.

## Advantages
- High cohesion. Code that changes together stays together.
- Easier to onboard new developers (they can focus on one feature folder).
- Prevents tangled dependencies. Features export a public API via barrel files (`index.ts`).

## Disadvantages
- Requires discipline to prevent "shared" logic from leaking into feature folders instead of the global `lib` or `hooks` directories.
- Initial directory setup is complex.

## Long-Term Impact
Ensures the codebase remains modular. If the "donations" feature needs to be rewritten, the blast radius is confined to `features/donations`.
