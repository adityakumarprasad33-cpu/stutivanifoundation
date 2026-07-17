import { IEmailProvider } from './email-provider.interface';
import { EmailRequest, EmailResponse } from '../types/email.types';

export class ResendProvider implements IEmailProvider {
  readonly name = 'resend';

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    throw new Error('Method not implemented for Resend.');
  }
}

export class SendGridProvider implements IEmailProvider {
  readonly name = 'sendgrid';

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    throw new Error('Method not implemented for SendGrid.');
  }
}

export class SESProvider implements IEmailProvider {
  readonly name = 'ses';

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    throw new Error('Method not implemented for AWS SES.');
  }
}

export class SMTPProvider implements IEmailProvider {
  readonly name = 'smtp';

  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    throw new Error('Method not implemented for generic SMTP.');
  }
}
