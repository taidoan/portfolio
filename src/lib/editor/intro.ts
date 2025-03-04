import { HeadingFeature, BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/blocks/Divider/config';

export const IntroEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h2', 'h3'],
      }),
      BlocksFeature({
        blocks: [DividerBlock],
      }),
    ];
  },
});
