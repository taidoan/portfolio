import type { CollectionConfig } from 'payload';
import { authenticated, anyone } from '@/access';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { SlugField } from '@/fields/Slug';
import { urlField } from '@/fields/URL';
import { BreadCrumbs } from '@fields/Breadcrumbs';

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Services',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Service Category Title',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Service Image',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Service Category Description',
            },
            {
              type: 'array',
              name: 'items',
              label: 'Service Items',
              required: true,
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  label: 'Title',
                  required: true,
                },
                {
                  type: 'richText',
                  name: 'description',
                  label: 'Description',
                  required: true,
                },
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                  label: 'Image',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
              hasGenerateFn: true,
            }),

            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
          admin: {
            disableListColumn: true,
          },
        },
      ],
    },
    ...SlugField('title'),
    urlField(),
    BreadCrumbs({
      admin: {
        position: 'sidebar',
      },
    }),
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categories',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
