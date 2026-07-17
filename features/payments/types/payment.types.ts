/**
 * Standardized Payment Lifecycle Statuses
 */
export enum PaymentStatus {
  CREATED = 'CREATED',                     // Order generated locally
  INITIATED = 'INITIATED',                 // Passed to gateway
  PENDING = 'PENDING',                     // Gateway processing/awaiting user action
  PROCESSING = 'PROCESSING',               // Webhook received, server processing
  AUTHORIZED = 'AUTHORIZED',               // Payment auth success, not yet captured
  CAPTURED = 'CAPTURED',                   // Funds secured
  SUCCESS = 'SUCCESS',                     // Fully successful, receipt generated
  FAILED = 'FAILED',                       // Failed at gateway
  CANCELLED = 'CANCELLED',                 // Cancelled by user or system
  REFUNDED = 'REFUNDED',                   // Full refund
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  DISPUTED = 'DISPUTED',                   // Chargeback/Dispute
  EXPIRED = 'EXPIRED',                     // Order timed out
}

export interface PaymentOrderRequest {
  amount: number; // in smallest currency unit (e.g. paise for INR)
  currency: string;
  receiptId: string;
  notes?: Record<string, string>;
}

export interface PaymentOrderResponse {
  orderId: string;
  provider: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  providerData?: any; // Gateway specific order details
}

export interface PaymentVerificationRequest {
  orderId: string;
  paymentId: string;
  signature: string;
  providerData?: any;
}

export interface WebhookPayload {
  rawBody: string;
  signature: string;
  headers: Record<string, string>;
  provider: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  eventId?: string; // For idempotency
  eventType?: string;
  orderId?: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  status?: PaymentStatus;
  error?: string;
}
