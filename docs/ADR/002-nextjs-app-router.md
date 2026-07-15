# Architecture Decision Record: 002 Next.js App Router

## Decision
Use Next.js 15 App Router instead of the legacy Pages Router.

## Context
Next.js 15 introduces stable Server Components, Server Actions, and enhanced caching mechanisms. The platform requires high performance (Lighthouse goals) and strong SEO.

## Alternatives Considered
- **Next.js Pages Router:** Legacy, lack of Server Components.
- **Vite + React:** Requires manual implementation of SSR and routing.

## Advantages
- React Server Components (RSC) drastically reduce client-side bundle size.
- Improved Data Fetching and caching.
- Better SEO and perceived performance.
- Official support and long-term viability.

## Disadvantages
- Steeper learning curve for Server vs Client components.
- Caching bugs can occasionally be confusing during development.

## Long-Term Impact
Ensures the platform is built on modern React paradigms. Future-proofs the application against legacy React migrations and maximizes performance for global users.
