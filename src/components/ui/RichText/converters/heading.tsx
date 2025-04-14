import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react';
import { Fragment } from 'react';
import { internalDocToHref } from './../utils';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { blocks } from './../blocks';

export const headingConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks,
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
