// CustomLinkFeature.ts
import { LinkFeature } from '@payloadcms/richtext-lexical';

export const LinksFeature = () => {
  return LinkFeature({
    enabledCollections: ['pages'],
    fields: ({ defaultFields }) => {
      const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
        if ('name' in field && field.name === 'url') return false;
        return true;
      });

      return [
        ...defaultFieldsWithoutUrl,
        {
          name: 'url',
          type: 'text',
          label: ({ t }) => t('fields:enterURL'),
          required: true,
          validate: (value: any, options: any) => {
            if (options?.siblingData?.linkType === 'internal') {
              return true;
            }
            return value ? true : 'URL is required';
          },
          admin: {
            condition: ({ linkType }) => linkType !== 'internal',
          },
        },
      ];
    },
  });
};
