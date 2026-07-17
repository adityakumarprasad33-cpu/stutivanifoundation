import { VolunteerForm } from '@/features/volunteers/components/volunteer-form';
import { requirePermission } from '@/lib/auth/server-guards';
import { createVolunteer } from '@/features/volunteers/actions/volunteer.actions';

export default async function CreateVolunteerPage() {
  await requirePermission('volunteers.create');

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Onboard Volunteer</h1>
        <p className="text-muted-foreground mt-1">Add a new volunteer to the workforce.</p>
      </div>

      <VolunteerForm onSubmit={createVolunteer} />
    </div>
  );
}
