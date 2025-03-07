import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './index';
import { LazyMotion, domAnimation } from 'motion/react';
import type { Track } from './../../features/SpotifyTopTracks/types';
import SpotifyRenderTracks from '@/components/features/SpotifyTopTracks/render';

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
];

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LazyMotion features={domAnimation} strict>
        <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
          <Story />
        </div>
      </LazyMotion>
    ),
  ],
  args: {
    slideSpacing: 16,
    slidesPerView: 3,
    slidesToScroll: 'auto',
    loop: false,
    pagination: false,
    paginationType: 'bullets',
    direction: 'horizontal',
    autoHeight: false,
    autoPlay: false,
    keyboardControls: false,
    buttonNavigation: false,
  },
  argTypes: {
    slideSpacing: {
      control: { type: 'number' },
    },
    slidesPerView: {
      control: { type: 'number' },
    },
    slidesToScroll: {
      control: { type: 'text' },
    },
    loop: {
      control: { type: 'boolean' },
    },
    pagination: {
      control: { type: 'boolean' },
    },
    paginationType: {
      control: { type: 'select', options: ['bullets', 'progress'] },
    },
    paginationColor: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'accent',
          'urban-steel',
          'slate',
          'bitter-sweet',
          'chery-punch',
          'fresh-leaf',
        ],
      },
    },
    direction: {
      control: { type: 'select', options: ['horizontal', 'vertical', 'vertical-scroll'] },
    },
    autoHeight: {
      control: { type: 'boolean' },
    },
    autoPlay: {
      control: { type: 'boolean' },
    },
    keyboardControls: {
      control: { type: 'boolean' },
    },
    buttonNavigation: {
      control: { type: 'boolean' },
    },
  },
  render: (args) => (
    <Carousel {...args}>
      <div style={{ background: 'lightgray', padding: '2rem', height: '25rem' }}>
        <h1>Slide 1</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'gray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 2</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'darkgray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 3</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'blue', padding: '2rem', height: '21rem' }}>
        <h1>Slide 4</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'darkgray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 5</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'lightgray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 6</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
    </Carousel>
  ),
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {};

export const AutoHeight: Story = {
  args: {
    slideSpacing: 16,
    slidesPerView: 1,
    slidesToScroll: '1',
    loop: false,
    pagination: false,
    paginationType: 'bullets',
    direction: 'horizontal',
    autoHeight: true,
    autoPlay: false,
    keyboardControls: false,
    buttonNavigation: false,
  },
};

export const ButtonNavigation: Story = {
  args: {
    slideSpacing: 16,
    slidesPerView: 1,
    slidesToScroll: '1',
    loop: false,
    pagination: true,
    paginationType: 'bullets',
    direction: 'horizontal',
    autoHeight: true,
    autoPlay: false,
    keyboardControls: false,
    buttonNavigation: true,
  },
};

export const Pagination: Story = {
  args: {
    pagination: true,
  },
};

export const PaginationProgress: Story = {
  args: {
    pagination: true,
    paginationType: 'progress',
    slidesPerView: 1,
    autoHeight: true,
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    slidesPerView: 1,
    autoHeight: false,
    pagination: true,
  },
};

export const VerticalSpotifyTopTracks: Story = {
  args: {
    direction: 'vertical-scroll',
    focus: true,
    slidesPerView: 3,
    loop: false,
    slidesToScroll: 1,
    pagination: true,
    paginationType: 'progress',
  },
  render: (args) => (
    <Carousel {...args}>
      {mockTracks.map((track: Track) => (
        <SpotifyRenderTracks {...args} track={track} key={track.key} container={'card'} />
      ))}
    </Carousel>
  ),
};
