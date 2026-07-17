import { VolunteerForm } from '@/features/volunteers/components/volunteer-form';
import { requirePermission } from '@/lib/auth/server-guards';
import { updateVolunteer } from '@/features/volunteers/actions/volunteer.actions';
import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';
import { notFound } from 'next/navigation';

export default async function EditVolunteerPage({
  params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await requirePermission('volunteers.edit');

  const repo = new VolunteerRepository();
  const { data: volunteers } = await repo.query({
    filters: [{ field: 'slug', operator: '==', value: resolvedParams.slug }],
    limit: 1
  });

  const volunteer = volunteers[0];
  if (!volunteer) return notFound();

  const handleUpdate = async (data: unknown) => {
    'use server';
    return updateVolunteer(volunteer.id, data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Volunteer</h1>
        <p className="text-muted-foreground mt-1">{volunteer.volunteerNumber}</p>
      </div>

      <VolunteerForm initialData={volunteer} onSubmit={handleUpdate} />
    </div>
  );
}
