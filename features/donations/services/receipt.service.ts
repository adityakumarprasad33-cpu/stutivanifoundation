type ActionResponse<T> = { success: true; data?: T } | { success: false; error: string };

export interface ReceiptGenerationOptions {
  donationId: string;
  format: 'PDF' | 'HTML';
  include80G: boolean;
}

export interface ReceiptDeliveryOptions {
  donationId: string;
  toEmail: string;
}

export interface ReceiptResult {
  success: boolean;
  url?: string;
  receiptNumber?: string;
  error?: string;
}

import { IReceiptGenerator, ReceiptTemplate } from '../types/receipt.types';

export class ReceiptService implements IReceiptGenerator {
  async generatePDF(donationId: string, template: ReceiptTemplate): Promise<string> {
    throw new Error('NotImplementedError: PDF Engine not integrated.');
  }

  async downloadReceipt(receiptId: string): Promise<string> {
    throw new Error('NotImplementedError: Storage bucket for receipts not configured.');
  }

  async emailReceipt(receiptId: string, email: string): Promise<boolean> {
    throw new Error('NotImplementedError: Email delivery service (e.g. Resend/SendGrid) not configured.');
  }
  /**
   * Generates a tax-compliant receipt.
   * Architecture defined, implementation pending PDF Engine integration.
   */
  static async generateReceipt(donationId: string, _options?: Record<string, unknown>): Promise<ActionResponse<string>> {
    throw new Error('NotImplementedError: PDF Engine not integrated.');
  }

  /**
   * Generates an 80G Tax Exemption Certificate.
   * Architecture defined, implementation pending PDF Engine integration.
   */
  static async generate80GCertificate(donorId: string, year: string, _options?: Record<string, unknown>): Promise<ActionResponse<string>> {
    throw new Error('NotImplementedError: PDF Engine not integrated.');
  }

  /**
   * Generates a Thank You / Acknowledgement letter.
   */
  static async generateAcknowledgement(donationId: string, _options?: Record<string, unknown>): Promise<ActionResponse<void>> {
    throw new Error('NotImplementedError: Document generation engine not integrated.');
  }

  /**
   * Emails the receipt and/or 80G certificate directly to the donor.
   */
  static async verifyReceipt(_donationId: string, receiptId: string): Promise<ActionResponse<boolean>> {
    throw new Error('NotImplementedError: Email delivery service (e.g. Resend/SendGrid) not configured.');
  }
  
  static async downloadReceiptStatic(donationId: string): Promise<string> {
    throw new Error('NotImplementedError: Storage bucket for receipts not configured.');
  }
}
