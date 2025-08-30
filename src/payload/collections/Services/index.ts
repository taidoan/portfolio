import type { CollectionConfig } from 'payload';
import { authenticated, authenticatedOrPublished } from '@/payload/access';
import { generatePreviewPath } from '@/lib/utilities/generatePreviewPath';
import { revalidateService, revalidateDelete } from './hooks/revalidateServices';
import { beforeChangeUrl } from './hooks/beforeChangeUrl';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { SlugField } from '@fields/Slug';
import { urlField } from '@fields/URL';
import { BreadCrumbs } from '@fields/Breadcrumbs';
import { ClonedField } from '@fields/ClonedField';
import { SectionBlock } from '@blocks/Section/config';
import { CTABlock } from '@blocks/CTA/config';

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req,
        });

        return path;
      },
    },
  },
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateDelete],
    beforeChange: [beforeChangeUrl],
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            ...ClonedField('collectionTitle', {
              clonedOverrides: {
                name: 'typeOverride',
                label: 'Subtitle Override',
                admin: {
                  description:
                    'Use this if you want to override the project type that appears above the title.',
                  width: '50%',
                },
              },
            }),
            ...ClonedField('title', {
              clonedOverrides: {
                name: 'titleOverride',
                label: 'Title Override',
                admin: {
                  description:
                    'Use this if you want to override the service title that appears in the hero.',
                  width: '50%',
                },
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  type: 'upload',
                  name: 'backgroundImage',
                  relationTo: 'media',
                  label: 'Background Image',
                  admin: {
                    width: '60%',
                  },
                },
                {
                  type: 'select',
                  name: 'blurredBackground',
                  options: [
                    { value: 'true', label: 'Yes ' },
                    { value: 'false', label: 'No' },
                  ],
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
            {
              type: 'group',
              label: 'Breadcrumbs',
              name: 'breadcrumbs',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'showBreadcrumb',
                      type: 'select',
                      label: 'Show Breadcrumb',
                      options: [
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' },
                      ],
                      defaultValue: 'true',
                    },
                    {
                      type: 'select',
                      name: 'breadcrumbContainer',
                      label: 'Breadcrumb Container',
                      options: [
                        { value: 'none', label: 'None' },
                        { value: 'boxed', label: 'Boxed' },
                      ],
                      defaultValue: 'boxed',
                      admin: {
                        condition: (_, siblingData) => siblingData.showBreadcrumb === 'true',
                      },
                    },
                    {
                      type: 'select',
                      name: 'breadcrumbBackground',
                      label: 'Breadcrumb Background',
                      options: [
                        { value: 'none', label: 'None' },
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                        { value: 'translucent', label: 'Translucent' },
                      ],
                      defaultValue: 'translucent',
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData.showBreadcrumb === 'true' &&
                          siblingData.breadcrumbContainer === 'boxed',
                      },
                    },
                  ],
                },
                BreadCrumbs({
                  admin: {
                    condition: (_, siblingData) => siblingData.showBreadcrumb === 'true',
                  },
                }),
              ],
            },
          ],
        },
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
          label: 'Content',
          fields: [
            {
              type: 'richText',
              name: 'introContent',
              label: 'Intro Content',
            },
            {
              type: 'blocks',
              name: 'pageBlocks',
              label: 'Page Blocks',
              blocks: [SectionBlock, CTABlock],
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
    urlField('slug', 'services'),
    {
      name: 'collectionTitle',
      type: 'text',
      defaultValue: 'Services',
      label: 'Collection',
      admin: {
        readOnly: true,
        position: 'sidebar',
        style: {
          display: 'none',
        },
      },
    },
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
