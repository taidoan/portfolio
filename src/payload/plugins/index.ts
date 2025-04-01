import { Plugin } from 'payload';
import { s3Storage } from '@payloadcms/storage-s3';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import {
  GenerateTitle,
  GenerateURL,
  GenerateImage,
  GenerateDescription,
} from '@payloadcms/plugin-seo/types';
import { Project, Page, Service, Post } from '@/payload-types';
import { getServerSideURL, getCDNURL } from '@/lib/utilities/getURLs';
import { searchPlugin } from '@payloadcms/plugin-search';
import { extractPlainText } from '@/lib/utilities/extractPlainText';

const generateTitle: GenerateTitle<Project | Page | Service | Post> = ({ doc }) => {
  const isProject = doc?.url?.includes('projects') && 'details' in doc;
  const isService = doc?.url?.includes('services');
  const isPost = doc?.url?.includes('posts');
  const isCategory = doc?.url?.includes('categories');

  let title;

  if (isProject) {
    title = doc?.title
      ? `${doc.title} | ${doc.details?.type || 'Project'} by Tai Doan - UI/UX Designer`
      : `Project by Tai Doan - UI/UX Designer`;
  } else if (isService) {
    title = doc?.title
      ? `${doc.title} | Service by Tai Doan - UI/UX Designer`
      : `Service by Tai Doan - UI/UX Designer`;
  } else if (isPost) {
    title = `${doc.title} | Tai Doan - UI/UX Designer`;
  } else if (isCategory) {
    title = `${doc.title} Category | Tai Doan - UI/UX Designer`;
  } else {
    title = `${doc?.title || 'Untitled'} | Tai Doan - UI/UX Designer`;
  }

  return title || 'Tai Doan Portfolio Website';
};

const generateDescription: GenerateDescription<Post | Project | Service> = ({ doc }) => {
  let text = '';

  if ('excerpt' in doc && typeof doc.excerpt === 'string') {
    text = doc.excerpt;
  } else if ('details' in doc && doc.details?.description?.root?.children) {
    const firstTextNode = doc.details.description.root.children.find(
      (child): child is { type: string; version: number; children: { text: string }[] } =>
        typeof child.type === 'string' &&
        typeof child.version === 'number' &&
        child.type === 'paragraph' &&
        Array.isArray(child.children) &&
        typeof child.children[0]?.text === 'string',
    );

    if (firstTextNode) {
      text = firstTextNode.children[0].text;
    }
  } else if ('description' in doc && doc.description && doc.description.root?.children) {
    const firstTextNode = doc.description.root.children.find(
      (child): child is { type: string; version: number; children: { text: string }[] } =>
        typeof child.type === 'string' &&
        typeof child.version === 'number' &&
        child.type === 'paragraph' &&
        Array.isArray(child.children) &&
        typeof child.children[0]?.text === 'string',
    );

    if (firstTextNode) {
      text = firstTextNode.children[0].text;
    }
  }

  text = text || 'No description available';

  if (text.length > 150) {
    return text.slice(0, text.lastIndexOf(' ', 147)) + '...';
  }

  return text;
};

const generateURL: GenerateURL<Project | Page | Service | Post> = ({ doc }) => {
  const url = getServerSideURL();
  return doc?.url ? `${doc.url}` : url;
};

const generateImage: GenerateImage<Project | Page | Post> = ({ doc }) => {
  const url = getCDNURL();
  return doc?.thumbnail && typeof doc.thumbnail === 'object'
    ? `${url}/${doc.thumbnail.filename}`
    : '';
};

export const plugins: Plugin[] = [
  s3Storage({
    collections: {
      media: {
        prefix: 'media',
        disableLocalStorage: true,
      },
    },
    bucket: process.env.R2_BUCKET!,
    config: {
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      region: 'auto',
      forcePathStyle: true,
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    generateImage,
    generateDescription,
    uploadsCollection: ['media'],
  }),
  redirectsPlugin({
    collections: ['pages', 'projects', 'services'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            };
          }
          return field;
        });
      },
    },
  }),
  searchPlugin({
    collections: ['projects', 'posts', 'services', 'pages', 'tags'],
    searchOverrides: {
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
            },
          },
          {
            name: 'tools',
            type: 'text',
            label: 'Tools',
            admin: {
              readOnly: true,
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

      if (collection === 'tags') {
        return {
          ...searchDoc,
          title: originalDoc.name,
        };
      }

      return searchDoc;
    },
  }),
];
