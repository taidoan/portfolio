import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const numberOfTracks = parseInt(url.searchParams.get('numberOfTracks') || '6', 10);

    const topTracks = await getTopTracks(numberOfTracks);

    return NextResponse.json(topTracks, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
      },
    });
  } catch (_error) {
    return NextResponse.error();
  }
}
