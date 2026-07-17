'use client';

import React, { useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';

interface PreloaderProviderProps {
  children: React.ReactNode;
}

export const PreloaderProvider = ({ children }: PreloaderProviderProps) => {
  const [showPreloader, setShowPreloader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if this is the first visit during this session
    const hasSeenPreloader = sessionStorage.getItem('has_seen_preloader');
    
    if (!hasSeenPreloader) {
      setShowPreloader(true);
      sessionStorage.setItem('has_seen_preloader', 'true');
    }
  }, []);

  const handleFinishLoading = () => {
    setShowPreloader(false);
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showPreloader && <Preloader finishLoading={handleFinishLoading} />}
      {children}
    </>
  );
};
