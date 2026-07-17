# 54. Webhooks Architecture

## Role
Webhooks are the sole trigger for recognizing a successful transaction.

## Routes
Stored under `app/api/webhooks/`:
- `razorpay/route.ts` (Active)
- `stripe/route.ts` (Stub)
- `paypal/route.ts` (Stub)

## Processing Logic
1. Receive raw body and headers.
2. Delegate verification to `WebhookSecurityService`.
3. Check idempotency.
4. Map gateway-specific event names (e.g., `payment.captured`) to internal `PaymentStatus`.
5. Trigger `DonationService.handlePaymentSuccess`.
