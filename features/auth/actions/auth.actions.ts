'use server';

import { verifySession } from '@/lib/auth/session.server';
import { UserRepository } from '@/features/auth/services/user.repository';
import { DonorRepository } from '@/features/donations/services/donor.repository';
import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import { AuthenticationError } from '@/lib/errors';
import { ROLES } from '@/constants';

// Reusable function to create the unified User Document
async function ensureUserDocument(
  uid: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  targetRole: string
) {
  const userRepo = new UserRepository();
  const existingUser = await userRepo.getByUid(uid);
  
  const displayName = `${firstName} ${lastName}`.trim();

  if (!existingUser) {
    const { addDoc, collection: firestoreCollection, Timestamp } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase/client');
    const now = new Date();

    // Create Base User Document
    await addDoc(firestoreCollection(db, 'users'), {
      uid,
      displayName,
      email,
      phoneNumber: phone || '',
      roles: [targetRole],
      lastSelectedRole: targetRole,
      status: 'ACTIVE',
      language: 'en',
      timezone: 'Asia/Kolkata',
      theme: 'system',
      notificationPreferences: { email: true, push: false },
      emailVerified: false,
      phoneVerified: false,
      deleted: false,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    });
  } else {
    // Merge roles if user already exists
    if (!existingUser.roles.includes(targetRole as any)) {
      await userRepo.update(existingUser.id, {
        roles: [...existingUser.roles, targetRole as any],
        lastSelectedRole: targetRole as any,
      });
    }
  }
}

export async function registerPublic(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}) {
  try {
    const claims = await verifySession();
    if (!claims) throw new AuthenticationError('Authentication required.');
    
    await ensureUserDocument(claims.uid, data.email, data.firstName, data.lastName, data.phone || '', ROLES.PUBLIC);
    
    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: claims.uid,
      action: 'USER_REGISTERED',
      module: 'Auth',
      description: `New public user registered: ${data.email}`,
    });
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to register public user:', error);
    return { success: false, error: message };
  }
}

export async function registerDonor(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}) {
  try {
    const claims = await verifySession();
    if (!claims) throw new AuthenticationError('Authentication required.');
    
    await ensureUserDocument(claims.uid, data.email, data.firstName, data.lastName, data.phone || '', ROLES.DONOR);
    
    const donorRepo = new DonorRepository();
    const { data: existing } = await donorRepo.query({
      filters: [{ field: 'userId', operator: '==', value: claims.uid }]
    });

    if (existing.length === 0) {
      await donorRepo.create({
        userId: claims.uid,
        address: { country: 'India' },
        preferences: {
          preferredCommunication: 'EMAIL',
          taxPreference: true,
          eligible80G: true,
          anonymousDonation: false,
          preferredPaymentMethod: 'UNKNOWN'
        },
        stats: {
          lifetimeDonations: 0,
          recurringDonations: 0,
          savedCampaigns: []
        },
        createdBy: claims.uid,
        updatedBy: claims.uid,
      } as any);

      try {
        const { DonorService } = await import('@/features/donations/services/donor.service');
        const donorService = new DonorService();
        await donorService.linkGuestDonations(claims.uid, data.email);
      } catch (linkErr) {
        console.warn('Failed to link guest donations:', linkErr);
      }
    }

    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: claims.uid,
      action: 'DONOR_REGISTERED',
      module: 'Auth',
      description: `New donor registered: ${data.email}`,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to register donor:', error);
    return { success: false, error: message };
  }
}

export async function registerVolunteer(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  volunteerData: any; // The extensive 6-step payload
}) {
  try {
    const claims = await verifySession();
    if (!claims) throw new AuthenticationError('Authentication required.');
    
    await ensureUserDocument(claims.uid, data.email, data.firstName, data.lastName, data.phone || '', ROLES.VOLUNTEER);

    const volunteerRepo = new VolunteerRepository();
    const { data: existing } = await volunteerRepo.query({
      filters: [{ field: 'userId', operator: '==', value: claims.uid }]
    });

    if (existing.length === 0) {
      const currentYear = new Date().getFullYear();
      const timestamp = Date.now().toString().slice(-6);
      const volunteerNumber = `VOL-${currentYear}-${timestamp}`;

      await volunteerRepo.create({
        userId: claims.uid,
        volunteerNumber,
        applicationStatus: 'PENDING',
        verificationStatus: 'PENDING',
        personal: {
          bloodGroup: 'UNKNOWN',
          ...data.volunteerData.personal
        },
        address: data.volunteerData.address || {},
        emergencyContact: data.volunteerData.emergencyContact || {},
        education: data.volunteerData.education || {},
        professional: {
          currentStatus: '',
          ...data.volunteerData.professional
        },
        preferences: {
          interests: [],
          availability: [],
          skills: [],
          languages: [],
          ...data.volunteerData.preferences
        },
        documents: data.volunteerData.documents || {},
        management: {},
        metrics: {
          volunteerHours: 0,
          performanceScore: 0,
          attendanceRate: 0,
        },
        certificates: [],
        attendance: [],
        assignments: [],
        createdBy: claims.uid,
        updatedBy: claims.uid,
      } as any);
    }

    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: claims.uid,
      action: 'VOLUNTEER_APPLIED',
      module: 'Auth',
      description: `New volunteer application submitted: ${data.email}`,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to register volunteer:', error);
    return { success: false, error: message };
  }
}
