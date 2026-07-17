export interface ReceiptTemplate {
  templateId: string;
  type: 'DONATION' | '80G' | 'ACKNOWLEDGEMENT';
  layout: 'STANDARD' | 'COMPACT';
}

export interface IReceiptGenerator {
  generatePDF(donationId: string, template: ReceiptTemplate): Promise<string>;
  downloadReceipt(receiptId: string): Promise<string>;
  emailReceipt(receiptId: string, email: string): Promise<boolean>;
}
