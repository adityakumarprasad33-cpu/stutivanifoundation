'use client';

import React, { useState } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import type { CloudinaryAssetReference } from '../types/project.types';

interface ProjectMediaUploaderProps {
  label: string;
  description?: string;
  onUploadComplete: (asset: CloudinaryAssetReference) => void;
  onRemove: () => void;
  currentAsset?: CloudinaryAssetReference;
  accept?: string;
}

export const ProjectMediaUploader = ({
  label,
  description,
  onUploadComplete,
  onRemove,
  currentAsset,
  accept = 'image/*'
}: ProjectMediaUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // In a real implementation, this hits an internal /api/upload endpoint
      // which safely interacts with the Cloudinary SDK using server secrets.
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      // Assume the API returns the asset in our expected format
      onUploadComplete({
        publicId: result.public_id,
        secureUrl: result.secure_url,
        resourceType: result.resource_type || 'image',
        format: result.format,
        bytes: result.bytes,
        originalFilename: file.name,
      });
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      
      {error && <p className="text-xs text-red-500">{error}</p>}

      {currentAsset ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 group bg-gray-50 dark:bg-gray-900">
          {currentAsset.resourceType === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={currentAsset.secureUrl} 
              alt="Uploaded media" 
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-gray-400">
              <ImageIcon size={32} />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              title="Remove media"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className={`
          relative flex flex-col items-center justify-center w-full h-48 
          border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isUploading ? 'bg-gray-50 border-gray-300 dark:bg-gray-800/50 dark:border-gray-700' : 'bg-gray-50 border-gray-300 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800'}
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <>
                <Loader2 size={32} className="text-blue-500 animate-spin mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Uploading to Cloudinary...</p>
              </>
            ) : (
              <>
                <UploadCloud size={32} className="text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
};
