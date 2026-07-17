import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { AuthenticationError } from '@/lib/errors';
import { env } from '@/lib/env';

const SESSION_COOKIE_NAME = 'stutivani_session';
const SESSION_EXPIRATION_MS = 60 * 60 * 24 * 5 * 1000; // 5 days
const SESSION_ONLY_EXPIRATION_MS = 60 * 60 * 24 * 1000; // 1 day

/**
 * Mints a secure Firebase session cookie from a short-lived ID Token.
 */
export async function createSession(idToken: string, rememberMe = true): Promise<void> {
  try {
    const expiresIn = rememberMe ? SESSION_EXPIRATION_MS : SESSION_ONLY_EXPIRATION_MS;
    
    // Validate ID Token before creating session
    const decodedIdToken = await adminAuth.verifyIdToken(idToken);
    
    // Only process if user recently signed in (mitigates stolen token risk)
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time > 5 * 60) {
      throw new AuthenticationError('Recent sign in required');
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
  } catch (error) {
    throw new AuthenticationError('Failed to create session', error);
  }
}

/**
 * Verifies the current session cookie and returns the decoded claim.
 */
export async function verifySession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    // Invalid or expired session
    console.warn('verifySessionCookie failed:', error);
    return null;
  }
}

/**
 * Revokes all sessions for the user and clears the cookie.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(decodedClaims.sub);
    } catch {
      // Ignore verification errors during logout
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
