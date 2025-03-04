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
} from '@payloadcms/richtext-lexical';
import { LinksFeature } from './features/link';

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
      LinksFeature(),
    ];
  },
});
