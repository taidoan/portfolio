import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/payload/blocks/Divider/config';
import { LinksBlockRichtext } from '@/payload/blocks/LinkRichtext/config';
import { LinksGroupRichtextBlock } from '@/payload/blocks/LinkRichtext/Group/config';

export const BlocksEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      BlocksFeature({
        blocks: [DividerBlock, LinksBlockRichtext, LinksGroupRichtextBlock],
      }),
    ];
  },
});
