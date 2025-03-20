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
import { ClonedField } from '@/fields/ClonedField';

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
          label: 'Hero',
          name: 'hero',
          fields: [
            ...ClonedField('title', {
              clonedOverrides: {
                name: 'titleOverride',
                label: 'Title Override',
                admin: {
                  description:
                    'Use this if you want to override the project title that appears in the hero.',
                  width: '50%',
                },
              },
            }),
            ...ClonedField('details.type', {
              clonedOverrides: {
                name: 'typeOverride',
                label: 'Type Override',
                admin: {
                  description:
                    'Use this if you want to override the project type that appears above the title.',
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
            // {
            //   type: 'row',
            //   fields: [
            //     ...ClonedField('details.type'),
            //     {
            //       type: 'checkbox',
            //       name: 'typeOverride',
            //       label: 'Type Override',
            //       defaultValue: false,
            //       admin: {
            //         description:
            //           'Select this option if you want to the override the project type displayed on the hero.',
            //         style: {
            //           justifyContent: 'center',
            //         },
            //         width: '40%',
            //       },
            //       hooks: {
            //         beforeChange: [
            //           ({ value, siblingData }) => {
            //             if (value === false) {
            //               if (siblingData.typeOverrideText) {
            //                 delete siblingData.typeOverrideText;
            //               }
            //             }
            //           },
            //         ],
            //       },
            //     },
            //     {
            //       type: 'text',
            //       name: 'typeOverrideText',
            //       label: 'Type Override Text',
            //       required: true,

            //       admin: {
            //         description: 'Enter the text you want to display on the hero above the title.',
            //         condition: (_, siblingData) => siblingData.typeOverride === true,
            //         width: '60%',
            //       },
            //     },
            //   ],
            // },
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
