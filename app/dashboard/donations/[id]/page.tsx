import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonationRepository } from '@/features/donations/services/donation.repository';
import { DonorRepository } from '@/features/donations/services/donor.repository';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DonationWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  await DonationPolicy.canViewDonations();
  
  const resolvedParams = await params;
  const donationRepo = new DonationRepository();
  const donation = await donationRepo.getById(resolvedParams.id);
  
  if (!donation) notFound();

  const donorRepo = new DonorRepository();
  const donor = await donorRepo.getById(donation.donorId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donation {donation.donationNumber}</h1>
          <p className="text-muted-foreground">Date: {donation.donationDate.toLocaleDateString()}</p>
        </div>
        <div className="space-x-2">
          {/* Action buttons (Refund, Generate Receipt, etc) */}
          <Button variant="outline" disabled={donation.receiptStatus !== 'PENDING'}>Generate Receipt</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Amount:</strong> ₹{donation.amount.toLocaleString()} {donation.currency}</p>
            <p><strong>Method:</strong> {donation.paymentMethod}</p>
            <p><strong>Reference:</strong> {donation.referenceNumber || 'N/A'}</p>
            <p><strong>Status:</strong> {donation.donationStatus}</p>
            <p><strong>Receipt Status:</strong> {donation.receiptStatus}</p>
            <p><strong>Purpose:</strong> {donation.purpose}</p>
            <p><strong>Remarks:</strong> {donation.remarks || 'None'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Donor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {donor ? (
              <>
                <p><strong>Name:</strong> <Link href={`/dashboard/donors/${donor.id}`} className="text-primary hover:underline">{donor.fullName}</Link></p>
                <p><strong>Email:</strong> {donor.email}</p>
                <p><strong>Phone:</strong> {donor.phone}</p>
                <p><strong>80G Eligible:</strong> {donor.taxDetails.eligible80G ? 'Yes' : 'No'}</p>
              </>
            ) : (
              <p className="text-muted-foreground text-sm italic">Donor information unavailable or anonymous.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
