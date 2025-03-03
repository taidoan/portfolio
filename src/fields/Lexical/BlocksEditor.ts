import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { DividerBlock } from '@/blocks/Divider/config';
import { LinksBlockRichtext } from '@/blocks/LinkRichtext/config';
import { LinksGroupRichtextBlock } from '@/blocks/LinkRichtext/Group/config';

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
