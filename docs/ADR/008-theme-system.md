# Architecture Decision Record: 008 Theme System

## Decision
Support Light, Dark, and System themes natively using `next-themes` and CSS variables, strictly defining semantic colors (e.g., `--background`, `--card`, `--primary`) rather than hardcoded hex values in classes.

## Context
Modern web applications are expected to respect user system preferences. A hardcoded light theme reduces accessibility for users who prefer or require dark interfaces.

## Alternatives Considered
- **Manual Context Provider:** Re-inventing the wheel.
- **Tailwind `dark:` classes everywhere:** E.g., `bg-white dark:bg-black`. This bloats the HTML and makes maintenance difficult.

## Advantages
- By utilizing CSS variables (e.g., `bg-background text-foreground`), components automatically adapt to the active theme without adding `dark:` variants to every element.
- `next-themes` handles hydration mismatches safely.

## Disadvantages
- Designing a dark mode requires defining an entirely parallel color palette to ensure contrast and accessibility.

## Long-Term Impact
Ensures a universally accessible platform that looks premium in all environments, minimizing code duplication in components.
