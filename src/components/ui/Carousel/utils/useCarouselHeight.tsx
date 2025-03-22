import { useEffect, RefObject, useRef } from 'react';

export const useCarouselHeight = (
  direction: string,
  numSlides: number,
  slidesPerView: number,
  childrenRefs: RefObject<Array<HTMLDivElement | null>>,
  carouselRef: RefObject<HTMLDivElement | null>,
) => {
  const lastHeightRef = useRef(0);
  const processingRef = useRef(false);
  const MAX_HEIGHT_REM = 25;

  useEffect(() => {
    if (direction !== 'vertical' && direction !== 'vertical-scroll') return;

    let timeout: NodeJS.Timeout;

    const calculateHeight = () => {
      if (processingRef.current) return;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        processingRef.current = true;

        if (!childrenRefs.current || !carouselRef?.current) {
          processingRef.current = false;
          return;
        }

        let totalHeight = 0;

        childrenRefs.current.slice(0, numSlides).forEach((element) => {
          if (element) {
            try {
              totalHeight += element.offsetHeight;
            } catch (error) {
              console.error('Error calculating carousel height:', error);
            }
          }
        });

        let remValue = Math.round(totalHeight / 16);
        remValue = Math.min(remValue, MAX_HEIGHT_REM);

        if (Math.abs(remValue - lastHeightRef.current) > 2 && remValue > 0 && remValue < 100) {
          lastHeightRef.current = remValue;
          carouselRef.current.style.setProperty('--vertical-height', `${remValue}rem`);
        }

        setTimeout(() => {
          processingRef.current = false;
        }, 150);
      }, 100);
    };

    const initialTimeout = setTimeout(calculateHeight, 200);

    window.addEventListener('resize', calculateHeight);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialTimeout);
      window.removeEventListener('resize', calculateHeight);
      processingRef.current = false;
    };
  }, [direction, numSlides, slidesPerView, childrenRefs, carouselRef]);
};
