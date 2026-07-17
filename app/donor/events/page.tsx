import React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Upcoming Events | Donor Portal',
};

import { EmptyState } from '@/components/dashboard/ui/empty-state';

export default function DonorEventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Upcoming Events" 
        description="Discover exclusive donor events, galas, and community drives."
        breadcrumbs={[{ label: 'Dashboard', href: '/donor' }, { label: 'Events' }]}
      />

      <div className="mt-8">
        <EmptyState 
          icon={CalendarDays}
          title="No events available"
          description="There are currently no upcoming events scheduled. Check back later!"
        />
      </div>
    </div>
  );
}
