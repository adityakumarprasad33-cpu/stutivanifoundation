import React from 'react';
import { PageHeader } from '@/components/dashboard/ui/page-header';
import { PartnerForm } from '@/features/partners/components/partner-form';

export const metadata = {
  title: 'Create Partner | Dashboard',
};

export default function CreatePartnerPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Add New Partner" 
        description="Add a new partner or sponsor to be displayed on the public website."
      />
      <PartnerForm mode="create" />
    </div>
  );
}
