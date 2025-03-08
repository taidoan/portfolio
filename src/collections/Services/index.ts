import type { CollectionConfig } from 'payload';
import { authenticated, authenticatedOrPublished } from '@/access';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { SlugField } from '@fields/Slug';
import { BreadCrumbs } from '@fields/Breadcrumbs';

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'serviceCategoryTitle',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
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

            MetaDescriptionField({}),
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
        {
          label: 'Services',
          fields: [
            {
              name: 'serviceCategoryTitle',
              type: 'text',
              required: true,
              label: 'Service Category Title',
            },
            {
              name: 'serviceCategoryDescription',
              type: 'richText',
              required: true,
              label: 'Service Category Description',
            },
            {
              name: 'serviceImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Service Image',
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
      ],
    },
    ...SlugField('serviceCategoryTitle'),
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
  ],
};
