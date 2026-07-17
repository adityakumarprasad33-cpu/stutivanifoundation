import { PaymentStatus } from '../types/payment.types';

/**
 * Payment Policy
 * Validates State Machine transitions for payment lifecycles.
 */
export class PaymentPolicy {
  
  // Valid transitions from a specific state to allowed next states
  private static readonly ALLOWED_TRANSITIONS: Record<PaymentStatus, PaymentStatus[]> = {
    [PaymentStatus.CREATED]: [PaymentStatus.INITIATED, PaymentStatus.FAILED, PaymentStatus.EXPIRED, PaymentStatus.CANCELLED],
    [PaymentStatus.INITIATED]: [PaymentStatus.PENDING, PaymentStatus.FAILED, PaymentStatus.EXPIRED, PaymentStatus.CANCELLED],
    [PaymentStatus.PENDING]: [PaymentStatus.PROCESSING, PaymentStatus.AUTHORIZED, PaymentStatus.FAILED, PaymentStatus.CANCELLED],
    [PaymentStatus.PROCESSING]: [PaymentStatus.AUTHORIZED, PaymentStatus.CAPTURED, PaymentStatus.FAILED],
    [PaymentStatus.AUTHORIZED]: [PaymentStatus.CAPTURED, PaymentStatus.FAILED, PaymentStatus.CANCELLED],
    [PaymentStatus.CAPTURED]: [PaymentStatus.SUCCESS, PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED, PaymentStatus.DISPUTED],
    [PaymentStatus.SUCCESS]: [PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED, PaymentStatus.DISPUTED],
    [PaymentStatus.FAILED]: [],
    [PaymentStatus.CANCELLED]: [],
    [PaymentStatus.REFUNDED]: [],
    [PaymentStatus.PARTIALLY_REFUNDED]: [PaymentStatus.REFUNDED, PaymentStatus.DISPUTED],
    [PaymentStatus.DISPUTED]: [PaymentStatus.REFUNDED, PaymentStatus.SUCCESS], // Resolving dispute
    [PaymentStatus.EXPIRED]: [],
  };

  /**
   * Verifies if a transition from current state to target state is legally allowed.
   */
  static canTransition(currentStatus: PaymentStatus, targetStatus: PaymentStatus): boolean {
    // Identity transition is allowed (e.g. processing -> processing)
    if (currentStatus === targetStatus) return true;
    
    const allowed = this.ALLOWED_TRANSITIONS[currentStatus];
    return allowed ? allowed.includes(targetStatus) : false;
  }

  /**
   * Throws an error if the transition is illegal.
   */
  static validateTransition(currentStatus: PaymentStatus, targetStatus: PaymentStatus): void {
    if (!this.canTransition(currentStatus, targetStatus)) {
      throw new Error(`Invalid payment state transition from ${currentStatus} to ${targetStatus}`);
    }
  }

  /**
   * Determines if a payment is in a terminal state
   */
  static isTerminal(status: PaymentStatus): boolean {
    return [
      PaymentStatus.SUCCESS,
      PaymentStatus.FAILED,
      PaymentStatus.CANCELLED,
      PaymentStatus.REFUNDED,
      PaymentStatus.EXPIRED,
    ].includes(status);
  }
}
