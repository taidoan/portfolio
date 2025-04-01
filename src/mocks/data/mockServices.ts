import { CardData } from '@/components/ui/Card/types';

export const mockServices = [
  {
    relationTo: 'services',
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Branding is the face of a brand or organisation as well as the ethos behind them. It includes things like the visual identity of a brand, their social media strategy, brand guidelines and even the way they communicate with their audience. Branding is usually at the top of the pyramid and often the most important part to get right when combining it with other fields such as marketing and UI/UX design.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    slug: 'branding',
    createdAt: '2025-03-10T11:54:55.104Z',
    updatedAt: '2025-03-27T10:17:26.002Z',
    title: 'Branding',
    image: {
      alt: 'Branding Icon',
      prefix: 'media',
      filename: 'branding.svg',
      mimeType: 'image/svg+xml',
      filesize: 3860,
      width: 214,
      height: 200,
      createdAt: '2025-03-12T10:19:56.275Z',
      updatedAt: '2025-03-12T10:19:56.275Z',
      id: '67d15fcc40d3105ab50713e7',
      url: 'http://localhost:3000/api/media/file/branding.svg',
      thumbnailURL: null,
    },
    url: 'http://localhost:3000/services/branding',
    id: '67ced30f00d7591f31a00bae',
  },
] satisfies CardData[];
