import { Block } from 'payload';
import { BorderRadius, BorderRadiusSides } from '@/payload/fields/BorderRadius';
import { VideoHeight, VideoPlayerWidth, VideoWidth } from '@/payload/fields/VideoAppearance';
import { Caption, ShowCaption } from '@/payload/fields/Caption';
import { MediaType, MediaUpload } from '@/payload/fields/MediaUpload';

export const MediaRichtextBlock: Block = {
  slug: 'mediaRichtextBlock',
  interfaceName: 'MediaRichtextBlockProps',
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
          fields: [MediaType(), MediaUpload(), ShowCaption(), Caption()],
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
