# 55. Payment Providers

## Architecture
The system utilizes a Factory Pattern to support multiple gateways interchangeably.

## Active Provider
Configured via `PAYMENT_CONFIG.ACTIVE_PROVIDER` (default: `razorpay`).

## Interface Requirements
Every new provider must implement `IPaymentProvider`:
- `name`
- `createOrder()`
- `verifyPayment()`
- `refundPayment()`
- `getPaymentStatus()`
- `generateReceipt()`
- `cancelPayment()`

This structure ensures that switching from Razorpay to Stripe in the future requires zero changes to the core donation flow or UI, only a new environment variable.
