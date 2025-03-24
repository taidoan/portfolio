import type { CollectionConfig } from 'payload';
import { authenticatedOrPublished, authenticated } from '@/access';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { SlugField } from '@/fields/Slug';
import { urlField } from '@/fields/URL';
import { Hero } from '@/blocks/Hero/config';
import { generatePreviewPath } from '@/lib/utilities/generatePreviewPath';
import { revalidatePage, revalidateDelete } from './hooks/revalidatePage';
import { DividerBlock } from '@/blocks/Divider/config';
import { SectionBlock } from '@/blocks/Section/config';
import { SectionGroupBlock } from '@/blocks/Section/Group/config';
import { ArchiveBlock } from '@/blocks/Archive/config';
import { TabbedContentBlock } from '@/blocks/TabbedContent/config';
import { CTABlock } from '@/blocks/CTA/config';

export const Pages: CollectionConfig = {
  slug: 'pages',
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
          collection: 'pages',
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
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
          fields: [Hero],
        },
        {
          label: 'Layout',
          fields: [
            {
              type: 'blocks',
              name: 'layout',
              label: 'Layout',
              blocks: [
                DividerBlock,
                SectionBlock,
                SectionGroupBlock,
                ArchiveBlock,
                TabbedContentBlock,
                CTABlock,
              ],
              required: true,
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
      ],
    },
    ...SlugField(),
    urlField(),
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
