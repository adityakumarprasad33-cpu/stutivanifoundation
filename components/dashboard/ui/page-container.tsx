import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1920px]',
  full: 'max-w-none',
};

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, className, maxWidth = 'lg', ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          'w-full mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300',
          maxWidthClasses[maxWidth],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';
