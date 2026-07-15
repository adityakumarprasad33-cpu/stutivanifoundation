# Architecture Decision Record: 004 Service Layer

## Decision
Extract all business logic, third-party API interactions, and database calls into a dedicated Service Layer (`services/`), strictly separating them from UI components and React Hooks.

## Context
React components often become bloated when data fetching, state management, and business rules are written directly inside them. This makes them hard to test, hard to reuse, and tightly couples the UI to specific backend implementations.

## Alternatives Considered
- **Fat Components:** Writing API calls directly inside `useEffect` or React Server Components. Rejected due to poor testability and tight coupling.
- **Redux/Global State for everything:** Rejected because much of our data is server state, better handled by the Service Layer combined with React Query or RSC caching.

## Advantages
- UI components become pure and testable.
- Swapping a backend provider (e.g., migrating off Firebase) only requires changing the service implementation, not the UI.
- Business logic can be reused across different interfaces (e.g., a web app and a mobile app).

## Disadvantages
- Adds an additional layer of abstraction (boilerplate).
- Developers must remember to pass data down from the service layer rather than fetching it directly.

## Long-Term Impact
Guarantees a decoupled architecture where the frontend framework and the backend services can evolve independently.
