# 69. Template Engine

## The Problem
Hardcoded email HTML strings inside business services are impossible to maintain and impossible to keep visually consistent.

## The React Solution
We utilize React components for all templates (`features/notifications/templates/emails/`).
1. A global `EmailLayout` component enforces the brand colors from `constants/branding.ts`, ensuring consistency across every single email sent.
2. The `TemplateRegistry` maps strings like `EVENT_TICKET` to the exact React component and subject line logic.
3. The Provider renders the React tree to static HTML immediately prior to sending.
