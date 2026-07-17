import { DonationPolicy } from '@/features/donations/policy/donation.policy';
import { DonorRepository } from '@/features/donations/services/donor.repository';
import { DonorForm } from '@/features/donations/components/donor-form';
import { notFound } from 'next/navigation';

export default async function EditDonorPage({
  params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await DonationPolicy.canManageDonors();

  const repo = new DonorRepository();
  const donor = await repo.getById(resolvedParams.id);

  if (!donor) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Donor</h1>
        <p className="text-muted-foreground">Update profile for {donor.fullName}.</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <DonorForm initialData={donor} />
      </div>
    </div>
  );
}
