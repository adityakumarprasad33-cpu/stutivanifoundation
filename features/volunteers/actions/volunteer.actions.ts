'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth, requirePermission } from '@/lib/auth/server-guards';
import { volunteerFormSchema } from '../validation/volunteer.schemas';
import { VolunteerRepository } from '../services/volunteer.repository';
import { VolunteerService } from '../services/volunteer.service';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import type { CreateVolunteerDTO, UpdateVolunteerDTO } from '../types/volunteer.types';
import { UserRepository } from '@/features/auth/services/user.repository';
import { adminAuth } from '@/lib/firebase/admin';

export async function createVolunteer(data: unknown) {
  try {
    const user = await requireAuth();
    await requirePermission('volunteers.create');

    const validated = volunteerFormSchema.parse(data);
    const volunteerRepo = new VolunteerRepository();
    
    // Generate Volunteer Number
    const volunteerNumber = await volunteerRepo.getNextVolunteerNumber();
    
    // Generate Slug
    const slug = VolunteerService.generateSlug(validated.personalInfo.firstName, validated.personalInfo.lastName, volunteerNumber);
    
    // Prepare Data
    const createData: CreateVolunteerDTO = {
      ...validated,
      volunteerNumber,
      slug,
      normalizedName: VolunteerService.normalizeString(`${validated.personalInfo.firstName} ${validated.personalInfo.lastName}`),
      normalizedEmail: VolunteerService.normalizeString(validated.personalInfo.email),
      normalizedPhone: VolunteerService.normalizeString(validated.personalInfo.phone),
      keywords: [], // Initializing AI prep fields
      searchVector: VolunteerService.generateSearchVector({
        personalInfo: validated.personalInfo,
        volunteerNumber,
        volunteerType: validated.volunteerType,
        profileDetails: validated.profileDetails
      }),
      analytics: {},
      ai: {},
      createdBy: user.uid,
      updatedBy: user.uid,
    };

    const volunteer = await volunteerRepo.create(createData);
    const id = volunteer.id;

    // Log Activity
    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: user.uid,
      action: 'VOLUNTEER_CREATED',
      module: 'VOLUNTEERS',
      description: 'Created a new volunteer',
      metadata: { entityId: id, volunteerNumber, slug }
    });

    revalidatePath('/dashboard/volunteers');
    return { success: true, id, slug };
  } catch (error) {
    console.error('Failed to create volunteer:', error);
    return { success: false, error: 'Failed to create volunteer. Please try again.' };
  }
}

