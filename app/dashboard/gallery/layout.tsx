import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';

export default async function GalleryLayout({ children }: { children: React.ReactNode }) {
  await requirePermission('gallery.view');

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {children}
    </div>
  );
}
