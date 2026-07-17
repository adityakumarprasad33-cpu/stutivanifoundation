'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { authService } from '../services/auth.service';
import { UserRepository } from '../services/user.repository';
import type { UserProfile } from '../services/user.types';
import { LIMITS } from '@/constants';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async (uid: string) => {
    try {
      const repo = new UserRepository();
      const profile = await repo.getByUid(uid);
      setUser(profile);
      
      // Update lastActivity as requested in ADR
      if (profile) {
        await repo.update(profile.id, { lastActivity: new Date() });
      }
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        await fetchUserProfile(fbUser.uid);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // Handle Token Refresh / Auto-refresh
  useEffect(() => {
    if (!firebaseUser) return;

    // Refresh token every hour to keep server session in sync
    const interval = setInterval(async () => {
      try {
        await authService.refreshToken();
      } catch (error) {
        console.error('Failed to refresh session', error);
      }
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [firebaseUser]);

  // Idle Timeout / Auto Logout (ADR requirement)
  useEffect(() => {
    if (!firebaseUser) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        await authService.logout();
        window.location.href = '/login?expired=true';
      }, LIMITS.SESSION_TIMEOUT_MS);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(name => document.addEventListener(name, resetTimer, true));
    
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(name => document.removeEventListener(name, resetTimer, true));
    };
  }, [firebaseUser]);

  const refreshSession = async () => {
    if (firebaseUser) {
      await fetchUserProfile(firebaseUser.uid);
      await authService.refreshToken();
    }
  };

  const logout = async () => {
    await authService.logout();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, isLoading, refreshSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
