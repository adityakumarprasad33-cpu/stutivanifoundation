import { IPaymentProvider } from './payment-provider.interface';
import { 
  PaymentOrderRequest, 
  PaymentOrderResponse, 
  PaymentVerificationRequest, 
  PaymentStatus 
} from '../types/payment.types';

export class PayPalProvider implements IPaymentProvider {
  readonly name = 'paypal';

  async createOrder(request: PaymentOrderRequest): Promise<PaymentOrderResponse> {
    throw new Error('Method not implemented for PayPal.');
  }

  async verifyPayment(request: PaymentVerificationRequest): Promise<boolean> {
    throw new Error('Method not implemented for PayPal.');
  }

  async refundPayment(paymentId: string, amount?: number): Promise<boolean> {
    throw new Error('Method not implemented for PayPal.');
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    throw new Error('Method not implemented for PayPal.');
  }

  async generateReceipt(paymentId: string): Promise<string | null> {
    throw new Error('Method not implemented for PayPal.');
  }

  async cancelPayment(orderId: string): Promise<boolean> {
    throw new Error('Method not implemented for PayPal.');
  }
}
