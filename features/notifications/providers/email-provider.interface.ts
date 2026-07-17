import { EmailRequest, EmailResponse } from '../types/email.types';

/**
 * Common Interface for all Email Providers.
 * Ensures the platform is not coupled to SendGrid, AWS SES, or SMTP.
 */
export interface IEmailProvider {
  /**
   * The name of the provider (e.g. 'sendgrid')
   */
  readonly name: string;

  /**
   * Sends an email
   */
  sendEmail(request: EmailRequest): Promise<EmailResponse>;
}
