import { z } from 'zod';
import { firestoreIdSchema } from '@/lib/validation';

export const transactionSchema = z.object({
  id: firestoreIdSchema,
  transactionId: z.string(),
  donationId: firestoreIdSchema,
  
  gateway: z.enum(['RAZORPAY', 'STRIPE', 'PAYPAL', 'MANUAL']),
  gatewayPaymentId: z.string().optional(),
  gatewayOrderId: z.string().optional(),
  gatewaySignature: z.string().optional(),
  
  status: z.enum(['CREATED', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED']),
  amount: z.number(),
  currency: z.string().default('INR'),
  
  rawPayload: z.unknown().optional(), // For audit logging webhook dumps
  
  createdAt: z.date(),
  updatedAt: z.date(),
});
