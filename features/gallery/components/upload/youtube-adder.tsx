'use client';

import React, { useState } from 'react';
import { fetchYouTubeMetadata, extractYouTubeId } from '../../utils/youtube.utils';
import { Video, Loader2, Check } from 'lucide-react';
import type { MediaAssetFormData } from '../../validation/media.schemas';

interface YouTubeAdderProps {
  onAdd: (data: Partial<MediaAssetFormData>) => void;
}

export const YouTubeAdder = ({ onAdd }: YouTubeAdderProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAdd = async () => {
    setError(null);
    if (!url) return;
    
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }

    setIsLoading(true);
    const metadata = await fetchYouTubeMetadata(url);
    setIsLoading(false);

    if (!metadata) {
      // Fallback manual entry
      onAdd({
        title: 'YouTube Video',
        assetType: 'YOUTUBE',
        status: 'TEMP_UPLOAD',
        youtube: {
          originalUrl: url,
          videoId,
          embedUrl: `https://www.youtube.com/embed/${videoId}`
        }
      });
      return;
    }

    onAdd({
      title: metadata.title,
      assetType: 'YOUTUBE',
      status: 'TEMP_UPLOAD',
      youtube: {
        originalUrl: url,
        videoId,
        videoTitle: metadata.title,
        channelName: metadata.author_name,
        thumbnailUrl: metadata.thumbnail_url,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      }
    });
    setUrl('');
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-md relative">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Video className="h-5 w-5 text-red-500" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleAdd}
        disabled={isLoading || !url}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
        Add
      </button>
      {error && <p className="text-red-500 text-xs absolute -bottom-5 left-0">{error}</p>}
    </div>
  );
};
