/**
 * Centralized Configuration for Payments and Donations
 * Loads exclusively from .env.local via NEXT_PUBLIC_ or server-side env vars.
 */

export const PAYMENT_CONFIG = {
  // Active Provider (determines which gateway factory instantiates)
  ACTIVE_PROVIDER: process.env.PAYMENT_PROVIDER || 'razorpay',
  
  // Default Settings
  CURRENCY: 'INR',
  COUNTRY: 'IN',
  
  // Tax & Receipt Configuration
  TAX: {
    DEFAULT_RATE: 0,
    APPLICABLE: false,
    RECEIPT_PREFIX: 'SVF-DON-',
  },
  
  // System Configurations
  RETRY_LIMITS: {
    WEBHOOK_RETRIES: 3,
    MAX_PROCESSING_TIME_MS: 300000, // 5 minutes
  },
  
  // Limits
  LIMITS: {
    MIN_DONATION_INR: 100, // INR
    MAX_DONATION_INR: 500000, // INR (Requires additional KYC/PAN above certain thresholds normally)
  }
} as const;

export type SupportedPaymentProvider = 'razorpay' | 'stripe' | 'paypal';
