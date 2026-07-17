import React from 'react';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { PartnerForm } from '@/features/partners/components/partner-form';
import { partnerRepository } from '@/features/partners/services/partner.repository';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Partner | Dashboard',
};

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const partner = await partnerRepository.getById(resolvedParams.id);
  
  if (!partner) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Edit Partner" 
        description="Update partner details, logo, and visibility settings."
      />
      <PartnerForm mode="edit" initialData={partner} />
    </div>
  );
}
