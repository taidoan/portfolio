import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { DividerBlockProps } from '@/payload-types';

export type NodeTypes = DefaultNodeTypes | SerializedBlockNode<DividerBlockProps>;

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState;
}

export interface LinkNodeFields {
  doc?: {
    value: { slug: string } | string;
    relationTo: string;
  };
}
