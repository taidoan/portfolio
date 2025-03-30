import { GlobalConfig } from 'payload';
import { authenticated, anyone } from '@/access';
import { revalidateGlobal } from '@/globals/hooks/revalidateGlobal';

export const Social: GlobalConfig = {
  slug: 'social',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'social-network',
      label: 'Social Network',
      type: 'array',
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          required: true,
        },
        {
          name: 'network',
          label: 'Network',
          type: 'select',
          required: true,
          options: [
            {
              label: 'x',
              value: 'x',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Github',
              value: 'github',
            },
            {
              label: 'Linkedin',
              value: 'linkedin',
            },
            {
              label: 'Youtube',
              value: 'youtube',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (!data) return data;

        const networks = data['social-network'] || [];
        const networkValues = networks.map((item: { network: string }) => item.network);

        const uniqueNetworks = new Set(networkValues);
        if (uniqueNetworks.size !== networkValues.length) {
          throw new Error('Networks must be unique');
        }

        return data;
      },
    ],
    afterChange: [revalidateGlobal('social')],
  },
};
