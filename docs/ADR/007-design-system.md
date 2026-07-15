# Architecture Decision Record: 007 Design System

## Decision
Establish a strict design token system centralized in CSS variables and heavily customize components to match the exact Brand Guidelines (Forest Green, Emerald, Amber, Inter/Geist fonts, rounded corners).

## Context
A unified brand identity is crucial for establishing trust in the Stuti-Vani Foundation. Hardcoded colors or inconsistent spacing damage perceived professionalism. 

## Alternatives Considered
- **Tailwind configuration object (`tailwind.config.ts`):** With Tailwind v4, this is deprecated in favor of CSS variables.
- **CSS-in-JS (Styled Components):** Causes performance overhead and conflicts with React Server Components.

## Advantages
- Tailwind v4's CSS-first approach enables faster builds and seamless integration with CSS variables.
- Single source of truth for all brand colors, typography scales, and shadows.
- Instant dark mode switching without React re-renders.

## Disadvantages
- Developers must familiarize themselves with the new Tailwind v4 `@theme` syntax instead of the legacy `tailwind.config.js`.

## Long-Term Impact
Guarantees a pixel-perfect, consistent UI that can be easily updated globally by tweaking a single CSS variable, preserving the brand's premium identity.
