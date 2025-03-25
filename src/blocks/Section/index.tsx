import type { SectionBlockProps } from '@/payload-types';
import clsx from 'clsx';
import { Fragment } from 'react';

import { DividerBlock } from '../Divider';
import { LinksBlock } from '../Links';
import { LinksGroupBlock } from '../Links/Group';
import { IntroBlock } from '../Intro';
import { MediaBlock } from '../Media';
import { CardBlock } from '../Card';
import { AccordionBlock } from '../Accordion';
import { CarouselBlock } from '../Carousel';
import { BioBlock } from '../Bio';
import { ToolsBlock } from '../Tools';
import { TopTracksBlock } from '../TopTracks';

import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { RichText } from '@payloadcms/richtext-lexical/react';

const blockComponents = {
  divider: DividerBlock,
  links: LinksBlock,
  'links-group': LinksGroupBlock,
  introBlock: IntroBlock,
  mediaBlock: MediaBlock,
  cardBlock: CardBlock,
  accordionBlock: AccordionBlock,
  carouselBlock: CarouselBlock,
  bioBlock: BioBlock,
  toolsBlock: ToolsBlock,
  topTracksBlock: TopTracksBlock,
};

export const SectionBlock = ({
  sectionBlocks,
  appearance,
  boxedContent,
  blockName,
  hiddenSlug,
}: SectionBlockProps) => {
  const hasContent =
    boxedContent || (sectionBlocks && Array.isArray(sectionBlocks) && sectionBlocks.length > 0);
  const hasBlocks = sectionBlocks && Array.isArray(sectionBlocks) && sectionBlocks.length > 0;
  const isBlocksLayout =
    (appearance?.sectionType === 'default' || appearance?.sectionType === 'full-width') &&
    hasBlocks;
  const isBoxedLayout =
    appearance?.sectionType === 'boxed' && boxedContent && boxedContent.root.children.length > 0;

  if (hasContent) {
    if (!appearance) return null;

    const sectionClasses = clsx('section', {
      [`${hiddenSlug}__${blockName}`]: blockName,
      [`bg--${appearance.backgroundColour}`]:
        !isBoxedLayout && appearance.backgroundColour && appearance.backgroundColour !== 'none',
      'full-width': appearance.sectionType === 'full-width',
    });

    const sectionWrapperClasses = clsx({
      section__wrapper: !isBoxedLayout,
      'section__boxed-layout': isBoxedLayout,
      [`section__boxed-layout--${appearance.alignContent}`]: isBoxedLayout,
      [`bg--${appearance.backgroundColour}`]:
        isBoxedLayout && appearance.backgroundColour !== 'none' && appearance.backgroundColour,
      [`border-radius--${appearance.borderRadius}`]: isBoxedLayout && appearance.borderRadius,
    });

    return (
      <section className={sectionClasses}>
        <div className={sectionWrapperClasses}>
          {isBlocksLayout ? (
            <>
              {(() => {
                let runningTotal = 0;

                type BlockType = (typeof sectionBlocks)[0];
                const rowBlocks: BlockType[][] = [];
                sectionBlocks.forEach((block) => {
                  const blockSize = Number(
                    block.gridAppearance?.blockSize?.replace('col-span-', '') || 1,
                  );

                  if (runningTotal + blockSize > 16) {
                    runningTotal = blockSize;
                  } else {
                    runningTotal += blockSize;
                  }

                  if (!rowBlocks.length) {
                    rowBlocks.push([block]);
                  } else if (runningTotal === blockSize) {
                    rowBlocks.push([block]);
                  } else {
                    rowBlocks[rowBlocks.length - 1].push(block);
                  }
                });

                return rowBlocks.map((row, rowIndex) => {
                  let rowTotal = 0;

                  return (
                    <Fragment key={`row-${rowIndex}`}>
                      {row.map((block, blockIndex) => {
                        const { blockType } = block;

                        if (blockType && blockType in blockComponents) {
                          const Block = blockComponents[blockType];

                          if (Block) {
                            const blockSize = Number(
                              block.gridAppearance?.blockSize?.replace('col-span-', '') || 1,
                            );

                            const blockClasses = clsx({
                              [`${block.gridAppearance?.blockSize}`]:
                                block.gridAppearance?.blockSize,
                              [`align-self__${block.gridAppearance?.alignSelf}`]:
                                block.gridAppearance?.alignSelf,
                              [`justify-self__${block.gridAppearance?.justifySelf}`]:
                                block.gridAppearance?.justifySelf,
                            });

                            rowTotal += blockSize;

                            const isLastBlockInRow = blockIndex === row.length - 1;
                            const needsSpacer = !isLastBlockInRow;

                            let spacerSize = 0;
                            if (needsSpacer) {
                              const nextBlock = row[blockIndex + 1];
                              const nextBlockSize = Number(
                                nextBlock?.gridAppearance?.blockSize?.replace('col-span-', '') || 1,
                              );

                              const remainingSpace = 16 - rowTotal - nextBlockSize;

                              if (blockIndex + 2 === row.length) {
                                spacerSize = remainingSpace;
                              } else {
                                spacerSize = Math.max(
                                  0,
                                  Math.min(remainingSpace, 16 - rowTotal - nextBlockSize),
                                );
                              }

                              rowTotal += spacerSize;
                            }

                            return (
                              <Fragment key={blockIndex}>
                                {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                <Block {...block} disableInnerContainer className={blockClasses} />
                                {needsSpacer && spacerSize > 0 && (
                                  <div className={`col-span-${spacerSize}`} />
                                )}
                              </Fragment>
                            );
                          }
                        }
                        return null;
                      })}
                    </Fragment>
                  );
                });
              })()}
            </>
          ) : isBoxedLayout ? (
            <RichText converters={headingConverter} data={boxedContent} />
          ) : null}
        </div>
      </section>
    );
  }
};
