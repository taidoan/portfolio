export type Track = {
  artists: {
    name: string;
    url: string;
  }[];
  songUrl: string;
  title: string;
  key: number;
  albumCover: {
    url: string;
    height: number;
    width: number;
  };
};

export type SpotifyRenderTracksProps = {
  track: Track;
  container?: 'card' | 'none' | string | null;
};
