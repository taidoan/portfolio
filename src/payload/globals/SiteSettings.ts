import { GlobalConfig } from 'payload';
import { SocialFields } from './fields/Social';
import { anyone, authenticated } from '@/payload/access';
import { SITE_NAME, AUTHOR_NAME, CONTACT_EMAIL } from '@lib/constants';
import { revalidateGlobal } from './hooks/revalidateGlobal';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Site Name',
              admin: {
                description: 'Enter the name of your site.',
              },
              required: true,
              defaultValue: SITE_NAME,
            },
            {
              name: 'authorName',
              type: 'text',
              label: 'Author Name',
              admin: {
                description: 'Enter the name of the author of your site.',
              },
              required: true,
              defaultValue: AUTHOR_NAME,
            },
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Contact Email',
              admin: {
                description: 'Enter the email address of the author of your site.',
              },
              required: true,
              defaultValue: CONTACT_EMAIL,
            },
          ],
        },
        {
          label: 'Status & Maintenance',
          fields: [
            {
              name: 'maintenanceMode',
              type: 'checkbox',
              label: 'Enable Maintenance Mode',
              defaultValue: false,
              admin: {
                description:
                  'If enabled, the site will be in maintenance mode and will not be accessible to visitors.',
              },
            },
            {
              name: 'maintenanceMessage',
              type: 'richText',
              label: 'Maintenance Message',
              admin: {
                description: 'Optional message to display when the site is in maintenance mode.',
                condition: (_, siblingData) => siblingData.maintenanceMode,
              },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [...SocialFields],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('site-settings')],
  },
};
