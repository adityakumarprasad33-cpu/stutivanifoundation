import { RegistrationStatus } from '../types/registration.types';
import { AuthorizationError, ValidationError } from '@/lib/errors';

export class RegistrationPolicy {
  
  /**
   * Defines the valid state transitions for an Event Registration.
   */
  private static readonly VALID_TRANSITIONS: Record<RegistrationStatus, RegistrationStatus[]> = {
    [RegistrationStatus.CREATED]: [RegistrationStatus.PENDING, RegistrationStatus.CONFIRMED, RegistrationStatus.WAITLISTED, RegistrationStatus.FAILED],
    [RegistrationStatus.PENDING]: [RegistrationStatus.APPROVED, RegistrationStatus.REJECTED, RegistrationStatus.CANCELLED],
    [RegistrationStatus.APPROVED]: [RegistrationStatus.CONFIRMED, RegistrationStatus.EXPIRED, RegistrationStatus.CANCELLED],
    [RegistrationStatus.WAITLISTED]: [RegistrationStatus.APPROVED, RegistrationStatus.CONFIRMED, RegistrationStatus.CANCELLED],
    [RegistrationStatus.CONFIRMED]: [RegistrationStatus.CHECKED_IN, RegistrationStatus.CANCELLED, RegistrationStatus.NO_SHOW],
    [RegistrationStatus.CHECKED_IN]: [RegistrationStatus.ATTENDED],
    [RegistrationStatus.ATTENDED]: [], // Terminal State
    [RegistrationStatus.CANCELLED]: [], // Terminal State
    [RegistrationStatus.REJECTED]: [], // Terminal State
    [RegistrationStatus.EXPIRED]: [], // Terminal State
    [RegistrationStatus.NO_SHOW]: [], // Terminal State
    [RegistrationStatus.FAILED]: [], // Terminal State
  } as Record<RegistrationStatus, RegistrationStatus[]>;

  /**
   * Validates if a registration can transition from one state to another.
   * Throws ValidationError if the transition is invalid.
   */
  static validateTransition(currentStatus: RegistrationStatus, newStatus: RegistrationStatus): void {
    const allowedTransitions = this.VALID_TRANSITIONS[currentStatus] || [];
    
    if (!allowedTransitions.includes(newStatus)) {
      throw new ValidationError(
        `Invalid registration status transition from ${currentStatus} to ${newStatus}.`
      );
    }
  }

  /**
   * Enforces that a volunteer or user can only view their own registration.
   */
  static validateOwnership(currentUserUid: string, registrationUserId: string | null): void {
    if (registrationUserId !== null && currentUserUid !== registrationUserId) {
      throw new AuthorizationError('You are not authorized to access this registration.');
    }
  }
}
