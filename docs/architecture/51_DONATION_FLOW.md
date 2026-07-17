# 51. Donation Flow Lifecycle

## The State Machine
Every donation record transitions through standard states:
`CREATED` -> `INITIATED` -> `PROCESSING` -> `SUCCESS` / `FAILED`

## Flow Sequence
1. **Campaign Selection**: User selects a campaign on `/donate`.
2. **Form Submission**: User fills details (PAN, 80G needs) on `/donate/[campaign]`.
3. **Order Creation**: Client posts to backend; `PaymentProviderFactory` delegates to active provider (e.g., Razorpay) to create an Order.
4. **Client Gateway**: Gateway SDK mounts in UI. User pays.
5. **Webhook Trigger**: Gateway hits `POST /api/webhooks/razorpay`.
6. **Server Processing**:
   - Signature verification.
   - Idempotency check.
   - State transition validation (`PROCESSING` -> `SUCCESS`).
7. **Business Updates**:
   - Save `DonationRecord`.
   - Update `CampaignHealth` (Progress).
   - Update `DonationStatistics`.
8. **Fulfillment**:
   - Generate Receipt.
   - Send Email.
   - Log Activity.
