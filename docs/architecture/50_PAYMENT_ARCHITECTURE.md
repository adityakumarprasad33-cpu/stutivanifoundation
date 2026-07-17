# 50. Payment Architecture

## Overview
The payment architecture separates the core business logic from specific payment providers (like Razorpay, Stripe, or PayPal). This decoupling is achieved using the Factory Pattern and standardized interfaces (`IPaymentProvider`).

## Key Principles
1. **Never Trust the Client**: Frontend components never dictate the `SUCCESS` state of a payment.
2. **Abstract Providers**: Business logic only communicates with `IPaymentProvider` methods, not SDK-specific endpoints.
3. **Idempotency**: All webhook events must be validated for idempotency to prevent duplicate donation records or emails.
4. **Centralized Policy**: State transitions are strictly governed by `PaymentPolicy`.

## Module Location
`features/payments/` contains:
- `providers/` (Factories and implementations)
- `services/` (Webhook security)
- `types/` (Unified enums and payloads)
- `policy/` (State machine rules)
