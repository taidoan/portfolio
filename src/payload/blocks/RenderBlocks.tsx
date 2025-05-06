import type { Page, Post, Tag } from '@/payload-types';

import { Fragment } from 'react';
import { SectionBlock } from '@/payload/blocks/Section';
import { DividerBlock } from '@/payload/blocks/Divider';
import { SectionGroupBlock } from '@/payload/blocks/Section/Group';
import { MediaBlock } from './Media';
import { ArchiveBlock } from './Archive';
import { TabbedContentBlock } from './TabbedContent';
import { CTABlock } from './CTA';
import { ContentBlock } from './Content';
import { TaggedWithBlock } from './TaggedWith';
import { CarouselBlock } from './Carousel';
import { RelatedProjectsBlock } from './RelatedProjects';

export type RenderBlocksProps = {
  blocks: Page['layout'][0][];
};

export type RenderPostBlocksProps = {
  blocks: Post['layout'][0][];
};

const blockComponents = {
  section: SectionBlock,
  divider: DividerBlock,
  sectionGroup: SectionGroupBlock,
  mediaBlock: MediaBlock,
  archiveBlock: ArchiveBlock,
  tabbedContentBlock: TabbedContentBlock,
  ctaBlock: CTABlock,
  contentBlock: ContentBlock,
  taggedWithBlock: TaggedWithBlock,
  carouselBlock: CarouselBlock,
  relatedProjectsBlock: RelatedProjectsBlock,
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

export const RenderPostBlocks = ({
  blocks,
  pageTags,
  showShareButton,
}: {
  blocks: Post['layout'][0][];
  pageTags: Tag[];
  showShareButton: boolean;
}) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType === 'taggedWithBlock') {
            if (showShareButton) {
              return (
                <section key={index} className='post__tags-container'>
                  <TaggedWithBlock tags={pageTags} {...block} />
                  <span>Share Button Is Enabled</span>
                </section>
              );
            }

            return <TaggedWithBlock key={index} tags={pageTags} {...block} />;
          }

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
