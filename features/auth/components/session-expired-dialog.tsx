'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

// A simple dialog component to show when the user is forced out due to session expiration
// It is intended to be rendered at the root layout level inside the AuthProvider.
export const SessionExpiredDialog = () => {
  const { user, firebaseUser } = useAuth();

  useEffect(() => {
    // This component is kept as a stub for future in-app modal session warnings.
  }, [user, firebaseUser]);

  return null;
};
