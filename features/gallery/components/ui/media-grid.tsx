import React from 'react';
import type { MediaAsset } from '../../types/media.types';
import { MediaCard } from './media-card';

interface MediaGridProps {
  assets: MediaAsset[];
  onSelect?: (asset: MediaAsset) => void;
  selectedIds?: string[];
}

export const MediaGrid = ({ assets, onSelect, selectedIds = [] }: MediaGridProps) => {
  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-400 text-2xl text-2xl">📸</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No assets found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload some media or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {assets.map((asset) => (
        <MediaCard 
          key={asset.id} 
          asset={asset} 
          onSelect={onSelect}
          selected={selectedIds.includes(asset.id)}
        />
      ))}
    </div>
  );
};
