export enum RegistrationStatus {
  CREATED = 'CREATED',           // Initial state when user starts flow
  PENDING = 'PENDING',           // Awaiting admin approval (if required)
  APPROVED = 'APPROVED',         // Admin approved but not yet confirmed by user (if multi-step)
  WAITLISTED = 'WAITLISTED',     // Event is full, waiting for spot
  CONFIRMED = 'CONFIRMED',       // Successfully registered, holds a spot
  CHECKED_IN = 'CHECKED_IN',     // QR scanned at the door
  ATTENDED = 'ATTENDED',         // Checked in and successfully marked attended
  CANCELLED = 'CANCELLED',       // User or Admin cancelled the registration
  REJECTED = 'REJECTED',         // Admin rejected the registration
  EXPIRED = 'EXPIRED',           // Payment or approval window expired
  NO_SHOW = 'NO_SHOW',           // Did not attend the event
  FAILED = 'FAILED',             // Payment or system failure
}

export type RegistrationMode = 'GUEST' | 'VOLUNTEER' | 'ADMIN';

export interface EventRegistration {
  id: string;
  eventId: string;
  
  // Registration Mode Metadata
  mode: RegistrationMode;
  
  // Identity References (Optional based on mode)
  userId: string | null;           // Null for guests
  volunteerId: string | null;      // Null for guests/regular users
  
  // Admin Tracking
  createdBy: string | null;        // Admin UID who created this (if admin mode)
  registeredBy: string | null;     // ID of the person making the booking (if booking for someone else)

  // Participant Details (Required for all modes)
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  
  status: RegistrationStatus;
  
  // Waitlist Tracking
  waitlistPosition: number | null;
  eligibleForPromotion: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  registrationId: string;
  eventId: string;
  userId: string | null;
  volunteerId: string | null;
  checkInTime: string;
  checkOutTime: string | null;
  hoursLogged: number;
  scannedBy: string; // Admin/Staff UID who scanned
  scanMethod: 'QR_CAMERA' | 'QR_USB' | 'MANUAL';
  createdAt: string;
}
