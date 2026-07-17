import { EmailProviderFactory } from '../providers/email-provider.factory';
import { EmailRequest, EmailResponse } from '../types/email.types';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';

/**
 * Core Service for dispatching emails.
 */
export class EmailService {
  /**
   * Dispatches an email using the active provider configured in the system.
   */
  static async dispatch(request: EmailRequest): Promise<EmailResponse> {
    try {
      const provider = EmailProviderFactory.getProvider();
      
      // Default FROM address from environment configuration
      if (!request.from) {
        request.from = env.EMAIL_FROM_ADDRESS;
      }

      logger.info(`[EmailService] Dispatching email via ${provider.name}`);
      
      const response = await provider.sendEmail(request);
      return response;
    } catch (error) {
      logger.error('[EmailService] Failed to dispatch email', error);
      return {
        success: false,
        provider: 'unknown',
        error: error instanceof Error ? error.message : 'Unknown email error'
      };
    }
  }
}
