import { RegistrationStatus, EventRegistration } from '../types/registration.types';
import { logger } from '@/lib/logger';

/**
 * Interface defining the methods required for Registration persistence and capacity enforcement.
 * Actual implementation will use Firestore transactions to ensure atomic operations on capacity.
 */
export interface IRegistrationRepository {
  createRegistration(registration: EventRegistration): Promise<EventRegistration>;
  updateRegistrationStatus(id: string, status: RegistrationStatus): Promise<void>;
  getRegistration(id: string): Promise<EventRegistration | null>;
  getRegistrationsByEvent(eventId: string): Promise<EventRegistration[]>;
  getRegistrationsByUser(userId: string): Promise<EventRegistration[]>;
  
  /**
   * Attempts to reserve a seat. Uses a database transaction.
   * If capacity is reached, it will register the user on the waitlist instead.
   * Returns a tuple: [boolean indicating if seat was reserved, final status]
   */
  reserveSeatAtomic(eventId: string, registrationData: Partial<EventRegistration>): Promise<[boolean, RegistrationStatus]>;
}

export class RegistrationRepository implements IRegistrationRepository {
  async createRegistration(registration: EventRegistration): Promise<EventRegistration> {
    logger.debug('[RegistrationRepository] Creating registration');
    return Promise.resolve(registration);
  }

  async updateRegistrationStatus(id: string, status: RegistrationStatus): Promise<void> {
    logger.debug('[RegistrationRepository] Updating registration status');
    return Promise.resolve();
  }

  async getRegistration(id: string): Promise<EventRegistration | null> {
    return Promise.resolve(null);
  }

  async getRegistrationsByEvent(eventId: string): Promise<EventRegistration[]> {
    return Promise.resolve([]);
  }

  async getRegistrationsByUser(userId: string): Promise<EventRegistration[]> {
    return Promise.resolve([]);
  }

  async reserveSeatAtomic(eventId: string, registrationData: Partial<EventRegistration>): Promise<[boolean, RegistrationStatus]> {
    logger.debug('[RegistrationRepository] Attempting atomic seat reservation');
    // Architecture stub for Firestore transaction:
    // 1. Run transaction
    // 2. Read Event Document -> Check capacity vs current confirmed attendees
    // 3. If space available:
    //      Create EventRegistration with CONFIRMED status
    //      Increment confirmed count on Event
    // 4. If full:
    //      Create EventRegistration with WAITLISTED status
    //      Increment waitlist count on Event
    return Promise.resolve([true, RegistrationStatus.CONFIRMED]);
  }
}
