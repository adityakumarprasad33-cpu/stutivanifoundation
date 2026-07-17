export interface EmailRequest {
  to: string | string[];
  subject: string;
  htmlBody?: string;
  textBody?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer; // base64 string or buffer
  contentType: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  provider: string;
  error?: string;
}

export type SupportedEmailProvider = 'resend' | 'sendgrid' | 'ses' | 'smtp';
