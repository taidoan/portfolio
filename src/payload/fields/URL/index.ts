import type { TextField } from 'payload';

/**
 * Custom readonly text field that displays the URL of the current document. It allows the user to copy the URL to their clipboard.
 * @param {string} [fieldToUse] - The name of the field to use for the URL, it will default to 'slug' if not provided.
 * @param {string} [collection] - The collection to use for the URL.
 * @returns {TextField} The custom readonly text field.
 */

export const urlField = (fieldToUse: string = 'slug', collection?: string): TextField => {
  const urlField: TextField = {
    name: 'url',
    type: 'text',
    label: 'URL',
    admin: {
      position: 'sidebar',
      components: {
        Field: {
          path: '@fields/URL/UrlComponent#UrlComponent',
          clientProps: {
            fieldToUse,
            collection: collection,
          },
        },
      },
    },
  };

  return urlField;
};
