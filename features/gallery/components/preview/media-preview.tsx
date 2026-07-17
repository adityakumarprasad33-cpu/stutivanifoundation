import React from 'react';
import type { MediaAsset } from '../../types/media.types';
import Image from 'next/image';
import { FileText, Download, ExternalLink } from 'lucide-react';

export const MediaPreview = ({ asset }: { asset: MediaAsset }) => {
  if (asset.assetType === 'IMAGE' && asset.cloudinary) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image 
            src={asset.cloudinary.secureUrl} 
            alt={asset.altText || asset.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{asset.cloudinary.width} x {asset.cloudinary.height}</span>
          <a href={asset.cloudinary.secureUrl} target="_blank" rel="noreferrer" className="flex items-center text-blue-600 hover:underline">
            <ExternalLink className="w-4 h-4 mr-1" /> View Original
          </a>
        </div>
      </div>
    );
  }

  if (asset.assetType === 'YOUTUBE' && asset.youtube) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <iframe 
            src={asset.youtube.embedUrl}
            title={asset.youtube.videoTitle || asset.title}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        </div>
        <div className="flex justify-end">
          <a href={asset.youtube.originalUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm text-blue-600 hover:underline">
            <ExternalLink className="w-4 h-4 mr-1" /> Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  if (asset.assetType === 'DOCUMENT' && asset.cloudinary) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <FileText className="w-16 h-16 text-gray-400 mb-4" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white text-center">{asset.title}</h4>
        <p className="text-sm text-gray-500 mb-6">{asset.cloudinary.mimeType}</p>
        
        <a 
          href={asset.cloudinary.secureUrl} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <Download className="w-4 h-4 mr-2" />
          Download / View Document
        </a>
      </div>
    );
  }

  return null;
};
