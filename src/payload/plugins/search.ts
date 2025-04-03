import { searchPlugin } from '@payloadcms/plugin-search';
import { extractPlainText } from '@/lib/utilities/extractPlainText';

export const Search = () => {
  return searchPlugin({
    collections: ['projects', 'posts', 'services', 'pages'],
    searchOverrides: {
      timestamps: true,
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields,
          {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'content',
            type: 'textarea',
            label: 'Content',
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            label: 'Categories',
            hasMany: true,
            admin: {
              readOnly: true,
              position: 'sidebar',
            },
          },
          {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            label: 'Tags',
            hasMany: true,
            admin: {
              readOnly: true,
              position: 'sidebar',
            },
          },
          {
            name: 'url',
            type: 'text',
            label: 'URL',
            admin: {
              readOnly: true,
              position: 'sidebar',
            },
          },
          {
            name: 'type',
            type: 'text',
            label: 'Type',
            admin: {
              readOnly: true,
              position: 'sidebar',
              condition: (_, siblingData) => siblingData.doc.relationTo === 'projects',
            },
          },
          {
            name: 'tools',
            type: 'text',
            label: 'Tools',
            admin: {
              readOnly: true,
              position: 'sidebar',
              condition: (_, siblingData) => siblingData.doc.relationTo === 'projects',
            },
          },
        ];
      },
    },
    beforeSync: ({ originalDoc, searchDoc }) => {
      const collection = searchDoc.doc.relationTo;

      if (collection === 'projects') {
        return {
          ...searchDoc,
          description: extractPlainText(originalDoc.details.description),
          content: extractPlainText(originalDoc.content),
          categories: originalDoc.categories,
          tags: originalDoc.tags,
          url: originalDoc.url,
          type: originalDoc.details.type,
          tools: originalDoc.details.tools,
        };
      }

      if (collection === 'services') {
        return {
          ...searchDoc,
          description: extractPlainText(originalDoc.description),
          url: originalDoc.url,
        };
      }

      if (collection === 'posts') {
        return {
          ...searchDoc,
          description: originalDoc.excerpt,
          content: extractPlainText(originalDoc.content),
          categories: originalDoc.categories,
          tags: originalDoc.tags,
          url: originalDoc.url,
        };
      }

      if (collection === 'pages') {
        return {
          ...searchDoc,
          description: extractPlainText(originalDoc.hero.richText),
          url: originalDoc.url,
        };
      }

      return searchDoc;
    },
  });
};
