'use server';

import { revalidatePath } from 'next/cache';
import { donationFormSchema, type DonationFormData } from '../validation/donation.schemas';
import { DonationRepository } from '../services/donation.repository';
import { DonationPolicy } from '../policy/donation.policy';
import { DonationService } from '../services/donation.service';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
type ActionResponse<T> = { success: true; data?: T } | { success: false; error: string };

export async function createDonation(data: DonationFormData): Promise<ActionResponse<string>> {
  try {
    await DonationPolicy.canManageDonations();
    
    const validated = donationFormSchema.parse(data);
    const donationRepo = new DonationRepository();
    const activityRepo = new ActivityRepository();

    const donation = await donationRepo.create({
      ...validated,
      createdBy: 'SYSTEM',
      updatedBy: 'SYSTEM',
      donationNumber: DonationService.generateDonationNumber(),
      receiptStatus: 'PENDING',
      reconciliationStatus: 'PENDING'
    });

    await activityRepo.log({
      action: 'DONATION_RECEIVED',
      module: 'DONATIONS',
      description: `Logged donation of ${validated.amount} ${validated.currency}`,
      metadata: { donationId: donation.id, amount: validated.amount }
    });

    revalidatePath('/dashboard/donations');
    if (validated.donorId) revalidatePath(`/dashboard/donors/${validated.donorId}`);
    if (validated.campaignId) revalidatePath(`/dashboard/campaigns/${validated.campaignId}`);
    
    return { success: true, data: donation.id };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateDonationStatus(id: string, status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'): Promise<ActionResponse<void>> {
  try {
    await DonationPolicy.canManageDonations();
    const donationRepo = new DonationRepository();
    const activityRepo = new ActivityRepository();
    
    const existing = await donationRepo.getById(id);
    if (!existing) throw new Error("Donation not found");

    await donationRepo.update(id, { donationStatus: status });

    await activityRepo.log({
      action: status === 'REFUNDED' ? 'DONATION_REFUNDED' : 'DONATION_UPDATED',
      module: 'DONATIONS',
      description: `Updated donation ${existing.donationNumber} status to ${status}`,
      metadata: { donationId: id, status }
    });

    revalidatePath('/dashboard/donations');
    revalidatePath(`/dashboard/donations/${id}`);
    if (existing.donorId) revalidatePath(`/dashboard/donors/${existing.donorId}`);
    if (existing.campaignId) revalidatePath(`/dashboard/campaigns/${existing.campaignId}`);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
