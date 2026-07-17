import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonationRepository } from '@/features/donations/services/donation.repository';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DonationsPage() {
  await DonationPolicy.canViewDonations();
  const repo = new DonationRepository();
  // In prod, implement pagination and filtering
  const { data: donations } = await repo.query({ limit: 50, sort: [{ field: 'donationDate', direction: 'desc' }] });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
          <p className="text-muted-foreground">Manage and track all incoming donations.</p>
        </div>
        <Link href="/dashboard/donations/create">
          <Button>Log Manual Donation</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="h-10 px-4 text-left font-medium">Receipt No</th>
              <th className="h-10 px-4 text-left font-medium">Date</th>
              <th className="h-10 px-4 text-left font-medium">Amount</th>
              <th className="h-10 px-4 text-left font-medium">Method</th>
              <th className="h-10 px-4 text-left font-medium">Status</th>
              <th className="h-10 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground">No donations found</td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{donation.receiptNumber || 'PENDING'}</td>
                  <td className="p-4">{donation.donationDate.toLocaleDateString()}</td>
                  <td className="p-4 font-medium">₹{donation.amount.toLocaleString()}</td>
                  <td className="p-4">{donation.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${donation.donationStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {donation.donationStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/dashboard/donations/${donation.id}`} className="text-primary hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
