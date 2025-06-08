import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  StrikethroughFeature,
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical';
import { LinksFeature } from './features/link';
import { MediaRichtextBlock } from '@/payload/blocks/MediaRichtext/config';

export const ContentEditor = lexicalEditor({
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
      LinksFeature(),
      BlocksFeature({
        blocks: [MediaRichtextBlock],
      }),
    ];
  },
});
