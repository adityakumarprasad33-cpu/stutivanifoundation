# 79. Payment & Gateway Setup (Razorpay)

## Overview
The platform processes donations using Razorpay. The system architecture uses a provider-agnostic interface (`IPaymentProvider`), allowing easy swapping to Stripe or PayPal if needed in the future.

## API Keys
1. Log into your Razorpay Dashboard.
2. Ensure you are in "Live Mode" (or "Test Mode" for staging).
3. Go to Settings -> API Keys.
4. Generate a new key and add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to your environment variables.

## Webhooks
Webhooks are critical for updating the donation status in Firestore when a payment succeeds.
1. In Razorpay, go to Settings -> Webhooks.
2. Add a new Webhook.
3. Webhook URL: `https://your-production-domain.com/api/webhooks/razorpay`
4. Secret: Generate a strong random string and save it as `RAZORPAY_WEBHOOK_SECRET` in your environment variables.
5. Active Events:
   - `payment.captured`
   - `payment.failed`

> [!WARNING]
> If webhooks are not configured, donations will remain in the "PENDING" state forever, even if the user is charged.
