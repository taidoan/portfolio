import { getTopTracks } from './utils/api';
import type { Track } from './types';
import SpotifyRenderTracks from './render';

export interface SpotifyTopTracksProps {
  container?: 'card' | 'none';
  numberOfTracks: number;
}

export const SpotifyTopTracks = async (container = 'none', numberOfTracks = 6) => {
  const tracks = await getTopTracks(numberOfTracks);

  return (
    <>
      {tracks.map((track: Track) => (
        <SpotifyRenderTracks track={track} key={track.key} container={container} />
      ))}
    </>
  );
};
