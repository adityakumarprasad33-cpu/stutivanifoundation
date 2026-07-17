import { DonationRepository } from './donation.repository';
import { DonorRepository } from './donor.repository';

export class DonationAnalyticsService {
  static async getMonthlyRevenueTrends(year: number): Promise<Array<{ month: string; revenue: number }>> {
    const repo = new DonationRepository();
    
    // Use Firestore limits. In prod, use Aggregation Queries.
    const { data: donations } = await repo.query({
      filters: [{ field: 'donationStatus', operator: '==', value: 'COMPLETED' }],
      limit: 10000
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueByMonth = new Array(12).fill(0);

    donations.forEach(d => {
      if (d.donationDate && d.donationDate.getFullYear() === year) {
        revenueByMonth[d.donationDate.getMonth()] += d.amount;
      }
    });

    return months.map((month, index) => ({
      month,
      revenue: revenueByMonth[index]
    }));
  }

  static async getDonorDemographics(): Promise<{ corporate: number, individual: number, ngo: number, trust: number }> {
    const repo = new DonorRepository();
    const { data: donors } = await repo.query({ limit: 5000 });

    let corporate = 0;
    let individual = 0;
    let ngo = 0;
    let trust = 0;

    donors.forEach(d => {
      if (d.donorType === 'CORPORATE') corporate++;
      else if (d.donorType === 'INDIVIDUAL') individual++;
      else if (d.donorType === 'NGO') ngo++;
      else if (d.donorType === 'TRUST') trust++;
    });

    return { corporate, individual, ngo, trust };
  }
}
