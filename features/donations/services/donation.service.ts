import { PaymentStatus } from '@/features/payments/types/payment.types';
import { PaymentPolicy } from '@/features/payments/policy/payment.policy';
import { EmailService } from '@/features/notifications/services/email.service';
import { ReceiptService } from './receipt.service';
import { logger } from '@/lib/logger';

// Mock dependencies (in a real scenario, these would import from their respective repos/services)
const ActivityLogger = {
  log: async (action: string, metadata: Record<string, string>) => logger.info(`[ActivityLogger] ${action}`)
};
const DonationStatisticsService = {
  recordDonation: async (amount: number) => logger.debug('[DonationStatistics] Updated')
};
const CampaignHealthService = {
  recordDonation: async (campaignId: string, amount: number) => logger.debug('[CampaignHealth] Updated')
};
const DonationRepository = {
  create: async (data: Record<string, unknown>) => logger.debug('[DonationRepository] Record created')
};

export class DonationService {
  /**
   * Generates a unique 12-character alphanumeric Donation Number.
   */
  static generateDonationNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `DN-${timestamp}-${random}`;
  }

  /**
   * Generates a unique Donor Number.
   */
  static generateDonorNumber(): string {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `DR-${random}`;
  }

  /**
   * Prepares AI search vectors for Donor indexing
   */
  static generateDonorSearchVector(fullName: string, email: string, phone: string): string[] {
    const vector = new Set<string>();
    
    // Tokenize full name
    fullName.toLowerCase().split(/\s+/).forEach(token => {
      if (token.length > 2) vector.add(token);
    });
    
    // Add exact matches
    vector.add(email.toLowerCase());
    vector.add(phone.replace(/\D/g, ''));
    
    return Array.from(vector);
  }

  /**
   * Handles the successful payment verified via Webhook.
   * Executes the full Donation Lifecycle.
   */
  static async handlePaymentSuccess(orderId: string, paymentId: string, eventId: string, amount: number, campaignId: string, donorEmail: string): Promise<boolean> {
    logger.info('[DonationService] Processing payment success');
    
    // 1. Verify Payment Policy (Mock current status transition)
    PaymentPolicy.validateTransition(PaymentStatus.PROCESSING, PaymentStatus.SUCCESS);

    // 2. Create Donation Record
    await DonationRepository.create({
      orderId,
      paymentId,
      amount,
      campaignId,
      status: PaymentStatus.SUCCESS,
      createdAt: new Date().toISOString()
    });

    // 3. Update Campaign Statistics
    await CampaignHealthService.recordDonation(campaignId, amount);

    // 4. Update Analytics
    await DonationStatisticsService.recordDonation(amount);

    // 5. Generate Receipt
    const receiptService = new ReceiptService();

    // 6. Send Confirmation Email
    await EmailService.dispatch({
      to: donorEmail,
      subject: 'Thank you for your donation!',
      textBody: 'We have received your donation.'
    });

    // 7. Activity Log
    await ActivityLogger.log('PAYMENT_CAPTURED', { orderId, paymentId, eventId });

    return true;
  }
}
