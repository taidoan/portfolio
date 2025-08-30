import type { CollectionConfig } from 'payload';
import { authenticated, authenticatedOrPublished } from '@/payload/access';
import { generatePreviewPath } from '@/lib/utilities/generatePreviewPath';
import { populateAuthor } from './hooks/populateAuthors';
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost';
import { beforeChangeUrl } from './hooks/beforeChangeUrl';

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { SlugField } from '@fields/Slug';
import { BreadCrumbs } from '@fields/Breadcrumbs';
import { ClonedField } from '@fields/ClonedField';
import { CTAFields } from '@fields/CTAFields';
import { urlField } from '@fields/URL';

import { MediaBlock } from '@/payload/blocks/Media/config';
import { CarouselBlock } from '@/payload/blocks/Carousel/config';
import { ContentBlock } from '@/payload/blocks/Content/config';
import { TaggedWithBlock } from '@/payload/blocks/TaggedWith/config';
import { RelatedProjectsBlock } from '@/payload/blocks/RelatedProjects/config';
import { DividerBlock } from '@/payload/blocks/Divider/config';
import { SectionBlock } from '@/payload/blocks/Section/config';

export const Posts: CollectionConfig = {
  slug: 'posts',
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
          collection: 'posts',
          req,
        });

        return path;
      },
    },
  },
  hooks: {
    afterRead: [populateAuthor],
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
    beforeChange: [beforeChangeUrl],
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      schedulePublish: true,
      autosave: {
        interval: 800,
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            {
              type: 'text',
              name: 'subtitle',
              label: 'Subtitle',
              admin: {
                description:
                  'The subtitle of the post. This will appear above the title. Defaults to the first post category.',
              },
            },
            ...ClonedField('title', {
              clonedOverrides: {
                name: 'titleOverride',
                label: 'Title Override',
                admin: {
                  description:
                    'Use this if you want to override the post title that appears in the hero.',
                },
              },
            }),
            {
              type: 'group',
              name: 'breadcrumbs',
              label: 'Breadcrumbs',
              admin: {
                description: 'The breadcrumbs for the post. This will appear in the hero.',
              },
              fields: [
                BreadCrumbs({
                  relationTo: ['posts', 'pages', 'categories'],
                }),
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              maxLength: 300,
              label: 'Excerpt',
              admin: {
                description: 'A short description of the post, used for previews and listings.',
                position: 'sidebar',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                MediaBlock,
                CarouselBlock,
                ContentBlock,
                TaggedWithBlock,
                RelatedProjectsBlock,
                DividerBlock,
                SectionBlock,
              ],
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'checkbox',
                  name: 'showShareButton',
                  label: 'Allow Sharing',
                  admin: {
                    style: {
                      justifyContent: 'center',
                    },
                  },
                },
                {
                  type: 'text',
                  name: 'shareButtonLabel',
                  label: 'Share Button Label',
                  defaultValue: 'Share',
                  admin: {
                    condition: (_, siblingData) => siblingData.showShareButton,
                  },
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
        {
          label: 'CTA',
          fields: [CTAFields()],
        },
      ],
    },
    {
      name: 'pageLayout',
      type: 'select',
      label: 'Page Layout',
      defaultValue: 'full-width',
      options: [
        { value: 'full-width', label: 'Full Width' },
        { value: 'sidebar', label: 'Sidebar' },
      ],
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    ...SlugField(),
    urlField('slug', 'posts'),
    {
      name: 'author',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
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
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categories',
      hasMany: true,
      required: true,
      maxDepth: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      label: 'Tags',
      hasMany: true,
      maxDepth: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relationTo',
      type: 'text',
      defaultValue: 'posts',
      admin: {
        hidden: true,
      },
    },
  ],
};
