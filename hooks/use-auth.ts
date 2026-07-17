import { useAuthContext } from '@/features/auth/context/auth.context';

export const useAuth = () => {
  const { user, firebaseUser, isLoading, logout, refreshSession } = useAuthContext();

  return {
    user,
    firebaseUser,
    isLoading,
    isAuthenticated: !!user,
    role: user?.lastSelectedRole || user?.roles?.[0] || null,
    status: user?.status || null,
    logout,
    refreshSession,
  };
};

export const useCurrentUser = () => {
  const { user } = useAuthContext();
  return user;
};
