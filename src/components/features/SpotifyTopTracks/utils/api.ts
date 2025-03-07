import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

const fetchTopTracks = async (numberOfTracks: number) => {
  const { access_token } = await getAccessToken();

  const topTracks = await fetch(`${TOP_TRACKS_ENDPOINT}&limit=${numberOfTracks}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((data) => data.json())
    .catch((e) => console.log(e));
  return topTracks;
};

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

export async function getTopTracks(numberOfTracks: number = 6) {
  try {
    const { items } = await fetchTopTracks(numberOfTracks);

    if (!items) return [];

    const tracks = items.map((track: SpotifyTrack, index: number) => ({
      key: index + 1,
      title: track.name,
      songUrl: track.external_urls.spotify,
      albumCover: track.album.images[0],
      artists: track.artists.map((artist: SpotifyArtist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      })),
    }));

    return tracks;
  } catch (e) {
    console.error('Error fetching top tracks:', e);
    return [];
  }
}
