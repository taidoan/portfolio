import type { UploadField, SelectField, TextField } from 'payload';

export const MediaType = (
  overrides: {
    admin?: Partial<SelectField['admin']>;
    hooks?: Partial<SelectField['hooks']>;
  } = {},
): SelectField => {
  const mediaTypeResult: SelectField = {
    type: 'select',
    name: 'mediaType',
    label: 'Media Type',
    required: true,
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
      beforeValidate: [
        async ({ siblingData, req, value }) => {
          if (value === 'embed') {
            return value;
          }

          const mediaDoc = await req.payload.findByID({
            collection: 'media',
            id: siblingData.media,
          });

          if (mediaDoc?.mimeType?.startsWith('image/')) {
            return 'image';
          } else if (mediaDoc?.mimeType?.startsWith('video/')) {
            return 'video';
          } else if (mediaDoc?.mimeType?.startsWith('application/pdf')) {
            return 'pdf';
          }

          return value;
        },
      ],
    },
    options: [
      { value: 'image', label: 'Image' },
      { value: 'video', label: 'Video' },
      { value: 'pdf', label: 'PDF' },
      { value: 'embed', label: 'Embed' },
    ],
  };

  return mediaTypeResult;
};

export const MediaUpload = (
  overrides: {
    admin?: Partial<UploadField['admin']>;
    hooks?: Partial<UploadField['hooks']>;
  } = {},
): UploadField => {
  const mediaResult: UploadField = {
    type: 'upload',
    name: 'media',
    label: 'Media',
    relationTo: 'media',
    required: true,
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
  };

  return mediaResult;
};

export const MediaEmbedUrl = (
  overrides: {
    admin?: Partial<TextField['admin']>;
    hooks?: Partial<TextField['hooks']>;
  } = {},
): TextField => {
  const mediaEmbedUrlResult: TextField = {
    type: 'text',
    name: 'mediaEmbedUrl',
    label: 'Embed URL',
    required: true,
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
  };

  return mediaEmbedUrlResult;
};

export const MediaEmbedSource = (
  overrides: {
    admin?: Partial<SelectField['admin']>;
    hooks?: Partial<SelectField['hooks']>;
  } = {},
): SelectField => {
  const mediaEmbedSourceResult: SelectField = {
    type: 'select',
    name: 'mediaEmbedSource',
    label: 'Embed Source',
    required: true,
    options: [{ value: 'youtube', label: 'YouTube' }],
    defaultValue: 'youtube',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
  };

  return mediaEmbedSourceResult;
};
