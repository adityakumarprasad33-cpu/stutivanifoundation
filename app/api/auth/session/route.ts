import { NextRequest, NextResponse } from 'next/server';
import { createSession, destroySession } from '@/lib/auth/session.server';
import { errorResponse, successResponse } from '@/lib/api';
import { adminAuth } from '@/lib/firebase/admin';
import { UserRepository } from '@/features/auth/services/user.repository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, rememberMe = true } = body;

    if (!idToken) {
      return NextResponse.json(errorResponse(new Error('ID Token is required')), { status: 400 });
    }

    await createSession(idToken, rememberMe);

    // Fetch the real roles from Firestore to return to the client,
    // since custom claims might not be synced instantly after registration.
    let roles = ['public'];
    let lastSelectedRole = 'public';
    let status = 'PENDING';

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const userRepo = new UserRepository();
      const userDoc = await userRepo.getByUid(decodedToken.uid);
      if (userDoc) {
        roles = userDoc.roles || ['public'];
        lastSelectedRole = userDoc.lastSelectedRole || 'public';
        status = userDoc.status || 'PENDING';
      }
    } catch (e) {
      console.warn('Could not fetch user role during session creation', e);
    }

    return NextResponse.json(successResponse({ success: true, roles, lastSelectedRole, status }));
  } catch (error) {
    return NextResponse.json(errorResponse(error), { status: 401 });
  }
}

export async function DELETE() {
  try {
    await destroySession();
    return NextResponse.json(successResponse({ success: true }));
  } catch (error) {
    return NextResponse.json(errorResponse(error), { status: 500 });
  }
}

// Token Refresh API endpoint (PUT)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, rememberMe = true } = body;
    
    if (!idToken) {
      return NextResponse.json(errorResponse(new Error('ID Token is required')), { status: 400 });
    }

    // Refreshing the session cookie works identically to creating a new one
    await createSession(idToken, rememberMe);
    return NextResponse.json(successResponse({ refreshed: true }));
  } catch (error) {
    return NextResponse.json(errorResponse(error), { status: 401 });
  }
}
