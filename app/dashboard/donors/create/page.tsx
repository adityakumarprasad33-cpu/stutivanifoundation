import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonorForm } from '@/features/donations/components/donor-form';

export default async function CreateDonorPage() {
  await DonationPolicy.canManageDonors();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Donor</h1>
        <p className="text-muted-foreground">Add a new donor to the database.</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <DonorForm />
      </div>
    </div>
  );
}
