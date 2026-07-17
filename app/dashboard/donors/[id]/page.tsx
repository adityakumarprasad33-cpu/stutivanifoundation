import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonorRepository } from '@/features/donations/services/donor.repository';
import { DonationRepository } from '@/features/donations/services/donation.repository';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DonorWorkspacePage({
  params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await DonationPolicy.canViewDonors();
  
  const donorRepo = new DonorRepository();
  const donor = await donorRepo.getById(resolvedParams.id);
  
  if (!donor) notFound();

  const donationRepo = new DonationRepository();
  const { data: donations } = await donationRepo.query({
    filters: [{ field: 'donorId', operator: '==', value: donor.id }]
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{donor.fullName}</h1>
          <p className="text-muted-foreground">{donor.donorNumber} • {donor.donorType}</p>
        </div>
        <div className="space-x-2">
          <Link href={`/dashboard/donations/create?donorId=${donor.id}`}>
            <Button variant="outline">Log Donation</Button>
          </Link>
          <Link href={`/dashboard/donors/${donor.id}/edit`}>
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Email:</strong> {donor.email}</p>
            <p><strong>Phone:</strong> {donor.phone}</p>
            <p><strong>Address:</strong> {donor.address?.city || 'N/A'}, {donor.address?.state || 'N/A'}, {donor.address?.country || 'N/A'}</p>
            <p><strong>PAN:</strong> {donor.taxDetails?.panNumber || 'N/A'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <p className="text-muted-foreground">No donations logged yet.</p>
            ) : (
              <ul className="space-y-4">
                {donations.slice(0, 5).map(d => (
                  <li key={d.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">₹{d.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{d.donationDate.toLocaleDateString()} • {d.purpose}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${d.donationStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {d.donationStatus}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
