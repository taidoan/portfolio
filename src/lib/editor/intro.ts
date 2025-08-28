import { HeadingFeature, BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/payload/blocks/Divider/config';
import { ContactMethodsBlock } from '@/payload/blocks/ContactMethods/config';

export const IntroEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h2', 'h3'],
      }),
      BlocksFeature({
        blocks: [DividerBlock, ContactMethodsBlock],
      }),
    ];
  },
});
