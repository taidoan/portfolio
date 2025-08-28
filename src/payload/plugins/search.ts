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
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
            label: 'Thumbnail',
            admin: {
              readOnly: true,
              position: 'sidebar',
              condition: (_, siblingData) =>
                siblingData.doc.relationTo === 'projects' || siblingData.doc.relationTo === 'posts',
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
          {
            name: 'updatedAt',
            type: 'text',
            label: 'Updated At',
            admin: {
              readOnly: true,
              position: 'sidebar',
            },
          },
          {
            name: 'createdAt',
            type: 'text',
            label: 'Created At',
            admin: {
              readOnly: true,
              position: 'sidebar',
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
          updatedAt: originalDoc.updatedAt,
          createdAt: originalDoc.createdAt,
          thumbnail: originalDoc.thumbnail,
        };
      }

      if (collection === 'services') {
        return {
          ...searchDoc,
          description: extractPlainText(originalDoc.description),
          url: originalDoc.url,
          updatedAt: originalDoc.updatedAt,
          createdAt: originalDoc.createdAt,
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
          updatedAt: originalDoc.updatedAt,
          createdAt: originalDoc.createdAt,
          thumbnail: originalDoc.thumbnail,
        };
      }

      if (collection === 'pages') {
        return {
          ...searchDoc,
          description: extractPlainText(originalDoc.hero.richText),
          url: originalDoc.url,
          updatedAt: originalDoc.updatedAt,
          createdAt: originalDoc.createdAt,
        };
      }

      return searchDoc;
    },
  });
};
