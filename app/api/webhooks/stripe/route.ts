import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { DonationRepository } from '@/features/donations/services/donation.repository';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature || !env.STRIPE_WEBHOOK_SECRET) {
      console.warn('Missing stripe signature or webhook secret');
      return NextResponse.json({ error: 'Missing configuration' }, { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const metadata = session.metadata || {};

      const donationRepo = new DonationRepository();

      await donationRepo.create({
        donorId: metadata.guest === 'true' ? 'GUEST' : (metadata.userId || 'UNKNOWN'),
        campaignId: metadata.campaignId,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || 'INR',
        type: metadata.donorType === 'monthly' ? 'RECURRING' : 'ONE_TIME',
        status: 'COMPLETED',
        paymentMethod: 'CARD', // Typically card via Stripe Checkout
        transactionId: session.payment_intent as string || session.id,
        isAnonymous: metadata.guest === 'true',
        guestInfo: metadata.guest === 'true' ? {
          name: metadata.donorName,
          email: metadata.donorEmail,
          pan: metadata.donorPan || undefined
        } : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);

      // TODO: Send 80G Tax Receipt Email

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

