import { Field } from 'payload';

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
        label: {
          singular: 'Social Network',
          plural: 'Social Networks',
        },
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
              {
                label: 'Behance',
                value: 'behance',
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
