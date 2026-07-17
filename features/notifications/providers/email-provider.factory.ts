import { IEmailProvider } from './email-provider.interface';
import { ResendProvider, SendGridProvider, SESProvider, SMTPProvider } from './email-providers';
import { SupportedEmailProvider } from '../types/email.types';

export class EmailProviderFactory {
  static getProvider(providerName: SupportedEmailProvider | string = process.env.EMAIL_PROVIDER || 'smtp'): IEmailProvider {
    switch (providerName.toLowerCase()) {
      case 'resend':
        return new ResendProvider();
      case 'sendgrid':
        return new SendGridProvider();
      case 'ses':
        return new SESProvider();
      case 'smtp':
        return new SMTPProvider();
      default:
        throw new Error(`Unsupported email provider: ${providerName}`);
    }
  }
}
