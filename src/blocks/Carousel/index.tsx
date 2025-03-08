import type { CarouselBlockProps } from '@/payload-types';
import { Carousel } from '@/components/ui/Carousel';
import { CardBlock } from '../Card';
import { MediaBlock } from '../Media';
import clsx from 'clsx';
import { Alert, AlertTitle } from '@components/ui/Alert';
import style from '@components/ui/Carousel/style.module.scss';

export type Props = {
  className?: string;
} & CarouselBlockProps;

const blockComponents = {
  cardBlock: CardBlock,
  mediaBlock: MediaBlock,
};

export const CarouselBlock = ({
  className,
  carouselItems,
  carouselConfig,
  carouselClassNames,
  gridColumns,
  slideColumnSpan,
  responsive,
  breakpointSelection,
}: Props) => {
  const hasItems = carouselItems && Array.isArray(carouselItems) && carouselItems.length > 0;

  if (!hasItems)
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>No carousel items were found.
      </Alert>
    );

  const containerClasses = clsx(className, style.outer__container, {
    [`${carouselClassNames?.container}`]: carouselClassNames?.container,
  });

  const wrapperClasses = clsx({
    [`${carouselClassNames?.wrapper}`]: carouselClassNames?.wrapper,
    [`${style[`grid-template-cols__${gridColumns}`]}`]: responsive && gridColumns,
  });

  const slideClasses = clsx({
    [`${carouselClassNames?.slide}`]: carouselClassNames?.slide,
    [`${style[`grid-span__${slideColumnSpan}`]}`]: responsive && gridColumns && slideColumnSpan,
  });

  const children = hasItems
    ? carouselItems
        .map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                /* @ts-expect-error there may be some mismatch between the expected types here */
                <Block key={index} {...block} disableInnerContainer />
              );
            }
          }
          return null;
        })
        .filter(Boolean)
    : [];

  return (
    <div className={containerClasses}>
      <Carousel
        pagination={carouselConfig.pagination}
        autoHeight={carouselConfig.autoHeight}
        autoPlay={carouselConfig.autoPlay}
        keyboardControls={carouselConfig.keyboardControls}
        buttonNavigation={carouselConfig.buttonNavigation}
        paginationType={carouselConfig.paginationType}
        focus={carouselConfig.focus}
        disableAt={`(${responsive && breakpointSelection})`}
        slideSpacing={carouselConfig.slideSpacing}
        slidesPerView={carouselConfig.slidesPerView}
        slidesToScroll={carouselConfig.slidesToScroll}
        direction={carouselConfig.direction}
        wrapperClassName={wrapperClasses}
        slideClassName={slideClasses}
        className={carouselClassNames?.container}
      >
        {children}
      </Carousel>
    </div>
  );
};
