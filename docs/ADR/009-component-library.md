# Architecture Decision Record: 009 Component Library

## Decision
Utilize `shadcn/ui` as the foundational layer for all UI components, but heavily customize the generated source code to match the Stuti-Vani Foundation Design System, diverging from the default shadcn appearance.

## Context
Building a robust, fully accessible component library (with keyboard navigation, focus traps, ARIA roles) from scratch is extremely time-consuming. However, using a pre-packaged library (like Material UI or Chakra) restricts design freedom and often results in a generic appearance.

## Alternatives Considered
- **Building from scratch:** Too slow, high risk of accessibility bugs.
- **MUI / Chakra UI:** Locks the project into a specific aesthetic and adds heavy runtime dependencies.

## Advantages
- `shadcn/ui` provides copy-paste code utilizing Radix UI primitives, ensuring flawless accessibility and keyboard navigation.
- Because we own the code (it lives in our repository), we can completely overhaul the CSS to match our unique, premium brand aesthetic.
- Zero runtime styling overhead (pure Tailwind).

## Disadvantages
- Components must be updated manually if the underlying primitives change significantly.
- Requires initial effort to strip out default styles and replace them with our custom design tokens.

## Long-Term Impact
Delivers a highly accessible, extremely performant, and completely bespoke user interface that can scale infinitely without vendor lock-in.
