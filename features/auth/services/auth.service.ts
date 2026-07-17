import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, sendEmailVerification, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { AuthenticationError } from '@/lib/errors';
import { ActivityRepository } from '@/features/activity/services/activity.repository';
import type { LoginFormData } from '../validation/auth.schemas';

export class AuthService {
  private activityRepo = new ActivityRepository();

  async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }): Promise<{ idToken: string; role?: string; roles?: string[]; activeRole?: string; lastSelectedRole?: string }> {
    try {
      // 1. Create Firebase User
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // 2. Get ID Token
      const idToken = await userCredential.user.getIdToken();
      
      // 3. Mint Cookie Session
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, rememberMe: true }),
      });

      if (!res.ok) {
        throw new Error('Failed to create server session');
      }

      // 4. Note: Server action for registerVolunteer will be called directly by the component.
      
      await this.activityRepo.log({
        action: 'LOGIN_SUCCESS',
        module: 'Auth',
        description: `New user registered: ${data.email}`,
      });

      const sessionData = await res.json();
      const roles = sessionData.data?.roles || ['volunteer'];
      const activeRole = sessionData.data?.activeRole || 'volunteer';
      const lastSelectedRole = sessionData.data?.lastSelectedRole || 'volunteer';

      return { idToken, role: undefined, roles, activeRole, lastSelectedRole };
    } catch (error) {
      console.error('Registration inner error:', error);
      await this.activityRepo.log({
        action: 'LOGIN_FAILED',
        module: 'Auth',
        description: `Failed registration attempt for: ${data.email}`,
      });
      const errorMessage = error instanceof Error && error.message.includes('auth/email-already-in-use') 
        ? 'This email is already registered. Please log in instead.' 
        : error instanceof Error ? error.message : 'Registration failed';
        
      throw new AuthenticationError(errorMessage, error);
    }
  }

  async login(data: LoginFormData): Promise<{ idToken: string; role?: string; roles?: string[]; activeRole?: string; lastSelectedRole?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      // if (!userCredential.user.emailVerified) {
      //   // ADR requires email verification
      //   await signOut(auth);
      //   throw new AuthenticationError('Please verify your email before logging in.');
      // }

      const idToken = await userCredential.user.getIdToken();
      
      // Fetch the role from the custom claims before falling back
      const idTokenResult = await userCredential.user.getIdTokenResult();
      const role = idTokenResult.claims.role as string | undefined;
      
      // Send token to our server to mint a cookie
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, rememberMe: data.rememberMe }),
      });

      if (!res.ok) {
        throw new Error('Failed to create server session');
      }

      const sessionData = await res.json();
      const finalRole = role || sessionData.data?.role;
      const roles = sessionData.data?.roles || [finalRole];
      const activeRole = sessionData.data?.activeRole || finalRole;
      const lastSelectedRole = sessionData.data?.lastSelectedRole || finalRole;

      await this.activityRepo.log({
        action: 'LOGIN_SUCCESS',
        module: 'Auth',
        description: `User logged in: ${data.email}`,
      });

      return { idToken, role: finalRole, roles, activeRole, lastSelectedRole };
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/too-many-requests') {
        await this.activityRepo.log({
          action: 'ACCOUNT_LOCKED',
          module: 'Auth',
          description: `Account locked due to too many failed attempts: ${data.email}`,
        });
        throw new AuthenticationError('Account temporarily locked due to too many failed attempts. Try again later or reset password.', error);
      }

      await this.activityRepo.log({
        action: 'LOGIN_FAILED',
        module: 'Auth',
        description: `Failed login attempt for: ${data.email}`,
      });
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError('Invalid email or password', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
      await fetch('/api/auth/session', { method: 'DELETE' });
      await this.activityRepo.log({
        action: 'LOGOUT',
        module: 'Auth',
        description: 'User logged out',
      });
    } catch (error) {
      throw new AuthenticationError('Failed to logout', error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      await this.activityRepo.log({
        action: 'PASSWORD_RESET',
        module: 'Auth',
        description: `Password reset requested for: ${email}`,
      });
    } catch (error) {
      throw new AuthenticationError('Failed to send password reset email', error);
    }
  }

  async verifyEmail(): Promise<void> {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  }

  // Token refresh logic to automatically sync with server
  async refreshToken(): Promise<void> {
    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken(true);
      await fetch('/api/auth/session', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, rememberMe: true }),
      });
    }
  }

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}

export const authService = new AuthService();
