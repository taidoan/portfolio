import type { PayloadRequest } from 'payload';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

/**
 * Validates the authentication token and returns the payload instance and the user object.
 * @param req The request object.
 * @returns An object containing the payload instance and the user object.
 */
export const validateAuth = async (req: Request) => {
  const payload = await getPayload({ config: configPromise });
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  if (!token) {
    return { error: NextResponse.json({ error: 'Authentication required' }, { status: 401 }) };
  }

  try {
    const authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });

    if (!authResult.user || authResult.user.role !== 'admin') {
      return { error: NextResponse.json({ error: 'Admin access required' }, { status: 403 }) };
    }

    return { payload, user: authResult.user };
  } catch (_error) {
    return { error: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) };
  }
};
