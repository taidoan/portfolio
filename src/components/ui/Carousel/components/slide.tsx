import clsx from 'clsx';
import style from './../style.module.scss';
import { cloneElement, isValidElement, memo } from 'react';

export type CarouselSlideProps = {
  child: React.ReactNode;
  isActive: boolean;
  slideClasses: string;
  isCarouselActive: boolean;
  ref?: (el: HTMLDivElement | null) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const CarouselSlide = memo(
  ({ child, isActive, slideClasses, isCarouselActive, ref }: CarouselSlideProps) => {
    const slideClassNames = clsx(slideClasses, {
      [style['slide--active']]: isActive,
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
