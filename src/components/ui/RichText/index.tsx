import {
  RichText as RichTextBase,
  LinkJSXConverter,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/blocks/Divider';
// import { LinksBlock } from '@/blocks/Links'
// import { LinkGroupBlock } from '@/blocks/LinkGroup'
import { internalDocToHref } from './utils';
import { RichTextProps, NodeTypes } from './types';
// import type { LinksBlockProps } from '@/payload-types'

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    divider: ({ node }: { node: SerializedBlockNode<{ blockType: 'divider' }> }) => {
      if (node.fields.blockType !== 'divider') return null;
      return <DividerBlock {...node.fields} />;
    },
    // links: ({ node }: { node: SerializedBlockNode<{ blockType: 'links'; link: LinksBlockProps['link'] }> }) => {
    //   if (node.fields.blockType !== 'links' || !node.fields.link) return null
    //   return <LinksBlock {...node.fields} />
    // },
    // linkgroup: ({ node }: { node: SerializedBlockNode<{ blockType: 'linkgroup' }> }) => {
    //   if (node.fields.blockType !== 'linkgroup') return null
    //   return <LinkGroupBlock {...node.fields} />
    // },
  },
});

export const RichText = ({ className, ...rest }: RichTextProps) => (
  <RichTextBase converters={jsxConverters} className={className} {...rest} />
);

export default RichText;
