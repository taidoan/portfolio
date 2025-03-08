import type { SectionBlockProps } from '@/payload-types';
import clsx from 'clsx';

import { DividerBlock } from '../Divider';
import { LinksBlock } from '../Links';
import { LinksGroupBlock } from '../Links/Group';
import { IntroBlock } from '../Intro';
import { MediaBlock } from '../Media';
import { CardBlock } from '../Card';
import { AccordionBlock } from '../Accordion';

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
          {hasBlocks ? (
            sectionBlocks?.map((block, index) => {
              const { blockType } = block;

              if (blockType && blockType in blockComponents) {
                const Block = blockComponents[blockType];

                if (Block) {
                  const blockClasses = clsx({
                    [`${block.gridAppearance?.blockSize}`]: block.gridAppearance?.blockSize,
                    [`align-self__${block.gridAppearance?.alignSelf}`]:
                      block.gridAppearance?.alignSelf,
                    [`justify-self__${block.gridAppearance?.justifySelf}`]:
                      block.gridAppearance?.justifySelf,
                  });

                  return (
                    /* @ts-expect-error there may be some mismatch between the expected types here */
                    <Block key={index} {...block} disableInnerContainer className={blockClasses} />
                  );
                }
              }
              return null;
            })
          ) : isBoxedLayout ? (
            <RichText converters={headingConverter} data={boxedContent} />
          ) : null}
        </div>
      </section>
    );
  }
};
