import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session.server';
import { errorResponse, successResponse } from '@/lib/api';
import { UserRepository } from '@/features/auth/services';

export async function GET() {
  try {
    const claims = await verifySession();
    if (!claims) {
      return NextResponse.json(errorResponse(new Error('Unauthorized')), { status: 401 });
    }

    const userRepo = new UserRepository();
    const userDoc = await userRepo.getByUid(claims.uid);

    if (!userDoc) {
      return NextResponse.json(errorResponse(new Error('User not found')), { status: 404 });
    }

    return NextResponse.json(successResponse({ 
      uid: claims.uid, 
      email: claims.email,
      roles: userDoc.roles,
      lastSelectedRole: userDoc.lastSelectedRole,
      status: userDoc.status
    }));
  } catch (error) {
    return NextResponse.json(errorResponse(error), { status: 500 });
  }
}
