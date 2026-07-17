import React from 'react';
import Image from 'next/image';
import type { Partner } from '@/features/partners/types/partner.types';
import type { MediaAsset } from '@/features/gallery/types/media.types';

interface PartnerLogoProps {
  partner: Partner & { logo?: MediaAsset | null };
}

export function PartnerLogo({ partner }: PartnerLogoProps) {
  const imageUrl = partner.logo?.assetType === 'IMAGE' && partner.logo.cloudinary
    ? partner.logo.cloudinary.secureUrl
    : null;

  if (!imageUrl) return null;

  const content = (
    <div className="relative w-40 h-20 md:w-48 md:h-24 flex items-center justify-center p-4 bg-white/50 dark:bg-black/20 rounded-xl transition-all duration-500 hover:bg-white dark:hover:bg-white/5 shadow-sm hover:shadow-md border border-border/50 group">
      <Image
        src={imageUrl}
        alt={`${partner.name} logo`}
        fill
        sizes="(max-width: 768px) 160px, 192px"
        className="object-contain p-4 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
      />
    </div>
  );

  if (partner.websiteUrl) {
    return (
      <a 
        href={partner.websiteUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl transition-shadow"
        aria-label={`Visit ${partner.name} website`}
      >
        {content}
      </a>
    );
  }

  return content;
}
