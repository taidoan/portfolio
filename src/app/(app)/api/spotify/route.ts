import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export const dynamic = 'force-dynamic'; // Or remove this line to use default caching

// Set cache revalidation
export const revalidate = 86400; // Cache for 1 hour (in seconds)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const numberOfTracks = parseInt(url.searchParams.get('numberOfTracks') || '6', 10);

    const topTracks = await getTopTracks(numberOfTracks);

    return NextResponse.json(topTracks, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (_error) {
    return NextResponse.error();
  }
}
