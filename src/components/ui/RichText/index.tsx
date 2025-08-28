import {
  RichText as RichTextBase,
  LinkJSXConverter,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import { internalDocToHref } from './utils';
import { RichTextProps, NodeTypes } from './types';
import { blocks } from './blocks';

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks,
});

export const RichText = ({ className, converters = jsxConverters, ...rest }: RichTextProps) => (
  <RichTextBase converters={converters} className={className} {...rest} />
);

export default RichText;
