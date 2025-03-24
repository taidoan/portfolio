import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';
import { BorderRadius, BorderRadiusSides } from '@/fields/BorderRadius';
import { VideoHeight, VideoPlayerWidth, VideoWidth } from '@/fields/VideoAppearance';
import { Caption, ShowCaption } from '@/fields/Caption';
import { MediaType, MediaUpload } from '@/fields/MediaUpload';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlockProps',
  labels: {
    singular: 'Media',
    plural: 'Medias',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Media',
          fields: [
            MediaType(),
            {
              type: 'row',
              fields: [
                {
                  type: 'row',
                  fields: [
                    MediaUpload({
                      admin: {
                        width: '100%',
                      },
                    }),
                  ],
                },
              ],
            },
            ShowCaption(),
            Caption(),
          ],
        },
        {
          label: 'Options',
          fields: [
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.media && siblingData.mediaType;
                },
              },
              fields: [BorderRadius(), BorderRadiusSides()],
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.media && siblingData.mediaType === 'video';
                },
              },
              fields: [VideoPlayerWidth(), VideoWidth(), VideoHeight()],
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.media && siblingData.mediaType === 'pdf';
                },
              },
              fields: [
                {
                  type: 'text',
                  name: 'pdfWidth',
                  label: 'PDF Width',
                  defaultValue: '100%',
                },
                {
                  type: 'text',
                  name: 'pdfHeight',
                  label: 'PDF Height',
                  defaultValue: '600px',
                },
              ],
            },
            GridAppearance(),
            {
              type: 'text',
              name: 'className',
              label: 'Custom Class Name',
            },
          ],
        },
      ],
    },
  ],
};
