import type { CollectionConfig } from 'payload';
import { authenticated, authenticatedOrPublished } from '@/access';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { SlugField } from '@/fields/Slug';
import { urlField } from '@/fields/URL';
import { BreadCrumbs } from '@/fields/Breadcrumbs';

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      schedulePublish: true,
      autosave: {
        interval: 100,
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
          label: 'Details',
          name: 'details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'date',
                  label: 'Project Date',
                  name: 'date',
                  admin: {
                    width: '33.33%',
                  },
                },
                {
                  name: 'type',
                  type: 'text',
                  label: 'Project Type',
                  admin: {
                    width: '33.33%',
                  },
                },
                {
                  name: 'tools',
                  type: 'text',
                  admin: {
                    width: '33.33%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'collapsible',
                  label: 'Client',
                  admin: { initCollapsed: true, width: '50%' },
                  fields: [
                    {
                      type: 'text',
                      name: 'name',
                      label: 'Client Name',
                    },
                    {
                      type: 'text',
                      name: 'url',
                      label: 'Client URL',
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Preview',
                  admin: { initCollapsed: true, width: '50%' },
                  fields: [
                    {
                      type: 'text',
                      name: 'previewLabel',
                      label: 'Preview Label',
                    },
                    {
                      type: 'text',
                      name: 'previewUrl',
                      label: 'Preview URL',
                    },
                  ],
                },
              ],
            },
            {
              type: 'richText',
              name: 'description',
              label: 'Project Description',
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [],
        },
        {
          label: 'Content',
          fields: [
            {
              type: 'richText',
              name: 'content',
              label: 'Project Content',
            },
          ],
        },
        {
          label: 'Breadcrumbs',
          name: 'breadcrumbs',
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
              type: 'row',
              fields: [
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
                    width: '50%',
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
                    width: '50%',
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
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Project Categories',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
