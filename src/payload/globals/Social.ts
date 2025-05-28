import { GlobalConfig, Field } from 'payload';
import { authenticated, anyone } from '@/payload/access';
import { revalidateGlobal } from '@/payload/globals/hooks/revalidateGlobal';

export const Social: GlobalConfig = {
  slug: 'social',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Accounts',
          admin: {
            description:
              'Add your social media accounts here. These will be displayed on your site.',
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
        },
        {
          label: 'Sharing',
          admin: {
            description:
              'Add the networks you want to share your posts and projects with. These will be displayed on posts and project pages.',
          },
          fields: [
            {
              type: 'select',
              name: 'shareNetworks',
              label: 'Share Networks',
              options: [
                { value: 'facebook', label: 'Facebook' },
                { value: 'twitter', label: 'X (formerly Twitter)' },
                { value: 'telegram', label: 'Telegram' },
                { value: 'whatsapp', label: 'Whatsapp' },
                { value: 'linkedin', label: 'LinkedIn' },
                { value: 'pinterest', label: 'Pinterest' },
                { value: 'vk', label: 'VK' },
                { value: 'reddit', label: 'Reddit' },
                { value: 'tumblr', label: 'Tumblr' },
                { value: 'line', label: 'Line' },
                { value: 'weibo', label: 'Weibo' },
                { value: 'pocket', label: 'Pocket' },
                { value: 'bluesky', label: 'Bluesky' },
                { value: 'email', label: 'Email' },
                { value: 'threads', label: 'Threads' },
              ],
              hasMany: true,
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

export const SocialFields: Field[] = [
  {
    type: 'group',
    name: 'socialSharing',
    label: 'Share',
    admin: {
      description:
        'Add the networks you want to share your posts and projects with. These will be displayed on posts and project pages.',
    },
    fields: [
      {
        type: 'select',
        name: 'shareNetworks',
        label: 'Share Networks',
        options: [
          { value: 'facebook', label: 'Facebook' },
          { value: 'twitter', label: 'X (formerly Twitter)' },
          { value: 'telegram', label: 'Telegram' },
          { value: 'whatsapp', label: 'Whatsapp' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'pinterest', label: 'Pinterest' },
          { value: 'vk', label: 'VK' },
          { value: 'reddit', label: 'Reddit' },
          { value: 'tumblr', label: 'Tumblr' },
          { value: 'line', label: 'Line' },
          { value: 'weibo', label: 'Weibo' },
          { value: 'pocket', label: 'Pocket' },
          { value: 'bluesky', label: 'Bluesky' },
          { value: 'email', label: 'Email' },
          { value: 'threads', label: 'Threads' },
        ],
        hasMany: true,
      },
    ],
  },
  {
    type: 'group',
    name: 'socialAccounts',
    label: 'Accounts',
    admin: {
      description: 'Add your social media accounts here. These will be throughout your site.',
    },
    fields: [
      {
        name: 'socialNetwork',
        label: false,
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
      beforeValidate: [
        async ({ value, req }) => {
          if (!value?.socialNetwork) return value;

          const seen = new Set();

          for (const item of value.socialNetwork) {
            if (seen.has(item.network)) {
              req.payload.logger.error(`Duplicate social network: ${item.network}`);
              throw new Error(`Duplicate social network: ${item.network}`);
            }
            seen.add(item.network);
          }

          return value;
        },
      ],
    },
  },
];
