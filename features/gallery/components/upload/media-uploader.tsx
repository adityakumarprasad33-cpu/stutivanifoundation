'use client';

import React, { useCallback, useState } from 'react';
import { File, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary/client';
import { generateCloudinarySignature } from '../../actions/media.actions';
import type { MediaAssetFormData } from '../../validation/media.schemas';

interface MediaUploaderProps {
  onUploadComplete: (data: Partial<MediaAssetFormData>) => void;
  folder?: string;
}

export const MediaUploader = ({ onUploadComplete, folder = 'general' }: MediaUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setProgress(10); // Start progress

    try {
      // 1. Get Signature
      const signaturePayload = await generateCloudinarySignature({ folder: `stuti-vani/${folder}` });
      setProgress(40);

      // 2. Upload
      const uploadRes = await uploadToCloudinary(file, signaturePayload, `stuti-vani/${folder}`);
      setProgress(90);

      // 3. Map to MediaAssetFormData
      const isImage = file.type.startsWith('image/');
      
      const payload: Partial<MediaAssetFormData> = {
        title: file.name.split('.')[0],
        assetType: isImage ? 'IMAGE' : 'DOCUMENT',
        status: 'TEMP_UPLOAD',
        cloudinary: {
          publicId: uploadRes.public_id,
          secureUrl: uploadRes.secure_url,
          thumbnailUrl: uploadRes.secure_url, // For PDFs, Cloudinary can generate .jpg thumbnails but we'll stick to secureUrl for now
          width: uploadRes.width,
          height: uploadRes.height,
          fileSize: uploadRes.bytes,
          mimeType: file.type,
          folder: `stuti-vani/${folder}`,
        }
      };

      setProgress(100);
      onUploadComplete(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        disabled={isUploading}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        {isUploading ? (
          <>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">Uploading... {progress}%</div>
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full">
                <File className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                Drag and drop your files here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                or click to browse from your computer
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 mx-8 rounded">
          {error}
        </div>
      )}
    </div>
  );
};
