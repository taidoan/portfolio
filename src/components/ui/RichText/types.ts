import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { DividerBlockProps } from '@/payload-types';
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';

export type NodeTypes = DefaultNodeTypes | SerializedBlockNode<DividerBlockProps>;

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState;
  converters?: JSXConvertersFunction<NodeTypes>;
}

export interface LinkNodeFields {
  doc?: {
    value: { slug: string } | string;
    relationTo: string;
  };
}
