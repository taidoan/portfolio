import type { Page } from '@/payload-types';
import { SectionBlock } from '@/payload/blocks/Section';
import { DividerBlock } from '@/payload/blocks/Divider';
import { SectionGroupBlock } from '@/payload/blocks/Section/Group';
import { MediaBlock } from './Media';
import { ArchiveBlock } from './Archive';
import { TabbedContentBlock } from './TabbedContent';
import { CTABlock } from './CTA';

export type RenderBlocksProps = {
  blocks: Page['layout'][0][];
};

const blockComponents = {
  section: SectionBlock,
  divider: DividerBlock,
  sectionGroup: SectionGroupBlock,
  mediaBlock: MediaBlock,
  archiveBlock: ArchiveBlock,
  tabbedContentBlock: TabbedContentBlock,
  ctaBlock: CTABlock,
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
