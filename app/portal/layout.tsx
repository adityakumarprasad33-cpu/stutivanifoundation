import React from 'react';
import { Metadata } from 'next';
import { PortalProvider } from '@/features/volunteers/context/portal-context';
import { PortalSidebar } from '@/features/volunteers/components/portal/portal-sidebar';
import { PortalHeader } from '@/features/volunteers/components/portal/portal-header';
import { AuthProvider } from '@/features/auth/context/auth.context';

export const metadata: Metadata = {
  title: 'Volunteer Portal | Stuti-Vani Foundation',
  description: 'Volunteer self-service portal',
};

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/server-guards';
import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  const repo = new VolunteerRepository();
  const { data: volunteers } = await repo.query({ 
    filters: [
      { field: 'linkedUserId', operator: '==', value: user.uid }
    ],
    skipStatusFilter: true // Bypass implicit filter to avoid composite index requirement
  });
  const volunteer = volunteers.length > 0 ? volunteers[0] : null;

  if (!volunteer) {
    // Should have a volunteer profile if they are trying to access the portal
    if (pathname !== '/portal/access-denied') {
      redirect('/portal/access-denied');
    }
  } else {
    // Status routing
    if (['APPLIED', 'PENDING_VERIFICATION', 'DRAFT'].includes(volunteer.status)) {
      if (pathname !== '/portal/pending') {
        redirect('/portal/pending');
      }
    } else if (['REJECTED', 'SUSPENDED', 'ARCHIVED', 'SOFT_DELETED', 'INACTIVE'].includes(volunteer.status)) {
      if (pathname !== '/portal/access-denied') {
        redirect('/portal/access-denied');
      }
    } else if (['VERIFIED', 'ACTIVE'].includes(volunteer.status)) {
      // Prevent active users from seeing the pending/denied screens
      if (pathname === '/portal/pending' || pathname === '/portal/access-denied') {
        redirect('/portal');
      }
    }
  }

  const isActive = volunteer ? ['VERIFIED', 'ACTIVE'].includes(volunteer.status) : false;

  return (
    <AuthProvider>
      <PortalProvider>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
          <PortalSidebar isActive={isActive} />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <PortalHeader isActive={isActive} />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 w-full max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </div>
      </PortalProvider>
    </AuthProvider>
  );
}
