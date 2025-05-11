import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '@/payload/access';

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            return value.trim().toLowerCase();
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Projects',
          fields: [
            {
              name: 'relatedProjects',
              type: 'join',
              collection: 'projects',
              on: 'tags',
              label: false,
              maxDepth: 0,
              admin: {
                allowCreate: false,
                defaultColumns: ['title', 'id', 'categories', 'updatedAt', 'slug', 'url'],
                description: 'Projects that are tagged with this tag.',
              },
            },
          ],
        },
        {
          label: 'Posts',
          fields: [
            {
              name: 'relatedPosts',
              type: 'join',
              collection: 'posts',
              on: 'tags',
              label: false,
              maxDepth: 0,
              admin: {
                allowCreate: false,
                defaultColumns: ['title', 'id', 'categories', 'publishedAt', 'slug', 'url'],
                description: 'Posts that are tagged with this tag.',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: false,
  disableDuplicate: true,
};
