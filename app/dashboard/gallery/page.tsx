import React from 'react';
import { requirePermission } from '@/lib/auth/server-guards';
import { MediaRepository } from '@/features/gallery/services/media.repository';
import { MediaLibrary } from '@/features/gallery/components/ui/media-library';

export const metadata = {
  title: 'Gallery | Stuti-Vani Foundation',
};

export default async function GalleryPage() {
  await requirePermission('gallery.view');

  const mediaRepo = new MediaRepository();
  const initialAssets = await mediaRepo.getRecentAssets(50);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform images, documents, and videos.</p>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <MediaLibrary initialAssets={initialAssets} />
      </div>
    </div>
  );
}
