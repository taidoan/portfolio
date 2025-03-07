import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const numberOfTracks = parseInt(url.searchParams.get('numberOfTracks') || '6', 10);

    const topTracks = await getTopTracks(numberOfTracks);

    return NextResponse.json(topTracks);
  } catch (_error) {
    return NextResponse.error();
  }
}
