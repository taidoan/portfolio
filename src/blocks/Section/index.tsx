import type { SectionBlockProps } from '@/payload-types';
import { DividerBlock } from '../Divider';
import { LinksBlock } from '../Links';
import { LinksGroupBlock } from '../Links/Group';

const blockComponents = {
  divider: DividerBlock,
  links: LinksBlock,
  'links-group': LinksGroupBlock,
};

export const SectionBlock = ({ sectionBlocks }: SectionBlockProps) => {
  const hasContent = sectionBlocks && Array.isArray(sectionBlocks) && sectionBlocks.length > 0;

  if (hasContent) {
    return (
      <div>
        {sectionBlocks.map((block) => {
          const BlockComponent = blockComponents[block.blockType];
          if (!BlockComponent) return null;

          return (
            /* @ts-expect-error there may be some mismatch between the expected types here */
            <BlockComponent key={block.id} {...block} />
          );
        })}
      </div>
    );
  }
};
