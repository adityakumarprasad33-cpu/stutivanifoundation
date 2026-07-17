'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type SidebarState = 'expanded' | 'collapsed' | 'mobile_open' | 'mobile_closed';

interface DashboardContextType {
  // Sidebar State
  sidebarState: SidebarState;
  setSidebarState: (state: SidebarState) => void;
  toggleSidebar: () => void;
  
  // Organization / Workspace Shell
  currentOrganization: string;
  currentWorkspace: string;
  currentModule: string;
  
  // Floating / Utility States
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  
  isNotificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  
  // Widget Preferences
  widgetPreferences: Record<string, unknown>;
  setWidgetPreferences: (prefs: Record<string, unknown>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isNotificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [widgetPreferences, setWidgetPreferences] = useState({});
  
  // Defaults for future multi-tenant or workspace expansion
  const currentOrganization = 'stuti-vani-foundation';
  const currentWorkspace = 'main';
  const currentModule = 'dashboard';

  // Persist sidebar state
  useEffect(() => {
    const saved = localStorage.getItem('sv_sidebar_state');
    if (saved === 'collapsed' || saved === 'expanded') {
      setSidebarState(saved);
    }
  }, []);

  const handleSetSidebarState = useCallback((state: SidebarState) => {
    setSidebarState(state);
    if (state === 'expanded' || state === 'collapsed') {
      localStorage.setItem('sv_sidebar_state', state);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarState(prev => {
      // Logic: if on desktop, toggle between expanded/collapsed.
      // If mobile, toggle mobile_open/mobile_closed
      if (window.innerWidth < 1024) {
        return prev === 'mobile_open' ? 'mobile_closed' : 'mobile_open';
      }
      return prev === 'expanded' ? 'collapsed' : 'expanded';
    });
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      // ESC to close floating panels
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setNotificationDrawerOpen(false);
        if (window.innerWidth < 1024) {
          setSidebarState('mobile_closed');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        sidebarState,
        setSidebarState: handleSetSidebarState,
        toggleSidebar,
        currentOrganization,
        currentWorkspace,
        currentModule,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isNotificationDrawerOpen,
        setNotificationDrawerOpen,
        widgetPreferences,
        setWidgetPreferences,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
