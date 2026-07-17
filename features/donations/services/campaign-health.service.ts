import { DonationRepository } from './donation.repository';
import { CampaignRepository } from './campaign.repository';

export interface CampaignHealth {
  raisedAmount: number;
  goalAmount: number;
  remainingAmount: number;
  progressPercentage: number;
  donorCount: number;
}

export class CampaignHealthService {
  /**
   * Dynamically aggregates the actual amount raised for a campaign
   * rather than relying solely on the mutable field in the Campaign document.
   */
  static async computeHealth(campaignId: string): Promise<CampaignHealth> {
    const campaignRepo = new CampaignRepository();
    const campaign = await campaignRepo.getById(campaignId);
    
    if (!campaign) {
      throw new Error(`Campaign with ID ${campaignId} not found`);
    }

    const donationRepo = new DonationRepository();
    const { data: donations } = await donationRepo.query({
      filters: [
        { field: 'campaignId', operator: '==', value: campaignId },
        { field: 'donationStatus', operator: '==', value: 'COMPLETED' }
      ]
    });

    let raisedAmount = 0;
    const uniqueDonors = new Set<string>();

    donations.forEach(donation => {
      raisedAmount += donation.amount;
      uniqueDonors.add(donation.donorId);
    });

    const remainingAmount = Math.max(0, campaign.goalAmount - raisedAmount);
    const progressPercentage = campaign.goalAmount > 0 
      ? Math.min(100, Math.round((raisedAmount / campaign.goalAmount) * 100))
      : 0;

    return {
      raisedAmount,
      goalAmount: campaign.goalAmount,
      remainingAmount,
      progressPercentage,
      donorCount: uniqueDonors.size
    };
  }
}
