'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DonorContextProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const DonorContext = createContext<DonorContextProps | undefined>(undefined);

export const DonorProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <DonorContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        isNotificationOpen,
        setNotificationOpen,
        toggleSidebar,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
};

export const useDonor = () => {
  const context = useContext(DonorContext);
  if (context === undefined) {
    throw new Error('useDonor must be used within a DonorProvider');
  }
  return context;
};
