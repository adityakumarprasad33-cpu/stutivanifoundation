'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MediaGrid } from '../ui/media-grid';
import { MediaUploader } from '../upload/media-uploader';
import { YouTubeAdder } from '../upload/youtube-adder';
import type { MediaAsset, AssetType } from '../../types/media.types';
import type { MediaAssetFormData } from '../../validation/media.schemas';
import { createMediaAsset } from '../../actions/media.actions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MediaSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (assets: MediaAsset[]) => void;
  multiple?: boolean;
  allowedTypes?: AssetType[];
  folder?: string;
  recentAssets?: MediaAsset[]; 
}

export const MediaSelectorDialog = ({
  open,
  onOpenChange,
  onSelect,
  multiple = false,
  allowedTypes,
  folder = 'general',
  recentAssets = []
}: MediaSelectorDialogProps) => {
  const [activeTab, setActiveTab] = useState<'LIBRARY' | 'UPLOAD'>('LIBRARY');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [assets, setAssets] = useState<MediaAsset[]>(recentAssets);

  const handleSelectAsset = (asset: MediaAsset) => {
    if (multiple) {
      setSelectedIds(prev => 
        prev.includes(asset.id) 
          ? prev.filter(id => id !== asset.id)
          : [...prev, asset.id]
      );
    } else {
      setSelectedIds([asset.id]);
    }
  };

  const handleConfirm = () => {
    const selectedAssets = assets.filter(a => selectedIds.includes(a.id));
    onSelect(selectedAssets);
    onOpenChange(false);
    setSelectedIds([]);
  };

  const handleUploadComplete = async (data: Partial<MediaAssetFormData>) => {
    setIsProcessing(true);
    try {
      const res = await createMediaAsset({
        ...data,
        visibility: 'PUBLIC',
        status: 'READY'
      } as MediaAssetFormData);
      if (res.success && res.id) {
        toast.success('Media uploaded successfully');
        const newAsset = { id: res.id, ...data, status: 'READY' } as MediaAsset;
        setAssets([newAsset, ...assets]);
        setActiveTab('LIBRARY');
        setSelectedIds(multiple ? [...selectedIds, res.id] : [res.id]);
      } else {
        toast.error(res.error || 'Failed to save media');
      }
    } catch {
      toast.error('An error occurred while saving media');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose media from your library or upload a new asset.
          </DialogDescription>
        </DialogHeader>

        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-4">
          <button
            onClick={() => setActiveTab('LIBRARY')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'LIBRARY' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('UPLOAD')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'UPLOAD' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Upload New
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 relative">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-10 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

          {activeTab === 'LIBRARY' ? (
            <div className="p-1">
              <MediaGrid 
                assets={assets.filter(a => !allowedTypes || allowedTypes.includes(a.assetType))} 
                onSelect={handleSelectAsset}
                selectedIds={selectedIds}
              />
            </div>
          ) : (
            <div className="space-y-8 py-8 max-w-2xl mx-auto w-full">
              {(!allowedTypes || allowedTypes.includes('IMAGE') || allowedTypes.includes('DOCUMENT')) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Upload File</h3>
                  <MediaUploader onUploadComplete={handleUploadComplete} folder={folder} />
                </div>
              )}
              
              {(!allowedTypes || allowedTypes.includes('YOUTUBE')) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Add YouTube Video</h3>
                  <YouTubeAdder onAdd={handleUploadComplete} />
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-500">
              {selectedIds.length} item(s) selected
            </span>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleConfirm} disabled={selectedIds.length === 0 || isProcessing}>
                Confirm Selection
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
