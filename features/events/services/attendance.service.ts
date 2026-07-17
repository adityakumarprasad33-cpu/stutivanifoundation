import { AttendanceRecord, RegistrationStatus } from '../types/registration.types';
import { IRegistrationRepository } from './registration.repository';
import { QRService } from './qr.service';
import { RegistrationPolicy } from '../policy/registration.policy';
import { ValidationError, NotFoundError } from '@/lib/errors';

export class AttendanceService {
  constructor(private readonly registrationRepo: IRegistrationRepository) {}

  /**
   * Processes a QR Code scan during check-in.
   * Validates the payload signature, checks for duplicates, and updates the registration.
   */
  async processQRScan(payloadString: string, scannerUid: string): Promise<AttendanceRecord> {
    // 1. Cryptographically verify the payload. (Throws if invalid)
    const payload = QRService.verifyPayload(payloadString);
    
    // 2. Fetch the registration
    const registration = await this.registrationRepo.getRegistration(payload.registrationId);
    if (!registration) {
      throw new NotFoundError('Registration record not found.');
    }
    
    if (registration.eventId !== payload.eventId) {
      throw new ValidationError('Registration does not belong to this event.');
    }

    // 3. Prevent duplicate scans by validating the state transition
    // (e.g., if already CHECKED_IN or ATTENDED, it will throw a validation error)
    RegistrationPolicy.validateTransition(registration.status, RegistrationStatus.CHECKED_IN);
    
    // 4. Update the Registration Status
    await this.registrationRepo.updateRegistrationStatus(registration.id, RegistrationStatus.CHECKED_IN);
    
    // 5. Create Attendance Record
    const attendance: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      registrationId: registration.id,
      eventId: registration.eventId,
      userId: registration.userId,
      volunteerId: registration.volunteerId,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      hoursLogged: 0,
      scannedBy: scannerUid,
      scanMethod: 'QR_CAMERA', // Defaulting to camera, can be passed as arg
      createdAt: new Date().toISOString()
    };
    
    // TODO: Save AttendanceRecord to repository
    // TODO: ActivityLogger.log('CheckInCompleted', { registrationId: registration.id, scannerUid });
    
    return attendance;
  }
  
  /**
   * Manually checks in a user without a QR code (e.g., via name search).
   */
  async manualCheckIn(registrationId: string, staffUid: string): Promise<AttendanceRecord> {
    const registration = await this.registrationRepo.getRegistration(registrationId);
    if (!registration) throw new NotFoundError('Registration not found');
    
    RegistrationPolicy.validateTransition(registration.status, RegistrationStatus.CHECKED_IN);
    
    await this.registrationRepo.updateRegistrationStatus(registrationId, RegistrationStatus.CHECKED_IN);
    
    const attendance: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      registrationId: registration.id,
      eventId: registration.eventId,
      userId: registration.userId,
      volunteerId: registration.volunteerId,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      hoursLogged: 0,
      scannedBy: staffUid,
      scanMethod: 'MANUAL',
      createdAt: new Date().toISOString()
    };
    
    // TODO: Save AttendanceRecord to repository
    // TODO: ActivityLogger.log('ManualCheckInCompleted', { registrationId, staffUid });
    
    return attendance;
  }
}
