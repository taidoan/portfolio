import { Plugin } from 'payload';
import { s3Storage } from '@payloadcms/storage-s3';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { GenerateTitle, GenerateURL, GenerateImage } from '@payloadcms/plugin-seo/types';
import { Project, Page, Service } from '@/payload-types';
import { getServerSideURL, getCDNURL } from '@/lib/utilities/getURLs';

const generateTitle: GenerateTitle<Project | Page | Service> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Tai Doan` : 'Tai Doan Portfolio Website';
};

const generateURL: GenerateURL<Project | Page | Service> = ({ doc }) => {
  const url = getServerSideURL();
  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const generateImage: GenerateImage<Project | Page> = ({ doc }) => {
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
  nestedDocsPlugin({
    collections: ['pages', 'projects', 'services'],
    generateURL: (docs) => docs.reduce((url, doc) => `/${doc.slug}`, ''),
  }),
];
