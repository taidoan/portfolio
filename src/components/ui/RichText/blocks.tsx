import type {
  LinksBlockRichtextProps,
  LinksGroupRichtextProps,
  MediaRichtextBlockProps,
  ContactMethodsBlockProps,
} from '@/payload-types';

import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/payload/blocks/Divider';
import { ContactMethodsBlock } from '@/payload/blocks/ContactMethods';
import { LinksRichtextBlock } from '@/payload/blocks/LinkRichtext';
import { LinksGroupRichtextBlock } from '@/payload/blocks/LinkRichtext/Group';
import { MediaRichTextBlock } from '@/payload/blocks/MediaRichtext';

export const blocks = {
  divider: ({ node }: { node: SerializedBlockNode<{ blockType: 'divider' }> }) => {
    if (node.fields.blockType !== 'divider') return null;
    return <DividerBlock {...node.fields} />;
  },
  ['links-richtext']: ({ node }: { node: SerializedBlockNode<LinksBlockRichtextProps> }) => {
    if (node.fields.blockType !== 'links-richtext') return null;
    return <LinksRichtextBlock {...node.fields} />;
  },
  ['links-group-richtext']: ({ node }: { node: SerializedBlockNode<LinksGroupRichtextProps> }) => {
    if (node.fields.blockType !== 'links-group-richtext') return null;
    return <LinksGroupRichtextBlock {...node.fields} />;
  },
  mediaRichtextBlock: ({ node }: { node: SerializedBlockNode<MediaRichtextBlockProps> }) => {
    if (node.fields.blockType !== 'mediaRichtextBlock') return null;
    return <MediaRichTextBlock {...node.fields} />;
  },
  contactMethodsBlock: ({ node }: { node: SerializedBlockNode<ContactMethodsBlockProps> }) => {
    if (node.fields.blockType !== 'contactMethodsBlock') return null;
    return <ContactMethodsBlock {...node.fields} />;
  },
};
