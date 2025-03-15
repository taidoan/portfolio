import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react';
import { LinksRichtextBlock } from '@/blocks/LinkRichtext';
import { LinksGroupRichtextBlock } from '@/blocks/LinkRichtext/Group';
import { Fragment } from 'react';
import { internalDocToHref } from './../utils';
import { SerializedHeadingNode, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/blocks/Divider';
import type { LinksBlockRichtextProps, LinksGroupRichtextProps } from '@/payload-types';

export const headingConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
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
  },
  heading: (args) => {
    const { node, nodesToJSX } = args;
    const typedNode = node as SerializedHeadingNode;
    const text = nodesToJSX({ nodes: typedNode.children }).join('');

    const dotWrappedText = text.split('.').map((part, index, array) => (
      <Fragment key={index}>
        {part}
        {index < array.length - 1 && <span className='accent-dot'>.</span>}
      </Fragment>
    ));

    if (typedNode.tag === 'h2') {
      return <h2 className='section-heading'>{dotWrappedText}</h2>;
    }

    if (typedNode.tag === 'h3') {
      return <h3 className='sub-heading'>{dotWrappedText}</h3>;
    }

    return typeof defaultConverters.heading === 'function' ? defaultConverters.heading(args) : null;
  },
});
