import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface GalleryCardProps {
  media: Record<string, any>; 
}

export function GalleryCard({ media }: GalleryCardProps) {
  const isVideo = media.type === 'VIDEO' || media.url?.includes('youtube.com');

  return (
    <Card className="cursor-pointer">
      <div data-slot="card-image" className="aspect-square w-full bg-muted relative overflow-hidden rounded-2xl">
        {media.url ? (
          <Image 
            src={media.thumbnail || media.url} 
            alt={media.title || 'Gallery Media'} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">No Media</div>
        )}
        
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-medium truncate">{media.title || 'Untitled'}</p>
        </div>
      </div>
    </Card>
  );
}
