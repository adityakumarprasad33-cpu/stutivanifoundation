'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PortalContextProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const PortalContext = createContext<PortalContextProps | undefined>(undefined);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <PortalContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        isNotificationOpen,
        setNotificationOpen,
        toggleSidebar,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
