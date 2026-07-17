import { DonationRepository } from './donation.repository';
import type { FinancialStatistics } from '../types/donation.types';

export class DonationStatisticsService {
  static async getGlobalStatistics(): Promise<FinancialStatistics> {
    const repo = new DonationRepository();
    // Only aggregate COMPLETED donations
    const { data: donations } = await repo.query({
      filters: [{ field: 'donationStatus', operator: '==', value: 'COMPLETED' }],
      limit: 10000 // In a true massive scale, use Firestore Aggregation Queries (COUNT, SUM, AVG)
    });

    let totalDonations = 0;
    let largestDonation = 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let monthlyDonations = 0;
    let yearlyDonations = 0;

    donations.forEach(donation => {
      totalDonations += donation.amount;
      
      if (donation.amount > largestDonation) {
        largestDonation = donation.amount;
      }

      if (donation.donationDate) {
        if (donation.donationDate.getFullYear() === currentYear) {
          yearlyDonations += donation.amount;
          if (donation.donationDate.getMonth() === currentMonth) {
            monthlyDonations += donation.amount;
          }
        }
      }
    });

    const averageDonation = donations.length > 0 ? (totalDonations / donations.length) : 0;

    // Calculate basic donor retention (donors who gave more than once)
    const donorCounts = new Map<string, number>();
    donations.forEach(d => {
      if (d.donorId) {
        donorCounts.set(d.donorId, (donorCounts.get(d.donorId) || 0) + 1);
      }
    });
    
    let returningDonors = 0;
    donorCounts.forEach(count => {
      if (count > 1) returningDonors++;
    });

    const donorRetentionRate = donorCounts.size > 0 ? (returningDonors / donorCounts.size) * 100 : 0;

    return {
      totalDonations,
      monthlyDonations,
      yearlyDonations,
      averageDonation,
      largestDonation,
      donorRetentionRate
    };
  }
}
