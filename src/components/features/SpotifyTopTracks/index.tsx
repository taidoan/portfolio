'use client';
import { useEffect, useState } from 'react';
import type { Track } from './types';
import SpotifyRenderTracks from './render';

export interface SpotifyTopTracksProps {
  container?: 'card' | 'none';
  numberOfTracks?: number;
}

export const SpotifyTopTracks = ({
  container = 'none',
  numberOfTracks = 6,
}: SpotifyTopTracksProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
      console.warn('Spotify server URL not set');
      setError(true);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/spotify?numberOfTracks=${numberOfTracks}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: Track[]) => setTracks(data))
      .catch((err) => {
        console.warn('Spotify fetch failed:', err);
        setError(true);
      });
  }, [numberOfTracks]);

  if (error) return <p>Unable to load tracks right now.</p>;

  return (
    <>
      {tracks.map((track) => (
        <SpotifyRenderTracks track={track} key={track.key} container={container} />
      ))}
    </>
  );
};
