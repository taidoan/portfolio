import { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';
import { BorderRadius, BorderRadiusSides } from '@/payload/fields/BorderRadius';
import { VideoHeight, VideoPlayerWidth, VideoWidth } from '@/payload/fields/VideoAppearance';
import { Caption, ShowCaption } from '@/payload/fields/Caption';
import {
  MediaType,
  MediaUpload,
  MediaEmbedUrl,
  MediaEmbedSource,
} from '@/payload/fields/MediaUpload';

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
            {
              type: 'row',
              fields: [
                MediaType(),
                MediaEmbedUrl({
                  admin: {
                    condition: (_, siblingData) => siblingData.mediaType === 'embed',
                    width: '33.3%',
                  },
                }),
                MediaEmbedSource({
                  admin: {
                    condition: (_, siblingData) => siblingData.mediaType === 'embed',
                    width: '33.3%',
                  },
                }),
              ],
            },
            MediaUpload({
              admin: {
                width: '100%',
                condition: (_, siblingData) => siblingData.mediaType !== 'embed',
              },
            }),
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
                  return siblingData.mediaType;
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
