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
            {
              type: 'row',
              fields: [MediaUpload(), MediaType(), ShowCaption(), Caption()],
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
            GridAppearance(),
          ],
        },
      ],
    },
  ],
};
