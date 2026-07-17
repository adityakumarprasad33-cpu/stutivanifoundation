import { DonorRepository } from './donor.repository';
import { DonationRepository } from './donation.repository';
import { UserRepository } from '@/features/auth/services/user.repository';
import type { CreateDonorDTO, UpdateDonorDTO, Donor } from '../types/donation.types';

export class DonorService {
  private donorRepo: DonorRepository;
  private donationRepo: DonationRepository;
  private userRepo: UserRepository;

  constructor() {
    this.donorRepo = new DonorRepository();
    this.donationRepo = new DonationRepository();
    this.userRepo = new UserRepository();
  }

  async getDonorById(id: string): Promise<Donor | null> {
    return this.donorRepo.getById(id);
  }

  async getDonorByEmail(email: string): Promise<Donor | null> {
    const { data } = await this.donorRepo.query({
      filters: [{ field: 'email', operator: '==', value: email }],
    });
    return data.length > 0 ? data[0] : null;
  }

  /**
   * Links past guest donations to a newly registered donor account.
   * This is called automatically when a user creates an account from the /donate flow
   * or when a donor with matching email registers.
   */
  async linkGuestDonations(donorId: string, email: string): Promise<{ linkedCount: number }> {
    // Find all guest donations with this email
    const { data: guestDonations } = await this.donationRepo.query({
      filters: [
        { field: 'donorEmail', operator: '==', value: email },
        { field: 'donorId', operator: '==', value: '' } // Only link if unassigned
      ],
    });

    if (guestDonations.length === 0) {
      return { linkedCount: 0 };
    }

    let linkedCount = 0;
    for (const donation of guestDonations) {
      if (!donation.id) continue;
      
      await this.donationRepo.update(donation.id, {
        donorId: donorId
      });
      linkedCount++;
    }

    // Update the donor's lifetime value if donations were linked
    if (linkedCount > 0) {
      const donor = await this.getDonorById(donorId);
      if (donor) {
        // Calculate new lifetime value based on linked donations
        const newLifetimeValue = (donor.ai?.lifetimeValue || 0) + 
          guestDonations.reduce((sum, d) => sum + d.amount, 0);

        await this.donorRepo.update(donorId, {
          ai: {
            ...donor.ai,
            lifetimeValue: newLifetimeValue
          }
        });
      }
    }

    return { linkedCount };
  }

  /**
   * Processes a new donation and triggers necessary notifications (Success, Receipt).
   */
  async processDonation(donationData: any): Promise<void> {
    // 1. Save to DB (mock)
    const newDonation = await this.donationRepo.create(donationData);

    // 2. Dispatch Success Notification
    const { notificationService } = await import('@/features/notifications');
    await notificationService.dispatch(
      'donations',
      'donation_success',
      donationData.donorId || 'guest',
      {
        amount: donationData.amount,
        campaignId: donationData.campaignId,
        donationId: newDonation.id,
      }
    );

    // 3. Dispatch Receipt Notification
    await notificationService.dispatch(
      'donations',
      'receipt_ready',
      donationData.donorId || 'guest',
      {
        donationId: newDonation.id,
        receiptUrl: `/donor/receipts/${newDonation.id}`,
      }
    );
  }
}
