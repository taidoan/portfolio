import { useEffect, RefObject } from 'react';

export const useCarouselHeight = (
  direction: string,
  numSlides: number,
  slidesPerView: number,
  childrenRefs: RefObject<Array<HTMLDivElement | null>>,
  carouselRef: RefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    if (direction !== 'vertical' && direction !== 'vertical-scroll') return;

    const calculateHeight = () => {
      const totalHeight = childrenRefs.current?.slice(0, numSlides).reduce((acc, element) => {
        if (element) return acc + element.getBoundingClientRect().height;

        return acc;
      }, 0);

      if (totalHeight)
        carouselRef?.current?.style.setProperty(
          '--vertical-height',
          `${Math.round(totalHeight / 16)}rem`,
        );
    };

    const resizeObersever = new ResizeObserver(calculateHeight);
    childrenRefs.current?.forEach((ref) => {
      if (ref) resizeObersever.observe(ref);
    });

    return () => {
      childrenRefs.current?.forEach((ref) => {
        if (ref) resizeObersever.unobserve(ref);
      });
    };
  }, [direction, numSlides, slidesPerView, childrenRefs, carouselRef]);
};
