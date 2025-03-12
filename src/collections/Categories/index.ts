import type { CollectionConfig } from 'payload';
import { authenticated, anyone } from '@/access';
import { SlugField } from '@fields/Slug';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'parentCategory'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Category Name',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    ...SlugField('title'),
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
