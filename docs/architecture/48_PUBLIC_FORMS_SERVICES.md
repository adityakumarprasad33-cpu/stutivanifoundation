# 48. Public Forms & Services

## Validation & State
All public-facing forms (Contact, Newsletter, Volunteer) utilize:
- **React Hook Form** for client-side state management.
- **Zod** for schema validation.

## Server Actions
Form submissions bypass standard API routes in favor of Next.js Server Actions, ensuring type safety and reducing client-side code.

## Services
- `NewsletterService` handles subscription deduplication and external CRM hooks.
- Contact submissions integrate with the internal Activity Logger and Email dispatcher.
