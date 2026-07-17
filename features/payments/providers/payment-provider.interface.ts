import { 
  PaymentOrderRequest, 
  PaymentOrderResponse, 
  PaymentVerificationRequest, 
  PaymentStatus 
} from '../types/payment.types';

/**
 * Common Interface for all Payment Providers.
 * No UI or core module communicates directly with Stripe/Razorpay/PayPal.
 */
export interface IPaymentProvider {
  /**
   * Identifies the provider name (e.g. 'razorpay')
   */
  readonly name: string;

  /**
   * Creates a new order/intent on the payment gateway
   */
  createOrder(request: PaymentOrderRequest): Promise<PaymentOrderResponse>;

  /**
   * Verifies the payment signature natively (often used client-side to server-side handoff)
   * Note: Webhooks provide a more robust server-side verification.
   */
  verifyPayment(request: PaymentVerificationRequest): Promise<boolean>;

  /**
   * Issues a refund
   */
  refundPayment(paymentId: string, amount?: number): Promise<boolean>;

  /**
   * Fetches the real-time status from the gateway
   */
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;

  /**
   * Triggers or retrieves gateway-specific receipts if supported
   */
  generateReceipt(paymentId: string): Promise<string | null>;

  /**
   * Cancels an un-captured or pending order
   */
  cancelPayment(orderId: string): Promise<boolean>;
}
