import { IRegistrationRepository } from './registration.repository';
import { RegistrationStatus, EventRegistration } from '../types/registration.types';
import { RegistrationPolicy } from '../policy/registration.policy';
import { NotFoundError, ValidationError } from '@/lib/errors';

export class RegistrationService {
  constructor(private readonly repository: IRegistrationRepository) {}

  /**
   * Processes a new registration request from the public UI.
   */
  async processRegistration(eventId: string, data: Partial<EventRegistration>): Promise<EventRegistration> {
    // 1. Enforce atomic capacity check at the DB layer
    const [reserved, status] = await this.repository.reserveSeatAtomic(eventId, data);
    
    // 2. Create the registration record
    const registration: EventRegistration = {
      id: `REG-${Date.now()}`,
      eventId,
      mode: data.mode || 'GUEST',
      userId: data.userId || null,
      volunteerId: data.volunteerId || null,
      createdBy: data.createdBy || null,
      registeredBy: data.registeredBy || null,
      participantName: data.participantName || '',
      participantEmail: data.participantEmail || '',
      participantPhone: data.participantPhone || '',
      status,
      waitlistPosition: status === RegistrationStatus.WAITLISTED ? 99 : null,
      eligibleForPromotion: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = await this.repository.createRegistration(registration);
    
    // 3. TODO: Activity Logging
    // ActivityLogger.log('RegistrationCreated', { registrationId: saved.id, status });
    
    // 4. TODO: Trigger notifications via NotificationService (Confirmation or Waitlist)
    
    return saved;
  }

  /**
   * Manually promotes a waitlisted registration to confirmed (Admin Action)
   */
  async promoteFromWaitlist(registrationId: string, adminUid: string): Promise<void> {
    const registration = await this.repository.getRegistration(registrationId);
    if (!registration) throw new NotFoundError('Registration not found');
    
    // Validate state transition policy
    RegistrationPolicy.validateTransition(registration.status, RegistrationStatus.CONFIRMED);
    
    if (registration.status !== RegistrationStatus.WAITLISTED) {
      throw new ValidationError('Only waitlisted registrations can be promoted.');
    }

    // Architecture stub: We would also check capacity here before allowing manual promotion
    // to ensure an admin doesn't overbook the event if it's already full.

    await this.repository.updateRegistrationStatus(registrationId, RegistrationStatus.CONFIRMED);
    
    // TODO: ActivityLogger.log('WaitlistPromoted', { registrationId, adminUid });
    // TODO: NotificationService.sendPromotionNotification(registration.participantEmail);
  }
  
  /**
   * Cancels a registration and releases the seat.
   */
  async cancelRegistration(registrationId: string, cancelledByUid: string): Promise<void> {
    const registration = await this.repository.getRegistration(registrationId);
    if (!registration) throw new NotFoundError('Registration not found');
    
    RegistrationPolicy.validateTransition(registration.status, RegistrationStatus.CANCELLED);
    
    await this.repository.updateRegistrationStatus(registrationId, RegistrationStatus.CANCELLED);
    
    // TODO: Release capacity on Event document
    // TODO: Mark next waitlisted person as 'eligibleForPromotion'
    // TODO: ActivityLogger.log('RegistrationCancelled', { registrationId, cancelledByUid });
  }
}
