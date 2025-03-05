import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlockProps',
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Media',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'upload',
                  name: 'media',
                  label: 'Media',
                  relationTo: 'media',
                  required: true,
                },
                {
                  type: 'select',
                  name: 'mediaType',
                  label: 'Media Type',
                  required: true,
                  options: [
                    { value: 'image', label: 'Image' },
                    { value: 'video', label: 'Video' },
                  ],
                  hooks: {
                    beforeValidate: [
                      async ({ siblingData, req, value }) => {
                        if (!siblingData.media) return false;

                        const mediaDoc = await req.payload.findByID({
                          collection: 'media',
                          id: siblingData.media,
                        });

                        if (mediaDoc?.mimeType?.startsWith('image/')) {
                          return 'image';
                        } else if (mediaDoc?.mimeType?.startsWith('video/')) {
                          return 'video';
                        }

                        return value;
                      },
                    ],
                  },
                  admin: {
                    condition: (_, siblingData) => {
                      return siblingData.media;
                    },
                  },
                },
              ],
            },
            {
              type: 'richText',
              name: 'caption',
              label: 'Caption',
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.media && siblingData.mediaType;
                },
              },
              fields: [
                {
                  type: 'select',
                  name: 'borderRadius',
                  label: 'Border Radius',
                  options: [
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                    { value: 'circle', label: 'Circle' },
                  ],
                  defaultValue: 'medium',
                },
                {
                  type: 'select',
                  hasMany: true,
                  name: 'borderRadiusSides',
                  label: 'Apply Border Radius Sides',
                  options: [
                    { value: 'top-left', label: 'Top Left' },
                    { value: 'top-right', label: 'Top Right' },
                    { value: 'bottom-left', label: 'Bottom Left' },
                    { value: 'bottom-right', label: 'Bottom Right' },
                    { value: 'all', label: 'All Corners' },
                  ],
                  defaultValue: 'all',
                },
              ],
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.media && siblingData.mediaType === 'video';
                },
              },
              fields: [
                {
                  type: 'select',
                  name: 'videoPlayerWidth',
                  label: 'Video Player Width',
                  options: [
                    { value: '100%', label: '100%' },
                    { value: '50%', label: '50%' },
                    { value: '33%', label: '33%' },
                    { value: '25%', label: '25%' },
                  ],
                  defaultValue: '100%',
                },
                {
                  type: 'number',
                  name: 'videoWidth',
                  label: 'Video Width in px',
                  defaultValue: 640,
                },
                {
                  type: 'number',
                  name: 'videoHeight',
                  label: 'Video Height in px',
                  defaultValue: 360,
                },
              ],
            },
            GridAppearance(),
          ],
        },
      ],
    },
  ],
};
