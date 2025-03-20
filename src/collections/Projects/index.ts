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
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Media',
                  fields: [
                    {
                      type: 'upload',
                      name: 'gallery',
                      relationTo: 'media',
                      label: 'Gallery',
                      hasMany: true,
                    },
                  ],
                },
                {
                  label: 'Options',
                  name: 'galleryOptions',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'checkbox',
                          name: 'autoHeight',
                          label: 'Auto Height',
                          defaultValue: false,
                          required: true,
                        },
                        {
                          type: 'checkbox',
                          name: 'autoPlay',
                          label: 'Auto Play',
                          defaultValue: false,
                          required: true,
                        },
                        {
                          type: 'checkbox',
                          name: 'keyboardControls',
                          label: 'Keyboard Controls',
                          defaultValue: false,
                          required: true,
                        },
                        {
                          type: 'checkbox',
                          name: 'buttonNavigation',
                          label: 'Button Navigation',
                          defaultValue: false,
                          required: true,
                        },
                        {
                          type: 'checkbox',
                          name: 'pagination',
                          label: 'Pagination',
                          defaultValue: false,
                          required: true,
                        },
                        {
                          type: 'checkbox',
                          name: 'loop',
                          label: 'Loop',
                          defaultValue: false,
                          required: true,
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'direction',
                          label: 'Direction',
                          options: [
                            { value: 'horizontal', label: 'Horizontal' },
                            { value: 'vertical', label: 'Vertical' },
                          ],
                          defaultValue: 'horizontal',
                          required: true,
                        },
                        {
                          type: 'checkbox',
                          name: 'focus',
                          label: 'Focus',
                          defaultValue: false,
                          required: true,
                          admin: {
                            condition: (_, siblingData) => {
                              return siblingData.direction === 'vertical';
                            },
                          },
                        },
                        {
                          type: 'select',
                          name: 'paginationType',
                          label: 'Pagination Type',
                          options: [
                            { value: 'bullets', label: 'Bullets' },
                            { value: 'progress', label: 'Progress' },
                          ],
                          defaultValue: 'bullets',
                          required: true,
                          admin: {
                            condition: (_, siblingData) => {
                              return siblingData.pagination;
                            },
                          },
                        },
                        {
                          type: 'select',
                          name: 'paginationColor',
                          label: 'Pagination Color',
                          options: [
                            { value: 'primary', label: 'Primary' },
                            { value: 'accent', label: 'Accent' },
                            { value: 'secondary', label: 'Secondary' },
                            { value: 'urban-steel', label: 'Urban Steel' },
                            { value: 'slate', label: 'Slate' },
                            { value: 'bitter-sweet', label: 'Bitter Sweet' },
                            { value: 'cherry-punch', label: 'Cherry Punch' },
                            { value: 'fresh-leaf', label: 'Fresh Leaf' },
                          ],
                          defaultValue: 'accent',
                          required: true,
                          admin: {
                            condition: (_, siblingData) => {
                              return siblingData.pagination;
                            },
                          },
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'number',
                          name: 'slideSpacing',
                          label: 'Slide Spacing',
                          defaultValue: 32,
                          required: true,
                          admin: {
                            description: 'The spacing between slides in pixels.',
                          },
                        },
                        {
                          type: 'number',
                          name: 'slidesPerView',
                          label: 'Slides Per View',
                          defaultValue: 1,
                          required: true,
                          max: 4,
                          min: 1,
                          admin: {
                            description: 'The number of slides to show at a time.',
                          },
                        },
                        {
                          type: 'select',
                          name: 'slidesToScroll',
                          label: 'Slides To Scroll',
                          defaultValue: '1',
                          required: true,
                          options: [
                            { value: 'auto', label: 'Auto' },
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                          ],
                          admin: {
                            description: 'The number of slides to scroll at a time.',
                          },
                        },
                      ],
                    },
                  ],
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
