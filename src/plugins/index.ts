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

const generateTitle: GenerateTitle<Project | Page | Service | Post> = ({ doc }) => {
  return doc?.title ? `${doc.title}` : 'Tai Doan Portfolio Website';
};

const generateDescription: GenerateDescription<Post | Project> = ({ doc }) => {
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
  }

  text = text || 'No description available';

  if (text.length > 160) {
    return text.slice(0, text.lastIndexOf(' ', 157)) + '...';
  }

  return text;
};

const generateURL: GenerateURL<Project | Page | Service | Post> = ({ doc }) => {
  const url = getServerSideURL();
  return doc?.slug ? `${url}/${doc.slug}` : url;
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
];
