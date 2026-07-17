import React from 'react';
import type { MediaAsset } from '../../types/media.types';
import { MediaStatusBadge } from './media-status-badge';
import { FileText, Video, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface MediaCardProps {
  asset: MediaAsset;
  onSelect?: (asset: MediaAsset) => void;
  selected?: boolean;
}

export const MediaCard = ({ asset, onSelect, selected }: MediaCardProps) => {
  const renderThumbnail = () => {
    if (asset.assetType === 'IMAGE' && asset.cloudinary) {
      return (
        <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800">
          <Image 
            src={asset.cloudinary.thumbnailUrl || asset.cloudinary.secureUrl} 
            alt={asset.altText || asset.title}
            fill
            className="object-cover"
          />
        </div>
      );
    }
    if (asset.assetType === 'YOUTUBE' && asset.youtube) {
      return (
        <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {asset.youtube.thumbnailUrl ? (
             <Image src={asset.youtube.thumbnailUrl} alt={asset.title} fill className="object-cover" />
          ) : (
            <Video className="w-12 h-12 text-red-500" />
          )}
        </div>
      );
    }
    if (asset.assetType === 'DOCUMENT') {
      return (
        <div className="w-full h-40 bg-gray-50 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
      );
    }
    return (
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
    );
  };

  return (
    <div 
      onClick={() => onSelect?.(asset)}
      className={`group relative flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border ${selected ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'} transition-all cursor-pointer shadow-sm hover:shadow-md`}
    >
      {renderThumbnail()}
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1 mr-2" title={asset.title}>
            {asset.title}
          </h3>
          <MediaStatusBadge status={asset.status} />
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{asset.assetType}</span>
          <span>{asset.referenceCount} uses</span>
        </div>
      </div>
    </div>
  );
};
