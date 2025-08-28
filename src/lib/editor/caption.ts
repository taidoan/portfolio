import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  StrikethroughFeature,
  AlignFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical';
import { LinksFeature } from './features/link';

export const CaptionEditor = lexicalEditor({
  features: () => {
    return [
      FixedToolbarFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      AlignFeature(),
      ParagraphFeature(),
      LinksFeature(),
    ];
  },
});
