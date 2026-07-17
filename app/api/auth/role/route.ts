import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session.server';
import { errorResponse, successResponse } from '@/lib/api';
import { UserRepository } from '@/features/auth/services';

export async function POST(request: NextRequest) {
  try {
    const claims = await verifySession();
    if (!claims) {
      return NextResponse.json(errorResponse(new Error('Unauthorized')), { status: 401 });
    }

    const body = await request.json();
    const { role } = body;

    if (!role) {
      return NextResponse.json(errorResponse(new Error('Role is required')), { status: 400 });
    }

    const userRepo = new UserRepository();
    const userDoc = await userRepo.getByUid(claims.uid);

    if (!userDoc) {
      return NextResponse.json(errorResponse(new Error('User not found')), { status: 404 });
    }

    // Verify the user actually owns this role
    const roles = userDoc.roles || [];
    if (!roles.includes(role)) {
      return NextResponse.json(errorResponse(new Error('Forbidden: User does not possess this role')), { status: 403 });
    }

    // Update lastSelectedRole in Firestore
    await userRepo.update(userDoc.id!, {
      lastSelectedRole: role,
    });

    return NextResponse.json(successResponse({ success: true, activeRole: role }));
  } catch (error) {
    return NextResponse.json(errorResponse(error), { status: 500 });
  }
}
