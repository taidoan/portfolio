import type { Track } from './types';
import SpotifyRenderTracks from './render';

export interface SpotifyTopTracksProps {
  container?: 'card' | 'none';
  numberOfTracks: number;
}

export const SpotifyTopTracks = async ({
  container = 'none',
  numberOfTracks = 6,
}: SpotifyTopTracksProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/spotify?numberOfTracks=${numberOfTracks}`,
    );

    if (!response.ok) {
      console.error('Spotify API response not OK:', response.status);
      return <p>Unable to load tracks right now.</p>;
    }

    const data = await response.json();

    const tracks = data;
    return (
      <>
        {tracks.map((track: Track) => (
          <SpotifyRenderTracks track={track} key={track.key} container={container} />
        ))}
      </>
    );
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error);
    return <p>Unable to load tracks right now.</p>;
  }
};
