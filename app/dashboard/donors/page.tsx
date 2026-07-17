import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonorRepository } from '@/features/donations/services/donor.repository';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DonorsPage() {
  await DonationPolicy.canViewDonors();
  const repo = new DonorRepository();
  const { data: donors } = await repo.query({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donors</h1>
          <p className="text-muted-foreground">Manage your donor database.</p>
        </div>
        <Link href="/dashboard/donors/create">
          <Button>Add Donor</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="h-10 px-4 text-left font-medium">Donor Number</th>
              <th className="h-10 px-4 text-left font-medium">Name</th>
              <th className="h-10 px-4 text-left font-medium">Type</th>
              <th className="h-10 px-4 text-left font-medium">Email</th>
              <th className="h-10 px-4 text-left font-medium">Status</th>
              <th className="h-10 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground">No donors found</td>
              </tr>
            ) : (
              donors.map((donor) => (
                <tr key={donor.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{donor.donorNumber}</td>
                  <td className="p-4 font-medium">{donor.fullName}</td>
                  <td className="p-4">{donor.donorType}</td>
                  <td className="p-4">{donor.email}</td>
                  <td className="p-4">{donor.status}</td>
                  <td className="p-4">
                    <Link href={`/dashboard/donors/${donor.id}`} className="text-primary hover:underline mr-4">
                      View
                    </Link>
                    <Link href={`/dashboard/donors/${donor.id}/edit`} className="text-primary hover:underline">
                      Edit
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
