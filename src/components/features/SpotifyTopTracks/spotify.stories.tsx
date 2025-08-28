import { Meta, StoryObj } from '@storybook/nextjs-vite';
import SpotifyRenderTracks from './render';
import type { Track } from './types';

const mockTracks: Track[] = [
  {
    key: 1,
    title: 'Over Each Other',
    songUrl: 'https://open.spotify.com/track/3t4IkHfT4eXZggkupi4SUe',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2731c998f52c7d8d87452bc10ae',
      width: 640,
    },
    artists: [
      { name: 'Linkin Park', url: 'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz' },
    ],
  },
  {
    key: 2,
    title: 'The Emptiness Machine',
    songUrl: 'https://open.spotify.com/track/2PnlsTsOTLE5jnBnNe2K0A',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b273c0db065619ed208515412917',
      width: 640,
    },
    artists: [
      { name: 'Linkin Park', url: 'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz' },
    ],
  },
  {
    key: 3,
    title: "Austin (Boots Stop Workin')",
    songUrl: 'https://open.spotify.com/track/2uqYupMHANxnwgeiXTZXzd',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2734ccf88b66e04cfd247f287eb',
      width: 640,
    },
    artists: [{ name: 'Dasha', url: 'https://open.spotify.com/artist/7Ez6lTtSMjMf2YSYpukP1I' }],
  },
  {
    key: 4,
    title: 'APT.',
    songUrl: 'https://open.spotify.com/track/5vNRhkKd0yEAg8suGBpjeY',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b27336032cb4acd9df050bc2e197',
      width: 640,
    },
    artists: [
      { name: 'ROSÉ', url: 'https://open.spotify.com/artist/3eVa5w3URK5duf6eyVDbu9' },
      { name: 'Bruno Mars', url: 'https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C' },
    ],
  },
  {
    key: 5,
    title: '5,6,7,8 (feat. girlfriends)',
    songUrl: 'https://open.spotify.com/track/6YAngZqMTJyorUHoeOpaqy',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2739a74f2fab428ad8e160f236c',
      width: 640,
    },
    artists: [
      { name: 'LØLØ', url: 'https://open.spotify.com/artist/5MjcGshMggPgIHinIUDaX0' },
      { name: 'girlfriends', url: 'https://open.spotify.com/artist/4Dwhb9SL7iO3L27oXvEiO7' },
    ],
  },
  {
    key: 6,
    title: 'Stained',
    songUrl: 'https://open.spotify.com/track/0J1IJsMbKWb5g2sJArTkGF',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b273b11a5489e8cb11dd22b930a0',
      width: 640,
    },
    artists: [
      { name: 'Linkin Park', url: 'https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz' },
    ],
  },
  {
    key: 7,
    title: 'hot girls in hell',
    songUrl: 'https://open.spotify.com/track/2kpWCixGUDKoArW18zA4a9',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2737dce95b18287dcbe6748dec3',
      width: 640,
    },
    artists: [{ name: 'LØLØ', url: 'https://open.spotify.com/artist/5MjcGshMggPgIHinIUDaX0' }],
  },
  {
    key: 8,
    title: "she's all i wanna be",
    songUrl: 'https://open.spotify.com/track/7l9IqDtVWJurTvkQHq1BGh',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b273f7108342ef45a402af8206b2',
      width: 640,
    },
    artists: [
      { name: 'Tate McRae', url: 'https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym' },
    ],
  },
  {
    key: 9,
    title: 'Meanwhile Up In Heaven',
    songUrl: 'https://open.spotify.com/track/7f4l4H1B8N6T99KFwctJzf',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b273719c29cefd5f2e1bc882e2f3',
      width: 640,
    },
    artists: [
      { name: 'Kaiser Chiefs', url: 'https://open.spotify.com/artist/0LbLWjaweRbO4FDKYlbfNt' },
    ],
  },
  {
    key: 10,
    title: "Star Walkin'",
    songUrl: 'https://open.spotify.com/track/3dd1gU4B9jI2xmE0ZbxsHD',
    albumCover: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b27332cf6fef9c753b34f74470b4',
      width: 640,
    },
    artists: [{ name: 'Lunity', url: 'https://open.spotify.com/artist/2OgKPh1xCLvA9C8CXfFABo' }],
  },
];

const meta: Meta<typeof SpotifyRenderTracks> = {
  component: SpotifyRenderTracks,
  title: 'Features/Spotify Top Tracks',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SpotifyRenderTracks component renders a track with artist, album cover, and title.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    container: {
      options: ['none', 'card'],
      control: { type: 'select' },
    },
  },
  render: (args) => (
    <>
      {mockTracks.map((track: Track) => (
        <SpotifyRenderTracks {...args} track={track} key={track.key} />
      ))}
    </>
  ),
};

export default meta;

type Story = StoryObj<typeof SpotifyRenderTracks>;

export const Default: Story = {};

export const Card: Story = {
  args: {
    container: 'card',
  },
};
