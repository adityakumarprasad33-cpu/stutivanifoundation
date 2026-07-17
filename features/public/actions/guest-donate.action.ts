'use server';

import { stripe } from '@/lib/stripe/server';
import { env } from '@/lib/env';

interface GuestDonationData {
  campaignId: string;
  amount: number;
  donorType: 'one-time' | 'monthly';
  name: string;
  email: string;
  pan?: string;
  currency: string;
}

export async function processGuestDonation(data: GuestDonationData) {
  try {
    const { campaignId, amount, donorType, name, email, pan, currency } = data;

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Donation to Stuti-Vani Foundation',
              description: `Campaign Support - ${donorType.toUpperCase()}`,
            },
            unit_amount: amount * 100, // Stripe expects amounts in smallest currency unit (paise/cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_APP_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/donate`,
      customer_email: email, // Pre-fill email for guests
      metadata: {
        guest: 'true',
        campaignId,
        donorName: name,
        donorEmail: email,
        donorPan: pan || '',
        donorType,
      },
    });

    if (!session.url) {
      throw new Error('Failed to generate checkout URL');
    }

    return { success: true, url: session.url };
  } catch (error: any) {
    console.error('Guest Donation Error:', error);
    return { success: false, error: error.message || 'Payment processing failed' };
  }
}
