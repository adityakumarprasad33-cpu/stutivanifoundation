# 52. Payment Security

## Credential Management
- No gateway secrets are committed to the repository.
- Secrets are sourced exclusively from `.env.local`.
- The frontend only receives the `NEXT_PUBLIC_` keys required to mount the checkout flow.

## Webhook Validation
The `WebhookSecurityService` enforces that every incoming request to `/api/webhooks/*`:
1. Contains a valid signature header (e.g., `x-razorpay-signature`).
2. Can be cryptographically verified against the environment secret.
3. Has not been processed before (Idempotency key check).

## Mutation Access
Mutations against campaign statistics and donation records are executed using Admin SDK privileges triggered exclusively by the validated webhook.
