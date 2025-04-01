import type { SectionGroupBlockProps } from '@/payload-types';
import clsx from 'clsx';
import { Alert } from '@/components/ui/Alert';

import { DividerBlock } from '@/payload/blocks/Divider';
import { SectionBlock } from '@/payload/blocks/Section';

const blockComponents = {
  divider: DividerBlock,
  section: SectionBlock,
};

export const SectionGroupBlock = ({
  sectionBlocks,
  appearance,
  blockName,
  hiddenSlug,
}: SectionGroupBlockProps) => {
  const hasBlocks = sectionBlocks && Array.isArray(sectionBlocks) && sectionBlocks.length > 0;
  const isBoxedLayout = appearance?.sectionType === 'boxed';

  if (!hasBlocks) return <Alert severity='warning'>No blocks found.</Alert>;

  const sectionGroupClasses = clsx('section', 'section__group', {
    [`${hiddenSlug}__${blockName}`]: blockName,
    [`bg--${appearance?.backgroundColour}`]:
      !isBoxedLayout && appearance?.backgroundColour && appearance?.backgroundColour !== 'none',
    'full-width': appearance?.sectionType === 'full-width',
  });

  return (
    <section className={sectionGroupClasses}>
      {hasBlocks &&
        sectionBlocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              /* @ts-expect-error there may be some mismatch between the expected types here */
              return <Block key={index} {...block} disableInnerContainer />;
            }
          }
          return (
            <Alert severity='error' key={1}>
              No block found.
            </Alert>
          );
        })}
    </section>
  );
};
