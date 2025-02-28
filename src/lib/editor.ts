import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  StrikethroughFeature,
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical';

export const editor = lexicalEditor({
  features: () => {
    return [
      FixedToolbarFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      AlignFeature(),
      ParagraphFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      }),
      LinkFeature({
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
              // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
      }),
    ];
  },
});
