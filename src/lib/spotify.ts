type SpotifyArtist = {
  name: string;
  external_urls: {
    spotify: string;
  };
};

type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

type SpotifyTrack = {
  name: string;
  external_urls: {
    spotify: string;
  };
  artists: SpotifyArtist[];
  album: {
    images: SpotifyImage[];
  };
};

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token as string,
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) throw new Error('Failed to get access token');

  return response.json();
};

const fetchTopTracks = async (numberOfTracks: number) => {
  const { access_token } = await getAccessToken();

  const response = await fetch(`${TOP_TRACKS_ENDPOINT}&limit=${numberOfTracks}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch top tracks');

  return response.json();
};

export async function getTopTracks(numberOfTracks: number = 6) {
  const { items } = await fetchTopTracks(numberOfTracks);

  if (!items) return [];

  return items.map((track: SpotifyTrack, index: number) => ({
    key: index + 1,
    title: track.name,
    songUrl: track.external_urls.spotify,
    albumCover: track.album.images[0],
    artists: track.artists.map((artist: SpotifyArtist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
  }));
}
