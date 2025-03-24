import { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import clsx from 'clsx';
import style from './../style.module.scss';

export type UsePaginationProps = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotClick: (index: number) => void;
};
/**
 * A custom hook for managing pagination in the Embla Carousel component.
 * @param emblaApi - The Embla Carousel instance.
 * @param onButtonClick - A callback function to be called when a pagination button is clicked.
 * @returns {UsePaginationProps} An object containing the selected index, scroll snaps, and onDotClick function.
 */
export const usePagination = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePaginationProps => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotClick,
  };
};

type PropType = ComponentPropsWithRef<'div'>;

export const PaginationButton: React.FC<PropType> = (props) => {
  const { children, onClick, ...restProps } = props;

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          onClick?.(e as any);
        }
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};

export interface PaginationProps {
  scrollSnaps: number[];
  selectedIndex: number;
  onDotClick: (index: number) => void;
  paginationColor?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'urban-steel'
    | 'slate'
    | 'bitter-sweet'
    | 'cherry-punch'
    | 'fresh-leaf';
}

export const Pagination = ({
  scrollSnaps,
  selectedIndex,
  onDotClick,
  paginationColor = 'accent',
}: PaginationProps) => {
  return (
    <div className={style.pagination}>
      {scrollSnaps.map((_, index) => (
        <PaginationButton
          key={index}
          onClick={() => onDotClick(index)}
          className={clsx(style.pagination__button, {
            [style['pagination__button--active']]: index === selectedIndex,
            [style[`pagination__button--active--${paginationColor}`]]:
              index === selectedIndex && paginationColor,
          })}
          aria-label={`Go to slide ${index}`}
        />
      ))}
    </div>
  );
};
