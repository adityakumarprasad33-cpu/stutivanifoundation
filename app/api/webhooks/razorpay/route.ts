import { NextResponse } from 'next/server';
import { WebhookSecurityService } from '@/features/payments/services/webhook-security.service';
import { DonationService } from '@/features/donations/services/donation.service';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // 1. Verify Signature
    const verification = WebhookSecurityService.verifySignature({
      rawBody,
      signature,
      headers: {},
      provider: 'razorpay'
    });

    if (!verification.isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // 2. Idempotency Check
    const eventId = verification.eventId!;
    const isDuplicate = await WebhookSecurityService.checkIdempotency(eventId);
    if (isDuplicate) {
      return NextResponse.json({ status: 'ok', message: 'Already processed' });
    }

    // 3. Process the Event Payload
    const data = JSON.parse(rawBody);
    const event = data.event;

    // Route to appropriate handler
    if (event === 'payment.captured' || event === 'payment.authorized') {
      const orderId = data.payload.payment.entity.order_id;
      const paymentId = data.payload.payment.entity.id;
      
      // Update Donation Lifecycle
      // Using any here as a mock, since DonationService.handlePaymentSuccess might not be fully typed yet
      await (DonationService as any).handlePaymentSuccess(orderId, paymentId, eventId);
    } 
    else if (event === 'payment.failed') {
      // Handle failure
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    logger.error('[Razorpay Webhook Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
