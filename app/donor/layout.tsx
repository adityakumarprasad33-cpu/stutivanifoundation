import React, { ReactNode } from 'react';
import { DonorProvider } from '@/features/donors/context/donor-context';
import { DonorSidebar } from '@/features/donors/components/portal/donor-sidebar';
import { DonorHeader } from '@/features/donors/components/portal/donor-header';

export const metadata = {
  title: 'Donor Portal | Stuti-Vani Foundation',
  description: 'Manage your donations and receipts.',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

import { AuthProvider } from '@/features/auth/context/auth.context';

export default function DonorLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DonorProvider>
        <div className="flex h-screen overflow-hidden bg-rose-50/30 dark:bg-gray-950">
          <DonorSidebar />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <DonorHeader />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 w-full max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </div>
      </DonorProvider>
    </AuthProvider>
  );
}
