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

  let token: string | undefined;

  try {
    const cookieStore = await cookies();
    token = cookieStore.get('payload-token')?.value;
  } catch (__error) {
    const cookieHeader = req.headers.get('cookie');
    token = cookieHeader
      ?.split(';')
      .find((c) => c.trim().startsWith('payload-token='))
      ?.split('=')[1];
  }

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
