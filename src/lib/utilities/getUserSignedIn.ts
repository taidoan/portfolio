import type { User } from '@/payload-types';

import { cookies } from 'next/headers';
import { getClientSideURL } from '@/lib/utilities/getURLs';

export const getUserSignedIn = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  if (!token) return null;

  try {
    const userReq = await fetch(`${getClientSideURL()}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    });

    if (!userReq.ok) return null;

    const data = await userReq.json();
    return data.user as User;
  } catch {
    return null;
  }
};
