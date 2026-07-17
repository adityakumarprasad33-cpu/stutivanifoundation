import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { requireRole } from '@/lib/auth/server-guards';

export async function POST(request: Request) {
  try {
    // Only ADMINs can set claims
    await requireRole('admin');

    const body = await request.json();
    const { uid, claims } = body;

    if (!uid || !claims) {
      return NextResponse.json({ error: 'Missing uid or claims' }, { status: 400 });
    }

    // Set custom claims using Firebase Admin
    await adminAuth.setCustomUserClaims(uid, claims);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error setting custom claims:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
