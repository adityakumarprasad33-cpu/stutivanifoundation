import React from 'react';
import Image from 'next/image';
import { BRANDING } from '@/constants/branding';
import { cn } from '@/lib/utils';

interface BrandProps {
  className?: string;
  size?: number; // Size in pixels for both width and height
}

export const BrandMark = ({ className, size = 32 }: BrandProps) => {
  return (
    <div 
      className={cn("relative shrink-0", className)} 
      style={{ width: size, height: size }}
    >
      <Image
        src={BRANDING.ASSETS.LOGO}
        alt={`${BRANDING.ORGANIZATION.SHORT_NAME} Logo`}
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
    </div>
  );
};

export const BrandText = ({ className }: { className?: string }) => {
  return (
    <span className={cn("font-bold font-geist text-gray-900 dark:text-white truncate", className)}>
      {BRANDING.ORGANIZATION.SHORT_NAME}
    </span>
  );
};

export const BrandLogo = ({ 
  className, 
  markSize = 32,
  showText = true,
  textClassName
}: BrandProps & { showText?: boolean, markSize?: number, textClassName?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BrandMark size={markSize} />
      {showText && <BrandText className={textClassName} />}
    </div>
  );
};