export async function updateVolunteer(id: string, data: unknown) {
  try {
    const user = await requireAuth();
    await requirePermission('volunteers.edit');

    const validated = volunteerFormSchema.parse(data);
    const volunteerRepo = new VolunteerRepository();

    const existing = await volunteerRepo.getById(id);
    if (!existing) throw new Error('Volunteer not found');

    const updateData: UpdateVolunteerDTO = {
      ...validated,
      normalizedName: VolunteerService.normalizeString(`${validated.personalInfo.firstName} ${validated.personalInfo.lastName}`),
      normalizedEmail: VolunteerService.normalizeString(validated.personalInfo.email),
      normalizedPhone: VolunteerService.normalizeString(validated.personalInfo.phone),
      searchVector: VolunteerService.generateSearchVector({
        personalInfo: validated.personalInfo,
        volunteerNumber: existing.volunteerNumber,
        volunteerType: validated.volunteerType,
        profileDetails: validated.profileDetails
      }),
      updatedBy: user.uid,
    };

    await volunteerRepo.update(id, updateData);

    // Log Activity
    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: user.uid,
      action: 'VOLUNTEER_UPDATED',
      module: 'VOLUNTEERS',
      description: 'Updated volunteer profile',
      metadata: { entityId: id }
    });

    revalidatePath('/dashboard/volunteers');
    revalidatePath(`/dashboard/volunteers/${existing.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to update volunteer:', error);
    return { success: false, error: 'Failed to update volunteer.' };
  }
}

export async function deleteVolunteer(id: string) {
  try {
    const user = await requireAuth();
    await requirePermission('volunteers.delete');

    const volunteerRepo = new VolunteerRepository();
    const activityRepo = new ActivityRepository();

    const existing = await volunteerRepo.getById(id);
    if (!existing) throw new Error('Volunteer not found');

    await volunteerRepo.delete(id);

    await activityRepo.log({
      userId: user.uid,
      action: 'VOLUNTEER_DELETED',
      module: 'VOLUNTEERS',
      description: 'Deleted volunteer profile',
      metadata: { entityId: id, volunteerNumber: existing.volunteerNumber }
    });

    revalidatePath('/dashboard/volunteers');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete volunteer:', error);
    return { success: false, error: 'Failed to delete volunteer.' };
  }
}

export async function approveVolunteer(id: string) {
  try {
    const user = await requireAuth();
    await requirePermission('volunteers.edit'); 

    const volunteerRepo = new VolunteerRepository();
    const existing = await volunteerRepo.getById(id);
    if (!existing) throw new Error('Volunteer not found');
    if (!existing.linkedUserId) throw new Error('Volunteer has no linked user ID');

    // Update volunteer profile status
    await volunteerRepo.update(id, {
      status: 'ACTIVE',
      updatedBy: user.uid
    });

    // Update user status and roles
    const userRepo = new UserRepository();
    const userDoc = await userRepo.getById(existing.linkedUserId);
    
    if (userDoc) {
       const updatedRoles = Array.from(new Set([...userDoc.roles, 'VOLUNTEER']));
       await userRepo.update(existing.linkedUserId, {
         status: 'ACTIVE',
         roles: updatedRoles,
         updatedAt: new Date()
       });
       
       // Note: To set Custom Claims securely, we should call our internal API
       const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/claims`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           uid: existing.linkedUserId,
           claims: { role: updatedRoles[0], roles: updatedRoles } // Sync claims
         })
       });
       if (!res.ok) console.warn('Failed to assign claims via API.');
    }

    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: user.uid,
      action: 'VOLUNTEER_APPROVED',
      module: 'VOLUNTEERS',
      description: `Approved volunteer application for ${existing.personalInfo.firstName}`,
      metadata: { entityId: id, volunteerNumber: existing.volunteerNumber }
    });

    revalidatePath('/dashboard/volunteers');
    revalidatePath(`/dashboard/volunteers/${existing.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to approve volunteer:', error);
    return { success: false, error: 'Failed to approve volunteer.' };
  }
}

export async function rejectVolunteer(id: string) {
  try {
    const user = await requireAuth();
    await requirePermission('volunteers.edit');

    const volunteerRepo = new VolunteerRepository();
    const existing = await volunteerRepo.getById(id);
    if (!existing) throw new Error('Volunteer not found');
    if (!existing.linkedUserId) throw new Error('Volunteer has no linked user ID');

    await volunteerRepo.update(id, {
      status: 'REJECTED',
      updatedBy: user.uid
    });

    const userRepo = new UserRepository();
    await userRepo.update(existing.linkedUserId, { status: 'REJECTED', updatedAt: new Date() });

    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: user.uid,
      action: 'VOLUNTEER_REJECTED',
      module: 'VOLUNTEERS',
      description: `Rejected volunteer application for ${existing.personalInfo.firstName}`,
      metadata: { entityId: id, volunteerNumber: existing.volunteerNumber }
    });

    revalidatePath('/dashboard/volunteers');
    return { success: true };
  } catch (error) {
    console.error('Failed to reject volunteer:', error);
    return { success: false, error: 'Failed to reject volunteer.' };
  }
}

export async function suspendVolunteer(id: string) {
  try {
    const user = await requireAuth();
    await requirePermission('volunteers.edit');

    const volunteerRepo = new VolunteerRepository();
    const existing = await volunteerRepo.getById(id);
    if (!existing) throw new Error('Volunteer not found');
    if (!existing.linkedUserId) throw new Error('Volunteer has no linked user ID');

    await volunteerRepo.update(id, {
      status: 'SUSPENDED',
      updatedBy: user.uid
    });

    const userRepo = new UserRepository();
    await userRepo.update(existing.linkedUserId, { status: 'SUSPENDED', updatedAt: new Date() });

    const activityRepo = new ActivityRepository();
    await activityRepo.log({
      userId: user.uid,
      action: 'VOLUNTEER_SUSPENDED',
      module: 'VOLUNTEERS',
      description: `Suspended volunteer ${existing.personalInfo.firstName}`,
      metadata: { entityId: id, volunteerNumber: existing.volunteerNumber }
    });

    revalidatePath('/dashboard/volunteers');
    revalidatePath(`/dashboard/volunteers/${existing.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to suspend volunteer:', error);
    return { success: false, error: 'Failed to suspend volunteer.' };
  }
}
