import {
  RichText as RichTextBase,
  LinkJSXConverter,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/blocks/Divider';
import { LinksRichtextBlock } from '@/blocks/LinkRichtext';
import { LinksGroupRichtextBlock } from '@/blocks/LinkRichtext/Group';
import { MediaRichTextBlock } from '@/blocks/MediaRichtext';
import { internalDocToHref } from './utils';
import { RichTextProps, NodeTypes } from './types';
import type {
  LinksBlockRichtextProps,
  LinksGroupRichtextProps,
  MediaRichtextBlockProps,
} from '@/payload-types';

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    divider: ({ node }: { node: SerializedBlockNode<{ blockType: 'divider' }> }) => {
      if (node.fields.blockType !== 'divider') return null;
      return <DividerBlock {...node.fields} />;
    },
    ['links-richtext']: ({ node }: { node: SerializedBlockNode<LinksBlockRichtextProps> }) => {
      if (node.fields.blockType !== 'links-richtext') return null;
      return <LinksRichtextBlock {...node.fields} />;
    },
    ['links-group-richtext']: ({
      node,
    }: {
      node: SerializedBlockNode<LinksGroupRichtextProps>;
    }) => {
      if (node.fields.blockType !== 'links-group-richtext') return null;
      return <LinksGroupRichtextBlock {...node.fields} />;
    },
    mediaRichtextBlock: ({ node }: { node: SerializedBlockNode<MediaRichtextBlockProps> }) => {
      if (node.fields.blockType !== 'mediaRichtextBlock') return null;
      return <MediaRichTextBlock {...node.fields} />;
    },
  },
});

export const RichText = ({ className, converters = jsxConverters, ...rest }: RichTextProps) => (
  <RichTextBase converters={converters} className={className} {...rest} />
);

export default RichText;
