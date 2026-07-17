import { z } from 'zod';
import { donorProfileSchema, donorFormSchema } from '../validation/donor.schemas';
import { donationSchema } from '../validation/donation.schemas';
import { campaignSchema } from '../validation/campaign.schemas';
import { transactionSchema } from '../validation/transaction.schemas';

export type DonorProfile = z.infer<typeof donorProfileSchema>;
export type Donation = z.infer<typeof donationSchema>;
export type Campaign = z.infer<typeof campaignSchema>;
export type Transaction = z.infer<typeof transactionSchema>;

export type Donor = z.infer<typeof donorFormSchema> & {
  id: string;
  donorNumber: string;
  searchVector: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  ai?: {
    lifetimeValue?: number;
  };
  totalDonationAmount?: number;
  metrics?: {
    taxReceiptsGenerated?: number;
  };
};

export type CreateDonorDTO = Omit<Donor, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDonorDTO = Partial<CreateDonorDTO>;

export type CreateDonorProfileDTO = Omit<DonorProfile, 'id' | 'createdAt' | 'updatedAt' | 'stats'>;
export type UpdateDonorProfileDTO = Partial<CreateDonorProfileDTO>;

export type CreateDonationDTO = Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDonationDTO = Partial<Omit<CreateDonationDTO, 'donationNumber'>>;

export type CreateCampaignDTO = Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'raisedAmount' | 'donorCount'>;
export type UpdateCampaignDTO = Partial<Omit<CreateCampaignDTO, 'slug'>>;

export type CreateTransactionDTO = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>;

export interface FinancialStatistics {
  totalDonations: number;
  monthlyDonations: number;
  yearlyDonations: number;
  averageDonation: number;
  largestDonation: number;
  donorRetentionRate: number;
}
