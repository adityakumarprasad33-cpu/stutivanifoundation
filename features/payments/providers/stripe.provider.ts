import { IPaymentProvider } from './payment-provider.interface';
import { 
  PaymentOrderRequest, 
  PaymentOrderResponse, 
  PaymentVerificationRequest, 
  PaymentStatus 
} from '../types/payment.types';

export class StripeProvider implements IPaymentProvider {
  readonly name = 'stripe';

  async createOrder(request: PaymentOrderRequest): Promise<PaymentOrderResponse> {
    throw new Error('Method not implemented for Stripe.');
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<boolean> {
    throw new Error('Method not implemented for Stripe.');
  }

  async refundPayment(paymentId: string, amount?: number): Promise<boolean> {
    throw new Error('Method not implemented for Stripe.');
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    throw new Error('Method not implemented for Stripe.');
  }

  async generateReceipt(paymentId: string): Promise<string | null> {
    throw new Error('Method not implemented for Stripe.');
  }

  async cancelPayment(orderId: string): Promise<boolean> {
    throw new Error('Method not implemented for Stripe.');
  }
}
