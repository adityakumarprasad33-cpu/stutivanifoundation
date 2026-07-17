import { WebhookPayload, WebhookVerificationResult } from '../types/payment.types';

export class WebhookSecurityService {
  /**
   * Verifies the signature of an incoming webhook based on the provider.
   */
  static verifySignature(payload: WebhookPayload): WebhookVerificationResult {
    const { provider, signature, rawBody, headers } = payload;
    
    try {
      switch (provider.toLowerCase()) {
        case 'razorpay':
          return this.verifyRazorpay(signature, rawBody);
        case 'stripe':
          return this.verifyStripe(signature, rawBody, headers['stripe-signature']);
        case 'paypal':
          return this.verifyPayPal(headers, rawBody);
        default:
          return { isValid: false, error: 'Unsupported webhook provider' };
      }
    } catch (error) {
      console.error(`[WebhookSecurity] Verification failed for ${provider}`, error);
      return { isValid: false, error: 'Verification threw an exception' };
    }
  }

  private static verifyRazorpay(signature: string, rawBody: string): WebhookVerificationResult {
    // TODO: crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)...
    // Stub implementation extracting from payload
    let orderId = 'unknown';
    try {
      const parsed = JSON.parse(rawBody);
      orderId = parsed?.payload?.payment?.entity?.order_id || 'unknown';
    } catch (e) {
      // Ignore
    }
    
    return {
      isValid: true,
      eventId: 'evt_' + Date.now(), // Idempotency key
      orderId: orderId,
    };
  }

  private static verifyStripe(signature: string, rawBody: string, stripeSigHeader?: string): WebhookVerificationResult {
    // TODO: stripe.webhooks.constructEvent(...)
    return { isValid: false, error: 'Not implemented' };
  }

  private static verifyPayPal(headers: Record<string, string>, rawBody: string): WebhookVerificationResult {
    // TODO: PayPal signature verification
    return { isValid: false, error: 'Not implemented' };
  }

  /**
   * Checks if an event ID has already been processed to ensure Idempotency.
   */
  static async checkIdempotency(eventId: string): Promise<boolean> {
    // TODO: Query Activity Repository to see if eventId exists.
    // Return true if ALREADY processed. False if it's new.
    return false; // Stub
  }
}
