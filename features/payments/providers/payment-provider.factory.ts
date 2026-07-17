import { IPaymentProvider } from './payment-provider.interface';
import { RazorpayProvider } from './razorpay.provider';
import { StripeProvider } from './stripe.provider';
import { PayPalProvider } from './paypal.provider';
import { SupportedPaymentProvider } from '../../../config/payments';

/**
 * Factory to instantiate the appropriate payment provider
 * based on configuration.
 */
export class PaymentProviderFactory {
  static getProvider(providerName: SupportedPaymentProvider | string): IPaymentProvider {
    switch (providerName.toLowerCase()) {
      case 'razorpay':
        return new RazorpayProvider();
      case 'stripe':
        return new StripeProvider();
      case 'paypal':
        return new PayPalProvider();
      default:
        throw new Error(`Unsupported payment provider: ${providerName}`);
    }
  }
}
