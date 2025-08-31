import clsx from 'clsx';
import style from './../style.module.scss';
import { cloneElement, isValidElement, memo } from 'react';

export type CarouselSlideProps = {
  child: React.ReactNode;
  isActive: boolean;
  slideClasses: string;
  isCarouselActive: boolean;
  'data-category-count'?: number;
  ref?: (el: HTMLDivElement | null) => void;
  direction?: 'vertical' | 'horizontal' | 'vertical-scroll';
} & React.HTMLAttributes<HTMLDivElement>;

export const CarouselSlide = memo(
  ({ child, isActive, slideClasses, isCarouselActive, ref, direction }: CarouselSlideProps) => {
    const slideClassNames = clsx(slideClasses, {
      [style['slide--carousel-disabled']]: !isCarouselActive,
      [style['slide--active']]:
        direction !== 'vertical-scroll' && direction !== 'vertical' && isCarouselActive && isActive,
    });

    return (
      <div ref={ref} className={slideClassNames} aria-disabled={!isCarouselActive}>
        {isValidElement<{ className?: string }>(child)
          ? cloneElement(child, { className: clsx(child.props.className) })
          : child}
      </div>
    );
  },
);

CarouselSlide.displayName = 'CarouselSlide';
