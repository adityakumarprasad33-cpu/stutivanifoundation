'use server';

import { revalidatePath } from 'next/cache';
import { donorFormSchema, type DonorFormData } from '../validation/donor.schemas';
import { DonorRepository } from '../services/donor.repository';
import { DonationPolicy } from '../policy/donation.policy';
import { DonationService } from '../services/donation.service';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
type ActionResponse<T> = { success: true; data?: T } | { success: false; error: string };

export async function createDonor(data: DonorFormData): Promise<ActionResponse<string>> {
  try {
    await DonationPolicy.canManageDonors();
    
    const validated = donorFormSchema.parse(data);
    const donorRepo = new DonorRepository();
    const activityRepo = new ActivityRepository();

    const donor = await donorRepo.create({
      ...validated,
      createdBy: 'SYSTEM',
      updatedBy: 'SYSTEM',
      donorNumber: DonationService.generateDonorNumber(),
      searchVector: DonationService.generateDonorSearchVector(validated.fullName, validated.email, validated.phone)
    });

    await activityRepo.log({
      action: 'DONOR_CREATED',
      module: 'DONORS',
      description: `Created donor profile for ${validated.fullName}`,
      metadata: { donorId: donor.id, type: validated.donorType }
    });

    revalidatePath('/dashboard/donors');
    return { success: true, data: donor.id };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateDonor(id: string, data: DonorFormData): Promise<ActionResponse<void>> {
  try {
    await DonationPolicy.canManageDonors();
    
    const validated = donorFormSchema.parse(data);
    const donorRepo = new DonorRepository();
    const activityRepo = new ActivityRepository();

    await donorRepo.update(id, {
      ...validated,
      searchVector: DonationService.generateDonorSearchVector(validated.fullName, validated.email, validated.phone)
    });

    await activityRepo.log({
      action: 'DONOR_UPDATED',
      module: 'DONORS',
      description: `Updated donor profile for ${validated.fullName}`,
      metadata: { donorId: id }
    });

    revalidatePath('/dashboard/donors');
    revalidatePath(`/dashboard/donors/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteDonor(id: string): Promise<ActionResponse<void>> {
  try {
    await DonationPolicy.canManageDonors();
    
    const donorRepo = new DonorRepository();
    const activityRepo = new ActivityRepository();

    await donorRepo.delete(id);

    await activityRepo.log({
      action: 'DONOR_UPDATED', // Can map to deleted
      module: 'DONORS',
      description: `Deleted donor profile`,
      metadata: { donorId: id }
    });

    revalidatePath('/dashboard/donors');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
