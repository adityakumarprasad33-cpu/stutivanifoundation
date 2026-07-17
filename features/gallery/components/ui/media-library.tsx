'use client';

import React, { useState } from 'react';
import { MediaGrid } from './media-grid';
import { MediaUploader } from '../upload/media-uploader';
import { YouTubeAdder } from '../upload/youtube-adder';
import type { MediaAsset } from '../../types/media.types';
import type { MediaAssetFormData } from '../../validation/media.schemas';
import { createMediaAsset, deleteMediaAsset } from '../../actions/media.actions';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaLibraryProps {
  initialAssets: MediaAsset[];
}

export const MediaLibrary = ({ initialAssets }: MediaLibraryProps) => {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [activeTab, setActiveTab] = useState<'ALL' | 'IMAGE' | 'DOCUMENT' | 'YOUTUBE'>('ALL');
  const [search, setSearch] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredAssets = assets.filter(asset => {
    if (activeTab !== 'ALL' && asset.assetType !== activeTab) return false;
    if (search && !asset.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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
        const newAsset = { id: res.id, ...data, status: 'READY', referenceCount: 0 } as MediaAsset;
        setAssets([newAsset, ...assets]);
        setShowUploader(false);
      } else {
        toast.error(res.error || 'Failed to save media');
      }
    } catch {
      toast.error('An error occurred while saving media');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} item(s)?`)) return;

    setIsProcessing(true);
    let successCount = 0;
    let failCount = 0;

    for (const id of selectedIds) {
      try {
        const res = await deleteMediaAsset(id);
        if (res.success) {
          successCount++;
          setAssets(prev => prev.filter(a => a.id !== id));
        } else {
          failCount++;
          toast.error(res.error || `Failed to delete item ${id}`);
        }
      } catch {
        failCount++;
      }
    }

    if (successCount > 0) toast.success(`Deleted ${successCount} item(s)`);
    if (failCount > 0) toast.error(`Failed to delete ${failCount} item(s)`);
    
    setSelectedIds([]);
    setIsProcessing(false);
  };

  const handleSelect = (asset: MediaAsset) => {
    setSelectedIds(prev => 
      prev.includes(asset.id) 
        ? prev.filter(id => id !== asset.id)
        : [...prev, asset.id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
      
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {(['ALL', 'IMAGE', 'DOCUMENT', 'YOUTUBE'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab === 'ALL' ? 'All Media' : tab.charAt(0) + tab.slice(1).toLowerCase() + 's'}
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48 lg:w-64"
            />
          </div>
          
          {selectedIds.length > 0 ? (
            <Button variant="destructive" onClick={handleDelete} disabled={isProcessing}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedIds.length})
            </Button>
          ) : (
            <Button onClick={() => setShowUploader(!showUploader)}>
              <Plus className="w-4 h-4 mr-2" />
              Upload
            </Button>
          )}
        </div>
      </div>

      {/* Uploader Panel */}
      {showUploader && (
        <div className="mb-8 space-y-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Media</h3>
            <button onClick={() => setShowUploader(false)} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Upload File</h4>
              <MediaUploader onUploadComplete={handleUploadComplete} folder="gallery/images" />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Add YouTube Video</h4>
              <YouTubeAdder onAdd={handleUploadComplete} />
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 overflow-y-auto relative min-h-[400px]">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-10 backdrop-blur-sm rounded-lg">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
        <MediaGrid 
          assets={filteredAssets} 
          onSelect={handleSelect}
          selectedIds={selectedIds}
        />
      </div>

    </div>
  );
};
