import type { Page } from '@/payload-types';
import { SectionBlock } from '@/blocks/Section';
import { DividerBlock } from '@/blocks/Divider';

export type RenderBlocksProps = {
  blocks: Page['layout'][0][];
};

const blockComponents = {
  section: SectionBlock,
  divider: DividerBlock,
};

export const RenderBlocks = ({ blocks }: RenderBlocksProps) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              /* @ts-expect-error there may be some mismatch between the expected types here */
              return <Block key={index} {...block} disableInnerContainer />;
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
