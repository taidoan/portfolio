import type { TextField } from 'payload';

export const urlField = (fieldToUse = 'slug'): TextField => {
  const urlField: TextField = {
    name: 'url',
    type: 'text',
    label: 'URL',
    admin: {
      position: 'sidebar',
      components: {
        Field: {
          path: '@/fields/URL/UrlComponent#UrlComponent',
          clientProps: {
            fieldToUse,
          },
        },
      },
    },
  };

  return urlField;
};
